import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Business Details Screen Component
 * Collects vendor's business information during registration
 * Second step in the registration process
 */
export default function BusinessDetailsScreen({ navigation, route }: any) {
  const { personalDetails } = route.params;

  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    tradeLicenseNumber: '',
    businessEmail: '',
    businessPhone: '',
    yearsInBusiness: '',
    numberOfVehicles: '',
    businessDescription: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const businessTypes = [
    { value: 'individual', label: 'Individual' },
    { value: 'company', label: 'Company' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'llc', label: 'LLC' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.businessType.trim()) {
      newErrors.businessType = 'Business type is required';
    }

    if (!formData.tradeLicenseNumber.trim()) {
      newErrors.tradeLicenseNumber = 'Trade license number is required';
    }

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please enter a valid email';
    }

    if (!formData.businessPhone.trim()) {
      newErrors.businessPhone = 'Business phone is required';
    }

    if (!formData.yearsInBusiness.trim()) {
      newErrors.yearsInBusiness = 'Years in business is required';
    }

    if (!formData.numberOfVehicles.trim()) {
      newErrors.numberOfVehicles = 'Number of vehicles is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleContinue = () => {
    if (validateForm()) {
      const registrationData = {
        ...personalDetails,
        ...formData,
      };
      navigation.navigate('LocationDetailsScreen', { registrationData });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Business Details</Text>
            <Text style={styles.subtitle}>Tell us about your business</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Business Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Name *</Text>
              <TextInput
                style={[styles.input, errors.businessName && styles.inputError]}
                value={formData.businessName}
                onChangeText={(value) => handleInputChange('businessName', value)}
                placeholder="Enter business name"
                autoCapitalize="words"
              />
              {errors.businessName && <Text style={styles.errorText}>{errors.businessName}</Text>}
            </View>

            {/* Business Type */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Type *</Text>
              <View style={styles.businessTypeContainer}>
                {businessTypes.map((type) => (
                  <TouchableOpacity
                    key={type.value}
                    style={[
                      styles.businessTypeOption,
                      formData.businessType === type.value && styles.businessTypeOptionSelected,
                    ]}
                    onPress={() => handleInputChange('businessType', type.value)}
                  >
                    <Text
                      style={[
                        styles.businessTypeOptionText,
                        formData.businessType === type.value && styles.businessTypeOptionTextSelected,
                      ]}
                    >
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.businessType && <Text style={styles.errorText}>{errors.businessType}</Text>}
            </View>

            {/* Trade License */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Trade License Number *</Text>
              <TextInput
                style={[styles.input, errors.tradeLicenseNumber && styles.inputError]}
                value={formData.tradeLicenseNumber}
                onChangeText={(value) => handleInputChange('tradeLicenseNumber', value)}
                placeholder="Enter trade license number"
                autoCapitalize="characters"
              />
              {errors.tradeLicenseNumber && <Text style={styles.errorText}>{errors.tradeLicenseNumber}</Text>}
            </View>

            {/* Business Contact */}
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>Business Email *</Text>
                <TextInput
                  style={[styles.input, errors.businessEmail && styles.inputError]}
                  value={formData.businessEmail}
                  onChangeText={(value) => handleInputChange('businessEmail', value)}
                  placeholder="business@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.businessEmail && <Text style={styles.errorText}>{errors.businessEmail}</Text>}
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.label}>Business Phone *</Text>
                <TextInput
                  style={[styles.input, errors.businessPhone && styles.inputError]}
                  value={formData.businessPhone}
                  onChangeText={(value) => handleInputChange('businessPhone', value)}
                  placeholder="+971 50 123 4567"
                  keyboardType="phone-pad"
                />
                {errors.businessPhone && <Text style={styles.errorText}>{errors.businessPhone}</Text>}
              </View>
            </View>

            {/* Business Experience */}
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>Years in Business *</Text>
                <TextInput
                  style={[styles.input, errors.yearsInBusiness && styles.inputError]}
                  value={formData.yearsInBusiness}
                  onChangeText={(value) => handleInputChange('yearsInBusiness', value)}
                  placeholder="e.g., 5"
                  keyboardType="numeric"
                />
                {errors.yearsInBusiness && <Text style={styles.errorText}>{errors.yearsInBusiness}</Text>}
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.label}>Number of Vehicles *</Text>
                <TextInput
                  style={[styles.input, errors.numberOfVehicles && styles.inputError]}
                  value={formData.numberOfVehicles}
                  onChangeText={(value) => handleInputChange('numberOfVehicles', value)}
                  placeholder="e.g., 10"
                  keyboardType="numeric"
                />
                {errors.numberOfVehicles && <Text style={styles.errorText}>{errors.numberOfVehicles}</Text>}
              </View>
            </View>

            {/* Business Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.businessDescription}
                onChangeText={(value) => handleInputChange('businessDescription', value)}
                placeholder="Describe your car rental business..."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
    fontFamily: 'Montserrat-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'OpenSans-Regular',
  },
  formContainer: {
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfWidth: {
    width: '48%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    fontFamily: 'OpenSans-SemiBold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
    fontFamily: 'OpenSans-Regular',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'OpenSans-Regular',
  },
  textArea: {
    height: 100,
  },
  businessTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  businessTypeOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F8F9FA',
    minWidth: '45%',
    alignItems: 'center',
  },
  businessTypeOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  businessTypeOptionText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'OpenSans-Regular',
  },
  businessTypeOptionTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F8F9FA',
  },
  backButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
});
