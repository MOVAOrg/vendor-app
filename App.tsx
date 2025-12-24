import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, AppRegistry, StyleSheet, View } from 'react-native';

import { useFonts } from './src/hooks/useFonts';
// Import the main app navigator for the real application
import { AppNavigator } from './src/navigation/AppNavigator';

/**
 * Main App Component
 * Entry point for the MovaVendorApp
 * Uses the real application navigator with proper authentication flow
 */
function App() {
  // Load custom Google Fonts
  const fontsLoaded = useFonts();

  // Show loading indicator while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00242C',
  },
});

// Register the main component with Expo
AppRegistry.registerComponent('main', () => App);

export default App;
