/**
 * Dashboard Screen
 * Clean, minimalistic vendor dashboard with dynamic greetings
 * Professional design using brand colors and custom fonts
 */

import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONT_FAMILIES } from '../../config/fonts';

// Get device dimensions
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Brand colors - consistent with the app theme
const COLORS = {
  primary: '#00D4D4',
  primaryDark: '#00242C',
  white: '#FFFFFF',
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  textLight: '#999999',
  background: '#F8F9FA',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  border: '#E5E5E5',
  cardBackground: '#FFFFFF',
};

/**
 * DashboardScreen Component
 * Main vendor dashboard showing business overview
 */
export default function DashboardScreen({ navigation }: any) {
  // State management
  const [refreshing, setRefreshing] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    activeBookings: 0,
    totalRevenue: 0,
    totalVehicles: 0,
    monthlyRevenue: 0,
    customerRating: 0,
  });

  // Vendor information (TODO: Fetch from user profile)
  const vendorName = 'Ahmed Al-Rashid';

  /**
   * Get dynamic greeting based on current time
   */
  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'Good Afternoon';
    } else if (currentHour >= 17 && currentHour < 22) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  };

  /**
   * Load dashboard data on mount
   */
  useEffect(() => {
    setGreeting(getGreeting());
    loadDashboardData();
  }, []);

  /**
   * Fetch dashboard analytics data
   */
  const loadDashboardData = async () => {
    try {
      // TODO: Fetch actual data from backend
      // const data = await AnalyticsService.getDashboardAnalytics();

      // Mock data for now
      setDashboardData({
        totalBookings: 156,
        activeBookings: 12,
        totalRevenue: 45600,
        totalVehicles: 8,
        monthlyRevenue: 8400,
        customerRating: 4.7,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  /**
   * Handle pull-to-refresh
   */
  const onRefresh = async () => {
    setRefreshing(true);
    setGreeting(getGreeting()); // Update greeting on refresh
    await loadDashboardData();
    setRefreshing(false);
  };

  /**
   * Navigate to profile screen
   */
  const handleProfilePress = () => {
    navigation.navigate('ProfileScreen');
  };

  /**
   * Navigate to notifications screen
   */
  const handleNotificationsPress = () => {
    navigation.navigate('NotificationsScreen');
  };

  /**
   * Format currency with Indian Rupee symbol
   */
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  /**
   * Quick actions data
   */
  const quickActions = [
    {
      title: 'Add Vehicle',
      icon: 'car-outline',
      color: COLORS.primary,
      onPress: () => navigation.navigate('BasicDetailsScreen'),
    },
    {
      title: 'Bookings',
      icon: 'calendar-outline',
      color: COLORS.success,
      onPress: () => navigation.navigate('MyBookingsScreen'),
    },
    {
      title: 'Analytics',
      icon: 'bar-chart-outline',
      color: COLORS.warning,
      onPress: () => navigation.navigate('AnalyticsDashboardScreen'),
    },
    {
      title: 'Wallet',
      icon: 'wallet-outline',
      color: COLORS.primaryDark,
      onPress: () => navigation.navigate('WalletScreen'),
    },
  ];

  /**
   * Recent activity data
   */
  const recentActivity = [
    {
      id: '1',
      type: 'booking',
      title: 'New Booking Received',
      description: 'Toyota Camry - 3 days rental',
      time: '2 hours ago',
      amount: '₹3,500',
      icon: 'calendar',
      color: COLORS.primary,
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      description: 'Booking #12345 completed',
      time: '4 hours ago',
      amount: '₹5,200',
      icon: 'checkmark-circle',
      color: COLORS.success,
    },
    {
      id: '3',
      type: 'maintenance',
      title: 'Maintenance Reminder',
      description: 'Honda Civic - Oil change due',
      time: '1 day ago',
      amount: null,
      icon: 'construct',
      color: COLORS.warning,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      >
        {/* Header with Profile and Notifications */}
        <View style={styles.header}>
          {/* Profile Button */}
          <TouchableOpacity
            style={styles.profileButton}
            onPress={handleProfilePress}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryDark]}
              style={styles.profileGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="person" size={24} color={COLORS.white} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Greeting and Name */}
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>{greeting} 👋</Text>
            <Text style={styles.vendorName}>{vendorName}</Text>
          </View>

          {/* Notification Button */}
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={handleNotificationsPress}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={24} color={COLORS.textPrimary} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Hero Banner Section */}
        <View style={styles.heroBannerSection}>
          <TouchableOpacity
            style={styles.heroBanner}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('MyFleetScreen')}
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80',
              }}
              style={styles.bannerImage}
              contentFit="cover"
              priority="high"
            />
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 36, 44, 0.8)']}
              style={styles.bannerOverlay}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>Grow Your Fleet</Text>
                <Text style={styles.bannerSubtitle}>
                  Add more vehicles to maximize your earnings
                </Text>
                <View style={styles.bannerButton}>
                  <Text style={styles.bannerButtonText}>Explore Now</Text>
                  <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Key Metrics Cards */}
        <View style={styles.metricsSection}>
          {/* Revenue Card - Featured */}
          <View style={styles.featuredCard}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryDark]}
              style={styles.featuredCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.featuredCardHeader}>
                <Text style={styles.featuredCardLabel}>Total Revenue</Text>
                <Ionicons name="trending-up" size={24} color={COLORS.white} />
              </View>
              <Text style={styles.featuredCardAmount}>
                {formatCurrency(dashboardData.totalRevenue)}
              </Text>
              <View style={styles.monthlyRevenueContainer}>
                <Text style={styles.monthlyRevenueText}>
                  {formatCurrency(dashboardData.monthlyRevenue)} this month
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Statistics Grid */}
          <View style={styles.statsGrid}>
            {/* Total Bookings */}
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: COLORS.primary + '15' }]}>
                <Ionicons name="calendar" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.statNumber}>{dashboardData.totalBookings}</Text>
              <Text style={styles.statLabel}>Total Bookings</Text>
            </View>

            {/* Active Bookings */}
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: COLORS.success + '15' }]}>
                <Ionicons name="time" size={24} color={COLORS.success} />
              </View>
              <Text style={styles.statNumber}>{dashboardData.activeBookings}</Text>
              <Text style={styles.statLabel}>Active Now</Text>
            </View>

            {/* Total Vehicles */}
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: COLORS.warning + '15' }]}>
                <Ionicons name="car-sport" size={24} color={COLORS.warning} />
              </View>
              <Text style={styles.statNumber}>{dashboardData.totalVehicles}</Text>
              <Text style={styles.statLabel}>Vehicles</Text>
            </View>

            {/* Customer Rating */}
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#FFD700' + '15' }]}>
                <Ionicons name="star" size={24} color="#FFD700" />
              </View>
              <Text style={styles.statNumber}>{dashboardData.customerRating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionItem}
                onPress={action.onPress}
                activeOpacity={0.7}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon as any} size={24} color={COLORS.white} />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={handleNotificationsPress} activeOpacity={0.7}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activityList}>
            {recentActivity.map((activity, index) => (
              <TouchableOpacity
                key={activity.id}
                style={[
                  styles.activityItem,
                  index === recentActivity.length - 1 && styles.activityItemLast,
                ]}
                activeOpacity={0.7}
              >
                <View style={[styles.activityIconContainer, { backgroundColor: activity.color + '15' }]}>
                  <Ionicons name={activity.icon as any} size={20} color={activity.color} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                {activity.amount && (
                  <Text style={styles.activityAmount}>{activity.amount}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promotional Banner */}
        <View style={styles.promoBannerSection}>
          <TouchableOpacity
            style={styles.promoBanner}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('AnalyticsDashboardScreen')}
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=1200&q=80',
              }}
              style={styles.promoBannerImage}
              contentFit="cover"
            />
            <LinearGradient
              colors={['rgba(0, 212, 212, 0.9)', 'rgba(0, 36, 44, 0.9)']}
              style={styles.promoBannerOverlay}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.promoBannerContent}>
                <Ionicons name="analytics" size={32} color={COLORS.white} />
                <View style={styles.promoBannerTextContainer}>
                  <Text style={styles.promoBannerTitle}>Track Your Performance</Text>
                  <Text style={styles.promoBannerSubtitle}>
                    View detailed analytics and insights
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color={COLORS.white} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Footer Section with MOVA Branding */}
        <View style={styles.footerSection}>
          <View style={styles.footerBrand}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryDark]}
              style={styles.footerLogoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="car-sport" size={32} color={COLORS.white} />
            </LinearGradient>
            <Text style={styles.footerBrandName}>MOVA</Text>
          </View>

          <Text style={styles.footerTagline}>
            India's Leading Car Rental Platform for Vendors
          </Text>

          <Text style={styles.footerDescription}>
            Manage your fleet, track bookings, and grow your business with our comprehensive vendor platform.
          </Text>

          <View style={styles.footerDivider} />

          <View style={styles.footerLinks}>
            <TouchableOpacity
              style={styles.footerLinkItem}
              onPress={() => navigation.navigate('HelpSupportScreen')}
            >
              <Ionicons name="help-circle-outline" size={18} color={COLORS.textLight} />
              <Text style={styles.footerLinkText}>Help & Support</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.footerLinkItem}
              onPress={() => navigation.navigate('SettingsScreen')}
            >
              <Ionicons name="settings-outline" size={18} color={COLORS.textLight} />
              <Text style={styles.footerLinkText}>Settings</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerCopyright}>
            © 2024 MOVA. All rights reserved.
          </Text>

          <Text style={styles.footerVersion}>Version 1.0.0</Text>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Styles for DashboardScreen
 * Clean, minimalistic design with brand colors
 */
