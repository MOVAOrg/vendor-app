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

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

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

  const handleSendResetLink = async () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsEmailSent(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleResendEmail = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsEmailSent(false);
    setEmail('');
  };

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
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              {isEmailSent ? 'Check your email for reset instructions' : 'Enter your email to reset your password'}
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
            colors={isEmailSent ? [BrandColors.accent, BrandColors.accentLight] : [BrandColors.warning, BrandColors.accent]}
            style={styles.illustrationGradient}
          >
            <Ionicons
              name={isEmailSent ? 'mail' : 'lock-closed'}
              size={80}
              color={BrandColors.secondary}
            />
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
          {!isEmailSent ? (
            <Card variant="elevated" size="lg" style={styles.formCard}>
              <Text style={styles.sectionTitle}>Reset Password</Text>

              <Input
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                leftIcon="mail"
                keyboardType="email-address"
                containerStyle={styles.input}
              />

              <Card variant="outlined" size="md" style={styles.infoCard}>
                <View style={styles.infoContent}>
                  <Ionicons name="information-circle" size={24} color={BrandColors.dot} />
                  <View style={styles.infoText}>
                    <Text style={styles.infoTitle}>Password Reset</Text>
                    <Text style={styles.infoSubtitle}>
                      We'll send you a secure link to reset your password
                    </Text>
                  </View>
                </View>
              </Card>
            </Card>
          ) : (
            <Card variant="elevated" size="lg" style={styles.formCard}>
              <View style={styles.successContainer}>
                <View style={styles.successIcon}>
                  <Ionicons name="checkmark-circle" size={48} color={BrandColors.accent} />
                </View>

                <Text style={styles.successTitle}>Email Sent!</Text>
                <Text style={styles.successSubtitle}>
                  We've sent a password reset link to{'\n'}
                  <Text style={styles.emailText}>{email}</Text>
                </Text>

                <Card variant="outlined" size="md" style={styles.instructionsCard}>
                  <View style={styles.instructionsContent}>
                    <Text style={styles.instructionsTitle}>Next Steps:</Text>
                    <Text style={styles.instructionsText}>
                      • Check your email inbox{'\n'}
                      • Click the reset link{'\n'}
                      • Create a new password{'\n'}
                      • Login with your new password
                    </Text>
                  </View>
                </Card>
              </View>
            </Card>
          )}
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {!isEmailSent ? (
            <Button
              title="Send Reset Link"
              onPress={handleSendResetLink}
              variant="primary"
              size="lg"
              loading={isLoading}
              disabled={!email || !email.includes('@')}
              icon="mail"
              iconPosition="right"
              style={styles.sendButton}
            />
          ) : (
            <View style={styles.buttonRow}>
              <Button
                title="Resend Email"
                onPress={handleResendEmail}
                variant="outline"
                size="lg"
                icon="refresh"
                iconPosition="left"
                style={styles.resendButton}
              />

              <Button
                title="Back to Login"
                onPress={handleBack}
                variant="primary"
                size="lg"
                icon="arrow-back"
                iconPosition="left"
                style={styles.loginButton}
              />
            </View>
          )}
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

  // Success State
  successContainer: {
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: Spacing.lg,
  },
  successTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  successSubtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 22,
  },
  emailText: {
    fontFamily: Typography.fontFamily.primary,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.primary,
  },

  // Info Card
  infoCard: {
    marginTop: Spacing.md,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  infoTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  infoSubtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },

  // Instructions Card
  instructionsCard: {
    marginTop: Spacing.md,
    width: '100%',
  },
  instructionsContent: {
    paddingLeft: Spacing.sm,
  },
  instructionsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.sm,
  },
  instructionsText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    lineHeight: 20,
  },

  // Buttons
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  sendButton: {
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resendButton: {
    flex: 1,
    marginRight: Spacing.md,
  },
  loginButton: {
    flex: 1,
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
