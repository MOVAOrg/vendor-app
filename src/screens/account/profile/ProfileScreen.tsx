import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

/**
 * Profile Screen - Main account management screen
 * Displays vendor profile information, settings, and account options
 * Modern, visually appealing design with improved UX
 */
export default function ProfileScreen() {
  const [profile, setProfile] = useState({
    name: 'Amit Sharma',
    phone: '+91 98765 43210',
    email: 'amit@email.com',
    profilePhoto: null,
    verificationStatus: 'verified',
    memberSince: 'Jan 2025',
    businessName: 'Sharma Car Rentals',
    totalEarnings: '₹1,25,000',
    totalBookings: 142,
    rating: 4.8,
  });

  const [settings, setSettings] = useState({
    notifications: true,
    autoAcceptBookings: false,
    showPhoneToCustomers: true,
    twoFactorAuth: false,
  });

  const [loading, setLoading] = useState(false);

  // Load profile data
  const loadProfile = async () => {
    setLoading(true);
    try {
      // TODO: Implement actual API call to fetch profile data
      // const profileData = await vendorService.getCurrentVendor();
      // setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Handle setting toggle
  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  // Handle edit profile
  const handleEditProfile = () => {
    // TODO: Navigate to edit profile screen
    console.log('Navigate to edit profile');
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement logout logic
            console.log('User logged out');
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadProfile} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Gradient Background */}
        <View style={styles.headerContainer}>
          <View style={styles.headerGradient}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Profile</Text>
              <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                <View style={styles.editButtonBackground}>
                  <Ionicons name="create-outline" size={18} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Enhanced Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <View style={styles.profilePhotoContainer}>
              {profile.profilePhoto ? (
                <Image source={{ uri: profile.profilePhoto }} style={styles.profilePhoto} />
              ) : (
                <View style={styles.profilePhotoPlaceholder}>
                  <Ionicons name="person" size={50} color="#FFFFFF" />
                </View>
              )}
              <TouchableOpacity style={styles.cameraButton}>
                <Ionicons name="camera" size={14} color="#007AFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.businessName}>{profile.businessName}</Text>
              <Text style={styles.profilePhone}>{profile.phone}</Text>
              <Text style={styles.profileEmail}>{profile.email}</Text>

              <View style={styles.verificationBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#34C759" />
                <Text style={styles.verificationText}>Verified Partner</Text>
              </View>
            </View>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{profile.totalEarnings}</Text>
                <Text style={styles.statLabel}>Total Earnings</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{profile.totalBookings}</Text>
                <Text style={styles.statLabel}>Bookings</Text>
              </View>
              <View style={styles.statCard}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.statValue}>{profile.rating}</Text>
                </View>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>

            <Text style={styles.memberSince}>Member since {profile.memberSince}</Text>
          </View>
        </View>

        {/* Account Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="person-outline" size={20} color="#007AFF" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>Personal Information</Text>
                <Text style={styles.menuItemSubtext}>Update your personal details</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="business-outline" size={20} color="#34C759" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>Business Information</Text>
                <Text style={styles.menuItemSubtext}>Manage business details</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="location-outline" size={20} color="#FF9500" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>Location</Text>
                <Text style={styles.menuItemSubtext}>Service area settings</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="card-outline" size={20} color="#AF52DE" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>Bank Details</Text>
                <Text style={styles.menuItemSubtext}>Payment & withdrawal settings</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="document-text-outline" size={20} color="#FF9500" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>View Documents</Text>
                <Text style={styles.menuItemSubtext}>All uploaded documents</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="shield-checkmark-outline" size={20} color="#34C759" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>Verification Status</Text>
                <Text style={styles.menuItemSubtext}>Check verification progress</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.menuCard}>
            <View style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="notifications-outline" size={20} color="#007AFF" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>Notifications</Text>
                <Text style={styles.menuItemSubtext}>Push notifications</Text>
              </View>
              <Switch
                value={settings.notifications}
                onValueChange={() => toggleSetting('notifications')}
                trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                thumbColor="#FFFFFF"
                style={styles.switch}
              />
            </View>

            <View style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#34C759" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>Auto-accept Bookings</Text>
                <Text style={styles.menuItemSubtext}>Automatically accept bookings</Text>
              </View>
              <Switch
                value={settings.autoAcceptBookings}
                onValueChange={() => toggleSetting('autoAcceptBookings')}
                trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                thumbColor="#FFFFFF"
                style={styles.switch}
              />
            </View>

            <View style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="eye-outline" size={20} color="#AF52DE" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>Show Phone to Customers</Text>
                <Text style={styles.menuItemSubtext}>Display contact number</Text>
              </View>
              <Switch
                value={settings.showPhoneToCustomers}
                onValueChange={() => toggleSetting('showPhoneToCustomers')}
                trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                thumbColor="#FFFFFF"
                style={styles.switch}
              />
            </View>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="language-outline" size={20} color="#FF3B30" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>Language</Text>
                <Text style={styles.menuItemSubtext}>App language settings</Text>
              </View>
              <View style={styles.languageContainer}>
                <Text style={styles.languageText}>English</Text>
                <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Help</Text>
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="help-circle-outline" size={20} color="#007AFF" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>Help Center</Text>
                <Text style={styles.menuItemSubtext}>FAQs and guides</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="call-outline" size={20} color="#34C759" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>Contact Support</Text>
                <Text style={styles.menuItemSubtext}>Get help from our team</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="star-outline" size={20} color="#FFD700" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>Rate App</Text>
                <Text style={styles.menuItemSubtext}>Rate us on app store</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Legal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="document-outline" size={20} color="#8E8E93" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>Terms & Conditions</Text>
                <Text style={styles.menuItemSubtext}>Read our terms</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="shield-outline" size={20} color="#8E8E93" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>Privacy Policy</Text>
                <Text style={styles.menuItemSubtext}>Data protection info</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="information-circle-outline" size={20} color="#8E8E93" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemText}>App Version</Text>
                <Text style={styles.menuItemSubtext}>Version 1.0.0</Text>
              </View>
              <Text style={styles.versionText}>1.0.0</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.logoutButtonContent}>
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  // Header Styles
  headerContainer: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerGradient: {
    backgroundColor: '#007AFF',
    paddingTop: 60,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
  },
  editButton: {
    padding: 8,
  },
  editButtonBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 8,
  },

  // Profile Section Styles
  profileSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: -30,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    alignItems: 'center',
  },
  profilePhotoContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  profilePhotoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
    fontFamily: 'Montserrat-Bold',
  },
  businessName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'OpenSans-Regular',
  },
  profilePhone: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
    fontFamily: 'OpenSans-Regular',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    fontFamily: 'OpenSans-Regular',
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#34C759',
  },
  verificationText: {
    fontSize: 14,
    color: '#34C759',
    marginLeft: 4,
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },

  // Stats Container
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Montserrat-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontFamily: 'OpenSans-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberSince: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'OpenSans-Regular',
  },

  // Section Styles
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    fontFamily: 'Montserrat-Bold',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },

  // Menu Item Styles
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginBottom: 2,
    fontFamily: 'OpenSans-SemiBold',
  },
  menuItemSubtext: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'OpenSans-Regular',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 16,
    color: '#666',
    marginRight: 4,
    fontFamily: 'OpenSans-Regular',
  },
  versionText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    fontFamily: 'OpenSans-SemiBold',
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },

  // Logout Button
  logoutButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#FF3B30',
  },
  logoutText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: 'OpenSans-SemiBold',
  },
  bottomSpacer: {
    height: 40,
  },
});
