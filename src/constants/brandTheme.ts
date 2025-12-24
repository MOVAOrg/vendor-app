/**
 * Brand Colors and Theme Configuration
 * Mova Platform - Car Rental Vendor App
 */

export const BrandColors = {
  // Primary brand colors
  primary: '#00242C',        // Dark teal - Primary color
  secondary: '#FFFFFF',      // White - Background color
  accent: '#2DAA72',         // Green - Car swirl color
  dot: '#54AEC9',           // Light blue - Dot color

  // Extended color palette
  primaryLight: '#1A3A42',   // Lighter primary
  primaryDark: '#001A1F',   // Darker primary
  accentLight: '#4BC487',    // Lighter accent
  accentDark: '#1E8B5A',    // Darker accent

  // Neutral colors
  gray50: '#F8F9FA',
  gray100: '#E9ECEF',
  gray200: '#DEE2E6',
  gray300: '#CED4DA',
  gray400: '#ADB5BD',
  gray500: '#6C757D',
  gray600: '#495057',
  gray700: '#343A40',
  gray800: '#212529',
  gray900: '#0D1117',

  // Status colors
  success: '#2DAA72',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#54AEC9',

  // Text colors
  textPrimary: '#00242C',
  textSecondary: '#6C757D',
  textLight: '#ADB5BD',
  textWhite: '#FFFFFF',

  // Background colors
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  backgroundCard: '#FFFFFF',
  backgroundOverlay: 'rgba(0, 36, 44, 0.8)',

  // Border colors
  borderLight: '#E9ECEF',
  borderMedium: '#CED4DA',
  borderDark: '#ADB5BD',

  // Shadow colors
  shadowLight: 'rgba(0, 36, 44, 0.1)',
  shadowMedium: 'rgba(0, 36, 44, 0.15)',
  shadowDark: 'rgba(0, 36, 44, 0.25)',
};

export const Typography = {
  // Font families
  fontFamily: {
    primary: 'Montserrat',
    secondary: 'Open Sans',
    accent: 'Raleway',
  },

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },

  // Font weights
  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 80,
};

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: BrandColors.shadowLight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: BrandColors.shadowMedium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: BrandColors.shadowDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: BrandColors.shadowDark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 12,
  },
};

export const AnimationTimings = {
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 800,
};

export const Breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

// Common styles
export const CommonStyles = {
  container: {
    flex: 1,
    backgroundColor: BrandColors.backgroundPrimary,
  },

  safeArea: {
    flex: 1,
    backgroundColor: BrandColors.backgroundPrimary,
  },

  card: {
    backgroundColor: BrandColors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.sm,
  },

  button: {
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },

  input: {
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.secondary,
    color: BrandColors.textPrimary,
    backgroundColor: BrandColors.backgroundCard,
  },

  text: {
    fontFamily: Typography.fontFamily.primary,
    color: BrandColors.textPrimary,
  },

  heading: {
    fontFamily: Typography.fontFamily.primary,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
  },

  subheading: {
    fontFamily: Typography.fontFamily.primary,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
  },

  body: {
    fontFamily: Typography.fontFamily.secondary,
    fontWeight: Typography.fontWeight.normal,
    color: BrandColors.textSecondary,
  },

  caption: {
    fontFamily: Typography.fontFamily.secondary,
    fontWeight: Typography.fontWeight.normal,
    color: BrandColors.textLight,
  },
};

export default {
  colors: BrandColors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  animationTimings: AnimationTimings,
  breakpoints: Breakpoints,
  commonStyles: CommonStyles,
};
