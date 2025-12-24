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

export default function CreateBookingScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    vehicleId: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    totalAmount: '',
    advanceAmount: '',
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const steps = [
    { title: 'Customer', icon: 'person' },
    { title: 'Vehicle', icon: 'car' },
    { title: 'Schedule', icon: 'calendar' },
    { title: 'Payment', icon: 'cash' },
  ];

  const vehicles = [
    { id: '1', name: 'Toyota Camry 2023', licensePlate: 'MH01AB1234', status: 'available', pricePerDay: 2500 },
    { id: '2', name: 'Honda City 2022', licensePlate: 'MH02CD5678', status: 'available', pricePerDay: 2200 },
    { id: '3', name: 'Maruti Swift 2023', licensePlate: 'MH03EF9012', status: 'booked', pricePerDay: 1800 },
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

  const handleVehicleSelect = (vehicle: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFormData(prev => ({
      ...prev,
      vehicleId: vehicle.id,
      totalAmount: vehicle.pricePerDay.toString(),
    }));
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
        'Booking created successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('MyBookingsScreen'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create booking. Please try again.');
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
              label="Customer Name"
              value={formData.customerName}
              onChangeText={(value) => handleInputChange('customerName', value)}
              placeholder="Enter customer name"
              leftIcon="person"
              containerStyle={styles.input}
            />

            <Input
              label="Phone Number"
              value={formData.customerPhone}
              onChangeText={(value) => handleInputChange('customerPhone', value)}
              placeholder="Enter phone number"
              leftIcon="call"
              keyboardType="phone-pad"
              containerStyle={styles.input}
            />

            <Input
              label="Email Address"
              value={formData.customerEmail}
              onChangeText={(value) => handleInputChange('customerEmail', value)}
              placeholder="Enter email address"
              leftIcon="mail"
              keyboardType="email-address"
              containerStyle={styles.input}
            />
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.vehicleTitle}>Select Vehicle</Text>

            {vehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                style={[
                  styles.vehicleItem,
                  formData.vehicleId === vehicle.id && styles.vehicleItemSelected,
                  vehicle.status === 'booked' && styles.vehicleItemDisabled,
                ]}
                onPress={() => vehicle.status === 'available' && handleVehicleSelect(vehicle)}
                disabled={vehicle.status === 'booked'}
              >
                <View style={styles.vehicleLeft}>
                  <View style={[
                    styles.vehicleIcon,
                    { backgroundColor: vehicle.status === 'available' ? `${BrandColors.accent}20` : `${BrandColors.textLight}20` },
                  ]}>
                    <Ionicons
                      name="car"
                      size={24}
                      color={vehicle.status === 'available' ? BrandColors.accent : BrandColors.textLight}
                    />
                  </View>

                  <View style={styles.vehicleInfo}>
                    <Text style={[
                      styles.vehicleName,
                      vehicle.status === 'booked' && styles.vehicleNameDisabled,
                    ]}>
                      {vehicle.name}
                    </Text>
                    <Text style={[
                      styles.vehiclePlate,
                      vehicle.status === 'booked' && styles.vehiclePlateDisabled,
                    ]}>
                      {vehicle.licensePlate}
                    </Text>
                    <View style={styles.vehicleStatus}>
                      <Ionicons
                        name={vehicle.status === 'available' ? 'checkmark-circle' : 'time'}
                        size={14}
                        color={vehicle.status === 'available' ? BrandColors.accent : BrandColors.warning}
                      />
                      <Text style={[
                        styles.vehicleStatusText,
                        { color: vehicle.status === 'available' ? BrandColors.accent : BrandColors.warning },
                      ]}>
                        {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.vehicleRight}>
                  <Text style={[
                    styles.vehiclePrice,
                    vehicle.status === 'booked' && styles.vehiclePriceDisabled,
                  ]}>
                    ₹{vehicle.pricePerDay}/day
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <View style={styles.rowInputs}>
              <Input
                label="Start Date"
                value={formData.startDate}
                onChangeText={(value) => handleInputChange('startDate', value)}
                placeholder="DD/MM/YYYY"
                leftIcon="calendar"
                containerStyle={[styles.input, styles.halfInput]}
              />

              <Input
                label="End Date"
                value={formData.endDate}
                onChangeText={(value) => handleInputChange('endDate', value)}
                placeholder="DD/MM/YYYY"
                leftIcon="calendar"
                containerStyle={[styles.input, styles.halfInput]}
              />
            </View>

            <View style={styles.rowInputs}>
              <Input
                label="Start Time"
                value={formData.startTime}
                onChangeText={(value) => handleInputChange('startTime', value)}
                placeholder="HH:MM"
                leftIcon="time"
                containerStyle={[styles.input, styles.halfInput]}
              />

              <Input
                label="End Time"
                value={formData.endTime}
                onChangeText={(value) => handleInputChange('endTime', value)}
                placeholder="HH:MM"
                leftIcon="time"
                containerStyle={[styles.input, styles.halfInput]}
              />
            </View>

            <Input
              label="Pickup Location"
              value={formData.pickupLocation}
              onChangeText={(value) => handleInputChange('pickupLocation', value)}
              placeholder="Enter pickup location"
              leftIcon="location"
              containerStyle={styles.input}
            />

            <Input
              label="Dropoff Location"
              value={formData.dropoffLocation}
              onChangeText={(value) => handleInputChange('dropoffLocation', value)}
              placeholder="Enter dropoff location"
              leftIcon="flag"
              containerStyle={styles.input}
            />
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContent}>
            <Input
              label="Total Amount"
              value={formData.totalAmount}
              onChangeText={(value) => handleInputChange('totalAmount', value)}
              placeholder="Enter total amount"
              leftIcon="cash"
              keyboardType="numeric"
              containerStyle={styles.input}
            />

            <Input
              label="Advance Amount"
              value={formData.advanceAmount}
              onChangeText={(value) => handleInputChange('advanceAmount', value)}
              placeholder="Enter advance amount"
              leftIcon="card"
              keyboardType="numeric"
              containerStyle={styles.input}
            />

            <Input
              label="Notes"
              value={formData.notes}
              onChangeText={(value) => handleInputChange('notes', value)}
              placeholder="Add any special notes"
              leftIcon="document-text"
              multiline
              numberOfLines={3}
              containerStyle={styles.input}
            />

            <Card variant="outlined" size="md" style={styles.paymentCard}>
              <Text style={styles.paymentTitle}>Payment Summary</Text>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Total Amount:</Text>
                <Text style={styles.paymentValue}>₹{formData.totalAmount || '0'}</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Advance Amount:</Text>
                <Text style={styles.paymentValue}>₹{formData.advanceAmount || '0'}</Text>
              </View>
              <View style={styles.paymentDivider} />
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Balance Amount:</Text>
                <Text style={[styles.paymentValue, { color: BrandColors.warning }]}>
                  ₹{(parseInt(formData.totalAmount || '0') - parseInt(formData.advanceAmount || '0'))}
                </Text>
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
        return formData.customerName && formData.customerPhone && formData.customerEmail;
      case 1:
        return formData.vehicleId;
      case 2:
        return formData.startDate && formData.endDate && formData.pickupLocation && formData.dropoffLocation;
      case 3:
        return formData.totalAmount && formData.advanceAmount;
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
            <Text style={styles.title}>Create Booking</Text>
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
              title={currentStep === steps.length - 1 ? 'Create Booking' : 'Next'}
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

  // Vehicle Selection
  vehicleTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.backgroundCard,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  vehicleItemSelected: {
    borderColor: BrandColors.primary,
    backgroundColor: `${BrandColors.primary}10`,
  },
  vehicleItemDisabled: {
    opacity: 0.5,
  },
  vehicleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehicleIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  vehicleNameDisabled: {
    color: BrandColors.textLight,
  },
  vehiclePlate: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  vehiclePlateDisabled: {
    color: BrandColors.textLight,
  },
  vehicleStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleStatusText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    marginLeft: Spacing.xs,
  },
  vehicleRight: {
    alignItems: 'flex-end',
  },
  vehiclePrice: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.accent,
  },
  vehiclePriceDisabled: {
    color: BrandColors.textLight,
  },

  // Payment
  paymentCard: {
    marginTop: Spacing.md,
  },
  paymentTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  paymentLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },
  paymentValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
  },
  paymentDivider: {
    height: 1,
    backgroundColor: BrandColors.borderLight,
    marginVertical: Spacing.sm,
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
