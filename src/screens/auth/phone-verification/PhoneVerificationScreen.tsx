import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Phone Verification Screen Component
 * Allows users to enter their phone number for registration/login
 * Validates phone number format and sends OTP
 */
export default function PhoneVerificationScreen({ navigation }: any) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+971');
  const [isLoading, setIsLoading] = useState(false);

  const validatePhoneNumber = (phone: string) => {
    // Basic phone number validation (UAE format)
    const phoneRegex = /^[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/\s/g, '')}`;

      // TODO: Implement actual OTP sending
      // await AuthService.sendOTP(fullPhoneNumber);

      // For now, simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('OTPVerificationScreen', {
          phoneNumber: fullPhoneNumber,
          isRegistration: true
        });
      }, 2000);

    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
      console.error('Send OTP error:', error);
    }
  };

  const handleLogin = () => {
    navigation.navigate('OTPVerificationScreen', {
      phoneNumber: `${countryCode}${phoneNumber.replace(/\s/g, '')}`,
      isRegistration: false
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Enter Your Phone Number</Text>
            <Text style={styles.subtitle}>
              We'll send you a verification code to confirm your number
            </Text>
          </View>

          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <View style={styles.phoneInputRow}>
              <View style={styles.countryCodeContainer}>
                <TextInput
                  style={styles.countryCodeInput}
                  value={countryCode}
                  onChangeText={setCountryCode}
                  keyboardType="phone-pad"
                  maxLength={4}
                />
              </View>

              <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="50 123 4567"
                keyboardType="phone-pad"
                maxLength={12}
              />
            </View>

            <Text style={styles.inputLabel}>
              Enter your phone number without the country code
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.sendOTPButton, isLoading && styles.disabledButton]}
              onPress={handleSendOTP}
              disabled={isLoading}
            >
              <Text style={styles.sendOTPButtonText}>
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'OpenSans-Regular',
  },
  inputContainer: {
    marginBottom: 40,
  },
  phoneInputRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  countryCodeContainer: {
    marginRight: 12,
  },
  countryCodeInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
    width: 80,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
    fontFamily: 'OpenSans-Regular',
  },
  inputLabel: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'OpenSans-Regular',
  },
  buttonContainer: {
    marginBottom: 40,
  },
  sendOTPButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  sendOTPButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
  loginButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
  },
  termsContainer: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: 'OpenSans-Regular',
  },
});
