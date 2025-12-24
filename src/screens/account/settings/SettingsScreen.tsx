import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ThemedView } from '../../../components/themed-view';
import { AuthService } from '../../../services/auth/authService';

/**
 * Settings Screen - App preferences and configurations
 * Manages notification settings, privacy, security, and app preferences
 */
export default function SettingsScreen() {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    // Notifications
    pushNotifications: true,
    bookingRequests: true,
    bookingConfirmations: true,
    paymentUpdates: true,
    customerMessages: true,
    tripReminders: true,
    ratingsReviews: true,
    promotionsUpdates: false,
    securityAlerts: true,
    doNotDisturb: false,
    doNotDisturbFrom: '23:00',
    doNotDisturbTo: '07:00',

    // Privacy
    profileVisibility: 'public',
    showLastActive: true,
    whoCanContactMe: 'everyone',
    shareAnalytics: true,

    // Location
    enableLocationServices: true,
    trackingAccuracy: 'high',

    // Security
    biometricLogin: false,
    twoFactorAuth: false,
    sessionTimeout: '30min',

    // Backup
    autoBackupData: true,

    // Display
    theme: 'system',
    language: 'english',
    textSize: 'medium',
  });

  // Handle setting toggle
  const toggleSetting = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  // Handle dropdown setting
  const handleDropdownSetting = (setting: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value,
    }));
  };

  // Clear cache
  const clearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data and may improve app performance.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement cache clearing
            Alert.alert('Success', 'Cache cleared successfully');
          },
        },
      ]
    );
  };

  // Clear offline data
  const clearOfflineData = () => {
    Alert.alert(
      'Clear Offline Data',
      'This will remove all offline data. You may need to re-download content.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement offline data clearing
            Alert.alert('Success', 'Offline data cleared successfully');
          },
        },
      ]
    );
  };

  // Backup now
  const backupNow = () => {
    Alert.alert(
      'Backup Data',
      'This will backup your data to the cloud.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Backup',
          onPress: () => {
            // TODO: Implement backup
            Alert.alert('Success', 'Data backed up successfully');
          },
        },
      ]
    );
  };

  // Logout function
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
              // Call logout service
              const result = await AuthService.logout();

              if (result.success) {
                // Navigate to authentication stack (login screen)
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'AuthStack' }],
                });
              } else {
                Alert.alert('Error', result.error || 'Failed to logout. Please try again.');
              }
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'An unexpected error occurred. Please try again.');
            }
          },
        },
      ]
    );
  };

  // Render setting item
  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle?: string,
    onPress?: () => void,
    rightElement?: React.ReactNode
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={20} color="#666" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />}
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          {renderSettingItem(
            'notifications-outline',
            'Push Notifications',
            'Receive push notifications',
            undefined,
            <Switch
              value={settings.pushNotifications}
              onValueChange={() => toggleSetting('pushNotifications')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            'calendar-outline',
            'Booking Requests',
            'Get notified about new booking requests',
            undefined,
            <Switch
              value={settings.bookingRequests}
              onValueChange={() => toggleSetting('bookingRequests')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            'checkmark-circle-outline',
            'Booking Confirmations',
            'Get notified when bookings are confirmed',
            undefined,
            <Switch
              value={settings.bookingConfirmations}
              onValueChange={() => toggleSetting('bookingConfirmations')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            'cash-outline',
            'Payment Updates',
            'Get notified about payments and withdrawals',
            undefined,
            <Switch
              value={settings.paymentUpdates}
              onValueChange={() => toggleSetting('paymentUpdates')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            'chatbubble-outline',
            'Customer Messages',
            'Get notified when customers message you',
            undefined,
            <Switch
              value={settings.customerMessages}
              onValueChange={() => toggleSetting('customerMessages')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            'time-outline',
            'Trip Reminders',
            'Get reminded about upcoming trips',
            undefined,
            <Switch
              value={settings.tripReminders}
              onValueChange={() => toggleSetting('tripReminders')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            'star-outline',
            'Ratings & Reviews',
            'Get notified about new reviews',
            undefined,
            <Switch
              value={settings.ratingsReviews}
              onValueChange={() => toggleSetting('ratingsReviews')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            'megaphone-outline',
            'Promotions & Updates',
            'Get promotional offers and app updates',
            undefined,
            <Switch
              value={settings.promotionsUpdates}
              onValueChange={() => toggleSetting('promotionsUpdates')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            'shield-checkmark-outline',
            'Security Alerts',
            'Get notified about security events',
            undefined,
            <Switch
              value={settings.securityAlerts}
              onValueChange={() => toggleSetting('securityAlerts')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            'moon-outline',
            'Do Not Disturb',
            'Silence notifications during sleep hours',
            undefined,
            <Switch
              value={settings.doNotDisturb}
              onValueChange={() => toggleSetting('doNotDisturb')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {settings.doNotDisturb && renderSettingItem(
            'time-outline',
            'Do Not Disturb Hours',
            `${settings.doNotDisturbFrom} - ${settings.doNotDisturbTo}`,
            () => {
              // TODO: Open time picker
              console.log('Open time picker');
            }
          )}
        </View>

        {/* Display Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>

          {renderSettingItem(
            'contrast-outline',
            'Theme',
            'Light / Dark / System',
            () => {
              Alert.alert(
                'Select Theme',
                'Choose your preferred theme',
                [
                  { text: 'Light', onPress: () => handleDropdownSetting('theme', 'light') },
                  { text: 'Dark', onPress: () => handleDropdownSetting('theme', 'dark') },
                  { text: 'System', onPress: () => handleDropdownSetting('theme', 'system') },
                  { text: 'Cancel', style: 'cancel' },
                ]
              );
            }
          )}

          {renderSettingItem(
            'language-outline',
            'Language',
            'English',
            () => {
              // TODO: Navigate to language selection
              console.log('Navigate to language selection');
            }
          )}

          {renderSettingItem(
            'text-outline',
            'Text Size',
            'Medium',
            () => {
              Alert.alert(
                'Select Text Size',
                'Choose your preferred text size',
                [
                  { text: 'Small', onPress: () => handleDropdownSetting('textSize', 'small') },
                  { text: 'Medium', onPress: () => handleDropdownSetting('textSize', 'medium') },
                  { text: 'Large', onPress: () => handleDropdownSetting('textSize', 'large') },
                  { text: 'Cancel', style: 'cancel' },
                ]
              );
            }
          )}
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>

          {renderSettingItem(
            'eye-outline',
            'Profile Visibility',
            'Public / Private',
            () => {
              Alert.alert(
                'Profile Visibility',
                'Choose who can see your profile',
                [
                  { text: 'Public', onPress: () => handleDropdownSetting('profileVisibility', 'public') },
                  { text: 'Private', onPress: () => handleDropdownSetting('profileVisibility', 'private') },
                  { text: 'Cancel', style: 'cancel' },
                ]
              );
            }
          )}

          {renderSettingItem(
            'time-outline',
            'Show Last Active',
            'Show when you were last active',
            undefined,
            <Switch
              value={settings.showLastActive}
              onValueChange={() => toggleSetting('showLastActive')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            'people-outline',
            'Who Can Contact Me',
            'Everyone / Customers Only',
            () => {
              Alert.alert(
                'Contact Permissions',
                'Choose who can contact you',
                [
                  { text: 'Everyone', onPress: () => handleDropdownSetting('whoCanContactMe', 'everyone') },
                  { text: 'Customers Only', onPress: () => handleDropdownSetting('whoCanContactMe', 'customers') },
                  { text: 'Cancel', style: 'cancel' },
                ]
              );
            }
          )}

          {renderSettingItem(
            'analytics-outline',
            'Share Analytics',
            'Help improve MOVA by sharing usage data',
            undefined,
            <Switch
              value={settings.shareAnalytics}
              onValueChange={() => toggleSetting('shareAnalytics')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>

          {renderSettingItem(
            'location-outline',
            'Enable Location Services',
            'Allow MOVA to access your location',
            undefined,
            <Switch
              value={settings.enableLocationServices}
              onValueChange={() => toggleSetting('enableLocationServices')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            'speedometer-outline',
            'Tracking Accuracy',
            'High / Medium / Low',
            () => {
              Alert.alert(
                'Tracking Accuracy',
                'Choose location tracking accuracy',
                [
                  { text: 'High', onPress: () => handleDropdownSetting('trackingAccuracy', 'high') },
                  { text: 'Medium', onPress: () => handleDropdownSetting('trackingAccuracy', 'medium') },
                  { text: 'Low', onPress: () => handleDropdownSetting('trackingAccuracy', 'low') },
                  { text: 'Cancel', style: 'cancel' },
                ]
              );
            }
          )}
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          {renderSettingItem(
            'finger-print-outline',
            'Biometric Login',
            'Use fingerprint or face ID to login',
            undefined,
            <Switch
              value={settings.biometricLogin}
              onValueChange={() => toggleSetting('biometricLogin')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            'shield-outline',
            'Two-Factor Authentication',
            'Add extra security to your account',
            undefined,
            <Switch
              value={settings.twoFactorAuth}
              onValueChange={() => toggleSetting('twoFactorAuth')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            'time-outline',
            'Session Timeout',
            '15 min / 30 min / 1 hour / Never',
            () => {
              Alert.alert(
                'Session Timeout',
                'Choose when to automatically logout',
                [
                  { text: '15 min', onPress: () => handleDropdownSetting('sessionTimeout', '15min') },
                  { text: '30 min', onPress: () => handleDropdownSetting('sessionTimeout', '30min') },
                  { text: '1 hour', onPress: () => handleDropdownSetting('sessionTimeout', '1hour') },
                  { text: 'Never', onPress: () => handleDropdownSetting('sessionTimeout', 'never') },
                  { text: 'Cancel', style: 'cancel' },
                ]
              );
            }
          )}
        </View>

        {/* Storage Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storage</Text>

          {renderSettingItem(
            'folder-outline',
            'Cache Size',
            '45 MB',
            undefined,
            <TouchableOpacity style={styles.clearButton} onPress={clearCache}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          )}

          {renderSettingItem(
            'download-outline',
            'Offline Data',
            '12 MB',
            undefined,
            <TouchableOpacity style={styles.clearButton} onPress={clearOfflineData}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Backup Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Backup</Text>

          {renderSettingItem(
            'cloud-upload-outline',
            'Auto-backup Data',
            'Automatically backup your data',
            undefined,
            <Switch
              value={settings.autoBackupData}
              onValueChange={() => toggleSetting('autoBackupData')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            'cloud-upload-outline',
            'Last Backup',
            '2 days ago',
            backupNow,
            <TouchableOpacity style={styles.backupButton} onPress={backupNow}>
              <Text style={styles.backupButtonText}>Backup Now</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          {renderSettingItem(
            'log-out-outline',
            'Logout',
            'Sign out of your account',
            handleLogout,
            <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
          )}
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          {renderSettingItem(
            'information-circle-outline',
            'App Version',
            '1.0.0',
            () => {
              // TODO: Check for updates
              console.log('Check for updates');
            }
          )}

          {renderSettingItem(
            'document-text-outline',
            'Terms & Conditions',
            undefined,
            () => {
              // TODO: Open terms and conditions
              console.log('Open terms and conditions');
            }
          )}

          {renderSettingItem(
            'shield-outline',
            'Privacy Policy',
            undefined,
            () => {
              // TODO: Open privacy policy
              console.log('Open privacy policy');
            }
          )}
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingIcon: {
    width: 24,
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FF3B30',
    borderRadius: 6,
  },
  clearButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  backupButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  backupButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 40,
  },
});
