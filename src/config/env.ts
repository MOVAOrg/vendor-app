/**
 * Environment Configuration
 * Centralized configuration for environment variables
 * Provides type safety and default values for all environment variables
 */

// Validate required environment variables
const validateEnv = () => {
  const requiredVars = [
    'EXPO_PUBLIC_SUPABASE_URL',
    'EXPO_PUBLIC_SUPABASE_ANON_KEY',
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.warn(
      '⚠️ Missing required environment variables:',
      missingVars.join(', ')
    );
    console.warn(
      'Please check your .env file and ensure all required variables are set.'
    );
  }
};

// Run validation
validateEnv();

/**
 * Environment configuration object
 * Contains all environment variables with proper typing and defaults
 */
export const env = {
  // Supabase Configuration
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    region: process.env.EXPO_PUBLIC_SUPABASE_REGION || 'us-east-1',
    schema: process.env.EXPO_PUBLIC_SUPABASE_SCHEMA || 'public',
  },

  // App Configuration
  app: {
    name: process.env.EXPO_PUBLIC_APP_NAME || 'MovaVendorApp',
    version: process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0',
    environment: process.env.EXPO_PUBLIC_APP_ENV || 'development',
  },

  // Development Configuration
  development: {
    isDev: process.env.NODE_ENV === 'development',
    logLevel: process.env.EXPO_PUBLIC_LOG_LEVEL || 'info',
  },
} as const;

/**
 * Helper function to check if Supabase is properly configured
 * @returns boolean indicating if Supabase configuration is complete
 */
export const isSupabaseConfigured = (): boolean => {
  return !!(env.supabase.url && env.supabase.anonKey);
};

/**
 * Helper function to get Supabase configuration
 * @returns Supabase configuration object or throws error if not configured
 */
export const getSupabaseConfig = () => {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase is not properly configured. Please check your environment variables.'
    );
  }

  return {
    url: env.supabase.url,
    anonKey: env.supabase.anonKey,
    options: {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    },
  };
};

/**
 * Helper function to check if running in development mode
 * @returns boolean indicating if running in development
 */
export const isDevelopment = (): boolean => {
  return env.development.isDev;
};

/**
 * Helper function to check if running in production mode
 * @returns boolean indicating if running in production
 */
export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

/**
 * Helper function to get current environment name
 * @returns string indicating current environment
 */
export const getCurrentEnvironment = (): string => {
  return env.app.environment;
};

// Export individual configurations for convenience
export const { supabase, app, development } = env;
