import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    View,
} from 'react-native';

/**
 * Loading Screen - Reusable component for loading states
 * Displays animated loading indicators with customizable messages
 */
interface LoadingScreenProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'skeleton' | 'progress';
  message?: string;
  subMessage?: string;
  progress?: number; // 0-100 for progress type
  showLogo?: boolean;
  logoText?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export default function LoadingScreen({
  type = 'spinner',
  message = 'Loading...',
  subMessage,
  progress = 0,
  showLogo = false,
  logoText = 'MOVA',
  size = 'medium',
  color = '#007AFF',
}: LoadingScreenProps) {
  // Animation values
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;
  const dot1Value = useRef(new Animated.Value(0)).current;
  const dot2Value = useRef(new Animated.Value(0)).current;
  const dot3Value = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  // Size configurations
  const sizeConfig = {
    small: { icon: 24, text: 14, spacing: 8 },
    medium: { icon: 32, text: 16, spacing: 12 },
    large: { icon: 48, text: 18, spacing: 16 },
  };

  const config = sizeConfig[size];

  // Spinner animation
  useEffect(() => {
    if (type === 'spinner') {
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      spinAnimation.start();
      return () => spinAnimation.stop();
    }
  }, [type, spinValue]);

  // Pulse animation
  useEffect(() => {
    if (type === 'pulse') {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.2,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    }
  }, [type, pulseValue]);

  // Dots animation
  useEffect(() => {
    if (type === 'dots') {
      const createDotAnimation = (value: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(value, {
              toValue: 1,
              duration: 400,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(value, {
              toValue: 0,
              duration: 400,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        );
      };

      const dot1Animation = createDotAnimation(dot1Value, 0);
      const dot2Animation = createDotAnimation(dot2Value, 200);
      const dot3Animation = createDotAnimation(dot3Value, 400);

      dot1Animation.start();
      dot2Animation.start();
      dot3Animation.start();

      return () => {
        dot1Animation.stop();
        dot2Animation.stop();
        dot3Animation.stop();
      };
    }
  }, [type, dot1Value, dot2Value, dot3Value]);

  // Fade in animation
  useEffect(() => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeValue]);

  // Render spinner
  const renderSpinner = () => {
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Ionicons name="refresh" size={config.icon} color={color} />
      </Animated.View>
    );
  };

  // Render pulse
  const renderPulse = () => {
    return (
      <Animated.View style={{ transform: [{ scale: pulseValue }] }}>
        <View style={[styles.pulseCircle, { backgroundColor: color, width: config.icon, height: config.icon }]} />
      </Animated.View>
    );
  };

  // Render dots
  const renderDots = () => {
    const getDotOpacity = (value: Animated.Value) => {
      return value.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 1],
      });
    };

    return (
      <View style={styles.dotsContainer}>
        <Animated.View style={[styles.dot, { opacity: getDotOpacity(dot1Value), backgroundColor: color }]} />
        <Animated.View style={[styles.dot, { opacity: getDotOpacity(dot2Value), backgroundColor: color }]} />
        <Animated.View style={[styles.dot, { opacity: getDotOpacity(dot3Value), backgroundColor: color }]} />
      </View>
    );
  };

  // Render progress bar
  const renderProgress = () => {
    return (
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { backgroundColor: `${color}20` }]}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: color,
                width: `${progress}%`,
              }
            ]}
          />
        </View>
        <Text style={[styles.progressText, { fontSize: config.text, color }]}>
          {Math.round(progress)}%
        </Text>
      </View>
    );
  };

  // Render skeleton
  const renderSkeleton = () => {
    return (
      <View style={styles.skeletonContainer}>
        <View style={[styles.skeletonLine, styles.skeletonLineLarge, { backgroundColor: `${color}20` }]} />
        <View style={[styles.skeletonLine, styles.skeletonLineMedium, { backgroundColor: `${color}20` }]} />
        <View style={[styles.skeletonLine, styles.skeletonLineSmall, { backgroundColor: `${color}20` }]} />
      </View>
    );
  };

  // Render loading indicator based on type
  const renderLoadingIndicator = () => {
    switch (type) {
      case 'spinner':
        return renderSpinner();
      case 'pulse':
        return renderPulse();
      case 'dots':
        return renderDots();
      case 'progress':
        return renderProgress();
      case 'skeleton':
        return renderSkeleton();
      default:
        return renderSpinner();
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeValue }]}>
      <View style={styles.content}>
        {/* Logo */}
        {showLogo && (
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Ionicons name="car" size={40} color={color} />
            </View>
            <Text style={[styles.logoText, { fontSize: config.text + 4, color }]}>
              {logoText}
            </Text>
          </View>
        )}

        {/* Loading Indicator */}
        <View style={[styles.indicatorContainer, { marginTop: showLogo ? config.spacing * 2 : 0 }]}>
          {renderLoadingIndicator()}
        </View>

        {/* Loading Message */}
        <Text style={[styles.message, { fontSize: config.text, marginTop: config.spacing }]}>
          {message}
        </Text>

        {/* Sub Message */}
        {subMessage && (
          <Text style={[styles.subMessage, { fontSize: config.text - 2, marginTop: config.spacing / 2 }]}>
            {subMessage}
          </Text>
        )}

        {/* Additional progress info */}
        {type === 'progress' && (
          <View style={styles.progressInfo}>
            <Text style={[styles.progressInfoText, { fontSize: config.text - 2 }]}>
              Please wait while we process your request...
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontWeight: 'bold',
  },
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  message: {
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
  },
  subMessage: {
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  // Spinner styles
  pulseCircle: {
    borderRadius: 50,
  },
  // Dots styles
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  // Progress styles
  progressContainer: {
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    width: 200,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontWeight: '600',
  },
  progressInfo: {
    marginTop: 16,
  },
  progressInfoText: {
    color: '#666',
    textAlign: 'center',
  },
  // Skeleton styles
  skeletonContainer: {
    alignItems: 'center',
    gap: 12,
  },
  skeletonLine: {
    height: 4,
    borderRadius: 2,
  },
  skeletonLineLarge: {
    width: 200,
  },
  skeletonLineMedium: {
    width: 150,
  },
  skeletonLineSmall: {
    width: 100,
  },
});
