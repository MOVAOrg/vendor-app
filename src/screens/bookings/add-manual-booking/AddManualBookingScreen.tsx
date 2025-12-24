import { ThemedView } from '../../../components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Add Manual Booking Screen - Create bookings manually for customers
 * Allows vendors to create bookings directly without customer app
 */
export default function AddManualBookingScreen({ navigation }: any) {
  const [bookingData, setBookingData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerId: '', // If existing customer
    vehicleId: '',
    pickupDate: '',
    pickupTime: '10:00',
    dropoffDate: '',
    dropoffTime: '18:00',
    pickupLocation: '',
    dropoffLocation: '',
    rentalType: 'daily', // hourly, daily, weekly, monthly
    totalAmount: '',
    securityDeposit: '',
    advanceAmount: '',
    notes: '',
    isExistingCustomer: false,
  });

  const [loading, setLoading] = useState(false);

  // Mock vehicles data
  const vehicles = [
    { id: '1', name: 'Maruti Swift Dzire', licensePlate: 'KA01AB1234', available: true },
    { id: '2', name: 'Hyundai Creta', licensePlate: 'KA02CD5678', available: true },
    { id: '3', name: 'Honda City', licensePlate: 'KA03EF9012', available: false },
    { id: '4', name: 'Toyota Innova', licensePlate: 'KA04GH3456', available: true },
  ];

  // Rental types
  const rentalTypes = [
    { key: 'hourly', label: 'Hourly', icon: 'time-outline' },
    { key: 'daily', label: 'Daily', icon: 'calendar-outline' },
    { key: 'weekly', label: 'Weekly', icon: 'calendar-outline' },
    { key: 'monthly', label: 'Monthly', icon: 'calendar-outline' },
  ];

  // Handle input change
  const handleInputChange = (field: string, value: string | boolean) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle vehicle selection
  const handleVehicleSelection = () => {
    const availableVehicles = vehicles.filter(v => v.available);
    Alert.alert(
      'Select Vehicle',
      'Choose a vehicle for this booking',
      [
        ...availableVehicles.map(vehicle => ({
          text: `${vehicle.name} (${vehicle.licensePlate})`,
          onPress: () => handleInputChange('vehicleId', vehicle.id),
        })),
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Handle rental type selection
  const handleRentalTypeChange = (type: string) => {
    setBookingData(prev => ({
      ...prev,
      rentalType: type,
    }));
  };

  // Calculate booking duration and amount
  const calculateBookingDetails = () => {
    // TODO: Implement actual calculation logic based on dates and rental type
    const duration = 1; // Mock duration
    const baseRate = 1200; // Mock base rate
    return {
      duration,
      amount: baseRate * duration,
    };
  };

  // Validate form
  const validateForm = () => {
    if (!bookingData.customerName.trim()) {
      Alert.alert('Error', 'Please enter customer name');
      return false;
    }
    if (!bookingData.customerPhone.trim()) {
      Alert.alert('Error', 'Please enter customer phone number');
      return false;
    }
    if (!bookingData.vehicleId) {
      Alert.alert('Error', 'Please select a vehicle');
      return false;
    }
    if (!bookingData.pickupDate.trim()) {
      Alert.alert('Error', 'Please select pickup date');
      return false;
    }
    if (!bookingData.dropoffDate.trim()) {
      Alert.alert('Error', 'Please select dropoff date');
      return false;
    }
    if (!bookingData.pickupLocation.trim()) {
      Alert.alert('Error', 'Please enter pickup location');
      return false;
    }
    return true;
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const bookingDetails = {
        ...bookingData,
        bookingId: `MOV-${Date.now()}`,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        ...calculateBookingDetails(),
      };

      // TODO: Implement actual API call to create booking
      // await bookingService.createManualBooking(bookingDetails);

      Alert.alert(
        'Booking Created Successfully!',
        `Booking ID: ${bookingDetails.bookingId}\nCustomer: ${bookingData.customerName}\nVehicle: ${vehicles.find(v => v.id === bookingData.vehicleId)?.name}`,
        [
          {
            text: 'View Booking',
            onPress: () => {
              // Navigate to booking details
              navigation.navigate('BookingDetailsScreen', { bookingId: bookingDetails.bookingId });
            },
          },
          {
            text: 'Done',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Error creating booking:', error);
      Alert.alert('Error', 'Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedVehicle = vehicles.find(v => v.id === bookingData.vehicleId);

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Manual Booking</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Create New Booking</Text>
          <Text style={styles.subtitle}>
            Manually create a booking for a customer
          </Text>

          {/* Customer Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Information</Text>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  bookingData.isExistingCustomer && styles.checkboxSelected,
                ]}
                onPress={() => handleInputChange('isExistingCustomer', !bookingData.isExistingCustomer)}
              >
                {bookingData.isExistingCustomer && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>
                Existing customer
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Customer Name *</Text>
              <TextInput
                style={styles.input}
                value={bookingData.customerName}
                onChangeText={(value) => handleInputChange('customerName', value)}
                placeholder="Enter customer name"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number *</Text>
                <TextInput
                  style={styles.input}
                  value={bookingData.customerPhone}
                  onChangeText={(value) => handleInputChange('customerPhone', value)}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={bookingData.customerEmail}
                  onChangeText={(value) => handleInputChange('customerEmail', value)}
                  placeholder="Enter email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>

          {/* Vehicle Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vehicle Selection</Text>

            <TouchableOpacity style={styles.vehicleSelector} onPress={handleVehicleSelection}>
              <View style={styles.vehicleInfo}>
                <Ionicons name="car-outline" size={24} color="#007AFF" />
                <View style={styles.vehicleDetails}>
                  <Text style={styles.vehicleName}>
                    {selectedVehicle ? selectedVehicle.name : 'Select Vehicle'}
                  </Text>
                  {selectedVehicle && (
                    <Text style={styles.vehiclePlate}>{selectedVehicle.licensePlate}</Text>
                  )}
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </TouchableOpacity>
          </View>

          {/* Rental Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rental Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Rental Type</Text>
              <View style={styles.rentalTypeContainer}>
                {rentalTypes.map((type) => (
                  <TouchableOpacity
                    key={type.key}
                    style={[
                      styles.rentalTypeOption,
                      bookingData.rentalType === type.key && styles.rentalTypeOptionSelected,
                    ]}
                    onPress={() => handleRentalTypeChange(type.key)}
                  >
                    <Ionicons
                      name={type.icon}
                      size={20}
                      color={bookingData.rentalType === type.key ? '#007AFF' : '#666'}
                    />
                    <Text style={[
                      styles.rentalTypeText,
                      bookingData.rentalType === type.key && styles.rentalTypeTextSelected,
                    ]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Pickup Date *</Text>
                <TouchableOpacity style={styles.dateInput}>
                  <Text style={[
                    styles.dateText,
                    !bookingData.pickupDate && styles.placeholderText
                  ]}>
                    {bookingData.pickupDate || 'Select pickup date'}
                  </Text>
                  <Ionicons name="calendar-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Pickup Time</Text>
                <TouchableOpacity style={styles.timeInput}>
                  <Text style={styles.timeText}>{bookingData.pickupTime}</Text>
                  <Ionicons name="time-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Dropoff Date *</Text>
                <TouchableOpacity style={styles.dateInput}>
                  <Text style={[
                    styles.dateText,
                    !bookingData.dropoffDate && styles.placeholderText
                  ]}>
                    {bookingData.dropoffDate || 'Select dropoff date'}
                  </Text>
                  <Ionicons name="calendar-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Dropoff Time</Text>
                <TouchableOpacity style={styles.timeInput}>
                  <Text style={styles.timeText}>{bookingData.dropoffTime}</Text>
                  <Ionicons name="time-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Location Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pickup Location *</Text>
              <TextInput
                style={styles.input}
                value={bookingData.pickupLocation}
                onChangeText={(value) => handleInputChange('pickupLocation', value)}
                placeholder="Enter pickup location"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dropoff Location</Text>
              <TextInput
                style={styles.input}
                value={bookingData.dropoffLocation}
                onChangeText={(value) => handleInputChange('dropoffLocation', value)}
                placeholder="Enter dropoff location (same as pickup if not specified)"
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Payment Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Details</Text>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Total Amount (₹)</Text>
                <TextInput
                  style={styles.input}
                  value={bookingData.totalAmount}
                  onChangeText={(value) => handleInputChange('totalAmount', value)}
                  placeholder="Enter total amount"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Security Deposit (₹)</Text>
                <TextInput
                  style={styles.input}
                  value={bookingData.securityDeposit}
                  onChangeText={(value) => handleInputChange('securityDeposit', value)}
                  placeholder="Enter security deposit"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Advance Amount (₹)</Text>
              <TextInput
                style={styles.input}
                value={bookingData.advanceAmount}
                onChangeText={(value) => handleInputChange('advanceAmount', value)}
                placeholder="Enter advance amount"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Additional Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={bookingData.notes}
                onChangeText={(value) => handleInputChange('notes', value)}
                placeholder="Any additional notes or special instructions"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Creating Booking...' : 'Create Booking'}
            </Text>
          </TouchableOpacity>

          <View style={styles.bottomSpacer} />
        </View>
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
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    lineHeight: 22,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  vehicleSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehicleDetails: {
    marginLeft: 12,
    flex: 1,
  },
  vehicleName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginBottom: 2,
  },
  vehiclePlate: {
    fontSize: 14,
    color: '#666',
  },
  rentalTypeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  rentalTypeOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  rentalTypeOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  rentalTypeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  rentalTypeTextSelected: {
    color: '#007AFF',
    fontWeight: '500',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  timeInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  timeText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    color: '#999',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 40,
  },
});
