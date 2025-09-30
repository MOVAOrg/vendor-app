import { ApiResponse } from '../../types';
import { handleSupabaseError, logError, logSuccess, supabase } from '../supabase';

/**
 * Analytics Service
 * Handles all analytics and reporting operations for vendors
 */
export class AnalyticsService {

  /**
   * Get dashboard analytics
   * @param vendorId - Vendor ID
   * @param period - Time period for analytics
   * @returns Promise with dashboard analytics
   */
  static async getDashboardAnalytics(
    vendorId: string,
    period: 'today' | 'week' | 'month' | 'year' = 'month'
  ): Promise<ApiResponse<{
    totalBookings: number;
    totalRevenue: number;
    totalVehicles: number;
    averageRating: number;
    occupancyRate: number;
    topPerformingVehicles: any[];
    recentBookings: any[];
    revenueTrend: any[];
    bookingTrend: any[];
  }>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Calculate date range
      const now = new Date();
      let dateFrom: Date;

      switch (period) {
        case 'today':
          dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'year':
          dateFrom = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
      }

      // Get bookings data
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          vehicles:vehicle_id (
            id,
            brand,
            model,
            license_plate,
            daily_rate
          )
        `)
        .eq('vendor_id', vendorId)
        .gte('created_at', dateFrom.toISOString());

      if (bookingsError) {
        throw bookingsError;
      }

      // Get vehicles data
      const { data: vehicles, error: vehiclesError } = await supabase
        .from('vehicles')
        .select('id, brand, model, total_bookings, total_revenue, average_rating')
        .eq('vendor_id', vendorId);

      if (vehiclesError) {
        throw vehiclesError;
      }

      // Calculate analytics
      const totalBookings = bookings.length;
      const totalRevenue = bookings.reduce((sum, b) => sum + (b.final_amount || 0), 0);
      const totalVehicles = vehicles.length;
      const averageRating = vehicles.length > 0 ? vehicles.reduce((sum, v) => sum + (v.average_rating || 0), 0) / vehicles.length : 0;

      // Calculate occupancy rate (simplified)
      const totalAvailableDays = vehicles.length * 30; // Assuming 30 days
      const bookedDays = bookings.filter(b => b.status === 'completed').length;
      const occupancyRate = totalAvailableDays > 0 ? (bookedDays / totalAvailableDays) * 100 : 0;

      // Top performing vehicles
      const topPerformingVehicles = vehicles
        .sort((a, b) => (b.total_revenue || 0) - (a.total_revenue || 0))
        .slice(0, 5);

      // Recent bookings
      const recentBookings = bookings
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      // Generate trends (simplified - in production, you'd group by date)
      const revenueTrend = this.generateTrendData(bookings, 'final_amount', period);
      const bookingTrend = this.generateTrendData(bookings, 'count', period);

      const analytics = {
        totalBookings,
        totalRevenue,
        totalVehicles,
        averageRating,
        occupancyRate,
        topPerformingVehicles,
        recentBookings,
        revenueTrend,
        bookingTrend,
      };

      logSuccess('Get dashboard analytics', { vendorId, period, analytics });

      return {
        success: true,
        data: analytics,
      };
    } catch (error) {
      logError('Get dashboard analytics', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get detailed reports
   * @param vendorId - Vendor ID
   * @param reportType - Type of report
   * @param filters - Report filters
   * @returns Promise with report data
   */
  static async getDetailedReport(
    vendorId: string,
    reportType: 'bookings' | 'revenue' | 'vehicles' | 'customers',
    filters?: {
      dateFrom?: string;
      dateTo?: string;
      vehicleId?: string;
      status?: string;
    }
  ): Promise<ApiResponse<any[]>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      let data: any[] = [];

      switch (reportType) {
        case 'bookings':
          data = await this.getBookingsReport(vendorId, filters);
          break;
        case 'revenue':
          data = await this.getRevenueReport(vendorId, filters);
          break;
        case 'vehicles':
          data = await this.getVehiclesReport(vendorId, filters);
          break;
        case 'customers':
          data = await this.getCustomersReport(vendorId, filters);
          break;
        default:
          throw new Error('Invalid report type');
      }

      logSuccess('Get detailed report', { vendorId, reportType, count: data.length });

      return {
        success: true,
        data,
      };
    } catch (error) {
      logError('Get detailed report', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get bookings report
   */
  private static async getBookingsReport(vendorId: string, filters?: any): Promise<any[]> {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        vehicles:vehicle_id (
          id,
          brand,
          model,
          license_plate
        ),
        customers:customer_id (
          id,
          name,
          phone
        )
      `)
      .eq('vendor_id', vendorId);

    if (filters?.dateFrom) {
      query = query.gte('created_at', filters.dateFrom);
    }
    if (filters?.dateTo) {
      query = query.lte('created_at', filters.dateTo);
    }
    if (filters?.vehicleId) {
      query = query.eq('vehicle_id', filters.vehicleId);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  }

  /**
   * Get revenue report
   */
  private static async getRevenueReport(vendorId: string, filters?: any): Promise<any[]> {
    let query = supabase
      .from('transactions')
      .select(`
        *,
        bookings:booking_id (
          id,
          booking_reference,
          pickup_date,
          vehicles:vehicle_id (
            brand,
            model
          )
        )
      `)
      .eq('vendor_id', vendorId)
      .in('transaction_type', ['booking_payment', 'withdrawal', 'refund']);

    if (filters?.dateFrom) {
      query = query.gte('created_at', filters.dateFrom);
    }
    if (filters?.dateTo) {
      query = query.lte('created_at', filters.dateTo);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  }

  /**
   * Get vehicles report
   */
  private static async getVehiclesReport(vendorId: string, filters?: any): Promise<any[]> {
    let query = supabase
      .from('vehicles')
      .select(`
        *,
        bookings:bookings (
          id,
          status,
          final_amount,
          pickup_date
        )
      `)
      .eq('vendor_id', vendorId);

    if (filters?.vehicleId) {
      query = query.eq('id', filters.vehicleId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  }

  /**
   * Get customers report
   */
  private static async getCustomersReport(vendorId: string, filters?: any): Promise<any[]> {
    let query = supabase
      .from('bookings')
      .select(`
        customers:customer_id (
          id,
          name,
          phone,
          email,
          total_bookings,
          total_spent,
          rating
        ),
        count
      `)
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });

    if (filters?.dateFrom) {
      query = query.gte('created_at', filters.dateFrom);
    }
    if (filters?.dateTo) {
      query = query.lte('created_at', filters.dateTo);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // Group by customer and calculate stats
    const customerMap = new Map();

    data?.forEach((booking: any) => {
      const customer = booking.customers;
      if (customer) {
        if (!customerMap.has(customer.id)) {
          customerMap.set(customer.id, {
            ...customer,
            bookingCount: 0,
            totalSpent: 0,
          });
        }
        const customerData = customerMap.get(customer.id);
        customerData.bookingCount += 1;
        customerData.totalSpent += booking.final_amount || 0;
      }
    });

    return Array.from(customerMap.values());
  }

  /**
   * Generate trend data for charts
   */
  private static generateTrendData(data: any[], valueField: string, period: string): any[] {
    const days = period === 'today' ? 1 : period === 'week' ? 7 : period === 'month' ? 30 : 365;
    const trend = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dayData = data.filter(item => {
        const itemDate = new Date(item.created_at).toISOString().split('T')[0];
        return itemDate === dateStr;
      });

      const value = valueField === 'count'
        ? dayData.length
        : dayData.reduce((sum, item) => sum + (item[valueField] || 0), 0);

      trend.push({
        date: dateStr,
        value,
      });
    }

    return trend;
  }

  /**
   * Get performance metrics
   * @param vendorId - Vendor ID
   * @returns Promise with performance metrics
   */
  static async getPerformanceMetrics(vendorId: string): Promise<ApiResponse<{
    conversionRate: number;
    averageBookingValue: number;
    customerRetentionRate: number;
    vehicleUtilizationRate: number;
    responseTime: number;
    cancellationRate: number;
  }>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Get bookings data for the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('vendor_id', vendorId)
        .gte('created_at', thirtyDaysAgo.toISOString());

      if (bookingsError) {
        throw bookingsError;
      }

      // Get vehicles data
      const { data: vehicles, error: vehiclesError } = await supabase
        .from('vehicles')
        .select('*')
        .eq('vendor_id', vendorId);

      if (vehiclesError) {
        throw vehiclesError;
      }

      // Calculate metrics
      const totalBookings = bookings.length;
      const confirmedBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'active' || b.status === 'completed').length;
      const completedBookings = bookings.filter(b => b.status === 'completed').length;
      const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;

      const conversionRate = totalBookings > 0 ? (confirmedBookings / totalBookings) * 100 : 0;
      const averageBookingValue = totalBookings > 0 ? bookings.reduce((sum, b) => sum + (b.final_amount || 0), 0) / totalBookings : 0;
      const cancellationRate = totalBookings > 0 ? (cancelledBookings / totalBookings) * 100 : 0;

      // Calculate customer retention (simplified)
      const uniqueCustomers = new Set(bookings.map(b => b.customer_id));
      const customerRetentionRate = 85; // Placeholder - would need historical data

      // Calculate vehicle utilization
      const totalAvailableDays = vehicles.length * 30;
      const vehicleUtilizationRate = totalAvailableDays > 0 ? (completedBookings / totalAvailableDays) * 100 : 0;

      // Average response time (placeholder)
      const responseTime = 2.5; // hours

      const metrics = {
        conversionRate,
        averageBookingValue,
        customerRetentionRate,
        vehicleUtilizationRate,
        responseTime,
        cancellationRate,
      };

      logSuccess('Get performance metrics', { vendorId, metrics });

      return {
        success: true,
        data: metrics,
      };
    } catch (error) {
      logError('Get performance metrics', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Export report data
   * @param vendorId - Vendor ID
   * @param reportType - Type of report to export
   * @param format - Export format (csv, pdf)
   * @returns Promise with export data
   */
  static async exportReport(
    vendorId: string,
    reportType: string,
    format: 'csv' | 'pdf' = 'csv'
  ): Promise<ApiResponse<{ downloadUrl: string; fileName: string }>> {
    try {
      // Get report data
      const reportResponse = await this.getDetailedReport(vendorId, reportType as any);

      if (!reportResponse.success) {
        throw new Error(reportResponse.error);
      }

      // Generate file name
      const timestamp = new Date().toISOString().split('T')[0];
      const fileName = `${reportType}_report_${vendorId}_${timestamp}.${format}`;

      // In production, you would:
      // 1. Generate CSV/PDF file
      // 2. Upload to storage (Supabase Storage, AWS S3, etc.)
      // 3. Return download URL

      const downloadUrl = `https://example.com/reports/${fileName}`;

      logSuccess('Export report', { vendorId, reportType, format, fileName });

      return {
        success: true,
        data: {
          downloadUrl,
          fileName,
        },
        message: 'Report exported successfully',
      };
    } catch (error) {
      logError('Export report', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }
}
