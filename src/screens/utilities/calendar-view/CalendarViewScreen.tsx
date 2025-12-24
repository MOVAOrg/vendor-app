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

export default function CalendarViewScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('month'); // month, week, day
  const [selectedVehicle, setSelectedVehicle] = useState('all');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const viewOptions = [
    { id: 'month', title: 'Month', icon: 'calendar' },
    { id: 'week', title: 'Week', icon: 'calendar-outline' },
    { id: 'day', title: 'Day', icon: 'today' },
  ];

  const vehicles = [
    { id: 'all', name: 'All Vehicles', color: BrandColors.primary },
    { id: '1', name: 'Toyota Camry 2023', color: BrandColors.accent },
    { id: '2', name: 'Honda City 2022', color: BrandColors.dot },
    { id: '3', name: 'Maruti Swift 2023', color: BrandColors.warning },
  ];

  // Mock booking data
  const bookings = [
    {
      id: 'BK001',
      customerName: 'Rajesh Kumar',
      vehicleId: '1',
      vehicleName: 'Toyota Camry 2023',
      startDate: '2024-03-15',
      endDate: '2024-03-17',
      startTime: '10:00 AM',
      endTime: '10:00 AM',
      status: 'confirmed',
      amount: 5000,
    },
    {
      id: 'BK002',
      customerName: 'Priya Sharma',
      vehicleId: '2',
      vehicleName: 'Honda City 2022',
      startDate: '2024-03-18',
      endDate: '2024-03-20',
      startTime: '9:00 AM',
      endTime: '9:00 AM',
      status: 'in-progress',
      amount: 4400,
    },
    {
      id: 'BK003',
      customerName: 'Amit Patel',
      vehicleId: '3',
      vehicleName: 'Maruti Swift 2023',
      startDate: '2024-03-22',
      endDate: '2024-03-24',
      startTime: '11:00 AM',
      endTime: '11:00 AM',
      status: 'confirmed',
      amount: 3600,
    },
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

  const handleVehicleChange = (vehicleId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedVehicle(vehicleId);
  };

  const handleDateSelect = (date: Date) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedDate(date);
  };

  const handleBookingSelect = (booking: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('BookingDetailsScreen', { booking });
  };

  const handleCreateBooking = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('CreateBookingScreen');
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

  const filteredBookings = bookings.filter(booking =>
    selectedVehicle === 'all' || booking.vehicleId === selectedVehicle
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
            <Text style={styles.title}>Calendar View</Text>
            <Text style={styles.subtitle}>
              Manage your vehicle bookings
            </Text>
          </View>
        </Animated.View>

        {/* View Options */}
        <Animated.View
          style={[
            styles.viewContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Card variant="elevated" size="md" style={styles.viewCard}>
            <Text style={styles.viewTitle}>View Options</Text>

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
          </Card>
        </Animated.View>

        {/* Vehicle Filter */}
        <Animated.View
          style={[
            styles.vehicleContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Card variant="elevated" size="md" style={styles.vehicleCard}>
            <Text style={styles.vehicleTitle}>Filter by Vehicle</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.vehicleOptions}>
                {vehicles.map((vehicle) => (
                  <TouchableOpacity
                    key={vehicle.id}
                    style={[
                      styles.vehicleOption,
                      selectedVehicle === vehicle.id && styles.vehicleOptionActive,
                    ]}
                    onPress={() => handleVehicleChange(vehicle.id)}
                  >
                    <View style={[
                      styles.vehicleColor,
                      { backgroundColor: vehicle.color },
                    ]} />
                    <Text style={[
                      styles.vehicleOptionText,
                      selectedVehicle === vehicle.id && styles.vehicleOptionTextActive,
                    ]}>
                      {vehicle.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Card>
        </Animated.View>

        {/* Calendar Placeholder */}
        <Animated.View
          style={[
            styles.calendarContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Card variant="elevated" size="lg" style={styles.calendarCard}>
            <Text style={styles.calendarTitle}>Calendar View</Text>

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

        {/* Bookings List */}
        <Animated.View
          style={[
            styles.bookingsContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          <Card variant="elevated" size="lg" style={styles.bookingsCard}>
            <Text style={styles.bookingsTitle}>Upcoming Bookings</Text>

            {filteredBookings.map((booking) => (
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
                    <Text style={styles.bookingTime}>
                      {booking.startTime} - {booking.endTime}
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

  // View Options
  viewContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  viewCard: {
    width: '100%',
  },
  viewTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  viewOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.gray50,
    marginHorizontal: Spacing.xs,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  viewOptionActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  viewOptionText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textLight,
    marginLeft: Spacing.xs,
  },
  viewOptionTextActive: {
    color: BrandColors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Vehicle Filter
  vehicleContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  vehicleCard: {
    width: '100%',
  },
  vehicleTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  vehicleOptions: {
    flexDirection: 'row',
  },
  vehicleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.gray50,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  vehicleOptionActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  vehicleColor: {
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
  },
  vehicleOptionText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textLight,
  },
  vehicleOptionTextActive: {
    color: BrandColors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Calendar
  calendarContainer: {
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

  // Bookings
  bookingsContainer: {
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
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  bookingTime: {
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
