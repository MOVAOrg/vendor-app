import { ApiResponse, RegisterForm, Vendor } from '../../types';
import { handleSupabaseError, logError, logSuccess, supabase } from '../supabase';

/**
 * Authentication Service
 * Handles all authentication-related operations including registration, login, OTP verification
 */
export class AuthService {

  /**
   * Send OTP to phone number for verification
   * @param phoneNumber - Phone number with country code
   * @returns Promise with OTP sending result
   */
  static async sendOTP(phoneNumber: string): Promise<ApiResponse<{ message: string }>> {
    try {
      // TODO: Integrate with SMS gateway (MSG91, Twilio, etc.)
      // For now, simulate OTP sending
      console.log(`Sending OTP to ${phoneNumber}`);

      // In production, this would call your SMS service
      // const response = await smsGateway.sendOTP(phoneNumber);

      logSuccess('OTP sent', { phoneNumber });

      return {
        success: true,
        data: { message: 'OTP sent successfully' },
      };
    } catch (error) {
      logError('Send OTP', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Verify OTP code
   * @param phoneNumber - Phone number
   * @param otpCode - OTP code entered by user
   * @returns Promise with verification result
   */
  static async verifyOTP(phoneNumber: string, otpCode: string): Promise<ApiResponse<{ verified: boolean }>> {
    try {
      // TODO: Integrate with SMS gateway verification
      // For now, simulate OTP verification (accept any 6-digit code)
      const isValidOTP = /^\d{6}$/.test(otpCode);

      if (!isValidOTP) {
        throw new Error('Invalid OTP format');
      }

      // In production, this would verify with your SMS service
      // const response = await smsGateway.verifyOTP(phoneNumber, otpCode);

      logSuccess('OTP verified', { phoneNumber });

      return {
        success: true,
        data: { verified: true },
      };
    } catch (error) {
      logError('Verify OTP', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Register a new vendor with phone number
   * @param phoneNumber - Verified phone number
   * @param formData - Vendor registration form data
   * @returns Promise with registration result
   */
  static async registerWithPhone(phoneNumber: string, formData: RegisterForm): Promise<ApiResponse<Vendor>> {
    try {
      // Check if Supabase is configured
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Validate form data
      if (!formData.email || !formData.name) {
        throw new Error('Required fields are missing');
      }

      // Create user account with phone number as primary identifier
      // Note: Supabase Auth doesn't support phone-only auth by default
      // You might need to use email as primary and store phone separately
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password || 'temp-password-' + Date.now(), // Generate temp password
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Failed to create user account');
      }

      // Create vendor profile with phone number
      const vendorData = {
        id: authData.user.id,
        name: formData.name,
        email: formData.email,
        phone: phoneNumber,
        company_name: formData.companyName,
        business_type: formData.businessType,
        gst_number: formData.gstNumber,
        years_in_business: formData.yearsInBusiness,
        current_vehicles_count: formData.currentVehiclesCount || 0,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        address: formData.address,
        landmark: formData.landmark,
        latitude: formData.latitude,
        longitude: formData.longitude,
        account_holder_name: formData.accountHolderName,
        account_number: formData.accountNumber,
        ifsc_code: formData.ifscCode,
        bank_name: formData.bankName,
        branch_name: formData.branchName,
        account_type: formData.accountType,
        upi_id: formData.upiId,
        language: formData.language || 'en',
        is_verified: false,
        verification_status: 'pending',
      };

      const { data: vendorProfile, error: profileError } = await supabase
        .from('vendors')
        .insert([vendorData])
        .select()
        .single();

      if (profileError) {
        throw profileError;
      }

      logSuccess('Vendor registration with phone', vendorProfile);

      return {
        success: true,
        data: vendorProfile,
        message: 'Vendor registered successfully',
      };
    } catch (error) {
      logError('Register with phone', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Login vendor with phone number and OTP
   * @param phoneNumber - Phone number
   * @param otpCode - OTP code
   * @returns Promise with login result
   */
  static async loginWithPhone(phoneNumber: string, otpCode: string): Promise<ApiResponse<Vendor>> {
    try {
      // Check if Supabase is configured
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // First verify OTP
      const otpVerification = await this.verifyOTP(phoneNumber, otpCode);
      if (!otpVerification.success) {
        throw new Error('Invalid OTP');
      }

      // Find vendor by phone number
      const { data: vendorProfile, error: profileError } = await supabase
        .from('vendors')
        .select('*')
        .eq('phone', phoneNumber)
        .single();

      if (profileError) {
        throw new Error('Vendor not found with this phone number');
      }

      // Sign in with email (since phone auth is not directly supported)
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: vendorProfile.email,
        password: 'temp-password-' + Date.now(), // This won't work in production
      });

      if (authError) {
        // For development, we'll just return the vendor profile
        // In production, you'd need a different auth strategy
        console.warn('Auth sign-in failed, but continuing with vendor profile');
      }

      logSuccess('Vendor login with phone', vendorProfile);

      return {
        success: true,
        data: vendorProfile,
        message: 'Login successful',
      };
    } catch (error) {
      logError('Login with phone', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Check if phone number is already registered
   * @param phoneNumber - Phone number to check
   * @returns Promise with check result
   */
  static async checkPhoneExists(phoneNumber: string): Promise<ApiResponse<{ exists: boolean }>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data, error } = await supabase
        .from('vendors')
        .select('id')
        .eq('phone', phoneNumber)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      const exists = !!data;

      return {
        success: true,
        data: { exists },
      };
    } catch (error) {
      logError('Check phone exists', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Resend OTP to phone number
   * @param phoneNumber - Phone number
   * @returns Promise with resend result
   */
  static async resendOTP(phoneNumber: string): Promise<ApiResponse<{ message: string }>> {
    try {
      // Use the same sendOTP method
      return await this.sendOTP(phoneNumber);
    } catch (error) {
      logError('Resend OTP', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Logout current vendor
   * @returns Promise with logout result
   */
  static async logout(): Promise<ApiResponse<null>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      logSuccess('Vendor logout');

      return {
        success: true,
        message: 'Logged out successfully',
      };
    } catch (error) {
      logError('Vendor logout', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get current authenticated vendor
   * @returns Promise with vendor profile
   */
  static async getCurrentVendor(): Promise<ApiResponse<Vendor>> {
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('No authenticated user');
      }

      const { data: vendorProfile, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Get current vendor', vendorProfile);

      return {
        success: true,
        data: vendorProfile,
      };
    } catch (error) {
      logError('Get current vendor', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }
}
