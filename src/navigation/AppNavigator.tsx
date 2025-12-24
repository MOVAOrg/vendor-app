import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';

// Import Authentication Screens
import GetStartedScreen from '../screens/auth/get-started/GetStartedScreen';
import LanguageSelectionScreen from '../screens/auth/language-selection/LanguageSelectionScreen';
import OTPVerificationScreen from '../screens/auth/otp-verification/OTPVerificationScreen';
import PhoneVerificationScreen from '../screens/auth/phone-verification/PhoneVerificationScreen';
import ProfileSetupScreen from '../screens/auth/profile-setup/ProfileSetupScreen';
import BankDetailsScreen from '../screens/auth/registration/bank-details/BankDetailsScreen';
import BusinessDetailsScreen from '../screens/auth/registration/business-details/BusinessDetailsScreen';
import DocumentUploadScreen from '../screens/auth/registration/document-upload/DocumentUploadScreen';
import LocationDetailsScreen from '../screens/auth/registration/location-details/LocationDetailsScreen';
import PersonalDetailsScreen from '../screens/auth/registration/personal-details/PersonalDetailsScreen';
import RegistrationCompleteScreen from '../screens/auth/registration/registration-complete/RegistrationCompleteScreen';
import SplashScreen from '../screens/auth/splash/SplashScreen';
import VerificationPendingScreen from '../screens/auth/verification-pending/VerificationPendingScreen';

// Import Main App Screens
import ExploreScreen from '../screens/(tabs)/explore';
import HomeScreen from '../screens/(tabs)/index';
import DashboardScreen from '../screens/dashboard/DashboardScreen';

// Import Fleet Management Screens
import AddMaintenanceScreen from '../screens/fleet/add-maintenance/AddMaintenanceScreen';
import BasicDetailsScreen from '../screens/fleet/add-vehicle/basic-details/BasicDetailsScreen';
import FeaturesSpecsScreen from '../screens/fleet/add-vehicle/features-specs/FeaturesSpecsScreen';
import PhotosDocumentsScreen from '../screens/fleet/add-vehicle/photos-documents/PhotosDocumentsScreen';
import PricingAvailabilityScreen from '../screens/fleet/add-vehicle/pricing-availability/PricingAvailabilityScreen';
import EditVehicleScreen from '../screens/fleet/edit-vehicle/EditVehicleScreen';
import MyFleetScreen from '../screens/fleet/my-fleet/MyFleetScreen';
import VehicleDetailsScreen from '../screens/fleet/vehicle-details/VehicleDetailsScreen';

// Import Bookings Management Screens
import AddManualBookingScreen from '../screens/bookings/add-manual-booking/AddManualBookingScreen';
import BookingDetailsScreen from '../screens/bookings/booking-details/BookingDetailsScreen';
import CustomerProfileScreen from '../screens/bookings/customer-profile/CustomerProfileScreen';
import MyBookingsScreen from '../screens/bookings/my-bookings/MyBookingsScreen';
import PostRentalInspectionScreen from '../screens/bookings/post-rental-inspection/PostRentalInspectionScreen';
import PreRentalInspectionScreen from '../screens/bookings/pre-rental-inspection/PreRentalInspectionScreen';
import VehicleTrackingScreen from '../screens/bookings/vehicle-tracking/VehicleTrackingScreen';

// Import Financial Management Screens
import CouponsScreen from '../screens/financial/coupons/CouponsScreen';
import TransactionsScreen from '../screens/financial/transactions/TransactionsScreen';
import WalletScreen from '../screens/financial/wallet/WalletScreen';
import WithdrawScreen from '../screens/financial/withdraw/WithdrawScreen';

// Import Analytics Screens
import AnalyticsDashboardScreen from '../screens/analytics/dashboard/AnalyticsDashboardScreen';
import PerformanceMetricsScreen from '../screens/analytics/performance/PerformanceMetricsScreen';
import ReportsScreen from '../screens/analytics/reports/ReportsScreen';

// Import Account & Profile Screens
import EditProfileScreen from '../screens/account/edit-profile/EditProfileScreen';
import HelpSupportScreen from '../screens/account/help-support/HelpSupportScreen';
import NotificationsScreen from '../screens/account/notifications/NotificationsScreen';
import ProfileScreen from '../screens/account/profile/ProfileScreen';
import ReviewsRatingsScreen from '../screens/account/reviews-ratings/ReviewsRatingsScreen';
import SettingsScreen from '../screens/account/settings/SettingsScreen';

