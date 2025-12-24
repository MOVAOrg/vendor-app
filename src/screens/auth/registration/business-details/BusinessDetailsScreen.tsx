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

// Business Types Data
const BUSINESS_TYPES = [
  'Individual',
  'Partnership',
  'Private Limited',
  'Public Limited',
  'LLP',
  'Sole Proprietorship',
];

// Indian States and Cities Data
const STATES_CITIES: { [key: string]: string[] } = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kannur', 'Kollam'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner'],
  'Delhi': ['New Delhi', 'Central Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Allahabad'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Hisar', 'Karnal'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga'],
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
            {options.map((option: string) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.dropdownItem,
                  selectedValue === option && styles.dropdownItemSelected
                ]}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
              >
                <Text style={[
                  styles.dropdownItemText,
                  selectedValue === option && styles.dropdownItemTextSelected
                ]}>
                  {option}
                </Text>
                {selectedValue === option && (
                  <Ionicons name="checkmark" size={20} color={COLORS.white} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default function BusinessDetailsScreen({ navigation }: any) {
  // Form state management
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    registrationNumber: '',
    gstNumber: '', // Optional field
    panNumber: '',
    businessState: '',
    businessCity: '',
    businessAddress: '',
    businessPincode: '',
    yearsInBusiness: '',
    fleetSize: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Dropdown state management
  const [showBusinessTypeDropdown, setShowBusinessTypeDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle state selection - reset city when state changes
  const handleStateSelect = (state: string) => {
    setFormData(prev => ({
      ...prev,
      businessState: state,
      businessCity: '', // Reset city when state changes
    }));
  };

  // Auto-detect location by pincode
  const handlePincodeChange = async (pincode: string) => {
    handleInputChange('businessPincode', pincode);

    // Auto-detect location when pincode is 6 digits
    if (pincode.length === 6) {
      try {
        // Simulate API call to fetch location by pincode
        // In production, use actual pincode API
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock location detection - replace with actual API
        Alert.alert(
          'Location Detected',
          `Pincode ${pincode} detected. Please verify the state and city.`
        );
      } catch (error) {
        console.error('Pincode detection failed:', error);
      }
    }
  };

  // Get cities for selected state
  const getCitiesForState = () => {
    if (!formData.businessState) return [];
    return STATES_CITIES[formData.businessState] || [];
  };

  // Form submission handler
  const handleSubmit = async () => {
    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate to next screen
      navigation.navigate('LocationDetailsScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to save business details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Back button handler
  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  // Form validation - Relaxed for demo purposes
  // Only require business name to continue (for testing)
  const isFormValid = () => {
    return formData.businessName.trim().length > 0;
  };

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
            <Text style={styles.title}>Business Details</Text>
            <Text style={styles.subtitle}>Tell us about your business</Text>
          </View>

          {/* Business Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Information</Text>

            {/* Business Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your business name"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.businessName}
                onChangeText={(value) => handleInputChange('businessName', value)}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            {/* Business Type Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Type</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowBusinessTypeDropdown(true);
                }}
              >
                <Text style={[
                  styles.dropdownButtonText,
                  !formData.businessType && styles.placeholderText
                ]}>
                  {formData.businessType || 'Select business type'}
                </Text>
                <Ionicons name="chevron-down" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Registration Number Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Registration Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter registration number"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.registrationNumber}
                onChangeText={(value) => handleInputChange('registrationNumber', value)}
                autoCapitalize="characters"
                returnKeyType="next"
              />
            </View>

            {/* GST Number Input - Optional */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>GST Number</Text>
                <Text style={styles.optionalTag}>Optional</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter GST number (optional)"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.gstNumber}
                onChangeText={(value) => handleInputChange('gstNumber', value)}
                autoCapitalize="characters"
                returnKeyType="next"
              />
            </View>

            {/* PAN Number Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>PAN Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter PAN number"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.panNumber}
                onChangeText={(value) => handleInputChange('panNumber', value)}
                autoCapitalize="characters"
                maxLength={10}
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Business Address Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Address</Text>

            {/* State Dropdown - First */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>State</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowStateDropdown(true);
                }}
              >
                <Text style={[
                  styles.dropdownButtonText,
                  !formData.businessState && styles.placeholderText
                ]}>
                  {formData.businessState || 'Select state'}
                </Text>
                <Ionicons name="chevron-down" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* City Dropdown - Based on State */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>City</Text>
              <TouchableOpacity
                style={[
                  styles.dropdownButton,
                  !formData.businessState && styles.dropdownButtonDisabled
                ]}
                onPress={() => {
                  if (formData.businessState) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setShowCityDropdown(true);
                  } else {
                    Alert.alert('Select State', 'Please select a state first');
                  }
                }}
                disabled={!formData.businessState}
              >
                <Text style={[
                  styles.dropdownButtonText,
                  !formData.businessCity && styles.placeholderText,
                  !formData.businessState && styles.disabledText
                ]}>
                  {formData.businessCity || 'Select city'}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={formData.businessState ? COLORS.textSecondary : COLORS.gray}
                />
              </TouchableOpacity>
            </View>

            {/* Pincode Input - Auto-detect */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pincode</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter pincode"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.businessPincode}
                onChangeText={handlePincodeChange}
                keyboardType="numeric"
                maxLength={6}
                returnKeyType="next"
              />
            </View>

            {/* Address Input - After State/City/Pincode */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter business address"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.businessAddress}
                onChangeText={(value) => handleInputChange('businessAddress', value)}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Business Experience Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Experience</Text>

            {/* Years and Fleet Size Row */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Years in Business</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Years"
                  placeholderTextColor={COLORS.textSecondary}
                  value={formData.yearsInBusiness}
                  onChangeText={(value) => handleInputChange('yearsInBusiness', value)}
                  keyboardType="numeric"
                  returnKeyType="next"
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Current Fleet Size</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Vehicles"
                  placeholderTextColor={COLORS.textSecondary}
                  value={formData.fleetSize}
                  onChangeText={(value) => handleInputChange('fleetSize', value)}
                  keyboardType="numeric"
                  returnKeyType="done"
                />
              </View>
            </View>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
              <Text style={styles.infoText}>
                We'll verify your business documents before approval
              </Text>
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

      {/* Business Type Dropdown Modal */}
      <CustomDropdown
        visible={showBusinessTypeDropdown}
        onClose={() => setShowBusinessTypeDropdown(false)}
        onSelect={(value: string) => {
          handleInputChange('businessType', value);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        options={BUSINESS_TYPES}
        selectedValue={formData.businessType}
        title="Select Business Type"
      />

      {/* State Dropdown Modal */}
      <CustomDropdown
        visible={showStateDropdown}
        onClose={() => setShowStateDropdown(false)}
        onSelect={(value: string) => {
          handleStateSelect(value);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        options={Object.keys(STATES_CITIES)}
        selectedValue={formData.businessState}
        title="Select State"
      />

      {/* City Dropdown Modal */}
      <CustomDropdown
        visible={showCityDropdown}
        onClose={() => setShowCityDropdown(false)}
        onSelect={(value: string) => {
          handleInputChange('businessCity', value);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        options={getCitiesForState()}
        selectedValue={formData.businessCity}
        title={`Select City in ${formData.businessState}`}
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
    height: 100,
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
  },
  dropdownButtonDisabled: {
    backgroundColor: COLORS.lightGray,
    opacity: 0.6,
  },
  dropdownButtonText: {
    fontSize: 15,
    color: COLORS.primary,
  },
  placeholderText: {
    color: COLORS.textSecondary,
  },
  disabledText: {
    color: COLORS.gray,
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
