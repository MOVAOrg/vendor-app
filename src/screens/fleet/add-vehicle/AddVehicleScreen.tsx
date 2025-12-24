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
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AddVehicleScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    vehicleName: '',
    brand: '',
    model: '',
    year: '',
    color: '',
    licensePlate: '',
    vehicleType: '',
    fuelType: '',
    transmission: '',
    seatingCapacity: '',
    mileage: '',
    pricePerDay: '',
    description: '',
    features: [],
    images: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const steps = [
    { title: 'Basic Info', icon: 'car' },
    { title: 'Specifications', icon: 'settings' },
    { title: 'Pricing', icon: 'cash' },
    { title: 'Photos', icon: 'camera' },
  ];

  const vehicleTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Truck', 'Van'];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const transmissionTypes = ['Manual', 'Automatic', 'CVT'];
  const features = ['AC', 'GPS', 'Bluetooth', 'USB', 'Sunroof', 'Leather Seats', 'Backup Camera'];

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

  const handleFeatureToggle = (feature: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
    }));
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
        'Vehicle added successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('MyFleetScreen'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to add vehicle. Please try again.');
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
              label="Vehicle Name"
              value={formData.vehicleName}
              onChangeText={(value) => handleInputChange('vehicleName', value)}
              placeholder="Enter vehicle name"
              leftIcon="car"
              containerStyle={styles.input}
            />

            <View style={styles.rowInputs}>
              <Input
                label="Brand"
                value={formData.brand}
                onChangeText={(value) => handleInputChange('brand', value)}
                placeholder="Brand"
                leftIcon="business"
                containerStyle={[styles.input, styles.halfInput]}
              />

              <Input
                label="Model"
                value={formData.model}
                onChangeText={(value) => handleInputChange('model', value)}
                placeholder="Model"
                leftIcon="car-sport"
                containerStyle={[styles.input, styles.halfInput]}
              />
            </View>

            <View style={styles.rowInputs}>
              <Input
                label="Year"
                value={formData.year}
                onChangeText={(value) => handleInputChange('year', value)}
                placeholder="2023"
                leftIcon="calendar"
                keyboardType="numeric"
                containerStyle={[styles.input, styles.halfInput]}
              />

              <Input
                label="Color"
                value={formData.color}
                onChangeText={(value) => handleInputChange('color', value)}
                placeholder="Color"
                leftIcon="color-palette"
                containerStyle={[styles.input, styles.halfInput]}
              />
            </View>

            <Input
              label="License Plate"
              value={formData.licensePlate}
              onChangeText={(value) => handleInputChange('licensePlate', value.toUpperCase())}
              placeholder="Enter license plate number"
              leftIcon="card"
              containerStyle={styles.input}
            />
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContent}>
            <Input
              label="Vehicle Type"
              value={formData.vehicleType}
              onChangeText={(value) => handleInputChange('vehicleType', value)}
              placeholder="Select vehicle type"
              leftIcon="car"
              containerStyle={styles.input}
            />

            <View style={styles.rowInputs}>
              <Input
                label="Fuel Type"
                value={formData.fuelType}
                onChangeText={(value) => handleInputChange('fuelType', value)}
                placeholder="Fuel type"
                leftIcon="flash"
                containerStyle={[styles.input, styles.halfInput]}
              />

              <Input
                label="Transmission"
                value={formData.transmission}
                onChangeText={(value) => handleInputChange('transmission', value)}
                placeholder="Transmission"
                leftIcon="settings"
                containerStyle={[styles.input, styles.halfInput]}
              />
            </View>

            <View style={styles.rowInputs}>
              <Input
                label="Seating Capacity"
                value={formData.seatingCapacity}
                onChangeText={(value) => handleInputChange('seatingCapacity', value)}
                placeholder="Seats"
                leftIcon="people"
                keyboardType="numeric"
                containerStyle={[styles.input, styles.halfInput]}
              />

              <Input
                label="Mileage"
                value={formData.mileage}
                onChangeText={(value) => handleInputChange('mileage', value)}
                placeholder="km/l"
                leftIcon="speedometer"
                containerStyle={[styles.input, styles.halfInput]}
              />
            </View>

            <Text style={styles.featuresTitle}>Features</Text>
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.featureChip,
                    formData.features.includes(feature) && styles.featureChipSelected,
                  ]}
                  onPress={() => handleFeatureToggle(feature)}
                >
                  <Text style={[
                    styles.featureChipText,
                    formData.features.includes(feature) && styles.featureChipTextSelected,
                  ]}>
                    {feature}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Input
              label="Price Per Day"
              value={formData.pricePerDay}
              onChangeText={(value) => handleInputChange('pricePerDay', value)}
              placeholder="Enter daily rate"
              leftIcon="cash"
              keyboardType="numeric"
              containerStyle={styles.input}
            />

            <Input
              label="Description"
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              placeholder="Describe your vehicle"
              leftIcon="document-text"
              multiline
              numberOfLines={4}
              containerStyle={styles.input}
            />

            <Card variant="outlined" size="md" style={styles.pricingCard}>
              <Text style={styles.pricingTitle}>Pricing Guidelines</Text>
              <Text style={styles.pricingText}>
                • Competitive pricing attracts more bookings{'\n'}
                • Consider vehicle condition and features{'\n'}
                • Check local market rates{'\n'}
                • You can adjust pricing anytime
              </Text>
            </Card>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.photosTitle}>Vehicle Photos</Text>
            <Text style={styles.photosSubtitle}>
              Add high-quality photos to attract more customers
            </Text>

            <View style={styles.photosGrid}>
              {[1, 2, 3, 4].map((index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.photoPlaceholder}
                  onPress={handleImageUpload}
                >
                  <Ionicons name="camera" size={32} color={BrandColors.textLight} />
                  <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Card variant="outlined" size="md" style={styles.photosCard}>
              <Text style={styles.photosCardTitle}>Photo Tips</Text>
              <Text style={styles.photosCardText}>
                • Take photos in good lighting{'\n'}
                • Include exterior and interior shots{'\n'}
                • Show key features and condition{'\n'}
                • Use high resolution images
              </Text>
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
        return formData.vehicleName && formData.brand && formData.model && formData.year && formData.licensePlate;
      case 1:
        return formData.vehicleType && formData.fuelType && formData.transmission && formData.seatingCapacity;
      case 2:
        return formData.pricePerDay && formData.description;
      case 3:
        return true; // Photos are optional
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
            <Text style={styles.title}>Add Vehicle</Text>
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
              title={currentStep === steps.length - 1 ? 'Add Vehicle' : 'Next'}
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

  // Features
  featuresTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.md,
  },
  featureChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.gray50,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  featureChipSelected: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  featureChipText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },
  featureChipTextSelected: {
    color: BrandColors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Pricing
  pricingCard: {
    marginTop: Spacing.md,
  },
  pricingTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.sm,
  },
  pricingText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    lineHeight: 20,
  },

  // Photos
  photosTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.sm,
  },
  photosSubtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.lg,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  photoPlaceholder: {
    width: (SCREEN_WIDTH - Spacing.lg * 2 - Spacing.md * 3) / 2,
    height: 120,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.gray50,
    borderWidth: 2,
    borderColor: BrandColors.borderLight,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  photoPlaceholderText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textLight,
    marginTop: Spacing.sm,
  },
  photosCard: {
    marginTop: Spacing.md,
  },
  photosCardTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.sm,
  },
  photosCardText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    lineHeight: 20,
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
