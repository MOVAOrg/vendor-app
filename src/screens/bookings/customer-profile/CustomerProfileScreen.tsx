import { ThemedView } from '../../../components/themed-view';
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
 * Customer Profile Screen - View detailed customer information and history
 * Shows customer details, booking history, and interaction options
 */
export default function CustomerProfileScreen({ navigation, route }: any) {
  const { customerId } = route.params || {};

  const [refreshing, setRefreshing] = useState(false);
  const [customer, setCustomer] = useState({
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    profileImage: null,
    dateOfBirth: '1985-03-15',
    gender: 'male',
    address: {
      street: '123 MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
    },
    verificationStatus: 'verified',
    memberSince: '2023-06-15',
    totalBookings: 12,
    totalSpent: 45000,
    averageRating: 4.8,
    lastBooking: '2025-01-10',
    preferredVehicleType: 'economy',
    emergencyContact: '+91 87654 32109',
    drivingLicense: {
      number: 'DL1234567890123',
      expiryDate: '2030-03-15',
      verified: true,
    },
    idProof: {
      type: 'Aadhaar',
      number: '1234-5678-9012',
      verified: true,
    },
  });

  const [bookingHistory, setBookingHistory] = useState([
    {
      id: '1',
      vehicleName: 'Honda City',
      bookingDate: '2025-01-10',
      startDate: '2025-01-10',
      endDate: '2025-01-12',
      duration: '2 days',
      amount: 3500,
      status: 'completed',
      rating: 5,
      review: 'Excellent service and clean vehicle. Highly recommended!',
    },
    {
      id: '2',
      vehicleName: 'Maruti Swift',
      bookingDate: '2024-12-25',
      startDate: '2024-12-25',
      endDate: '2024-12-27',
      duration: '2 days',
      amount: 2800,
      status: 'completed',
      rating: 4,
      review: 'Good experience overall. Vehicle was in good condition.',
    },
    {
      id: '3',
      vehicleName: 'Toyota Innova',
      bookingDate: '2024-12-01',
      startDate: '2024-12-01',
      endDate: '2024-12-03',
      duration: '2 days',
      amount: 4200,
      status: 'completed',
      rating: 5,
      review: 'Perfect for family trip. Comfortable and spacious.',
    },
    {
      id: '4',
      vehicleName: 'Hyundai i20',
      bookingDate: '2024-11-15',
      startDate: '2024-11-15',
      endDate: '2024-11-17',
      duration: '2 days',
      amount: 2600,
      status: 'cancelled',
      rating: null,
      review: null,
    },
  ]);

  useEffect(() => {
    loadCustomerData();
  }, [customerId]);

  const loadCustomerData = async () => {
    try {
      // TODO: Implement actual API call to fetch customer data
      console.log('Loading customer data for:', customerId);
    } catch (error) {
      console.error('Error loading customer data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCustomerData();
    setRefreshing(false);
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#34C759';
      case 'cancelled':
        return '#FF3B30';
      case 'ongoing':
        return '#007AFF';
      default:
        return '#666';
    }
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return '#34C759';
      case 'pending':
        return '#FF9500';
      case 'rejected':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  const handleContactCustomer = () => {
    Alert.alert(
      'Contact Customer',
      'Choose contact method',
      [
        { text: 'Call', onPress: () => console.log('Call customer') },
        { text: 'WhatsApp', onPress: () => console.log('WhatsApp customer') },
        { text: 'Email', onPress: () => console.log('Email customer') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleViewDocuments = () => {
    navigation.navigate('CustomerDocumentsScreen', { customerId });
  };

  const handleBlockCustomer = () => {
    Alert.alert(
      'Block Customer',
      'Are you sure you want to block this customer? They will not be able to book from you.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Block',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement block customer API
            console.log('Blocking customer:', customerId);
          },
        },
      ]
    );
  };

  const renderBookingItem = ({ item }: { item: any }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <View style={styles.bookingInfo}>
          <Text style={styles.vehicleName}>{item.vehicleName}</Text>
          <Text style={styles.bookingDate}>{item.bookingDate}</Text>
        </View>
        <View style={styles.bookingStatus}>
          <Text style={[
            styles.statusText,
            { color: getStatusColor(item.status) }
          ]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{item.duration}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={16} color="#666" />
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>{formatCurrency(item.amount)}</Text>
          </View>
        </View>
      </View>

      {item.rating && (
        <View style={styles.ratingSection}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}/5</Text>
          </View>
          {item.review && (
            <Text style={styles.reviewText}>{item.review}</Text>
          )}
        </View>
      )}
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={[{ key: 'content' }]}
        renderItem={() => (
          <View>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Customer Profile</Text>
              <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Customer Info Card */}
            <View style={styles.customerCard}>
              <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                  {customer.profileImage ? (
                    <View style={styles.profileImage}>
                      {/* Profile image would go here */}
                    </View>
                  ) : (
                    <View style={styles.profileImagePlaceholder}>
                      <Ionicons name="person" size={40} color="#007AFF" />
                    </View>
                  )}
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.customerName}>{customer.name}</Text>
                  <Text style={styles.customerPhone}>{customer.phone}</Text>
                  <Text style={styles.customerEmail}>{customer.email}</Text>
                  <View style={styles.verificationBadge}>
                    <Ionicons name="checkmark-circle" size={16} color={getVerificationStatusColor(customer.verificationStatus)} />
                    <Text style={[
                      styles.verificationText,
                      { color: getVerificationStatusColor(customer.verificationStatus) }
                    ]}>
                      {customer.verificationStatus.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{customer.totalBookings}</Text>
                  <Text style={styles.statLabel}>Bookings</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{formatCurrency(customer.totalSpent)}</Text>
                  <Text style={styles.statLabel}>Total Spent</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{customer.averageRating}/5</Text>
                  <Text style={styles.statLabel}>Avg Rating</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={handleContactCustomer}>
                <Ionicons name="call-outline" size={20} color="#007AFF" />
                <Text style={styles.actionButtonText}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleViewDocuments}>
                <Ionicons name="document-outline" size={20} color="#007AFF" />
                <Text style={styles.actionButtonText}>Documents</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleBlockCustomer}>
                <Ionicons name="ban-outline" size={20} color="#FF3B30" />
                <Text style={[styles.actionButtonText, { color: '#FF3B30' }]}>Block</Text>
              </TouchableOpacity>
            </View>

            {/* Customer Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Customer Details</Text>
              <View style={styles.detailsCard}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date of Birth</Text>
                  <Text style={styles.detailValue}>{customer.dateOfBirth}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Gender</Text>
                  <Text style={styles.detailValue}>{customer.gender}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Address</Text>
                  <Text style={styles.detailValue}>
                    {customer.address.street}, {customer.address.city}, {customer.address.state} - {customer.address.pincode}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Member Since</Text>
                  <Text style={styles.detailValue}>{customer.memberSince}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Preferred Vehicle</Text>
                  <Text style={styles.detailValue}>{customer.preferredVehicleType}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Emergency Contact</Text>
                  <Text style={styles.detailValue}>{customer.emergencyContact}</Text>
                </View>
              </View>
            </View>

            {/* Document Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Document Information</Text>
              <View style={styles.documentCard}>
                <View style={styles.documentItem}>
                  <Ionicons name="card-outline" size={20} color="#666" />
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentLabel}>Driving License</Text>
                    <Text style={styles.documentValue}>{customer.drivingLicense.number}</Text>
                    <Text style={styles.documentExpiry}>Expires: {customer.drivingLicense.expiryDate}</Text>
                  </View>
                  <View style={styles.documentStatus}>
                    <Ionicons
                      name={customer.drivingLicense.verified ? "checkmark-circle" : "close-circle"}
                      size={20}
                      color={customer.drivingLicense.verified ? "#34C759" : "#FF3B30"}
                    />
                  </View>
                </View>
                <View style={styles.documentItem}>
                  <Ionicons name="person-outline" size={20} color="#666" />
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentLabel}>ID Proof ({customer.idProof.type})</Text>
                    <Text style={styles.documentValue}>{customer.idProof.number}</Text>
                  </View>
                  <View style={styles.documentStatus}>
                    <Ionicons
                      name={customer.idProof.verified ? "checkmark-circle" : "close-circle"}
                      size={20}
                      color={customer.idProof.verified ? "#34C759" : "#FF3B30"}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Booking History */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Booking History</Text>
              <FlatList
                data={bookingHistory}
                renderItem={renderBookingItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.key}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  moreButton: {
    padding: 8,
  },
  customerCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E5EA',
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
  profileInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  customerPhone: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  customerEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationText: {
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    minWidth: 80,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 4,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  documentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  documentLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  documentValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    marginBottom: 2,
  },
  documentExpiry: {
    fontSize: 12,
    color: '#666',
  },
  documentStatus: {
    marginLeft: 12,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookingInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
  },
  bookingStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bookingDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingSection: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
