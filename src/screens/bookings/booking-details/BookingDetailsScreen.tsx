import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function BookingDetailsScreen({ navigation, route }: any) {
  const { booking } = route.params || {};
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Mock booking data if not provided
  const bookingData = booking || {
    id: 'BK001',
    customer: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@email.com',
      rating: 4.5,
    },
    vehicle: {
      name: 'Toyota Camry 2023',
      image: 'https://via.placeholder.com/300x200/007AFF/FFFFFF?text=Toyota+Camry',
      licensePlate: 'MH01AB1234',
      type: 'Sedan',
      features: ['AC', 'GPS', 'Bluetooth'],
    },
    booking: {
      startDate: '2024-03-15',
      endDate: '2024-03-17',
      startTime: '10:00 AM',
      endTime: '10:00 AM',
      duration: '2 days',
      pickupLocation: 'Mumbai Airport Terminal 2',
      dropoffLocation: 'Mumbai Airport Terminal 2',
      totalAmount: 5000,
      advancePaid: 1500,
      balanceAmount: 3500,
      status: 'confirmed',
      bookingDate: '2024-03-10',
    },
    payment: {
      method: 'UPI',
      transactionId: 'TXN123456789',
      status: 'completed',
      paidAmount: 1500,
    },
    notes: 'Customer prefers early morning pickup. Please ensure vehicle is clean and fuel tank is full.',
  };

  const tabs = [
    { id: 'overview', title: 'Overview', icon: 'information-circle' },
    { id: 'customer', title: 'Customer', icon: 'person' },
    { id: 'vehicle', title: 'Vehicle', icon: 'car' },
    { id: 'payment', title: 'Payment', icon: 'card' },
  ];

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

  const handleStatusChange = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      'Change Status',
      'Select new status for this booking',
      [
        { text: 'Confirmed', onPress: () => console.log('Status: Confirmed') },
        { text: 'In Progress', onPress: () => console.log('Status: In Progress') },
        { text: 'Completed', onPress: () => console.log('Status: Completed') },
        { text: 'Cancelled', onPress: () => console.log('Status: Cancelled') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleContactCustomer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Contact Customer', 'Opening phone dialer...');
  };

  const getStatusColor = () => {
    switch (bookingData.booking.status) {
      case 'confirmed': return BrandColors.accent;
      case 'in-progress': return BrandColors.warning;
      case 'completed': return BrandColors.primary;
      case 'cancelled': return BrandColors.error;
      default: return BrandColors.textLight;
    }
  };

  const getStatusIcon = () => {
    switch (bookingData.booking.status) {
      case 'confirmed': return 'checkmark-circle';
      case 'in-progress': return 'time';
      case 'completed': return 'checkmark-done-circle';
      case 'cancelled': return 'close-circle';
      default: return 'help-circle';
    }
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Booking Status */}
      <Card variant="elevated" size="md" style={styles.statusCard}>
        <View style={styles.statusContainer}>
          <View style={styles.statusLeft}>
            <Ionicons name={getStatusIcon()} size={24} color={getStatusColor()} />
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>
                {bookingData.booking.status.charAt(0).toUpperCase() + bookingData.booking.status.slice(1)}
              </Text>
              <Text style={styles.statusSubtitle}>Booking #{bookingData.id}</Text>
            </View>
          </View>
          <Text style={styles.bookingDate}>{bookingData.booking.bookingDate}</Text>
        </View>
      </Card>

      {/* Booking Details */}
      <Card variant="elevated" size="md" style={styles.infoCard}>
        <Text style={styles.cardTitle}>Booking Details</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Duration</Text>
          <Text style={styles.infoValue}>{bookingData.booking.duration}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Start Date & Time</Text>
          <Text style={styles.infoValue}>{bookingData.booking.startDate} at {bookingData.booking.startTime}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>End Date & Time</Text>
          <Text style={styles.infoValue}>{bookingData.booking.endDate} at {bookingData.booking.endTime}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Pickup Location</Text>
          <Text style={styles.infoValue}>{bookingData.booking.pickupLocation}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Dropoff Location</Text>
          <Text style={styles.infoValue}>{bookingData.booking.dropoffLocation}</Text>
        </View>
      </Card>

      {/* Payment Summary */}
      <Card variant="elevated" size="md" style={styles.infoCard}>
        <Text style={styles.cardTitle}>Payment Summary</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total Amount</Text>
          <Text style={styles.infoValue}>₹{bookingData.booking.totalAmount}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Advance Paid</Text>
          <Text style={styles.infoValue}>₹{bookingData.booking.advancePaid}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Balance Amount</Text>
          <Text style={[styles.infoValue, { color: BrandColors.warning }]}>₹{bookingData.booking.balanceAmount}</Text>
        </View>
      </Card>

      {/* Notes */}
      {bookingData.notes && (
        <Card variant="elevated" size="md" style={styles.infoCard}>
          <Text style={styles.cardTitle}>Special Notes</Text>
          <Text style={styles.notesText}>{bookingData.notes}</Text>
        </Card>
      )}
    </View>
  );

  const renderCustomer = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="md" style={styles.infoCard}>
        <Text style={styles.cardTitle}>Customer Information</Text>

        <View style={styles.customerHeader}>
          <View style={styles.customerAvatar}>
            <Text style={styles.customerInitial}>
              {bookingData.customer.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{bookingData.customer.name}</Text>
            <View style={styles.customerRating}>
              <Ionicons name="star" size={16} color={BrandColors.warning} />
              <Text style={styles.ratingText}>{bookingData.customer.rating}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone Number</Text>
          <Text style={styles.infoValue}>{bookingData.customer.phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{bookingData.customer.email}</Text>
        </View>
      </Card>

      <Card variant="elevated" size="md" style={styles.infoCard}>
        <Text style={styles.cardTitle}>Customer Actions</Text>

        <View style={styles.actionButtons}>
          <Button
            title="Call Customer"
            onPress={handleContactCustomer}
            variant="primary"
            size="md"
            icon="call"
            style={styles.actionButton}
          />

          <Button
            title="Send Message"
            onPress={() => Alert.alert('Message', 'SMS functionality coming soon!')}
            variant="outline"
            size="md"
            icon="chatbubble"
            style={styles.actionButton}
          />
        </View>
      </Card>
    </View>
  );

  const renderVehicle = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="md" style={styles.infoCard}>
        <Text style={styles.cardTitle}>Vehicle Information</Text>

        <Image source={{ uri: bookingData.vehicle.image }} style={styles.vehicleImage} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Vehicle Name</Text>
          <Text style={styles.infoValue}>{bookingData.vehicle.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>License Plate</Text>
          <Text style={styles.infoValue}>{bookingData.vehicle.licensePlate}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Vehicle Type</Text>
          <Text style={styles.infoValue}>{bookingData.vehicle.type}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Features</Text>
          <Text style={styles.infoValue}>{bookingData.vehicle.features.join(', ')}</Text>
        </View>
      </Card>
    </View>
  );

  const renderPayment = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="md" style={styles.infoCard}>
        <Text style={styles.cardTitle}>Payment Details</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Payment Method</Text>
          <Text style={styles.infoValue}>{bookingData.payment.method}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Transaction ID</Text>
          <Text style={styles.infoValue}>{bookingData.payment.transactionId}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Payment Status</Text>
          <Text style={[styles.infoValue, { color: BrandColors.accent }]}>
            {bookingData.payment.status.charAt(0).toUpperCase() + bookingData.payment.status.slice(1)}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Paid Amount</Text>
          <Text style={styles.infoValue}>₹{bookingData.payment.paidAmount}</Text>
        </View>
      </Card>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'customer': return renderCustomer();
      case 'vehicle': return renderVehicle();
      case 'payment': return renderPayment();
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
            <Text style={styles.title}>Booking Details</Text>
            <Text style={styles.subtitle}>#{bookingData.id}</Text>
          </View>
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
                    activeTab === tab.id && styles.tabActive,
                  ]}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setActiveTab(tab.id);
                  }}
                >
                  <Ionicons
                    name={tab.icon as any}
                    size={20}
                    color={activeTab === tab.id ? BrandColors.primary : BrandColors.textLight}
                  />
                  <Text style={[
                    styles.tabText,
                    activeTab === tab.id && styles.tabTextActive,
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

        {/* Action Buttons */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.buttonRow}>
            <Button
              title="Change Status"
              onPress={handleStatusChange}
              variant="outline"
              size="lg"
              icon="swap-horizontal"
              style={styles.statusButton}
            />

            <Button
              title="Contact Customer"
              onPress={handleContactCustomer}
              variant="primary"
              size="lg"
              icon="call"
              style={styles.contactButton}
            />
          </View>
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
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
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

  // Status Card
  statusCard: {
    marginBottom: Spacing.lg,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusInfo: {
    marginLeft: Spacing.md,
  },
  statusTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  statusSubtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },
  bookingDate: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textLight,
  },

  // Info Cards
  infoCard: {
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.borderLight,
  },
  infoLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },
  infoValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.textPrimary,
    textAlign: 'right',
    flex: 1,
    marginLeft: Spacing.md,
  },

  // Customer
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  customerAvatar: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  customerInitial: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.secondary,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  customerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginLeft: Spacing.xs,
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: Spacing.xs,
  },

  // Vehicle
  vehicleImage: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },

  // Notes
  notesText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
    lineHeight: 22,
  },

  // Buttons
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    flex: 1,
    marginRight: Spacing.md,
  },
  contactButton: {
    flex: 1,
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
