import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

// Import the demo navigator for showcasing all available screens
import { DemoNavigator } from './src/navigation/DemoNavigator';

/**
 * Main App Component
 * Entry point for the MovaVendorApp
 * Currently displays the demo navigator to showcase all available screens
 * Similar to Flutter's main.dart for demo purposes
 */
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <DemoNavigator />
    </NavigationContainer>
  );
}
