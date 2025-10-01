import { ThemedView } from '../../components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

/**
 * Empty State Screen - Reusable component for empty states
 * Displays appropriate illustrations and messages for different scenarios
 */
interface EmptyStateProps {
  type: 'no-vehicles' | 'no-bookings' | 'no-earnings' | 'no-notifications' | 'no-maintenance' | 'no-reviews' | 'no-data';
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  showIllustration?: boolean;
}

export default function EmptyStateScreen({
  type,
  title,
  message,
  actionText,
  onAction,
  showIllustration = true,
}: EmptyStateProps) {
  // Get icon and illustration based on type
  const getEmptyStateConfig = () => {
    switch (type) {
      case 'no-vehicles':
        return {
          icon: 'car-outline',
          iconColor: '#007AFF',
          illustration: '🚗',
        };
      case 'no-bookings':
        return {
          icon: 'calendar-outline',
          iconColor: '#FF9500',
          illustration: '📅',
        };
      case 'no-earnings':
        return {
          icon: 'cash-outline',
          iconColor: '#34C759',
          illustration: '💰',
        };
      case 'no-notifications':
        return {
          icon: 'notifications-outline',
          iconColor: '#AF52DE',
          illustration: '🔔',
        };
      case 'no-maintenance':
        return {
          icon: 'construct-outline',
          iconColor: '#FF3B30',
          illustration: '🔧',
        };
      case 'no-reviews':
        return {
          icon: 'star-outline',
          iconColor: '#FFD700',
          illustration: '⭐',
        };
      case 'no-data':
        return {
          icon: 'document-outline',
          iconColor: '#8E8E93',
          illustration: '📄',
        };
      default:
        return {
          icon: 'help-circle-outline',
          iconColor: '#C7C7CC',
          illustration: '❓',
        };
    }
  };

  const config = getEmptyStateConfig();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        {/* Illustration */}
        {showIllustration && (
          <View style={styles.illustrationContainer}>
            {type === 'no-vehicles' && (
              <View style={styles.carIllustration}>
                <View style={styles.garage}>
                  <Ionicons name="home-outline" size={60} color="#C7C7CC" />
                  <View style={styles.garageDoor} />
                </View>
                <View style={styles.emptySpace}>
                  <Text style={styles.emptySpaceText}>Empty</Text>
                </View>
              </View>
            )}

            {type === 'no-bookings' && (
              <View style={styles.calendarIllustration}>
                <View style={styles.calendar}>
                  <View style={styles.calendarHeader}>
                    <Text style={styles.calendarMonth}>JAN</Text>
                  </View>
                  <View style={styles.calendarDays}>
                    {Array.from({ length: 7 }, (_, i) => (
                      <View key={i} style={styles.calendarDay} />
                    ))}
                  </View>
                </View>
                <Ionicons name="calendar-clear-outline" size={40} color="#FF9500" style={styles.overlayIcon} />
              </View>
            )}

            {type === 'no-earnings' && (
              <View style={styles.moneyIllustration}>
                <View style={styles.wallet}>
                  <Ionicons name="wallet-outline" size={60} color="#C7C7CC" />
                </View>
                <View style={styles.moneyStack}>
                  <View style={styles.moneyBill} />
                  <View style={styles.moneyBill} />
                  <View style={styles.moneyBill} />
                </View>
              </View>
            )}

            {!['no-vehicles', 'no-bookings', 'no-earnings'].includes(type) && (
              <View style={styles.iconContainer}>
                <Ionicons name={config.icon} size={64} color={config.iconColor} />
              </View>
            )}
          </View>
        )}

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Message */}
        <Text style={styles.message}>{message}</Text>

        {/* Action Button */}
        {actionText && onAction && (
          <TouchableOpacity style={styles.actionButton} onPress={onAction}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>{actionText}</Text>
          </TouchableOpacity>
        )}

        {/* Tips based on type */}
        {type === 'no-vehicles' && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 Quick Tips:</Text>
            <Text style={styles.tipItem}>• Add high-quality photos of your vehicles</Text>
            <Text style={styles.tipItem}>• Set competitive pricing for your area</Text>
            <Text style={styles.tipItem}>• Keep your vehicles well-maintained</Text>
          </View>
        )}

        {type === 'no-bookings' && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 Quick Tips:</Text>
            <Text style={styles.tipItem}>• Promote your vehicles on social media</Text>
            <Text style={styles.tipItem}>• Offer competitive pricing</Text>
            <Text style={styles.tipItem}>• Keep your calendar updated</Text>
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  content: {
    alignItems: 'center',
  },
  illustrationContainer: {
    marginBottom: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Car illustration styles
  carIllustration: {
    alignItems: 'center',
  },
  garage: {
    position: 'relative',
    width: 120,
    height: 80,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  garageDoor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: '#E0E0E0',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  emptySpace: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFF3CD',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFEAA7',
  },
  emptySpaceText: {
    fontSize: 12,
    color: '#856404',
    fontWeight: '500',
  },
  // Calendar illustration styles
  calendarIllustration: {
    position: 'relative',
    alignItems: 'center',
  },
  calendar: {
    width: 120,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  calendarHeader: {
    backgroundColor: '#007AFF',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarMonth: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  calendarDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  calendarDay: {
    width: 12,
    height: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    margin: 2,
  },
  overlayIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
  },
  // Money illustration styles
  moneyIllustration: {
    alignItems: 'center',
  },
  wallet: {
    marginBottom: 16,
  },
  moneyStack: {
    alignItems: 'center',
  },
  moneyBill: {
    width: 60,
    height: 30,
    backgroundColor: '#34C759',
    borderRadius: 4,
    marginBottom: 2,
    opacity: 0.8,
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
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 24,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  tipsContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
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
});
