import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../../components/ui/Button';
import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

interface OfflineScreenProps {
  onRetry?: () => void;
  showRetry?: boolean;
}

export default function OfflineScreen({
  onRetry,
  showRetry = true
}: OfflineScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial animations
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

    // Continuous wave animation for offline icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleRetry = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onRetry) {
      onRetry();
    }
  };

  const waveTranslate = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Offline Icon */}
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
            <Animated.View
              style={{
                transform: [{ translateY: waveTranslate }],
              }}
            >
              <Ionicons name="cloud-offline" size={80} color={BrandColors.error} />
            </Animated.View>
          </View>
        </Animated.View>

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
          <Text style={styles.title}>No Internet Connection</Text>
          <Text style={styles.message}>
            Please check your internet connection and try again.
          </Text>
        </Animated.View>

        {/* Connection Status */}
        <Animated.View
          style={[
            styles.statusContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.statusItem}>
            <Ionicons name="wifi" size={24} color={BrandColors.error} />
            <Text style={styles.statusText}>Offline</Text>
          </View>
        </Animated.View>

        {/* Retry Button */}
        {showRetry && (
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
              title="Retry Connection"
              onPress={handleRetry}
              variant="primary"
              size="lg"
              icon="refresh"
              iconPosition="left"
              style={styles.retryButton}
            />
          </Animated.View>
        )}

        {/* Tips */}
        <Animated.View
          style={[
            styles.tipsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.tipsTitle}>Quick Tips:</Text>

          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color={BrandColors.accent} />
              <Text style={styles.tipText}>Check if WiFi or mobile data is enabled</Text>
            </View>

            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color={BrandColors.accent} />
              <Text style={styles.tipText}>Try turning on Airplane mode and then off</Text>
            </View>

            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color={BrandColors.accent} />
              <Text style={styles.tipText}>Restart your device if the problem persists</Text>
            </View>
          </View>
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
    marginBottom: Spacing.xl,
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

  // Status
  statusContainer: {
    marginBottom: Spacing.xl,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.error + '10',
    borderWidth: 1,
    borderColor: BrandColors.error + '30',
  },
  statusText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.error,
    marginLeft: Spacing.md,
  },

  // Button
  buttonContainer: {
    width: '100%',
    marginBottom: Spacing.xl,
  },
  retryButton: {
    width: '100%',
  },

  // Tips
  tipsContainer: {
    width: '100%',
    backgroundColor: BrandColors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  tipsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  tipsList: {
    gap: Spacing.md,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  tipText: {
    flex: 1,
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginLeft: Spacing.sm,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
  },
});
