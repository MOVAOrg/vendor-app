import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../../../components/ui/Card';
import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProfileScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const tabs = [
    { id: 'overview', title: 'Overview', icon: 'person' },
    { id: 'business', title: 'Business', icon: 'business' },
    { id: 'documents', title: 'Documents', icon: 'document' },
    { id: 'settings', title: 'Settings', icon: 'settings' },
  ];

  // Mock profile data
  const profileData = {
    personal: {
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      profileImage: 'https://via.placeholder.com/150x150/007AFF/FFFFFF?text=RK',
      joinDate: '2024-01-15',
      status: 'verified',
      rating: 4.8,
      totalBookings: 45,
    },
    business: {
      businessName: 'Rajesh Car Rentals',
      businessType: 'Car Rental Service',
      registrationNumber: 'REG123456789',
      gstNumber: 'GST123456789',
      address: '123 Main Street, Mumbai, Maharashtra 400001',
      establishedDate: '2020-05-15',
      licenseNumber: 'LIC123456789',
    },
    documents: {
      panCard: 'uploaded',
      aadharCard: 'uploaded',
      drivingLicense: 'uploaded',
      vehicleRC: 'uploaded',
      insurance: 'uploaded',
      bankPassbook: 'uploaded',
    },
    stats: {
      totalEarnings: 125000,
      thisMonthEarnings: 45000,
      averageRating: 4.8,
      totalBookings: 45,
      completedBookings: 42,
      cancelledBookings: 3,
    },
  };

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

  const handleEditProfile = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('EditProfileScreen');
  };

  const handleTabChange = (tab: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
  };

  const handleDocumentUpload = (documentType: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Upload Document', `Upload ${documentType} functionality coming soon!`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return BrandColors.accent;
      case 'pending': return BrandColors.warning;
      case 'rejected': return BrandColors.error;
      default: return BrandColors.textLight;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return 'checkmark-circle';
      case 'pending': return 'time';
      case 'rejected': return 'close-circle';
      default: return 'help-circle';
    }
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Profile Header */}
      <Card variant="elevated" size="lg" style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: profileData.personal.profileImage }} style={styles.profileImage} />

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profileData.personal.name}</Text>
            <Text style={styles.profileEmail}>{profileData.personal.email}</Text>
            <Text style={styles.profilePhone}>{profileData.personal.phone}</Text>

            <View style={styles.profileStatus}>
              <Ionicons name={getStatusIcon(profileData.personal.status)} size={16} color={getStatusColor(profileData.personal.status)} />
              <Text style={[styles.profileStatusText, { color: getStatusColor(profileData.personal.status) }]}>
                {profileData.personal.status.charAt(0).toUpperCase() + profileData.personal.status.slice(1)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.profileStats}>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatValue}>{profileData.personal.rating}</Text>
            <Text style={styles.profileStatLabel}>Rating</Text>
          </View>

          <View style={styles.profileStat}>
            <Text style={styles.profileStatValue}>{profileData.personal.totalBookings}</Text>
            <Text style={styles.profileStatLabel}>Bookings</Text>
          </View>

          <View style={styles.profileStat}>
            <Text style={styles.profileStatValue}>₹{profileData.stats.totalEarnings.toLocaleString()}</Text>
            <Text style={styles.profileStatLabel}>Earnings</Text>
          </View>
        </View>
      </Card>

      {/* Quick Actions */}
      <Card variant="elevated" size="md" style={styles.actionsCard}>
        <Text style={styles.actionsTitle}>Quick Actions</Text>

        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionItem} onPress={handleEditProfile}>
            <LinearGradient
              colors={[BrandColors.primary, BrandColors.primaryDark]}
              style={styles.actionGradient}
            >
              <Ionicons name="create" size={20} color={BrandColors.secondary} />
              <Text style={styles.actionText}>Edit Profile</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <LinearGradient
              colors={[BrandColors.accent, BrandColors.accentLight]}
              style={styles.actionGradient}
            >
              <Ionicons name="document" size={20} color={BrandColors.secondary} />
              <Text style={styles.actionText}>Documents</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <LinearGradient
              colors={[BrandColors.dot, BrandColors.accent]}
              style={styles.actionGradient}
            >
              <Ionicons name="settings" size={20} color={BrandColors.secondary} />
              <Text style={styles.actionText}>Settings</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <LinearGradient
              colors={[BrandColors.warning, BrandColors.accent]}
              style={styles.actionGradient}
            >
              <Ionicons name="help-circle" size={20} color={BrandColors.secondary} />
              <Text style={styles.actionText}>Help</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Performance Summary */}
      <Card variant="elevated" size="lg" style={styles.performanceCard}>
        <Text style={styles.performanceTitle}>Performance Summary</Text>

        <View style={styles.performanceStats}>
          <View style={styles.performanceStat}>
            <Text style={styles.performanceStatValue}>₹{profileData.stats.thisMonthEarnings.toLocaleString()}</Text>
            <Text style={styles.performanceStatLabel}>This Month</Text>
          </View>

          <View style={styles.performanceStat}>
            <Text style={styles.performanceStatValue}>{profileData.stats.completedBookings}</Text>
            <Text style={styles.performanceStatLabel}>Completed</Text>
          </View>

          <View style={styles.performanceStat}>
            <Text style={styles.performanceStatValue}>{profileData.stats.cancelledBookings}</Text>
            <Text style={styles.performanceStatLabel}>Cancelled</Text>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderBusiness = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="lg" style={styles.businessCard}>
        <Text style={styles.businessTitle}>Business Information</Text>

        <View style={styles.businessItem}>
          <Text style={styles.businessLabel}>Business Name</Text>
          <Text style={styles.businessValue}>{profileData.business.businessName}</Text>
        </View>

        <View style={styles.businessItem}>
          <Text style={styles.businessLabel}>Business Type</Text>
          <Text style={styles.businessValue}>{profileData.business.businessType}</Text>
        </View>

        <View style={styles.businessItem}>
          <Text style={styles.businessLabel}>Registration Number</Text>
          <Text style={styles.businessValue}>{profileData.business.registrationNumber}</Text>
        </View>

        <View style={styles.businessItem}>
          <Text style={styles.businessLabel}>GST Number</Text>
          <Text style={styles.businessValue}>{profileData.business.gstNumber}</Text>
        </View>

        <View style={styles.businessItem}>
          <Text style={styles.businessLabel}>Address</Text>
          <Text style={styles.businessValue}>{profileData.business.address}</Text>
        </View>

        <View style={styles.businessItem}>
          <Text style={styles.businessLabel}>Established Date</Text>
          <Text style={styles.businessValue}>{profileData.business.establishedDate}</Text>
        </View>

        <View style={styles.businessItem}>
          <Text style={styles.businessLabel}>License Number</Text>
          <Text style={styles.businessValue}>{profileData.business.licenseNumber}</Text>
        </View>
      </Card>
    </View>
  );

  const renderDocuments = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="lg" style={styles.documentsCard}>
        <Text style={styles.documentsTitle}>Document Status</Text>

        {Object.entries(profileData.documents).map(([document, status]) => (
          <TouchableOpacity
            key={document}
            style={styles.documentItem}
            onPress={() => handleDocumentUpload(document)}
          >
            <View style={styles.documentLeft}>
              <View style={[
                styles.documentIcon,
                { backgroundColor: `${getStatusColor(status)}20` },
              ]}>
                <Ionicons name="document" size={20} color={getStatusColor(status)} />
              </View>

              <View style={styles.documentInfo}>
                <Text style={styles.documentName}>
                  {document.charAt(0).toUpperCase() + document.slice(1).replace(/([A-Z])/g, ' $1')}
                </Text>
                <Text style={styles.documentSubtitle}>
                  {status === 'uploaded' ? 'Document uploaded' : 'Document pending'}
                </Text>
              </View>
            </View>

            <View style={styles.documentRight}>
              <Ionicons name={getStatusIcon(status)} size={20} color={getStatusColor(status)} />
            </View>
          </TouchableOpacity>
        ))}
      </Card>
    </View>
  );

  const renderSettings = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="lg" style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>Account Settings</Text>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications" size={20} color={BrandColors.primary} />
            <Text style={styles.settingName}>Notifications</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={BrandColors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="lock-closed" size={20} color={BrandColors.primary} />
            <Text style={styles.settingName}>Privacy & Security</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={BrandColors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="language" size={20} color={BrandColors.primary} />
            <Text style={styles.settingName}>Language</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={BrandColors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="help-circle" size={20} color={BrandColors.primary} />
            <Text style={styles.settingName}>Help & Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={BrandColors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="information-circle" size={20} color={BrandColors.primary} />
            <Text style={styles.settingName}>About</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={BrandColors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="log-out" size={20} color={BrandColors.error} />
            <Text style={[styles.settingName, { color: BrandColors.error }]}>Logout</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={BrandColors.textLight} />
        </TouchableOpacity>
      </Card>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'business': return renderBusiness();
      case 'documents': return renderDocuments();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

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
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>
              Manage your account information
            </Text>
          </View>
        </Animated.View>

        {/* Tabs */}
        <Animated.View
          style={[
            styles.tabsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tabsRow}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  style={[
                    styles.tab,
                    activeTab === tab.id && styles.tabActive,
                  ]}
                  onPress={() => handleTabChange(tab.id)}
                >
                  <Ionicons
                    name={tab.icon as any}
                    size={20}
                    color={activeTab === tab.id ? BrandColors.primary : BrandColors.textLight}
                  />
                  <Text style={[
                    styles.tabText,
                    activeTab === tab.id && styles.tabTextActive,
                  ]}>
                    {tab.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Tab Content */}
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {renderTabContent()}
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

  // Tabs
  tabsContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  tabsRow: {
    flexDirection: 'row',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    marginRight: Spacing.sm,
    backgroundColor: BrandColors.gray50,
  },
  tabActive: {
    backgroundColor: BrandColors.primary,
  },
  tabText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textLight,
    marginLeft: Spacing.xs,
  },
  tabTextActive: {
    color: BrandColors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Content
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  tabContent: {
    width: '100%',
  },

  // Profile
  profileCard: {
    marginBottom: Spacing.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  profileEmail: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  profilePhone: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.sm,
  },
  profileStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileStatusText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginLeft: Spacing.xs,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: BrandColors.borderLight,
  },
  profileStat: {
    alignItems: 'center',
  },
  profileStatValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  profileStatLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },

  // Actions
  actionsCard: {
    marginBottom: Spacing.lg,
  },
  actionsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '48%',
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  actionText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.secondary,
    marginLeft: Spacing.sm,
  },

  // Performance
  performanceCard: {
    marginBottom: Spacing.lg,
  },
  performanceTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  performanceStat: {
    alignItems: 'center',
  },
  performanceStatValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  performanceStatLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },

  // Business
  businessCard: {
    marginBottom: Spacing.lg,
  },
  businessTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  businessItem: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.borderLight,
  },
  businessLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  businessValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
  },

  // Documents
  documentsCard: {
    marginBottom: Spacing.lg,
  },
  documentsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.borderLight,
  },
  documentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  documentSubtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },
  documentRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Settings
  settingsCard: {
    marginBottom: Spacing.lg,
  },
  settingsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.borderLight,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginLeft: Spacing.md,
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
