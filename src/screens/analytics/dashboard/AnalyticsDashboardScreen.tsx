import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../../../components/ui/Card';
import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AnalyticsDashboardScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedTab, setSelectedTab] = useState('overview');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const tabs = [
    { id: 'overview', title: 'Overview', icon: 'analytics' },
    { id: 'bookings', title: 'Bookings', icon: 'calendar' },
    { id: 'revenue', title: 'Revenue', icon: 'cash' },
    { id: 'vehicles', title: 'Vehicles', icon: 'car' },
  ];

  const periods = [
    { id: 'week', title: 'This Week' },
    { id: 'month', title: 'This Month' },
    { id: 'quarter', title: 'This Quarter' },
    { id: 'year', title: 'This Year' },
  ];

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalBookings: 45,
      totalRevenue: 125000,
      averageRating: 4.8,
      activeVehicles: 3,
      utilizationRate: 78,
      customerSatisfaction: 92,
    },
    bookings: {
      totalBookings: 45,
      completedBookings: 42,
      cancelledBookings: 3,
      averageBookingDuration: 2.5,
      peakBookingDay: 'Saturday',
      peakBookingTime: '10:00 AM',
    },
    revenue: {
      totalRevenue: 125000,
      monthlyRevenue: 45000,
      averageBookingValue: 2778,
      revenueGrowth: 15.5,
      topRevenueVehicle: 'Toyota Camry 2023',
      revenueByMonth: [
        { month: 'Jan', revenue: 35000 },
        { month: 'Feb', revenue: 42000 },
        { month: 'Mar', revenue: 45000 },
      ],
    },
    vehicles: {
      totalVehicles: 3,
      activeVehicles: 3,
      averageUtilization: 78,
      topPerformingVehicle: 'Toyota Camry 2023',
      vehicleEarnings: [
        { name: 'Toyota Camry 2023', earnings: 55000, bookings: 20 },
        { name: 'Honda City 2022', earnings: 45000, bookings: 18 },
        { name: 'Maruti Swift 2023', earnings: 25000, bookings: 7 },
      ],
    },
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handlePeriodChange = (period: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedPeriod(period);
  };

  const handleTabChange = (tab: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTab(tab);
  };

  const handleExport = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Export', 'Export functionality coming soon!');
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Key Metrics */}
      <View style={styles.metricsGrid}>
        <Card variant="elevated" size="md" style={styles.metricCard}>
          <View style={styles.metricContent}>
            <Ionicons name="calendar" size={24} color={BrandColors.primary} />
            <Text style={styles.metricValue}>{analyticsData.overview.totalBookings}</Text>
            <Text style={styles.metricLabel}>Total Bookings</Text>
          </View>
        </Card>

        <Card variant="elevated" size="md" style={styles.metricCard}>
          <View style={styles.metricContent}>
            <Ionicons name="cash" size={24} color={BrandColors.accent} />
            <Text style={styles.metricValue}>₹{analyticsData.overview.totalRevenue.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Total Revenue</Text>
          </View>
        </Card>

        <Card variant="elevated" size="md" style={styles.metricCard}>
          <View style={styles.metricContent}>
            <Ionicons name="star" size={24} color={BrandColors.warning} />
            <Text style={styles.metricValue}>{analyticsData.overview.averageRating}</Text>
            <Text style={styles.metricLabel}>Avg Rating</Text>
          </View>
        </Card>

        <Card variant="elevated" size="md" style={styles.metricCard}>
          <View style={styles.metricContent}>
            <Ionicons name="car" size={24} color={BrandColors.dot} />
            <Text style={styles.metricValue}>{analyticsData.overview.activeVehicles}</Text>
            <Text style={styles.metricLabel}>Active Vehicles</Text>
          </View>
        </Card>
      </View>

      {/* Performance Indicators */}
      <Card variant="elevated" size="lg" style={styles.performanceCard}>
        <Text style={styles.performanceTitle}>Performance Indicators</Text>

        <View style={styles.performanceItem}>
          <View style={styles.performanceLeft}>
            <View style={[
              styles.performanceIcon,
              { backgroundColor: `${BrandColors.accent}20` },
            ]}>
              <Ionicons name="trending-up" size={20} color={BrandColors.accent} />
            </View>
            <View style={styles.performanceInfo}>
              <Text style={styles.performanceName}>Utilization Rate</Text>
              <Text style={styles.performanceSubtitle}>Vehicle usage efficiency</Text>
            </View>
          </View>
          <View style={styles.performanceRight}>
            <Text style={styles.performanceValue}>{analyticsData.overview.utilizationRate}%</Text>
            <View style={styles.performanceBar}>
              <View style={[
                styles.performanceBarFill,
                { width: `${analyticsData.overview.utilizationRate}%` },
              ]} />
            </View>
          </View>
        </View>

        <View style={styles.performanceDivider} />

        <View style={styles.performanceItem}>
          <View style={styles.performanceLeft}>
            <View style={[
              styles.performanceIcon,
              { backgroundColor: `${BrandColors.warning}20` },
            ]}>
              <Ionicons name="happy" size={20} color={BrandColors.warning} />
            </View>
            <View style={styles.performanceInfo}>
              <Text style={styles.performanceName}>Customer Satisfaction</Text>
              <Text style={styles.performanceSubtitle}>Overall satisfaction score</Text>
            </View>
          </View>
          <View style={styles.performanceRight}>
            <Text style={styles.performanceValue}>{analyticsData.overview.customerSatisfaction}%</Text>
            <View style={styles.performanceBar}>
              <View style={[
                styles.performanceBarFill,
                { width: `${analyticsData.overview.customerSatisfaction}%` },
              ]} />
            </View>
          </View>
        </View>
      </Card>

      {/* Quick Actions */}
      <Card variant="elevated" size="md" style={styles.actionsCard}>
        <Text style={styles.actionsTitle}>Quick Actions</Text>

        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionItem} onPress={handleExport}>
            <LinearGradient
              colors={[BrandColors.primary, BrandColors.primaryDark]}
              style={styles.actionGradient}
            >
              <Ionicons name="download" size={20} color={BrandColors.secondary} />
              <Text style={styles.actionText}>Export Report</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <LinearGradient
              colors={[BrandColors.accent, BrandColors.accentLight]}
              style={styles.actionGradient}
            >
              <Ionicons name="share" size={20} color={BrandColors.secondary} />
              <Text style={styles.actionText}>Share Data</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );

  const renderBookings = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="lg" style={styles.bookingsCard}>
        <Text style={styles.bookingsTitle}>Booking Analytics</Text>

        <View style={styles.bookingsStats}>
          <View style={styles.bookingStat}>
            <Text style={styles.bookingStatValue}>{analyticsData.bookings.totalBookings}</Text>
            <Text style={styles.bookingStatLabel}>Total Bookings</Text>
          </View>

          <View style={styles.bookingStat}>
            <Text style={styles.bookingStatValue}>{analyticsData.bookings.completedBookings}</Text>
            <Text style={styles.bookingStatLabel}>Completed</Text>
          </View>

          <View style={styles.bookingStat}>
            <Text style={styles.bookingStatValue}>{analyticsData.bookings.cancelledBookings}</Text>
            <Text style={styles.bookingStatLabel}>Cancelled</Text>
          </View>
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.bookingDetail}>
            <Text style={styles.bookingDetailLabel}>Average Duration</Text>
            <Text style={styles.bookingDetailValue}>{analyticsData.bookings.averageBookingDuration} days</Text>
          </View>

          <View style={styles.bookingDetail}>
            <Text style={styles.bookingDetailLabel}>Peak Day</Text>
            <Text style={styles.bookingDetailValue}>{analyticsData.bookings.peakBookingDay}</Text>
          </View>

          <View style={styles.bookingDetail}>
            <Text style={styles.bookingDetailLabel}>Peak Time</Text>
            <Text style={styles.bookingDetailValue}>{analyticsData.bookings.peakBookingTime}</Text>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderRevenue = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="lg" style={styles.revenueCard}>
        <Text style={styles.revenueTitle}>Revenue Analytics</Text>

        <View style={styles.revenueStats}>
          <View style={styles.revenueStat}>
            <Text style={styles.revenueStatValue}>₹{analyticsData.revenue.totalRevenue.toLocaleString()}</Text>
            <Text style={styles.revenueStatLabel}>Total Revenue</Text>
          </View>

          <View style={styles.revenueStat}>
            <Text style={styles.revenueStatValue}>₹{analyticsData.revenue.monthlyRevenue.toLocaleString()}</Text>
            <Text style={styles.revenueStatLabel}>This Month</Text>
          </View>

          <View style={styles.revenueStat}>
            <Text style={styles.revenueStatValue}>₹{analyticsData.revenue.averageBookingValue.toLocaleString()}</Text>
            <Text style={styles.revenueStatLabel}>Avg Booking Value</Text>
          </View>
        </View>

        <View style={styles.revenueGrowth}>
          <Text style={styles.revenueGrowthLabel}>Revenue Growth</Text>
          <Text style={styles.revenueGrowthValue}>+{analyticsData.revenue.revenueGrowth}%</Text>
        </View>

        <View style={styles.topVehicle}>
          <Text style={styles.topVehicleLabel}>Top Revenue Vehicle</Text>
          <Text style={styles.topVehicleValue}>{analyticsData.revenue.topRevenueVehicle}</Text>
        </View>
      </Card>
    </View>
  );

  const renderVehicles = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="lg" style={styles.vehiclesCard}>
        <Text style={styles.vehiclesTitle}>Vehicle Performance</Text>

        <View style={styles.vehiclesStats}>
          <View style={styles.vehicleStat}>
            <Text style={styles.vehicleStatValue}>{analyticsData.vehicles.totalVehicles}</Text>
            <Text style={styles.vehicleStatLabel}>Total Vehicles</Text>
          </View>

          <View style={styles.vehicleStat}>
            <Text style={styles.vehicleStatValue}>{analyticsData.vehicles.activeVehicles}</Text>
            <Text style={styles.vehicleStatLabel}>Active</Text>
          </View>

          <View style={styles.vehicleStat}>
            <Text style={styles.vehicleStatValue}>{analyticsData.vehicles.averageUtilization}%</Text>
            <Text style={styles.vehicleStatLabel}>Avg Utilization</Text>
          </View>
        </View>

        <View style={styles.vehicleEarnings}>
          <Text style={styles.vehicleEarningsTitle}>Vehicle Earnings</Text>

          {analyticsData.vehicles.vehicleEarnings.map((vehicle, index) => (
            <View key={index} style={styles.vehicleEarningItem}>
              <View style={styles.vehicleEarningLeft}>
                <Text style={styles.vehicleEarningName}>{vehicle.name}</Text>
                <Text style={styles.vehicleEarningBookings}>{vehicle.bookings} bookings</Text>
              </View>
              <View style={styles.vehicleEarningRight}>
                <Text style={styles.vehicleEarningAmount}>₹{vehicle.earnings.toLocaleString()}</Text>
              </View>
            </View>
          ))}
        </View>
      </Card>
    </View>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview': return renderOverview();
      case 'bookings': return renderBookings();
      case 'revenue': return renderRevenue();
      case 'vehicles': return renderVehicles();
      default: return renderOverview();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={BrandColors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <Text style={styles.title}>Analytics Dashboard</Text>
            <Text style={styles.subtitle}>
              Track your business performance
            </Text>
          </View>

          <TouchableOpacity onPress={handleExport} style={styles.exportButton}>
            <Ionicons name="download" size={24} color={BrandColors.primary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Period Selection */}
        <Animated.View
          style={[
            styles.periodContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Card variant="elevated" size="md" style={styles.periodCard}>
            <Text style={styles.periodTitle}>Time Period</Text>

            <View style={styles.periodRow}>
              {periods.map((period) => (
                <TouchableOpacity
                  key={period.id}
                  style={[
                    styles.periodItem,
                    selectedPeriod === period.id && styles.periodItemActive,
                  ]}
                  onPress={() => handlePeriodChange(period.id)}
                >
                  <Text style={[
                    styles.periodText,
                    selectedPeriod === period.id && styles.periodTextActive,
                  ]}>
                    {period.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        </Animated.View>

        {/* Tabs */}
        <Animated.View
          style={[
            styles.tabsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tabsRow}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  style={[
                    styles.tab,
                    selectedTab === tab.id && styles.tabActive,
                  ]}
                  onPress={() => handleTabChange(tab.id)}
                >
                  <Ionicons
                    name={tab.icon as any}
                    size={20}
                    color={selectedTab === tab.id ? BrandColors.primary : BrandColors.textLight}
                  />
                  <Text style={[
                    styles.tabText,
                    selectedTab === tab.id && styles.tabTextActive,
                  ]}>
                    {tab.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Tab Content */}
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {renderTabContent()}
        </Animated.View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.backgroundPrimary,
  },
  scrollView: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Period
  periodContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  periodCard: {
    width: '100%',
  },
  periodTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  periodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  periodItem: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  periodItemActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  periodText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textLight,
    textAlign: 'center',
  },
  periodTextActive: {
    color: BrandColors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Tabs
  tabsContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  tabsRow: {
    flexDirection: 'row',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    marginRight: Spacing.sm,
    backgroundColor: BrandColors.gray50,
  },
  tabActive: {
    backgroundColor: BrandColors.primary,
  },
  tabText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textLight,
    marginLeft: Spacing.xs,
  },
  tabTextActive: {
    color: BrandColors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Content
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  tabContent: {
    width: '100%',
  },

  // Metrics
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  metricCard: {
    width: '48%',
    marginBottom: Spacing.md,
  },
  metricContent: {
    alignItems: 'center',
  },
  metricValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  metricLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    textAlign: 'center',
  },

  // Performance
  performanceCard: {
    marginBottom: Spacing.lg,
  },
  performanceTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  performanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  performanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  performanceIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  performanceInfo: {
    flex: 1,
  },
  performanceName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  performanceSubtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },
  performanceRight: {
    alignItems: 'flex-end',
  },
  performanceValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.sm,
  },
  performanceBar: {
    width: 80,
    height: 6,
    backgroundColor: BrandColors.gray50,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  performanceBarFill: {
    height: '100%',
    backgroundColor: BrandColors.accent,
    borderRadius: BorderRadius.full,
  },
  performanceDivider: {
    height: 1,
    backgroundColor: BrandColors.borderLight,
    marginVertical: Spacing.sm,
  },

  // Actions
  actionsCard: {
    marginBottom: Spacing.lg,
  },
  actionsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    flex: 1,
    marginHorizontal: Spacing.xs,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  actionText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.secondary,
    marginLeft: Spacing.sm,
  },

  // Bookings
  bookingsCard: {
    marginBottom: Spacing.lg,
  },
  bookingsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  bookingsStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
  },
  bookingStat: {
    alignItems: 'center',
  },
  bookingStatValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  bookingStatLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },
  bookingDetails: {
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: BrandColors.borderLight,
  },
  bookingDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  bookingDetailLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },
  bookingDetailValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
  },

  // Revenue
  revenueCard: {
    marginBottom: Spacing.lg,
  },
  revenueTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  revenueStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
  },
  revenueStat: {
    alignItems: 'center',
  },
  revenueStatValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  revenueStatLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },
  revenueGrowth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: BrandColors.borderLight,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.borderLight,
  },
  revenueGrowthLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },
  revenueGrowthValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.accent,
  },
  topVehicle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  topVehicleLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },
  topVehicleValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
  },

  // Vehicles
  vehiclesCard: {
    marginBottom: Spacing.lg,
  },
  vehiclesTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  vehiclesStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
  },
  vehicleStat: {
    alignItems: 'center',
  },
  vehicleStatValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  vehicleStatLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },
  vehicleEarnings: {
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: BrandColors.borderLight,
  },
  vehicleEarningsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  vehicleEarningItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  vehicleEarningLeft: {
    flex: 1,
  },
  vehicleEarningName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  vehicleEarningBookings: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },
  vehicleEarningRight: {
    alignItems: 'flex-end',
  },
  vehicleEarningAmount: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.accent,
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
