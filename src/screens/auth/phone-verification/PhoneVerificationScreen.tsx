import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

export default function PhoneVerificationScreen({ navigation }: any) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Validate phone number
    const phoneRegex = /^[6-9]\d{9}$/;
    setIsValid(phoneRegex.test(phoneNumber) && phoneNumber.length === 10);
  }, [phoneNumber]);

  const handleContinue = async () => {
    if (!isValid) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to OTP verification
      navigation.navigate('OTPVerificationScreen', {
        phoneNumber: `${countryCode}${phoneNumber}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
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
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={BrandColors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Enter Phone Number</Text>
            <Text style={styles.subtitle}>
              We'll send you a verification code
            </Text>
          </View>

          {/* Phone Input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Phone Number</Text>

            <View style={styles.phoneInputRow}>
              <View style={styles.countryCodeBox}>
                <Text style={styles.countryCodeText}>{countryCode}</Text>
              </View>

              <TextInput
                style={styles.phoneInput}
                placeholder="9876543210"
                placeholderTextColor={BrandColors.textLight}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleContinue}
              />
            </View>

            <Text style={styles.helperText}>
              Enter your 10-digit mobile number
            </Text>
          </View>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                (!isValid || isLoading) && styles.continueButtonDisabled
              ]}
              onPress={handleContinue}
              disabled={!isValid || isLoading}
            >
              <Text style={styles.continueButtonText}>
                {isLoading ? 'Sending...' : 'Continue'}
              </Text>
              {!isLoading && (
                <Ionicons name="arrow-forward" size={20} color={BrandColors.secondary} />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.backgroundPrimary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
  },

  // Header
  header: {
    paddingVertical: Spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Title
  titleContainer: {
    marginTop: Spacing['2xl'],
    marginBottom: Spacing['3xl'],
  },
  title: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },

  // Input Section
  inputSection: {
    marginBottom: Spacing['3xl'],
  },
  label: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  countryCodeBox: {
    height: 56,
    paddingHorizontal: Spacing.lg,
    backgroundColor: BrandColors.gray50,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: BrandColors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  countryCodeText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
  },
  phoneInput: {
    flex: 1,
    height: 56,
    backgroundColor: BrandColors.backgroundPrimary,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: BrandColors.borderLight,
    paddingHorizontal: Spacing.lg,
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.textPrimary,
  },
  helperText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginTop: Spacing.sm,
  },

  // Button Container
  buttonContainer: {
    marginTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },

  // Continue Button
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BrandColors.primary,
    height: 56,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.xl,
  },
  continueButtonDisabled: {
    backgroundColor: BrandColors.gray300,
    opacity: 0.6,
  },
  continueButtonText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.secondary,
    marginRight: Spacing.sm,
  },
});
