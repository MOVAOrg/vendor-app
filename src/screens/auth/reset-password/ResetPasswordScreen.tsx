import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { BorderRadius, BrandColors, Shadows, Spacing, Typography } from '../../../constants/brandTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ResetPasswordScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    };
  };

  const handleResetPassword = async () => {
    const passwordValidation = validatePassword(formData.newPassword);

    if (!passwordValidation.isValid) {
      Alert.alert('Error', 'Password does not meet the requirements');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Success',
        'Your password has been reset successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('LoginScreen'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const passwordValidation = validatePassword(formData.newPassword);
  const passwordsMatch = formData.newPassword === formData.confirmPassword && formData.confirmPassword !== '';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={BrandColors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Create a new secure password
            </Text>
          </View>
        </Animated.View>

        {/* Illustration */}
        <Animated.View
          style={[
            styles.illustrationContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={[BrandColors.primary, BrandColors.primaryDark]}
            style={styles.illustrationGradient}
          >
            <Ionicons name="shield-checkmark" size={80} color={BrandColors.secondary} />
          </LinearGradient>
          <View style={styles.dot1} />
          <View style={styles.dot2} />
          <View style={styles.dot3} />
        </Animated.View>

        {/* Form Content */}
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          <Card variant="elevated" size="lg" style={styles.formCard}>
            <Text style={styles.sectionTitle}>New Password</Text>

            <Input
              label="New Password"
              value={formData.newPassword}
              onChangeText={(value) => handleInputChange('newPassword', value)}
              placeholder="Enter new password"
              leftIcon="lock-closed"
              rightIcon={showPassword ? 'eye-off' : 'eye'}
              onRightIconPress={() => setShowPassword(!showPassword)}
              secureTextEntry={!showPassword}
              containerStyle={styles.input}
            />

            <Input
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              placeholder="Confirm new password"
              leftIcon="lock-closed"
              rightIcon={showConfirmPassword ? 'eye-off' : 'eye'}
              onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
              secureTextEntry={!showConfirmPassword}
              containerStyle={styles.input}
            />

            {/* Password Requirements */}
            <Card variant="outlined" size="md" style={styles.requirementsCard}>
              <Text style={styles.requirementsTitle}>Password Requirements:</Text>

              <View style={styles.requirementItem}>
                <Ionicons
                  name={passwordValidation.minLength ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={passwordValidation.minLength ? BrandColors.accent : BrandColors.textLight}
                />
                <Text style={[
                  styles.requirementText,
                  passwordValidation.minLength && styles.requirementTextValid,
                ]}>
                  At least 8 characters
                </Text>
              </View>

              <View style={styles.requirementItem}>
                <Ionicons
                  name={passwordValidation.hasUpperCase ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={passwordValidation.hasUpperCase ? BrandColors.accent : BrandColors.textLight}
                />
                <Text style={[
                  styles.requirementText,
                  passwordValidation.hasUpperCase && styles.requirementTextValid,
                ]}>
                  One uppercase letter
                </Text>
              </View>

              <View style={styles.requirementItem}>
                <Ionicons
                  name={passwordValidation.hasLowerCase ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={passwordValidation.hasLowerCase ? BrandColors.accent : BrandColors.textLight}
                />
                <Text style={[
                  styles.requirementText,
                  passwordValidation.hasLowerCase && styles.requirementTextValid,
                ]}>
                  One lowercase letter
                </Text>
              </View>

              <View style={styles.requirementItem}>
                <Ionicons
                  name={passwordValidation.hasNumbers ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={passwordValidation.hasNumbers ? BrandColors.accent : BrandColors.textLight}
                />
                <Text style={[
                  styles.requirementText,
                  passwordValidation.hasNumbers && styles.requirementTextValid,
                ]}>
                  One number
                </Text>
              </View>

              <View style={styles.requirementItem}>
                <Ionicons
                  name={passwordValidation.hasSpecialChar ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={passwordValidation.hasSpecialChar ? BrandColors.accent : BrandColors.textLight}
                />
                <Text style={[
                  styles.requirementText,
                  passwordValidation.hasSpecialChar && styles.requirementTextValid,
                ]}>
                  One special character
                </Text>
              </View>
            </Card>

            {/* Password Match Indicator */}
            {formData.confirmPassword !== '' && (
              <Card variant="outlined" size="md" style={styles.matchCard}>
                <View style={styles.matchContent}>
                  <Ionicons
                    name={passwordsMatch ? 'checkmark-circle' : 'close-circle'}
                    size={20}
                    color={passwordsMatch ? BrandColors.accent : BrandColors.error}
                  />
                  <Text style={[
                    styles.matchText,
                    passwordsMatch && styles.matchTextValid,
                  ]}>
                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                  </Text>
                </View>
              </Card>
            )}
          </Card>
        </Animated.View>

        {/* Action Button */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Button
            title="Reset Password"
            onPress={handleResetPassword}
            variant="primary"
            size="lg"
            loading={isLoading}
            disabled={!passwordValidation.isValid || !passwordsMatch}
            icon="shield-checkmark"
            iconPosition="right"
            style={styles.resetButton}
          />
        </Animated.View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.backgroundPrimary,
  },
  scrollView: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },

  // Illustration
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    position: 'relative',
  },
  illustrationGradient: {
    width: 160,
    height: 160,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.lg,
  },
  dot1: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.dot,
    opacity: 0.8,
  },
  dot2: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.accent,
    opacity: 0.6,
  },
  dot3: {
    position: 'absolute',
    top: 60,
    left: 10,
    width: 6,
    height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.primary,
    opacity: 0.4,
  },

  // Content
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  formCard: {
    width: '100%',
  },
  sectionTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  input: {
    marginBottom: Spacing.md,
  },

  // Requirements
  requirementsCard: {
    marginTop: Spacing.md,
  },
  requirementsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  requirementText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textLight,
    marginLeft: Spacing.sm,
  },
  requirementTextValid: {
    color: BrandColors.accent,
  },

  // Match Indicator
  matchCard: {
    marginTop: Spacing.md,
  },
  matchContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.error,
    marginLeft: Spacing.sm,
  },
  matchTextValid: {
    color: BrandColors.accent,
  },

  // Button
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  resetButton: {
    width: '100%',
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
