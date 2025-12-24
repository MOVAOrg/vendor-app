import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
    ActivityIndicator,
    Animated,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

interface LoadingScreenProps {
  message?: string;
  showLogo?: boolean;
}

export default function LoadingScreen({
  message = 'Loading...',
  showLogo = true
}: LoadingScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade and scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Continuous pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[BrandColors.backgroundPrimary, BrandColors.gray50]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Logo or Icon */}
          {showLogo && (
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  opacity: fadeAnim,
                  transform: [
                    { scale: scaleAnim },
                    { scale: pulseAnim },
                  ],
                },
              ]}
            >
              <View style={styles.logoBackground}>
                <Ionicons name="car-sport" size={60} color={BrandColors.primary} />
              </View>
            </Animated.View>
          )}

          {/* Spinner */}
          <Animated.View
            style={[
              styles.spinnerContainer,
              {
                opacity: fadeAnim,
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <View style={styles.spinner}>
              <View style={[styles.spinnerDot, styles.spinnerDot1]} />
              <View style={[styles.spinnerDot, styles.spinnerDot2]} />
              <View style={[styles.spinnerDot, styles.spinnerDot3]} />
            </View>
          </Animated.View>

          {/* Loading Message */}
          <Animated.View
            style={[
              styles.messageContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Text style={styles.message}>{message}</Text>
          </Animated.View>

          {/* Activity Indicator */}
          <Animated.View
            style={[
              styles.indicatorContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <ActivityIndicator size="large" color={BrandColors.primary} />
          </Animated.View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.backgroundPrimary,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },

  // Logo
  logoContainer: {
    marginBottom: Spacing.xl,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.accent + '20',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: BrandColors.accent,
  },

  // Spinner
  spinnerContainer: {
    marginBottom: Spacing.xl,
  },
  spinner: {
    width: 80,
    height: 80,
    position: 'relative',
  },
  spinnerDot: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: BorderRadius.full,
  },
  spinnerDot1: {
    backgroundColor: BrandColors.primary,
    top: 0,
    left: 32,
  },
  spinnerDot2: {
    backgroundColor: BrandColors.accent,
    top: 32,
    right: 0,
  },
  spinnerDot3: {
    backgroundColor: BrandColors.dot,
    bottom: 0,
    left: 32,
  },

  // Message
  messageContainer: {
    marginBottom: Spacing.lg,
  },
  message: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    textAlign: 'center',
  },

  // Indicator
  indicatorContainer: {
    marginTop: Spacing.md,
  },
});
