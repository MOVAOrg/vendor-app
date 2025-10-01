import { ThemedView } from '../../components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Error Screen - Reusable component for error states
 * Displays error messages with retry options and support contact
 */
interface ErrorScreenProps {
  type: 'network' | 'server' | 'generic' | 'permission' | 'maintenance';
  title?: string;
  message?: string;
  errorCode?: string;
  onRetry?: () => void;
  onContactSupport?: () => void;
  showRetry?: boolean;
  showSupport?: boolean;
}

export default function ErrorScreen({
  type,
  title,
  message,
  errorCode,
  onRetry,
  onContactSupport,
  showRetry = true,
  showSupport = true,
}: ErrorScreenProps) {
  // Get error configuration based on type
  const getErrorConfig = () => {
    switch (type) {
      case 'network':
        return {
          icon: 'wifi-outline',
          iconColor: '#FF3B30',
          defaultTitle: 'No Internet Connection',
          defaultMessage: 'Please check your internet connection and try again. Make sure you\'re connected to WiFi or mobile data.',
          illustration: '📶',
        };
      case 'server':
        return {
          icon: 'server-outline',
          iconColor: '#FF9500',
          defaultTitle: 'Server Error',
          defaultMessage: 'Something went wrong on our end. Our team has been notified and is working to fix this issue.',
          illustration: '🔧',
        };
      case 'permission':
        return {
          icon: 'lock-closed-outline',
          iconColor: '#AF52DE',
          defaultTitle: 'Permission Required',
          defaultMessage: 'This feature requires additional permissions. Please enable them in your device settings.',
          illustration: '🔐',
        };
      case 'maintenance':
        return {
          icon: 'construct-outline',
          iconColor: '#007AFF',
          defaultTitle: 'Under Maintenance',
          defaultMessage: 'MOVA is currently under maintenance. We\'ll be back soon with improvements and new features.',
          illustration: '🛠️',
        };
      case 'generic':
      default:
        return {
          icon: 'alert-circle-outline',
          iconColor: '#FF3B30',
          defaultTitle: 'Something Went Wrong',
          defaultMessage: 'We encountered an unexpected error. Please try again or contact support if the problem persists.',
          illustration: '⚠️',
        };
    }
  };

  const config = getErrorConfig();

  // Handle retry action
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Default retry action - reload the app or go back
      console.log('Default retry action');
    }
  };

  // Handle contact support
  const handleContactSupport = () => {
    if (onContactSupport) {
      onContactSupport();
    } else {
      Alert.alert(
        'Contact Support',
        'Choose how you\'d like to contact our support team',
        [
          { text: 'Call', onPress: () => console.log('Call support') },
          { text: 'WhatsApp', onPress: () => console.log('WhatsApp support') },
          { text: 'Email', onPress: () => console.log('Email support') },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  // Handle refresh app
  const handleRefreshApp = () => {
    Alert.alert(
      'Refresh App',
      'This will restart the app and may resolve the issue.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Refresh',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement app refresh logic
            console.log('Refresh app');
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        {/* Error Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name={config.icon} size={64} color={config.iconColor} />
          </View>

          {/* Error type specific illustration */}
          {type === 'network' && (
            <View style={styles.networkIllustration}>
              <View style={styles.signalBars}>
                <View style={styles.signalBar} />
                <View style={[styles.signalBar, styles.signalBarMedium]} />
                <View style={[styles.signalBar, styles.signalBarHigh]} />
                <View style={[styles.signalBar, styles.signalBarFull]} />
              </View>
              <Text style={styles.illustrationText}>📶</Text>
            </View>
          )}

          {type === 'server' && (
            <View style={styles.serverIllustration}>
              <View style={styles.server}>
                <View style={styles.serverIndicator} />
                <View style={styles.serverIndicator} />
                <View style={styles.serverIndicator} />
              </View>
              <Text style={styles.illustrationText}>🔧</Text>
            </View>
          )}
        </View>

        {/* Error Title */}
        <Text style={styles.title}>{title || config.defaultTitle}</Text>

        {/* Error Message */}
        <Text style={styles.message}>
          {message || config.defaultMessage}
        </Text>

        {/* Error Code */}
        {errorCode && (
          <View style={styles.errorCodeContainer}>
            <Text style={styles.errorCodeLabel}>Error Code:</Text>
            <Text style={styles.errorCode}>{errorCode}</Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {showRetry && (
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Ionicons name="refresh" size={20} color="#FFFFFF" />
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          )}

          {showSupport && (
            <TouchableOpacity style={styles.supportButton} onPress={handleContactSupport}>
              <Ionicons name="help-circle-outline" size={20} color="#007AFF" />
              <Text style={styles.supportButtonText}>Contact Support</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Additional Actions */}
        <View style={styles.additionalActions}>
          <TouchableOpacity style={styles.additionalAction} onPress={handleRefreshApp}>
            <Ionicons name="reload" size={16} color="#666" />
            <Text style={styles.additionalActionText}>Refresh App</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.additionalAction}>
            <Ionicons name="arrow-back" size={16} color="#666" />
            <Text style={styles.additionalActionText}>Go Back</Text>
          </TouchableOpacity>
        </View>

        {/* Helpful Tips */}
        {type === 'network' && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 Troubleshooting Tips:</Text>
            <Text style={styles.tipItem}>• Check if WiFi or mobile data is enabled</Text>
            <Text style={styles.tipItem}>• Try moving to a different location</Text>
            <Text style={styles.tipItem}>• Restart your router or mobile data</Text>
            <Text style={styles.tipItem}>• Check if other apps are working</Text>
          </View>
        )}

        {type === 'server' && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 What you can do:</Text>
            <Text style={styles.tipItem}>• Wait a few minutes and try again</Text>
            <Text style={styles.tipItem}>• Check our status page for updates</Text>
            <Text style={styles.tipItem}>• Contact support if the issue persists</Text>
          </View>
        )}

        {type === 'permission' && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 How to enable permissions:</Text>
            <Text style={styles.tipItem}>• Go to Settings → Apps → MOVA</Text>
            <Text style={styles.tipItem}>• Tap on Permissions</Text>
            <Text style={styles.tipItem}>• Enable the required permissions</Text>
            <Text style={styles.tipItem}>• Restart the app</Text>
          </View>
        )}

        {/* Support Information */}
        <View style={styles.supportInfo}>
          <Text style={styles.supportInfoText}>
            Need immediate help? Contact our support team:
          </Text>
          <View style={styles.supportContacts}>
            <TouchableOpacity style={styles.contactButton}>
              <Ionicons name="call" size={16} color="#34C759" />
              <Text style={styles.contactText}>1800-XXX-XXXX</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <Ionicons name="logo-whatsapp" size={16} color="#25D366" />
              <Text style={styles.contactText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 32,
    alignItems: 'center',
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
  // Network illustration
  networkIllustration: {
    alignItems: 'center',
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    marginBottom: 8,
  },
  signalBar: {
    width: 4,
    backgroundColor: '#FF3B30',
    borderRadius: 2,
  },
  signalBarMedium: {
    height: 12,
  },
  signalBarHigh: {
    height: 16,
  },
  signalBarFull: {
    height: 20,
  },
  // Server illustration
  serverIllustration: {
    alignItems: 'center',
  },
  server: {
    width: 60,
    height: 40,
    backgroundColor: '#FF9500',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 8,
  },
  serverIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  illustrationText: {
    fontSize: 24,
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
    marginBottom: 20,
  },
  errorCodeContainer: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 24,
  },
  errorCodeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  errorCode: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  actionButtons: {
    gap: 12,
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  retryButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  supportButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  additionalActions: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 24,
  },
  additionalAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  additionalActionText: {
    fontSize: 14,
    color: '#666',
  },
  tipsContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
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
  supportInfo: {
    alignSelf: 'stretch',
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  supportInfoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  supportContacts: {
    flexDirection: 'row',
    gap: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  contactText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
});
