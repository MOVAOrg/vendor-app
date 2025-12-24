import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

export default function DocumentsScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const categories = [
    { id: 'all', title: 'All Documents', icon: 'folder', count: 12 },
    { id: 'vehicle', title: 'Vehicle Docs', icon: 'car', count: 5 },
    { id: 'insurance', title: 'Insurance', icon: 'shield-checkmark', count: 3 },
    { id: 'license', title: 'License', icon: 'card', count: 2 },
    { id: 'other', title: 'Other', icon: 'document', count: 2 },
  ];

  // Mock document data
  const documents = [
    {
      id: 'DOC001',
      title: 'Vehicle Registration Certificate',
      category: 'vehicle',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2024-03-10',
      expiryDate: '2025-03-10',
      status: 'valid',
      thumbnail: 'https://via.placeholder.com/100x140/00242C/FFFFFF?text=RC',
    },
    {
      id: 'DOC002',
      title: 'Insurance Policy Document',
      category: 'insurance',
      type: 'pdf',
      size: '1.8 MB',
      uploadDate: '2024-02-15',
      expiryDate: '2025-02-15',
      status: 'valid',
      thumbnail: 'https://via.placeholder.com/100x140/2DAA72/FFFFFF?text=INS',
    },
    {
      id: 'DOC003',
      title: 'Driving License',
      category: 'license',
      type: 'pdf',
      size: '1.2 MB',
      uploadDate: '2024-01-20',
      expiryDate: '2029-01-20',
      status: 'valid',
      thumbnail: 'https://via.placeholder.com/100x140/54AEC9/FFFFFF?text=DL',
    },
    {
      id: 'DOC004',
      title: 'Vehicle Inspection Report',
      category: 'vehicle',
      type: 'pdf',
      size: '3.1 MB',
      uploadDate: '2024-03-05',
      expiryDate: '2024-09-05',
      status: 'expiring',
      thumbnail: 'https://via.placeholder.com/100x140/FFCC00/FFFFFF?text=VIR',
    },
    {
      id: 'DOC005',
      title: 'PUC Certificate',
      category: 'vehicle',
      type: 'pdf',
      size: '0.8 MB',
      uploadDate: '2024-02-28',
      expiryDate: '2024-08-28',
      status: 'expiring',
      thumbnail: 'https://via.placeholder.com/100x140/FFCC00/FFFFFF?text=PUC',
    },
    {
      id: 'DOC006',
      title: 'Commercial License',
      category: 'license',
      type: 'pdf',
      size: '2.0 MB',
      uploadDate: '2024-01-10',
      expiryDate: '2026-01-10',
      status: 'valid',
      thumbnail: 'https://via.placeholder.com/100x140/54AEC9/FFFFFF?text=CL',
    },
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

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleCategoryChange = (categoryId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedCategory(categoryId);
  };

  const handleDocumentSelect = (document: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedDocument(document);
    // Navigate to document viewer
    Alert.alert('Document Viewer', `Opening ${document.title}...`);
  };

  const handleUploadDocument = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Upload Document', 'Document upload feature coming soon!');
  };

  const handleDeleteDocument = (documentId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          // Handle delete logic
          Alert.alert('Success', 'Document deleted successfully!');
        }},
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return BrandColors.accent;
      case 'expiring': return BrandColors.warning;
      case 'expired': return BrandColors.error;
      default: return BrandColors.textLight;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid': return 'checkmark-circle';
      case 'expiring': return 'warning';
      case 'expired': return 'close-circle';
      default: return 'help-circle';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return 'document-text';
      case 'image': return 'image';
      case 'doc': return 'document';
      default: return 'document';
    }
  };

  const filteredDocuments = documents.filter(doc =>
    selectedCategory === 'all' || doc.category === selectedCategory
  );

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
            <Text style={styles.title}>Documents</Text>
            <Text style={styles.subtitle}>
              Manage your vehicle documents
            </Text>
          </View>
        </Animated.View>

        {/* Categories */}
        <Animated.View
          style={[
            styles.categoriesContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Card variant="elevated" size="md" style={styles.categoriesCard}>
            <Text style={styles.categoriesTitle}>Categories</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoriesList}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryItem,
                      selectedCategory === category.id && styles.categoryItemActive,
                    ]}
                    onPress={() => handleCategoryChange(category.id)}
                  >
                    <View style={[
                      styles.categoryIcon,
                      selectedCategory === category.id && styles.categoryIconActive,
                    ]}>
                      <Ionicons
                        name={category.icon as any}
                        size={20}
                        color={selectedCategory === category.id ? BrandColors.primary : BrandColors.textLight}
                      />
                    </View>
                    <Text style={[
                      styles.categoryTitle,
                      selectedCategory === category.id && styles.categoryTitleActive,
                    ]}>
                      {category.title}
                    </Text>
                    <Text style={[
                      styles.categoryCount,
                      selectedCategory === category.id && styles.categoryCountActive,
                    ]}>
                      {category.count}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Card>
        </Animated.View>

        {/* Documents Grid */}
        <Animated.View
          style={[
            styles.documentsContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          <Card variant="elevated" size="lg" style={styles.documentsCard}>
            <View style={styles.documentsHeader}>
              <Text style={styles.documentsTitle}>Documents</Text>
              <TouchableOpacity onPress={handleUploadDocument} style={styles.uploadButton}>
                <Ionicons name="cloud-upload" size={20} color={BrandColors.primary} />
                <Text style={styles.uploadButtonText}>Upload</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.documentsGrid}>
              {filteredDocuments.map((document) => (
                <TouchableOpacity
                  key={document.id}
                  style={styles.documentItem}
                  onPress={() => handleDocumentSelect(document)}
                >
                  <View style={styles.documentThumbnail}>
                    <Image source={{ uri: document.thumbnail }} style={styles.thumbnailImage} />
                    <View style={styles.documentType}>
                      <Ionicons name={getTypeIcon(document.type)} size={12} color={BrandColors.textLight} />
                    </View>
                  </View>

                  <View style={styles.documentInfo}>
                    <Text style={styles.documentTitle} numberOfLines={2}>
                      {document.title}
                    </Text>

                    <View style={styles.documentMeta}>
                      <Text style={styles.documentSize}>{document.size}</Text>
                      <Text style={styles.documentDate}>{document.uploadDate}</Text>
                    </View>

                    <View style={styles.documentStatus}>
                      <Ionicons name={getStatusIcon(document.status)} size={12} color={getStatusColor(document.status)} />
                      <Text style={[styles.documentStatusText, { color: getStatusColor(document.status) }]}>
                        {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                      </Text>
                    </View>

                    {document.expiryDate && (
                      <Text style={styles.documentExpiry}>
                        Expires: {document.expiryDate}
                      </Text>
                    )}
                  </View>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteDocument(document.id)}
                  >
                    <Ionicons name="trash" size={16} color={BrandColors.error} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
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
          <Button
            title="Upload New Document"
            onPress={handleUploadDocument}
            variant="primary"
            size="lg"
            icon="cloud-upload"
            iconPosition="right"
            style={styles.uploadNewButton}
          />
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

  // Categories
  categoriesContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  categoriesCard: {
    width: '100%',
  },
  categoriesTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  categoriesList: {
    flexDirection: 'row',
  },
  categoryItem: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.gray50,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
    minWidth: 100,
  },
  categoryItemActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: BrandColors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  categoryIconActive: {
    backgroundColor: BrandColors.secondary,
  },
  categoryTitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textLight,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  categoryTitleActive: {
    color: BrandColors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },
  categoryCount: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textLight,
  },
  categoryCountActive: {
    color: BrandColors.secondary,
  },

  // Documents
  documentsContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  documentsCard: {
    width: '100%',
  },
  documentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  documentsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.gray50,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  uploadButtonText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.primary,
    fontWeight: Typography.fontWeight.medium,
    marginLeft: Spacing.xs,
  },
  documentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  documentItem: {
    width: '48%',
    backgroundColor: BrandColors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
    position: 'relative',
  },
  documentThumbnail: {
    width: '100%',
    height: 120,
    borderRadius: BorderRadius.md,
    backgroundColor: BrandColors.gray50,
    marginBottom: Spacing.sm,
    position: 'relative',
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  documentType: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    width: 20,
    height: 20,
    borderRadius: BorderRadius.sm,
    backgroundColor: BrandColors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  documentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  documentSize: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textSecondary,
  },
  documentDate: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textSecondary,
  },
  documentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  documentStatusText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    marginLeft: Spacing.xs,
  },
  documentExpiry: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textLight,
  },
  deleteButton: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    width: 24,
    height: 24,
    borderRadius: BorderRadius.sm,
    backgroundColor: BrandColors.error + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Buttons
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  uploadNewButton: {
    width: '100%',
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
