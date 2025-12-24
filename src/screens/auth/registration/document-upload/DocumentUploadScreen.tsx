import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define color constants
const COLORS = {
  primary: '#00242C',
  white: '#FFFFFF',
  gray: '#E5E5E5',
  lightGray: '#F5F5F5',
  textSecondary: '#666666',
  success: '#10B981',
  error: '#EF4444',
};

// Document types configuration
const DOCUMENTS = [
  {
    id: 'panCard',
    title: 'PAN Card',
    subtitle: 'Required for KYC verification',
    icon: 'card-outline',
    required: true,
  },
  {
    id: 'aadharCard',
    title: 'Aadhar Card',
    subtitle: 'Required for identity verification',
    icon: 'id-card-outline',
    required: true,
  },
  {
    id: 'drivingLicense',
    title: 'Driving License',
    subtitle: 'Required for vehicle operation',
    icon: 'car-outline',
    required: true,
  },
  {
    id: 'vehicleRC',
    title: 'Vehicle RC',
    subtitle: 'Registration certificate for vehicles',
    icon: 'document-text-outline',
    required: true,
  },
  {
    id: 'insurance',
    title: 'Insurance Certificate',
    subtitle: 'Vehicle insurance document',
    icon: 'shield-checkmark-outline',
    required: true,
  },
];

