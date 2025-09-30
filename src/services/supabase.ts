import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

import { getSupabaseConfig, isSupabaseConfigured } from '../config/env';

// Get Supabase configuration from environment
const supabaseConfig = isSupabaseConfigured() ? getSupabaseConfig() : null;

/**
 * Supabase client configuration for MovaVendorApp
 * Handles authentication and database operations
 */
export const supabase = supabaseConfig
  ? createClient(supabaseConfig.url, supabaseConfig.anonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: supabaseConfig.options.auth.autoRefreshToken,
        persistSession: supabaseConfig.options.auth.persistSession,
        detectSessionInUrl: supabaseConfig.options.auth.detectSessionInUrl,
      },
    })
  : null;

/**
 * Database table names for the vendor app
 */
export const TABLES = {
  VENDORS: 'vendors',
  CARS: 'cars',
  BOOKINGS: 'bookings',
  CUSTOMERS: 'customers',
  PAYMENTS: 'payments',
} as const;

/**
 * Helper function to handle Supabase errors
 * @param error - The error object from Supabase
 * @returns Formatted error message
 */
export const handleSupabaseError = (error: any): string => {
  console.error('Supabase Error:', error);

  if (error.message) {
    return error.message;
  }

  if (error.error_description) {
    return error.error_description;
  }

  return 'An unexpected error occurred. Please try again.';
};

/**
 * Helper function to log successful operations
 * @param operation - The operation being performed
 * @param data - The data involved in the operation
 */
export const logSuccess = (operation: string, data?: any) => {
  console.log(`✅ ${operation} successful:`, data);
};

/**
 * Helper function to log errors
 * @param operation - The operation that failed
 * @param error - The error object
 */
export const logError = (operation: string, error: any) => {
  console.error(`❌ ${operation} failed:`, error);
};
