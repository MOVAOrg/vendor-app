import { ApiResponse } from '../../types';
import { handleSupabaseError, logError, logSuccess, supabase } from '../supabase';

/**
 * Maintenance Service
 * Handles all vehicle maintenance related operations
 */
export class MaintenanceService {

  /**
   * Get maintenance logs for a vehicle
   * @param vehicleId - Vehicle ID
   * @param filters - Optional filters
   * @returns Promise with maintenance logs
   */
  static async getVehicleMaintenanceLogs(
    vehicleId: string,
    filters?: {
      maintenanceType?: string;
      dateFrom?: string;
      dateTo?: string;
      limit?: number;
    }
  ): Promise<ApiResponse<any[]>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      let query = supabase
        .from('maintenance_logs')
        .select(`
          *,
          vehicles:vehicle_id (
            id,
            brand,
            model,
            license_plate
          )
        `)
        .eq('vehicle_id', vehicleId)
        .order('maintenance_date', { ascending: false });

      // Apply filters
      if (filters?.maintenanceType) {
        query = query.eq('maintenance_type', filters.maintenanceType);
      }
      if (filters?.dateFrom) {
        query = query.gte('maintenance_date', filters.dateFrom);
      }
      if (filters?.dateTo) {
        query = query.lte('maintenance_date', filters.dateTo);
      }
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      logSuccess('Get vehicle maintenance logs', { vehicleId, count: data?.length });

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      logError('Get vehicle maintenance logs', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get all maintenance logs for vendor
   * @param vendorId - Vendor ID
   * @param filters - Optional filters
   * @returns Promise with maintenance logs
   */
  static async getVendorMaintenanceLogs(
    vendorId: string,
    filters?: {
      vehicleId?: string;
      maintenanceType?: string;
      dateFrom?: string;
      dateTo?: string;
      limit?: number;
    }
  ): Promise<ApiResponse<any[]>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      let query = supabase
        .from('maintenance_logs')
        .select(`
          *,
          vehicles:vehicle_id (
            id,
            brand,
            model,
            license_plate
          )
        `)
        .eq('vendor_id', vendorId)
        .order('maintenance_date', { ascending: false });

      // Apply filters
      if (filters?.vehicleId) {
        query = query.eq('vehicle_id', filters.vehicleId);
      }
      if (filters?.maintenanceType) {
        query = query.eq('maintenance_type', filters.maintenanceType);
      }
      if (filters?.dateFrom) {
        query = query.gte('maintenance_date', filters.dateFrom);
      }
      if (filters?.dateTo) {
        query = query.lte('maintenance_date', filters.dateTo);
      }
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      logSuccess('Get vendor maintenance logs', { vendorId, count: data?.length });

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      logError('Get vendor maintenance logs', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Create maintenance log
   * @param vendorId - Vendor ID
   * @param vehicleId - Vehicle ID
   * @param maintenanceData - Maintenance data
   * @returns Promise with created maintenance log
   */
  static async createMaintenanceLog(
    vendorId: string,
    vehicleId: string,
    maintenanceData: any
  ): Promise<ApiResponse<any>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Validate required fields
      const requiredFields = ['maintenance_type', 'description', 'maintenance_date'];
      for (const field of requiredFields) {
        if (!maintenanceData[field]) {
          throw new Error(`Required field missing: ${field}`);
        }
      }

      const newMaintenanceLog = {
        ...maintenanceData,
        vehicle_id: vehicleId,
        vendor_id: vendorId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('maintenance_logs')
        .insert([newMaintenanceLog])
        .select(`
          *,
          vehicles:vehicle_id (
            id,
            brand,
            model,
            license_plate
          )
        `)
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Create maintenance log', data);

      return {
        success: true,
        data,
        message: 'Maintenance log created successfully',
      };
    } catch (error) {
      logError('Create maintenance log', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Update maintenance log
   * @param maintenanceId - Maintenance log ID
   * @param updates - Updates to apply
   * @returns Promise with updated maintenance log
   */
  static async updateMaintenanceLog(
    maintenanceId: string,
    updates: any
  ): Promise<ApiResponse<any>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('maintenance_logs')
        .update(updateData)
        .eq('id', maintenanceId)
        .select(`
          *,
          vehicles:vehicle_id (
            id,
            brand,
            model,
            license_plate
          )
        `)
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Update maintenance log', data);

      return {
        success: true,
        data,
        message: 'Maintenance log updated successfully',
      };
    } catch (error) {
      logError('Update maintenance log', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Delete maintenance log
   * @param maintenanceId - Maintenance log ID
   * @returns Promise with deletion result
   */
  static async deleteMaintenanceLog(maintenanceId: string): Promise<ApiResponse<null>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { error } = await supabase
        .from('maintenance_logs')
        .delete()
        .eq('id', maintenanceId);

      if (error) {
        throw error;
      }

      logSuccess('Delete maintenance log', { maintenanceId });

      return {
        success: true,
        message: 'Maintenance log deleted successfully',
      };
    } catch (error) {
      logError('Delete maintenance log', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get maintenance reminders
   * @param vendorId - Vendor ID
   * @returns Promise with maintenance reminders
   */
  static async getMaintenanceReminders(vendorId: string): Promise<ApiResponse<any[]>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('maintenance_logs')
        .select(`
          *,
          vehicles:vehicle_id (
            id,
            brand,
            model,
            license_plate
          )
        `)
        .eq('vendor_id', vendorId)
        .eq('reminder_set', true)
        .lte('next_service_due_date', today)
        .order('next_service_due_date', { ascending: true });

      if (error) {
        throw error;
      }

      logSuccess('Get maintenance reminders', { vendorId, count: data?.length });

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      logError('Get maintenance reminders', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Set maintenance reminder
   * @param maintenanceId - Maintenance log ID
   * @param reminderData - Reminder configuration
   * @returns Promise with updated maintenance log
   */
  static async setMaintenanceReminder(
    maintenanceId: string,
    reminderData: {
      nextServiceDueDate: string;
      nextServiceDueOdometer?: number;
      reminderDaysBefore: number;
    }
  ): Promise<ApiResponse<any>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const updateData = {
        next_service_due_date: reminderData.nextServiceDueDate,
        next_service_due_odometer: reminderData.nextServiceDueOdometer,
        reminder_days_before: reminderData.reminderDaysBefore,
        reminder_set: true,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('maintenance_logs')
        .update(updateData)
        .eq('id', maintenanceId)
        .select(`
          *,
          vehicles:vehicle_id (
            id,
            brand,
            model,
            license_plate
          )
        `)
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Set maintenance reminder', { maintenanceId, reminderData });

      return {
        success: true,
        data,
        message: 'Maintenance reminder set successfully',
      };
    } catch (error) {
      logError('Set maintenance reminder', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get maintenance statistics
   * @param vendorId - Vendor ID
   * @returns Promise with maintenance statistics
   */
  static async getMaintenanceStats(vendorId: string): Promise<ApiResponse<{
    totalMaintenanceRecords: number;
    totalMaintenanceCost: number;
    averageMaintenanceCost: number;
    maintenanceByType: any;
    upcomingMaintenance: number;
    maintenanceTrend: any[];
  }>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Get all maintenance logs for vendor
      const { data: maintenanceLogs, error } = await supabase
        .from('maintenance_logs')
        .select('*')
        .eq('vendor_id', vendorId);

      if (error) {
        throw error;
      }

      const totalMaintenanceRecords = maintenanceLogs.length;
      const totalMaintenanceCost = maintenanceLogs.reduce((sum, log) => sum + (log.cost || 0), 0);
      const averageMaintenanceCost = totalMaintenanceRecords > 0 ? totalMaintenanceCost / totalMaintenanceRecords : 0;

      // Maintenance by type
      const maintenanceByType = maintenanceLogs.reduce((acc, log) => {
        const type = log.maintenance_type;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      // Upcoming maintenance (next 30 days)
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      const upcomingMaintenance = maintenanceLogs.filter(log =>
        log.next_service_due_date &&
        new Date(log.next_service_due_date) <= thirtyDaysFromNow &&
        log.reminder_set
      ).length;

      // Maintenance trend (last 12 months)
      const maintenanceTrend = this.generateMaintenanceTrend(maintenanceLogs);

      const stats = {
        totalMaintenanceRecords,
        totalMaintenanceCost,
        averageMaintenanceCost,
        maintenanceByType,
        upcomingMaintenance,
        maintenanceTrend,
      };

      logSuccess('Get maintenance stats', { vendorId, stats });

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      logError('Get maintenance stats', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get maintenance cost analysis
   * @param vendorId - Vendor ID
   * @param period - Analysis period
   * @returns Promise with cost analysis
   */
  static async getMaintenanceCostAnalysis(
    vendorId: string,
    period: 'month' | 'quarter' | 'year' = 'year'
  ): Promise<ApiResponse<{
    totalCost: number;
    costByType: any[];
    costByVehicle: any[];
    monthlyTrend: any[];
    costPerKm: number;
  }>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Calculate date range
      const now = new Date();
      let dateFrom: Date;

      switch (period) {
        case 'month':
          dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'quarter':
          dateFrom = new Date(now.getFullYear(), now.getMonth() - 3, 1);
          break;
        case 'year':
          dateFrom = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          dateFrom = new Date(now.getFullYear(), 0, 1);
      }

      const { data: maintenanceLogs, error } = await supabase
        .from('maintenance_logs')
        .select(`
          *,
          vehicles:vehicle_id (
            id,
            brand,
            model,
            license_plate,
            odometer_reading
          )
        `)
        .eq('vendor_id', vendorId)
        .gte('maintenance_date', dateFrom.toISOString());

      if (error) {
        throw error;
      }

      const totalCost = maintenanceLogs.reduce((sum, log) => sum + (log.cost || 0), 0);

      // Cost by type
      const costByType = Object.entries(
        maintenanceLogs.reduce((acc, log) => {
          const type = log.maintenance_type;
          acc[type] = (acc[type] || 0) + (log.cost || 0);
          return acc;
        }, {})
      ).map(([type, cost]) => ({ type, cost }));

      // Cost by vehicle
      const costByVehicle = Object.entries(
        maintenanceLogs.reduce((acc, log) => {
          const vehicleId = log.vehicle_id;
          if (!acc[vehicleId]) {
            acc[vehicleId] = {
              vehicle: log.vehicles,
              cost: 0,
              count: 0,
            };
          }
          acc[vehicleId].cost += (log.cost || 0);
          acc[vehicleId].count += 1;
          return acc;
        }, {})
      ).map(([vehicleId, data]: [string, any]) => ({
        vehicleId,
        vehicle: data.vehicle,
        cost: data.cost,
        maintenanceCount: data.count,
      }));

      // Monthly trend
      const monthlyTrend = this.generateMonthlyTrend(maintenanceLogs, dateFrom);

      // Cost per km (simplified calculation)
      const totalKm = maintenanceLogs.reduce((sum, log) => sum + (log.odometer_reading || 0), 0);
      const costPerKm = totalKm > 0 ? totalCost / totalKm : 0;

      const analysis = {
        totalCost,
        costByType,
        costByVehicle,
        monthlyTrend,
        costPerKm,
      };

      logSuccess('Get maintenance cost analysis', { vendorId, period, analysis });

      return {
        success: true,
        data: analysis,
      };
    } catch (error) {
      logError('Get maintenance cost analysis', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Generate maintenance trend data
   */
  private static generateMaintenanceTrend(maintenanceLogs: any[]): any[] {
    const months = 12;
    const trend = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStr = date.toISOString().slice(0, 7); // YYYY-MM

      const monthData = maintenanceLogs.filter(log => {
        const logMonth = new Date(log.maintenance_date).toISOString().slice(0, 7);
        return logMonth === monthStr;
      });

      trend.push({
        month: monthStr,
        count: monthData.length,
        cost: monthData.reduce((sum, log) => sum + (log.cost || 0), 0),
      });
    }

    return trend;
  }

  /**
   * Generate monthly trend data
   */
  private static generateMonthlyTrend(maintenanceLogs: any[], dateFrom: Date): any[] {
    const months = [];
    const current = new Date(dateFrom);
    const now = new Date();

    while (current <= now) {
      const monthStr = current.toISOString().slice(0, 7);
      const monthData = maintenanceLogs.filter(log => {
        const logMonth = new Date(log.maintenance_date).toISOString().slice(0, 7);
        return logMonth === monthStr;
      });

      months.push({
        month: monthStr,
        cost: monthData.reduce((sum, log) => sum + (log.cost || 0), 0),
        count: monthData.length,
      });

      current.setMonth(current.getMonth() + 1);
    }

    return months;
  }
}
