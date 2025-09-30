import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Offline Screen - Handles offline state and connectivity issues
 * Displays offline message with retry options and cached data access
 */
interface OfflineScreenProps {
  onRetry?: () => void;
  onViewCachedData?: () => void;
  showCachedDataOption?: boolean;
  cachedDataAvailable?: boolean;
  lastSyncTime?: string;
}

export default function OfflineScreen({
  onRetry,
  onViewCachedData,
  showCachedDataOption = true,
  cachedDataAvailable = false,
  lastSyncTime,
}: OfflineScreenProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  // Monitor network connectivity
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
      setConnectionType(state.type);
    });

    return unsubscribe;
  }, []);

  // Handle retry connection
  const handleRetry = async () => {
    setRetrying(true);
    try {
      if (onRetry) {
        await onRetry();
      } else {
        // Default retry logic
        const netInfo = await NetInfo.fetch();
        if (netInfo.isConnected) {
          Alert.alert('Success', 'Connection restored!');
        } else {
          Alert.alert('Still Offline', 'Please check your internet connection.');
        }
      }
    } catch (error) {
      console.error('Retry failed:', error);
      Alert.alert('Error', 'Failed to reconnect. Please try again.');
    } finally {
      setRetrying(false);
    }
  };

  // Handle view cached data
  const handleViewCachedData = () => {
    if (onViewCachedData) {
      onViewCachedData();
    } else {
      // Default cached data view
      Alert.alert(
        'Cached Data',
        'View previously downloaded data that\'s available offline.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'View', onPress: () => console.log('View cached data') },
        ]
      );
    }
  };

  // Handle WiFi settings
  const handleOpenWiFiSettings = () => {
    Alert.alert(
      'WiFi Settings',
      'Open WiFi settings to connect to a network?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => console.log('Open WiFi settings') },
      ]
    );
  };

  // Handle mobile data settings
  const handleOpenMobileDataSettings = () => {
    Alert.alert(
      'Mobile Data',
      'Enable mobile data to connect to the internet?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => console.log('Open mobile data settings') },
      ]
    );
  };

  // Get connection status message
  const getConnectionStatusMessage = () => {
    if (isConnected) {
      return `Connected via ${connectionType}`;
    }

    switch (connectionType) {
      case 'wifi':
        return 'WiFi is connected but no internet access';
      case 'cellular':
        return 'Mobile data is connected but no internet access';
      default:
        return 'No internet connection available';
    }
  };

  // Get connection icon
  const getConnectionIcon = () => {
    if (isConnected) {
      return 'wifi';
    }

    switch (connectionType) {
      case 'wifi':
        return 'wifi-outline';
      case 'cellular':
        return 'cellular-outline';
      default:
        return 'cloud-offline-outline';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        {/* Offline Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name={getConnectionIcon()} size={64} color="#FF3B30" />
          </View>

          {/* Connection status indicator */}
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, { backgroundColor: isConnected ? '#34C759' : '#FF3B30' }]} />
            <Text style={styles.statusText}>{getConnectionStatusMessage()}</Text>
          </View>
        </View>

        {/* Main Message */}
        <Text style={styles.title}>You're Offline</Text>
        <Text style={styles.message}>
          It looks like you're not connected to the internet. Please check your connection and try again.
        </Text>

        {/* Connection Details */}
        <View style={styles.connectionDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="wifi-outline" size={16} color="#666" />
            <Text style={styles.detailText}>WiFi: {connectionType === 'wifi' ? 'Connected' : 'Not Connected'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="cellular-outline" size={16} color="#666" />
            <Text style={styles.detailText}>Mobile Data: {connectionType === 'cellular' ? 'Connected' : 'Not Connected'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="globe-outline" size={16} color="#666" />
            <Text style={styles.detailText}>Internet: {isConnected ? 'Available' : 'Not Available'}</Text>
          </View>
        </View>

        {/* Cached Data Info */}
        {cachedDataAvailable && (
          <View style={styles.cachedDataContainer}>
            <Ionicons name="download-outline" size={20} color="#34C759" />
            <Text style={styles.cachedDataText}>Cached data available</Text>
            {lastSyncTime && (
              <Text style={styles.lastSyncText}>Last sync: {lastSyncTime}</Text>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.retryButton, retrying && styles.retryButtonDisabled]}
            onPress={handleRetry}
            disabled={retrying}
          >
            <Ionicons name="refresh" size={20} color="#FFFFFF" />
            <Text style={styles.retryButtonText}>
              {retrying ? 'Retrying...' : 'Try Again'}
            </Text>
          </TouchableOpacity>

          {showCachedDataOption && cachedDataAvailable && (
            <TouchableOpacity style={styles.cachedDataButton} onPress={handleViewCachedData}>
              <Ionicons name="folder-outline" size={20} color="#007AFF" />
              <Text style={styles.cachedDataButtonText}>View Cached Data</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Settings Options */}
        <View style={styles.settingsOptions}>
          <Text style={styles.settingsTitle}>Connection Settings:</Text>

          <TouchableOpacity style={styles.settingOption} onPress={handleOpenWiFiSettings}>
            <Ionicons name="wifi-outline" size={20} color="#007AFF" />
            <Text style={styles.settingOptionText}>WiFi Settings</Text>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingOption} onPress={handleOpenMobileDataSettings}>
            <Ionicons name="cellular-outline" size={20} color="#007AFF" />
            <Text style={styles.settingOptionText}>Mobile Data Settings</Text>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </TouchableOpacity>
        </View>

        {/* Troubleshooting Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Troubleshooting Tips:</Text>
          <Text style={styles.tipItem}>• Check if WiFi or mobile data is enabled</Text>
          <Text style={styles.tipItem}>• Try moving to a different location</Text>
          <Text style={styles.tipItem}>• Restart your router or mobile data</Text>
          <Text style={styles.tipItem}>• Check if other apps can access the internet</Text>
          <Text style={styles.tipItem}>• Try turning airplane mode on and off</Text>
        </View>

        {/* Auto-retry notice */}
        <View style={styles.autoRetryContainer}>
          <Ionicons name="sync-outline" size={16} color="#666" />
          <Text style={styles.autoRetryText}>
            We'll automatically retry when connection is restored
          </Text>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  connectionDetails: {
    alignSelf: 'stretch',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#000',
  },
  cachedDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 24,
    gap: 8,
  },
  cachedDataText: {
    fontSize: 14,
    color: '#34C759',
    fontWeight: '500',
  },
  lastSyncText: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    gap: 12,
    marginBottom: 24,
    alignSelf: 'stretch',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  retryButtonDisabled: {
    opacity: 0.5,
  },
  retryButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cachedDataButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8FF',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  cachedDataButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  settingsOptions: {
    alignSelf: 'stretch',
    marginBottom: 24,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  settingOptionText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 12,
  },
  tipsContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  autoRetryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  autoRetryText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});
