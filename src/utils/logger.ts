/**
 * Production-ready logging utility
 * Handles logging in development and production environments
 */

interface LogLevel {
  DEBUG: 'debug';
  INFO: 'info';
  WARN: 'warn';
  ERROR: 'error';
}

const LOG_LEVELS: LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

/**
 * Logger class for production-ready logging
 */
class Logger {
  private isDevelopment: boolean;
  private logLevel: string;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.logLevel = process.env.EXPO_PUBLIC_LOG_LEVEL || 'info';
  }

  /**
   * Log debug messages (only in development)
   */
  debug(message: string, data?: any): void {
    if (this.isDevelopment && this.shouldLog(LOG_LEVELS.DEBUG)) {
      console.log(`[DEBUG] ${message}`, data || '');
    }
  }

  /**
   * Log info messages
   */
  info(message: string, data?: any): void {
    if (this.shouldLog(LOG_LEVELS.INFO)) {
      console.log(`[INFO] ${message}`, data || '');
    }
  }

  /**
   * Log warning messages
   */
  warn(message: string, data?: any): void {
    if (this.shouldLog(LOG_LEVELS.WARN)) {
      console.warn(`[WARN] ${message}`, data || '');
    }
  }

  /**
   * Log error messages
   */
  error(message: string, error?: any): void {
    if (this.shouldLog(LOG_LEVELS.ERROR)) {
      console.error(`[ERROR] ${message}`, error || '');

      // In production, you might want to send errors to a logging service
      if (!this.isDevelopment) {
        this.sendToLoggingService(message, error);
      }
    }
  }

  /**
   * Check if message should be logged based on log level
   */
  private shouldLog(level: string): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);

    return messageLevelIndex >= currentLevelIndex;
  }

  /**
   * Send error to external logging service (implement as needed)
   */
  private sendToLoggingService(message: string, error: any): void {
    // Implement integration with services like:
    // - Sentry
    // - LogRocket
    // - Bugsnag
    // - Custom logging API

    // For now, we'll just store locally or send to analytics
    try {
      // Example: Send to analytics service
      // AnalyticsService.trackError(message, error);
    } catch (loggingError) {
      // Fallback: silent fail to prevent infinite loops
    }
  }
}

// Create singleton instance
export const logger = new Logger();

/**
 * Error handling utility for production
 */
export class ErrorHandler {
  /**
   * Handle API errors with proper user feedback
   */
  static handleApiError(error: any, context: string): string {
    logger.error(`API Error in ${context}`, error);

    // Return user-friendly error messages
    if (error?.message?.includes('network')) {
      return 'Network error. Please check your connection.';
    }

    if (error?.message?.includes('timeout')) {
      return 'Request timed out. Please try again.';
    }

    if (error?.status === 401) {
      return 'Authentication required. Please log in again.';
    }

    if (error?.status === 403) {
      return 'Access denied. You don\'t have permission for this action.';
    }

    if (error?.status === 404) {
      return 'Resource not found.';
    }

    if (error?.status >= 500) {
      return 'Server error. Please try again later.';
    }

    return 'An unexpected error occurred. Please try again.';
  }

  /**
   * Handle validation errors
   */
  static handleValidationError(field: string, value: any): string {
    logger.warn(`Validation error for field: ${field}`, { value });

    return `Please provide a valid ${field}.`;
  }

  /**
   * Handle file upload errors
   */
  static handleFileUploadError(error: any): string {
    logger.error('File upload error', error);

    if (error?.message?.includes('size')) {
      return 'File size too large. Please choose a smaller file.';
    }

    if (error?.message?.includes('format')) {
      return 'Invalid file format. Please choose a supported file type.';
    }

    return 'Failed to upload file. Please try again.';
  }
}

/**
 * Performance monitoring utility
 */
export class PerformanceMonitor {
  private static timers: Map<string, number> = new Map();

  /**
   * Start performance timer
   */
  static startTimer(label: string): void {
    this.timers.set(label, Date.now());
  }

  /**
   * End performance timer and log result
   */
  static endTimer(label: string): number {
    const startTime = this.timers.get(label);
    if (!startTime) {
      logger.warn(`Timer '${label}' was not started`);
      return 0;
    }

    const duration = Date.now() - startTime;
    this.timers.delete(label);

    logger.debug(`Performance: ${label} took ${duration}ms`);

    return duration;
  }

  /**
   * Measure function execution time
   */
  static async measureAsync<T>(
    label: string,
    fn: () => Promise<T>
  ): Promise<T> {
    this.startTimer(label);
    try {
      const result = await fn();
      this.endTimer(label);
      return result;
    } catch (error) {
      this.endTimer(label);
      throw error;
    }
  }
}

export default logger;
