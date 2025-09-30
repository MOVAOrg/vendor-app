import { ApiResponse, Booking, Inspection, InspectionPhoto } from '../../types';
import { handleSupabaseError, logError, logSuccess, supabase } from '../supabase';

/**
 * Booking Service
 * Handles all booking-related operations including CRUD, status updates, and inspections
 */
export class BookingService {

  /**
   * Get all bookings for a vendor
   * @param vendorId - Vendor ID
   * @param filters - Optional filters
   * @returns Promise with bookings list
   */
  static async getVendorBookings(
    vendorId: string,
    filters?: {
      status?: string;
      dateFrom?: string;
      dateTo?: string;
      vehicleId?: string;
    }
  ): Promise<ApiResponse<Booking[]>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      let query = supabase
        .from('bookings')
        .select(`
          *,
          vehicles:vehicle_id (
            id,
            brand,
            model,
            license_plate,
            vehicle_type
          ),
          customers:customer_id (
            id,
            name,
            phone,
            email,
            profile_photo_url
          )
        `)
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.dateFrom) {
        query = query.gte('pickup_date', filters.dateFrom);
      }
      if (filters?.dateTo) {
        query = query.lte('pickup_date', filters.dateTo);
      }
      if (filters?.vehicleId) {
        query = query.eq('vehicle_id', filters.vehicleId);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      logSuccess('Get vendor bookings', { vendorId, count: data?.length });

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      logError('Get vendor bookings', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get a single booking by ID
   * @param bookingId - Booking ID
   * @returns Promise with booking data
   */
  static async getBookingById(bookingId: string): Promise<ApiResponse<Booking>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          vehicles:vehicle_id (
            id,
            brand,
            model,
            license_plate,
            vehicle_type,
            daily_rate,
            security_deposit
          ),
          customers:customer_id (
            id,
            name,
            phone,
            email,
            profile_photo_url,
            license_number,
            license_expiry
          )
        `)
        .eq('id', bookingId)
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Get booking by ID', data);

      return {
        success: true,
        data,
      };
    } catch (error) {
      logError('Get booking by ID', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Create a new booking
   * @param bookingData - Booking data
   * @returns Promise with created booking
   */
  static async createBooking(bookingData: Partial<Booking>): Promise<ApiResponse<Booking>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Generate booking reference
      const bookingReference = `MOV-${Date.now().toString().slice(-6)}`;

      // Validate required fields
      const requiredFields = ['vendor_id', 'customer_id', 'vehicle_id', 'pickup_date', 'return_date', 'daily_rate'];
      for (const field of requiredFields) {
        if (!bookingData[field as keyof Booking]) {
          throw new Error(`Required field missing: ${field}`);
        }
      }

      const newBooking = {
        ...bookingData,
        booking_reference: bookingReference,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert([newBooking])
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Create booking', data);

      return {
        success: true,
        data,
        message: 'Booking created successfully',
      };
    } catch (error) {
      logError('Create booking', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Update booking status
   * @param bookingId - Booking ID
   * @param status - New status
   * @param additionalData - Additional data to update
   * @returns Promise with updated booking
   */
  static async updateBookingStatus(
    bookingId: string,
    status: string,
    additionalData?: Partial<Booking>
  ): Promise<ApiResponse<Booking>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const updateData: Partial<Booking> = {
        status,
        updated_at: new Date().toISOString(),
        ...additionalData,
      };

      // Set specific timestamps based on status
      if (status === 'confirmed') {
        updateData.confirmed_at = new Date().toISOString();
      } else if (status === 'active') {
        updateData.started_at = new Date().toISOString();
        updateData.actual_pickup_at = new Date().toISOString();
      } else if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
        updateData.actual_return_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Update booking status', { bookingId, status });

      return {
        success: true,
        data,
        message: `Booking ${status} successfully`,
      };
    } catch (error) {
      logError('Update booking status', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Cancel booking
   * @param bookingId - Booking ID
   * @param reason - Cancellation reason
   * @param charges - Cancellation charges
   * @returns Promise with updated booking
   */
  static async cancelBooking(
    bookingId: string,
    reason: string,
    charges: number = 0
  ): Promise<ApiResponse<Booking>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const updateData = {
        status: 'cancelled',
        cancellation_reason: reason,
        cancellation_charges: charges,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Cancel booking', { bookingId, reason, charges });

      return {
        success: true,
        data,
        message: 'Booking cancelled successfully',
      };
    } catch (error) {
      logError('Cancel booking', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get booking timeline/status history
   * @param bookingId - Booking ID
   * @returns Promise with timeline data
   */
  static async getBookingTimeline(bookingId: string): Promise<ApiResponse<any[]>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data, error } = await supabase
        .from('bookings')
        .select('created_at, confirmed_at, started_at, completed_at, status')
        .eq('id', bookingId)
        .single();

      if (error) {
        throw error;
      }

      const timeline = [];

      if (data.created_at) {
        timeline.push({
          status: 'Requested',
          timestamp: data.created_at,
          description: 'Booking request submitted',
        });
      }

      if (data.confirmed_at) {
        timeline.push({
          status: 'Confirmed',
          timestamp: data.confirmed_at,
          description: 'Booking confirmed by vendor',
        });
      }

      if (data.started_at) {
        timeline.push({
          status: 'Active',
          timestamp: data.started_at,
          description: 'Trip started',
        });
      }

      if (data.completed_at) {
        timeline.push({
          status: 'Completed',
          timestamp: data.completed_at,
          description: 'Trip completed',
        });
      }

      logSuccess('Get booking timeline', { bookingId, timelineCount: timeline.length });

      return {
        success: true,
        data: timeline,
      };
    } catch (error) {
      logError('Get booking timeline', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Create pre-rental inspection
   * @param bookingId - Booking ID
   * @param inspectionData - Inspection data
   * @returns Promise with created inspection
   */
  static async createPreRentalInspection(
    bookingId: string,
    inspectionData: Partial<Inspection>
  ): Promise<ApiResponse<Inspection>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Get booking details first
      const bookingResponse = await this.getBookingById(bookingId);
      if (!bookingResponse.success || !bookingResponse.data) {
        throw new Error('Booking not found');
      }

      const booking = bookingResponse.data;

      const newInspection = {
        ...inspectionData,
        booking_id: bookingId,
        vehicle_id: booking.vehicle_id,
        vendor_id: booking.vendor_id,
        customer_id: booking.customer_id,
        inspection_type: 'pre_rental',
        status: 'in_progress',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('inspections')
        .insert([newInspection])
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Create pre-rental inspection', data);

      return {
        success: true,
        data,
        message: 'Pre-rental inspection created',
      };
    } catch (error) {
      logError('Create pre-rental inspection', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Create post-rental inspection
   * @param bookingId - Booking ID
   * @param inspectionData - Inspection data
   * @returns Promise with created inspection
   */
  static async createPostRentalInspection(
    bookingId: string,
    inspectionData: Partial<Inspection>
  ): Promise<ApiResponse<Inspection>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Get booking details first
      const bookingResponse = await this.getBookingById(bookingId);
      if (!bookingResponse.success || !bookingResponse.data) {
        throw new Error('Booking not found');
      }

      const booking = bookingResponse.data;

      const newInspection = {
        ...inspectionData,
        booking_id: bookingId,
        vehicle_id: booking.vehicle_id,
        vendor_id: booking.vendor_id,
        customer_id: booking.customer_id,
        inspection_type: 'post_rental',
        status: 'in_progress',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('inspections')
        .insert([newInspection])
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Create post-rental inspection', data);

      return {
        success: true,
        data,
        message: 'Post-rental inspection created',
      };
    } catch (error) {
      logError('Create post-rental inspection', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Add inspection photo
   * @param inspectionId - Inspection ID
   * @param photoData - Photo data
   * @returns Promise with created photo
   */
  static async addInspectionPhoto(
    inspectionId: string,
    photoData: Partial<InspectionPhoto>
  ): Promise<ApiResponse<InspectionPhoto>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const newPhoto = {
        ...photoData,
        inspection_id: inspectionId,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('inspection_photos')
        .insert([newPhoto])
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Add inspection photo', data);

      return {
        success: true,
        data,
        message: 'Inspection photo added',
      };
    } catch (error) {
      logError('Add inspection photo', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Complete inspection
   * @param inspectionId - Inspection ID
   * @param finalData - Final inspection data
   * @returns Promise with completed inspection
   */
  static async completeInspection(
    inspectionId: string,
    finalData: Partial<Inspection>
  ): Promise<ApiResponse<Inspection>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const updateData = {
        ...finalData,
        status: 'completed',
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('inspections')
        .update(updateData)
        .eq('id', inspectionId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Complete inspection', data);

      return {
        success: true,
        data,
        message: 'Inspection completed successfully',
      };
    } catch (error) {
      logError('Complete inspection', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get booking statistics for vendor
   * @param vendorId - Vendor ID
   * @param period - Time period (today, week, month, year)
   * @returns Promise with booking statistics
   */
  static async getBookingStats(
    vendorId: string,
    period: 'today' | 'week' | 'month' | 'year' = 'month'
  ): Promise<ApiResponse<{
    totalBookings: number;
    confirmedBookings: number;
    activeBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    totalRevenue: number;
    averageBookingValue: number;
  }>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Calculate date range based on period
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

      const { data, error } = await supabase
        .from('bookings')
        .select('status, final_amount')
        .eq('vendor_id', vendorId)
        .gte('created_at', dateFrom.toISOString());

      if (error) {
        throw error;
      }

      const stats = {
        totalBookings: data.length,
        confirmedBookings: data.filter(b => b.status === 'confirmed').length,
        activeBookings: data.filter(b => b.status === 'active').length,
        completedBookings: data.filter(b => b.status === 'completed').length,
        cancelledBookings: data.filter(b => b.status === 'cancelled').length,
        totalRevenue: data.reduce((sum, b) => sum + (b.final_amount || 0), 0),
        averageBookingValue: data.length > 0 ? data.reduce((sum, b) => sum + (b.final_amount || 0), 0) / data.length : 0,
      };

      logSuccess('Get booking stats', { vendorId, period, stats });

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      logError('Get booking stats', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }
}
