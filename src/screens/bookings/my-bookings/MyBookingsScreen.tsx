import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    RefreshControl,
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

interface Booking {
  id: string;
  customerName: string;
  customerImage: string;
  vehicleName: string;
  vehicleImage: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  pickupLocation: string;
  dropoffLocation: string;
  duration: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    customerName: 'Rajesh Kumar',
    customerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    vehicleName: 'Toyota Camry',
    vehicleImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
    startDate: '2024-01-15',
    endDate: '2024-01-17',
    totalAmount: 5000,
    status: 'upcoming',
    pickupLocation: 'Mumbai Airport',
    dropoffLocation: 'Mumbai Airport',
    duration: '2 days',
  },
  {
    id: '2',
    customerName: 'Priya Sharma',
    customerImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    vehicleName: 'Honda City',
    vehicleImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
    startDate: '2024-01-10',
    endDate: '2024-01-12',
    totalAmount: 3600,
    status: 'active',
    pickupLocation: 'Delhi Railway Station',
    dropoffLocation: 'Delhi Airport',
    duration: '2 days',
  },
  {
    id: '3',
    customerName: 'Amit Patel',
    customerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    vehicleName: 'Hyundai Creta',
    vehicleImage: 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
    startDate: '2024-01-05',
    endDate: '2024-01-08',
    totalAmount: 6600,
    status: 'completed',
    pickupLocation: 'Bangalore City Center',
    dropoffLocation: 'Bangalore City Center',
    duration: '3 days',
  },
];

interface BookingCardProps {
  booking: Booking;
  onPress: () => void;
  index: number;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onPress, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

  const getStatusColor = () => {
    switch (booking.status) {
      case 'upcoming': return BrandColors.dot;
      case 'active': return BrandColors.accent;
      case 'completed': return BrandColors.success;
      case 'cancelled': return BrandColors.error;
      default: return BrandColors.textSecondary;
    }
  };

