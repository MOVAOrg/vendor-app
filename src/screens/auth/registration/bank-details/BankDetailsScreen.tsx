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
 * Bank Details Screen - Collect vendor banking information
 * Final step in registration process for payment setup
 */
export default function BankDetailsScreen({ navigation }: any) {
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    accountType: 'savings', // savings, current
    upiId: '',
    gstNumber: '',
    panNumber: '',
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setBankDetails(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle account type selection
  const handleAccountTypeChange = (type: string) => {
    setBankDetails(prev => ({
      ...prev,
      accountType: type,
    }));
  };

  // Validate form
  const validateForm = () => {
    if (!bankDetails.accountHolderName.trim()) {
      Alert.alert('Error', 'Please enter account holder name');
      return false;
    }
    if (!bankDetails.accountNumber.trim()) {
      Alert.alert('Error', 'Please enter account number');
      return false;
    }
    if (!bankDetails.ifscCode.trim()) {
      Alert.alert('Error', 'Please enter IFSC code');
      return false;
    }
    if (!bankDetails.bankName.trim()) {
      Alert.alert('Error', 'Please enter bank name');
      return false;
    }
    if (!bankDetails.panNumber.trim()) {
      Alert.alert('Error', 'Please enter PAN number');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Implement actual API call to save bank details
      // await vendorService.updateBankDetails(bankDetails);

      Alert.alert(
        'Success',
        'Bank details saved successfully! Your account is now ready.',
        [
          {
            text: 'Continue',
            onPress: () => {
              // Navigate to verification pending screen
              navigation.replace('VerificationPendingScreen');
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error saving bank details:', error);
      Alert.alert('Error', 'Failed to save bank details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bank Details</Text>
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
          <Text style={styles.title}>Banking Information</Text>
          <Text style={styles.subtitle}>
            Provide your bank details for payments and withdrawals
          </Text>

          {/* Account Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Account Holder Name *</Text>
              <TextInput
                style={styles.input}
                value={bankDetails.accountHolderName}
                onChangeText={(value) => handleInputChange('accountHolderName', value)}
                placeholder="Enter account holder name"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Account Number *</Text>
              <TextInput
                style={styles.input}
                value={bankDetails.accountNumber}
                onChangeText={(value) => handleInputChange('accountNumber', value)}
                placeholder="Enter account number"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>IFSC Code *</Text>
              <TextInput
                style={styles.input}
                value={bankDetails.ifscCode}
                onChangeText={(value) => handleInputChange('ifscCode', value.toUpperCase())}
                placeholder="Enter IFSC code"
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bank Name *</Text>
              <TextInput
                style={styles.input}
                value={bankDetails.bankName}
                onChangeText={(value) => handleInputChange('bankName', value)}
                placeholder="Enter bank name"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Branch Name</Text>
              <TextInput
                style={styles.input}
                value={bankDetails.branchName}
                onChangeText={(value) => handleInputChange('branchName', value)}
                placeholder="Enter branch name"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Account Type *</Text>
              <View style={styles.accountTypeContainer}>
                {['savings', 'current'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.accountTypeOption,
                      bankDetails.accountType === type && styles.accountTypeOptionSelected,
                    ]}
                    onPress={() => handleAccountTypeChange(type)}
                  >
                    <Text
                      style={[
                        styles.accountTypeText,
                        bankDetails.accountType === type && styles.accountTypeTextSelected,
                      ]}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Additional Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>UPI ID (Optional)</Text>
              <TextInput
                style={styles.input}
                value={bankDetails.upiId}
                onChangeText={(value) => handleInputChange('upiId', value)}
                placeholder="Enter UPI ID"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>GST Number (Optional)</Text>
              <TextInput
                style={styles.input}
                value={bankDetails.gstNumber}
                onChangeText={(value) => handleInputChange('gstNumber', value.toUpperCase())}
                placeholder="Enter GST number"
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>PAN Number *</Text>
              <TextInput
                style={styles.input}
                value={bankDetails.panNumber}
                onChangeText={(value) => handleInputChange('panNumber', value.toUpperCase())}
                placeholder="Enter PAN number"
                autoCapitalize="characters"
                maxLength={10}
              />
            </View>
          </View>

          {/* Security Notice */}
          <View style={styles.noticeContainer}>
            <Ionicons name="shield-checkmark" size={20} color="#34C759" />
            <Text style={styles.noticeText}>
              Your banking information is encrypted and securely stored. We never share your financial details.
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Saving...' : 'Complete Registration'}
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
  accountTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  accountTypeOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  accountTypeOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  accountTypeText: {
    fontSize: 16,
    color: '#666',
  },
  accountTypeTextSelected: {
    color: '#007AFF',
    fontWeight: '500',
  },
  noticeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#34C759',
    marginBottom: 24,
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    color: '#34C759',
    marginLeft: 12,
    lineHeight: 20,
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
