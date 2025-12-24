import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { BorderRadius, BrandColors, Shadows, Spacing, Typography } from '../../constants/brandTheme';

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  image?: ImageSourcePropType;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  image,
  icon,
  onPress,
  variant = 'default',
  size = 'md',
  style,
  contentStyle,
}) => {
  const getCardStyle = () => {
    const baseStyle = [styles.card, styles[`card_${size}`]];

    switch (variant) {
      case 'elevated':
        return [...baseStyle, styles.cardElevated];
      case 'outlined':
        return [...baseStyle, styles.cardOutlined];
      case 'gradient':
        return [...baseStyle, styles.cardGradient];
      default:
        return [...baseStyle, styles.cardDefault];
    }
  };

  const renderHeader = () => {
    if (!title && !subtitle && !image && !icon) return null;

    return (
      <View style={styles.header}>
        {image && (
          <Image source={image} style={styles.image} resizeMode="cover" />
        )}

        {icon && !image && (
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={24} color={BrandColors.primary} />
          </View>
        )}

        <View style={styles.headerContent}>
          {title && (
            <Text style={styles.title}>{title}</Text>
          )}
          {subtitle && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
    );
  };

  const CardContent = () => (
    <View style={[styles.content, contentStyle]}>
      {renderHeader()}
      {children && (
        <View style={styles.children}>
          {children}
        </View>
      )}
    </View>
  );

  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        style={[getCardStyle(), style]}
        activeOpacity={onPress ? 0.8 : 1}
      >
        <LinearGradient
          colors={[BrandColors.primary, BrandColors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <CardContent />
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[getCardStyle(), style]}
        activeOpacity={0.8}
      >
        <CardContent />
      </TouchableOpacity>
    );
  }

  return (
    <View style={[getCardStyle(), style]}>
      <CardContent />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.backgroundCard,
    overflow: 'hidden',
  },

  // Sizes
  card_sm: {
    padding: Spacing.sm,
  },
  card_md: {
    padding: Spacing.md,
  },
  card_lg: {
    padding: Spacing.lg,
  },

  // Variants
  cardDefault: {
    ...Shadows.sm,
  },
  cardElevated: {
    ...Shadows.lg,
  },
  cardOutlined: {
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
    ...Shadows.none,
  },
  cardGradient: {
    ...Shadows.md,
  },

  gradient: {
    borderRadius: BorderRadius.lg,
  },

  content: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  image: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },

  headerContent: {
    flex: 1,
  },

  title: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },

  subtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },

  children: {
    marginTop: Spacing.sm,
  },
});
