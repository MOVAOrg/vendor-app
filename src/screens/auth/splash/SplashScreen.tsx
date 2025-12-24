import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';

import { FONT_FAMILIES } from '../../../config/fonts';

const { width, height } = Dimensions.get('window');

// Define color constants
const COLORS = {
  primary: '#00242C',
  white: '#FFFFFF',
};

/**
 * Splash Screen Component
 * Professional and sleek splash animation for Mova car rental app
 * Clean brand color transition with logo
 */
export default function SplashScreen() {
  // Animation values
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Haptic feedback on load
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    startAnimation();
  }, []);

  const startAnimation = () => {
    // Logo entrance animation
    Animated.parallel([
      // Logo fade in
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Logo scale up
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Text slide up animation after logo appears
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideUp, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
        translucent={false}
      />

      {/* Logo Container */}
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Image
            source={require('../../../assets/images/logo/MOVLO.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </Animated.View>

        {/* App Name/Tagline */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textOpacity,
              transform: [{ translateY: slideUp }],
            },
          ]}
        >
          <Text style={styles.appName}>MOVA</Text>
          <View style={styles.divider} />
          <Text style={styles.tagline}>Vendor Platform</Text>
        </Animated.View>
      </View>

      {/* Footer */}
      <Animated.View
        style={[
          styles.footer,
          {
            opacity: textOpacity,
          },
        ]}
      >
        <Text style={styles.footerText}>Powered by Mova</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  // Logo Styles
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 140,
    height: 140,
  },

  // Text Styles
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontFamily: FONT_FAMILIES.spaceGrotesk.bold,
    fontSize: 42,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 8,
    marginBottom: 12,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: COLORS.white,
    marginBottom: 12,
    borderRadius: 2,
  },
  tagline: {
    fontFamily: FONT_FAMILIES.openSans.regular,
    fontSize: 14,
    color: COLORS.white,
    letterSpacing: 2,
    textTransform: 'uppercase',
    opacity: 0.8,
  },

  // Footer
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: FONT_FAMILIES.openSans.regular,
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.6,
    letterSpacing: 1,
  },
});
