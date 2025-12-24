import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function BookingCalendarScreen({ navigation }: any) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('month'); // month, week, day
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Mock booking data
  const bookings = [
    {
      id: 'BK001',
      customerName: 'Rajesh Kumar',
      vehicleName: 'Toyota Camry 2023',
      startDate: '2024-03-15',
      endDate: '2024-03-17',
      status: 'confirmed',
      amount: 5000,
    },
    {
      id: 'BK002',
      customerName: 'Priya Sharma',
      vehicleName: 'Honda City 2022',
      startDate: '2024-03-18',
      endDate: '2024-03-20',
      status: 'in-progress',
      amount: 4400,
    },
    {
      id: 'BK003',
      customerName: 'Amit Patel',
      vehicleName: 'Maruti Swift 2023',
      startDate: '2024-03-22',
      endDate: '2024-03-24',
      status: 'confirmed',
      amount: 3600,
    },
  ];

  const vehicles = [
    { id: '1', name: 'Toyota Camry 2023', licensePlate: 'MH01AB1234' },
    { id: '2', name: 'Honda City 2022', licensePlate: 'MH02CD5678' },
    { id: '3', name: 'Maruti Swift 2023', licensePlate: 'MH03EF9012' },
  ];

  const viewOptions = [
    { id: 'month', title: 'Month', icon: 'calendar' },
    { id: 'week', title: 'Week', icon: 'calendar-outline' },
    { id: 'day', title: 'Day', icon: 'today' },
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

  const handleViewChange = (view: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedView(view);
  };

  const handleDateSelect = (date: Date) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedDate(date);
  };

  const handleCreateBooking = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('CreateBookingScreen');
  };

  const handleBookingSelect = (booking: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('BookingDetailsScreen', { booking });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return BrandColors.accent;
      case 'in-progress': return BrandColors.warning;
      case 'completed': return BrandColors.primary;
      case 'cancelled': return BrandColors.error;
      default: return BrandColors.textLight;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return 'checkmark-circle';
      case 'in-progress': return 'time';
      case 'completed': return 'checkmark-done-circle';
      case 'cancelled': return 'close-circle';
      default: return 'help-circle';
    }
  };

  const renderCalendarHeader = () => (
    <Animated.View
      style={[
        styles.calendarHeader,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Card variant="elevated" size="md" style={styles.headerCard}>
        <View style={styles.headerContent}>
          <View style={styles.dateInfo}>
            <Text style={styles.monthYear}>
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Text>
            <Text style={styles.selectedDate}>
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' })}
            </Text>
          </View>

          <View style={styles.viewOptions}>
            {viewOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.viewOption,
                  selectedView === option.id && styles.viewOptionActive,
                ]}
                onPress={() => handleViewChange(option.id)}
              >
                <Ionicons
                  name={option.icon as any}
                  size={16}
                  color={selectedView === option.id ? BrandColors.primary : BrandColors.textLight}
                />
                <Text style={[
                  styles.viewOptionText,
                  selectedView === option.id && styles.viewOptionTextActive,
                ]}>
                  {option.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Card>
    </Animated.View>
  );

  const renderCalendarGrid = () => (
    <Animated.View
      style={[
        styles.calendarGrid,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Card variant="elevated" size="lg" style={styles.calendarCard}>
        <Text style={styles.calendarTitle}>Calendar View</Text>

        {/* Calendar Grid Placeholder */}
        <View style={styles.calendarPlaceholder}>
          <Ionicons name="calendar" size={80} color={BrandColors.textLight} />
          <Text style={styles.calendarPlaceholderText}>
            Calendar view coming soon!
          </Text>
          <Text style={styles.calendarPlaceholderSubtext}>
            For now, view your bookings in the list below
          </Text>
        </View>
      </Card>
    </Animated.View>
  );

  const renderBookingsList = () => (
    <Animated.View
      style={[
        styles.bookingsList,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Card variant="elevated" size="lg" style={styles.bookingsCard}>
        <Text style={styles.bookingsTitle}>Upcoming Bookings</Text>

        {bookings.map((booking) => (
          <TouchableOpacity
            key={booking.id}
            style={styles.bookingItem}
            onPress={() => handleBookingSelect(booking)}
          >
            <View style={styles.bookingLeft}>
              <View style={[
                styles.bookingIcon,
                { backgroundColor: `${getStatusColor(booking.status)}20` },
              ]}>
                <Ionicons name="car" size={20} color={getStatusColor(booking.status)} />
              </View>

              <View style={styles.bookingInfo}>
                <Text style={styles.bookingCustomer}>{booking.customerName}</Text>
                <Text style={styles.bookingVehicle}>{booking.vehicleName}</Text>
                <Text style={styles.bookingDates}>
                  {booking.startDate} - {booking.endDate}
                </Text>
              </View>
            </View>

            <View style={styles.bookingRight}>
              <View style={styles.bookingStatus}>
                <Ionicons name={getStatusIcon(booking.status)} size={14} color={getStatusColor(booking.status)} />
                <Text style={[styles.bookingStatusText, { color: getStatusColor(booking.status) }]}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Text>
              </View>
              <Text style={styles.bookingAmount}>₹{booking.amount}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </Card>
    </Animated.View>
  );

  const renderVehicleStats = () => (
    <Animated.View
      style={[
        styles.vehicleStats,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Card variant="elevated" size="lg" style={styles.statsCard}>
        <Text style={styles.statsTitle}>Vehicle Availability</Text>

        <View style={styles.statsGrid}>
          {vehicles.map((vehicle) => (
            <View key={vehicle.id} style={styles.statItem}>
              <View style={styles.statIcon}>
                <Ionicons name="car" size={24} color={BrandColors.primary} />
              </View>
              <Text style={styles.statVehicleName}>{vehicle.name}</Text>
              <Text style={styles.statVehiclePlate}>{vehicle.licensePlate}</Text>
              <View style={styles.statAvailability}>
                <View style={[styles.availabilityDot, { backgroundColor: BrandColors.accent }]} />
                <Text style={styles.availabilityText}>Available</Text>
              </View>
            </View>
          ))}
        </View>
      </Card>
    </Animated.View>
  );

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
            <Text style={styles.title}>Booking Calendar</Text>
            <Text style={styles.subtitle}>
              Manage your vehicle bookings
            </Text>
          </View>
        </Animated.View>

        {/* Calendar Header */}
        {renderCalendarHeader()}

        {/* Calendar Grid */}
        {renderCalendarGrid()}

        {/* Vehicle Stats */}
        {renderVehicleStats()}

        {/* Bookings List */}
        {renderBookingsList()}

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
          <Button
            title="Create New Booking"
            onPress={handleCreateBooking}
            variant="primary"
            size="lg"
            icon="add"
            iconPosition="right"
            style={styles.createButton}
          />
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

  // Calendar Header
  calendarHeader: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  headerCard: {
    width: '100%',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateInfo: {
    flex: 1,
  },
  monthYear: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  selectedDate: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },
  viewOptions: {
    flexDirection: 'row',
  },
  viewOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    marginLeft: Spacing.sm,
    backgroundColor: BrandColors.gray50,
  },
  viewOptionActive: {
    backgroundColor: BrandColors.primary,
  },
  viewOptionText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textLight,
    marginLeft: Spacing.xs,
  },
  viewOptionTextActive: {
    color: BrandColors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Calendar Grid
  calendarGrid: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  calendarCard: {
    width: '100%',
  },
  calendarTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  calendarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
  },
  calendarPlaceholderText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  calendarPlaceholderSubtext: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
    textAlign: 'center',
  },

  // Vehicle Stats
  vehicleStats: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statsCard: {
    width: '100%',
  },
  statsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.backgroundCard,
    marginHorizontal: Spacing.xs,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: `${BrandColors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  statVehicleName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  statVehiclePlate: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  statAvailability: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.xs,
  },
  availabilityText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.accent,
    fontWeight: Typography.fontWeight.medium,
  },

  // Bookings List
  bookingsList: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  bookingsCard: {
    width: '100%',
  },
  bookingsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  bookingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.backgroundCard,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  bookingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bookingIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingCustomer: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  bookingVehicle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  bookingDates: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textLight,
  },
  bookingRight: {
    alignItems: 'flex-end',
  },
  bookingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  bookingStatusText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    marginLeft: Spacing.xs,
  },
  bookingAmount: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.accent,
  },

  // Buttons
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  createButton: {
    width: '100%',
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
