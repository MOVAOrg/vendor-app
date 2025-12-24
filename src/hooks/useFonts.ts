import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

import { FONT_FILES } from '../config/fonts';

/**
 * Custom Hook for Loading Google Fonts
 *
 * Usage:
 * const fontsLoaded = useFonts();
 *
 * if (!fontsLoaded) {
 *   return <LoadingScreen />;
 * }
 */
export function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    try {
      await Font.loadAsync(FONT_FILES);
      setFontsLoaded(true);
    } catch (error) {
      console.error('Error loading fonts:', error);
      // Still set to true to prevent blocking the app
      setFontsLoaded(true);
    }
  };

  return fontsLoaded;
}

