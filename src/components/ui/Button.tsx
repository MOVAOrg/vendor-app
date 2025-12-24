import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { BorderRadius, BrandColors, Shadows, Spacing, Typography } from '../../constants/brandTheme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`button_${size}`]];

    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.buttonPrimary];
      case 'secondary':
        return [...baseStyle, styles.buttonSecondary];
      case 'accent':
        return [...baseStyle, styles.buttonAccent];
      case 'outline':
        return [...baseStyle, styles.buttonOutline];
      case 'ghost':
        return [...baseStyle, styles.buttonGhost];
      default:
        return [...baseStyle, styles.buttonPrimary];
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`text_${size}`]];

    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.textPrimary];
      case 'secondary':
        return [...baseStyle, styles.textSecondary];
      case 'accent':
        return [...baseStyle, styles.textAccent];
      case 'outline':
        return [...baseStyle, styles.textOutline];
      case 'ghost':
        return [...baseStyle, styles.textGhost];
      default:
        return [...baseStyle, styles.textPrimary];
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="small"
            color={variant === 'outline' || variant === 'ghost' ? BrandColors.primary : BrandColors.secondary}
          />
          <Text style={[getTextStyle(), { marginLeft: Spacing.sm }]}>{title}</Text>
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        {icon && iconPosition === 'left' && (
          <Ionicons
            name={icon}
            size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
            color={variant === 'outline' || variant === 'ghost' ? BrandColors.primary : BrandColors.secondary}
            style={styles.iconLeft}
          />
        )}
        <Text style={getTextStyle()}>{title}</Text>
        {icon && iconPosition === 'right' && (
          <Ionicons
            name={icon}
            size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
            color={variant === 'outline' || variant === 'ghost' ? BrandColors.primary : BrandColors.secondary}
            style={styles.iconRight}
          />
        )}
      </View>
    );
  };

  if (variant === 'primary' || variant === 'accent') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[getButtonStyle(), disabled && styles.disabled, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={
            variant === 'primary'
              ? [BrandColors.primary, BrandColors.primaryDark]
              : [BrandColors.accent, BrandColors.accentDark]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), disabled && styles.disabled, style]}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Shadows.sm,
  },

  // Sizes
  button_sm: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 36,
  },
  button_md: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 48,
  },
  button_lg: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    minHeight: 56,
  },

  // Variants
  buttonPrimary: {
    backgroundColor: BrandColors.primary,
  },
  buttonSecondary: {
    backgroundColor: BrandColors.gray100,
  },
  buttonAccent: {
    backgroundColor: BrandColors.accent,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: BrandColors.primary,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },

  // Text styles
  text: {
    fontFamily: Typography.fontFamily.primary,
    fontWeight: Typography.fontWeight.semibold,
    textAlign: 'center',
  },
  text_sm: {
    fontSize: Typography.fontSize.sm,
  },
  text_md: {
    fontSize: Typography.fontSize.base,
  },
  text_lg: {
    fontSize: Typography.fontSize.lg,
  },

  textPrimary: {
    color: BrandColors.secondary,
  },
  textSecondary: {
    color: BrandColors.textPrimary,
  },
  textAccent: {
    color: BrandColors.secondary,
  },
  textOutline: {
    color: BrandColors.primary,
  },
  textGhost: {
    color: BrandColors.primary,
  },

  // Layout
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
  gradient: {
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabled: {
    opacity: 0.6,
  },
});
