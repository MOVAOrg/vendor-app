import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { BorderRadius, BrandColors, Spacing, Typography } from '../../constants/brandTheme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  variant = 'outlined',
  size = 'md',
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const getContainerStyle = () => {
    const baseStyle = [styles.container];

    switch (variant) {
      case 'filled':
        return [...baseStyle, styles.containerFilled];
      case 'outlined':
        return [...baseStyle, styles.containerOutlined];
      default:
        return [...baseStyle, styles.containerDefault];
    }
  };

  const getInputStyle = () => {
    const baseStyle = [styles.input, styles[`input_${size}`]];

    if (isFocused) {
      baseStyle.push(styles.inputFocused);
    }

    if (error) {
      baseStyle.push(styles.inputError);
    }

    return baseStyle;
  };

  const getBorderStyle = () => {
    if (error) return { borderColor: BrandColors.error };
    if (isFocused) return { borderColor: BrandColors.primary };
    return { borderColor: BrandColors.borderLight };
  };

  return (
    <View style={[getContainerStyle(), containerStyle]}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}

      <View style={[
        styles.inputContainer,
        getBorderStyle(),
        variant === 'filled' && styles.inputContainerFilled,
        variant === 'outlined' && styles.inputContainerOutlined,
      ]}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={isFocused ? BrandColors.primary : BrandColors.gray400}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[getInputStyle(), inputStyle]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={BrandColors.gray400}
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIconContainer}
            disabled={!onRightIconPress}
          >
            <Ionicons
              name={rightIcon}
              size={20}
              color={isFocused ? BrandColors.primary : BrandColors.gray400}
            />
          </TouchableOpacity>
        )}
      </View>

      {(error || helperText) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  containerDefault: {},
  containerFilled: {},
  containerOutlined: {},

  label: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.sm,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    backgroundColor: BrandColors.backgroundCard,
  },
  inputContainerFilled: {
    backgroundColor: BrandColors.gray50,
    borderWidth: 0,
  },
  inputContainerOutlined: {
    backgroundColor: BrandColors.backgroundCard,
    borderWidth: 1,
  },

  input: {
    flex: 1,
    fontFamily: Typography.fontFamily.secondary,
    color: BrandColors.textPrimary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  input_sm: {
    paddingVertical: Spacing.sm,
    fontSize: Typography.fontSize.sm,
  },
  input_md: {
    paddingVertical: Spacing.md,
    fontSize: Typography.fontSize.base,
  },
  input_lg: {
    paddingVertical: Spacing.lg,
    fontSize: Typography.fontSize.lg,
  },

  inputFocused: {
    // Focus styles handled by border color
  },
  inputError: {
    // Error styles handled by border color
  },

  leftIcon: {
    marginLeft: Spacing.md,
  },
  rightIconContainer: {
    marginRight: Spacing.md,
    padding: Spacing.xs,
  },

  helperText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textLight,
    marginTop: Spacing.xs,
  },
  errorText: {
    color: BrandColors.error,
  },
});
