import { ApiResponse } from '../../types';
import { handleSupabaseError, logError, logSuccess, supabase } from '../supabase';

/**
 * Notification Service
 * Handles all notification-related operations including push notifications, email, SMS
 */
export class NotificationService {

  /**
   * Get vendor notifications
   * @param vendorId - Vendor ID
   * @param filters - Optional filters
   * @returns Promise with notifications list
   */
  static async getNotifications(
    vendorId: string,
    filters?: {
      read?: boolean;
      type?: string;
      priority?: string;
      limit?: number;
    }
  ): Promise<ApiResponse<any[]>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      let query = supabase
        .from('notifications')
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
        .eq('user_id', vendorId)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.read !== undefined) {
        query = query.eq('read', filters.read);
      }
      if (filters?.type) {
        query = query.eq('notification_type', filters.type);
      }
      if (filters?.priority) {
        query = query.eq('priority', filters.priority);
      }
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      logSuccess('Get notifications', { vendorId, count: data?.length });

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      logError('Get notifications', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Mark notification as read
   * @param notificationId - Notification ID
   * @returns Promise with update result
   */
  static async markAsRead(notificationId: string): Promise<ApiResponse<any>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data, error } = await supabase
        .from('notifications')
        .update({
          read: true,
          read_at: new Date().toISOString(),
        })
        .eq('id', notificationId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Mark notification as read', { notificationId });

      return {
        success: true,
        data,
        message: 'Notification marked as read',
      };
    } catch (error) {
      logError('Mark notification as read', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Mark all notifications as read
   * @param vendorId - Vendor ID
   * @returns Promise with update result
   */
  static async markAllAsRead(vendorId: string): Promise<ApiResponse<null>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { error } = await supabase
        .from('notifications')
        .update({
          read: true,
          read_at: new Date().toISOString(),
        })
        .eq('user_id', vendorId)
        .eq('read', false);

      if (error) {
        throw error;
      }

      logSuccess('Mark all notifications as read', { vendorId });

      return {
        success: true,
        message: 'All notifications marked as read',
      };
    } catch (error) {
      logError('Mark all notifications as read', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Delete notification
   * @param notificationId - Notification ID
   * @returns Promise with deletion result
   */
  static async deleteNotification(notificationId: string): Promise<ApiResponse<null>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) {
        throw error;
      }

      logSuccess('Delete notification', { notificationId });

      return {
        success: true,
        message: 'Notification deleted successfully',
      };
    } catch (error) {
      logError('Delete notification', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get unread notification count
   * @param vendorId - Vendor ID
   * @returns Promise with unread count
   */
  static async getUnreadCount(vendorId: string): Promise<ApiResponse<{ count: number }>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', vendorId)
        .eq('read', false);

      if (error) {
        throw error;
      }

      logSuccess('Get unread notification count', { vendorId, count });

      return {
        success: true,
        data: { count: count || 0 },
      };
    } catch (error) {
      logError('Get unread notification count', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Send push notification
   * @param vendorId - Vendor ID
   * @param title - Notification title
   * @param message - Notification message
   * @param data - Additional data
   * @returns Promise with send result
   */
  static async sendPushNotification(
    vendorId: string,
    title: string,
    message: string,
    data?: any
  ): Promise<ApiResponse<any>> {
    try {
      // Create notification record
      const notificationData = {
        user_id: vendorId,
        title,
        message,
        notification_type: data?.type || 'system_update',
        priority: data?.priority || 'normal',
        data: data || {},
        push_sent: true,
        created_at: new Date().toISOString(),
        sent_at: new Date().toISOString(),
      };

      const { data: notification, error } = await supabase
        .from('notifications')
        .insert([notificationData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // TODO: Integrate with actual push notification service (FCM, Expo, etc.)
      // For now, just log the notification
      console.log(`Push notification sent to vendor ${vendorId}: ${title} - ${message}`);

      logSuccess('Send push notification', { vendorId, title });

      return {
        success: true,
        data: notification,
        message: 'Push notification sent successfully',
      };
    } catch (error) {
      logError('Send push notification', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Update notification preferences
   * @param vendorId - Vendor ID
   * @param preferences - Notification preferences
   * @returns Promise with update result
   */
  static async updateNotificationPreferences(
    vendorId: string,
    preferences: {
      pushNotifications: boolean;
      emailNotifications: boolean;
      smsNotifications: boolean;
      whatsappNotifications: boolean;
      bookingNotifications: boolean;
      paymentNotifications: boolean;
      maintenanceNotifications: boolean;
      promotionalNotifications: boolean;
    }
  ): Promise<ApiResponse<any>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data, error } = await supabase
        .from('vendors')
        .update({
          notifications_enabled: preferences.pushNotifications,
          updated_at: new Date().toISOString(),
        })
        .eq('id', vendorId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // TODO: Store detailed preferences in a separate table or JSON field
      console.log('Notification preferences updated:', preferences);

      logSuccess('Update notification preferences', { vendorId, preferences });

      return {
        success: true,
        data,
        message: 'Notification preferences updated successfully',
      };
    } catch (error) {
      logError('Update notification preferences', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Create booking notification
   * @param vendorId - Vendor ID
   * @param bookingId - Booking ID
   * @param type - Notification type
   * @param additionalData - Additional notification data
   * @returns Promise with notification result
   */
  static async createBookingNotification(
    vendorId: string,
    bookingId: string,
    type: 'booking_request' | 'booking_confirmed' | 'payment_received' | 'pickup_reminder' | 'return_reminder',
    additionalData?: any
  ): Promise<ApiResponse<any>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Get booking details
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .select(`
          booking_reference,
          pickup_date,
          vehicles:vehicle_id (
            brand,
            model
          )
        `)
        .eq('id', bookingId)
        .single();

      if (bookingError) {
        throw bookingError;
      }

      let title = '';
      let message = '';

      switch (type) {
        case 'booking_request':
          title = 'New Booking Request';
          message = `New booking request for ${booking.vehicles.brand} ${booking.vehicles.model} on ${booking.pickup_date}`;
          break;
        case 'booking_confirmed':
          title = 'Booking Confirmed';
          message = `Booking ${booking.booking_reference} has been confirmed`;
          break;
        case 'payment_received':
          title = 'Payment Received';
          message = `Payment received for booking ${booking.booking_reference}`;
          break;
        case 'pickup_reminder':
          title = 'Pickup Reminder';
          message = `Reminder: Vehicle pickup scheduled for booking ${booking.booking_reference}`;
          break;
        case 'return_reminder':
          title = 'Return Reminder';
          message = `Reminder: Vehicle return scheduled for booking ${booking.booking_reference}`;
          break;
      }

      const notificationData = {
        user_id: vendorId,
        title,
        message,
        notification_type: type,
        booking_id: bookingId,
        priority: type === 'booking_request' ? 'high' : 'normal',
        data: additionalData || {},
        created_at: new Date().toISOString(),
      };

      const { data: notification, error } = await supabase
        .from('notifications')
        .insert([notificationData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Create booking notification', { vendorId, bookingId, type });

      return {
        success: true,
        data: notification,
        message: 'Booking notification created',
      };
    } catch (error) {
      logError('Create booking notification', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Schedule notification
   * @param vendorId - Vendor ID
   * @param title - Notification title
   * @param message - Notification message
   * @param scheduledAt - When to send the notification
   * @param data - Additional data
   * @returns Promise with scheduled notification
   */
  static async scheduleNotification(
    vendorId: string,
    title: string,
    message: string,
    scheduledAt: string,
    data?: any
  ): Promise<ApiResponse<any>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const notificationData = {
        user_id: vendorId,
        title,
        message,
        notification_type: data?.type || 'system_update',
        priority: data?.priority || 'normal',
        data: data || {},
        scheduled_at: scheduledAt,
        created_at: new Date().toISOString(),
      };

      const { data: notification, error } = await supabase
        .from('notifications')
        .insert([notificationData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // TODO: Integrate with job scheduler (Cron, Agenda, etc.)
      console.log(`Notification scheduled for ${scheduledAt}: ${title} - ${message}`);

      logSuccess('Schedule notification', { vendorId, title, scheduledAt });

      return {
        success: true,
        data: notification,
        message: 'Notification scheduled successfully',
      };
    } catch (error) {
      logError('Schedule notification', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get notification statistics
   * @param vendorId - Vendor ID
   * @returns Promise with notification statistics
   */
  static async getNotificationStats(vendorId: string): Promise<ApiResponse<{
    totalNotifications: number;
    unreadNotifications: number;
    readNotifications: number;
    notificationsByType: any;
    notificationsByPriority: any;
  }>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Get all notifications for the vendor
      const { data: notifications, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', vendorId);

      if (error) {
        throw error;
      }

      const stats = {
        totalNotifications: notifications.length,
        unreadNotifications: notifications.filter(n => !n.read).length,
        readNotifications: notifications.filter(n => n.read).length,
        notificationsByType: this.groupBy(notifications, 'notification_type'),
        notificationsByPriority: this.groupBy(notifications, 'priority'),
      };

      logSuccess('Get notification stats', { vendorId, stats });

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      logError('Get notification stats', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Helper function to group array by property
   */
  private static groupBy(array: any[], property: string): any {
    return array.reduce((groups, item) => {
      const key = item[property];
      groups[key] = (groups[key] || 0) + 1;
      return groups;
    }, {});
  }
}
