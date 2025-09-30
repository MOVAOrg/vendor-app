import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { ThemedView } from '../../components/themed-view';
import { VendorService } from '../../services/vendorService';
import { Vendor } from '../../types';
import { formatCurrency } from '../../utils/helpers';

/**
 * HomeScreen Component
 * Main dashboard screen for vendors showing overview of their business
 */
export default function HomeScreen() {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    totalRevenue: 0,
    totalCars: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  /**
   * Load dashboard data including vendor profile and statistics
   */
  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load vendor profile
      const vendorResponse = await VendorService.getCurrentVendor();
      if (vendorResponse.success && vendorResponse.data) {
        setVendor(vendorResponse.data);
      }

      // TODO: Load statistics from API
      // For now, using sample data
      setStats({
        totalBookings: 24,
        activeBookings: 8,
        totalRevenue: 15750,
        totalCars: 12,
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      Alert.alert('Error', 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Render welcome section with vendor info
   */
  const renderWelcomeSection = () => (
    <View style={styles.welcomeSection}>
      <View style={styles.welcomeHeader}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={32} color="#007AFF" />
        </View>
        <View style={styles.welcomeText}>
          <Text style={styles.welcomeTitle}>
            Welcome back, {vendor?.name || 'Vendor'}!
          </Text>
          <Text style={styles.welcomeSubtitle}>
            {vendor?.companyName || 'Your Company'}
          </Text>
        </View>
      </View>

      <View style={styles.verificationStatus}>
        <Ionicons
          name={vendor?.isVerified ? 'checkmark-circle' : 'time-outline'}
          size={16}
          color={vendor?.isVerified ? '#28A745' : '#FFA500'}
        />
        <Text style={[
          styles.verificationText,
          { color: vendor?.isVerified ? '#28A745' : '#FFA500' }
        ]}>
          {vendor?.isVerified ? 'Verified Account' : 'Pending Verification'}
        </Text>
      </View>
    </View>
  );

  /**
   * Render statistics cards
   */
  const renderStatsSection = () => (
    <View style={styles.statsSection}>
      <Text style={styles.sectionTitle}>Overview</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="calendar" size={24} color="#007AFF" />
          </View>
          <Text style={styles.statNumber}>{stats.totalBookings}</Text>
          <Text style={styles.statLabel}>Total Bookings</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="car" size={24} color="#28A745" />
          </View>
          <Text style={styles.statNumber}>{stats.activeBookings}</Text>
          <Text style={styles.statLabel}>Active Bookings</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="cash" size={24} color="#FFA500" />
          </View>
          <Text style={styles.statNumber}>{formatCurrency(stats.totalRevenue)}</Text>
          <Text style={styles.statLabel}>Total Revenue</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="car-sport" size={24} color="#DC3545" />
          </View>
          <Text style={styles.statNumber}>{stats.totalCars}</Text>
          <Text style={styles.statLabel}>Total Cars</Text>
        </View>
      </View>
    </View>
  );

  /**
   * Render quick actions
   */
  const renderQuickActions = () => (
    <View style={styles.quickActionsSection}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.quickActionsGrid}>
        <TouchableOpacity style={styles.quickActionCard}>
          <Ionicons name="add-circle" size={32} color="#007AFF" />
          <Text style={styles.quickActionLabel}>Add Car</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionCard}>
          <Ionicons name="list" size={32} color="#28A745" />
          <Text style={styles.quickActionLabel}>View Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionCard}>
          <Ionicons name="analytics" size={32} color="#FFA500" />
          <Text style={styles.quickActionLabel}>Analytics</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionCard}>
          <Ionicons name="settings" size={32} color="#6C757D" />
          <Text style={styles.quickActionLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  /**
   * Render recent activity
   */
  const renderRecentActivity = () => (
    <View style={styles.recentActivitySection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.activityList}>
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Ionicons name="checkmark-circle" size={20} color="#28A745" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Booking Confirmed</Text>
            <Text style={styles.activitySubtitle}>
              Car #1234 booked for 3 days
            </Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Ionicons name="add-circle" size={20} color="#007AFF" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>New Car Added</Text>
            <Text style={styles.activitySubtitle}>
              Toyota Camry 2023 added to fleet
            </Text>
            <Text style={styles.activityTime}>1 day ago</Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Ionicons name="cash" size={20} color="#FFA500" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Payment Received</Text>
            <Text style={styles.activitySubtitle}>
              $450 payment for booking #123
            </Text>
            <Text style={styles.activityTime}>2 days ago</Text>
          </View>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        {renderWelcomeSection()}

        {/* Statistics Section */}
        {renderStatsSection()}

        {/* Quick Actions */}
        {renderQuickActions()}

        {/* Recent Activity */}
        {renderRecentActivity()}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'OpenSans-Regular',
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  welcomeText: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
    fontFamily: 'OpenSans-Regular',
  },
  verificationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
    fontFamily: 'Montserrat-SemiBold',
  },
  statsSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    fontFamily: 'Montserrat-Bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'OpenSans-Regular',
  },
  quickActionsSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionLabel: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'OpenSans-Medium',
  },
  recentActivitySection: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontFamily: 'OpenSans-Medium',
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat-SemiBold',
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    fontFamily: 'OpenSans-Regular',
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    fontFamily: 'OpenSans-Regular',
  },
});
