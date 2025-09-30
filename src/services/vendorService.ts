import { isSupabaseConfigured } from '../config/env';
import { ApiResponse, LoginForm, RegisterForm, Vendor } from '../types';
import { handleSupabaseError, logError, logSuccess, supabase, TABLES } from './supabase';

/**
 * Vendor Service
 * Handles all vendor-related operations including authentication, registration, and profile management
 */
export class VendorService {

  /**
   * Register a new vendor
   * @param formData - Vendor registration form data
   * @returns Promise with registration result
   */
  static async registerVendor(formData: RegisterForm): Promise<ApiResponse<Vendor>> {
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }
      // Validate form data
      if (!formData.email || !formData.password || !formData.name) {
        throw new Error('Required fields are missing');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Create user account with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Failed to create user account');
      }

      // Create vendor profile
      const vendorData = {
        id: authData.user.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        address: formData.address,
        isVerified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data: vendorProfile, error: profileError } = await supabase
        .from(TABLES.VENDORS)
        .insert([vendorData])
        .select()
        .single();

      if (profileError) {
        throw profileError;
      }

      logSuccess('Vendor registration', vendorProfile);

      return {
        success: true,
        data: vendorProfile,
        message: 'Vendor registered successfully',
      };
    } catch (error) {
      logError('Vendor registration', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Login vendor
   * @param credentials - Login credentials
   * @returns Promise with login result
   */
  static async loginVendor(credentials: LoginForm): Promise<ApiResponse<Vendor>> {
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Login failed');
      }

      // Get vendor profile
      const { data: vendorProfile, error: profileError } = await supabase
        .from(TABLES.VENDORS)
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      logSuccess('Vendor login', vendorProfile);

      return {
        success: true,
        data: vendorProfile,
        message: 'Login successful',
      };
    } catch (error) {
      logError('Vendor login', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Get current vendor profile
   * @returns Promise with vendor profile
   */
  static async getCurrentVendor(): Promise<ApiResponse<Vendor>> {
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('No authenticated user');
      }

      const { data: vendorProfile, error } = await supabase
        .from(TABLES.VENDORS)
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Get vendor profile', vendorProfile);

      return {
        success: true,
        data: vendorProfile,
      };
    } catch (error) {
      logError('Get vendor profile', error);
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  }

  /**
   * Update vendor profile
   * @param updates - Partial vendor data to update
   * @returns Promise with updated vendor profile
   */
  static async updateVendorProfile(updates: Partial<Vendor>): Promise<ApiResponse<Vendor>> {
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('No authenticated user');
      }

      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data: updatedProfile, error } = await supabase
        .from(TABLES.VENDORS)
        .update(updateData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      logSuccess('Update vendor profile', updatedProfile);

      return {
        success: true,
        data: updatedProfile,
        message: 'Profile updated successfully',
      };
    } catch (error) {
      logError('Update vendor profile', error);
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
  static async logoutVendor(): Promise<ApiResponse<null>> {
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured() || !supabase) {
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
}
