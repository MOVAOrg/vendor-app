import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

/**
 * Get Started Screen Component
 * Welcome screen with app introduction and call-to-action
 * First screen users see after splash
 */
export default function GetStartedScreen({ navigation }: any) {
  const handleGetStarted = () => {
    navigation.navigate('LanguageSelectionScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <View style={styles.heroImageContainer}>
            <Text style={styles.heroEmoji}>🚗</Text>
            <Text style={styles.heroText}>Welcome to Mova</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to Mova Vendor</Text>
          <Text style={styles.subtitle}>
            Manage your car rental business with ease. Track bookings, manage your fleet, and grow your revenue.
          </Text>
        </View>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🚗</Text>
            <Text style={styles.featureText}>Manage Your Fleet</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureText}>Track Analytics</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>💰</Text>
            <Text style={styles.featureText}>Monitor Revenue</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  imageContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImageContainer: {
    width: width * 0.8,
    height: 200,
    backgroundColor: '#f0f8ff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  heroText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    fontFamily: 'Montserrat-Bold',
  },
  textContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Montserrat-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'OpenSans-Regular',
  },
  featuresContainer: {
    flex: 0.2,
    justifyContent: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'OpenSans-Regular',
  },
  getStartedButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  getStartedButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
});
