import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

/**
 * Calendar View Screen - Visualize bookings and availability
 * Shows monthly calendar with booking status and vehicle availability
 */
export default function CalendarViewScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedVehicle, setSelectedVehicle] = useState('all');

  // Sample booking data
  const bookings = [
    {
      id: '1',
      vehicleId: 'vehicle1',
      vehicleName: 'Maruti Swift Dzire',
      customerName: 'Rajesh Kumar',
      startDate: new Date(2025, 0, 15), // Jan 15
      endDate: new Date(2025, 0, 18), // Jan 18
      status: 'confirmed',
      amount: 4500,
    },
    {
      id: '2',
      vehicleId: 'vehicle2',
      vehicleName: 'Hyundai Creta',
      customerName: 'Priya Sharma',
      startDate: new Date(2025, 0, 20), // Jan 20
      endDate: new Date(2025, 0, 22), // Jan 22
      status: 'pending',
      amount: 6000,
    },
    {
      id: '3',
      vehicleId: 'vehicle1',
      vehicleName: 'Maruti Swift Dzire',
      customerName: 'Amit Singh',
      startDate: new Date(2025, 0, 25), // Jan 25
      endDate: new Date(2025, 0, 27), // Jan 27
      status: 'ongoing',
      amount: 3000,
    },
  ];

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  // Get bookings for a specific date
  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      bookingStart.setHours(0, 0, 0, 0);
      bookingEnd.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);

      return date >= bookingStart && date <= bookingEnd;
    });
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  // Navigate to next month
  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Go to today
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const dayBookings = getBookingsForDate(date);
    if (dayBookings.length > 0) {
      // TODO: Show booking details modal
      console.log('Show booking details for', date.toDateString());
    }
  };

  // Get status color for booking
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#34C759';
      case 'pending':
        return '#FF9500';
      case 'ongoing':
        return '#007AFF';
      case 'completed':
        return '#8E8E93';
      default:
        return '#C7C7CC';
    }
  };

  // Render calendar day
  const renderCalendarDay = (date: Date | null, index: number) => {
    if (!date) {
      return <View key={index} style={styles.emptyDay} />;
    }

    const dayBookings = getBookingsForDate(date);
    const isToday = date.toDateString() === new Date().toDateString();
    const isSelected = date.toDateString() === selectedDate.toDateString();

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.calendarDay,
          isToday && styles.todayDay,
          isSelected && styles.selectedDay,
        ]}
        onPress={() => handleDateSelect(date)}
      >
        <Text style={[
          styles.dayNumber,
          isToday && styles.todayText,
          isSelected && styles.selectedText,
        ]}>
          {date.getDate()}
        </Text>

        {/* Booking indicators */}
        {dayBookings.length > 0 && (
          <View style={styles.bookingIndicators}>
            {dayBookings.slice(0, 3).map((booking, bookingIndex) => (
              <View
                key={bookingIndex}
                style={[
                  styles.bookingDot,
                  { backgroundColor: getStatusColor(booking.status) }
                ]}
              />
            ))}
            {dayBookings.length > 3 && (
              <Text style={styles.moreBookings}>+{dayBookings.length - 3}</Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // Render booking details for selected date
  const renderSelectedDateBookings = () => {
    const dayBookings = getBookingsForDate(selectedDate);

    if (dayBookings.length === 0) {
      return (
        <View style={styles.noBookingsContainer}>
          <Ionicons name="calendar-outline" size={48} color="#C7C7CC" />
          <Text style={styles.noBookingsTitle}>No bookings</Text>
          <Text style={styles.noBookingsText}>
            {selectedDate.toDateString() === new Date().toDateString()
              ? 'No bookings for today'
              : `No bookings for ${selectedDate.toLocaleDateString()}`
            }
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.bookingsContainer}>
        <Text style={styles.bookingsTitle}>
          Bookings for {selectedDate.toLocaleDateString()}
        </Text>
        {dayBookings.map((booking) => (
          <TouchableOpacity
            key={booking.id}
            style={styles.bookingCard}
            onPress={() => {
              // TODO: Navigate to booking details
              console.log('Navigate to booking details:', booking.id);
            }}
          >
            <View style={styles.bookingHeader}>
              <Text style={styles.bookingVehicle}>{booking.vehicleName}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(booking.status) }
              ]}>
                <Text style={styles.statusText}>{booking.status}</Text>
              </View>
            </View>
            <Text style={styles.bookingCustomer}>{booking.customerName}</Text>
            <Text style={styles.bookingDates}>
              {booking.startDate.toLocaleDateString()} - {booking.endDate.toLocaleDateString()}
            </Text>
            <Text style={styles.bookingAmount}>₹{booking.amount.toLocaleString()}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const days = getDaysInMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Calendar</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Calendar Controls */}
      <View style={styles.calendarControls}>
        <TouchableOpacity style={styles.navButton} onPress={goToPreviousMonth}>
          <Ionicons name="chevron-back" size={20} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.monthYearButton} onPress={goToToday}>
          <Text style={styles.monthYearText}>{monthYear}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={goToNextMonth}>
          <Ionicons name="chevron-forward" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* View Mode Tabs */}
      <View style={styles.viewModeContainer}>
        {(['month', 'week', 'day'] as const).map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[
              styles.viewModeTab,
              viewMode === mode && styles.activeViewModeTab,
            ]}
            onPress={() => setViewMode(mode)}
          >
            <Text style={[
              styles.viewModeText,
              viewMode === mode && styles.activeViewModeText,
            ]}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendarContainer}>
        {/* Week day headers */}
        <View style={styles.weekDayHeaders}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Text key={day} style={styles.weekDayText}>{day}</Text>
          ))}
        </View>

        {/* Calendar days */}
        <View style={styles.calendarGrid}>
          {days.map((date, index) => renderCalendarDay(date, index))}
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Status Legend:</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#34C759' }]} />
            <Text style={styles.legendText}>Confirmed</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF9500' }]} />
            <Text style={styles.legendText}>Pending</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#007AFF' }]} />
            <Text style={styles.legendText}>Ongoing</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#8E8E93' }]} />
            <Text style={styles.legendText}>Completed</Text>
          </View>
        </View>
      </View>

      {/* Selected Date Bookings */}
      <ScrollView style={styles.selectedDateContainer}>
        {renderSelectedDateBookings()}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Block Dates</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Add Booking</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  filterButton: {
    padding: 8,
  },
  calendarControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  navButton: {
    padding: 8,
  },
  monthYearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  viewModeContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 4,
  },
  viewModeTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeViewModeTab: {
    backgroundColor: '#FFFFFF',
  },
  viewModeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeViewModeText: {
    color: '#007AFF',
  },
  calendarContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  weekDayHeaders: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    paddingVertical: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  emptyDay: {
    width: '14.28%',
    aspectRatio: 1,
  },
  todayDay: {
    backgroundColor: '#E3F2FD',
  },
  selectedDay: {
    backgroundColor: '#007AFF',
  },
  dayNumber: {
    fontSize: 14,
    color: '#000',
  },
  todayText: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bookingIndicators: {
    position: 'absolute',
    bottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 1,
  },
  moreBookings: {
    fontSize: 8,
    color: '#666',
    marginLeft: 2,
  },
  legendContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  selectedDateContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  noBookingsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noBookingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 12,
    marginBottom: 4,
  },
  noBookingsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  bookingsContainer: {
    marginBottom: 20,
  },
  bookingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  bookingVehicle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  bookingCustomer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  bookingDates: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  bookingAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34C759',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
