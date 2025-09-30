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

import { ThemedView } from '../components/themed-view';
import { Booking, BookingStatus } from '../types';
import { formatCurrency, formatDateTime, getStatusColor, getStatusIcon } from '../utils/helpers';

/**
 * BookingsScreen Component
 * Displays all bookings for the vendor with filtering and management options
 */
export default function BookingsScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');

  // Sample booking data for development
  const sampleBookings: Booking[] = [
    {
      id: '1',
      vendorId: 'vendor1',
      customerId: 'customer1',
      carId: 'car1',
      startDate: '2024-01-15',
      endDate: '2024-01-17',
      totalAmount: 300,
      status: BookingStatus.PENDING,
      paymentStatus: 'pending',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10',
    },
    {
      id: '2',
      vendorId: 'vendor1',
      customerId: 'customer2',
      carId: 'car2',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      totalAmount: 500,
      status: BookingStatus.CONFIRMED,
      paymentStatus: 'paid',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-12',
    },
  ];

  useEffect(() => {
    loadBookings();
  }, []);

  /**
   * Load bookings from the service
   */
  const loadBookings = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await BookingService.getBookings();
      // setBookings(response.data || []);

      // Using sample data for now
      setTimeout(() => {
        setBookings(sampleBookings);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading bookings:', error);
      Alert.alert('Error', 'Failed to load bookings');
      setLoading(false);
    }
  };

  /**
   * Handle pull-to-refresh
   */
  const onRefresh = async () => {
    setRefreshing(true);
    await loadBookings();
    setRefreshing(false);
  };

  /**
   * Filter bookings by status
   */
  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter(booking => booking.status === filter);

  /**
   * Handle booking status update
   * @param bookingId - ID of the booking to update
   * @param newStatus - New status to set
   */
  const updateBookingStatus = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      // TODO: Implement actual API call
      // await BookingService.updateBookingStatus(bookingId, newStatus);

      // Update local state for now
      setBookings(prev =>
        prev.map(booking =>
          booking.id === bookingId
            ? { ...booking, status: newStatus }
            : booking
        )
      );

      Alert.alert('Success', 'Booking status updated successfully');
    } catch (error) {
      console.error('Error updating booking status:', error);
      Alert.alert('Error', 'Failed to update booking status');
    }
  };

  /**
   * Render individual booking item
   * @param item - Booking data
   */
  const renderBookingItem = ({ item }: { item: Booking }) => (
    <TouchableOpacity style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <View style={styles.bookingInfo}>
          <Text style={styles.customerName}>Customer #{item.customerId}</Text>
          <Text style={styles.bookingId}>Booking #{item.id}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Ionicons
            name={getStatusIcon(item.status) as any}
            size={16}
            color="white"
          />
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="car-outline" size={16} color="#666" />
          <Text style={styles.detailText}>Car #{item.carId}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.detailText}>
            {formatDateTime(item.startDate)} - {formatDateTime(item.endDate)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="cash-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{formatCurrency(item.totalAmount)}</Text>
        </View>
      </View>

      {/* Action buttons based on status */}
      {item.status === BookingStatus.PENDING && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.confirmButton]}
            onPress={() => updateBookingStatus(item.id, BookingStatus.CONFIRMED)}
          >
            <Text style={styles.actionButtonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => updateBookingStatus(item.id, BookingStatus.CANCELLED)}
          >
            <Text style={styles.actionButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  /**
   * Render filter buttons
   */
  const renderFilterButtons = () => {
    const filters: Array<{ key: BookingStatus | 'all'; label: string }> = [
      { key: 'all', label: 'All' },
      { key: BookingStatus.PENDING, label: 'Pending' },
      { key: BookingStatus.CONFIRMED, label: 'Confirmed' },
      { key: BookingStatus.ACTIVE, label: 'Active' },
      { key: BookingStatus.COMPLETED, label: 'Completed' },
    ];

    return (
      <View style={styles.filterContainer}>
        {filters.map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.filterButton,
              filter === key && styles.activeFilterButton,
            ]}
            onPress={() => setFilter(key)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === key && styles.activeFilterButtonText,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading bookings...</Text>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Filter buttons */}
      {renderFilterButtons()}

      {/* Bookings list */}
      <FlatList
        data={filteredBookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingItem}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No bookings found</Text>
            <Text style={styles.emptySubtext}>
              {filter === 'all'
                ? 'You don\'t have any bookings yet'
                : `No ${filter} bookings found`
              }
            </Text>
          </View>
        }
      />
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'OpenSans-Medium',
  },
  activeFilterButtonText: {
    color: 'white',
  },
  listContainer: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  bookingId: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'OpenSans-Regular',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 4,
    fontFamily: 'Montserrat-Bold',
  },
  bookingDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    fontFamily: 'OpenSans-Regular',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#28A745',
  },
  cancelButton: {
    backgroundColor: '#DC3545',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
  },
});
