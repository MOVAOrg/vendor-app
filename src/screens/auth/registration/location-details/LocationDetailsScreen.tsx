import { ThemedView } from '../../components/themed-view';
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
 * Location Details Screen - Set service area and location preferences
 * Part of vendor registration process for defining service boundaries
 */
export default function LocationDetailsScreen({ navigation }: any) {
  const [locationDetails, setLocationDetails] = useState({
    serviceCity: '',
    serviceState: '',
    servicePincode: '',
    serviceArea: '', // Local area within city
    pickupLocation: '',
    dropoffLocation: '',
    homeLocation: '',
    serviceRadius: '25', // km
    multipleCities: false,
    preferredTimeSlot: 'any', // morning, afternoon, evening, any
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
  });

  const [loading, setLoading] = useState(false);

  // Indian states list
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Chandigarh', 'Puducherry', 'Ladakh'
  ];

  // Handle input changes
  const handleInputChange = (field: string, value: string | boolean) => {
    setLocationDetails(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle working days toggle
  const toggleWorkingDay = (day: string) => {
    setLocationDetails(prev => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [day]: !prev.workingDays[day as keyof typeof prev.workingDays],
      },
    }));
  };

  // Validate form
  const validateForm = () => {
    if (!locationDetails.serviceCity.trim()) {
      Alert.alert('Error', 'Please select your service city');
      return false;
    }
    if (!locationDetails.serviceState.trim()) {
      Alert.alert('Error', 'Please select your service state');
      return false;
    }
    if (!locationDetails.servicePincode.trim()) {
      Alert.alert('Error', 'Please enter your service pincode');
      return false;
    }
    if (!locationDetails.pickupLocation.trim()) {
      Alert.alert('Error', 'Please enter your primary pickup location');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Implement actual API call to save location details
      // await vendorService.updateLocationDetails(locationDetails);

      Alert.alert(
        'Location Details Saved',
        'Your service area has been configured successfully.',
        [
          {
            text: 'Continue',
            onPress: () => {
              // Navigate to document upload screen
              navigation.navigate('DocumentUploadScreen');
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error saving location details:', error);
      Alert.alert('Error', 'Failed to save location details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show state selection
  const showStateSelection = () => {
    Alert.alert(
      'Select State',
      'Choose your service state',
      [
        ...indianStates.map(state => ({
          text: state,
          onPress: () => handleInputChange('serviceState', state),
        })),
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Show time slot selection
  const showTimeSlotSelection = () => {
    Alert.alert(
      'Preferred Time Slot',
      'When do you prefer to provide service?',
      [
        { text: 'Morning (6 AM - 12 PM)', onPress: () => handleInputChange('preferredTimeSlot', 'morning') },
        { text: 'Afternoon (12 PM - 6 PM)', onPress: () => handleInputChange('preferredTimeSlot', 'afternoon') },
        { text: 'Evening (6 PM - 12 AM)', onPress: () => handleInputChange('preferredTimeSlot', 'evening') },
        { text: 'Any Time', onPress: () => handleInputChange('preferredTimeSlot', 'any') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Location Details</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
          <Text style={styles.progressText}>Step 2 of 4</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Service Location</Text>
          <Text style={styles.subtitle}>
            Define your service area and location preferences for better customer matching
          </Text>

          {/* Service Area Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Service Area</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Service City *</Text>
              <TextInput
                style={styles.input}
                value={locationDetails.serviceCity}
                onChangeText={(value) => handleInputChange('serviceCity', value)}
                placeholder="Enter your service city"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Service State *</Text>
              <TouchableOpacity style={styles.dropdownInput} onPress={showStateSelection}>
                <Text style={[
                  styles.dropdownText,
                  !locationDetails.serviceState && styles.placeholderText
                ]}>
                  {locationDetails.serviceState || 'Select state'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Service Pincode *</Text>
              <TextInput
                style={styles.input}
                value={locationDetails.servicePincode}
                onChangeText={(value) => handleInputChange('servicePincode', value)}
                placeholder="Enter pincode"
                keyboardType="numeric"
                maxLength={6}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Local Service Area</Text>
              <TextInput
                style={styles.input}
                value={locationDetails.serviceArea}
                onChangeText={(value) => handleInputChange('serviceArea', value)}
                placeholder="e.g., Koramangala, Whitefield, etc."
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Service Radius (km)</Text>
              <View style={styles.radiusContainer}>
                {['10', '25', '50', '100'].map((radius) => (
                  <TouchableOpacity
                    key={radius}
                    style={[
                      styles.radiusOption,
                      locationDetails.serviceRadius === radius && styles.radiusOptionSelected,
                    ]}
                    onPress={() => handleInputChange('serviceRadius', radius)}
                  >
                    <Text style={[
                      styles.radiusText,
                      locationDetails.serviceRadius === radius && styles.radiusTextSelected,
                    ]}>
                      {radius} km
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Location Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Primary Pickup Location *</Text>
              <TextInput
                style={styles.input}
                value={locationDetails.pickupLocation}
                onChangeText={(value) => handleInputChange('pickupLocation', value)}
                placeholder="Enter primary pickup location"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Drop-off Location</Text>
              <TextInput
                style={styles.input}
                value={locationDetails.dropoffLocation}
                onChangeText={(value) => handleInputChange('dropoffLocation', value)}
                placeholder="Enter drop-off location"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Home/Base Location</Text>
              <TextInput
                style={styles.input}
                value={locationDetails.homeLocation}
                onChangeText={(value) => handleInputChange('homeLocation', value)}
                placeholder="Enter your home/base location"
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Working Preferences Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Working Preferences</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Time Slot</Text>
              <TouchableOpacity style={styles.dropdownInput} onPress={showTimeSlotSelection}>
                <Text style={styles.dropdownText}>
                  {locationDetails.preferredTimeSlot === 'morning' ? 'Morning (6 AM - 12 PM)' :
                   locationDetails.preferredTimeSlot === 'afternoon' ? 'Afternoon (12 PM - 6 PM)' :
                   locationDetails.preferredTimeSlot === 'evening' ? 'Evening (6 PM - 12 AM)' :
                   'Any Time'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Working Days</Text>
              <View style={styles.workingDaysContainer}>
                {Object.entries(locationDetails.workingDays).map(([day, isWorking]) => (
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

            <View style={styles.inputGroup}>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    locationDetails.multipleCities && styles.checkboxSelected,
                  ]}
                  onPress={() => handleInputChange('multipleCities', !locationDetails.multipleCities)}
                >
                  {locationDetails.multipleCities && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>
                  I provide service in multiple cities
                </Text>
              </View>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[styles.continueButton, loading && styles.continueButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.continueButtonText}>
              {loading ? 'Saving...' : 'Continue'}
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
  dropdownInput: {
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
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    color: '#999',
  },
  radiusContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  radiusOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  radiusOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  radiusText: {
    fontSize: 14,
    color: '#666',
  },
  radiusTextSelected: {
    color: '#007AFF',
    fontWeight: '500',
  },
  workingDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  continueButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 40,
  },
});
