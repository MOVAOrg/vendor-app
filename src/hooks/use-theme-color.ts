import { useColorScheme } from 'react-native';

/**
 * Hook to get theme colors based on color scheme
 * Returns appropriate colors for light and dark themes
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof lightColors
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return theme === 'light' ? lightColors[colorName] : darkColors[colorName];
  }
}

const lightColors = {
  text: '#000',
  background: '#fff',
  tint: '#007AFF',
  tabIconDefault: '#ccc',
  tabIconSelected: '#007AFF',
};

const darkColors = {
  text: '#fff',
  background: '#000',
  tint: '#007AFF',
  tabIconDefault: '#ccc',
  tabIconSelected: '#007AFF',
};
