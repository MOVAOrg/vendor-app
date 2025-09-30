import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Coupons Screen - Manage promotional coupons and discounts
 * Allows vendors to create, edit, and track coupon performance
 */
export default function CouponsScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('active');
  const [coupons, setCoupons] = useState([
    {
      id: '1',
      code: 'WELCOME20',
      title: 'Welcome Discount',
      description: '20% off for new customers',
      type: 'percentage',
      value: 20,
      minAmount: 1000,
      maxDiscount: 500,
      usageLimit: 100,
      usedCount: 45,
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'active',
      applicableVehicles: 'all',
      createdAt: '2025-01-01',
    },
    {
      id: '2',
      code: 'SUMMER15',
      title: 'Summer Special',
      description: '₹500 off on bookings above ₹3000',
      type: 'fixed',
      value: 500,
      minAmount: 3000,
      maxDiscount: 500,
      usageLimit: 50,
      usedCount: 32,
      startDate: '2025-01-15',
      endDate: '2025-03-15',
      status: 'active',
      applicableVehicles: 'economy',
      createdAt: '2025-01-10',
    },
    {
      id: '3',
      code: 'WEEKEND50',
      title: 'Weekend Special',
      description: '50% off on weekend bookings',
      type: 'percentage',
      value: 50,
      minAmount: 2000,
      maxDiscount: 1000,
      usageLimit: 25,
      usedCount: 25,
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      status: 'expired',
      applicableVehicles: 'luxury',
      createdAt: '2024-12-20',
    },
    {
      id: '4',
      code: 'FIRSTTIME',
      title: 'First Time User',
      description: '₹300 off for first-time users',
      type: 'fixed',
      value: 300,
      minAmount: 1500,
      maxDiscount: 300,
      usageLimit: 200,
      usedCount: 89,
      startDate: '2025-01-01',
      endDate: '2025-06-30',
      status: 'active',
      applicableVehicles: 'all',
      createdAt: '2024-12-15',
    },
  ]);

  const tabs = [
    { key: 'active', label: 'Active', count: coupons.filter(c => c.status === 'active').length },
    { key: 'expired', label: 'Expired', count: coupons.filter(c => c.status === 'expired').length },
    { key: 'draft', label: 'Draft', count: coupons.filter(c => c.status === 'draft').length },
  ];

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      // TODO: Implement actual API call to fetch coupons
      console.log('Loading coupons...');
    } catch (error) {
      console.error('Error loading coupons:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCoupons();
    setRefreshing(false);
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const getFilteredCoupons = () => {
    return coupons.filter(coupon => coupon.status === selectedTab);
  };

  const getCouponStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#34C759';
      case 'expired':
        return '#FF3B30';
      case 'draft':
        return '#FF9500';
      default:
        return '#666';
    }
  };

  const getCouponTypeIcon = (type: string) => {
    return type === 'percentage' ? 'percent-outline' : 'cash-outline';
  };

  const formatCouponValue = (coupon: any) => {
    if (coupon.type === 'percentage') {
      return `${coupon.value}%`;
    } else {
      return `₹${coupon.value}`;
    }
  };

  const getUsagePercentage = (coupon: any) => {
    return (coupon.usedCount / coupon.usageLimit) * 100;
  };

  const handleCreateCoupon = () => {
    navigation.navigate('CreateCouponScreen');
  };

  const handleEditCoupon = (coupon: any) => {
    navigation.navigate('EditCouponScreen', { coupon });
  };

  const handleViewCouponDetails = (coupon: any) => {
    navigation.navigate('CouponDetailsScreen', { coupon });
  };

  const handleToggleCouponStatus = (coupon: any) => {
    const newStatus = coupon.status === 'active' ? 'inactive' : 'active';
    Alert.alert(
      'Update Coupon Status',
      `Are you sure you want to ${newStatus === 'active' ? 'activate' : 'deactivate'} this coupon?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Update',
          onPress: () => {
            setCoupons(prev => prev.map(c =>
              c.id === coupon.id ? { ...c, status: newStatus } : c
            ));
          },
        },
      ]
    );
  };

  const renderCouponItem = ({ item }: { item: any }) => (
    <View style={styles.couponCard}>
      <View style={styles.couponHeader}>
        <View style={styles.couponInfo}>
          <Text style={styles.couponCode}>{item.code}</Text>
          <Text style={styles.couponTitle}>{item.title}</Text>
          <Text style={styles.couponDescription}>{item.description}</Text>
        </View>
        <View style={styles.couponStatus}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getCouponStatusColor(item.status) + '20' }
          ]}>
            <Text style={[
              styles.statusText,
              { color: getCouponStatusColor(item.status) }
            ]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.couponDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name={getCouponTypeIcon(item.type)} size={16} color="#666" />
            <Text style={styles.detailLabel}>Discount</Text>
            <Text style={styles.detailValue}>{formatCouponValue(item)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.detailLabel}>Valid Until</Text>
            <Text style={styles.detailValue}>{item.endDate}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text style={styles.detailLabel}>Usage</Text>
            <Text style={styles.detailValue}>{item.usedCount}/{item.usageLimit}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="car-outline" size={16} color="#666" />
            <Text style={styles.detailLabel}>Vehicle Type</Text>
            <Text style={styles.detailValue}>{item.applicableVehicles}</Text>
          </View>
        </View>
      </View>

      <View style={styles.usageBar}>
        <View style={styles.usageBarBackground}>
          <View style={[
            styles.usageBarFill,
            {
              width: `${getUsagePercentage(item)}%`,
              backgroundColor: getUsagePercentage(item) > 80 ? '#FF3B30' : '#34C759'
            }
          ]} />
        </View>
        <Text style={styles.usageText}>
          {Math.round(getUsagePercentage(item))}% used
        </Text>
      </View>

      <View style={styles.couponActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleViewCouponDetails(item)}
        >
          <Ionicons name="eye-outline" size={16} color="#007AFF" />
          <Text style={styles.actionButtonText}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEditCoupon(item)}
        >
          <Ionicons name="pencil-outline" size={16} color="#FF9500" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleToggleCouponStatus(item)}
        >
          <Ionicons
            name={item.status === 'active' ? 'pause-outline' : 'play-outline'}
            size={16}
            color="#666"
          />
          <Text style={styles.actionButtonText}>
            {item.status === 'active' ? 'Pause' : 'Activate'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTab = (tab: any) => (
    <TouchableOpacity
      key={tab.key}
      style={[
        styles.tab,
        selectedTab === tab.key && styles.activeTab,
      ]}
      onPress={() => handleTabChange(tab.key)}
    >
      <Text style={[
        styles.tabText,
        selectedTab === tab.key && styles.activeTabText,
      ]}>
        {tab.label}
      </Text>
      <View style={[
        styles.tabBadge,
        selectedTab === tab.key && styles.activeTabBadge,
      ]}>
        <Text style={[
          styles.tabBadgeText,
          selectedTab === tab.key && styles.activeTabBadgeText,
        ]}>
          {tab.count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="gift-outline" size={64} color="#C7C7CC" />
      <Text style={styles.emptyTitle}>No coupons found</Text>
      <Text style={styles.emptyMessage}>
        Create your first coupon to start attracting customers
      </Text>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateCoupon}>
        <Ionicons name="add" size={20} color="#FFFFFF" />
        <Text style={styles.createButtonText}>Create Coupon</Text>
      </TouchableOpacity>
    </View>
  );

  const filteredCoupons = getFilteredCoupons();

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coupons</Text>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateCoupon}>
          <Ionicons name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <FlatList
          data={tabs}
          renderItem={({ item }) => renderTab(item)}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsList}
        />
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Coupons</Text>
          <Text style={styles.summaryValue}>{coupons.length}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Active</Text>
          <Text style={[styles.summaryValue, { color: '#34C759' }]}>
            {coupons.filter(c => c.status === 'active').length}
          </Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Usage</Text>
          <Text style={styles.summaryValue}>
            {coupons.reduce((sum, c) => sum + c.usedCount, 0)}
          </Text>
        </View>
      </View>

      {/* Coupons List */}
      <FlatList
        data={filteredCoupons}
        renderItem={renderCouponItem}
        keyExtractor={(item) => item.id}
        style={styles.couponsList}
        contentContainerStyle={styles.couponsListContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  createButton: {
    padding: 8,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tabsList: {
    paddingRight: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginRight: 6,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  tabBadge: {
    backgroundColor: '#E5E5EA',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  activeTabBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  tabBadgeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  activeTabBadgeText: {
    color: '#FFFFFF',
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 16,
  },
  couponsList: {
    flex: 1,
  },
  couponsListContent: {
    paddingHorizontal: 20,
  },
  couponCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  couponInfo: {
    flex: 1,
  },
  couponCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  couponTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  couponDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  couponStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  couponDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    marginRight: 4,
  },
  detailValue: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  usageBar: {
    marginBottom: 12,
  },
  usageBarBackground: {
    height: 6,
    backgroundColor: '#E5E5EA',
    borderRadius: 3,
    marginBottom: 4,
  },
  usageBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  usageText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  couponActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 24,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  createButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});
