import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// Import all screens for navigation
import DemoScreen from '../screens/DemoScreen';

// Authentication Screens
import GetStartedScreen from '../screens/auth/get-started/GetStartedScreen';
import LanguageSelectionScreen from '../screens/auth/language-selection/LanguageSelectionScreen';
import OTPVerificationScreen from '../screens/auth/otp-verification/OTPVerificationScreen';
import PhoneVerificationScreen from '../screens/auth/phone-verification/PhoneVerificationScreen';
import BankDetailsScreen from '../screens/auth/registration/bank-details/BankDetailsScreen';
import BusinessDetailsScreen from '../screens/auth/registration/business-details/BusinessDetailsScreen';
import DocumentUploadScreen from '../screens/auth/registration/document-upload/DocumentUploadScreen';
import LocationDetailsScreen from '../screens/auth/registration/location-details/LocationDetailsScreen';
import PersonalDetailsScreen from '../screens/auth/registration/personal-details/PersonalDetailsScreen';
import SplashScreen from '../screens/auth/splash/SplashScreen';
import VerificationPendingScreen from '../screens/auth/verification-pending/VerificationPendingScreen';

// Dashboard & Main Screens
import ExploreScreen from '../screens/(tabs)/explore';
import HomeScreen from '../screens/(tabs)/index';
import DashboardScreen from '../screens/dashboard/DashboardScreen';

// Fleet Management Screens
import AddMaintenanceScreen from '../screens/fleet/add-maintenance/AddMaintenanceScreen';
import BasicDetailsScreen from '../screens/fleet/add-vehicle/basic-details/BasicDetailsScreen';
import FeaturesSpecsScreen from '../screens/fleet/add-vehicle/features-specs/FeaturesSpecsScreen';
import PhotosDocumentsScreen from '../screens/fleet/add-vehicle/photos-documents/PhotosDocumentsScreen';
import PricingAvailabilityScreen from '../screens/fleet/add-vehicle/pricing-availability/PricingAvailabilityScreen';
import EditVehicleScreen from '../screens/fleet/edit-vehicle/EditVehicleScreen';
import MyFleetScreen from '../screens/fleet/my-fleet/MyFleetScreen';
import VehicleDetailsScreen from '../screens/fleet/vehicle-details/VehicleDetailsScreen';
import MaintenanceLogScreen from '../screens/utilities/maintenance/MaintenanceLogScreen';

// Bookings Management Screens
import AddManualBookingScreen from '../screens/bookings/add-manual-booking/AddManualBookingScreen';
import BookingDetailsScreen from '../screens/bookings/booking-details/BookingDetailsScreen';
import CustomerProfileScreen from '../screens/bookings/customer-profile/CustomerProfileScreen';
import MyBookingsScreen from '../screens/bookings/my-bookings/MyBookingsScreen';
import PostRentalInspectionScreen from '../screens/bookings/post-rental-inspection/PostRentalInspectionScreen';
import PreRentalInspectionScreen from '../screens/bookings/pre-rental-inspection/PreRentalInspectionScreen';
import VehicleTrackingScreen from '../screens/bookings/vehicle-tracking/VehicleTrackingScreen';

// Financial Management Screens
import CouponsScreen from '../screens/financial/coupons/CouponsScreen';
import TransactionsScreen from '../screens/financial/transactions/TransactionsScreen';
import WalletScreen from '../screens/financial/wallet/WalletScreen';
import WithdrawScreen from '../screens/financial/withdraw/WithdrawScreen';

// Analytics & Reports Screens
import AnalyticsDashboardScreen from '../screens/analytics/dashboard/AnalyticsDashboardScreen';
import ReportsScreen from '../screens/analytics/reports/ReportsScreen';

// Account & Profile Screens
import EditProfileScreen from '../screens/account/edit-profile/EditProfileScreen';
import HelpSupportScreen from '../screens/account/help-support/HelpSupportScreen';
import NotificationsScreen from '../screens/account/notifications/NotificationsScreen';
import ProfileScreen from '../screens/account/profile/ProfileScreen';
import ReviewsRatingsScreen from '../screens/account/reviews-ratings/ReviewsRatingsScreen';
import SettingsScreen from '../screens/account/settings/SettingsScreen';

