import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Splash Screen Component
 * Shows app logo and loading indicator while app initializes
 * Navigates to appropriate screen based on authentication status
 */
export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    // Simulate app initialization time
    const timer = setTimeout(() => {
      // TODO: Check authentication status and navigate accordingly
      // For now, navigate to get-started screen
      navigation.replace('GetStartedScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* App Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🚗</Text>
        </View>

        {/* App Name */}
        <Text style={styles.appName}>Mova Vendor</Text>
        <Text style={styles.tagline}>Your Car Rental Partner</Text>

        {/* Loading Indicator */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 60,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
    fontFamily: 'Montserrat-Bold',
  },
  tagline: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 60,
    fontFamily: 'OpenSans-Regular',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: '#666666',
    fontFamily: 'OpenSans-Regular',
  },
});
