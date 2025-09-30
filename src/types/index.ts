/**
 * TypeScript type definitions for MovaVendorApp
 * Contains all interface and type definitions used throughout the application
 */

// Navigation types
export interface RootTabParamList {
  Home: undefined;
  Explore: undefined;
  Bookings: undefined;
  Profile: undefined;
}

// Vendor related types
export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Car related types
export interface Car {
  id: string;
  vendorId: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  dailyRate: number;
  isAvailable: boolean;
  features: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

// Booking related types
export interface Booking {
  id: string;
  vendorId: string;
  customerId: string;
  carId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

// Customer related types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  address: string;
  rating: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    accent: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  companyName: string;
  address: string;
}

export interface CarForm {
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  dailyRate: number;
  features: string[];
  images: string[];
}
