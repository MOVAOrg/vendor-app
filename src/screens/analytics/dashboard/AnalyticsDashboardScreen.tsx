import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface AnalyticsData {
  totalRevenue: number;
  monthlyRevenue: number;
  totalBookings: number;
  activeBookings: number;
  averageBookingValue: number;
  customerRating: number;
  vehicleUtilization: number;
  topPerformingVehicle: {
    make: string;
    model: string;
    revenue: number;
  };
}

/**
 * Analytics Dashboard Screen Component
 * Displays comprehensive business analytics and performance metrics
 * Shows revenue trends, booking statistics, and vehicle performance
 */
export default function AnalyticsDashboardScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalBookings: 0,
    activeBookings: 0,
    averageBookingValue: 0,
    customerRating: 0,
    vehicleUtilization: 0,
    topPerformingVehicle: {
      make: '',
      model: '',
      revenue: 0,
    },
  });
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedPeriod]);

  const loadAnalyticsData = async () => {
    try {
      // TODO: Fetch actual analytics from backend
      // const data = await AnalyticsService.getDashboardAnalytics(selectedPeriod);

      // Mock data for now
      setAnalyticsData({
        totalRevenue: 45600,
        monthlyRevenue: 8400,
        totalBookings: 156,
        activeBookings: 12,
        averageBookingValue: 292,
        customerRating: 4.7,
        vehicleUtilization: 78,
        topPerformingVehicle: {
          make: 'Toyota',
          model: 'Camry',
          revenue: 12000,
        },
      });
    } catch (error) {
      console.error('Error loading analytics data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAnalyticsData();
    setRefreshing(false);
  };

  const formatCurrency = (amount: number) => {
    return `AED ${amount.toLocaleString()}`;
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  const periodButtons = [
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'quarter', label: 'Quarter' },
    { key: 'year', label: 'Year' },
  ];

  const StatCard = ({ title, value, subtitle, icon, color }: any) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  const ChartPlaceholder = ({ title, description }: any) => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <View style={styles.chartPlaceholder}>
        <Ionicons name="bar-chart-outline" size={48} color="#CCCCCC" />
        <Text style={styles.chartPlaceholderText}>{description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Analytics Dashboard</Text>
          <TouchableOpacity
            style={styles.reportsButton}
            onPress={() => navigation.navigate('ReportsScreen')}
          >
            <Ionicons name="document-text-outline" size={20} color="#007AFF" />
            <Text style={styles.reportsButtonText}>Reports</Text>
          </TouchableOpacity>
        </View>

        {/* Period Selector */}
        <View style={styles.periodContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {periodButtons.map((button) => (
              <TouchableOpacity
                key={button.key}
                style={[
                  styles.periodButton,
                  selectedPeriod === button.key && styles.periodButtonActive,
                ]}
                onPress={() => setSelectedPeriod(button.key as any)}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    selectedPeriod === button.key && styles.periodButtonTextActive,
                  ]}
                >
                  {button.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Revenue Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statsRow}>
              <StatCard
                title="Total Revenue"
                value={formatCurrency(analyticsData.totalRevenue)}
                icon="wallet-outline"
                color="#34C759"
                subtitle="All time"
              />
              <StatCard
                title="Monthly Revenue"
                value={formatCurrency(analyticsData.monthlyRevenue)}
                icon="calendar-outline"
                color="#007AFF"
                subtitle="This month"
              />
            </View>
          </View>
        </View>

        {/* Booking Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statsRow}>
              <StatCard
                title="Total Bookings"
                value={analyticsData.totalBookings.toString()}
                icon="calendar-outline"
                color="#007AFF"
                subtitle="All time"
              />
              <StatCard
                title="Active Bookings"
                value={analyticsData.activeBookings.toString()}
                icon="time-outline"
                color="#FF9500"
                subtitle="Currently active"
              />
            </View>
            <View style={styles.statsRow}>
              <StatCard
                title="Avg. Booking Value"
                value={formatCurrency(analyticsData.averageBookingValue)}
                icon="calculator-outline"
                color="#AF52DE"
                subtitle="Per booking"
              />
              <StatCard
                title="Customer Rating"
                value={analyticsData.customerRating.toString()}
                icon="star-outline"
                color="#FFD700"
                subtitle="Out of 5.0"
              />
            </View>
          </View>
        </View>

        {/* Performance Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Metrics</Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Vehicle Utilization"
              value={formatPercentage(analyticsData.vehicleUtilization)}
              icon="speedometer-outline"
              color="#34C759"
              subtitle="Average usage"
            />
          </View>
        </View>

        {/* Top Performing Vehicle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Performing Vehicle</Text>
          <View style={styles.topVehicleCard}>
            <View style={styles.topVehicleHeader}>
              <Ionicons name="trophy-outline" size={24} color="#FFD700" />
              <Text style={styles.topVehicleTitle}>Best Revenue Generator</Text>
            </View>
            <Text style={styles.topVehicleName}>
              {analyticsData.topPerformingVehicle.make} {analyticsData.topPerformingVehicle.model}
            </Text>
            <Text style={styles.topVehicleRevenue}>
              {formatCurrency(analyticsData.topPerformingVehicle.revenue)} earned
            </Text>
          </View>
        </View>

        {/* Charts Placeholder */}
        <View style={styles.section}>
          <ChartPlaceholder
            title="Revenue Trend"
            description="Revenue over time chart will be displayed here"
          />
        </View>

        <View style={styles.section}>
          <ChartPlaceholder
            title="Booking Volume"
            description="Booking volume chart will be displayed here"
          />
        </View>

        <View style={styles.section}>
          <ChartPlaceholder
            title="Vehicle Performance"
            description="Vehicle performance comparison chart will be displayed here"
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('ReportsScreen')}
            >
              <Ionicons name="document-text-outline" size={20} color="#007AFF" />
              <Text style={styles.quickActionText}>Generate Report</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('PerformanceMetricsScreen')}
            >
              <Ionicons name="analytics-outline" size={20} color="#34C759" />
              <Text style={styles.quickActionText}>Performance</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => {/* TODO: Export data */}}
            >
              <Ionicons name="download-outline" size={20} color="#FF9500" />
              <Text style={styles.quickActionText}>Export Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    fontFamily: 'Montserrat-Bold',
  },
  reportsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
  },
  reportsButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: 'OpenSans-SemiBold',
  },
  periodContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  periodButtonActive: {
    backgroundColor: '#007AFF',
  },
  periodButtonText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'OpenSans-Regular',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  statsGrid: {
    gap: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statTitle: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'OpenSans-Regular',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
    fontFamily: 'Montserrat-Bold',
  },
  statSubtitle: {
    fontSize: 12,
    color: '#999999',
    fontFamily: 'OpenSans-Regular',
  },
  topVehicleCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topVehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  topVehicleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 8,
    fontFamily: 'OpenSans-SemiBold',
  },
  topVehicleName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
    fontFamily: 'Montserrat-Bold',
  },
  topVehicleRevenue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34C759',
    fontFamily: 'Montserrat-SemiBold',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  chartPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 12,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 8,
    fontFamily: 'OpenSans-SemiBold',
  },
});
