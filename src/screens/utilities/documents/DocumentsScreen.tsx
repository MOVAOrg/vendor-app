import { ThemedView } from '../../components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Documents Screen - Manage all vendor documents and certificates
 * View, upload, and manage business documents, licenses, and certificates
 */
export default function DocumentsScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [documents, setDocuments] = useState([
    {
      id: '1',
      name: 'PAN Card',
      type: 'tax',
      category: 'personal',
      status: 'verified',
      uploadedDate: '2024-12-15',
      expiryDate: null,
      fileSize: '2.3 MB',
      description: 'Personal PAN card for tax verification',
      verifiedBy: 'Admin',
      verifiedDate: '2024-12-16',
    },
    {
      id: '2',
      name: 'Aadhaar Card',
      type: 'identity',
      category: 'personal',
      status: 'verified',
      uploadedDate: '2024-12-15',
      expiryDate: null,
      fileSize: '3.1 MB',
      description: 'Identity verification document',
      verifiedBy: 'Admin',
      verifiedDate: '2024-12-16',
    },
    {
      id: '3',
      name: 'Trade License',
      type: 'business',
      category: 'business',
      status: 'pending',
      uploadedDate: '2025-01-10',
      expiryDate: '2025-12-31',
      fileSize: '4.2 MB',
      description: 'Business trade license for vehicle rental operations',
      verifiedBy: null,
      verifiedDate: null,
    },
    {
      id: '4',
      name: 'GST Certificate',
      type: 'tax',
      category: 'business',
      status: 'verified',
      uploadedDate: '2024-12-20',
      expiryDate: null,
      fileSize: '1.8 MB',
      description: 'GST registration certificate',
      verifiedBy: 'Admin',
      verifiedDate: '2024-12-21',
    },
    {
      id: '5',
      name: 'Vehicle Insurance - Honda City',
      type: 'insurance',
      category: 'vehicle',
      status: 'verified',
      uploadedDate: '2025-01-01',
      expiryDate: '2025-12-31',
      fileSize: '2.7 MB',
      description: 'Comprehensive insurance for Honda City (KA-01-AB-1234)',
      verifiedBy: 'Admin',
      verifiedDate: '2025-01-02',
    },
    {
      id: '6',
      name: 'Vehicle RC - Maruti Swift',
      type: 'registration',
      category: 'vehicle',
      status: 'verified',
      uploadedDate: '2024-12-28',
      expiryDate: null,
      fileSize: '1.5 MB',
      description: 'Registration certificate for Maruti Swift (KA-02-CD-5678)',
      verifiedBy: 'Admin',
      verifiedDate: '2024-12-29',
    },
    {
      id: '7',
      name: 'Pollution Certificate - Toyota Innova',
      type: 'pollution',
      category: 'vehicle',
      status: 'expired',
      uploadedDate: '2024-06-15',
      expiryDate: '2024-12-15',
      fileSize: '1.2 MB',
      description: 'Pollution under control certificate',
      verifiedBy: 'Admin',
      verifiedDate: '2024-06-16',
    },
    {
      id: '8',
      name: 'Bank Account Statement',
      type: 'financial',
      category: 'business',
      status: 'verified',
      uploadedDate: '2025-01-05',
      expiryDate: null,
      fileSize: '5.1 MB',
      description: 'Last 3 months bank statement',
      verifiedBy: 'Admin',
      verifiedDate: '2025-01-06',
    },
  ]);

  const categories = [
    { key: 'all', label: 'All Documents', count: documents.length },
    { key: 'personal', label: 'Personal', count: documents.filter(d => d.category === 'personal').length },
    { key: 'business', label: 'Business', count: documents.filter(d => d.category === 'business').length },
    { key: 'vehicle', label: 'Vehicle', count: documents.filter(d => d.category === 'vehicle').length },
  ];

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      // TODO: Implement actual API call to fetch documents
      console.log('Loading documents...');
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDocuments();
    setRefreshing(false);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const getFilteredDocuments = () => {
    if (selectedCategory === 'all') {
      return documents;
    }
    return documents.filter(doc => doc.category === selectedCategory);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return '#34C759';
      case 'pending':
        return '#FF9500';
      case 'rejected':
        return '#FF3B30';
      case 'expired':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return 'checkmark-circle';
      case 'pending':
        return 'time-outline';
      case 'rejected':
        return 'close-circle';
      case 'expired':
        return 'alert-circle';
      default:
        return 'help-circle';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tax':
        return 'receipt-outline';
      case 'identity':
        return 'person-outline';
      case 'business':
        return 'business-outline';
      case 'insurance':
        return 'shield-outline';
      case 'registration':
        return 'document-outline';
      case 'pollution':
        return 'leaf-outline';
      case 'financial':
        return 'cash-outline';
      default:
        return 'document-outline';
    }
  };

  const handleUploadDocument = () => {
    navigation.navigate('UploadDocumentScreen');
  };

  const handleViewDocument = (document: any) => {
    // TODO: Open document viewer
    console.log('Viewing document:', document.name);
  };

  const handleDownloadDocument = (document: any) => {
    Alert.alert(
      'Download Document',
      `Download ${document.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => console.log('Downloading:', document.name) },
      ]
    );
  };

  const handleDeleteDocument = (document: any) => {
    Alert.alert(
      'Delete Document',
      `Are you sure you want to delete ${document.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setDocuments(prev => prev.filter(doc => doc.id !== document.id));
          },
        },
      ]
    );
  };

  const handleReuploadDocument = (document: any) => {
    navigation.navigate('UploadDocumentScreen', { document });
  };

  const renderDocumentItem = ({ item }: { item: any }) => (
    <View style={styles.documentCard}>
      <View style={styles.documentHeader}>
        <View style={styles.documentInfo}>
          <View style={styles.documentIcon}>
            <Ionicons name={getTypeIcon(item.type)} size={24} color="#007AFF" />
          </View>
          <View style={styles.documentDetails}>
            <Text style={styles.documentName}>{item.name}</Text>
            <Text style={styles.documentDescription}>{item.description}</Text>
            <View style={styles.documentMeta}>
              <Text style={styles.documentDate}>Uploaded: {item.uploadedDate}</Text>
              {item.expiryDate && (
                <Text style={styles.documentExpiry}>Expires: {item.expiryDate}</Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.documentStatus}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) + '20' }
          ]}>
            <Ionicons
              name={getStatusIcon(item.status)}
              size={16}
              color={getStatusColor(item.status)}
            />
            <Text style={[
              styles.statusText,
              { color: getStatusColor(item.status) }
            ]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      {item.verifiedBy && (
        <View style={styles.verificationInfo}>
          <Text style={styles.verificationText}>
            Verified by {item.verifiedBy} on {item.verifiedDate}
          </Text>
        </View>
      )}

      <View style={styles.documentActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleViewDocument(item)}
        >
          <Ionicons name="eye-outline" size={16} color="#007AFF" />
          <Text style={styles.actionButtonText}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDownloadDocument(item)}
        >
          <Ionicons name="download-outline" size={16} color="#007AFF" />
          <Text style={styles.actionButtonText}>Download</Text>
        </TouchableOpacity>

        {(item.status === 'rejected' || item.status === 'expired') && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleReuploadDocument(item)}
          >
            <Ionicons name="cloud-upload-outline" size={16} color="#FF9500" />
            <Text style={[styles.actionButtonText, { color: '#FF9500' }]}>Reupload</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteDocument(item)}
        >
          <Ionicons name="trash-outline" size={16} color="#FF3B30" />
          <Text style={[styles.actionButtonText, { color: '#FF3B30' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategory = (category: any) => (
    <TouchableOpacity
      key={category.key}
      style={[
        styles.categoryButton,
        selectedCategory === category.key && styles.selectedCategoryButton,
      ]}
      onPress={() => handleCategoryChange(category.key)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === category.key && styles.selectedCategoryText,
      ]}>
        {category.label}
      </Text>
      <View style={[
        styles.categoryBadge,
        selectedCategory === category.key && styles.selectedCategoryBadge,
      ]}>
        <Text style={[
          styles.categoryBadgeText,
          selectedCategory === category.key && styles.selectedCategoryBadgeText,
        ]}>
          {category.count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const filteredDocuments = getFilteredDocuments();

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={[{ key: 'content' }]}
        renderItem={() => (
          <View>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Documents</Text>
              <TouchableOpacity style={styles.uploadButton} onPress={handleUploadDocument}>
                <Ionicons name="add" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>

            {/* Categories */}
            <View style={styles.categoriesSection}>
              <FlatList
                data={categories}
                renderItem={({ item }) => renderCategory(item)}
                keyExtractor={(item) => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesList}
              />
            </View>

            {/* Summary Stats */}
            <View style={styles.statsSection}>
              <View style={styles.statCard}>
                <View style={styles.statIcon}>
                  <Ionicons name="checkmark-circle" size={24} color="#34C759" />
                </View>
                <View style={styles.statInfo}>
                  <Text style={styles.statValue}>
                    {documents.filter(d => d.status === 'verified').length}
                  </Text>
                  <Text style={styles.statLabel}>Verified</Text>
                </View>
              </View>
              <View style={styles.statCard}>
                <View style={styles.statIcon}>
                  <Ionicons name="time-outline" size={24} color="#FF9500" />
                </View>
                <View style={styles.statInfo}>
                  <Text style={styles.statValue}>
                    {documents.filter(d => d.status === 'pending').length}
                  </Text>
                  <Text style={styles.statLabel}>Pending</Text>
                </View>
              </View>
              <View style={styles.statCard}>
                <View style={styles.statIcon}>
                  <Ionicons name="alert-circle" size={24} color="#FF3B30" />
                </View>
                <View style={styles.statInfo}>
                  <Text style={styles.statValue}>
                    {documents.filter(d => d.status === 'expired' || d.status === 'rejected').length}
                  </Text>
                  <Text style={styles.statLabel}>Issues</Text>
                </View>
              </View>
            </View>

            {/* Documents List */}
            <View style={styles.documentsSection}>
              <Text style={styles.sectionTitle}>
                Documents ({filteredDocuments.length})
              </Text>
              {filteredDocuments.length > 0 ? (
                <FlatList
                  data={filteredDocuments}
                  renderItem={renderDocumentItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons name="document-outline" size={64} color="#C7C7CC" />
                  <Text style={styles.emptyTitle}>No documents found</Text>
                  <Text style={styles.emptyMessage}>
                    Upload your first document to get started
                  </Text>
                  <TouchableOpacity style={styles.uploadButton} onPress={handleUploadDocument}>
                    <Ionicons name="cloud-upload-outline" size={20} color="#FFFFFF" />
                    <Text style={styles.uploadButtonText}>Upload Document</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.key}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  uploadButton: {
    padding: 8,
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoriesList: {
    paddingRight: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginRight: 8,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  categoryBadge: {
    backgroundColor: '#E5E5EA',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  selectedCategoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  categoryBadgeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  selectedCategoryBadgeText: {
    color: '#FFFFFF',
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    marginRight: 12,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  documentsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  documentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  documentInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentDetails: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  documentMeta: {
    gap: 4,
  },
  documentDate: {
    fontSize: 12,
    color: '#666',
  },
  documentExpiry: {
    fontSize: 12,
    color: '#FF3B30',
  },
  documentStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  verificationInfo: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  verificationText: {
    fontSize: 12,
    color: '#34C759',
  },
  documentActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#007AFF',
    marginLeft: 4,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 24,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});
