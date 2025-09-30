import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  vehicle: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
  };
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  pickupLocation: string;
  dropoffLocation: string;
  duration: number; // in days
}

/**
 * My Bookings Screen Component
 * Displays all vendor bookings with filtering and management options
 * Shows booking status, customer details, and quick actions
 */
export default function MyBookingsScreen({ navigation }: any) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'active' | 'completed'>('all');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      // TODO: Fetch actual bookings from backend
      // const data = await BookingService.getVendorBookings();

      // Mock data for now
      const mockBookings: Booking[] = [
        {
          id: '1',
          customerName: 'Ahmed Hassan',
          customerPhone: '+971 50 123 4567',
          vehicle: {
            make: 'Toyota',
            model: 'Camry',
            year: 2022,
            licensePlate: 'ABC-123',
          },
          startDate: '2024-01-15',
          endDate: '2024-01-18',
          totalAmount: 450,
          status: 'confirmed',
          paymentStatus: 'paid',
          pickupLocation: 'Dubai Marina',
          dropoffLocation: 'Dubai Marina',
          duration: 3,
        },
        {
          id: '2',
          customerName: 'Sarah Johnson',
          customerPhone: '+971 55 987 6543',
          vehicle: {
            make: 'Honda',
            model: 'Civic',
            year: 2021,
            licensePlate: 'DEF-456',
          },
          startDate: '2024-01-20',
          endDate: '2024-01-25',
          totalAmount: 600,
          status: 'active',
          paymentStatus: 'paid',
          pickupLocation: 'JBR',
          dropoffLocation: 'JBR',
          duration: 5,
        },
        {
          id: '3',
          customerName: 'Mohammed Al-Rashid',
          customerPhone: '+971 56 111 2233',
          vehicle: {
            make: 'Nissan',
            model: 'Altima',
            year: 2023,
            licensePlate: 'GHI-789',
          },
          startDate: '2024-01-10',
          endDate: '2024-01-12',
          totalAmount: 360,
          status: 'completed',
          paymentStatus: 'paid',
          pickupLocation: 'Downtown',
          dropoffLocation: 'Downtown',
          duration: 2,
        },
      ];

      setBookings(mockBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBookings();
    setRefreshing(false);
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FF9500';
      case 'confirmed':
        return '#007AFF';
      case 'active':
        return '#34C759';
      case 'completed':
        return '#8E8E93';
      case 'cancelled':
        return '#FF3B30';
      default:
        return '#666666';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#34C759';
      case 'pending':
        return '#FF9500';
      case 'failed':
        return '#FF3B30';
      case 'refunded':
        return '#8E8E93';
      default:
        return '#666666';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => navigation.navigate('BookingDetailsScreen', { bookingId: item.id })}
    >
      {/* Booking Header */}
      <View style={styles.bookingHeader}>
        <View style={styles.bookingInfo}>
          <Text style={styles.bookingId}>#{item.id}</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
          </View>
          <View style={[styles.paymentBadge, { backgroundColor: getPaymentStatusColor(item.paymentStatus) }]}>
            <Text style={styles.paymentText}>{item.paymentStatus.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      {/* Vehicle Info */}
      <View style={styles.vehicleInfo}>
        <Ionicons name="car-outline" size={16} color="#666666" />
        <Text style={styles.vehicleText}>
          {item.vehicle.year} {item.vehicle.make} {item.vehicle.model}
        </Text>
        <Text style={styles.licensePlate}>({item.vehicle.licensePlate})</Text>
      </View>

      {/* Rental Period */}
      <View style={styles.rentalPeriod}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#666666" />
          <View style={styles.dateInfo}>
            <Text style={styles.dateLabel}>Pickup</Text>
            <Text style={styles.dateText}>{formatDate(item.startDate)}</Text>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#666666" />
          <View style={styles.dateInfo}>
            <Text style={styles.dateLabel}>Return</Text>
            <Text style={styles.dateText}>{formatDate(item.endDate)}</Text>
          </View>
        </View>

        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>{item.duration} days</Text>
        </View>
      </View>

      {/* Location */}
      <View style={styles.locationInfo}>
        <Ionicons name="location-outline" size={16} color="#666666" />
        <Text style={styles.locationText}>{item.pickupLocation}</Text>
        {item.pickupLocation !== item.dropoffLocation && (
          <>
            <Ionicons name="arrow-forward" size={16} color="#666666" />
            <Text style={styles.locationText}>{item.dropoffLocation}</Text>
          </>
        )}
      </View>

      {/* Amount and Actions */}
      <View style={styles.bookingFooter}>
        <Text style={styles.amount}>AED {item.totalAmount}</Text>

        <View style={styles.actions}>
          {item.status === 'confirmed' && (
            <TouchableOpacity
              style={[styles.actionButton, styles.startButton]}
              onPress={() => handleStartBooking(item.id)}
            >
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          )}

          {item.status === 'active' && (
            <TouchableOpacity
              style={[styles.actionButton, styles.endButton]}
              onPress={() => handleEndBooking(item.id)}
            >
              <Text style={styles.endButtonText}>End</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.actionButton, styles.detailsButton]}
            onPress={() => navigation.navigate('BookingDetailsScreen', { bookingId: item.id })}
          >
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleStartBooking = async (bookingId: string) => {
    try {
      // TODO: Implement start booking API call
      // await BookingService.startBooking(bookingId);
      console.log('Start booking:', bookingId);
    } catch (error) {
      console.error('Error starting booking:', error);
    }
  };

  const handleEndBooking = async (bookingId: string) => {
    try {
      // TODO: Implement end booking API call
      // await BookingService.endBooking(bookingId);
      console.log('End booking:', bookingId);
    } catch (error) {
      console.error('Error ending booking:', error);
    }
  };

  const filterButtons = [
    { key: 'all', label: 'All', count: bookings.length },
    { key: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
    { key: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
    { key: 'active', label: 'Active', count: bookings.filter(b => b.status === 'active').length },
    { key: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Bookings</Text>
          <Text style={styles.subtitle}>{bookings.length} total bookings</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddManualBookingScreen')}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filterButtons.map((button) => (
            <TouchableOpacity
              key={button.key}
              style={[
                styles.filterButton,
                filter === button.key && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(button.key as any)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === button.key && styles.filterButtonTextActive,
                ]}
              >
                {button.label} ({button.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bookings List */}
      <FlatList
        data={filteredBookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color="#CCCCCC" />
            <Text style={styles.emptyTitle}>No bookings found</Text>
            <Text style={styles.emptySubtitle}>
              {filter === 'all'
                ? 'Your bookings will appear here'
                : `No bookings with status: ${filter}`
              }
            </Text>
            {filter === 'all' && (
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.navigate('AddManualBookingScreen')}
              >
                <Text style={styles.emptyButtonText}>Add Manual Booking</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
  subtitle: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'OpenSans-Regular',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'OpenSans-Regular',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  listContainer: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  bookingId: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'OpenSans-Regular',
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 2,
    fontFamily: 'Montserrat-SemiBold',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  paymentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paymentText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  vehicleText: {
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 8,
    fontFamily: 'OpenSans-Regular',
  },
  licensePlate: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
    fontFamily: 'OpenSans-Regular',
  },
  rentalPeriod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInfo: {
    marginLeft: 8,
  },
  dateLabel: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'OpenSans-Regular',
  },
  dateText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  durationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
    fontFamily: 'OpenSans-Regular',
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34C759',
    fontFamily: 'Montserrat-Bold',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  startButton: {
    borderColor: '#34C759',
    backgroundColor: '#34C759',
  },
  endButton: {
    borderColor: '#FF3B30',
    backgroundColor: '#FF3B30',
  },
  detailsButton: {
    borderColor: '#007AFF',
    backgroundColor: 'transparent',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  endButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  detailsButtonText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666666',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Montserrat-SemiBold',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'OpenSans-Regular',
  },
  emptyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
});
