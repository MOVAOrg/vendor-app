import { StatusBar } from 'expo-status-bar';
import React from 'react';

// Import the main app navigator
import { AppNavigator } from './src/navigation/AppNavigator';

/**
 * Main App Component
 * Entry point for the MovaVendorApp
 * Sets up the main navigation structure
 */
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
}