// Import Utilities Screens
import CalendarViewScreen from '../screens/utilities/calendar-view/CalendarViewScreen';
import DocumentsScreen from '../screens/utilities/documents/DocumentsScreen';
import MaintenanceLogScreen from '../screens/utilities/maintenance-log/MaintenanceLogScreen';

// Import Common Screens
import EmptyStateScreen from '../screens/common/empty-state/EmptyStateScreen';
import ErrorScreen from '../screens/common/error/ErrorScreen';
import LoadingScreen from '../screens/common/loading/LoadingScreen';
import OfflineScreen from '../screens/common/offline/OfflineScreen';

// Import types
import { BrandColors } from '../constants/brandTheme';
import { RootTabParamList } from '../types';

/**
 * Authentication State Type
 * Defines the different authentication states for the app
 */
type AuthState = 'loading' | 'unauthenticated' | 'authenticated' | 'pending_verification';

/**
 * Development Mode Detection
 * Checks if the app is running in Expo Go for development bypass
 */
const isExpoGo = Constants.appOwnership === 'expo';

/**
 * Main App Navigator
 * Handles the complete navigation structure for the MovaVendorApp
 * Includes authentication flow and main app navigation
 */
const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator();

/**
 * Authentication Stack Navigator
 * Handles all authentication-related screens
 */
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Remove all headers from auth screens
      }}
    >
      <Stack.Screen
        name="GetStartedScreen"
        component={GetStartedScreen}
      />
      <Stack.Screen
        name="LanguageSelectionScreen"
        component={LanguageSelectionScreen}
      />
      <Stack.Screen
        name="PhoneVerificationScreen"
        component={PhoneVerificationScreen}
      />
      <Stack.Screen
        name="OTPVerificationScreen"
        component={OTPVerificationScreen}
      />
      <Stack.Screen
        name="ProfileSetupScreen"
        component={ProfileSetupScreen}
      />
      <Stack.Screen
        name="PersonalDetailsScreen"
        component={PersonalDetailsScreen}
      />
      <Stack.Screen
        name="BusinessDetailsScreen"
        component={BusinessDetailsScreen}
      />
      <Stack.Screen
        name="LocationDetailsScreen"
        component={LocationDetailsScreen}
      />
      <Stack.Screen
        name="BankDetailsScreen"
        component={BankDetailsScreen}
      />
      <Stack.Screen
        name="DocumentUploadScreen"
        component={DocumentUploadScreen}
      />
      <Stack.Screen
        name="RegistrationCompleteScreen"
        component={RegistrationCompleteScreen}
      />
      <Stack.Screen
        name="VerificationPendingScreen"
        component={VerificationPendingScreen}
      />
    </Stack.Navigator>
  );
}

