import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import {
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
  success: '#10B981',
};

// Verification steps
const VERIFICATION_STEPS = [
  { id: 1, title: 'Personal Details', description: 'Verifying your personal information' },
  { id: 2, title: 'Business Details', description: 'Validating business information' },
  { id: 3, title: 'Bank Details', description: 'Confirming bank account details' },
  { id: 4, title: 'Documents', description: 'Reviewing uploaded documents' },
  { id: 5, title: 'Final Check', description: 'Completing verification process' },
];

// Total verification time in seconds
const TOTAL_VERIFICATION_TIME = 8;

export default function VerificationPendingScreen({ navigation }: any) {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_VERIFICATION_TIME);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Start verification process
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Timer for countdown
    const countdownInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Step progression (each step takes 1.6 seconds)
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < VERIFICATION_STEPS.length - 1) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          return prev + 1;
        }
        return prev;
      });
    }, TOTAL_VERIFICATION_TIME * 200); // 1.6 seconds per step

    // Complete verification after timer
    const completionTimeout = setTimeout(() => {
      setIsVerifying(false);
      setIsComplete(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Navigate to main app after 1.5 seconds
      setTimeout(() => {
        // Reset navigation to authenticated state
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
          })
        );
      }, 1500);
    }, TOTAL_VERIFICATION_TIME * 1000);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(stepInterval);
      clearTimeout(completionTimeout);
    };
  }, [navigation]);

  // Calculate progress percentage
  const progressPercentage = ((TOTAL_VERIFICATION_TIME - timeRemaining) / TOTAL_VERIFICATION_TIME) * 100;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Icon */}
        <View style={styles.iconContainer}>
          <View style={[
            styles.iconCircle,
            isComplete && styles.iconCircleComplete
          ]}>
            {isComplete ? (
              <Ionicons name="checkmark" size={60} color={COLORS.white} />
            ) : (
              <Ionicons name="shield-checkmark-outline" size={60} color={COLORS.white} />
            )}
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {isComplete ? 'Verification Complete!' : 'Verifying Your Details'}
          </Text>
          <Text style={styles.subtitle}>
            {isComplete
              ? 'All checks passed successfully. Redirecting to dashboard...'
              : 'Please wait while we verify all your information'
            }
          </Text>
        </View>

        {/* Timer Display */}
        {isVerifying && (
          <View style={styles.timerContainer}>
            <View style={styles.timerBox}>
              <Text style={styles.timerValue}>{timeRemaining}s</Text>
              <Text style={styles.timerLabel}>Remaining</Text>
            </View>
          </View>
        )}

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Verification Progress</Text>
            <Text style={styles.progressPercentage}>
              {Math.round(progressPercentage)}%
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${progressPercentage}%` }
              ]}
            />
          </View>
        </View>

        {/* Verification Steps */}
        <View style={styles.stepsSection}>
          <Text style={styles.sectionTitle}>Verification Steps</Text>

          {VERIFICATION_STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <View key={step.id} style={styles.stepItem}>
                <View style={styles.stepLeft}>
                  <View style={[
                    styles.stepIcon,
                    isCompleted && styles.stepIconCompleted,
                    isCurrent && styles.stepIconCurrent,
                    isPending && styles.stepIconPending,
                  ]}>
                    {isCompleted ? (
                      <Ionicons name="checkmark" size={16} color={COLORS.white} />
                    ) : (
                      <Text style={[
                        styles.stepNumber,
                        isCurrent && styles.stepNumberCurrent,
                        isPending && styles.stepNumberPending,
                      ]}>
                        {step.id}
                      </Text>
                    )}
                  </View>

                  {/* Connector Line */}
                  {index < VERIFICATION_STEPS.length - 1 && (
                    <View style={[
                      styles.stepConnector,
                      isCompleted && styles.stepConnectorCompleted,
                    ]} />
                  )}
                </View>

                <View style={styles.stepContent}>
                  <Text style={[
                    styles.stepTitle,
                    isCurrent && styles.stepTitleCurrent,
                  ]}>
                    {step.title}
                  </Text>
                  <Text style={styles.stepDescription}>
                    {step.description}
                  </Text>
                </View>

                {/* Status Badge */}
                {isCompleted && (
                  <View style={styles.statusBadge}>
                    <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                  </View>
                )}
                {isCurrent && (
                  <View style={styles.loadingDots}>
                    <View style={[styles.dot, styles.dotAnimated]} />
                    <View style={[styles.dot, styles.dotAnimated]} />
                    <View style={[styles.dot, styles.dotAnimated]} />
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>
            We're securely verifying your information. This process typically takes a few seconds.
          </Text>
        </View>

        {/* Manual Navigation (Emergency) */}
        {!isComplete && (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'MainTabs' }],
                })
              );
            }}
          >
            <Text style={styles.skipButtonText}>Skip Verification</Text>
          </TouchableOpacity>
        )}

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

  // Icon Container
  iconContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  iconCircleComplete: {
    backgroundColor: COLORS.success,
    shadowColor: COLORS.success,
  },

  // Title Styles
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },

  // Timer Container
  timerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timerBox: {
    backgroundColor: COLORS.lightGray,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  timerValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  timerLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Progress Section
  progressSection: {
    marginBottom: 32,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: COLORS.gray,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 6,
  },

  // Steps Section
  stepsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  stepLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray,
  },
  stepIconCompleted: {
    backgroundColor: COLORS.success,
  },
  stepIconCurrent: {
    backgroundColor: COLORS.primary,
  },
  stepIconPending: {
    backgroundColor: COLORS.gray,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },
  stepNumberCurrent: {
    color: COLORS.white,
  },
  stepNumberPending: {
    color: COLORS.textSecondary,
  },
  stepConnector: {
    width: 2,
    height: 24,
    backgroundColor: COLORS.gray,
    marginTop: 4,
  },
  stepConnectorCompleted: {
    backgroundColor: COLORS.success,
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  stepTitleCurrent: {
    color: COLORS.primary,
  },
  stepDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },

  // Status Badge
  statusBadge: {
    marginLeft: 8,
    paddingTop: 4,
  },

  // Loading Dots
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 8,
    paddingTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  dotAnimated: {
    opacity: 0.5,
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

  // Skip Button
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipButtonText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textDecorationLine: 'underline',
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 40,
  },
});
