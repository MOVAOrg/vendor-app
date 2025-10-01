import { ThemedView } from '../../components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Features & Specs Screen - Configure vehicle features and specifications
 * Second step in adding a new vehicle to the fleet
 */
export default function FeaturesSpecsScreen({ navigation, route }: any) {
  const { basicDetails } = route.params || {};

  const [features, setFeatures] = useState({
    // Interior Features
    ac: true,
    powerSteering: true,
    powerWindows: true,
    centralLocking: true,
    musicSystem: false,
    bluetooth: false,
    usbCharging: false,
    gpsNavigation: false,
    rearCamera: false,
    parkingSensors: false,
    sunroof: false,
    leatherSeats: false,

    // Exterior Features
    alloyWheels: false,
    fogLights: false,
    ledHeadlights: false,
    bodyKit: false,

    // Safety Features
    airbags: false,
    abs: false,
    esp: false,
    tractionControl: false,
    hillAssist: false,
    childSafetyLocks: false,

    // Additional Features
    spareTire: true,
    toolKit: true,
    firstAidKit: false,
    fireExtinguisher: false,
    emergencyKit: false,
  });

  const [specifications, setSpecifications] = useState({
    engineCapacity: '',
    power: '',
    torque: '',
    mileage: '',
    fuelTankCapacity: '',
    groundClearance: '',
    bootSpace: '',
    wheelbase: '',
    turningRadius: '',
  });

  const [loading, setLoading] = useState(false);

  // Feature categories
  const featureCategories = [
    {
      title: 'Interior Features',
      icon: 'car-outline',
      features: [
        { key: 'ac', label: 'Air Conditioning', description: 'Climate control system' },
        { key: 'powerSteering', label: 'Power Steering', description: 'Electric power steering' },
        { key: 'powerWindows', label: 'Power Windows', description: 'Electric window controls' },
        { key: 'centralLocking', label: 'Central Locking', description: 'Remote central locking' },
        { key: 'musicSystem', label: 'Music System', description: 'Audio entertainment system' },
        { key: 'bluetooth', label: 'Bluetooth', description: 'Wireless connectivity' },
        { key: 'usbCharging', label: 'USB Charging', description: 'USB ports for charging' },
        { key: 'gpsNavigation', label: 'GPS Navigation', description: 'Built-in navigation system' },
        { key: 'rearCamera', label: 'Rear Camera', description: 'Rear view camera' },
        { key: 'parkingSensors', label: 'Parking Sensors', description: 'Parking assistance sensors' },
        { key: 'sunroof', label: 'Sunroof', description: 'Panoramic or regular sunroof' },
        { key: 'leatherSeats', label: 'Leather Seats', description: 'Premium leather upholstery' },
      ],
    },
    {
      title: 'Exterior Features',
      icon: 'car-sport-outline',
      features: [
        { key: 'alloyWheels', label: 'Alloy Wheels', description: 'Premium alloy wheel design' },
        { key: 'fogLights', label: 'Fog Lights', description: 'Front fog lights' },
        { key: 'ledHeadlights', label: 'LED Headlights', description: 'LED headlight system' },
        { key: 'bodyKit', label: 'Body Kit', description: 'Sport body kit' },
      ],
    },
    {
      title: 'Safety Features',
      icon: 'shield-checkmark-outline',
      features: [
        { key: 'airbags', label: 'Airbags', description: 'Multiple airbag system' },
        { key: 'abs', label: 'ABS', description: 'Anti-lock braking system' },
        { key: 'esp', label: 'ESP', description: 'Electronic stability program' },
        { key: 'tractionControl', label: 'Traction Control', description: 'Traction control system' },
        { key: 'hillAssist', label: 'Hill Assist', description: 'Hill start assist' },
        { key: 'childSafetyLocks', label: 'Child Safety Locks', description: 'Child safety door locks' },
      ],
    },
    {
      title: 'Additional Features',
      icon: 'add-circle-outline',
      features: [
        { key: 'spareTire', label: 'Spare Tire', description: 'Extra tire included' },
        { key: 'toolKit', label: 'Tool Kit', description: 'Basic tool kit' },
        { key: 'firstAidKit', label: 'First Aid Kit', description: 'Medical emergency kit' },
        { key: 'fireExtinguisher', label: 'Fire Extinguisher', description: 'Safety fire extinguisher' },
        { key: 'emergencyKit', label: 'Emergency Kit', description: 'Complete emergency kit' },
      ],
    },
  ];

  // Handle feature toggle
  const toggleFeature = (featureKey: string) => {
    setFeatures(prev => ({
      ...prev,
      [featureKey]: !prev[featureKey as keyof typeof prev],
    }));
  };

  // Handle specification input
  const handleSpecChange = (specKey: string, value: string) => {
    setSpecifications(prev => ({
      ...prev,
      [specKey]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    if (!specifications.engineCapacity.trim()) {
      Alert.alert('Error', 'Please enter engine capacity');
      return false;
    }
    if (!specifications.mileage.trim()) {
      Alert.alert('Error', 'Please enter mileage');
      return false;
    }
    return true;
  };

  // Handle continue
  const handleContinue = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const vehicleData = {
        ...basicDetails,
        features,
        specifications,
      };

      // TODO: Save to local state or API
      console.log('Vehicle data:', vehicleData);

      // Navigate to photos and documents screen
      navigation.navigate('PhotosDocumentsScreen', { vehicleData });
    } catch (error) {
      console.error('Error saving features and specs:', error);
      Alert.alert('Error', 'Failed to save vehicle details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render feature category
  const renderFeatureCategory = (category: any) => (
    <View key={category.title} style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <Ionicons name={category.icon} size={24} color="#007AFF" />
        <Text style={styles.categoryTitle}>{category.title}</Text>
      </View>

      <View style={styles.featuresContainer}>
        {category.features.map((feature: any) => (
          <View key={feature.key} style={styles.featureItem}>
            <View style={styles.featureInfo}>
              <Text style={styles.featureLabel}>{feature.label}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
            <Switch
              value={features[feature.key as keyof typeof features]}
              onValueChange={() => toggleFeature(feature.key)}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Features & Specs</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
          <Text style={styles.progressText}>Step 2 of 4</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Vehicle Features</Text>
          <Text style={styles.subtitle}>
            Configure the features and specifications of your vehicle
          </Text>

          {/* Specifications Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Specifications</Text>

            <View style={styles.specsGrid}>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Engine Capacity (cc)</Text>
                <Text style={styles.specValue}>{specifications.engineCapacity || 'Not specified'}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Power (bhp)</Text>
                <Text style={styles.specValue}>{specifications.power || 'Not specified'}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Torque (Nm)</Text>
                <Text style={styles.specValue}>{specifications.torque || 'Not specified'}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Mileage (km/l)</Text>
                <Text style={styles.specValue}>{specifications.mileage || 'Not specified'}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Fuel Tank (L)</Text>
                <Text style={styles.specValue}>{specifications.fuelTankCapacity || 'Not specified'}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Ground Clearance (mm)</Text>
                <Text style={styles.specValue}>{specifications.groundClearance || 'Not specified'}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.editSpecsButton}>
              <Ionicons name="create-outline" size={16} color="#007AFF" />
              <Text style={styles.editSpecsText}>Edit Specifications</Text>
            </TouchableOpacity>
          </View>

          {/* Features Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vehicle Features</Text>
            {featureCategories.map(renderFeatureCategory)}
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[styles.continueButton, loading && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={loading}
          >
            <Text style={styles.continueButtonText}>
              {loading ? 'Saving...' : 'Continue'}
            </Text>
          </TouchableOpacity>

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    lineHeight: 22,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  specsGrid: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  specLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  specValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  editSpecsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  editSpecsText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 4,
    fontWeight: '500',
  },
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 12,
  },
  featuresContainer: {
    padding: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  featureInfo: {
    flex: 1,
    marginRight: 16,
  },
  featureLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 40,
  },
});