const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  // Header Section
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
  },
  profileButton: {
    marginRight: 16,
  },
  profileGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 14,
    fontFamily: FONT_FAMILIES.openSans.regular,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  vendorName: {
    fontSize: 20,
    fontFamily: FONT_FAMILIES.spaceGrotesk.bold,
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  notificationBadgeText: {
    fontSize: 10,
    fontFamily: FONT_FAMILIES.montserrat.bold,
    color: COLORS.white,
  },

  // Hero Banner Section
  heroBannerSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  heroBanner: {
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 24,
  },
  bannerContent: {
    gap: 8,
  },
  bannerTitle: {
    fontSize: 24,
    fontFamily: FONT_FAMILIES.spaceGrotesk.bold,
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  bannerSubtitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILIES.openSans.regular,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 4,
  },
  bannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 6,
  },
  bannerButtonText: {
    fontSize: 13,
    fontFamily: FONT_FAMILIES.montserrat.bold,
    color: COLORS.white,
  },

  // Metrics Section
  metricsSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  featuredCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  featuredCardGradient: {
    padding: 24,
  },
  featuredCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredCardLabel: {
    fontSize: 14,
    fontFamily: FONT_FAMILIES.openSans.regular,
    color: COLORS.white,
    opacity: 0.9,
  },
  featuredCardAmount: {
    fontSize: 36,
    fontFamily: FONT_FAMILIES.spaceGrotesk.bold,
    color: COLORS.white,
    marginBottom: 8,
    letterSpacing: -1,
  },
  monthlyRevenueContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  monthlyRevenueText: {
    fontSize: 12,
    fontFamily: FONT_FAMILIES.montserrat.semibold,
    color: COLORS.white,
  },

  // Statistics Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  statCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    margin: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: FONT_FAMILIES.spaceGrotesk.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: FONT_FAMILIES.openSans.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },

  // Quick Actions Section
  quickActionsSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONT_FAMILIES.montserrat.bold,
    color: COLORS.textPrimary,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  quickActionItem: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    margin: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: FONT_FAMILIES.montserrat.semibold,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },

  // Recent Activity Section
  activitySection: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: FONT_FAMILIES.montserrat.semibold,
    color: COLORS.primary,
  },
  activityList: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  activityItemLast: {
    borderBottomWidth: 0,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontFamily: FONT_FAMILIES.montserrat.semibold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 13,
    fontFamily: FONT_FAMILIES.openSans.regular,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    fontFamily: FONT_FAMILIES.openSans.regular,
    color: COLORS.textLight,
  },
  activityAmount: {
    fontSize: 15,
    fontFamily: FONT_FAMILIES.montserrat.bold,
    color: COLORS.success,
  },

  // Promotional Banner Section
  promoBannerSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  promoBanner: {
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  promoBannerImage: {
    width: '100%',
    height: '100%',
  },
  promoBannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
  },
  promoBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  promoBannerTextContainer: {
    flex: 1,
  },
  promoBannerTitle: {
    fontSize: 18,
    fontFamily: FONT_FAMILIES.montserrat.bold,
    color: COLORS.white,
    marginBottom: 4,
  },
  promoBannerSubtitle: {
    fontSize: 13,
    fontFamily: FONT_FAMILIES.openSans.regular,
    color: COLORS.white,
    opacity: 0.9,
  },

  // Footer Section
  footerSection: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    alignItems: 'center',
  },
  footerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  footerLogoGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerBrandName: {
    fontSize: 36,
    fontFamily: FONT_FAMILIES.spaceGrotesk.bold,
    color: COLORS.textLight,
    letterSpacing: 2,
  },
  footerTagline: {
    fontSize: 14,
    fontFamily: FONT_FAMILIES.montserrat.semibold,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
  },
  footerDescription: {
    fontSize: 13,
    fontFamily: FONT_FAMILIES.openSans.regular,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  footerDivider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 20,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 20,
  },
  footerLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerLinkText: {
    fontSize: 13,
    fontFamily: FONT_FAMILIES.openSans.regular,
    color: COLORS.textLight,
  },
  footerCopyright: {
    fontSize: 12,
    fontFamily: FONT_FAMILIES.openSans.regular,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  footerVersion: {
    fontSize: 11,
    fontFamily: FONT_FAMILIES.openSans.regular,
    color: COLORS.textLight,
    opacity: 0.6,
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 16,
  },
});
