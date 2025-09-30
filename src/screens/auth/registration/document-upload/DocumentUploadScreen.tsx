import { ThemedView } from '@/components/ThemedView';
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
 * Document Upload Screen - Upload required verification documents
 * Part of vendor registration process for identity verification
 */
export default function DocumentUploadScreen({ navigation }: any) {
  const [documents, setDocuments] = useState({
    panCard: null,
    aadhaarCard: null,
    drivingLicense: null,
    vehicleRC: null,
    insurance: null,
    tradeLicense: null,
    gstCertificate: null,
    bankStatement: null,
  });

  const [uploading, setUploading] = useState(false);

  // Document requirements
  const documentTypes = [
    {
      id: 'panCard',
      title: 'PAN Card',
      subtitle: 'Required for tax verification',
      required: true,
      icon: 'card-outline',
    },
    {
      id: 'aadhaarCard',
      title: 'Aadhaar Card',
      subtitle: 'Required for identity verification',
      required: true,
      icon: 'person-outline',
    },
    {
      id: 'drivingLicense',
      title: 'Driving License',
      subtitle: 'Required for vehicle operations',
      required: true,
      icon: 'car-outline',
    },
    {
      id: 'vehicleRC',
      title: 'Vehicle RC',
      subtitle: 'Required for each vehicle',
      required: true,
      icon: 'document-outline',
    },
    {
      id: 'insurance',
      title: 'Vehicle Insurance',
      subtitle: 'Required for each vehicle',
      required: true,
      icon: 'shield-outline',
    },
    {
      id: 'tradeLicense',
      title: 'Trade License',
      subtitle: 'Required for business operations',
      required: false,
      icon: 'business-outline',
    },
    {
      id: 'gstCertificate',
      title: 'GST Certificate',
      subtitle: 'Required if applicable',
      required: false,
      icon: 'receipt-outline',
    },
    {
      id: 'bankStatement',
      title: 'Bank Statement',
      subtitle: 'Last 3 months',
      required: false,
      icon: 'cash-outline',
    },
  ];

  // Handle document upload
  const handleDocumentUpload = (documentType: string) => {
    Alert.alert(
      'Upload Document',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => openCamera(documentType) },
        { text: 'Gallery', onPress: () => openGallery(documentType) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Open camera
  const openCamera = (documentType: string) => {
    // TODO: Implement camera functionality
    console.log('Open camera for:', documentType);
    // Simulate upload
    setDocuments(prev => ({
      ...prev,
      [documentType]: 'uploaded',
    }));
  };

  // Open gallery
  const openGallery = (documentType: string) => {
    // TODO: Implement gallery functionality
    console.log('Open gallery for:', documentType);
    // Simulate upload
    setDocuments(prev => ({
      ...prev,
      [documentType]: 'uploaded',
    }));
  };

  // Remove document
  const removeDocument = (documentType: string) => {
    Alert.alert(
      'Remove Document',
      'Are you sure you want to remove this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setDocuments(prev => ({
              ...prev,
              [documentType]: null,
            }));
          },
        },
      ]
    );
  };

  // Check if all required documents are uploaded
  const checkRequiredDocuments = () => {
    const requiredDocs = documentTypes.filter(doc => doc.required);
    return requiredDocs.every(doc => documents[doc.id as keyof typeof documents] !== null);
  };

  // Handle continue
  const handleContinue = async () => {
    if (!checkRequiredDocuments()) {
      Alert.alert(
        'Missing Documents',
        'Please upload all required documents before continuing.'
      );
      return;
    }

    setUploading(true);
    try {
      // TODO: Implement actual document upload API
      // await vendorService.uploadDocuments(documents);

      Alert.alert(
        'Documents Uploaded',
        'Your documents have been uploaded successfully. They will be reviewed within 24-48 hours.',
        [
          {
            text: 'Continue',
            onPress: () => {
              // Navigate to next step (bank details or location details)
              navigation.navigate('BankDetailsScreen');
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error uploading documents:', error);
      Alert.alert('Error', 'Failed to upload documents. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Render document item
  const renderDocumentItem = (doc: any) => {
    const isUploaded = documents[doc.id as keyof typeof documents] !== null;

    return (
      <View key={doc.id} style={styles.documentItem}>
        <View style={styles.documentInfo}>
          <View style={styles.documentIcon}>
            <Ionicons name={doc.icon} size={24} color={isUploaded ? '#34C759' : '#666'} />
          </View>
          <View style={styles.documentDetails}>
            <Text style={styles.documentTitle}>
              {doc.title}
              {doc.required && <Text style={styles.required}> *</Text>}
            </Text>
            <Text style={styles.documentSubtitle}>{doc.subtitle}</Text>
          </View>
        </View>

        <View style={styles.documentActions}>
          {isUploaded ? (
            <View style={styles.uploadedContainer}>
              <Ionicons name="checkmark-circle" size={20} color="#34C759" />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeDocument(doc.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => handleDocumentUpload(doc.id)}
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
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Upload Documents</Text>
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
          <Text style={styles.title}>Verification Documents</Text>
          <Text style={styles.subtitle}>
            Upload the required documents for account verification. All documents should be clear and readable.
          </Text>

          {/* Document Requirements */}
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsTitle}>Document Requirements:</Text>
            <Text style={styles.requirementItem}>• Clear, high-quality photos</Text>
            <Text style={styles.requirementItem}>• All text should be readable</Text>
            <Text style={styles.requirementItem}>• Documents should be valid and not expired</Text>
            <Text style={styles.requirementItem}>• Maximum file size: 5MB per document</Text>
          </View>

          {/* Documents List */}
          <View style={styles.documentsContainer}>
            {documentTypes.map(renderDocumentItem)}
          </View>

          {/* Upload Status */}
          <View style={styles.statusContainer}>
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

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              (!checkRequiredDocuments() || uploading) && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!checkRequiredDocuments() || uploading}
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
  requirementsContainer: {
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  requirementItem: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
    lineHeight: 20,
  },
  documentsContainer: {
    marginBottom: 24,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  documentDetails: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  required: {
    color: '#FF3B30',
  },
  documentSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  documentActions: {
    alignItems: 'center',
  },
  uploadedContainer: {
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  uploadButtonText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 4,
    fontWeight: '500',
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 4,
  },
  removeButtonText: {
    fontSize: 12,
    color: '#FF3B30',
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  statusItem: {
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 20,
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