  const getStatusText = () => {
    switch (booking.status) {
      case 'upcoming': return 'Upcoming';
      case 'active': return 'Active';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const getStatusIcon = () => {
    switch (booking.status) {
      case 'upcoming': return 'time';
      case 'active': return 'play-circle';
      case 'completed': return 'checkmark-circle';
      case 'cancelled': return 'close-circle';
      default: return 'help-circle';
    }
  };

  return (
    <Animated.View
      style={[
        styles.bookingCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Card variant="elevated" size="lg" style={styles.bookingCardContent}>
          {/* Header */}
          <View style={styles.bookingHeader}>
            <View style={styles.customerInfo}>
              <Image source={{ uri: booking.customerImage }} style={styles.customerImage} />
              <View style={styles.customerDetails}>
                <Text style={styles.customerName}>{booking.customerName}</Text>
                <Text style={styles.bookingId}>Booking #{booking.id}</Text>
              </View>
            </View>

            <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}20` }]}>
              <Ionicons name={getStatusIcon()} size={16} color={getStatusColor()} />
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                {getStatusText()}
              </Text>
            </View>
          </View>

          {/* Vehicle Info */}
          <View style={styles.vehicleInfo}>
            <Image source={{ uri: booking.vehicleImage }} style={styles.vehicleImage} />
            <View style={styles.vehicleDetails}>
              <Text style={styles.vehicleName}>{booking.vehicleName}</Text>
              <Text style={styles.duration}>{booking.duration}</Text>
            </View>
            <Text style={styles.totalAmount}>₹{booking.totalAmount}</Text>
          </View>

          {/* Location Info */}
          <View style={styles.locationInfo}>
            <View style={styles.locationItem}>
              <View style={[styles.locationIcon, { backgroundColor: `${BrandColors.accent}20` }]}>
                <Ionicons name="location" size={16} color={BrandColors.accent} />
              </View>
              <View style={styles.locationDetails}>
                <Text style={styles.locationLabel}>Pickup</Text>
                <Text style={styles.locationText}>{booking.pickupLocation}</Text>
              </View>
            </View>

            <View style={styles.locationItem}>
              <View style={[styles.locationIcon, { backgroundColor: `${BrandColors.dot}20` }]}>
                <Ionicons name="flag" size={16} color={BrandColors.dot} />
              </View>
              <View style={styles.locationDetails}>
                <Text style={styles.locationLabel}>Dropoff</Text>
                <Text style={styles.locationText}>{booking.dropoffLocation}</Text>
              </View>
            </View>
          </View>

          {/* Dates */}
          <View style={styles.dateInfo}>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>Start Date</Text>
              <Text style={styles.dateText}>{booking.startDate}</Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>End Date</Text>
              <Text style={styles.dateText}>{booking.endDate}</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <Button
              title="View Details"
              onPress={onPress}
              variant="outline"
              size="sm"
              style={styles.actionButton}
            />
            {booking.status === 'upcoming' && (
              <Button
                title="Contact"
                onPress={() => {}}
                variant="primary"
                size="sm"
                icon="call"
                style={styles.actionButton}
              />
            )}
          </View>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function MyBookingsScreen({ navigation }: any) {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'active' | 'completed' | 'cancelled'>('all');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

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
    ]).start();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const handleBookingPress = (booking: Booking) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('BookingDetailsScreen', { booking });
  };

  const handleFilterPress = (filter: typeof selectedFilter) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedFilter(filter);
  };

  const handleAddBooking = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('AddManualBookingScreen');
  };

  const filteredBookings = bookings.filter(booking =>
    selectedFilter === 'all' || booking.status === selectedFilter
  );

  const getFilterCount = (status: typeof selectedFilter) => {
    if (status === 'all') return bookings.length;
    return bookings.filter(b => b.status === status).length;
  };

  const getTotalRevenue = () => {
    return bookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + b.totalAmount, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={BrandColors.primary}
            colors={[BrandColors.primary]}
          />
        }
      >
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
          <View style={styles.headerContent}>
            <Text style={styles.title}>My Bookings</Text>
            <Text style={styles.subtitle}>
              Manage your {bookings.length} bookings
            </Text>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddBooking}>
            <LinearGradient
              colors={[BrandColors.accent, BrandColors.accentLight]}
              style={styles.addButtonGradient}
            >
              <Ionicons name="add" size={24} color={BrandColors.secondary} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Stats Cards */}
        <Animated.View
          style={[
            styles.statsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Card variant="gradient" size="md" style={styles.statCard}>
            <View style={styles.statContent}>
              <Ionicons name="cash" size={24} color={BrandColors.secondary} />
              <Text style={styles.statValue}>₹{getTotalRevenue()}</Text>
              <Text style={styles.statLabel}>Total Revenue</Text>
            </View>
          </Card>

          <Card variant="elevated" size="md" style={styles.statCard}>
            <View style={styles.statContent}>
              <Ionicons name="calendar" size={24} color={BrandColors.accent} />
              <Text style={styles.statValue}>
                {bookings.filter(b => b.status === 'active').length}
              </Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
          </Card>

          <Card variant="elevated" size="md" style={styles.statCard}>
            <View style={styles.statContent}>
              <Ionicons name="checkmark-circle" size={24} color={BrandColors.success} />
              <Text style={styles.statValue}>
                {bookings.filter(b => b.status === 'completed').length}
              </Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </Card>
        </Animated.View>

        {/* Filter Tabs */}
        <Animated.View
          style={[
            styles.filterContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterTabs}>
              {(['all', 'upcoming', 'active', 'completed', 'cancelled'] as const).map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterTab,
                    selectedFilter === filter && styles.filterTabActive,
                  ]}
                  onPress={() => handleFilterPress(filter)}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      selectedFilter === filter && styles.filterTabTextActive,
                    ]}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Text>
                  <View style={[
                    styles.filterBadge,
                    selectedFilter === filter && styles.filterBadgeActive,
                  ]}>
                    <Text style={[
                      styles.filterBadgeText,
                      selectedFilter === filter && styles.filterBadgeTextActive,
                    ]}>
                      {getFilterCount(filter)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Bookings List */}
        <Animated.View
          style={[
            styles.bookingsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {filteredBookings.length === 0 ? (
            <Card variant="elevated" size="lg" style={styles.emptyCard}>
              <View style={styles.emptyContent}>
                <Ionicons name="calendar-outline" size={64} color={BrandColors.textLight} />
                <Text style={styles.emptyTitle}>No bookings found</Text>
                <Text style={styles.emptySubtitle}>
                  {selectedFilter === 'all'
                    ? 'Your bookings will appear here'
                    : `No bookings with ${selectedFilter} status`
                  }
                </Text>
                {selectedFilter === 'all' && (
                  <Button
                    title="Add Manual Booking"
                    onPress={handleAddBooking}
                    variant="primary"
                    size="md"
                    icon="add"
                    style={styles.emptyButton}
                  />
                )}
              </View>
            </Card>
          ) : (
            filteredBookings.map((booking, index) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onPress={() => handleBookingPress(booking)}
                index={index}
              />
            ))
          )}
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
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
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
  addButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  addButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
  },
  statContent: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    textAlign: 'center',
  },

  // Filters
  filterContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  filterTabs: {
    flexDirection: 'row',
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.gray50,
    marginRight: Spacing.sm,
  },
  filterTabActive: {
    backgroundColor: BrandColors.primary,
  },
  filterTabText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.textSecondary,
    marginRight: Spacing.xs,
  },
  filterTabTextActive: {
    color: BrandColors.secondary,
  },
  filterBadge: {
    backgroundColor: BrandColors.secondary,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  filterBadgeActive: {
    backgroundColor: BrandColors.accent,
  },
  filterBadgeText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.primary,
  },
  filterBadgeTextActive: {
    color: BrandColors.secondary,
  },

  // Bookings
  bookingsContainer: {
    paddingHorizontal: Spacing.lg,
  },
  bookingCard: {
    marginBottom: Spacing.lg,
  },
  bookingCardContent: {
    padding: Spacing.md,
  },

  // Booking Header
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  customerImage: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  bookingId: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  statusText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: Spacing.xs,
  },

  // Vehicle Info
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  vehicleImage: {
    width: 60,
    height: 40,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.sm,
  },
  vehicleDetails: {
    flex: 1,
  },
  vehicleName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  duration: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },
  totalAmount: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.accent,
  },

  // Location Info
  locationInfo: {
    marginBottom: Spacing.md,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  locationDetails: {
    flex: 1,
  },
  locationLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textLight,
    marginBottom: Spacing.xs,
  },
  locationText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },

  // Date Info
  dateInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textLight,
    marginBottom: Spacing.xs,
  },
  dateText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.textPrimary,
  },

  // Actions
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: Spacing.xs,
  },

  // Empty State
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  emptyContent: {
    alignItems: 'center',
  },
  emptyTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  emptyButton: {
    marginTop: Spacing.md,
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
