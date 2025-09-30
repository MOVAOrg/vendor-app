import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Edit Vehicle Screen - Modify existing vehicle details
 * Allows vendors to update vehicle information, pricing, and availability
 */
export default function EditVehicleScreen({ navigation, route }: any) {
  const { vehicle } = route.params || {};

  const [vehicleDetails, setVehicleDetails] = useState({
    make: vehicle?.make || 'Maruti',
    model: vehicle?.model || 'Swift Dzire',
    year: vehicle?.year || '2022',
    color: vehicle?.color || 'White',
    licensePlate: vehicle?.licensePlate || 'KA01AB1234',
    vin: vehicle?.vin || '',
    engineNumber: vehicle?.engineNumber || '',
    chassisNumber: vehicle?.chassisNumber || '',
    fuelType: vehicle?.fuelType || 'petrol',
    transmission: vehicle?.transmission || 'manual',
    bodyType: vehicle?.bodyType || 'sedan',
    seatingCapacity: vehicle?.seatingCapacity || '5',
    mileage: vehicle?.mileage || '18',
    engineCapacity: vehicle?.engineCapacity || '1200',
  });

  const [pricing, setPricing] = useState({
    hourlyRate: vehicle?.hourlyRate || '150',
    dailyRate: vehicle?.dailyRate || '1200',
    weeklyRate: vehicle?.weeklyRate || '7500',
    monthlyRate: vehicle?.monthlyRate || '25000',
    securityDeposit: vehicle?.securityDeposit || '5000',
    cleaningFee: vehicle?.cleaningFee || '200',
    lateReturnFee: vehicle?.lateReturnFee || '500',
  });

  const [availability, setAvailability] = useState({
    isAvailable: vehicle?.isAvailable || true,
    advanceBookingDays: vehicle?.advanceBookingDays || '7',
    minimumRentalHours: vehicle?.minimumRentalHours || '4',
    pickupTime: vehicle?.pickupTime || '08:00',
    dropoffTime: vehicle?.dropoffTime || '20:00',
  });

  const [loading, setLoading] = useState(false);

  // Handle basic details change
  const handleBasicDetailsChange = (field: string, value: string) => {
    setVehicleDetails(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle pricing change
  const handlePricingChange = (field: string, value: string) => {
    setPricing(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle availability change
  const handleAvailabilityChange = (field: string, value: string | boolean) => {
    setAvailability(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    if (!vehicleDetails.make.trim()) {
      Alert.alert('Error', 'Please enter vehicle make');
      return false;
    }
    if (!vehicleDetails.model.trim()) {
      Alert.alert('Error', 'Please enter vehicle model');
      return false;
    }
    if (!vehicleDetails.dailyRate.trim()) {
      Alert.alert('Error', 'Please enter daily rate');
      return false;
    }
    return true;
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const updatedVehicle = {
        ...vehicle,
        ...vehicleDetails,
        ...pricing,
        ...availability,
        updatedAt: new Date().toISOString(),
      };

      // TODO: Implement actual API call to update vehicle
      // await vehicleService.updateVehicle(vehicle.id, updatedVehicle);

      Alert.alert(
        'Vehicle Updated',
        'Your vehicle details have been updated successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Error updating vehicle:', error);
      Alert.alert('Error', 'Failed to update vehicle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete vehicle
  const handleDeleteVehicle = () => {
    Alert.alert(
      'Delete Vehicle',
      'Are you sure you want to delete this vehicle? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement delete vehicle API
            Alert.alert('Vehicle Deleted', 'Vehicle has been removed from your fleet.');
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Vehicle</Text>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Vehicle Photo */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: vehicle?.image || 'https://via.placeholder.com/300x200' }}
              style={styles.vehiclePhoto}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.changePhotoButton}>
              <Ionicons name="camera" size={16} color="#007AFF" />
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Basic Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Details</Text>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Make *</Text>
                <TextInput
                  style={styles.input}
                  value={vehicleDetails.make}
                  onChangeText={(value) => handleBasicDetailsChange('make', value)}
                  placeholder="Enter make"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Model *</Text>
                <TextInput
                  style={styles.input}
                  value={vehicleDetails.model}
                  onChangeText={(value) => handleBasicDetailsChange('model', value)}
                  placeholder="Enter model"
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Year</Text>
                <TextInput
                  style={styles.input}
                  value={vehicleDetails.year}
                  onChangeText={(value) => handleBasicDetailsChange('year', value)}
                  placeholder="Enter year"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Color</Text>
                <TextInput
                  style={styles.input}
                  value={vehicleDetails.color}
                  onChangeText={(value) => handleBasicDetailsChange('color', value)}
                  placeholder="Enter color"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>License Plate</Text>
              <TextInput
                style={styles.input}
                value={vehicleDetails.licensePlate}
                onChangeText={(value) => handleBasicDetailsChange('licensePlate', value)}
                placeholder="Enter license plate"
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Fuel Type</Text>
                <View style={styles.selectorContainer}>
                  {['petrol', 'diesel', 'cng', 'electric'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.selectorOption,
                        vehicleDetails.fuelType === type && styles.selectorOptionSelected,
                      ]}
                      onPress={() => handleBasicDetailsChange('fuelType', type)}
                    >
                      <Text style={[
                        styles.selectorText,
                        vehicleDetails.fuelType === type && styles.selectorTextSelected,
                      ]}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Transmission</Text>
                <View style={styles.selectorContainer}>
                  {['manual', 'automatic'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.selectorOption,
                        vehicleDetails.transmission === type && styles.selectorOptionSelected,
                      ]}
                      onPress={() => handleBasicDetailsChange('transmission', type)}
                    >
                      <Text style={[
                        styles.selectorText,
                        vehicleDetails.transmission === type && styles.selectorTextSelected,
                      ]}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Pricing Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pricing</Text>

            <View style={styles.pricingCard}>
              <View style={styles.inputRow}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Hourly Rate (₹)</Text>
                  <TextInput
                    style={styles.input}
                    value={pricing.hourlyRate}
                    onChangeText={(value) => handlePricingChange('hourlyRate', value)}
                    placeholder="Enter hourly rate"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Daily Rate (₹) *</Text>
                  <TextInput
                    style={styles.input}
                    value={pricing.dailyRate}
                    onChangeText={(value) => handlePricingChange('dailyRate', value)}
                    placeholder="Enter daily rate"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Weekly Rate (₹)</Text>
                  <TextInput
                    style={styles.input}
                    value={pricing.weeklyRate}
                    onChangeText={(value) => handlePricingChange('weeklyRate', value)}
                    placeholder="Enter weekly rate"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Monthly Rate (₹)</Text>
                  <TextInput
                    style={styles.input}
                    value={pricing.monthlyRate}
                    onChangeText={(value) => handlePricingChange('monthlyRate', value)}
                    placeholder="Enter monthly rate"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Security Deposit (₹)</Text>
                  <TextInput
                    style={styles.input}
                    value={pricing.securityDeposit}
                    onChangeText={(value) => handlePricingChange('securityDeposit', value)}
                    placeholder="Enter security deposit"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Cleaning Fee (₹)</Text>
                  <TextInput
                    style={styles.input}
                    value={pricing.cleaningFee}
                    onChangeText={(value) => handlePricingChange('cleaningFee', value)}
                    placeholder="Enter cleaning fee"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Availability Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Availability</Text>

            <View style={styles.availabilityCard}>
              <View style={styles.availabilityItem}>
                <Text style={styles.availabilityLabel}>Vehicle Available</Text>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    availability.isAvailable && styles.toggleButtonActive,
                  ]}
                  onPress={() => handleAvailabilityChange('isAvailable', !availability.isAvailable)}
                >
                  <View style={[
                    styles.toggleThumb,
                    availability.isAvailable && styles.toggleThumbActive,
                  ]} />
                </TouchableOpacity>
              </View>

              <View style={styles.inputRow}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Advance Booking (Days)</Text>
                  <TextInput
                    style={styles.input}
                    value={availability.advanceBookingDays}
                    onChangeText={(value) => handleAvailabilityChange('advanceBookingDays', value)}
                    placeholder="Enter days"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Min Rental (Hours)</Text>
                  <TextInput
                    style={styles.input}
                    value={availability.minimumRentalHours}
                    onChangeText={(value) => handleAvailabilityChange('minimumRentalHours', value)}
                    placeholder="Enter hours"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Actions Section */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.saveChangesButton} onPress={handleSaveChanges}>
              <Text style={styles.saveChangesText}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteVehicle}>
              <Ionicons name="trash-outline" size={20} color="#FF3B30" />
              <Text style={styles.deleteButtonText}>Delete Vehicle</Text>
            </TouchableOpacity>
          </View>

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
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  photoSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  photoContainer: {
    alignItems: 'center',
  },
  vehiclePhoto: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  changePhotoText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 4,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 20,
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
  inputRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#FFFFFF',
  },
  selectorContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  selectorOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  selectorOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  selectorText: {
    fontSize: 14,
    color: '#666',
  },
  selectorTextSelected: {
    color: '#007AFF',
    fontWeight: '500',
  },
  pricingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  availabilityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  availabilityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 16,
  },
  availabilityLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  toggleButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleButtonActive: {
    backgroundColor: '#007AFF',
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  saveChangesButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveChangesText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE5E5',
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500',
    marginLeft: 8,
  },
  bottomSpacer: {
    height: 40,
  },
});
