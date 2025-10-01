import { ThemedView } from '../../components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Booking Details Screen - View comprehensive booking information
 * Displays detailed booking information, customer details, and management options
 */
export default function BookingDetailsScreen({ navigation, route }: any) {
  const { bookingId } = route.params || {};

  const [activeTab, setActiveTab] = useState('details');

  // Mock booking data
  const bookingData = {
    id: 'MOV-12345',
    customerId: 'CUST-001',
    customerName: 'Rajesh Kumar',
    customerPhone: '+91 98765 43210',
    customerEmail: 'rajesh@email.com',
    vehicleId: 'VEH-001',
    vehicleName: 'Maruti Swift Dzire',
    vehicleLicensePlate: 'KA01AB1234',
    status: 'confirmed', // pending, confirmed, ongoing, completed, cancelled
    pickupDate: '2025-01-20',
    pickupTime: '10:00',
    dropoffDate: '2025-01-23',
    dropoffTime: '18:00',
    pickupLocation: 'MG Road, Bangalore',
    dropoffLocation: 'MG Road, Bangalore',
    totalAmount: 4500,
    securityDeposit: 5000,
    advanceAmount: 2000,
    remainingAmount: 2500,
    rentalType: 'daily',
    duration: 3,
    createdAt: '2025-01-15T10:30:00Z',
    notes: 'Customer prefers early morning pickup',
  };

  // Tabs configuration
  const tabs = [
    { id: 'details', label: 'Details', icon: 'information-circle-outline' },
    { id: 'customer', label: 'Customer', icon: 'person-outline' },
    { id: 'vehicle', label: 'Vehicle', icon: 'car-outline' },
    { id: 'payment', label: 'Payment', icon: 'cash-outline' },
  ];

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#34C759';
      case 'ongoing': return '#007AFF';
      case 'completed': return '#8E8E93';
      case 'cancelled': return '#FF3B30';
      default: return '#FF9500';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return 'checkmark-circle-outline';
      case 'ongoing': return 'play-circle-outline';
      case 'completed': return 'checkmark-done-outline';
      case 'cancelled': return 'close-circle-outline';
      default: return 'time-outline';
    }
  };

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Handle status change
  const handleStatusChange = () => {
    Alert.alert(
      'Change Status',
      'Select new status',
      [
        { text: 'Confirmed', onPress: () => console.log('Status: confirmed') },
        { text: 'Ongoing', onPress: () => console.log('Status: ongoing') },
        { text: 'Completed', onPress: () => console.log('Status: completed') },
        { text: 'Cancelled', onPress: () => console.log('Status: cancelled') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Handle contact customer
  const handleContactCustomer = () => {
    Alert.alert(
      'Contact Customer',
      'Choose contact method',
      [
        { text: 'Call', onPress: () => console.log('Call customer') },
        { text: 'WhatsApp', onPress: () => console.log('WhatsApp customer') },
        { text: 'SMS', onPress: () => console.log('SMS customer') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Render details tab
  const renderDetailsTab = () => (
    <View style={styles.tabContent}>
      {/* Booking Status */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <View style={styles.statusInfo}>
            <Ionicons
              name={getStatusIcon(bookingData.status)}
              size={24}
              color={getStatusColor(bookingData.status)}
            />
            <Text style={styles.statusText}>
              {bookingData.status.charAt(0).toUpperCase() + bookingData.status.slice(1)}
            </Text>
          </View>
          <TouchableOpacity style={styles.changeStatusButton} onPress={handleStatusChange}>
            <Text style={styles.changeStatusText}>Change</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bookingId}>Booking ID: {bookingData.id}</Text>
      </View>

      {/* Booking Timeline */}
      <View style={styles.timelineCard}>
        <Text style={styles.cardTitle}>Booking Timeline</Text>
        <View style={styles.timeline}>
          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineLabel}>Pickup</Text>
              <Text style={styles.timelineValue}>
                {bookingData.pickupDate} at {bookingData.pickupTime}
              </Text>
              <Text style={styles.timelineLocation}>{bookingData.pickupLocation}</Text>
            </View>
          </View>
          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineLabel}>Dropoff</Text>
              <Text style={styles.timelineValue}>
                {bookingData.dropoffDate} at {bookingData.dropoffTime}
              </Text>
              <Text style={styles.timelineLocation}>{bookingData.dropoffLocation}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Rental Information */}
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Rental Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Rental Type</Text>
          <Text style={styles.infoValue}>
            {bookingData.rentalType.charAt(0).toUpperCase() + bookingData.rentalType.slice(1)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Duration</Text>
          <Text style={styles.infoValue}>{bookingData.duration} days</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Booking Date</Text>
          <Text style={styles.infoValue}>
            {new Date(bookingData.createdAt).toLocaleDateString()}
          </Text>
        </View>
        {bookingData.notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.infoLabel}>Notes</Text>
            <Text style={styles.notesText}>{bookingData.notes}</Text>
          </View>
        )}
      </View>
    </View>
  );

  // Render customer tab
  const renderCustomerTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.customerCard}>
        <Text style={styles.cardTitle}>Customer Information</Text>

        <View style={styles.customerHeader}>
          <View style={styles.customerAvatar}>
            <Text style={styles.avatarText}>
              {bookingData.customerName.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{bookingData.customerName}</Text>
            <Text style={styles.customerPhone}>{bookingData.customerPhone}</Text>
            <Text style={styles.customerEmail}>{bookingData.customerEmail}</Text>
          </View>
        </View>

        <View style={styles.customerStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹45K</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.contactButton} onPress={handleContactCustomer}>
          <Ionicons name="call-outline" size={20} color="#007AFF" />
          <Text style={styles.contactButtonText}>Contact Customer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render vehicle tab
  const renderVehicleTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.vehicleCard}>
        <Text style={styles.cardTitle}>Vehicle Information</Text>

        <View style={styles.vehicleInfo}>
          <View style={styles.vehicleIcon}>
            <Ionicons name="car-outline" size={40} color="#007AFF" />
          </View>
          <View style={styles.vehicleDetails}>
            <Text style={styles.vehicleName}>{bookingData.vehicleName}</Text>
            <Text style={styles.vehiclePlate}>{bookingData.vehicleLicensePlate}</Text>
          </View>
        </View>

        <View style={styles.vehicleSpecs}>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Fuel Type</Text>
            <Text style={styles.specValue}>Petrol</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Transmission</Text>
            <Text style={styles.specValue}>Manual</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Seating</Text>
            <Text style={styles.specValue}>5 seats</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Mileage</Text>
            <Text style={styles.specValue}>18 km/l</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.viewVehicleButton}>
          <Text style={styles.viewVehicleText}>View Vehicle Details</Text>
          <Ionicons name="chevron-forward" size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render payment tab
  const renderPaymentTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.paymentCard}>
        <Text style={styles.cardTitle}>Payment Information</Text>

        <View style={styles.paymentBreakdown}>
          <View style={styles.paymentItem}>
            <Text style={styles.paymentLabel}>Total Amount</Text>
            <Text style={styles.paymentValue}>₹{bookingData.totalAmount}</Text>
          </View>
          <View style={styles.paymentItem}>
            <Text style={styles.paymentLabel}>Security Deposit</Text>
            <Text style={styles.paymentValue}>₹{bookingData.securityDeposit}</Text>
          </View>
          <View style={styles.paymentItem}>
            <Text style={styles.paymentLabel}>Advance Paid</Text>
            <Text style={styles.paymentValue}>₹{bookingData.advanceAmount}</Text>
          </View>
          <View style={[styles.paymentItem, styles.paymentItemTotal]}>
            <Text style={styles.paymentLabelTotal}>Remaining Amount</Text>
            <Text style={styles.paymentValueTotal}>₹{bookingData.remainingAmount}</Text>
          </View>
        </View>

        <View style={styles.paymentStatus}>
          <View style={styles.statusItem}>
            <Ionicons name="checkmark-circle" size={20} color="#34C759" />
            <Text style={styles.statusItemText}>Advance Payment Received</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="time-outline" size={20} color="#FF9500" />
            <Text style={styles.statusItemText}>Balance Payment Pending</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return renderDetailsTab();
      case 'customer':
        return renderCustomerTab();
      case 'vehicle':
        return renderVehicleTab();
      case 'payment':
        return renderPaymentTab();
      default:
        return renderDetailsTab();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Booking Details</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  activeTab === tab.id && styles.activeTab,
                ]}
                onPress={() => handleTabChange(tab.id)}
              >
                <Ionicons
                  name={tab.icon}
                  size={16}
                  color={activeTab === tab.id ? '#007AFF' : '#666'}
                />
                <Text style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="call-outline" size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Contact Customer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="create-outline" size={20} color="#007AFF" />
            <Text style={styles.secondaryButtonText}>Edit Booking</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  moreButton: {
    padding: 8,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  activeTab: {
    backgroundColor: '#F0F8FF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#007AFF',
  },
  tabContent: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
  },
  changeStatusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F0F8FF',
    borderRadius: 16,
  },
  changeStatusText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  bookingId: {
    fontSize: 14,
    color: '#666',
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  timeline: {
    gap: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
    marginTop: 6,
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
  },
  timelineLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  timelineValue: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  timelineLocation: {
    fontSize: 14,
    color: '#007AFF',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  notesContainer: {
    marginTop: 16,
  },
  notesText: {
    fontSize: 14,
    color: '#000',
    marginTop: 8,
    lineHeight: 20,
  },
  customerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  customerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  customerPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  customerEmail: {
    fontSize: 14,
    color: '#666',
  },
  customerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  contactButtonText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 8,
    fontWeight: '500',
  },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  vehicleIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  vehicleDetails: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  vehiclePlate: {
    fontSize: 14,
    color: '#666',
  },
  vehicleSpecs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  specItem: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  specLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  specValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  viewVehicleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  viewVehicleText: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 8,
    fontWeight: '500',
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentBreakdown: {
    marginBottom: 16,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  paymentItemTotal: {
    borderBottomWidth: 0,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#E5E5EA',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666',
  },
  paymentValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  paymentLabelTotal: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  paymentValueTotal: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  paymentStatus: {
    gap: 8,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statusItemText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
  },
  actionButtons: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 8,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 40,
  },
});
