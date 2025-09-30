import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Add Maintenance Screen - Record vehicle maintenance activities
 * Allows vendors to log maintenance activities and expenses
 */
export default function AddMaintenanceScreen({ navigation, route }: any) {
  const { vehicle } = route.params || {};

  const [maintenanceData, setMaintenanceData] = useState({
    type: 'routine', // routine, repair, emergency
    date: new Date().toISOString().split('T')[0],
    odometerReading: '',
    serviceType: '', // oil_change, brake_service, engine_service, etc.
    description: '',
    cost: '',
    garageName: '',
    garageContact: '',
    nextServiceDate: '',
    notes: '',
    receipts: [],
  });

  const [loading, setLoading] = useState(false);

  // Maintenance types
  const maintenanceTypes = [
    { key: 'routine', label: 'Routine Service', icon: 'calendar-outline' },
    { key: 'repair', label: 'Repair', icon: 'construct-outline' },
    { key: 'emergency', label: 'Emergency', icon: 'warning-outline' },
  ];

  // Service types
  const serviceTypes = [
    'Oil Change', 'Brake Service', 'Engine Service', 'Transmission Service',
    'Air Filter Replacement', 'Battery Replacement', 'Tire Replacement',
    'Wheel Alignment', 'AC Service', 'Electrical Repair', 'Body Work', 'Other'
  ];

  // Handle input change
  const handleInputChange = (field: string, value: string) => {
    setMaintenanceData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle maintenance type selection
  const handleMaintenanceTypeChange = (type: string) => {
    setMaintenanceData(prev => ({
      ...prev,
      type,
    }));
  };

  // Handle service type selection
  const handleServiceTypeSelection = () => {
    Alert.alert(
      'Select Service Type',
      'Choose the type of service performed',
      [
        ...serviceTypes.map(service => ({
          text: service,
          onPress: () => handleInputChange('serviceType', service),
        })),
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Handle add receipt
  const handleAddReceipt = () => {
    Alert.alert(
      'Add Receipt',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => console.log('Open camera') },
        { text: 'Gallery', onPress: () => console.log('Open gallery') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Validate form
  const validateForm = () => {
    if (!maintenanceData.odometerReading.trim()) {
      Alert.alert('Error', 'Please enter odometer reading');
      return false;
    }
    if (!maintenanceData.serviceType.trim()) {
      Alert.alert('Error', 'Please select service type');
      return false;
    }
    if (!maintenanceData.cost.trim()) {
      Alert.alert('Error', 'Please enter maintenance cost');
      return false;
    }
    return true;
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const maintenanceRecord = {
        ...maintenanceData,
        vehicleId: vehicle?.id,
        vehicleName: `${vehicle?.make} ${vehicle?.model}`,
        createdAt: new Date().toISOString(),
      };

      // TODO: Implement actual API call to save maintenance record
      // await maintenanceService.createMaintenance(maintenanceRecord);

      Alert.alert(
        'Maintenance Record Added',
        'Your maintenance record has been saved successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Error saving maintenance record:', error);
      Alert.alert('Error', 'Failed to save maintenance record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Maintenance</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Vehicle Info */}
        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleName}>{vehicle?.make} {vehicle?.model}</Text>
          <Text style={styles.vehicleDetails}>{vehicle?.licensePlate} • {vehicle?.year}</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Maintenance Record</Text>
          <Text style={styles.subtitle}>
            Record the maintenance activities performed on your vehicle
          </Text>

          {/* Maintenance Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Maintenance Type</Text>
            <View style={styles.typeContainer}>
              {maintenanceTypes.map((type) => (
                <TouchableOpacity
                  key={type.key}
                  style={[
                    styles.typeOption,
                    maintenanceData.type === type.key && styles.typeOptionSelected,
                  ]}
                  onPress={() => handleMaintenanceTypeChange(type.key)}
                >
                  <Ionicons
                    name={type.icon}
                    size={24}
                    color={maintenanceData.type === type.key ? '#007AFF' : '#666'}
                  />
                  <Text style={[
                    styles.typeText,
                    maintenanceData.type === type.key && styles.typeTextSelected,
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Service Date *</Text>
                <TouchableOpacity style={styles.dateInput}>
                  <Text style={styles.dateText}>{maintenanceData.date}</Text>
                  <Ionicons name="calendar-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Odometer Reading (km) *</Text>
                <TextInput
                  style={styles.input}
                  value={maintenanceData.odometerReading}
                  onChangeText={(value) => handleInputChange('odometerReading', value)}
                  placeholder="Enter odometer reading"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Service Type *</Text>
              <TouchableOpacity style={styles.dropdownInput} onPress={handleServiceTypeSelection}>
                <Text style={[
                  styles.dropdownText,
                  !maintenanceData.serviceType && styles.placeholderText
                ]}>
                  {maintenanceData.serviceType || 'Select service type'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={maintenanceData.description}
                onChangeText={(value) => handleInputChange('description', value)}
                placeholder="Describe the maintenance work performed"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Cost Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cost Information</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Total Cost (₹) *</Text>
              <TextInput
                style={styles.input}
                value={maintenanceData.cost}
                onChangeText={(value) => handleInputChange('cost', value)}
                placeholder="Enter total cost"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Garage Name</Text>
                <TextInput
                  style={styles.input}
                  value={maintenanceData.garageName}
                  onChangeText={(value) => handleInputChange('garageName', value)}
                  placeholder="Enter garage name"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contact</Text>
                <TextInput
                  style={styles.input}
                  value={maintenanceData.garageContact}
                  onChangeText={(value) => handleInputChange('garageContact', value)}
                  placeholder="Enter contact number"
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </View>

          {/* Next Service */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Next Service</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Next Service Date</Text>
              <TouchableOpacity style={styles.dateInput}>
                <Text style={[
                  styles.dateText,
                  !maintenanceData.nextServiceDate && styles.placeholderText
                ]}>
                  {maintenanceData.nextServiceDate || 'Select next service date'}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={maintenanceData.notes}
                onChangeText={(value) => handleInputChange('notes', value)}
                placeholder="Additional notes or reminders"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Receipts */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Receipts & Documents</Text>

            <TouchableOpacity style={styles.addReceiptButton} onPress={handleAddReceipt}>
              <Ionicons name="add-circle-outline" size={20} color="#007AFF" />
              <Text style={styles.addReceiptText}>Add Receipt Photo</Text>
            </TouchableOpacity>

            {maintenanceData.receipts.length === 0 && (
              <Text style={styles.noReceiptsText}>No receipts added yet</Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Saving...' : 'Save Maintenance Record'}
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
  vehicleInfo: {
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  vehicleDetails: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    marginTop: 20,
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
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  typeOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  typeOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  typeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  typeTextSelected: {
    color: '#007AFF',
    fontWeight: '500',
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    color: '#999',
  },
  addReceiptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginBottom: 12,
  },
  addReceiptText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 8,
    fontWeight: '500',
  },
  noReceiptsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 40,
  },
});
