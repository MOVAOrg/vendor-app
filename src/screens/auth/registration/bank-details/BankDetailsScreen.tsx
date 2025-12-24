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
  success: '#10B981',
  warning: '#F59E0B',
};

// Account Types Data
const ACCOUNT_TYPES = ['Savings', 'Current'];

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

export default function BankDetailsScreen({ navigation }: any) {
  // Form state management
  const [formData, setFormData] = useState({
    accountHolderName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    accountType: 'Savings',
    upiId: '',
    panNumber: '',
    aadharNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Dropdown state management
  const [showAccountTypeDropdown, setShowAccountTypeDropdown] = useState(false);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Auto-detect bank name from IFSC code
  const handleIFSCChange = (ifsc: string) => {
    const upperIFSC = ifsc.toUpperCase();
    handleInputChange('ifscCode', upperIFSC);

    // Auto-detect bank name when IFSC is 4+ characters
    if (upperIFSC.length >= 4) {
      const bankCode = upperIFSC.substring(0, 4);
      // In production, use actual IFSC API
      // This is a mock implementation
      const bankNames: { [key: string]: string } = {
        'SBIN': 'State Bank of India',
        'HDFC': 'HDFC Bank',
        'ICIC': 'ICICI Bank',
        'AXIS': 'Axis Bank',
        'PUNB': 'Punjab National Bank',
        'KKBK': 'Kotak Mahindra Bank',
        'IDIB': 'Indian Bank',
        'BARB': 'Bank of Baroda',
        'CNRB': 'Canara Bank',
        'UTIB': 'Axis Bank',
      };

      if (bankNames[bankCode]) {
        handleInputChange('bankName', bankNames[bankCode]);
      }
    }
  };

  // Verify account
  const handleVerifyAccount = () => {
    if (!formData.accountNumber || !formData.ifscCode) {
      Alert.alert('Required', 'Please enter account number and IFSC code');
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsVerified(true);
    Alert.alert('Verification', 'Bank account verification initiated. You will receive confirmation shortly.');
  };

  // Form submission handler
  const handleSubmit = async () => {
    // Validate account number confirmation
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      Alert.alert('Error', 'Account numbers do not match');
      return;
    }

    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate to next screen
      navigation.navigate('DocumentUploadScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to save bank details. Please try again.');
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
    return formData.accountHolderName.trim().length > 0;
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
            <Text style={styles.title}>Bank Details</Text>
            <Text style={styles.subtitle}>Add your bank account for payments</Text>
          </View>

          {/* Bank Account Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bank Account Information</Text>

            {/* Account Holder Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Account Holder Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter account holder name"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.accountHolderName}
                onChangeText={(value) => handleInputChange('accountHolderName', value)}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            {/* Account Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Account Number</Text>
              <TextInput
                style={[styles.input, styles.numberInput]}
                placeholder="Enter account number"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.accountNumber}
                onChangeText={(value) => handleInputChange('accountNumber', value)}
                keyboardType="number-pad"
                maxLength={18}
                returnKeyType="next"
                autoComplete="off"
              />
            </View>

            {/* Confirm Account Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Account Number</Text>
              <TextInput
                style={[styles.input, styles.numberInput]}
                placeholder="Re-enter account number"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.confirmAccountNumber}
                onChangeText={(value) => handleInputChange('confirmAccountNumber', value)}
                keyboardType="number-pad"
                maxLength={18}
                returnKeyType="next"
                autoComplete="off"
              />
            </View>

            {/* IFSC Code and Account Type Row */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>IFSC Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="IFSC Code"
                  placeholderTextColor={COLORS.textSecondary}
                  value={formData.ifscCode}
                  onChangeText={handleIFSCChange}
                  autoCapitalize="characters"
                  maxLength={11}
                  returnKeyType="next"
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Account Type</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setShowAccountTypeDropdown(true);
                  }}
                >
                  <Text style={styles.dropdownButtonText}>
                    {formData.accountType}
                  </Text>
                  <Ionicons name="chevron-down" size={18} color={COLORS.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Bank Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bank Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter bank name"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.bankName}
                onChangeText={(value) => handleInputChange('bankName', value)}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            {/* Branch Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Branch Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter branch name"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.branchName}
                onChangeText={(value) => handleInputChange('branchName', value)}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            {/* Verification Status */}
            <View style={styles.verificationContainer}>
              <View style={styles.verificationStatus}>
                <Ionicons
                  name={isVerified ? 'checkmark-circle' : 'time-outline'}
                  size={20}
                  color={isVerified ? COLORS.success : COLORS.warning}
                />
                <Text style={[
                  styles.verificationText,
                  isVerified && styles.verificationTextVerified
                ]}>
                  {isVerified ? 'Verification Initiated' : 'Pending Verification'}
                </Text>
              </View>

              {!isVerified && (
                <TouchableOpacity
                  style={styles.verifyButton}
                  onPress={handleVerifyAccount}
                >
                  <Ionicons name="shield-checkmark-outline" size={18} color={COLORS.white} />
                  <Text style={styles.verifyButtonText}>Verify Account</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* UPI Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>UPI Information</Text>

            {/* UPI ID */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>UPI ID</Text>
                <Text style={styles.optionalTag}>Optional</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="yourname@upi"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.upiId}
                onChangeText={(value) => handleInputChange('upiId', value.toLowerCase())}
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
              <Text style={styles.infoText}>
                UPI ID enables instant payments and faster transactions
              </Text>
            </View>
          </View>

          {/* KYC Documents Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>KYC Documents</Text>

            {/* PAN Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>PAN Number</Text>
              <TextInput
                style={[styles.input, styles.numberInput]}
                placeholder="Enter PAN number"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.panNumber}
                onChangeText={(value) => handleInputChange('panNumber', value.toUpperCase())}
                autoCapitalize="characters"
                maxLength={10}
                returnKeyType="next"
              />
              <Text style={styles.helperText}>Format: ABCDE1234F</Text>
            </View>

            {/* Aadhar Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Aadhar Number</Text>
              <TextInput
                style={[styles.input, styles.numberInput]}
                placeholder="Enter Aadhar number"
                placeholderTextColor={COLORS.textSecondary}
                value={formData.aadharNumber}
                onChangeText={(value) => handleInputChange('aadharNumber', value)}
                keyboardType="number-pad"
                maxLength={12}
                returnKeyType="done"
              />
              <Text style={styles.helperText}>12-digit Aadhar number</Text>
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

      {/* Account Type Dropdown Modal */}
      <CustomDropdown
        visible={showAccountTypeDropdown}
        onClose={() => setShowAccountTypeDropdown(false)}
        onSelect={(value: string) => {
          handleInputChange('accountType', value);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        options={ACCOUNT_TYPES}
        selectedValue={formData.accountType}
        title="Select Account Type"
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
  numberInput: {
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 6,
    marginLeft: 4,
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
  dropdownButtonText: {
    fontSize: 15,
    color: COLORS.primary,
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

  // Verification Styles
  verificationContainer: {
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  verificationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  verificationText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.warning,
  },
  verificationTextVerified: {
    color: COLORS.success,
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    height: 44,
    borderRadius: 10,
    gap: 8,
  },
  verifyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
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
    maxHeight: '40%',
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
    maxHeight: 200,
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
