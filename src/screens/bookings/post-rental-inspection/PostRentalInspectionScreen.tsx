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
 * Post-Rental Inspection Screen - Conduct vehicle inspection after rental return
 * Documents vehicle condition, damages, and calculates any charges
 */
export default function PostRentalInspectionScreen({ navigation, route }: any) {
  const { bookingId, vehicleId } = route.params || {};

  const [inspectionData, setInspectionData] = useState({
    bookingId: bookingId || 'MOV-12345',
    vehicleId: vehicleId || 'VEH-001',
    inspectionDate: new Date().toISOString().split('T')[0],
    inspectorName: 'John Doe',
    returnTime: new Date().toISOString().split('T')[1].substring(0, 5),
    odometerReading: '',
    fuelLevel: 'three_quarter',
    vehicleCondition: {
      exterior: {
        front: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        rear: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        leftSide: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        rightSide: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        roof: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        wheels: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        lights: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        mirrors: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
      },
      interior: {
        seats: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        dashboard: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        steering: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        gearbox: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        airConditioning: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        radio: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        windows: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        roof: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
      },
      engine: {
        oil: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        coolant: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        battery: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        belts: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        filters: { condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
      },
      accessories: {
        spareTire: { present: true, condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        jack: { present: true, condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        toolkit: { present: true, condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        firstAidKit: { present: true, condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
        fireExtinguisher: { present: true, condition: 'good', damage: false, damageDescription: '', estimatedCost: 0 },
      },
    },
    documents: {
      rc: { present: true, notes: '' },
      insurance: { present: true, notes: '' },
      pollution: { present: true, notes: '' },
      fitness: { present: true, notes: '' },
      drivingLicense: { present: true, notes: '' },
    },
    cleanliness: 'good',
    overallCondition: 'good',
    damageCharges: 0,
    fuelCharges: 0,
    cleaningCharges: 0,
    totalCharges: 0,
    notes: '',
    photos: [],
    customerPresent: true,
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

  const cleanlinessOptions = [
    { key: 'excellent', label: 'Excellent' },
    { key: 'good', label: 'Good' },
    { key: 'fair', label: 'Fair' },
    { key: 'poor', label: 'Poor' },
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
      documents: {
        ...prev.documents,
        [document]: {
          ...prev.documents[document as keyof typeof prev.documents],
          [field]: value,
        },
      },
    }));
  };

  const getConditionColor = (condition: string) => {
    const option = conditionOptions.find(opt => opt.key === condition);
    return option ? option.color : '#666';
  };

  const calculateTotalCharges = () => {
    let total = 0;

    // Calculate damage charges
    let damageCharges = 0;
    Object.values(inspectionData.vehicleCondition).forEach(section => {
      if (typeof section === 'object') {
        Object.values(section).forEach(item => {
          if (typeof item === 'object' && 'estimatedCost' in item) {
            damageCharges += item.estimatedCost || 0;
          }
        });
      }
    });

    // Calculate fuel charges (assuming ₹100 per unit missing)
    const fuelCharges = Math.max(0, (5 - parseInt(inspectionData.fuelLevel.split('_')[0] || '0')) * 100);

    // Calculate cleaning charges based on cleanliness
    const cleaningCharges = inspectionData.cleanliness === 'poor' ? 500 :
                           inspectionData.cleanliness === 'fair' ? 300 : 0;

    total = damageCharges + fuelCharges + cleaningCharges;

    setInspectionData(prev => ({
      ...prev,
      damageCharges,
      fuelCharges,
      cleaningCharges,
      totalCharges: total,
    }));
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

  const renderDamageSection = (section: string, item: string, data: any) => (
    <View style={styles.damageSection}>
      <View style={styles.damageHeader}>
        <Text style={styles.damageLabel}>Damage Found?</Text>
        <Switch
          value={data.damage}
          onValueChange={(value) => updateCondition(section, item, 'damage', value)}
          trackColor={{ false: '#E5E5EA', true: '#FF3B30' }}
          thumbColor={data.damage ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>

      {data.damage && (
        <View style={styles.damageDetails}>
          <TextInput
            style={styles.damageInput}
            value={data.damageDescription}
            onChangeText={(text) => updateCondition(section, item, 'damageDescription', text)}
            placeholder="Describe the damage..."
            multiline
            numberOfLines={3}
            placeholderTextColor="#C7C7CC"
          />
          <View style={styles.costInputGroup}>
            <Text style={styles.costLabel}>Estimated Repair Cost (₹)</Text>
            <TextInput
              style={styles.costInput}
              value={data.estimatedCost.toString()}
              onChangeText={(text) => updateCondition(section, item, 'estimatedCost', parseInt(text) || 0)}
              placeholder="0"
              keyboardType="numeric"
              placeholderTextColor="#C7C7CC"
            />
          </View>
        </View>
      )}
    </View>
  );

  const renderInspectionItem = (section: string, item: string, data: any) => (
    <View key={item} style={styles.inspectionItem}>
      <Text style={styles.itemName}>{item.replace(/([A-Z])/g, ' $1').trim()}</Text>
      {renderConditionSelector(section, item, data.condition)}
      {renderDamageSection(section, item, data)}
    </View>
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
          placeholder="Document condition notes..."
          multiline
          numberOfLines={2}
          placeholderTextColor="#C7C7CC"
        />
      )}
    </View>
  );

  const handleSubmitInspection = () => {
    // Validate required fields
    if (!inspectionData.odometerReading) {
      Alert.alert('Missing Information', 'Please enter the odometer reading.');
      return;
    }

    calculateTotalCharges();

    Alert.alert(
      'Submit Inspection',
      `Total charges: ₹${inspectionData.totalCharges}\nAre you sure you want to submit this inspection report?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit',
          onPress: () => {
            // TODO: Implement actual API call to submit inspection
            console.log('Submitting post-rental inspection:', inspectionData);

            Alert.alert(
              'Inspection Submitted',
              'The post-rental inspection has been completed and submitted successfully.',
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
          <Text style={styles.headerTitle}>Post-Rental Inspection</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Inspection Info */}
        <View style={styles.infoCard}>
          <Text style={styles.bookingId}>Booking: {inspectionData.bookingId}</Text>
          <Text style={styles.vehicleId}>Vehicle: {inspectionData.vehicleId}</Text>
          <Text style={styles.inspectionDate}>Date: {inspectionData.inspectionDate}</Text>
          <Text style={styles.returnTime}>Return Time: {inspectionData.returnTime}</Text>
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
            <Text style={styles.inputLabel}>Vehicle Cleanliness</Text>
            <View style={styles.cleanlinessSelector}>
              {cleanlinessOptions.map(option => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.cleanlinessButton,
                    inspectionData.cleanliness === option.key && styles.selectedCleanlinessButton,
                  ]}
                  onPress={() => setInspectionData(prev => ({ ...prev, cleanliness: option.key }))}
                >
                  <Text style={[
                    styles.cleanlinessButtonText,
                    inspectionData.cleanliness === option.key && styles.selectedCleanlinessButtonText,
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
          {Object.entries(inspectionData.vehicleCondition.exterior).map(([item, data]) =>
            renderInspectionItem('exterior', item, data)
          )}
        </View>

        {/* Interior Inspection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interior Inspection</Text>
          {Object.entries(inspectionData.vehicleCondition.interior).map(([item, data]) =>
            renderInspectionItem('interior', item, data)
          )}
        </View>

        {/* Engine Inspection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Engine Inspection</Text>
          {Object.entries(inspectionData.vehicleCondition.engine).map(([item, data]) =>
            renderInspectionItem('engine', item, data)
          )}
        </View>

        {/* Accessories Check */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessories Check</Text>
          {Object.entries(inspectionData.vehicleCondition.accessories).map(([item, data]) =>
            renderInspectionItem('accessories', item, data)
          )}
        </View>

        {/* Documents Check */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents Check</Text>
          <View style={styles.documentsCard}>
            {Object.entries(inspectionData.documents).map(([document, data]) =>
              renderDocumentItem(document, data)
            )}
          </View>
        </View>

        {/* Charges Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Charges Summary</Text>
          <View style={styles.chargesCard}>
            <View style={styles.chargeItem}>
              <Text style={styles.chargeLabel}>Damage Charges</Text>
              <Text style={styles.chargeValue}>₹{inspectionData.damageCharges}</Text>
            </View>
            <View style={styles.chargeItem}>
              <Text style={styles.chargeLabel}>Fuel Charges</Text>
              <Text style={styles.chargeValue}>₹{inspectionData.fuelCharges}</Text>
            </View>
            <View style={styles.chargeItem}>
              <Text style={styles.chargeLabel}>Cleaning Charges</Text>
              <Text style={styles.chargeValue}>₹{inspectionData.cleaningCharges}</Text>
            </View>
            <View style={[styles.chargeItem, styles.totalChargeItem]}>
              <Text style={styles.totalChargeLabel}>Total Charges</Text>
              <Text style={styles.totalChargeValue}>₹{inspectionData.totalCharges}</Text>
            </View>
          </View>
        </View>

        {/* Customer Information */}
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
  returnTime: {
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
  cleanlinessSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cleanlinessButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  selectedCleanlinessButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  cleanlinessButtonText: {
    fontSize: 14,
    color: '#666',
  },
  selectedCleanlinessButtonText: {
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
  damageSection: {
    marginTop: 8,
  },
  damageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  damageLabel: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  damageDetails: {
    backgroundColor: '#FFF5F5',
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: '#FFE5E5',
  },
  damageInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 8,
    textAlignVertical: 'top',
  },
  costInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  costLabel: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  costInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    width: 100,
    textAlign: 'center',
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
  notesInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginTop: 8,
    textAlignVertical: 'top',
  },
  chargesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  chargeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  totalChargeItem: {
    borderBottomWidth: 0,
    borderTopWidth: 2,
    borderTopColor: '#E5E5EA',
    marginTop: 8,
    paddingTop: 12,
  },
  chargeLabel: {
    fontSize: 14,
    color: '#666',
  },
  chargeValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  totalChargeLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  totalChargeValue: {
    fontSize: 18,
    color: '#FF3B30',
    fontWeight: 'bold',
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
