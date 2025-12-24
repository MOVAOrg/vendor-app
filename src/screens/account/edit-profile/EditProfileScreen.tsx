import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Image,
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

export default function EditProfileScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    businessName: 'Rajesh Car Rentals',
    businessType: 'Car Rental Service',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    gstNumber: 'GST123456789',
    licenseNumber: 'LIC123456789',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const steps = [
    { title: 'Personal', icon: 'person' },
    { title: 'Business', icon: 'business' },
    { title: 'Review', icon: 'checkmark' },
  ];

  const businessTypes = [
    'Car Rental Service',
    'Taxi Service',
    'Bike Rental',
    'Commercial Vehicle Rental',
    'Luxury Car Rental',
    'Other',
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

  const handleBusinessTypeSelect = (type: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFormData(prev => ({ ...prev, businessType: type }));
  };

  const handleImageUpload = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Upload Image', 'Image upload functionality coming soon!');
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

      Alert.alert(
        'Success',
        'Profile updated successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
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
            {/* Profile Image */}
            <View style={styles.imageContainer}>
              <TouchableOpacity style={styles.imageUpload} onPress={handleImageUpload}>
                <Image
                  source={{ uri: 'https://via.placeholder.com/150x150/007AFF/FFFFFF?text=RK' }}
                  style={styles.profileImage}
                />
                <View style={styles.imageOverlay}>
                  <Ionicons name="camera" size={24} color={BrandColors.secondary} />
                </View>
              </TouchableOpacity>
              <Text style={styles.imageText}>Tap to change profile picture</Text>
            </View>

            {/* Personal Information */}
            <Input
              label="Full Name"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Enter your full name"
              leftIcon="person"
              containerStyle={styles.input}
            />

            <Input
              label="Email Address"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Enter your email"
              leftIcon="mail"
              keyboardType="email-address"
              containerStyle={styles.input}
            />

            <Input
              label="Phone Number"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholder="Enter your phone number"
              leftIcon="call"
              keyboardType="phone-pad"
              containerStyle={styles.input}
            />
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContent}>
            <Input
              label="Business Name"
              value={formData.businessName}
              onChangeText={(value) => handleInputChange('businessName', value)}
              placeholder="Enter business name"
              leftIcon="business"
              containerStyle={styles.input}
            />

            <Text style={styles.businessTypeTitle}>Business Type</Text>
            <View style={styles.businessTypeGrid}>
              {businessTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.businessTypeItem,
                    formData.businessType === type && styles.businessTypeItemSelected,
                  ]}
                  onPress={() => handleBusinessTypeSelect(type)}
                >
                  <Text style={[
                    styles.businessTypeText,
                    formData.businessType === type && styles.businessTypeTextSelected,
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Input
              label="Business Address"
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              placeholder="Enter business address"
              leftIcon="location"
              multiline
              numberOfLines={3}
              containerStyle={styles.input}
            />

            <Input
              label="GST Number"
              value={formData.gstNumber}
              onChangeText={(value) => handleInputChange('gstNumber', value)}
              placeholder="Enter GST number"
              leftIcon="card"
              containerStyle={styles.input}
            />

            <Input
              label="License Number"
              value={formData.licenseNumber}
              onChangeText={(value) => handleInputChange('licenseNumber', value)}
              placeholder="Enter license number"
              leftIcon="document"
              containerStyle={styles.input}
            />
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Card variant="elevated" size="md" style={styles.reviewCard}>
              <Text style={styles.reviewTitle}>Review Your Information</Text>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Name</Text>
                <Text style={styles.reviewValue}>{formData.name}</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Email</Text>
                <Text style={styles.reviewValue}>{formData.email}</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Phone</Text>
                <Text style={styles.reviewValue}>{formData.phone}</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Business Name</Text>
                <Text style={styles.reviewValue}>{formData.businessName}</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Business Type</Text>
                <Text style={styles.reviewValue}>{formData.businessType}</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Address</Text>
                <Text style={styles.reviewValue}>{formData.address}</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>GST Number</Text>
                <Text style={styles.reviewValue}>{formData.gstNumber}</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>License Number</Text>
                <Text style={styles.reviewValue}>{formData.licenseNumber}</Text>
              </View>
            </Card>
          </View>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name && formData.email && formData.phone;
      case 1:
        return formData.businessName && formData.businessType && formData.address;
      case 2:
        return true;
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
            <Text style={styles.title}>Edit Profile</Text>
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
              title={currentStep === steps.length - 1 ? 'Save Changes' : 'Next'}
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

  // Image Upload
  imageContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  imageUpload: {
    position: 'relative',
    marginBottom: Spacing.sm,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.full,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: BrandColors.secondary,
  },
  imageText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },

  // Input
  input: {
    marginBottom: Spacing.md,
  },

  // Business Type
  businessTypeTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  businessTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  businessTypeItem: {
    width: '48%',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  businessTypeItemSelected: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  businessTypeText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    textAlign: 'center',
  },
  businessTypeTextSelected: {
    color: BrandColors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Review
  reviewCard: {
    marginBottom: Spacing.lg,
  },
  reviewTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.borderLight,
  },
  reviewLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },
  reviewValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    flex: 1,
    textAlign: 'right',
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
