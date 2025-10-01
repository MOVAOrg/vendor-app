import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { ThemedView } from '../components/themed-view';

/**
 * Demo Screen Data Interface
 * Defines the structure for demo screen items
 */
interface DemoItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: keyof typeof Ionicons.glyphMap;
  screenPath?: string;
  component?: React.ComponentType<any>;
}

/**
 * DemoScreen Component
 * Main demo screen that displays all available screens in the app
 * Similar to Flutter's main.dart for showcasing all screens
 */
export default function DemoScreen() {
  const navigation = useNavigation();
  /**
   * Demo screens data organized by categories
   * Each item represents a screen that can be navigated to
   */
  const demoScreens: DemoItem[] = [
    // Authentication Screens
    {
      id: 'splash',
      title: 'Splash Screen',
      description: 'App loading and initialization screen',
      category: 'Authentication',
      icon: 'flash',
      screenPath: 'auth/splash/SplashScreen',
    },
    {
      id: 'get-started',
      title: 'Get Started',
      description: 'Welcome and onboarding screen',
      category: 'Authentication',
      icon: 'rocket',
      screenPath: 'auth/get-started/GetStartedScreen',
    },
    {
      id: 'language-selection',
      title: 'Language Selection',
      description: 'Choose app language preference',
      category: 'Authentication',
      icon: 'language',
      screenPath: 'auth/language-selection/LanguageSelectionScreen',
    },
    {
      id: 'phone-verification',
      title: 'Phone Verification',
      description: 'Phone number verification screen',
      category: 'Authentication',
      icon: 'call',
      screenPath: 'auth/phone-verification/PhoneVerificationScreen',
    },
    {
      id: 'otp-verification',
      title: 'OTP Verification',
      description: 'One-time password verification',
      category: 'Authentication',
      icon: 'keypad',
      screenPath: 'auth/otp-verification/OTPVerificationScreen',
    },
    {
      id: 'personal-details',
      title: 'Personal Details',
      description: 'User personal information form',
      category: 'Authentication',
      icon: 'person',
      screenPath: 'auth/registration/personal-details/PersonalDetailsScreen',
    },
    {
      id: 'business-details',
      title: 'Business Details',
      description: 'Business information registration',
      category: 'Authentication',
      icon: 'business',
      screenPath: 'auth/registration/business-details/BusinessDetailsScreen',
    },
    {
      id: 'location-details',
      title: 'Location Details',
      description: 'Business location and address setup',
      category: 'Authentication',
      icon: 'location',
      screenPath: 'auth/registration/location-details/LocationDetailsScreen',
    },
    {
      id: 'bank-details',
      title: 'Bank Details',
      description: 'Banking information for payments',
      category: 'Authentication',
      icon: 'card',
      screenPath: 'auth/registration/bank-details/BankDetailsScreen',
    },
    {
      id: 'document-upload',
      title: 'Document Upload',
      description: 'Upload verification documents',
      category: 'Authentication',
      icon: 'document',
      screenPath: 'auth/registration/document-upload/DocumentUploadScreen',
    },
    {
      id: 'verification-pending',
      title: 'Verification Pending',
      description: 'Account verification status screen',
      category: 'Authentication',
      icon: 'time',
      screenPath: 'auth/verification-pending/VerificationPendingScreen',
    },

    // Dashboard & Main Screens
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Main vendor dashboard with overview',
      category: 'Dashboard',
      icon: 'grid',
      screenPath: 'dashboard/DashboardScreen',
    },
    {
      id: 'home',
      title: 'Home Screen',
      description: 'Home tab with vendor statistics',
      category: 'Dashboard',
      icon: 'home',
      screenPath: '(tabs)/index',
    },
    {
      id: 'explore',
      title: 'Explore Screen',
      description: 'Browse and manage cars',
      category: 'Dashboard',
      icon: 'search',
      screenPath: '(tabs)/explore',
    },

    // Fleet Management
    {
      id: 'my-fleet',
      title: 'My Fleet',
      description: 'View all vehicles in fleet',
      category: 'Fleet Management',
      icon: 'car-sport',
      screenPath: 'fleet/my-fleet/MyFleetScreen',
    },
    {
      id: 'add-vehicle-basic',
      title: 'Add Vehicle - Basic Details',
      description: 'Add new vehicle basic information',
      category: 'Fleet Management',
      icon: 'add-circle',
      screenPath: 'fleet/add-vehicle/basic-details/BasicDetailsScreen',
    },
    {
      id: 'add-vehicle-features',
      title: 'Add Vehicle - Features & Specs',
      description: 'Configure vehicle features and specifications',
      category: 'Fleet Management',
      icon: 'settings',
      screenPath: 'fleet/add-vehicle/features-specs/FeaturesSpecsScreen',
    },
    {
      id: 'add-vehicle-photos',
      title: 'Add Vehicle - Photos & Documents',
      description: 'Upload vehicle photos and documents',
      category: 'Fleet Management',
      icon: 'camera',
      screenPath: 'fleet/add-vehicle/photos-documents/PhotosDocumentsScreen',
    },
    {
      id: 'add-vehicle-pricing',
      title: 'Add Vehicle - Pricing & Availability',
      description: 'Set pricing and availability schedule',
      category: 'Fleet Management',
      icon: 'cash',
      screenPath: 'fleet/add-vehicle/pricing-availability/PricingAvailabilityScreen',
    },
    {
      id: 'edit-vehicle',
      title: 'Edit Vehicle',
      description: 'Modify existing vehicle details',
      category: 'Fleet Management',
      icon: 'create',
      screenPath: 'fleet/edit-vehicle/EditVehicleScreen',
    },
    {
      id: 'vehicle-details',
      title: 'Vehicle Details',
      description: 'Detailed view of specific vehicle',
      category: 'Fleet Management',
      icon: 'information-circle',
      screenPath: 'fleet/vehicle-details/VehicleDetailsScreen',
    },
    {
      id: 'add-maintenance',
      title: 'Add Maintenance',
      description: 'Log vehicle maintenance record',
      category: 'Fleet Management',
      icon: 'construct',
      screenPath: 'fleet/add-maintenance/AddMaintenanceScreen',
    },
    {
      id: 'maintenance-log',
      title: 'Maintenance Log',
      description: 'View vehicle maintenance history',
      category: 'Fleet Management',
      icon: 'list',
      screenPath: 'utilities/maintenance/MaintenanceLogScreen',
    },

    // Bookings Management
    {
      id: 'my-bookings',
      title: 'My Bookings',
      description: 'View all booking requests and confirmations',
      category: 'Bookings',
      icon: 'calendar',
      screenPath: 'bookings/my-bookings/MyBookingsScreen',
    },
    {
      id: 'add-manual-booking',
      title: 'Add Manual Booking',
      description: 'Create booking manually for customer',
      category: 'Bookings',
      icon: 'add',
      screenPath: 'bookings/add-manual-booking/AddManualBookingScreen',
    },
    {
      id: 'booking-details',
      title: 'Booking Details',
      description: 'Detailed view of specific booking',
      category: 'Bookings',
      icon: 'document-text',
      screenPath: 'bookings/booking-details/BookingDetailsScreen',
    },
    {
      id: 'customer-profile',
      title: 'Customer Profile',
      description: 'View customer information and history',
      category: 'Bookings',
      icon: 'person-circle',
      screenPath: 'bookings/customer-profile/CustomerProfileScreen',
    },
    {
      id: 'pre-rental-inspection',
      title: 'Pre-Rental Inspection',
      description: 'Vehicle inspection before rental',
      category: 'Bookings',
      icon: 'checkmark-circle',
      screenPath: 'bookings/pre-rental-inspection/PreRentalInspectionScreen',
    },
    {
      id: 'post-rental-inspection',
      title: 'Post-Rental Inspection',
      description: 'Vehicle inspection after rental return',
      category: 'Bookings',
      icon: 'checkmark-done',
      screenPath: 'bookings/post-rental-inspection/PostRentalInspectionScreen',
    },
    {
      id: 'vehicle-tracking',
      title: 'Vehicle Tracking',
      description: 'Track vehicle location and status',
      category: 'Bookings',
      icon: 'location',
      screenPath: 'bookings/vehicle-tracking/VehicleTrackingScreen',
    },

    // Financial Management
    {
      id: 'wallet',
      title: 'Wallet',
      description: 'View earnings and wallet balance',
      category: 'Financial',
      icon: 'wallet',
      screenPath: 'financial/wallet/WalletScreen',
    },
    {
      id: 'transactions',
      title: 'Transactions',
      description: 'View transaction history',
      category: 'Financial',
      icon: 'receipt',
      screenPath: 'financial/transactions/TransactionsScreen',
    },
    {
      id: 'withdraw',
      title: 'Withdraw',
      description: 'Withdraw earnings to bank account',
      category: 'Financial',
      icon: 'card',
      screenPath: 'financial/withdraw/WithdrawScreen',
    },
    {
      id: 'coupons',
      title: 'Coupons',
      description: 'Manage discount coupons and promotions',
      category: 'Financial',
      icon: 'pricetag',
      screenPath: 'financial/coupons/CouponsScreen',
    },

    // Analytics & Reports
    {
      id: 'analytics-dashboard',
      title: 'Analytics Dashboard',
      description: 'Business performance analytics',
      category: 'Analytics',
      icon: 'analytics',
      screenPath: 'analytics/dashboard/AnalyticsDashboardScreen',
    },
    {
      id: 'reports',
      title: 'Reports',
      description: 'Generate and view business reports',
      category: 'Analytics',
      icon: 'bar-chart',
      screenPath: 'analytics/reports/ReportsScreen',
    },

    // Account & Profile
    {
      id: 'profile',
      title: 'Profile',
      description: 'Vendor profile and account settings',
      category: 'Account',
      icon: 'person',
      screenPath: 'account/profile/ProfileScreen',
    },
    {
      id: 'edit-profile',
      title: 'Edit Profile',
      description: 'Modify profile information',
      category: 'Account',
      icon: 'create',
      screenPath: 'account/edit-profile/EditProfileScreen',
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'App settings and preferences',
      category: 'Account',
      icon: 'settings',
      screenPath: 'account/settings/SettingsScreen',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Notification preferences and history',
      category: 'Account',
      icon: 'notifications',
      screenPath: 'account/notifications/NotificationsScreen',
    },
    {
      id: 'reviews-ratings',
      title: 'Reviews & Ratings',
      description: 'View customer reviews and ratings',
      category: 'Account',
      icon: 'star',
      screenPath: 'account/reviews-ratings/ReviewsRatingsScreen',
    },
    {
      id: 'help-support',
      title: 'Help & Support',
      description: 'Customer support and help center',
      category: 'Account',
      icon: 'help-circle',
      screenPath: 'account/help-support/HelpSupportScreen',
    },

    // Utilities
    {
      id: 'calendar',
      title: 'Calendar',
      description: 'Calendar view for bookings and availability',
      category: 'Utilities',
      icon: 'calendar',
      screenPath: 'utilities/calendar/CalendarViewScreen',
    },
    {
      id: 'documents',
      title: 'Documents',
      description: 'Manage business documents and files',
      category: 'Utilities',
      icon: 'folder',
      screenPath: 'utilities/documents/DocumentsScreen',
    },

    // Common Screens
    {
      id: 'loading',
      title: 'Loading Screen',
      description: 'App loading state screen',
      category: 'Common',
      icon: 'hourglass',
      screenPath: 'common/loading/LoadingScreen',
    },
    {
      id: 'error',
      title: 'Error Screen',
      description: 'Error state and retry screen',
      category: 'Common',
      icon: 'warning',
      screenPath: 'common/error/ErrorScreen',
    },
    {
      id: 'offline',
      title: 'Offline Screen',
      description: 'No internet connection screen',
      category: 'Common',
      icon: 'cloud-offline',
      screenPath: 'common/offline/OfflineScreen',
    },
    {
      id: 'empty-state',
      title: 'Empty State',
      description: 'Empty state placeholder screen',
      category: 'Common',
      icon: 'document-outline',
      screenPath: 'common/empty-states/EmptyStateScreen',
    },
  ];

  /**
   * Group screens by category for better organization
   */
  const groupedScreens = demoScreens.reduce((acc, screen) => {
    if (!acc[screen.category]) {
      acc[screen.category] = [];
    }
    acc[screen.category].push(screen);
    return acc;
  }, {} as Record<string, DemoItem[]>);

  /**
   * Handle screen navigation
   * Navigates to the actual screen component
   */
  const handleScreenPress = (screen: DemoItem) => {
    // Map screen paths to navigation names
    const screenNameMap: Record<string, string> = {
      'auth/splash/SplashScreen': 'SplashScreen',
      'auth/get-started/GetStartedScreen': 'GetStartedScreen',
      'auth/language-selection/LanguageSelectionScreen': 'LanguageSelectionScreen',
      'auth/phone-verification/PhoneVerificationScreen': 'PhoneVerificationScreen',
      'auth/otp-verification/OTPVerificationScreen': 'OTPVerificationScreen',
      'auth/registration/personal-details/PersonalDetailsScreen': 'PersonalDetailsScreen',
      'auth/registration/business-details/BusinessDetailsScreen': 'BusinessDetailsScreen',
      'auth/registration/location-details/LocationDetailsScreen': 'LocationDetailsScreen',
      'auth/registration/bank-details/BankDetailsScreen': 'BankDetailsScreen',
      'auth/registration/document-upload/DocumentUploadScreen': 'DocumentUploadScreen',
      'auth/verification-pending/VerificationPendingScreen': 'VerificationPendingScreen',
      'dashboard/DashboardScreen': 'DashboardScreen',
      '(tabs)/index': 'HomeScreen',
      '(tabs)/explore': 'ExploreScreen',
      'fleet/my-fleet/MyFleetScreen': 'MyFleetScreen',
      'fleet/add-vehicle/basic-details/BasicDetailsScreen': 'BasicDetailsScreen',
      'fleet/add-vehicle/features-specs/FeaturesSpecsScreen': 'FeaturesSpecsScreen',
      'fleet/add-vehicle/photos-documents/PhotosDocumentsScreen': 'PhotosDocumentsScreen',
      'fleet/add-vehicle/pricing-availability/PricingAvailabilityScreen': 'PricingAvailabilityScreen',
      'fleet/edit-vehicle/EditVehicleScreen': 'EditVehicleScreen',
      'fleet/vehicle-details/VehicleDetailsScreen': 'VehicleDetailsScreen',
      'fleet/add-maintenance/AddMaintenanceScreen': 'AddMaintenanceScreen',
      'utilities/maintenance/MaintenanceLogScreen': 'MaintenanceLogScreen',
      'bookings/my-bookings/MyBookingsScreen': 'MyBookingsScreen',
      'bookings/add-manual-booking/AddManualBookingScreen': 'AddManualBookingScreen',
      'bookings/booking-details/BookingDetailsScreen': 'BookingDetailsScreen',
      'bookings/customer-profile/CustomerProfileScreen': 'CustomerProfileScreen',
      'bookings/pre-rental-inspection/PreRentalInspectionScreen': 'PreRentalInspectionScreen',
      'bookings/post-rental-inspection/PostRentalInspectionScreen': 'PostRentalInspectionScreen',
      'bookings/vehicle-tracking/VehicleTrackingScreen': 'VehicleTrackingScreen',
      'financial/wallet/WalletScreen': 'WalletScreen',
      'financial/transactions/TransactionsScreen': 'TransactionsScreen',
      'financial/withdraw/WithdrawScreen': 'WithdrawScreen',
      'financial/coupons/CouponsScreen': 'CouponsScreen',
      'analytics/dashboard/AnalyticsDashboardScreen': 'AnalyticsDashboardScreen',
      'analytics/reports/ReportsScreen': 'ReportsScreen',
      'account/profile/ProfileScreen': 'ProfileScreen',
      'account/edit-profile/EditProfileScreen': 'EditProfileScreen',
      'account/settings/SettingsScreen': 'SettingsScreen',
      'account/notifications/NotificationsScreen': 'NotificationsScreen',
      'account/reviews-ratings/ReviewsRatingsScreen': 'ReviewsRatingsScreen',
      'account/help-support/HelpSupportScreen': 'HelpSupportScreen',
      'utilities/calendar/CalendarViewScreen': 'CalendarViewScreen',
      'utilities/documents/DocumentsScreen': 'DocumentsScreen',
      'common/loading/LoadingScreen': 'LoadingScreen',
      'common/error/ErrorScreen': 'ErrorScreen',
      'common/offline/OfflineScreen': 'OfflineScreen',
      'common/empty-states/EmptyStateScreen': 'EmptyStateScreen',
    };

    const navigationName = screenNameMap[screen.screenPath || ''];

    if (navigationName) {
      navigation.navigate(navigationName as never);
    } else {
      console.log(`Navigation not implemented for: ${screen.screenPath}`);
    }
  };

  /**
   * Render individual screen item
   */
  const renderScreenItem = ({ item }: { item: DemoItem }) => (
    <TouchableOpacity
      style={styles.screenItem}
      onPress={() => handleScreenPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.screenIconContainer}>
        <Ionicons name={item.icon} size={24} color="#007AFF" />
      </View>
      <View style={styles.screenContent}>
        <Text style={styles.screenTitle}>{item.title}</Text>
        <Text style={styles.screenDescription}>{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  /**
   * Render category section
   */
  const renderCategorySection = (category: string, screens: DemoItem[]) => (
    <View key={category} style={styles.categorySection}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <View style={styles.categoryContent}>
        {screens.map((screen) => (
          <View key={screen.id}>
            {renderScreenItem({ item: screen })}
          </View>
        ))}
      </View>
    </View>
  );

  /**
   * Render header with app information
   */
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerIconContainer}>
        <Ionicons name="car-sport" size={40} color="#007AFF" />
      </View>
      <Text style={styles.headerTitle}>Mova Platform</Text>
      <Text style={styles.headerSubtitle}>Vendor App Demo</Text>
      <Text style={styles.headerDescription}>
        Explore all available screens and features
      </Text>
    </View>
  );

  /**
   * Render statistics section
   */
  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{demoScreens.length}</Text>
        <Text style={styles.statLabel}>Total Screens</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{Object.keys(groupedScreens).length}</Text>
        <Text style={styles.statLabel}>Categories</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>100%</Text>
        <Text style={styles.statLabel}>Coverage</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.themedContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Section */}
          {renderHeader()}

          {/* Statistics Section */}
          {renderStats()}

          {/* Categories and Screens */}
          {Object.entries(groupedScreens).map(([category, screens]) =>
            renderCategorySection(category, screens)
          )}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  themedContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#007AFF',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    fontFamily: 'Montserrat-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontFamily: 'OpenSans-Regular',
  },
  categorySection: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    fontFamily: 'Montserrat-Bold',
  },
  categoryContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  screenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  screenIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  screenContent: {
    flex: 1,
  },
  screenTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 4,
  },
  screenDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'OpenSans-Regular',
  },
});
