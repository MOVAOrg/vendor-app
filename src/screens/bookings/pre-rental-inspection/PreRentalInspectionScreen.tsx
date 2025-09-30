import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Pre-Rental Inspection Screen - Conduct vehicle inspection before rental
 * Documents vehicle condition, damages, and prepares for customer handover
 */
export default function PreRentalInspectionScreen({ navigation, route }: any) {
  const { bookingId, vehicleId } = route.params || {};

  const [inspectionData, setInspectionData] = useState({
    bookingId: bookingId || 'MOV-12345',
    vehicleId: vehicleId || 'VEH-001',
    inspectionDate: new Date().toISOString().split('T')[0],
    inspectorName: 'John Doe',
    vehicleCondition: {
      exterior: {
        front: { condition: 'good', notes: '' },
        rear: { condition: 'good', notes: '' },
        leftSide: { condition: 'good', notes: '' },
        rightSide: { condition: 'good', notes: '' },
        roof: { condition: 'good', notes: '' },
        wheels: { condition: 'good', notes: '' },
        lights: { condition: 'good', notes: '' },
        mirrors: { condition: 'good', notes: '' },
      },
      interior: {
        seats: { condition: 'good', notes: '' },
        dashboard: { condition: 'good', notes: '' },
        steering: { condition: 'good', notes: '' },
        gearbox: { condition: 'good', notes: '' },
        airConditioning: { condition: 'good', notes: '' },
        radio: { condition: 'good', notes: '' },
        windows: { condition: 'good', notes: '' },
        roof: { condition: 'good', notes: '' },
      },
      engine: {
        oil: { condition: 'good', notes: '' },
        coolant: { condition: 'good', notes: '' },
        battery: { condition: 'good', notes: '' },
        belts: { condition: 'good', notes: '' },
        filters: { condition: 'good', notes: '' },
      },
      documents: {
        rc: { present: true, notes: '' },
        insurance: { present: true, notes: '' },
        pollution: { present: true, notes: '' },
        fitness: { present: true, notes: '' },
        drivingLicense: { present: true, notes: '' },
      },
      accessories: {
        spareTire: { present: true, condition: 'good', notes: '' },
        jack: { present: true, condition: 'good', notes: '' },
        toolkit: { present: true, condition: 'good', notes: '' },
        firstAidKit: { present: true, condition: 'good', notes: '' },
        fireExtinguisher: { present: true, condition: 'good', notes: '' },
      },
    },
    odometerReading: '',
    fuelLevel: 'full',
    overallCondition: 'good',
    notes: '',
    photos: [],
    customerPresent: false,
    customerSignature: null,
  });

  const conditionOptions = [
    { key: 'excellent', label: 'Excellent', color: '#34C759' },
    { key: 'good', label: 'Good', color: '#007AFF' },
    { key: 'fair', label: 'Fair', color: '#FF9500' },
    { key: 'poor', label: 'Poor', color: '#FF3B30' },
  ];

  const fuelLevelOptions = [
    { key: 'full', label: 'Full' },
    { key: 'three_quarter', label: '3/4' },
    { key: 'half', label: '1/2' },
    { key: 'quarter', label: '1/4' },
    { key: 'empty', label: 'Empty' },
  ];

  const updateCondition = (section: string, item: string, field: string, value: any) => {
    setInspectionData(prev => ({
      ...prev,
      vehicleCondition: {
        ...prev.vehicleCondition,
        [section]: {
          ...prev.vehicleCondition[section as keyof typeof prev.vehicleCondition],
          [item]: {
            ...(prev.vehicleCondition[section as keyof typeof prev.vehicleCondition] as any)[item],
            [field]: value,
          },
        },
      },
    }));
  };

  const updateDocument = (document: string, field: string, value: any) => {
    setInspectionData(prev => ({
      ...prev,
      vehicleCondition: {
        ...prev.vehicleCondition,
        documents: {
          ...prev.vehicleCondition.documents,
          [document]: {
            ...prev.vehicleCondition.documents[document as keyof typeof prev.vehicleCondition.documents],
            [field]: value,
          },
        },
      },
    }));
  };

  const updateAccessory = (accessory: string, field: string, value: any) => {
    setInspectionData(prev => ({
      ...prev,
      vehicleCondition: {
        ...prev.vehicleCondition,
        accessories: {
          ...prev.vehicleCondition.accessories,
          [accessory]: {
            ...prev.vehicleCondition.accessories[accessory as keyof typeof prev.vehicleCondition.accessories],
            [field]: value,
          },
        },
      },
    }));
  };

  const getConditionColor = (condition: string) => {
    const option = conditionOptions.find(opt => opt.key === condition);
    return option ? option.color : '#666';
  };

  const renderConditionSelector = (section: string, item: string, currentCondition: string) => (
    <View style={styles.conditionSelector}>
      {conditionOptions.map(option => (
        <TouchableOpacity
          key={option.key}
          style={[
            styles.conditionButton,
            currentCondition === option.key && styles.selectedConditionButton,
            { borderColor: option.color }
          ]}
          onPress={() => updateCondition(section, item, 'condition', option.key)}
        >
          <Text style={[
            styles.conditionButtonText,
            currentCondition === option.key && { color: option.color }
          ]}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderNotesInput = (section: string, item: string, currentNotes: string) => (
    <TextInput
      style={styles.notesInput}
      value={currentNotes}
      onChangeText={(text) => updateCondition(section, item, 'notes', text)}
      placeholder="Add notes..."
      multiline
      numberOfLines={2}
      placeholderTextColor="#C7C7CC"
    />
  );

  const renderDocumentItem = (document: string, data: any) => (
    <View key={document} style={styles.documentItem}>
      <View style={styles.documentHeader}>
        <Text style={styles.documentName}>{document.toUpperCase()}</Text>
        <Switch
          value={data.present}
          onValueChange={(value) => updateDocument(document, 'present', value)}
          trackColor={{ false: '#E5E5EA', true: '#34C759' }}
          thumbColor={data.present ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>
      {data.present && (
        <TextInput
          style={styles.notesInput}
          value={data.notes}
          onChangeText={(text) => updateDocument(document, 'notes', text)}
          placeholder="Document notes..."
          multiline
          numberOfLines={2}
          placeholderTextColor="#C7C7CC"
        />
      )}
    </View>
  );

  const renderAccessoryItem = (accessory: string, data: any) => (
    <View key={accessory} style={styles.accessoryItem}>
      <View style={styles.accessoryHeader}>
        <Text style={styles.accessoryName}>{accessory.replace(/([A-Z])/g, ' $1').trim()}</Text>
        <Switch
          value={data.present}
          onValueChange={(value) => updateAccessory(accessory, 'present', value)}
          trackColor={{ false: '#E5E5EA', true: '#34C759' }}
          thumbColor={data.present ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>
      {data.present && (
        <View style={styles.accessoryCondition}>
          {renderConditionSelector('accessories', accessory, data.condition)}
          {renderNotesInput('accessories', accessory, data.notes)}
        </View>
      )}
    </View>
  );

  const handleSubmitInspection = () => {
    // Validate required fields
    if (!inspectionData.odometerReading) {
      Alert.alert('Missing Information', 'Please enter the odometer reading.');
      return;
    }

    Alert.alert(
      'Submit Inspection',
      'Are you sure you want to submit this inspection report?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit',
          onPress: () => {
            // TODO: Implement actual API call to submit inspection
            console.log('Submitting inspection:', inspectionData);

            Alert.alert(
              'Inspection Submitted',
              'The pre-rental inspection has been completed and submitted successfully.',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]
            );
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
          <Text style={styles.headerTitle}>Pre-Rental Inspection</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Inspection Info */}
        <View style={styles.infoCard}>
          <Text style={styles.bookingId}>Booking: {inspectionData.bookingId}</Text>
          <Text style={styles.vehicleId}>Vehicle: {inspectionData.vehicleId}</Text>
          <Text style={styles.inspectionDate}>Date: {inspectionData.inspectionDate}</Text>
          <Text style={styles.inspectorName}>Inspector: {inspectionData.inspectorName}</Text>
        </View>

        {/* Basic Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Odometer Reading (km)</Text>
            <TextInput
              style={styles.textInput}
              value={inspectionData.odometerReading}
              onChangeText={(text) => setInspectionData(prev => ({ ...prev, odometerReading: text }))}
              placeholder="Enter odometer reading"
              keyboardType="numeric"
              placeholderTextColor="#C7C7CC"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Fuel Level</Text>
            <View style={styles.fuelLevelSelector}>
              {fuelLevelOptions.map(option => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.fuelLevelButton,
                    inspectionData.fuelLevel === option.key && styles.selectedFuelLevelButton,
                  ]}
                  onPress={() => setInspectionData(prev => ({ ...prev, fuelLevel: option.key }))}
                >
                  <Text style={[
                    styles.fuelLevelButtonText,
                    inspectionData.fuelLevel === option.key && styles.selectedFuelLevelButtonText,
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Overall Vehicle Condition</Text>
            {renderConditionSelector('overall', 'condition', inspectionData.overallCondition)}
          </View>
        </View>

        {/* Exterior Inspection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exterior Inspection</Text>
          {Object.entries(inspectionData.vehicleCondition.exterior).map(([item, data]) => (
            <View key={item} style={styles.inspectionItem}>
              <Text style={styles.itemName}>{item.replace(/([A-Z])/g, ' $1').trim()}</Text>
              {renderConditionSelector('exterior', item, data.condition)}
              {renderNotesInput('exterior', item, data.notes)}
            </View>
          ))}
        </View>

        {/* Interior Inspection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interior Inspection</Text>
          {Object.entries(inspectionData.vehicleCondition.interior).map(([item, data]) => (
            <View key={item} style={styles.inspectionItem}>
              <Text style={styles.itemName}>{item.replace(/([A-Z])/g, ' $1').trim()}</Text>
              {renderConditionSelector('interior', item, data.condition)}
              {renderNotesInput('interior', item, data.notes)}
            </View>
          ))}
        </View>

        {/* Engine Inspection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Engine Inspection</Text>
          {Object.entries(inspectionData.vehicleCondition.engine).map(([item, data]) => (
            <View key={item} style={styles.inspectionItem}>
              <Text style={styles.itemName}>{item.replace(/([A-Z])/g, ' $1').trim()}</Text>
              {renderConditionSelector('engine', item, data.condition)}
              {renderNotesInput('engine', item, data.notes)}
            </View>
          ))}
        </View>

        {/* Documents Check */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents Check</Text>
          <View style={styles.documentsCard}>
            {Object.entries(inspectionData.vehicleCondition.documents).map(([document, data]) =>
              renderDocumentItem(document, data)
            )}
          </View>
        </View>

        {/* Accessories Check */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessories Check</Text>
          <View style={styles.accessoriesCard}>
            {Object.entries(inspectionData.vehicleCondition.accessories).map(([accessory, data]) =>
              renderAccessoryItem(accessory, data)
            )}
          </View>
        </View>

        {/* Customer Presence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.customerCard}>
            <View style={styles.customerItem}>
              <Text style={styles.customerLabel}>Customer Present During Inspection</Text>
              <Switch
                value={inspectionData.customerPresent}
                onValueChange={(value) => setInspectionData(prev => ({ ...prev, customerPresent: value }))}
                trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                thumbColor={inspectionData.customerPresent ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
          </View>
        </View>

        {/* Additional Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <TextInput
            style={styles.notesTextArea}
            value={inspectionData.notes}
            onChangeText={(text) => setInspectionData(prev => ({ ...prev, notes: text }))}
            placeholder="Enter any additional notes or observations..."
            multiline
            numberOfLines={4}
            placeholderTextColor="#C7C7CC"
          />
        </View>

        {/* Submit Button */}
        <View style={styles.submitSection}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitInspection}>
            <Text style={styles.submitButtonText}>Submit Inspection Report</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookingId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  vehicleId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  inspectionDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  inspectorName: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  fuelLevelSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  fuelLevelButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  selectedFuelLevelButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  fuelLevelButtonText: {
    fontSize: 14,
    color: '#666',
  },
  selectedFuelLevelButtonText: {
    color: '#FFFFFF',
  },
  inspectionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  conditionSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  conditionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#F8F9FA',
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  selectedConditionButton: {
    backgroundColor: '#F0F8FF',
  },
  conditionButtonText: {
    fontSize: 12,
    color: '#666',
  },
  notesInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginTop: 8,
  },
  documentsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  documentItem: {
    marginBottom: 12,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  documentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  accessoriesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  accessoryItem: {
    marginBottom: 12,
  },
  accessoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  accessoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  accessoryCondition: {
    marginTop: 8,
  },
  customerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  customerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerLabel: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  notesTextArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    textAlignVertical: 'top',
  },
  submitSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#34C759',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: 40,
  },
});
