import { ApiResponse } from '../../types';
import { handleSupabaseError, logError, logSuccess, supabase } from '../supabase';

/**
 * Review Service
 * Handles all review and rating related operations
 */
export class ReviewService {

  /**
   * Get reviews for vendor's vehicles
   * @param vendorId - Vendor ID
   * @param filters - Optional filters
   * @returns Promise with reviews list
   */
  static async getVendorReviews(
    vendorId: string,
    filters?: {
      vehicleId?: string;
      rating?: number;
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
        .from('reviews')
        .select(`
          *,
          bookings:booking_id (
            id,
            booking_reference,
            pickup_date,
            vehicles:vehicle_id (
              id,
              brand,
              model,
              license_plate
            )
          ),
          customers:customer_id (
            id,
            name,
            profile_photo_url
          ),
          vehicles:vehicle_id (
            id,
            brand,
            model,
            license_plate
          )
        `)
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.vehicleId) {
        query = query.eq('vehicle_id', filters.vehicleId);
      }
      if (filters?.rating) {
        query = query.eq('rating', filters.rating);
      }
      if (filters?.dateFrom) {
        query = query.gte('created_at', filters.dateFrom);
      }
      if (filters?.dateTo) {
        query = query.lte('created_at', filters.dateTo);
      }
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      logSuccess('Get vendor reviews', { vendorId, count: data?.length });

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      logError('Get vendor reviews', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get reviews for a specific vehicle
   * @param vehicleId - Vehicle ID
   * @param limit - Number of reviews to fetch
   * @returns Promise with vehicle reviews
   */
  static async getVehicleReviews(vehicleId: string, limit: number = 10): Promise<ApiResponse<any[]>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          bookings:booking_id (
            id,
            booking_reference,
            pickup_date
          ),
          customers:customer_id (
            id,
            name,
            profile_photo_url
          )
        `)
        .eq('vehicle_id', vehicleId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      logSuccess('Get vehicle reviews', { vehicleId, count: data?.length });

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      logError('Get vehicle reviews', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Respond to a review
   * @param reviewId - Review ID
   * @param response - Vendor response
   * @returns Promise with updated review
   */
  static async respondToReview(reviewId: string, response: string): Promise<ApiResponse<any>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data, error } = await supabase
        .from('reviews')
        .update({
          vendor_response: response,
          vendor_response_date: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', reviewId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Respond to review', { reviewId });

      return {
        success: true,
        data,
        message: 'Response added successfully',
      };
    } catch (error) {
      logError('Respond to review', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get review statistics for vendor
   * @param vendorId - Vendor ID
   * @returns Promise with review statistics
   */
  static async getReviewStats(vendorId: string): Promise<ApiResponse<{
    totalReviews: number;
    averageRating: number;
    ratingDistribution: any;
    averageVehicleConditionRating: number;
    averageCommunicationRating: number;
    averagePickupProcessRating: number;
    averageValueForMoneyRating: number;
    responseRate: number;
  }>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data: reviews, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('vendor_id', vendorId)
        .eq('status', 'active');

      if (error) {
        throw error;
      }

      const totalReviews = reviews.length;
      const averageRating = totalReviews > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0;

      // Rating distribution
      const ratingDistribution = {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length,
      };

      // Average sub-ratings
      const reviewsWithSubRatings = reviews.filter(r =>
        r.vehicle_condition_rating &&
        r.communication_rating &&
        r.pickup_process_rating &&
        r.value_for_money_rating
      );

      const averageVehicleConditionRating = reviewsWithSubRatings.length > 0
        ? reviewsWithSubRatings.reduce((sum, r) => sum + (r.vehicle_condition_rating || 0), 0) / reviewsWithSubRatings.length
        : 0;

      const averageCommunicationRating = reviewsWithSubRatings.length > 0
        ? reviewsWithSubRatings.reduce((sum, r) => sum + (r.communication_rating || 0), 0) / reviewsWithSubRatings.length
        : 0;

      const averagePickupProcessRating = reviewsWithSubRatings.length > 0
        ? reviewsWithSubRatings.reduce((sum, r) => sum + (r.pickup_process_rating || 0), 0) / reviewsWithSubRatings.length
        : 0;

      const averageValueForMoneyRating = reviewsWithSubRatings.length > 0
        ? reviewsWithSubRatings.reduce((sum, r) => sum + (r.value_for_money_rating || 0), 0) / reviewsWithSubRatings.length
        : 0;

      // Response rate
      const reviewsWithResponse = reviews.filter(r => r.vendor_response);
      const responseRate = totalReviews > 0 ? (reviewsWithResponse.length / totalReviews) * 100 : 0;

      const stats = {
        totalReviews,
        averageRating,
        ratingDistribution,
        averageVehicleConditionRating,
        averageCommunicationRating,
        averagePickupProcessRating,
        averageValueForMoneyRating,
        responseRate,
      };

      logSuccess('Get review stats', { vendorId, stats });

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      logError('Get review stats', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get review statistics for a specific vehicle
   * @param vehicleId - Vehicle ID
   * @returns Promise with vehicle review statistics
   */
  static async getVehicleReviewStats(vehicleId: string): Promise<ApiResponse<{
    totalReviews: number;
    averageRating: number;
    ratingDistribution: any;
    recentReviews: any[];
  }>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data: reviews, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .eq('status', 'active');

      if (error) {
        throw error;
      }

      const totalReviews = reviews.length;
      const averageRating = totalReviews > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0;

      const ratingDistribution = {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length,
      };

      const recentReviews = reviews
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      const stats = {
        totalReviews,
        averageRating,
        ratingDistribution,
        recentReviews,
      };

      logSuccess('Get vehicle review stats', { vehicleId, stats });

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      logError('Get vehicle review stats', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Flag inappropriate review
   * @param reviewId - Review ID
   * @param reason - Reason for flagging
   * @returns Promise with flagging result
   */
  static async flagReview(reviewId: string, reason: string): Promise<ApiResponse<null>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { error } = await supabase
        .from('reviews')
        .update({
          status: 'flagged',
          updated_at: new Date().toISOString(),
        })
        .eq('id', reviewId);

      if (error) {
        throw error;
      }

      // TODO: Create a separate flagged_reviews table to track flagging details
      console.log(`Review ${reviewId} flagged for: ${reason}`);

      logSuccess('Flag review', { reviewId, reason });

      return {
        success: true,
        message: 'Review flagged successfully',
      };
    } catch (error) {
      logError('Flag review', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get reviews requiring response
   * @param vendorId - Vendor ID
   * @returns Promise with reviews needing response
   */
  static async getReviewsNeedingResponse(vendorId: string): Promise<ApiResponse<any[]>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          bookings:booking_id (
            id,
            booking_reference,
            vehicles:vehicle_id (
              brand,
              model
            )
          ),
          customers:customer_id (
            id,
            name,
            profile_photo_url
          )
        `)
        .eq('vendor_id', vendorId)
        .is('vendor_response', null)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      logSuccess('Get reviews needing response', { vendorId, count: data?.length });

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      logError('Get reviews needing response', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get review analytics
   * @param vendorId - Vendor ID
   * @param period - Time period for analytics
   * @returns Promise with review analytics
   */
  static async getReviewAnalytics(
    vendorId: string,
    period: 'week' | 'month' | 'quarter' | 'year' = 'month'
  ): Promise<ApiResponse<{
    reviewsOverTime: any[];
    averageRatingOverTime: any[];
    responseRateOverTime: any[];
    topRatedVehicles: any[];
    improvementAreas: any[];
  }>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Calculate date range
      const now = new Date();
      let dateFrom: Date;

      switch (period) {
        case 'week':
          dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
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
          dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
      }

      const { data: reviews, error } = await supabase
        .from('reviews')
        .select(`
          *,
          vehicles:vehicle_id (
            id,
            brand,
            model
          )
        `)
        .eq('vendor_id', vendorId)
        .gte('created_at', dateFrom.toISOString())
        .eq('status', 'active');

      if (error) {
        throw error;
      }

      // Generate analytics data
      const reviewsOverTime = this.generateTimeSeriesData(reviews, period, 'count');
      const averageRatingOverTime = this.generateTimeSeriesData(reviews, period, 'average', 'rating');
      const responseRateOverTime = this.generateTimeSeriesData(reviews, period, 'response_rate');

      // Top rated vehicles
      const vehicleRatings = reviews.reduce((acc, review) => {
        const vehicleId = review.vehicle_id;
        if (!acc[vehicleId]) {
          acc[vehicleId] = {
            vehicle: review.vehicles,
            ratings: [],
            totalReviews: 0,
          };
        }
        acc[vehicleId].ratings.push(review.rating);
        acc[vehicleId].totalReviews++;
        return acc;
      }, {});

      const topRatedVehicles = Object.values(vehicleRatings)
        .map((vehicle: any) => ({
          ...vehicle.vehicle,
          averageRating: vehicle.ratings.reduce((sum, r) => sum + r, 0) / vehicle.ratings.length,
          totalReviews: vehicle.totalReviews,
        }))
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 5);

      // Improvement areas (lowest rated aspects)
      const improvementAreas = [
        {
          aspect: 'Vehicle Condition',
          averageRating: reviews.reduce((sum, r) => sum + (r.vehicle_condition_rating || 0), 0) / reviews.length,
        },
        {
          aspect: 'Communication',
          averageRating: reviews.reduce((sum, r) => sum + (r.communication_rating || 0), 0) / reviews.length,
        },
        {
          aspect: 'Pickup Process',
          averageRating: reviews.reduce((sum, r) => sum + (r.pickup_process_rating || 0), 0) / reviews.length,
        },
        {
          aspect: 'Value for Money',
          averageRating: reviews.reduce((sum, r) => sum + (r.value_for_money_rating || 0), 0) / reviews.length,
        },
      ].sort((a, b) => a.averageRating - b.averageRating);

      const analytics = {
        reviewsOverTime,
        averageRatingOverTime,
        responseRateOverTime,
        topRatedVehicles,
        improvementAreas,
      };

      logSuccess('Get review analytics', { vendorId, period, analytics });

      return {
        success: true,
        data: analytics,
      };
    } catch (error) {
      logError('Get review analytics', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Generate time series data for analytics
   */
  private static generateTimeSeriesData(
    data: any[],
    period: string,
    aggregationType: 'count' | 'average' | 'response_rate',
    field?: string
  ): any[] {
    const days = period === 'week' ? 7 : period === 'month' ? 30 : period === 'quarter' ? 90 : 365;
    const timeSeries = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dayData = data.filter(item => {
        const itemDate = new Date(item.created_at).toISOString().split('T')[0];
        return itemDate === dateStr;
      });

      let value = 0;

      switch (aggregationType) {
        case 'count':
          value = dayData.length;
          break;
        case 'average':
          value = dayData.length > 0
            ? dayData.reduce((sum, item) => sum + (item[field || 'rating'] || 0), 0) / dayData.length
            : 0;
          break;
        case 'response_rate':
          const reviewsWithResponse = dayData.filter(item => item.vendor_response);
          value = dayData.length > 0 ? (reviewsWithResponse.length / dayData.length) * 100 : 0;
          break;
      }

      timeSeries.push({
        date: dateStr,
        value,
      });
    }

    return timeSeries;
  }
}
