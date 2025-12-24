import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define color constants
const COLORS = {
  primary: '#00242C',
  white: '#FFFFFF',
  gray: '#E5E5E5',
  lightGray: '#F5F5F5',
  textSecondary: '#666666',
};

// Languages Data
const LANGUAGES = [
  'English',
  'Hindi',
  'Tamil',
  'Telugu',
  'Kannada',
  'Malayalam',
  'Marathi',
  'Bengali',
  'Gujarati',
  'Punjabi',
];

// Generate time slots (24-hour format)
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayTime = formatTime(timeString);
      slots.push({ value: timeString, display: displayTime });
    }
  }
  return slots;
};

// Format time to 12-hour format with AM/PM
const formatTime = (time24: string) => {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Custom Dropdown Component
const CustomDropdown = ({ visible, onClose, onSelect, options, selectedValue, title }: any) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.dropdownContainer}>
          {/* Dropdown Header */}
          <View style={styles.dropdownHeader}>
            <Text style={styles.dropdownTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Dropdown Options */}
          <ScrollView
            style={styles.dropdownScroll}
            showsVerticalScrollIndicator={false}
          >
            {options.map((option: any) => {
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionDisplay = typeof option === 'string' ? option : option.display;

              return (
                <TouchableOpacity
                  key={optionValue}
                  style={[
                    styles.dropdownItem,
                    selectedValue === optionValue && styles.dropdownItemSelected
                  ]}
                  onPress={() => {
                    onSelect(optionValue);
                    onClose();
                  }}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    selectedValue === optionValue && styles.dropdownItemTextSelected
                  ]}>
                    {optionDisplay}
                  </Text>
                  {selectedValue === optionValue && (
                    <Ionicons name="checkmark" size={20} color={COLORS.white} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default function LocationDetailsScreen({ navigation }: any) {
  // Form state management
  const [formData, setFormData] = useState({
    primaryServiceArea: '',
    secondaryServiceAreas: '',
    primaryPickupLocation: '',
    primaryDropoffLocation: '',
    additionalLocations: '',
    startTime: '09:00',
    endTime: '18:00',
    emergencyContact: '',
    preferredLanguage: 'English',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Dropdown state management
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showStartTimeDropdown, setShowStartTimeDropdown] = useState(false);
  const [showEndTimeDropdown, setShowEndTimeDropdown] = useState(false);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Get current location
  const handleGetCurrentLocation = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Location Access', 'Would you like to enable location access?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Enable',
        onPress: () => {
          // Simulate location detection
          Alert.alert('Success', 'Current location detected successfully!');
        }
      },
    ]);
  };

  // Form submission handler
  const handleSubmit = async () => {
    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate to next screen
      navigation.navigate('BankDetailsScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to save location details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Back button handler
  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  // Form validation - Relaxed for demo
  const isFormValid = () => {
    return formData.primaryServiceArea.trim().length > 0;
  };

  // Time slots
  const timeSlots = generateTimeSlots();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header with back button */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Title Section */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Location Details</Text>
            <Text style={styles.subtitle}>Set up your service areas and locations</Text>
          </View>

          {/* Service Areas Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Service Areas</Text>

            {/* Primary Service Area Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Primary Service Area</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Bangalore City"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.primaryServiceArea}
                onChangeText={(value) => handleInputChange('primaryServiceArea', value)}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            {/* Secondary Service Areas Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Secondary Service Areas</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter additional service areas (optional)"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.secondaryServiceAreas}
                onChangeText={(value) => handleInputChange('secondaryServiceAreas', value)}
                multiline
                numberOfLines={2}
                textAlignVertical="top"
                returnKeyType="next"
              />
            </View>

            {/* Current Location Button */}
            <TouchableOpacity
              style={styles.locationButton}
              onPress={handleGetCurrentLocation}
            >
              <Ionicons name="locate" size={20} color={COLORS.white} />
              <Text style={styles.locationButtonText}>Use Current Location</Text>
            </TouchableOpacity>
          </View>

          {/* Pickup & Dropoff Locations Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pickup & Dropoff Locations</Text>

            {/* Primary Pickup Location */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Primary Pickup Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter primary pickup location"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.primaryPickupLocation}
                onChangeText={(value) => handleInputChange('primaryPickupLocation', value)}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            {/* Primary Dropoff Location */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Primary Dropoff Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter primary dropoff location"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.primaryDropoffLocation}
                onChangeText={(value) => handleInputChange('primaryDropoffLocation', value)}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            {/* Additional Locations */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Additional Locations</Text>
                <Text style={styles.optionalTag}>Optional</Text>
              </View>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter additional pickup/dropoff locations"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.additionalLocations}
                onChangeText={(value) => handleInputChange('additionalLocations', value)}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Operating Hours Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Operating Hours</Text>

            {/* Time Row */}
            <View style={styles.row}>
              {/* Start Time */}
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Start Time</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setShowStartTimeDropdown(true);
                  }}
                >
                  <Ionicons name="time-outline" size={20} color={COLORS.textSecondary} />
                  <Text style={styles.dropdownButtonText}>
                    {formatTime(formData.startTime)}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color={COLORS.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* End Time */}
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>End Time</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setShowEndTimeDropdown(true);
                  }}
                >
                  <Ionicons name="time-outline" size={20} color={COLORS.textSecondary} />
                  <Text style={styles.dropdownButtonText}>
                    {formatTime(formData.endTime)}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color={COLORS.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
              <Text style={styles.infoText}>
                You can modify your operating hours anytime from settings
              </Text>
            </View>
          </View>

          {/* Contact Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>

            {/* Emergency Contact */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Emergency Contact Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter emergency contact number"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.emergencyContact}
                onChangeText={(value) => handleInputChange('emergencyContact', value)}
                keyboardType="phone-pad"
                maxLength={10}
                returnKeyType="next"
              />
            </View>

            {/* Preferred Language Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Language</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowLanguageDropdown(true);
                }}
              >
                <Ionicons name="language-outline" size={20} color={COLORS.textSecondary} />
                <Text style={styles.dropdownButtonText}>
                  {formData.preferredLanguage}
                </Text>
                <Ionicons name="chevron-down" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                (!isFormValid() || isLoading) && styles.continueButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={!isFormValid() || isLoading}
            >
              <Text style={styles.continueButtonText}>
                {isLoading ? 'Saving...' : 'Continue'}
              </Text>
              {!isLoading && (
                <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
              )}
            </TouchableOpacity>
          </View>

          {/* Bottom Spacing for keyboard */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Language Dropdown Modal */}
      <CustomDropdown
        visible={showLanguageDropdown}
        onClose={() => setShowLanguageDropdown(false)}
        onSelect={(value: string) => {
          handleInputChange('preferredLanguage', value);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        options={LANGUAGES}
        selectedValue={formData.preferredLanguage}
        title="Select Language"
      />

      {/* Start Time Dropdown Modal */}
      <CustomDropdown
        visible={showStartTimeDropdown}
        onClose={() => setShowStartTimeDropdown(false)}
        onSelect={(value: string) => {
          handleInputChange('startTime', value);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        options={timeSlots}
        selectedValue={formData.startTime}
        title="Select Start Time"
      />

      {/* End Time Dropdown Modal */}
      <CustomDropdown
        visible={showEndTimeDropdown}
        onClose={() => setShowEndTimeDropdown(false)}
        onSelect={(value: string) => {
          handleInputChange('endTime', value);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        options={timeSlots}
        selectedValue={formData.endTime}
        title="Select End Time"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },

  // Header Styles
  header: {
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Title Styles
  titleContainer: {
    marginTop: 8,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },

  // Section Styles
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 16,
  },

  // Input Group Styles
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  optionalTag: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  input: {
    height: 56,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    paddingHorizontal: 16,
    fontSize: 15,
    color: COLORS.primary,
  },
  textArea: {
    height: 80,
    paddingTop: 16,
    paddingBottom: 16,
  },

  // Dropdown Button Styles
  dropdownButton: {
    height: 56,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  dropdownButtonText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.primary,
  },

  // Location Button Styles
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  locationButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
  },

  // Row Layout Styles
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },

  // Info Box Styles
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.primary,
    lineHeight: 20,
  },

  // Button Styles
  buttonContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 12,
    gap: 8,
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.gray,
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 40,
  },

  // Modal & Dropdown Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  dropdownContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
  },
  dropdownScroll: {
    maxHeight: 400,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  dropdownItemSelected: {
    backgroundColor: COLORS.primary,
  },
  dropdownItemText: {
    fontSize: 15,
    color: COLORS.primary,
  },
  dropdownItemTextSelected: {
    color: COLORS.white,
    fontWeight: '600',
  },
});
