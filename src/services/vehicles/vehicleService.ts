import { ApiResponse, Vehicle, VehicleDocument, VehiclePhoto } from '../../types';
import { handleSupabaseError, logError, logSuccess, supabase } from '../supabase';

/**
 * Vehicle Service
 * Handles all vehicle-related operations including CRUD operations, photos, and documents
 */
export class VehicleService {

  /**
   * Get all vehicles for the current vendor
   * @param vendorId - Vendor ID
   * @param filters - Optional filters
   * @returns Promise with vehicles list
   */
  static async getVendorVehicles(
    vendorId: string,
    filters?: {
      status?: string;
      isAvailable?: boolean;
      vehicleType?: string;
      brand?: string;
    }
  ): Promise<ApiResponse<Vehicle[]>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      let query = supabase
        .from('vehicles')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.isAvailable !== undefined) {
        query = query.eq('is_available', filters.isAvailable);
      }
      if (filters?.vehicleType) {
        query = query.eq('vehicle_type', filters.vehicleType);
      }
      if (filters?.brand) {
        query = query.eq('brand', filters.brand);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      logSuccess('Get vendor vehicles', { count: data?.length });

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      logError('Get vendor vehicles', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get a single vehicle by ID
   * @param vehicleId - Vehicle ID
   * @returns Promise with vehicle data
   */
  static async getVehicleById(vehicleId: string): Promise<ApiResponse<Vehicle>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', vehicleId)
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Get vehicle by ID', data);

      return {
        success: true,
        data,
      };
    } catch (error) {
      logError('Get vehicle by ID', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Create a new vehicle
   * @param vendorId - Vendor ID
   * @param vehicleData - Vehicle data
   * @returns Promise with created vehicle
   */
  static async createVehicle(vendorId: string, vehicleData: Partial<Vehicle>): Promise<ApiResponse<Vehicle>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Validate required fields
      const requiredFields = ['vehicle_type', 'brand', 'model', 'year', 'license_plate', 'daily_rate'];
      for (const field of requiredFields) {
        if (!vehicleData[field as keyof Vehicle]) {
          throw new Error(`Required field missing: ${field}`);
        }
      }

      const newVehicle = {
        ...vehicleData,
        vendor_id: vendorId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('vehicles')
        .insert([newVehicle])
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Create vehicle', data);

      return {
        success: true,
        data,
        message: 'Vehicle created successfully',
      };
    } catch (error) {
      logError('Create vehicle', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Update vehicle details
   * @param vehicleId - Vehicle ID
   * @param updates - Partial vehicle data to update
   * @returns Promise with updated vehicle
   */
  static async updateVehicle(vehicleId: string, updates: Partial<Vehicle>): Promise<ApiResponse<Vehicle>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('vehicles')
        .update(updateData)
        .eq('id', vehicleId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Update vehicle', data);

      return {
        success: true,
        data,
        message: 'Vehicle updated successfully',
      };
    } catch (error) {
      logError('Update vehicle', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Delete vehicle (soft delete by setting status to 'archived')
   * @param vehicleId - Vehicle ID
   * @returns Promise with deletion result
   */
  static async deleteVehicle(vehicleId: string): Promise<ApiResponse<null>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Soft delete by setting status to archived
      const { error } = await supabase
        .from('vehicles')
        .update({
          status: 'archived',
          updated_at: new Date().toISOString()
        })
        .eq('id', vehicleId);

      if (error) {
        throw error;
      }

      logSuccess('Delete vehicle', { vehicleId });

      return {
        success: true,
        message: 'Vehicle deleted successfully',
      };
    } catch (error) {
      logError('Delete vehicle', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Toggle vehicle availability
   * @param vehicleId - Vehicle ID
   * @param isAvailable - New availability status
   * @returns Promise with update result
   */
  static async toggleAvailability(vehicleId: string, isAvailable: boolean): Promise<ApiResponse<Vehicle>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data, error } = await supabase
        .from('vehicles')
        .update({
          is_available: isAvailable,
          updated_at: new Date().toISOString()
        })
        .eq('id', vehicleId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Toggle vehicle availability', { vehicleId, isAvailable });

      return {
        success: true,
        data,
        message: `Vehicle ${isAvailable ? 'made available' : 'made unavailable'}`,
      };
    } catch (error) {
      logError('Toggle vehicle availability', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get vehicle photos
   * @param vehicleId - Vehicle ID
   * @returns Promise with vehicle photos
   */
  static async getVehiclePhotos(vehicleId: string): Promise<ApiResponse<VehiclePhoto[]>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data, error } = await supabase
        .from('vehicle_photos')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .order('display_order', { ascending: true });

      if (error) {
        throw error;
      }

      logSuccess('Get vehicle photos', { vehicleId, count: data?.length });

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      logError('Get vehicle photos', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Add vehicle photo
   * @param vehicleId - Vehicle ID
   * @param photoData - Photo data
   * @returns Promise with created photo
   */
  static async addVehiclePhoto(vehicleId: string, photoData: Partial<VehiclePhoto>): Promise<ApiResponse<VehiclePhoto>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const newPhoto = {
        ...photoData,
        vehicle_id: vehicleId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('vehicle_photos')
        .insert([newPhoto])
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Add vehicle photo', data);

      return {
        success: true,
        data,
        message: 'Photo added successfully',
      };
    } catch (error) {
      logError('Add vehicle photo', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get vehicle documents
   * @param vehicleId - Vehicle ID
   * @returns Promise with vehicle documents
   */
  static async getVehicleDocuments(vehicleId: string): Promise<ApiResponse<VehicleDocument[]>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data, error } = await supabase
        .from('vehicle_documents')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      logSuccess('Get vehicle documents', { vehicleId, count: data?.length });

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      logError('Get vehicle documents', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Add vehicle document
   * @param vehicleId - Vehicle ID
   * @param documentData - Document data
   * @returns Promise with created document
   */
  static async addVehicleDocument(vehicleId: string, documentData: Partial<VehicleDocument>): Promise<ApiResponse<VehicleDocument>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const newDocument = {
        ...documentData,
        vehicle_id: vehicleId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('vehicle_documents')
        .insert([newDocument])
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Add vehicle document', data);

      return {
        success: true,
        data,
        message: 'Document added successfully',
      };
    } catch (error) {
      logError('Add vehicle document', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get vehicle statistics
   * @param vehicleId - Vehicle ID
   * @returns Promise with vehicle statistics
   */
  static async getVehicleStats(vehicleId: string): Promise<ApiResponse<{
    totalBookings: number;
    totalRevenue: number;
    averageRating: number;
    utilizationRate: number;
    lastBookingDate: string | null;
  }>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Get vehicle data
      const { data: vehicle, error: vehicleError } = await supabase
        .from('vehicles')
        .select('total_bookings, total_revenue, average_rating')
        .eq('id', vehicleId)
        .single();

      if (vehicleError) {
        throw vehicleError;
      }

      // Get last booking date
      const { data: lastBooking, error: bookingError } = await supabase
        .from('bookings')
        .select('created_at')
        .eq('vehicle_id', vehicleId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (bookingError && bookingError.code !== 'PGRST116') {
        throw bookingError;
      }

      const stats = {
        totalBookings: vehicle.total_bookings || 0,
        totalRevenue: vehicle.total_revenue || 0,
        averageRating: vehicle.average_rating || 0,
        utilizationRate: 0, // Calculate based on available days vs booked days
        lastBookingDate: lastBooking?.created_at || null,
      };

      logSuccess('Get vehicle stats', stats);

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      logError('Get vehicle stats', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Search vehicles by criteria
   * @param searchTerm - Search term
   * @param filters - Additional filters
   * @returns Promise with search results
   */
  static async searchVehicles(
    searchTerm: string,
    filters?: {
      vehicleType?: string;
      brand?: string;
      minPrice?: number;
      maxPrice?: number;
      isAvailable?: boolean;
    }
  ): Promise<ApiResponse<Vehicle[]>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      let query = supabase
        .from('vehicles')
        .select('*')
        .or(`brand.ilike.%${searchTerm}%, model.ilike.%${searchTerm}%, license_plate.ilike.%${searchTerm}%`);

      // Apply filters
      if (filters?.vehicleType) {
        query = query.eq('vehicle_type', filters.vehicleType);
      }
      if (filters?.brand) {
        query = query.eq('brand', filters.brand);
      }
      if (filters?.minPrice) {
        query = query.gte('daily_rate', filters.minPrice);
      }
      if (filters?.maxPrice) {
        query = query.lte('daily_rate', filters.maxPrice);
      }
      if (filters?.isAvailable !== undefined) {
        query = query.eq('is_available', filters.isAvailable);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      logSuccess('Search vehicles', { searchTerm, count: data?.length });

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      logError('Search vehicles', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }
}