// Utilities Screens
import CalendarViewScreen from '../screens/utilities/calendar/CalendarViewScreen';
import DocumentsScreen from '../screens/utilities/documents/DocumentsScreen';

// Common Screens
import EmptyStateScreen from '../screens/common/empty-states/EmptyStateScreen';
import ErrorScreen from '../screens/common/error/ErrorScreen';
import LoadingScreen from '../screens/common/loading/LoadingScreen';
import OfflineScreen from '../screens/common/offline/OfflineScreen';

// Legacy Screens
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreenLegacy from '../screens/ProfileScreen';

/**
 * Demo Navigator Stack
 * Handles navigation between all demo screens
 * Allows users to explore all available screens in the app
 */
const Stack = createStackNavigator();

export function DemoNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="DemoScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: 'Montserrat-Bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      {/* Demo Screen - Main entry point */}
      <Stack.Screen
        name="DemoScreen"
        component={DemoScreen}
        options={{
          title: 'Mova Platform Demo',
          headerShown: false, // Hide header for demo screen
        }}
      />

      {/* Authentication Screens */}
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          title: 'Splash Screen',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GetStartedScreen"
        component={GetStartedScreen}
        options={{
          title: 'Get Started',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LanguageSelectionScreen"
        component={LanguageSelectionScreen}
        options={{
          title: 'Language Selection',
        }}
      />
      <Stack.Screen
        name="PhoneVerificationScreen"
        component={PhoneVerificationScreen}
        options={{
          title: 'Phone Verification',
        }}
      />
      <Stack.Screen
        name="OTPVerificationScreen"
        component={OTPVerificationScreen}
        options={{
          title: 'OTP Verification',
        }}
      />
      <Stack.Screen
        name="PersonalDetailsScreen"
        component={PersonalDetailsScreen}
        options={{
          title: 'Personal Details',
        }}
      />
      <Stack.Screen
        name="BusinessDetailsScreen"
        component={BusinessDetailsScreen}
        options={{
          title: 'Business Details',
        }}
      />
      <Stack.Screen
        name="LocationDetailsScreen"
        component={LocationDetailsScreen}
        options={{
          title: 'Location Details',
        }}
      />
      <Stack.Screen
        name="BankDetailsScreen"
        component={BankDetailsScreen}
        options={{
          title: 'Bank Details',
        }}
      />
      <Stack.Screen
        name="DocumentUploadScreen"
        component={DocumentUploadScreen}
        options={{
          title: 'Document Upload',
        }}
      />
      <Stack.Screen
        name="VerificationPendingScreen"
        component={VerificationPendingScreen}
        options={{
          title: 'Verification Pending',
        }}
      />

      {/* Dashboard & Main Screens */}
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          title: 'Explore',
        }}
      />

      {/* Fleet Management Screens */}
      <Stack.Screen
        name="MyFleetScreen"
        component={MyFleetScreen}
        options={{
          title: 'My Fleet',
        }}
      />
      <Stack.Screen
        name="BasicDetailsScreen"
        component={BasicDetailsScreen}
        options={{
          title: 'Basic Details',
        }}
      />
      <Stack.Screen
        name="FeaturesSpecsScreen"
        component={FeaturesSpecsScreen}
        options={{
          title: 'Features & Specs',
        }}
      />
      <Stack.Screen
        name="PhotosDocumentsScreen"
        component={PhotosDocumentsScreen}
        options={{
          title: 'Photos & Documents',
        }}
      />
      <Stack.Screen
        name="PricingAvailabilityScreen"
        component={PricingAvailabilityScreen}
        options={{
          title: 'Pricing & Availability',
        }}
      />
      <Stack.Screen
        name="EditVehicleScreen"
        component={EditVehicleScreen}
        options={{
          title: 'Edit Vehicle',
        }}
      />
      <Stack.Screen
        name="VehicleDetailsScreen"
        component={VehicleDetailsScreen}
        options={{
          title: 'Vehicle Details',
        }}
      />
      <Stack.Screen
        name="AddMaintenanceScreen"
        component={AddMaintenanceScreen}
        options={{
          title: 'Add Maintenance',
        }}
      />
      <Stack.Screen
        name="MaintenanceLogScreen"
        component={MaintenanceLogScreen}
        options={{
          title: 'Maintenance Log',
        }}
      />

      {/* Bookings Management Screens */}
      <Stack.Screen
        name="MyBookingsScreen"
        component={MyBookingsScreen}
        options={{
          title: 'My Bookings',
        }}
      />
      <Stack.Screen
        name="AddManualBookingScreen"
        component={AddManualBookingScreen}
        options={{
          title: 'Add Manual Booking',
        }}
      />
      <Stack.Screen
        name="BookingDetailsScreen"
        component={BookingDetailsScreen}
        options={{
          title: 'Booking Details',
        }}
      />
      <Stack.Screen
        name="CustomerProfileScreen"
        component={CustomerProfileScreen}
        options={{
          title: 'Customer Profile',
        }}
      />
      <Stack.Screen
        name="PreRentalInspectionScreen"
        component={PreRentalInspectionScreen}
        options={{
          title: 'Pre-Rental Inspection',
        }}
      />
      <Stack.Screen
        name="PostRentalInspectionScreen"
        component={PostRentalInspectionScreen}
        options={{
          title: 'Post-Rental Inspection',
        }}
      />
      <Stack.Screen
        name="VehicleTrackingScreen"
        component={VehicleTrackingScreen}
        options={{
          title: 'Vehicle Tracking',
        }}
      />

      {/* Financial Management Screens */}
      <Stack.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{
          title: 'Wallet',
        }}
      />
      <Stack.Screen
        name="TransactionsScreen"
        component={TransactionsScreen}
        options={{
          title: 'Transactions',
        }}
      />
      <Stack.Screen
        name="WithdrawScreen"
        component={WithdrawScreen}
        options={{
          title: 'Withdraw',
        }}
      />
      <Stack.Screen
        name="CouponsScreen"
        component={CouponsScreen}
        options={{
          title: 'Coupons',
        }}
      />

      {/* Analytics & Reports Screens */}
      <Stack.Screen
        name="AnalyticsDashboardScreen"
        component={AnalyticsDashboardScreen}
        options={{
          title: 'Analytics Dashboard',
        }}
      />
      <Stack.Screen
        name="ReportsScreen"
        component={ReportsScreen}
        options={{
          title: 'Reports',
        }}
      />

      {/* Account & Profile Screens */}
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
        }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
        }}
      />
      <Stack.Screen
        name="ReviewsRatingsScreen"
        component={ReviewsRatingsScreen}
        options={{
          title: 'Reviews & Ratings',
        }}
      />
      <Stack.Screen
        name="HelpSupportScreen"
        component={HelpSupportScreen}
        options={{
          title: 'Help & Support',
        }}
      />

      {/* Utilities Screens */}
      <Stack.Screen
        name="CalendarViewScreen"
        component={CalendarViewScreen}
        options={{
          title: 'Calendar',
        }}
      />
      <Stack.Screen
        name="DocumentsScreen"
        component={DocumentsScreen}
        options={{
          title: 'Documents',
        }}
      />

      {/* Common Screens */}
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{
          title: 'Loading',
        }}
      />
      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={{
          title: 'Error',
        }}
      />
      <Stack.Screen
        name="OfflineScreen"
        component={OfflineScreen}
        options={{
          title: 'Offline',
        }}
      />
      <Stack.Screen
        name="EmptyStateScreen"
        component={EmptyStateScreen}
        options={{
          title: 'Empty State',
        }}
      />

      {/* Legacy Screens */}
      <Stack.Screen
        name="BookingsScreen"
        component={BookingsScreen}
        options={{
          title: 'Bookings',
        }}
      />
      <Stack.Screen
        name="ProfileScreenLegacy"
        component={ProfileScreenLegacy}
        options={{
          title: 'Profile (Legacy)',
        }}
      />
    </Stack.Navigator>
  );
}
