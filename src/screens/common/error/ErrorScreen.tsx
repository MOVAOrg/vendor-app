import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../../components/ui/Button';
import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

interface ErrorScreenProps {
  title?: string;
  message?: string;
  errorCode?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
  showRetry?: boolean;
  showGoBack?: boolean;
}

export default function ErrorScreen({
  title = 'Something went wrong',
  message = 'We encountered an unexpected error. Please try again.',
  errorCode,
  onRetry,
  onGoBack,
  showRetry = true,
  showGoBack = true
}: ErrorScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRetry = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onRetry) {
      onRetry();
    }
  };

  const handleGoBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onGoBack) {
      onGoBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Error Icon */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim },
              ],
            },
          ]}
        >
          <View style={styles.iconBackground}>
            <Ionicons name="warning" size={80} color={BrandColors.error} />
          </View>
        </Animated.View>

        {/* Error Code */}
        {errorCode && (
          <Animated.View
            style={[
              styles.errorCodeContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.errorCode}>{errorCode}</Text>
          </Animated.View>
        )}

        {/* Title and Message */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
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
          {showRetry && (
            <Button
              title="Try Again"
              onPress={handleRetry}
              variant="primary"
              size="lg"
              icon="refresh"
              iconPosition="left"
              style={styles.retryButton}
            />
          )}

          {showGoBack && (
            <Button
              title="Go Back"
              onPress={handleGoBack}
              variant="outline"
              size="lg"
              icon="arrow-back"
              iconPosition="left"
              style={styles.goBackButton}
            />
          )}
        </Animated.View>

        {/* Help Text */}
        <Animated.View
          style={[
            styles.helpContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.helpText}>
            If the problem persists, please contact our support team.
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.backgroundPrimary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },

  // Icon
  iconContainer: {
    marginBottom: Spacing.lg,
  },
  iconBackground: {
    width: 160,
    height: 160,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.error + '10',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: BrandColors.error + '30',
  },

  // Error Code
  errorCodeContainer: {
    marginBottom: Spacing.lg,
  },
  errorCode: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.error,
    backgroundColor: BrandColors.error + '10',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: BrandColors.error + '30',
  },

  // Text
  textContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  message: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },

  // Buttons
  buttonContainer: {
    width: '100%',
    marginBottom: Spacing.xl,
  },
  retryButton: {
    width: '100%',
    marginBottom: Spacing.md,
  },
  goBackButton: {
    width: '100%',
  },

  // Help
  helpContainer: {
    alignItems: 'center',
  },
  helpText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textLight,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
  },
});
