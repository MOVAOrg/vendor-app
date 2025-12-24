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

export default function EditVehicleScreen({ navigation, route }: any) {
  const { vehicle } = route.params || {};
  const [formData, setFormData] = useState({
    vehicleName: vehicle?.name || '',
    brand: vehicle?.brand || '',
    model: vehicle?.model || '',
    year: vehicle?.year || '',
    color: vehicle?.color || '',
    licensePlate: vehicle?.licensePlate || '',
    vehicleType: vehicle?.type || '',
    fuelType: vehicle?.fuelType || '',
    transmission: vehicle?.transmission || '',
    seatingCapacity: vehicle?.seatingCapacity || '',
    mileage: vehicle?.mileage || '',
    pricePerDay: vehicle?.pricePerDay || '',
    description: vehicle?.description || '',
    features: vehicle?.features || [],
    status: vehicle?.status || 'available',
  });
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const vehicleTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Truck', 'Van'];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const transmissionTypes = ['Manual', 'Automatic', 'CVT'];
  const statusOptions = ['available', 'booked', 'maintenance'];
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

  const handleStatusChange = (status: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFormData(prev => ({ ...prev, status }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Success',
        'Vehicle updated successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update vehicle. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Vehicle',
      'Are you sure you want to delete this vehicle? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            // Handle delete logic
            navigation.navigate('MyFleetScreen');
          },
        },
      ]
    );
  };

  const isFormValid = () => {
    return formData.vehicleName &&
           formData.brand &&
           formData.model &&
           formData.year &&
           formData.licensePlate &&
           formData.pricePerDay;
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
            <Text style={styles.title}>Edit Vehicle</Text>
            <Text style={styles.subtitle}>
              Update vehicle information
            </Text>
          </View>
        </Animated.View>

        {/* Form Content */}
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
          {/* Basic Information */}
          <Card variant="elevated" size="lg" style={styles.formCard}>
            <Text style={styles.sectionTitle}>Basic Information</Text>

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
          </Card>

          {/* Specifications */}
          <Card variant="elevated" size="lg" style={styles.formCard}>
            <Text style={styles.sectionTitle}>Specifications</Text>

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
          </Card>

          {/* Pricing & Status */}
          <Card variant="elevated" size="lg" style={styles.formCard}>
            <Text style={styles.sectionTitle}>Pricing & Status</Text>

            <Input
              label="Price Per Day"
              value={formData.pricePerDay}
              onChangeText={(value) => handleInputChange('pricePerDay', value)}
              placeholder="Enter daily rate"
              leftIcon="cash"
              keyboardType="numeric"
              containerStyle={styles.input}
            />

            <Text style={styles.statusTitle}>Current Status</Text>
            <View style={styles.statusOptions}>
              {statusOptions.map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusOption,
                    formData.status === status && styles.statusOptionSelected,
                  ]}
                  onPress={() => handleStatusChange(status)}
                >
                  <Text style={[
                    styles.statusOptionText,
                    formData.status === status && styles.statusOptionTextSelected,
                  ]}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          {/* Features */}
          <Card variant="elevated" size="lg" style={styles.formCard}>
            <Text style={styles.sectionTitle}>Features</Text>
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
          </Card>

          {/* Description */}
          <Card variant="elevated" size="lg" style={styles.formCard}>
            <Text style={styles.sectionTitle}>Description</Text>

            <Input
              label="Vehicle Description"
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              placeholder="Describe your vehicle"
              leftIcon="document-text"
              multiline
              numberOfLines={4}
              containerStyle={styles.input}
            />
          </Card>
        </Animated.View>

        {/* Action Buttons */}
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
            <Button
              title="Delete Vehicle"
              onPress={handleDelete}
              variant="outline"
              size="lg"
              icon="trash"
              iconPosition="left"
              style={styles.deleteButton}
            />

            <Button
              title="Save Changes"
              onPress={handleSave}
              variant="primary"
              size="lg"
              loading={isLoading}
              disabled={!isFormValid()}
              icon="checkmark"
              iconPosition="right"
              style={styles.saveButton}
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

  // Content
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  formCard: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
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

  // Status
  statusTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  statusOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusOption: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  statusOptionSelected: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  statusOptionText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  statusOptionTextSelected: {
    color: BrandColors.secondary,
  },

  // Features
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

  // Buttons
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    flex: 1,
    marginRight: Spacing.md,
  },
  saveButton: {
    flex: 1,
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
