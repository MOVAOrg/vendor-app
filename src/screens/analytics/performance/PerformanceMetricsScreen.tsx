import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
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

export default function PerformanceMetricsScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const metrics = [
    { id: 'overview', title: 'Overview', icon: 'analytics' },
    { id: 'efficiency', title: 'Efficiency', icon: 'speedometer' },
    { id: 'customer', title: 'Customer', icon: 'people' },
    { id: 'financial', title: 'Financial', icon: 'cash' },
  ];

  const periods = [
    { id: 'week', title: 'This Week' },
    { id: 'month', title: 'This Month' },
    { id: 'quarter', title: 'This Quarter' },
    { id: 'year', title: 'This Year' },
  ];

  // Mock performance data
  const performanceData = {
    overview: {
      totalBookings: 45,
      completionRate: 93.3,
      averageRating: 4.8,
      customerRetention: 78.5,
      revenueGrowth: 15.5,
      utilizationRate: 78.2,
    },
    efficiency: {
      averageResponseTime: 2.5,
      bookingProcessingTime: 15,
      vehiclePreparationTime: 30,
      customerWaitTime: 5,
      maintenanceEfficiency: 85,
      fuelEfficiency: 92,
    },
    customer: {
      totalCustomers: 38,
      newCustomers: 12,
      returningCustomers: 26,
      averageSatisfaction: 4.8,
      complaintRate: 2.1,
      referralRate: 35,
    },
    financial: {
      totalRevenue: 125000,
      averageBookingValue: 2778,
      profitMargin: 68.5,
      costPerBooking: 875,
      revenuePerVehicle: 41667,
      monthlyGrowth: 15.5,
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

  const handleMetricChange = (metric: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedMetric(metric);
  };

  const handlePeriodChange = (period: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedPeriod(period);
  };

  const handleExport = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Export', 'Export functionality coming soon!');
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Key Performance Indicators */}
      <Card variant="elevated" size="lg" style={styles.kpiCard}>
        <Text style={styles.kpiTitle}>Key Performance Indicators</Text>

        <View style={styles.kpiGrid}>
          <View style={styles.kpiItem}>
            <View style={[
              styles.kpiIcon,
              { backgroundColor: `${BrandColors.primary}20` },
            ]}>
              <Ionicons name="calendar" size={20} color={BrandColors.primary} />
            </View>
            <Text style={styles.kpiValue}>{performanceData.overview.totalBookings}</Text>
            <Text style={styles.kpiLabel}>Total Bookings</Text>
          </View>

          <View style={styles.kpiItem}>
            <View style={[
              styles.kpiIcon,
              { backgroundColor: `${BrandColors.accent}20` },
            ]}>
              <Ionicons name="checkmark-circle" size={20} color={BrandColors.accent} />
            </View>
            <Text style={styles.kpiValue}>{performanceData.overview.completionRate}%</Text>
            <Text style={styles.kpiLabel}>Completion Rate</Text>
          </View>

          <View style={styles.kpiItem}>
            <View style={[
              styles.kpiIcon,
              { backgroundColor: `${BrandColors.warning}20` },
            ]}>
              <Ionicons name="star" size={20} color={BrandColors.warning} />
            </View>
            <Text style={styles.kpiValue}>{performanceData.overview.averageRating}</Text>
            <Text style={styles.kpiLabel}>Avg Rating</Text>
          </View>

          <View style={styles.kpiItem}>
            <View style={[
              styles.kpiIcon,
              { backgroundColor: `${BrandColors.dot}20` },
            ]}>
              <Ionicons name="people" size={20} color={BrandColors.dot} />
            </View>
            <Text style={styles.kpiValue}>{performanceData.overview.customerRetention}%</Text>
            <Text style={styles.kpiLabel}>Retention Rate</Text>
          </View>
        </View>
      </Card>

      {/* Performance Trends */}
      <Card variant="elevated" size="lg" style={styles.trendsCard}>
        <Text style={styles.trendsTitle}>Performance Trends</Text>

        <View style={styles.trendItem}>
          <View style={styles.trendLeft}>
            <View style={[
              styles.trendIcon,
              { backgroundColor: `${BrandColors.accent}20` },
            ]}>
              <Ionicons name="trending-up" size={20} color={BrandColors.accent} />
            </View>
            <View style={styles.trendInfo}>
              <Text style={styles.trendName}>Revenue Growth</Text>
              <Text style={styles.trendSubtitle}>Monthly growth rate</Text>
            </View>
          </View>
          <View style={styles.trendRight}>
            <Text style={styles.trendValue}>+{performanceData.overview.revenueGrowth}%</Text>
            <View style={styles.trendBar}>
              <View style={[
                styles.trendBarFill,
                { width: `${performanceData.overview.revenueGrowth}%` },
              ]} />
            </View>
          </View>
        </View>

        <View style={styles.trendDivider} />

        <View style={styles.trendItem}>
          <View style={styles.trendLeft}>
            <View style={[
              styles.trendIcon,
              { backgroundColor: `${BrandColors.primary}20` },
            ]}>
              <Ionicons name="car" size={20} color={BrandColors.primary} />
            </View>
            <View style={styles.trendInfo}>
              <Text style={styles.trendName}>Utilization Rate</Text>
              <Text style={styles.trendSubtitle}>Vehicle usage efficiency</Text>
            </View>
          </View>
          <View style={styles.trendRight}>
            <Text style={styles.trendValue}>{performanceData.overview.utilizationRate}%</Text>
            <View style={styles.trendBar}>
              <View style={[
                styles.trendBarFill,
                { width: `${performanceData.overview.utilizationRate}%` },
              ]} />
            </View>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderEfficiency = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="lg" style={styles.efficiencyCard}>
        <Text style={styles.efficiencyTitle}>Operational Efficiency</Text>

        <View style={styles.efficiencyItem}>
          <View style={styles.efficiencyLeft}>
            <Text style={styles.efficiencyName}>Average Response Time</Text>
            <Text style={styles.efficiencySubtitle}>Time to respond to bookings</Text>
          </View>
          <View style={styles.efficiencyRight}>
            <Text style={styles.efficiencyValue}>{performanceData.efficiency.averageResponseTime}h</Text>
            <View style={styles.efficiencyBadge}>
              <Text style={styles.efficiencyBadgeText}>Good</Text>
            </View>
          </View>
        </View>

        <View style={styles.efficiencyDivider} />

        <View style={styles.efficiencyItem}>
          <View style={styles.efficiencyLeft}>
            <Text style={styles.efficiencyName}>Booking Processing Time</Text>
            <Text style={styles.efficiencySubtitle}>Time to process bookings</Text>
          </View>
          <View style={styles.efficiencyRight}>
            <Text style={styles.efficiencyValue}>{performanceData.efficiency.bookingProcessingTime}min</Text>
            <View style={styles.efficiencyBadge}>
              <Text style={styles.efficiencyBadgeText}>Excellent</Text>
            </View>
          </View>
        </View>

        <View style={styles.efficiencyDivider} />

        <View style={styles.efficiencyItem}>
          <View style={styles.efficiencyLeft}>
            <Text style={styles.efficiencyName}>Vehicle Preparation Time</Text>
            <Text style={styles.efficiencySubtitle}>Time to prepare vehicles</Text>
          </View>
          <View style={styles.efficiencyRight}>
            <Text style={styles.efficiencyValue}>{performanceData.efficiency.vehiclePreparationTime}min</Text>
            <View style={styles.efficiencyBadge}>
              <Text style={styles.efficiencyBadgeText}>Good</Text>
            </View>
          </View>
        </View>

        <View style={styles.efficiencyDivider} />

        <View style={styles.efficiencyItem}>
          <View style={styles.efficiencyLeft}>
            <Text style={styles.efficiencyName}>Customer Wait Time</Text>
            <Text style={styles.efficiencySubtitle}>Average wait time</Text>
          </View>
          <View style={styles.efficiencyRight}>
            <Text style={styles.efficiencyValue}>{performanceData.efficiency.customerWaitTime}min</Text>
            <View style={styles.efficiencyBadge}>
              <Text style={styles.efficiencyBadgeText}>Excellent</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderCustomer = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="lg" style={styles.customerCard}>
        <Text style={styles.customerTitle}>Customer Metrics</Text>

        <View style={styles.customerStats}>
          <View style={styles.customerStat}>
            <Text style={styles.customerStatValue}>{performanceData.customer.totalCustomers}</Text>
            <Text style={styles.customerStatLabel}>Total Customers</Text>
          </View>

          <View style={styles.customerStat}>
            <Text style={styles.customerStatValue}>{performanceData.customer.newCustomers}</Text>
            <Text style={styles.customerStatLabel}>New Customers</Text>
          </View>

          <View style={styles.customerStat}>
            <Text style={styles.customerStatValue}>{performanceData.customer.returningCustomers}</Text>
            <Text style={styles.customerStatLabel}>Returning</Text>
          </View>
        </View>

        <View style={styles.customerMetrics}>
          <View style={styles.customerMetric}>
            <Text style={styles.customerMetricLabel}>Average Satisfaction</Text>
            <Text style={styles.customerMetricValue}>{performanceData.customer.averageSatisfaction}/5</Text>
          </View>

          <View style={styles.customerMetric}>
            <Text style={styles.customerMetricLabel}>Complaint Rate</Text>
            <Text style={styles.customerMetricValue}>{performanceData.customer.complaintRate}%</Text>
          </View>

          <View style={styles.customerMetric}>
            <Text style={styles.customerMetricLabel}>Referral Rate</Text>
            <Text style={styles.customerMetricValue}>{performanceData.customer.referralRate}%</Text>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderFinancial = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="lg" style={styles.financialCard}>
        <Text style={styles.financialTitle}>Financial Performance</Text>

        <View style={styles.financialStats}>
          <View style={styles.financialStat}>
            <Text style={styles.financialStatValue}>₹{performanceData.financial.totalRevenue.toLocaleString()}</Text>
            <Text style={styles.financialStatLabel}>Total Revenue</Text>
          </View>

          <View style={styles.financialStat}>
            <Text style={styles.financialStatValue}>₹{performanceData.financial.averageBookingValue.toLocaleString()}</Text>
            <Text style={styles.financialStatLabel}>Avg Booking Value</Text>
          </View>

          <View style={styles.financialStat}>
            <Text style={styles.financialStatValue}>{performanceData.financial.profitMargin}%</Text>
            <Text style={styles.financialStatLabel}>Profit Margin</Text>
          </View>
        </View>

        <View style={styles.financialMetrics}>
          <View style={styles.financialMetric}>
            <Text style={styles.financialMetricLabel}>Cost Per Booking</Text>
            <Text style={styles.financialMetricValue}>₹{performanceData.financial.costPerBooking}</Text>
          </View>

          <View style={styles.financialMetric}>
            <Text style={styles.financialMetricLabel}>Revenue Per Vehicle</Text>
            <Text style={styles.financialMetricValue}>₹{performanceData.financial.revenuePerVehicle.toLocaleString()}</Text>
          </View>

          <View style={styles.financialMetric}>
            <Text style={styles.financialMetricLabel}>Monthly Growth</Text>
            <Text style={styles.financialMetricValue}>+{performanceData.financial.monthlyGrowth}%</Text>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderTabContent = () => {
    switch (selectedMetric) {
      case 'overview': return renderOverview();
      case 'efficiency': return renderEfficiency();
      case 'customer': return renderCustomer();
      case 'financial': return renderFinancial();
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
            <Text style={styles.title}>Performance Metrics</Text>
            <Text style={styles.subtitle}>
              Track your operational performance
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

        {/* Metrics Tabs */}
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
              {metrics.map((metric) => (
                <TouchableOpacity
                  key={metric.id}
                  style={[
                    styles.tab,
                    selectedMetric === metric.id && styles.tabActive,
                  ]}
                  onPress={() => handleMetricChange(metric.id)}
                >
                  <Ionicons
                    name={metric.icon as any}
                    size={20}
                    color={selectedMetric === metric.id ? BrandColors.primary : BrandColors.textLight}
                  />
                  <Text style={[
                    styles.tabText,
                    selectedMetric === metric.id && styles.tabTextActive,
                  ]}>
                    {metric.title}
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

  // KPI
  kpiCard: {
    marginBottom: Spacing.lg,
  },
  kpiTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  kpiItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.backgroundCard,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  kpiIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  kpiValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  kpiLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    textAlign: 'center',
  },

  // Trends
  trendsCard: {
    marginBottom: Spacing.lg,
  },
  trendsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  trendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  trendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  trendIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  trendInfo: {
    flex: 1,
  },
  trendName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  trendSubtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },
  trendRight: {
    alignItems: 'flex-end',
  },
  trendValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.sm,
  },
  trendBar: {
    width: 80,
    height: 6,
    backgroundColor: BrandColors.gray50,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  trendBarFill: {
    height: '100%',
    backgroundColor: BrandColors.accent,
    borderRadius: BorderRadius.full,
  },
  trendDivider: {
    height: 1,
    backgroundColor: BrandColors.borderLight,
    marginVertical: Spacing.sm,
  },

  // Efficiency
  efficiencyCard: {
    marginBottom: Spacing.lg,
  },
  efficiencyTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  efficiencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  efficiencyLeft: {
    flex: 1,
  },
  efficiencyName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  efficiencySubtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },
  efficiencyRight: {
    alignItems: 'flex-end',
  },
  efficiencyValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.sm,
  },
  efficiencyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    backgroundColor: BrandColors.accent,
  },
  efficiencyBadgeText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },
  efficiencyDivider: {
    height: 1,
    backgroundColor: BrandColors.borderLight,
    marginVertical: Spacing.sm,
  },

  // Customer
  customerCard: {
    marginBottom: Spacing.lg,
  },
  customerTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  customerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
  },
  customerStat: {
    alignItems: 'center',
  },
  customerStatValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  customerStatLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },
  customerMetrics: {
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: BrandColors.borderLight,
  },
  customerMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  customerMetricLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },
  customerMetricValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
  },

  // Financial
  financialCard: {
    marginBottom: Spacing.lg,
  },
  financialTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  financialStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
  },
  financialStat: {
    alignItems: 'center',
  },
  financialStatValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  financialStatLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },
  financialMetrics: {
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: BrandColors.borderLight,
  },
  financialMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  financialMetricLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },
  financialMetricValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
