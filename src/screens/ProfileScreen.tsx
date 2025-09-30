import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { ThemedView } from '../components/themed-view';
import { VendorService } from '../services/vendorService';
import { Vendor } from '../types';

/**
 * ProfileScreen Component
 * Displays vendor profile information and settings
 */
export default function ProfileScreen() {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    loadVendorProfile();
  }, []);

  /**
   * Load vendor profile from the service
   */
  const loadVendorProfile = async () => {
    try {
      setLoading(true);
      const response = await VendorService.getCurrentVendor();

      if (response.success && response.data) {
        setVendor(response.data);
      } else {
        Alert.alert('Error', response.error || 'Failed to load profile');
      }
    } catch (error) {
      console.error('Error loading vendor profile:', error);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await VendorService.logoutVendor();
              if (response.success) {
                // TODO: Navigate to login screen
                Alert.alert('Success', 'Logged out successfully');
              } else {
                Alert.alert('Error', response.error || 'Failed to logout');
              }
            } catch (error) {
              console.error('Error logging out:', error);
              Alert.alert('Error', 'Failed to logout');
            }
          },
        },
      ]
    );
  };

  /**
   * Handle edit profile
   */
  const handleEditProfile = () => {
    // TODO: Navigate to edit profile screen
    Alert.alert('Edit Profile', 'Edit profile functionality coming soon');
  };

  /**
   * Handle notification toggle
   * @param value - New notification setting
   */
  const handleNotificationToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    // TODO: Save notification preference to backend
    console.log('Notification setting changed:', value);
  };

  /**
   * Render profile section
   */
  const renderProfileSection = () => (
    <View style={styles.section}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={40} color="#007AFF" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.vendorName}>
            {vendor?.name || 'Loading...'}
          </Text>
          <Text style={styles.companyName}>
            {vendor?.companyName || 'Company Name'}
          </Text>
          <View style={styles.verificationBadge}>
            <Ionicons
              name={vendor?.isVerified ? 'checkmark-circle' : 'time-outline'}
              size={16}
              color={vendor?.isVerified ? '#28A745' : '#FFA500'}
            />
            <Text style={[
              styles.verificationText,
              { color: vendor?.isVerified ? '#28A745' : '#FFA500' }
            ]}>
              {vendor?.isVerified ? 'Verified' : 'Pending Verification'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditProfile}
        >
          <Ionicons name="create-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  /**
   * Render contact information section
   */
  const renderContactSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contact Information</Text>

      <View style={styles.infoRow}>
        <Ionicons name="mail-outline" size={20} color="#666" />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{vendor?.email || 'N/A'}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="call-outline" size={20} color="#666" />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{vendor?.phone || 'N/A'}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={20} color="#666" />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Address</Text>
          <Text style={styles.infoValue}>{vendor?.address || 'N/A'}</Text>
        </View>
      </View>
    </View>
  );

  /**
   * Render settings section
   */
  const renderSettingsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Settings</Text>

      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>Push Notifications</Text>
          <Text style={styles.settingDescription}>
            Receive notifications about bookings and updates
          </Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleNotificationToggle}
          trackColor={{ false: '#E5E5E5', true: '#007AFF' }}
          thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>

      <TouchableOpacity style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>Privacy Policy</Text>
          <Text style={styles.settingDescription}>
            View our privacy policy
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>Terms of Service</Text>
          <Text style={styles.settingDescription}>
            View terms and conditions
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
      </TouchableOpacity>
    </View>
  );

  /**
   * Render account actions section
   */
  const renderAccountSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Account</Text>

      <TouchableOpacity style={styles.actionRow}>
        <Ionicons name="help-circle-outline" size={24} color="#007AFF" />
        <Text style={styles.actionLabel}>Help & Support</Text>
        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionRow}>
        <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
        <Text style={styles.actionLabel}>About</Text>
        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionRow, styles.logoutRow]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={24} color="#DC3545" />
        <Text style={[styles.actionLabel, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        {renderProfileSection()}

        {/* Contact Information */}
        {renderContactSection()}

        {/* Settings */}
        {renderSettingsSection()}

        {/* Account Actions */}
        {renderAccountSection()}

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>MovaVendorApp v1.0.0</Text>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'OpenSans-Regular',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    fontFamily: 'Montserrat-Bold',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  companyName: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
    fontFamily: 'OpenSans-Regular',
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  verificationText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
    fontFamily: 'Montserrat-SemiBold',
  },
  editButton: {
    padding: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'OpenSans-Regular',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
    fontFamily: 'OpenSans-Medium',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'OpenSans-Medium',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    fontFamily: 'OpenSans-Regular',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
    flex: 1,
    fontFamily: 'OpenSans-Medium',
  },
  logoutRow: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#DC3545',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'OpenSans-Regular',
  },
});