/**
 * Main Tab Navigator Component
 * Handles the main app navigation with bottom tabs
 */
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          // Set appropriate icons for each tab
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Bookings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: BrandColors.primary, // Brand primary color
        tabBarInactiveTintColor: BrandColors.textLight,
        headerShown: false, // Remove all headers from tab screens
        tabBarStyle: {
          backgroundColor: BrandColors.backgroundPrimary,
          borderTopColor: BrandColors.borderLight,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      {/* Home Tab - Dashboard for vendors */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      {/* Explore Tab - Browse cars and manage inventory */}
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
      />

      {/* Bookings Tab - View and manage bookings */}
      <Tab.Screen
        name="Bookings"
        component={MyBookingsScreen}
      />

      {/* Profile Tab - Vendor profile and settings */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

/**
 * Main App Stack Navigator
 * Handles all main app screens and modals
 */
function MainAppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Remove all headers from main app screens
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
      />

      {/* Dashboard Screen */}
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
      />

      {/* Fleet Management Screens */}
      <Stack.Screen
        name="MyFleetScreen"
        component={MyFleetScreen}
      />
      <Stack.Screen
        name="BasicDetailsScreen"
        component={BasicDetailsScreen}
      />
      <Stack.Screen
        name="FeaturesSpecsScreen"
        component={FeaturesSpecsScreen}
      />
      <Stack.Screen
        name="PhotosDocumentsScreen"
        component={PhotosDocumentsScreen}
      />
      <Stack.Screen
        name="PricingAvailabilityScreen"
        component={PricingAvailabilityScreen}
      />
      <Stack.Screen
        name="EditVehicleScreen"
        component={EditVehicleScreen}
      />
      <Stack.Screen
        name="VehicleDetailsScreen"
        component={VehicleDetailsScreen}
      />
      <Stack.Screen
        name="AddMaintenanceScreen"
        component={AddMaintenanceScreen}
      />

      {/* Bookings Management Screens */}
      <Stack.Screen
        name="AddManualBookingScreen"
        component={AddManualBookingScreen}
      />
      <Stack.Screen
        name="BookingDetailsScreen"
        component={BookingDetailsScreen}
      />
      <Stack.Screen
        name="CustomerProfileScreen"
        component={CustomerProfileScreen}
      />
      <Stack.Screen
        name="PreRentalInspectionScreen"
        component={PreRentalInspectionScreen}
      />
      <Stack.Screen
        name="PostRentalInspectionScreen"
        component={PostRentalInspectionScreen}
      />
      <Stack.Screen
        name="VehicleTrackingScreen"
        component={VehicleTrackingScreen}
      />

      {/* Financial Management Screens */}
      <Stack.Screen
        name="WalletScreen"
        component={WalletScreen}
      />
      <Stack.Screen
        name="TransactionsScreen"
        component={TransactionsScreen}
      />
      <Stack.Screen
        name="WithdrawScreen"
        component={WithdrawScreen}
      />
      <Stack.Screen
        name="CouponsScreen"
        component={CouponsScreen}
      />

      {/* Analytics Screens */}
      <Stack.Screen
        name="AnalyticsDashboardScreen"
        component={AnalyticsDashboardScreen}
      />
      <Stack.Screen
        name="PerformanceMetricsScreen"
        component={PerformanceMetricsScreen}
      />
      <Stack.Screen
        name="ReportsScreen"
        component={ReportsScreen}
      />

      {/* Account & Profile Screens */}
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
      />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <Stack.Screen
        name="ReviewsRatingsScreen"
        component={ReviewsRatingsScreen}
      />
      <Stack.Screen
        name="HelpSupportScreen"
        component={HelpSupportScreen}
      />

      {/* Utilities Screens */}
      <Stack.Screen
        name="MaintenanceLogScreen"
        component={MaintenanceLogScreen}
      />
      <Stack.Screen
        name="CalendarViewScreen"
        component={CalendarViewScreen}
      />
      <Stack.Screen
        name="DocumentsScreen"
        component={DocumentsScreen}
      />

      {/* Common Screens */}
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
      />
      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
      />
      <Stack.Screen
        name="OfflineScreen"
        component={OfflineScreen}
      />
      <Stack.Screen
        name="EmptyStateScreen"
        component={EmptyStateScreen}
      />
    </Stack.Navigator>
  );
}

/**
 * Root Stack Navigator
 * Contains both auth and main app stacks for proper navigation
 */
const RootStack = createStackNavigator();

function RootNavigator() {
  // Always start with authentication flow for proper user experience
  // Comment out Expo Go bypass for production-like experience
  // const initialRoute = isExpoGo ? "MainAppStack" : "AuthStack";
  const initialRoute = "AuthStack";

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRoute}
    >
      <RootStack.Screen name="AuthStack" component={AuthStack} />
      <RootStack.Screen name="MainTabs" component={MainTabNavigator} />
      <RootStack.Screen name="MainAppStack" component={MainAppStack} />
    </RootStack.Navigator>
  );
}

/**
 * Main App Navigator Component
 * Handles authentication state and renders appropriate navigator
 */
export function AppNavigator() {
  // Authentication state management
  const [isLoading, setIsLoading] = useState(true);

  // Simulate authentication check on app start
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // In Expo Go, skip loading delay for faster development
        const loadingDelay = isExpoGo ? 500 : 2000;

        // Simulate API call to check authentication status
        await new Promise(resolve => setTimeout(resolve, loadingDelay));
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  // Show splash screen while loading (shorter in Expo Go)
  if (isLoading) {
    return <SplashScreen />;
  }

  // Return root navigator with all stacks
  return <RootNavigator />;
}
