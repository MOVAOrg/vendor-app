import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProfileSetupScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const steps = [
    { title: 'Basic Info', icon: 'person' },
    { title: 'Contact', icon: 'mail' },
    { title: 'Address', icon: 'location' },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to next screen
      navigation.navigate('BusinessDetailsScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to save personal details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContent}>
            <Input
              label="First Name"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              placeholder="Enter your first name"
              leftIcon="person"
              containerStyle={styles.input}
            />

            <Input
              label="Last Name"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              placeholder="Enter your last name"
              leftIcon="person"
              containerStyle={styles.input}
            />

            <Input
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChangeText={(value) => handleInputChange('dateOfBirth', value)}
              placeholder="DD/MM/YYYY"
              leftIcon="calendar"
              containerStyle={styles.input}
            />

            <Input
              label="Gender"
              value={formData.gender}
              onChangeText={(value) => handleInputChange('gender', value)}
              placeholder="Select gender"
              leftIcon="male-female"
              containerStyle={styles.input}
            />
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContent}>
            <Input
              label="Email Address"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Enter your email"
              leftIcon="mail"
              keyboardType="email-address"
              containerStyle={styles.input}
            />

            <Card variant="elevated" size="md" style={styles.infoCard}>
              <View style={styles.infoContent}>
                <Ionicons name="information-circle" size={24} color={BrandColors.dot} />
                <View style={styles.infoText}>
                  <Text style={styles.infoTitle}>Email Verification</Text>
                  <Text style={styles.infoSubtitle}>
                    We'll send a verification link to this email address
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Input
              label="Address"
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              placeholder="Enter your address"
              leftIcon="home"
              multiline
              numberOfLines={3}
              containerStyle={styles.input}
            />

            <View style={styles.rowInputs}>
              <Input
                label="City"
                value={formData.city}
                onChangeText={(value) => handleInputChange('city', value)}
                placeholder="City"
                leftIcon="location"
                containerStyle={StyleSheet.flatten([styles.input, styles.halfInput])}
              />

              <Input
                label="State"
                value={formData.state}
                onChangeText={(value) => handleInputChange('state', value)}
                placeholder="State"
                leftIcon="location"
                containerStyle={StyleSheet.flatten([styles.input, styles.halfInput])}
              />
            </View>

            <Input
              label="Pincode"
              value={formData.pincode}
              onChangeText={(value) => handleInputChange('pincode', value)}
              placeholder="Enter pincode"
              leftIcon="location"
              keyboardType="numeric"
              maxLength={6}
              containerStyle={styles.input}
            />
          </View>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.firstName && formData.lastName && formData.dateOfBirth && formData.gender;
      case 1:
        return formData.email && formData.email.includes('@');
      case 2:
        return formData.address && formData.city && formData.state && formData.pincode;
      default:
        return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={BrandColors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <Text style={styles.title}>Personal Details</Text>
            <Text style={styles.subtitle}>
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </Text>
          </View>
        </Animated.View>

        {/* Progress Steps */}
        <Animated.View
          style={[
            styles.progressContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={[
                  styles.stepIcon,
                  index <= currentStep && styles.stepIconActive,
                  index < currentStep && styles.stepIconCompleted,
                ]}>
                  <Ionicons
                    name={index < currentStep ? 'checkmark' : step.icon as any}
                    size={20}
                    color={index <= currentStep ? BrandColors.secondary : BrandColors.textLight}
                  />
                </View>
                <Text style={[
                  styles.stepTitle,
                  index <= currentStep && styles.stepTitleActive,
                ]}>
                  {step.title}
                </Text>
                {index < steps.length - 1 && (
                  <View style={[
                    styles.stepLine,
                    index < currentStep && styles.stepLineCompleted,
                  ]} />
                )}
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Step Content */}
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          <Card variant="elevated" size="lg" style={styles.formCard}>
            {renderStepContent()}
          </Card>
        </Animated.View>

        {/* Navigation Buttons */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.buttonRow}>
            {currentStep > 0 && (
              <Button
                title="Previous"
                onPress={handlePrevious}
                variant="outline"
                size="lg"
                icon="arrow-back"
                iconPosition="left"
                style={styles.previousButton}
              />
            )}

            <Button
              title={currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              onPress={handleNext}
              variant="primary"
              size="lg"
              loading={isLoading}
              disabled={!isStepValid()}
              icon={currentStep === steps.length - 1 ? 'checkmark' : 'arrow-forward'}
              iconPosition="right"
              style={styles.nextButton}
            />
          </View>
        </Animated.View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.backgroundPrimary,
  },
  scrollView: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
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
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },

  // Progress
  progressContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  stepIconActive: {
    backgroundColor: BrandColors.primary,
  },
  stepIconCompleted: {
    backgroundColor: BrandColors.accent,
  },
  stepTitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textLight,
    textAlign: 'center',
  },
  stepTitleActive: {
    color: BrandColors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
  },
  stepLine: {
    position: 'absolute',
    top: 24,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: BrandColors.borderLight,
    zIndex: -1,
  },
  stepLineCompleted: {
    backgroundColor: BrandColors.accent,
  },

  // Content
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  formCard: {
    width: '100%',
  },
  stepContent: {
    width: '100%',
  },
  input: {
    marginBottom: Spacing.md,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },

  // Info Card
  infoCard: {
    marginTop: Spacing.md,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  infoTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  infoSubtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },

  // Buttons
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previousButton: {
    flex: 1,
    marginRight: Spacing.md,
  },
  nextButton: {
    flex: 1,
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
