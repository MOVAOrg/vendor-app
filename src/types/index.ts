/**
 * Type definitions for the MovaVendorApp
 * Contains all the interfaces and types used throughout the application
 */

// Vendor related types
export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  isVerified: boolean;
  profileImage?: string;
  businessType: BusinessType;
  address?: Address;
  bankDetails?: BankDetails;
  documents?: VendorDocuments;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  landmark?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
  accountType: 'Savings' | 'Current';
  upiId?: string;
}

export interface VendorDocuments {
  aadhaarFront?: string;
  aadhaarBack?: string;
  panCard?: string;
  drivingLicense?: string;
  businessProof?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export type BusinessType =
  | 'Individual Owner'
  | 'Partnership'
  | 'Private Limited Company'
  | 'LLP';

// Vehicle related types
export interface Vehicle {
  id: string;
  vendorId: string;
  make: string;
  model: string;
  year: number;
  variant: string;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  seatingCapacity: number;
  color: string;
  registrationNumber: string;
  chassisNumber: string;
  engineNumber: string;
  insuranceNumber: string;
  insuranceExpiry: string;
  fitnessExpiry: string;
  permitExpiry: string;
  pricePerDay: number;
  pricePerKm?: number;
  availability: 'Available' | 'Booked' | 'Maintenance' | 'Out of Service';
  features: string[];
  specifications: VehicleSpecifications;
  images: string[];
  documents: VehicleDocuments;
  location: Address;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleSpecifications {
  engineCapacity: string;
  power: string;
  torque: string;
  mileage: string;
  safetyRating?: string;
  bootSpace?: string;
  groundClearance?: string;
}

export interface VehicleDocuments {
  rcBook?: string;
  insurance?: string;
  fitness?: string;
  permit?: string;
  pollution?: string;
}

// Booking related types
export interface Booking {
  id: string;
  vehicleId: string;
  customerId: string;
  vendorId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  pickupLocation: Address;
  dropoffLocation?: Address;
  totalDays: number;
  totalKm?: number;
  baseAmount: number;
  extraKmCharges?: number;
  extraDayCharges?: number;
  fuelCharges?: number;
  tollCharges?: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  notes?: string;
  customerDetails: CustomerDetails;
  vehicleDetails: Vehicle;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address?: Address;
  licenseNumber?: string;
  licenseExpiry?: string;
  age: number;
  emergencyContact?: string;
}

export type BookingStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Active'
  | 'Completed'
  | 'Cancelled'
  | 'Disputed';

export type PaymentStatus =
  | 'Pending'
  | 'Paid'
  | 'Partial'
  | 'Refunded'
  | 'Failed';

export type PaymentMethod =
  | 'Online'
  | 'Cash'
  | 'Card'
  | 'UPI'
  | 'Bank Transfer';

// Financial types
export interface Transaction {
  id: string;
  vendorId: string;
  bookingId?: string;
  type: TransactionType;
  amount: number;
  description: string;
  status: TransactionStatus;
  paymentMethod?: PaymentMethod;
  referenceId?: string;
  createdAt: string;
}

export type TransactionType =
  | 'Booking Payment'
  | 'Withdrawal'
  | 'Refund'
  | 'Commission'
  | 'Bonus'
  | 'Penalty';

export type TransactionStatus =
  | 'Pending'
  | 'Completed'
  | 'Failed'
  | 'Cancelled';

// Analytics types
export interface Analytics {
  totalBookings: number;
  activeBookings: number;
  completedBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  totalVehicles: number;
  activeVehicles: number;
  utilizationRate: number;
  customerSatisfaction: number;
  topPerformingVehicles: VehiclePerformance[];
  monthlyRevenue: MonthlyRevenue[];
  bookingTrends: BookingTrend[];
}

export interface VehiclePerformance {
  vehicleId: string;
  vehicleName: string;
  totalBookings: number;
  totalRevenue: number;
  utilizationRate: number;
  rating: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  bookings: number;
}

export interface BookingTrend {
  date: string;
  bookings: number;
  revenue: number;
}

// Navigation types
export type RootTabParamList = {
  Home: undefined;
  Explore: undefined;
  Bookings: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  GetStartedScreen: undefined;
  LanguageSelectionScreen: undefined;
  PhoneVerificationScreen: undefined;
  OTPVerificationScreen: {
    phoneNumber: string;
    isRegistration: boolean;
  };
  PersonalDetailsScreen: undefined;
  BusinessDetailsScreen: undefined;
  LocationDetailsScreen: undefined;
  BankDetailsScreen: undefined;
  DocumentUploadScreen: undefined;
  VerificationPendingScreen: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  DashboardScreen: undefined;
  MyFleetScreen: undefined;
  BasicDetailsScreen: undefined;
  FeaturesSpecsScreen: undefined;
  PhotosDocumentsScreen: undefined;
  PricingAvailabilityScreen: undefined;
  EditVehicleScreen: { vehicleId: string };
  VehicleDetailsScreen: { vehicleId: string };
  AddMaintenanceScreen: { vehicleId: string };
  AddManualBookingScreen: undefined;
  BookingDetailsScreen: { bookingId: string };
  CustomerProfileScreen: { customerId: string };
  PreRentalInspectionScreen: { bookingId: string };
  PostRentalInspectionScreen: { bookingId: string };
  VehicleTrackingScreen: { vehicleId: string };
  WalletScreen: undefined;
  TransactionsScreen: undefined;
  WithdrawScreen: undefined;
  CouponsScreen: undefined;
  AnalyticsDashboardScreen: undefined;
  PerformanceMetricsScreen: undefined;
  ReportsScreen: undefined;
  EditProfileScreen: undefined;
  SettingsScreen: undefined;
  NotificationsScreen: undefined;
  ReviewsRatingsScreen: undefined;
  HelpSupportScreen: undefined;
  MaintenanceLogScreen: undefined;
  CalendarViewScreen: undefined;
  DocumentsScreen: undefined;
  LoadingScreen: undefined;
  ErrorScreen: undefined;
  OfflineScreen: undefined;
  EmptyStateScreen: undefined;
};

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form types
export interface PersonalDetailsForm {
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  profilePhoto?: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  businessType: BusinessType;
  acceptTerms: boolean;
}

export interface BusinessDetailsForm {
  businessName?: string;
  businessType: BusinessType;
  gstNumber?: string;
  yearsInBusiness: 'New' | '1-2' | '3-5' | '5+';
  numberOfVehicles: number;
}

export interface LocationDetailsForm {
  state: string;
  city: string;
  pincode: string;
  completeAddress: string;
  landmark?: string;
  useCurrentLocation?: boolean;
}

export interface BankDetailsForm {
  accountHolderName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  accountType: 'Savings' | 'Current';
  upiId?: string;
}

// Language types
export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  code: string;
}

// Common types
export interface SelectOption {
  label: string;
  value: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface FilterOptions {
  dateRange?: DateRange;
  status?: string;
  vehicleType?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Settings types
export interface AppSettings {
  language: string;
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
    bookingUpdates: boolean;
    paymentUpdates: boolean;
    maintenanceReminders: boolean;
  };
  privacy: {
    shareLocation: boolean;
    shareContact: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'auto';
  };
}
