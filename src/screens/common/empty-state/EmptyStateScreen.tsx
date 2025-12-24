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

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
  showButton?: boolean;
}

// Navigation props interface for when used as a screen
interface EmptyStateScreenProps {
  route?: {
    params?: EmptyStateProps;
  };
  navigation?: any;
}

export default function EmptyStateScreen({
  route,
  navigation,
  title: propTitle,
  subtitle: propSubtitle,
  icon: propIcon,
  buttonTitle: propButtonTitle,
  onButtonPress: propOnButtonPress,
  showButton: propShowButton,
}: EmptyStateScreenProps & EmptyStateProps) {
  // Get values from route params if available, otherwise use props
  const title = route?.params?.title || propTitle || 'No Data Available';
  const subtitle = route?.params?.subtitle || propSubtitle;
  const icon = route?.params?.icon || propIcon || 'document-outline';
  const buttonTitle = route?.params?.buttonTitle || propButtonTitle || 'Get Started';
  const onButtonPress = route?.params?.onButtonPress || propOnButtonPress;
  const showButton = route?.params?.showButton ?? propShowButton ?? true;
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

  const handleButtonPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onButtonPress) {
      onButtonPress();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Icon */}
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
            <Ionicons name={icon as any} size={80} color={BrandColors.textLight} />
          </View>
        </Animated.View>

        {/* Title */}
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
          {subtitle && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
        </Animated.View>

        {/* Button */}
        {showButton && (
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
              title={buttonTitle}
              onPress={handleButtonPress}
              variant="primary"
              size="lg"
              style={styles.button}
            />
          </Animated.View>
        )}
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
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: BrandColors.borderLight,
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
  subtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },

  // Button
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
});
