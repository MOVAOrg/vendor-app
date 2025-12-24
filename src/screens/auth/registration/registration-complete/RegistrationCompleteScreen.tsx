import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
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

export default function RegistrationCompleteScreen({ navigation }: any) {
  // Simple checkmark animation
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const checkmarkRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Success haptic feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Simple checkmark animation
    Animated.sequence([
      Animated.spring(checkmarkScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(checkmarkRotate, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('VerificationPendingScreen');
  };

  const rotate = checkmarkRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Checkmark Animation */}
        <View style={styles.animationContainer}>
          <Animated.View
            style={[
              styles.checkmarkCircle,
              {
                transform: [
                  { scale: checkmarkScale },
                  { rotate: rotate },
                ],
              },
            ]}
          >
            <Ionicons name="checkmark" size={80} color={COLORS.white} />
          </Animated.View>
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Registration Complete!</Text>
          <Text style={styles.subtitle}>
            Welcome to Mova! Your vendor account has been successfully created.
          </Text>
        </View>

        {/* Status Items */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionTitle}>Registration Summary</Text>

          {/* Account Created */}
          <View style={styles.statusItem}>
            <View style={styles.statusIconContainer}>
              <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.statusContent}>
              <Text style={styles.statusTitle}>Account Created</Text>
              <Text style={styles.statusSubtitle}>
                Your vendor account has been successfully created
              </Text>
            </View>
          </View>

          {/* Documents Submitted */}
          <View style={styles.statusItem}>
            <View style={styles.statusIconContainer}>
              <Ionicons name="document-text-outline" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.statusContent}>
              <Text style={styles.statusTitle}>Documents Submitted</Text>
              <Text style={styles.statusSubtitle}>
                All required documents have been uploaded
              </Text>
            </View>
          </View>

          {/* Verification Pending */}
          <View style={styles.statusItem}>
            <View style={styles.statusIconContainer}>
              <Ionicons name="time-outline" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.statusContent}>
              <Text style={styles.statusTitle}>Verification Pending</Text>
              <Text style={styles.statusSubtitle}>
                We'll review your documents within 24-48 hours
              </Text>
            </View>
          </View>

          {/* Notifications Enabled */}
          <View style={styles.statusItem}>
            <View style={styles.statusIconContainer}>
              <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.statusContent}>
              <Text style={styles.statusTitle}>Notifications Enabled</Text>
              <Text style={styles.statusSubtitle}>
                You'll receive updates on your verification status
              </Text>
            </View>
          </View>
        </View>

        {/* Next Steps */}
        <View style={styles.nextStepsSection}>
          <Text style={styles.sectionTitle}>What's Next?</Text>

          <View style={styles.nextStepsBox}>
            {/* Step 1 */}
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Document Verification</Text>
                <Text style={styles.stepDescription}>
                  Our team will review your documents within 24-48 hours
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.stepDivider} />

            {/* Step 2 */}
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Account Activation</Text>
                <Text style={styles.stepDescription}>
                  You'll receive a notification once your account is activated
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.stepDivider} />

            {/* Step 3 */}
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Start Your Business</Text>
                <Text style={styles.stepDescription}>
                  Add your vehicles and start accepting bookings
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>
            You can explore the app while we verify your documents. Some features will be available after verification is complete.
          </Text>
        </View>

        {/* Get Started Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },

  // Animation Container
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  checkmarkCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  // Title Styles
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },

  // Status Section
  statusSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  statusIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  // Next Steps Section
  nextStepsSection: {
    marginBottom: 24,
  },
  nextStepsBox: {
    backgroundColor: COLORS.lightGray,
    padding: 20,
    borderRadius: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  stepContent: {
    flex: 1,
    paddingTop: 2,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  stepDivider: {
    height: 16,
    width: 2,
    backgroundColor: COLORS.gray,
    marginLeft: 15,
    marginVertical: 8,
  },

  // Info Box
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
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
    marginBottom: 24,
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 12,
    gap: 8,
  },
  getStartedButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 40,
  },
});
