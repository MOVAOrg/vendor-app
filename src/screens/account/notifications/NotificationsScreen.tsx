import { ThemedView } from '@/components/ThemedView';
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
 * Notifications Screen - Display all notifications for the vendor
 * Shows booking updates, payments, system messages, and more
 */
export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'booking',
      title: 'New booking request from Rajesh Kumar',
      message: 'Maruti Swift for 3 days - Jan 15 to Jan 18',
      time: '5 minutes ago',
      isRead: false,
      icon: 'calendar-outline',
      iconColor: '#007AFF',
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment received: ₹4,500',
      message: 'Booking #MOV-12345 - Your earnings: ₹4,050',
      time: '2 hours ago',
      isRead: true,
      icon: 'cash-outline',
      iconColor: '#34C759',
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Upcoming pickup in 2 hours',
      message: 'Hyundai Creta - Customer: Priya Sharma',
      time: '3 hours ago',
      isRead: false,
      icon: 'time-outline',
      iconColor: '#FF9500',
    },
    {
      id: '4',
      type: 'review',
      title: 'You received a 5-star review!',
      message: 'Rajesh Kumar rated your Swift Dzire ⭐⭐⭐⭐⭐',
      time: '1 day ago',
      isRead: true,
      icon: 'star-outline',
      iconColor: '#FFD700',
    },
    {
      id: '5',
      type: 'system',
      title: 'Document expiring soon',
      message: 'Insurance for Maruti Swift expires in 15 days',
      time: '2 days ago',
      isRead: false,
      icon: 'warning-outline',
      iconColor: '#FF3B30',
    },
    {
      id: '6',
      type: 'promotion',
      title: 'Premium subscription 50% off',
      message: 'Upgrade to Premium and get 50% off your first month',
      time: '3 days ago',
      isRead: true,
      icon: 'gift-outline',
      iconColor: '#AF52DE',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // all, unread, bookings, payments

  // Load notifications
  const loadNotifications = async () => {
    setLoading(true);
    try {
      // TODO: Implement actual API call to fetch notifications
      // const notifications = await notificationService.getNotifications();
      // setNotifications(notifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      // TODO: Implement actual API call to mark notification as read
      // await notificationService.markAsRead(notificationId);

      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      // TODO: Implement actual API call to mark all notifications as read
      // await notificationService.markAllAsRead();

      setNotifications(prev =>
        prev.map(notif => ({ ...notif, isRead: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Delete notification
  const deleteNotification = (notificationId: string) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
          },
        },
      ]
    );
  };

  // Handle notification tap
  const handleNotificationTap = (notification: any) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    // Navigate to relevant screen based on notification type
    switch (notification.type) {
      case 'booking':
        // TODO: Navigate to booking details
        console.log('Navigate to booking details');
        break;
      case 'payment':
        // TODO: Navigate to wallet/earnings
        console.log('Navigate to wallet');
        break;
      case 'review':
        // TODO: Navigate to reviews screen
        console.log('Navigate to reviews');
        break;
      default:
        console.log('Navigate to notification details');
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.isRead;
      case 'bookings':
        return notification.type === 'booking' || notification.type === 'reminder';
      case 'payments':
        return notification.type === 'payment';
      default:
        return true;
    }
  });

  // Render notification item
  const renderNotificationItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.isRead && styles.unreadNotification,
      ]}
      onPress={() => handleNotificationTap(item)}
    >
      <View style={styles.notificationIcon}>
        <Ionicons name={item.icon} size={24} color={item.iconColor} />
      </View>

      <View style={styles.notificationContent}>
        <Text style={[
          styles.notificationTitle,
          !item.isRead && styles.unreadTitle,
        ]}>
          {item.title}
        </Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>

      <View style={styles.notificationActions}>
        {!item.isRead && <View style={styles.unreadDot} />}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteNotification(item.id)}
        >
          <Ionicons name="trash-outline" size={16} color="#C7C7CC" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Render filter tabs
  const renderFilterTabs = () => (
    <View style={styles.filterContainer}>
      {[
        { key: 'all', label: 'All' },
        { key: 'unread', label: 'Unread' },
        { key: 'bookings', label: 'Bookings' },
        { key: 'payments', label: 'Payments' },
      ].map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.filterTab,
            filter === tab.key && styles.activeFilterTab,
          ]}
          onPress={() => setFilter(tab.key)}
        >
          <Text style={[
            styles.filterTabText,
            filter === tab.key && styles.activeFilterTabText,
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
          <Text style={styles.markAllText}>Mark All Read</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      {renderFilterTabs()}

      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        style={styles.notificationsList}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadNotifications} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="notifications-outline" size={64} color="#C7C7CC" />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptyMessage}>
              You'll see booking updates, payments, and more here
            </Text>
          </View>
        }
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  markAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
  },
  markAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  activeFilterTab: {
    backgroundColor: '#007AFF',
  },
  filterTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  unreadNotification: {
    backgroundColor: '#F8F9FF',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: '600',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  notificationActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 40,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginBottom: 8,
  },
  deleteButton: {
    padding: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
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
  },
});
