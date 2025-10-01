import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

/**
 * Simplified Main App Component
 * Optimized build with minimal dependencies
 * Shows all available screens in a simple list
 */
export default function Page() {
  const screens = [
    { name: 'Splash Screen', path: 'SplashScreen' },
    { name: 'Get Started', path: 'GetStartedScreen' },
    { name: 'Language Selection', path: 'LanguageSelectionScreen' },
    { name: 'Phone Verification', path: 'PhoneVerificationScreen' },
    { name: 'OTP Verification', path: 'OTPVerificationScreen' },
    { name: 'Personal Details', path: 'PersonalDetailsScreen' },
    { name: 'Business Details', path: 'BusinessDetailsScreen' },
    { name: 'Location Details', path: 'LocationDetailsScreen' },
    { name: 'Bank Details', path: 'BankDetailsScreen' },
    { name: 'Document Upload', path: 'DocumentUploadScreen' },
    { name: 'Verification Pending', path: 'VerificationPendingScreen' },
    { name: 'Dashboard', path: 'DashboardScreen' },
    { name: 'Home', path: 'HomeScreen' },
    { name: 'Explore', path: 'ExploreScreen' },
    { name: 'My Fleet', path: 'MyFleetScreen' },
    { name: 'Basic Details', path: 'BasicDetailsScreen' },
    { name: 'Features & Specs', path: 'FeaturesSpecsScreen' },
    { name: 'Photos & Documents', path: 'PhotosDocumentsScreen' },
    { name: 'Pricing & Availability', path: 'PricingAvailabilityScreen' },
    { name: 'Edit Vehicle', path: 'EditVehicleScreen' },
    { name: 'Vehicle Details', path: 'VehicleDetailsScreen' },
    { name: 'Add Maintenance', path: 'AddMaintenanceScreen' },
    { name: 'Maintenance Log', path: 'MaintenanceLogScreen' },
    { name: 'My Bookings', path: 'MyBookingsScreen' },
    { name: 'Add Manual Booking', path: 'AddManualBookingScreen' },
    { name: 'Booking Details', path: 'BookingDetailsScreen' },
    { name: 'Customer Profile', path: 'CustomerProfileScreen' },
    { name: 'Pre-Rental Inspection', path: 'PreRentalInspectionScreen' },
    { name: 'Post-Rental Inspection', path: 'PostRentalInspectionScreen' },
    { name: 'Vehicle Tracking', path: 'VehicleTrackingScreen' },
    { name: 'Wallet', path: 'WalletScreen' },
    { name: 'Transactions', path: 'TransactionsScreen' },
    { name: 'Withdraw', path: 'WithdrawScreen' },
    { name: 'Coupons', path: 'CouponsScreen' },
    { name: 'Analytics Dashboard', path: 'AnalyticsDashboardScreen' },
    { name: 'Reports', path: 'ReportsScreen' },
    { name: 'Profile', path: 'ProfileScreen' },
    { name: 'Edit Profile', path: 'EditProfileScreen' },
    { name: 'Settings', path: 'SettingsScreen' },
    { name: 'Notifications', path: 'NotificationsScreen' },
    { name: 'Reviews & Ratings', path: 'ReviewsRatingsScreen' },
    { name: 'Help & Support', path: 'HelpSupportScreen' },
    { name: 'Calendar', path: 'CalendarViewScreen' },
    { name: 'Documents', path: 'DocumentsScreen' },
    { name: 'Loading', path: 'LoadingScreen' },
    { name: 'Error', path: 'ErrorScreen' },
    { name: 'Offline', path: 'OfflineScreen' },
    { name: 'Empty State', path: 'EmptyStateScreen' },
  ];

  const handleScreenPress = (screenName: string) => {
    console.log(`Navigating to: ${screenName}`);
    // For now, just log the navigation
    // In a real app, this would navigate to the actual screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🚗 Mova Platform</Text>
        <Text style={styles.subtitle}>Vendor App Demo</Text>
      </View>

      {/* Screens List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Available Screens ({screens.length})</Text>
        
        {screens.map((screen, index) => (
          <TouchableOpacity
            key={index}
            style={styles.screenItem}
            onPress={() => handleScreenPress(screen.name)}
            activeOpacity={0.7}
          >
            <View style={styles.screenContent}>
              <Text style={styles.screenName}>{screen.name}</Text>
              <Text style={styles.screenPath}>{screen.path}</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Tap any screen to navigate (Demo Mode)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#e6f3ff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  screenItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  screenContent: {
    flex: 1,
  },
  screenName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  screenPath: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  arrow: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});