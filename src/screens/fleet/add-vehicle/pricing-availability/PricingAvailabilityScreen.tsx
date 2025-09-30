import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Pricing & Availability Screen - Set vehicle pricing and availability
 * Final step in adding a new vehicle to the fleet
 */
export default function PricingAvailabilityScreen({ navigation, route }: any) {
  const { vehicleData } = route.params || {};

  const [pricing, setPricing] = useState({
    hourlyRate: '',
    dailyRate: '',
    weeklyRate: '',
    monthlyRate: '',
    securityDeposit: '',
    cleaningFee: '',
    lateReturnFee: '',
    cancellationFee: '',
    extraKmRate: '',
    extraHourRate: '',
  });

  const [availability, setAvailability] = useState({
    isAvailable: true,
    advanceBookingDays: '7', // days
    minimumRentalHours: '4', // hours
    maximumRentalDays: '30', // days
    pickupTime: '08:00',
    dropoffTime: '20:00',
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    locationBasedPricing: false,
    surgePricing: false,
    weekendPricing: false,
  });

  const [loading, setLoading] = useState(false);

  // Pricing categories
  const pricingCategories = [
    {
      title: 'Base Rates',
      fields: [
        { key: 'hourlyRate', label: 'Hourly Rate (₹)', placeholder: 'Enter hourly rate' },
        { key: 'dailyRate', label: 'Daily Rate (₹)', placeholder: 'Enter daily rate' },
        { key: 'weeklyRate', label: 'Weekly Rate (₹)', placeholder: 'Enter weekly rate' },
        { key: 'monthlyRate', label: 'Monthly Rate (₹)', placeholder: 'Enter monthly rate' },
      ],
    },
    {
      title: 'Additional Fees',
      fields: [
        { key: 'securityDeposit', label: 'Security Deposit (₹)', placeholder: 'Enter security deposit' },
        { key: 'cleaningFee', label: 'Cleaning Fee (₹)', placeholder: 'Enter cleaning fee' },
        { key: 'lateReturnFee', label: 'Late Return Fee (₹)', placeholder: 'Enter late return fee' },
        { key: 'cancellationFee', label: 'Cancellation Fee (₹)', placeholder: 'Enter cancellation fee' },
      ],
    },
    {
      title: 'Extra Charges',
      fields: [
        { key: 'extraKmRate', label: 'Extra KM Rate (₹/km)', placeholder: 'Enter extra km rate' },
        { key: 'extraHourRate', label: 'Extra Hour Rate (₹)', placeholder: 'Enter extra hour rate' },
      ],
    },
  ];

  // Handle pricing input change
  const handlePricingChange = (field: string, value: string) => {
    setPricing(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle availability change
  const handleAvailabilityChange = (field: string, value: string | boolean) => {
    setAvailability(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle working days toggle
  const toggleWorkingDay = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [day]: !prev.workingDays[day as keyof typeof prev.workingDays],
      },
    }));
  };

  // Validate form
  const validateForm = () => {
    if (!pricing.dailyRate.trim()) {
      Alert.alert('Error', 'Please enter daily rate');
      return false;
    }
    if (!pricing.securityDeposit.trim()) {
      Alert.alert('Error', 'Please enter security deposit amount');
      return false;
    }
    return true;
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const completeVehicleData = {
        ...vehicleData,
        pricing,
        availability,
        status: 'pending', // Will be reviewed by admin
        createdAt: new Date().toISOString(),
      };

      // TODO: Save to API
      // await vehicleService.createVehicle(completeVehicleData);

      Alert.alert(
        'Vehicle Added Successfully!',
        'Your vehicle has been added to the fleet and is pending approval. You will be notified once it\'s approved.',
        [
          {
            text: 'Done',
            onPress: () => {
              // Navigate back to fleet screen
              navigation.navigate('MyFleetScreen');
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error adding vehicle:', error);
      Alert.alert('Error', 'Failed to add vehicle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render pricing category
  const renderPricingCategory = (category: any) => (
    <View key={category.title} style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{category.title}</Text>
      <View style={styles.fieldsContainer}>
        {category.fields.map((field: any) => (
          <View key={field.key} style={styles.inputGroup}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              value={pricing[field.key as keyof typeof pricing]}
              onChangeText={(value) => handlePricingChange(field.key, value)}
              placeholder={field.placeholder}
              keyboardType="numeric"
            />
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pricing & Availability</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
          <Text style={styles.progressText}>Step 4 of 4</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Set Pricing & Availability</Text>
          <Text style={styles.subtitle}>
            Configure your vehicle's pricing structure and availability preferences
          </Text>

          {/* Pricing Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pricing Structure</Text>
            {pricingCategories.map(renderPricingCategory)}
          </View>

          {/* Availability Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Availability Settings</Text>

            <View style={styles.availabilityCard}>
              <View style={styles.availabilityItem}>
                <Text style={styles.availabilityLabel}>Vehicle Available</Text>
                <Switch
                  value={availability.isAvailable}
                  onValueChange={(value) => handleAvailabilityChange('isAvailable', value)}
                  trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                  thumbColor="#FFFFFF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Advance Booking (Days)</Text>
                <View style={styles.selectorContainer}>
                  {['1', '3', '7', '15', '30'].map((days) => (
                    <TouchableOpacity
                      key={days}
                      style={[
                        styles.selectorOption,
                        availability.advanceBookingDays === days && styles.selectorOptionSelected,
                      ]}
                      onPress={() => handleAvailabilityChange('advanceBookingDays', days)}
                    >
                      <Text style={[
                        styles.selectorText,
                        availability.advanceBookingDays === days && styles.selectorTextSelected,
                      ]}>
                        {days} days
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Minimum Rental Duration</Text>
                <View style={styles.selectorContainer}>
                  {['1', '4', '8', '12', '24'].map((hours) => (
                    <TouchableOpacity
                      key={hours}
                      style={[
                        styles.selectorOption,
                        availability.minimumRentalHours === hours && styles.selectorOptionSelected,
                      ]}
                      onPress={() => handleAvailabilityChange('minimumRentalHours', hours)}
                    >
                      <Text style={[
                        styles.selectorText,
                        availability.minimumRentalHours === hours && styles.selectorTextSelected,
                      ]}>
                        {hours} hours
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Maximum Rental Duration</Text>
                <View style={styles.selectorContainer}>
                  {['7', '15', '30', '60', '90'].map((days) => (
                    <TouchableOpacity
                      key={days}
                      style={[
                        styles.selectorOption,
                        availability.maximumRentalDays === days && styles.selectorOptionSelected,
                      ]}
                      onPress={() => handleAvailabilityChange('maximumRentalDays', days)}
                    >
                      <Text style={[
                        styles.selectorText,
                        availability.maximumRentalDays === days && styles.selectorTextSelected,
                      ]}>
                        {days} days
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Working Hours Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Working Hours</Text>

            <View style={styles.workingHoursCard}>
              <View style={styles.timeRow}>
                <View style={styles.timeInputGroup}>
                  <Text style={styles.label}>Pickup Time</Text>
                  <TouchableOpacity style={styles.timeInput}>
                    <Text style={styles.timeText}>{availability.pickupTime}</Text>
                    <Ionicons name="time-outline" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
                <View style={styles.timeInputGroup}>
                  <Text style={styles.label}>Drop-off Time</Text>
                  <TouchableOpacity style={styles.timeInput}>
                    <Text style={styles.timeText}>{availability.dropoffTime}</Text>
                    <Ionicons name="time-outline" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.label}>Working Days</Text>
              <View style={styles.workingDaysContainer}>
                {Object.entries(availability.workingDays).map(([day, isWorking]) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.workingDayOption,
                      isWorking && styles.workingDayOptionSelected,
                    ]}
                    onPress={() => toggleWorkingDay(day)}
                  >
                    <Text style={[
                      styles.workingDayText,
                      isWorking && styles.workingDayTextSelected,
                    ]}>
                      {day.charAt(0).toUpperCase() + day.slice(1).substring(0, 3)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Pricing Options Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pricing Options</Text>

            <View style={styles.optionsCard}>
              <View style={styles.optionItem}>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionLabel}>Location-based Pricing</Text>
                  <Text style={styles.optionDescription}>Different rates for different areas</Text>
                </View>
                <Switch
                  value={availability.locationBasedPricing}
                  onValueChange={(value) => handleAvailabilityChange('locationBasedPricing', value)}
                  trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                  thumbColor="#FFFFFF"
                />
              </View>

              <View style={styles.optionItem}>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionLabel}>Surge Pricing</Text>
                  <Text style={styles.optionDescription}>Higher rates during peak demand</Text>
                </View>
                <Switch
                  value={availability.surgePricing}
                  onValueChange={(value) => handleAvailabilityChange('surgePricing', value)}
                  trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                  thumbColor="#FFFFFF"
                />
              </View>

              <View style={styles.optionItem}>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionLabel}>Weekend Pricing</Text>
                  <Text style={styles.optionDescription}>Special rates for weekends</Text>
                </View>
                <Switch
                  value={availability.weekendPricing}
                  onValueChange={(value) => handleAvailabilityChange('weekendPricing', value)}
                  trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Adding Vehicle...' : 'Add Vehicle to Fleet'}
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
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
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
  categoryContainer: {
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
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  fieldsContainer: {
    gap: 16,
  },
  inputGroup: {
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
  availabilityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  availabilityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 16,
  },
  availabilityLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  selectorContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  selectorOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  selectorOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  selectorText: {
    fontSize: 14,
    color: '#666',
  },
  selectorTextSelected: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  workingHoursCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timeRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  timeInputGroup: {
    flex: 1,
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
  workingDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  workingDayOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  workingDayOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  workingDayText: {
    fontSize: 14,
    color: '#666',
  },
  workingDayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  optionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionInfo: {
    flex: 1,
    marginRight: 16,
  },
  optionLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
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