export default function DocumentUploadScreen({ navigation }: any) {
  // Document upload state
  const [uploadedDocuments, setUploadedDocuments] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle document upload
  const handleDocumentUpload = (documentId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    Alert.alert(
      'Upload Document',
      'Choose upload method',
      [
        {
          text: 'Take Photo',
          onPress: () => simulateUpload(documentId, 'camera')
        },
        {
          text: 'Choose from Gallery',
          onPress: () => simulateUpload(documentId, 'gallery')
        },
        {
          text: 'Cancel',
          style: 'cancel'
        },
      ]
    );
  };

  // Simulate document upload
  const simulateUpload = (documentId: string, source: string) => {
    // In production, use actual image picker and upload
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    setUploadedDocuments(prev => ({
      ...prev,
      [documentId]: {
        source,
        uploadedAt: new Date(),
        // In production, store actual image URI
        uri: 'mock-image-uri',
      },
    }));

    Alert.alert('Success', 'Document uploaded successfully!');
  };

  // Remove uploaded document
  const handleRemoveDocument = (documentId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Alert.alert(
      'Remove Document',
      'Are you sure you want to remove this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setUploadedDocuments(prev => {
              const updated = { ...prev };
              delete updated[documentId];
              return updated;
            });
          },
        },
      ]
    );
  };

  // Form submission handler
  const handleSubmit = async () => {
    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate to Registration Complete screen
      navigation.navigate('RegistrationCompleteScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit documents. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Back button handler
  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  // Calculate progress
  const requiredDocuments = DOCUMENTS.filter(doc => doc.required);
  const uploadedRequired = requiredDocuments.filter(
    doc => uploadedDocuments[doc.id]
  ).length;
  const totalRequired = requiredDocuments.length;

  // Form validation
  const isFormValid = () => {
    return uploadedRequired >= totalRequired;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header with back button */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Title Section */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Document Upload</Text>
            <Text style={styles.subtitle}>
              Upload required documents for verification
            </Text>
          </View>

          {/* Progress Counter */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <View style={styles.progressInfo}>
                <Ionicons name="document-text-outline" size={24} color={COLORS.primary} />
                <View style={styles.progressTextContainer}>
                  <Text style={styles.progressTitle}>Upload Progress</Text>
                  <Text style={styles.progressSubtitle}>
                    {uploadedRequired}/{totalRequired} required documents uploaded
                  </Text>
                </View>
              </View>
              <View style={styles.progressBadge}>
                <Text style={styles.progressBadgeText}>
                  {uploadedRequired}/{totalRequired}
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${(uploadedRequired / totalRequired) * 100}%` }
                ]}
              />
            </View>
          </View>

          {/* Document List */}
          <View style={styles.documentsContainer}>
            {DOCUMENTS.map((document, index) => {
              const isUploaded = !!uploadedDocuments[document.id];

              return (
                <View key={document.id} style={styles.documentSection}>
                  {/* Document Header */}
                  <View style={styles.documentHeader}>
                    <View style={styles.documentHeaderLeft}>
                      <Ionicons
                        name={document.icon as any}
                        size={20}
                        color={COLORS.primary}
                      />
                      <View style={styles.documentHeaderText}>
                        <Text style={styles.documentTitle}>
                          {document.title}
                          {document.required && (
                            <Text style={styles.required}> *</Text>
                          )}
                        </Text>
                        <Text style={styles.documentSubtitle}>
                          {document.subtitle}
                        </Text>
                      </View>
                    </View>

                    {/* Status Badge */}
                    {isUploaded && (
                      <View style={styles.uploadedBadge}>
                        <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                        <Text style={styles.uploadedBadgeText}>Uploaded</Text>
                      </View>
                    )}
                  </View>

                  {/* Document Preview Box (Driving License Size) */}
                  <View style={styles.documentPreviewBox}>
                    {isUploaded ? (
                      // Uploaded Document Preview
                      <View style={styles.uploadedPreview}>
                        <View style={styles.uploadedContent}>
                          <Ionicons
                            name="document-text"
                            size={48}
                            color={COLORS.success}
                          />
                          <Text style={styles.uploadedText}>Document Uploaded</Text>
                          <Text style={styles.uploadedDate}>
                            {new Date(uploadedDocuments[document.id].uploadedAt).toLocaleDateString()}
                          </Text>
                        </View>

                        {/* Remove Button */}
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => handleRemoveDocument(document.id)}
                        >
                          <Ionicons name="close-circle" size={24} color={COLORS.error} />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      // Empty Upload Box
                      <TouchableOpacity
                        style={styles.emptyPreview}
                        onPress={() => handleDocumentUpload(document.id)}
                      >
                        <Ionicons
                          name="cloud-upload-outline"
                          size={40}
                          color={COLORS.textSecondary}
                        />
                        <Text style={styles.uploadPrompt}>Tap to upload</Text>
                        <Text style={styles.uploadHint}>
                          Take photo or choose from gallery
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          {/* Guidelines Info Box */}
          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
              <Text style={styles.infoTitle}>Document Guidelines</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoText}>• Ensure documents are clear and readable</Text>
              <Text style={styles.infoText}>• Upload high-quality images (not blurry)</Text>
              <Text style={styles.infoText}>• All corners of document should be visible</Text>
              <Text style={styles.infoText}>• Verification may take 24-48 hours</Text>
            </View>
          </View>

          {/* Submit Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!isFormValid() || isLoading) && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={!isFormValid() || isLoading}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? 'Submitting...' : 'Submit Documents'}
              </Text>
              {!isLoading && (
                <Ionicons name="checkmark" size={20} color={COLORS.white} />
              )}
            </TouchableOpacity>
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },

  // Header Styles
  header: {
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Title Styles
  titleContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },

  // Progress Container
  progressContainer: {
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  progressTextContainer: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  progressBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  progressBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },

  // Progress Bar
  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.gray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },

  // Documents Container
  documentsContainer: {
    marginBottom: 24,
  },
  documentSection: {
    marginBottom: 24,
  },

  // Document Header
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  documentHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  documentHeaderText: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 2,
  },
  required: {
    color: COLORS.error,
    fontSize: 16,
  },
  documentSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  // Uploaded Badge
  uploadedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${COLORS.success}15`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  uploadedBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.success,
  },

  // Document Preview Box (Driving License Size: ~85mm x 54mm ratio)
  documentPreviewBox: {
    width: '100%',
    aspectRatio: 85 / 54, // Driving license aspect ratio
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.gray,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },

  // Empty Preview
  emptyPreview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGray,
    padding: 20,
  },
  uploadPrompt: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 12,
    marginBottom: 4,
  },
  uploadHint: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },

  // Uploaded Preview
  uploadedPreview: {
    flex: 1,
    backgroundColor: `${COLORS.success}08`,
    position: 'relative',
  },
  uploadedContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  uploadedText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.success,
    marginTop: 12,
    marginBottom: 4,
  },
  uploadedDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  // Remove Button
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Info Box
  infoBox: {
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  infoContent: {
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.primary,
    lineHeight: 20,
  },

  // Button Styles
  buttonContainer: {
    marginBottom: 24,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.gray,
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 40,
  },
});
