import { ApiResponse } from '../../types';
import { handleSupabaseError, logError, logSuccess, supabase } from '../supabase';

/**
 * Financial Service
 * Handles all financial operations including wallet, transactions, withdrawals, and coupons
 */
export class FinancialService {

  /**
   * Get vendor wallet balance and details
   * @param vendorId - Vendor ID
   * @returns Promise with wallet information
   */
  static async getWalletBalance(vendorId: string): Promise<ApiResponse<{
    availableBalance: number;
    pendingBalance: number;
    totalEarnings: number;
    lastWithdrawal: string | null;
    nextWithdrawalDate: string | null;
  }>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Get vendor's total earnings from transactions
      const { data: earnings, error: earningsError } = await supabase
        .from('transactions')
        .select('amount, status, created_at')
        .eq('vendor_id', vendorId)
        .in('transaction_type', ['booking_payment', 'referral_bonus', 'bonus']);

      if (earningsError) {
        throw earningsError;
      }

      const availableBalance = earnings
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);

      const pendingBalance = earnings
        .filter(t => t.status === 'processing')
        .reduce((sum, t) => sum + t.amount, 0);

      const totalEarnings = earnings
        .reduce((sum, t) => sum + t.amount, 0);

      // Get last withdrawal
      const { data: lastWithdrawal, error: withdrawalError } = await supabase
        .from('transactions')
        .select('created_at')
        .eq('vendor_id', vendorId)
        .eq('transaction_type', 'withdrawal')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (withdrawalError && withdrawalError.code !== 'PGRST116') {
        throw withdrawalError;
      }

      const walletData = {
        availableBalance,
        pendingBalance,
        totalEarnings,
        lastWithdrawal: lastWithdrawal?.created_at || null,
        nextWithdrawalDate: null, // Calculate based on withdrawal schedule
      };

      logSuccess('Get wallet balance', { vendorId, ...walletData });

      return {
        success: true,
        data: walletData,
      };
    } catch (error) {
      logError('Get wallet balance', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get vendor transactions
   * @param vendorId - Vendor ID
   * @param filters - Optional filters
   * @returns Promise with transactions list
   */
  static async getTransactions(
    vendorId: string,
    filters?: {
      type?: string;
      status?: string;
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
        .from('transactions')
        .select(`
          *,
          bookings:booking_id (
            id,
            booking_reference,
            pickup_date,
            return_date,
            vehicles:vehicle_id (
              brand,
              model,
              license_plate
            )
          )
        `)
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.type) {
        query = query.eq('transaction_type', filters.type);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
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

      logSuccess('Get transactions', { vendorId, count: data?.length });

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      logError('Get transactions', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Request withdrawal
   * @param vendorId - Vendor ID
   * @param amount - Withdrawal amount
   * @param paymentMethod - Payment method details
   * @returns Promise with withdrawal request result
   */
  static async requestWithdrawal(
    vendorId: string,
    amount: number,
    paymentMethod: {
      type: string;
      accountNumber?: string;
      ifscCode?: string;
      upiId?: string;
    }
  ): Promise<ApiResponse<any>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Check available balance
      const balanceResponse = await this.getWalletBalance(vendorId);
      if (!balanceResponse.success) {
        throw new Error('Failed to get wallet balance');
      }

      const availableBalance = balanceResponse.data.availableBalance;
      if (amount > availableBalance) {
        throw new Error('Insufficient balance for withdrawal');
      }

      // Generate transaction reference
      const transactionReference = `WTH-${Date.now().toString().slice(-8)}`;

      // Create withdrawal transaction
      const withdrawalData = {
        transaction_reference: transactionReference,
        vendor_id: vendorId,
        transaction_type: 'withdrawal',
        amount: -amount, // Negative for withdrawal
        currency: 'INR',
        payment_method: paymentMethod.type,
        status: 'processing',
        description: `Withdrawal request of ₹${amount}`,
        notes: JSON.stringify(paymentMethod),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('transactions')
        .insert([withdrawalData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Request withdrawal', { vendorId, amount, transactionReference });

      return {
        success: true,
        data,
        message: 'Withdrawal request submitted successfully',
      };
    } catch (error) {
      logError('Request withdrawal', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get withdrawal history
   * @param vendorId - Vendor ID
   * @returns Promise with withdrawal history
   */
  static async getWithdrawalHistory(vendorId: string): Promise<ApiResponse<any[]>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('vendor_id', vendorId)
        .eq('transaction_type', 'withdrawal')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      logSuccess('Get withdrawal history', { vendorId, count: data?.length });

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      logError('Get withdrawal history', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Create coupon
   * @param vendorId - Vendor ID
   * @param couponData - Coupon data
   * @returns Promise with created coupon
   */
  static async createCoupon(vendorId: string, couponData: any): Promise<ApiResponse<any>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Validate required fields
      const requiredFields = ['code', 'title', 'discount_type', 'discount_value', 'valid_from', 'valid_till'];
      for (const field of requiredFields) {
        if (!couponData[field]) {
          throw new Error(`Required field missing: ${field}`);
        }
      }

      const newCoupon = {
        ...couponData,
        vendor_id: vendorId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('coupons')
        .insert([newCoupon])
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Create coupon', data);

      return {
        success: true,
        data,
        message: 'Coupon created successfully',
      };
    } catch (error) {
      logError('Create coupon', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get vendor coupons
   * @param vendorId - Vendor ID
   * @param status - Optional status filter
   * @returns Promise with coupons list
   */
  static async getCoupons(vendorId: string, status?: string): Promise<ApiResponse<any[]>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      let query = supabase
        .from('coupons')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      logSuccess('Get coupons', { vendorId, count: data?.length });

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      logError('Get coupons', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Update coupon status
   * @param couponId - Coupon ID
   * @param status - New status
   * @returns Promise with updated coupon
   */
  static async updateCouponStatus(couponId: string, status: string): Promise<ApiResponse<any>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data, error } = await supabase
        .from('coupons')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', couponId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Update coupon status', { couponId, status });

      return {
        success: true,
        data,
        message: 'Coupon status updated successfully',
      };
    } catch (error) {
      logError('Update coupon status', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get financial summary
   * @param vendorId - Vendor ID
   * @param period - Time period
   * @returns Promise with financial summary
   */
  static async getFinancialSummary(
    vendorId: string,
    period: 'today' | 'week' | 'month' | 'year' = 'month'
  ): Promise<ApiResponse<{
    totalRevenue: number;
    totalEarnings: number;
    totalWithdrawals: number;
    pendingAmount: number;
    transactionCount: number;
    averageTransactionValue: number;
    topEarningVehicles: any[];
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

      // Get transactions
      const { data: transactions, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .eq('vendor_id', vendorId)
        .gte('created_at', dateFrom.toISOString());

      if (transactionsError) {
        throw transactionsError;
      }

      const earnings = transactions.filter(t => t.amount > 0);
      const withdrawals = transactions.filter(t => t.amount < 0);

      const summary = {
        totalRevenue: earnings.reduce((sum, t) => sum + t.amount, 0),
        totalEarnings: earnings.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0),
        totalWithdrawals: Math.abs(withdrawals.reduce((sum, t) => sum + t.amount, 0)),
        pendingAmount: earnings.filter(t => t.status === 'processing').reduce((sum, t) => sum + t.amount, 0),
        transactionCount: transactions.length,
        averageTransactionValue: transactions.length > 0 ? earnings.reduce((sum, t) => sum + t.amount, 0) / transactions.length : 0,
        topEarningVehicles: [], // TODO: Implement vehicle-wise earnings
      };

      logSuccess('Get financial summary', { vendorId, period, summary });

      return {
        success: true,
        data: summary,
      };
    } catch (error) {
      logError('Get financial summary', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get referral earnings
   * @param vendorId - Vendor ID
   * @returns Promise with referral earnings
   */
  static async getReferralEarnings(vendorId: string): Promise<ApiResponse<{
    totalReferrals: number;
    successfulReferrals: number;
    totalEarnings: number;
    pendingEarnings: number;
    referralList: any[];
  }>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Get referrals
      const { data: referrals, error: referralsError } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', vendorId);

      if (referralsError) {
        throw referralsError;
      }

      // Get referral transactions
      const { data: transactions, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .eq('vendor_id', vendorId)
        .eq('transaction_type', 'referral_bonus');

      if (transactionsError) {
        throw transactionsError;
      }

      const earnings = {
        totalReferrals: referrals.length,
        successfulReferrals: referrals.filter(r => r.status === 'completed').length,
        totalEarnings: transactions.reduce((sum, t) => sum + t.amount, 0),
        pendingEarnings: transactions.filter(t => t.status === 'processing').reduce((sum, t) => sum + t.amount, 0),
        referralList: referrals.map(r => ({
          ...r,
          earnings: transactions.filter(t => t.description?.includes(r.referral_code)).reduce((sum, t) => sum + t.amount, 0)
        })),
      };

      logSuccess('Get referral earnings', { vendorId, ...earnings });

      return {
        success: true,
        data: earnings,
      };
    } catch (error) {
      logError('Get referral earnings', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }
}
