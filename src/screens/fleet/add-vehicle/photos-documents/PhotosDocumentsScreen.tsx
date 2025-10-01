import { ThemedView } from '../../components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

/**
 * Photos & Documents Screen - Upload vehicle photos and documents
 * Third step in adding a new vehicle to the fleet
 */
export default function PhotosDocumentsScreen({ navigation, route }: any) {
  const { vehicleData } = route.params || {};

  const [photos, setPhotos] = useState({
    front: null,
    back: null,
    left: null,
    right: null,
    interior: null,
    dashboard: null,
    engine: null,
    boot: null,
  });

  const [documents, setDocuments] = useState({
    rc: null,
    insurance: null,
    pollution: null,
    fitness: null,
  });

  const [uploading, setUploading] = useState(false);

  // Photo types
  const photoTypes = [
    { key: 'front', label: 'Front View', required: true, icon: 'car-outline' },
    { key: 'back', label: 'Back View', required: true, icon: 'car-outline' },
    { key: 'left', label: 'Left Side', required: true, icon: 'car-outline' },
    { key: 'right', label: 'Right Side', required: true, icon: 'car-outline' },
    { key: 'interior', label: 'Interior', required: true, icon: 'car-outline' },
    { key: 'dashboard', label: 'Dashboard', required: false, icon: 'speedometer-outline' },
    { key: 'engine', label: 'Engine', required: false, icon: 'settings-outline' },
    { key: 'boot', label: 'Boot Space', required: false, icon: 'cube-outline' },
  ];

  // Document types
  const documentTypes = [
    { key: 'rc', label: 'RC (Registration Certificate)', required: true, icon: 'document-outline' },
    { key: 'insurance', label: 'Insurance Certificate', required: true, icon: 'shield-outline' },
    { key: 'pollution', label: 'Pollution Certificate', required: true, icon: 'leaf-outline' },
    { key: 'fitness', label: 'Fitness Certificate', required: false, icon: 'checkmark-circle-outline' },
  ];

  // Handle photo upload
  const handlePhotoUpload = (photoType: string) => {
    Alert.alert(
      'Upload Photo',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => openCamera(photoType) },
        { text: 'Gallery', onPress: () => openGallery(photoType) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Handle document upload
  const handleDocumentUpload = (docType: string) => {
    Alert.alert(
      'Upload Document',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => openCamera(docType) },
        { text: 'Gallery', onPress: () => openGallery(docType) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Open camera
  const openCamera = (type: string) => {
    // TODO: Implement camera functionality
    console.log('Open camera for:', type);
    // Simulate upload
    if (photoTypes.some(photo => photo.key === type)) {
      setPhotos(prev => ({
        ...prev,
        [type]: 'uploaded',
      }));
    } else {
      setDocuments(prev => ({
        ...prev,
        [type]: 'uploaded',
      }));
    }
  };

  // Open gallery
  const openGallery = (type: string) => {
    // TODO: Implement gallery functionality
    console.log('Open gallery for:', type);
    // Simulate upload
    if (photoTypes.some(photo => photo.key === type)) {
      setPhotos(prev => ({
        ...prev,
        [type]: 'uploaded',
      }));
    } else {
      setDocuments(prev => ({
        ...prev,
        [type]: 'uploaded',
      }));
    }
  };

  // Remove photo/document
  const removeItem = (type: string, isPhoto: boolean) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            if (isPhoto) {
              setPhotos(prev => ({
                ...prev,
                [type]: null,
              }));
            } else {
              setDocuments(prev => ({
                ...prev,
                [type]: null,
              }));
            }
          },
        },
      ]
    );
  };

  // Check if all required items are uploaded
  const checkRequiredItems = () => {
    const requiredPhotos = photoTypes.filter(photo => photo.required);
    const requiredDocs = documentTypes.filter(doc => doc.required);

    const allRequiredPhotosUploaded = requiredPhotos.every(photo =>
      photos[photo.key as keyof typeof photos] !== null
    );
    const allRequiredDocsUploaded = requiredDocs.every(doc =>
      documents[doc.key as keyof typeof documents] !== null
    );

    return allRequiredPhotosUploaded && allRequiredDocsUploaded;
  };

  // Handle continue
  const handleContinue = async () => {
    if (!checkRequiredItems()) {
      Alert.alert(
        'Missing Items',
        'Please upload all required photos and documents before continuing.'
      );
      return;
    }

    setUploading(true);
    try {
      const completeVehicleData = {
        ...vehicleData,
        photos,
        documents,
      };

      // TODO: Save to local state or API
      console.log('Complete vehicle data:', completeVehicleData);

      // Navigate to pricing and availability screen
      navigation.navigate('PricingAvailabilityScreen', { vehicleData: completeVehicleData });
    } catch (error) {
      console.error('Error saving photos and documents:', error);
      Alert.alert('Error', 'Failed to save vehicle details. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Render photo/document item
  const renderItem = (item: any, isPhoto: boolean = true) => {
    const isUploaded = isPhoto
      ? photos[item.key as keyof typeof photos] !== null
      : documents[item.key as keyof typeof documents] !== null;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemInfo}>
          <View style={styles.itemIcon}>
            <Ionicons name={item.icon} size={24} color={isUploaded ? '#34C759' : '#666'} />
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>
              {item.label}
              {item.required && <Text style={styles.required}> *</Text>}
            </Text>
          </View>
        </View>

        <View style={styles.itemActions}>
          {isUploaded ? (
            <View style={styles.uploadedContainer}>
              <Ionicons name="checkmark-circle" size={20} color="#34C759" />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(item.key, isPhoto)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => isPhoto ? handlePhotoUpload(item.key) : handleDocumentUpload(item.key)}
            >
              <Ionicons name="cloud-upload-outline" size={16} color="#007AFF" />
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
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
          <Text style={styles.headerTitle}>Photos & Documents</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
          <Text style={styles.progressText}>Step 3 of 4</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Vehicle Photos & Documents</Text>
          <Text style={styles.subtitle}>
            Upload clear photos and required documents for your vehicle
          </Text>

          {/* Photo Guidelines */}
          <View style={styles.guidelinesContainer}>
            <Text style={styles.guidelinesTitle}>Photo Guidelines:</Text>
            <Text style={styles.guidelineItem}>• Take photos in good lighting</Text>
            <Text style={styles.guidelineItem}>• Ensure all text is readable</Text>
            <Text style={styles.guidelineItem}>• Include all four sides of the vehicle</Text>
            <Text style={styles.guidelineItem}>• Maximum file size: 10MB per photo</Text>
          </View>

          {/* Photos Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vehicle Photos</Text>
            <View style={styles.itemsContainer}>
              {photoTypes.map(photo => renderItem(photo, true))}
            </View>
          </View>

          {/* Documents Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Required Documents</Text>
            <View style={styles.itemsContainer}>
              {documentTypes.map(doc => renderItem(doc, false))}
            </View>
          </View>

          {/* Upload Status */}
          <View style={styles.statusContainer}>
            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>Required Photos:</Text>
                <Text style={styles.statusValue}>
                  {photoTypes.filter(photo => photo.required).length}
                </Text>
              </View>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>Uploaded:</Text>
                <Text style={styles.statusValue}>
                  {Object.values(photos).filter(photo => photo !== null).length}
                </Text>
              </View>
            </View>
            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>Required Documents:</Text>
                <Text style={styles.statusValue}>
                  {documentTypes.filter(doc => doc.required).length}
                </Text>
              </View>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>Uploaded:</Text>
                <Text style={styles.statusValue}>
                  {Object.values(documents).filter(doc => doc !== null).length}
                </Text>
              </View>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              (!checkRequiredItems() || uploading) && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!checkRequiredItems() || uploading}
          >
            <Text style={styles.continueButtonText}>
              {uploading ? 'Uploading...' : 'Continue'}
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
    marginBottom: 24,
    lineHeight: 22,
  },
  guidelinesContainer: {
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  guidelineItem: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  itemsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  required: {
    color: '#FF3B30',
  },
  itemActions: {
    alignItems: 'center',
  },
  uploadedContainer: {
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F0F8FF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  uploadButtonText: {
    fontSize: 12,
    color: '#007AFF',
    marginLeft: 4,
    fontWeight: '500',
  },
  removeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  removeButtonText: {
    fontSize: 12,
    color: '#FF3B30',
    fontWeight: '500',
  },
  statusContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statusItem: {
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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
