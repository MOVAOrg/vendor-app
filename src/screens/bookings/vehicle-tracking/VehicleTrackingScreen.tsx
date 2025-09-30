import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Vehicle Tracking Screen - Track vehicle location and status during rental
 * Provides real-time location tracking and journey history
 */
export default function VehicleTrackingScreen({ navigation, route }: any) {
  const { bookingId, vehicleId } = route.params || {};

  const [refreshing, setRefreshing] = useState(false);
  const [trackingData, setTrackingData] = useState({
    bookingId: bookingId || 'MOV-12345',
    vehicleId: vehicleId || 'VEH-001',
    vehicleName: 'Honda City',
    customerName: 'Rajesh Kumar',
    customerPhone: '+91 98765 43210',
    startTime: '2025-01-18 10:00',
    expectedEndTime: '2025-01-20 10:00',
    currentStatus: 'in_use',
    lastUpdate: '2025-01-18 14:30',
    currentLocation: {
      address: 'MG Road, Bangalore, Karnataka',
      latitude: 12.9716,
      longitude: 77.5946,
      accuracy: 5,
    },
    speed: 45,
    battery: 85,
    fuel: 60,
    odometer: 45230,
    journeyHistory: [
      {
        id: '1',
        timestamp: '2025-01-18 14:30',
        location: 'MG Road, Bangalore',
        latitude: 12.9716,
        longitude: 77.5946,
        speed: 45,
        status: 'moving',
      },
      {
        id: '2',
        timestamp: '2025-01-18 14:15',
        location: 'Brigade Road, Bangalore',
        latitude: 12.9758,
        longitude: 77.5998,
        speed: 0,
        status: 'stopped',
      },
      {
        id: '3',
        timestamp: '2025-01-18 13:45',
        location: 'Koramangala, Bangalore',
        latitude: 12.9279,
        longitude: 77.6271,
        speed: 35,
        status: 'moving',
      },
      {
        id: '4',
        timestamp: '2025-01-18 13:00',
        location: 'Indiranagar, Bangalore',
        latitude: 12.9719,
        longitude: 77.6412,
        speed: 0,
        status: 'stopped',
      },
      {
        id: '5',
        timestamp: '2025-01-18 10:00',
        location: 'Pickup Location - HSR Layout',
        latitude: 12.9113,
        longitude: 77.6473,
        speed: 0,
        status: 'pickup',
      },
    ],
    alerts: [
      {
        id: '1',
        type: 'speed',
        message: 'Vehicle exceeded speed limit (80 km/h)',
        timestamp: '2025-01-18 12:30',
        severity: 'medium',
      },
      {
        id: '2',
        type: 'location',
        message: 'Vehicle left designated area',
        timestamp: '2025-01-18 11:45',
        severity: 'high',
      },
    ],
    geofence: {
      enabled: true,
      center: {
        latitude: 12.9716,
        longitude: 77.5946,
      },
      radius: 5000, // 5km in meters
      name: 'Bangalore City Center',
    },
  });

  useEffect(() => {
    loadTrackingData();
  }, [bookingId, vehicleId]);

  const loadTrackingData = async () => {
    try {
      // TODO: Implement actual API call to fetch tracking data
      console.log('Loading tracking data for booking:', bookingId);
    } catch (error) {
      console.error('Error loading tracking data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTrackingData();
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_use':
        return '#007AFF';
      case 'stopped':
        return '#FF9500';
      case 'moving':
        return '#34C759';
      case 'pickup':
        return '#34C759';
      case 'returned':
        return '#8E8E93';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_use':
        return 'car-outline';
      case 'stopped':
        return 'pause-circle-outline';
      case 'moving':
        return 'play-circle-outline';
      case 'pickup':
        return 'location-outline';
      case 'returned':
        return 'checkmark-circle-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return '#FF9500';
      case 'low':
        return '#007AFF';
      default:
        return '#666';
    }
  };

  const handleContactCustomer = () => {
    Alert.alert(
      'Contact Customer',
      `Call ${trackingData.customerName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling customer') },
      ]
    );
  };

  const handleSendAlert = () => {
    Alert.alert(
      'Send Alert',
      'Send alert to customer?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send', onPress: () => console.log('Sending alert') },
      ]
    );
  };

  const handleViewOnMap = () => {
    // TODO: Open map with current location
    console.log('Opening map for location:', trackingData.currentLocation);
  };

  const handleEmergencyStop = () => {
    Alert.alert(
      'Emergency Stop',
      'Are you sure you want to trigger emergency stop? This will immediately stop the vehicle.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Stop Vehicle',
          style: 'destructive',
          onPress: () => console.log('Emergency stop triggered'),
        },
      ]
    );
  };

  const renderJourneyItem = (item: any) => (
    <View key={item.id} style={styles.journeyItem}>
      <View style={styles.journeyIcon}>
        <Ionicons
          name={getStatusIcon(item.status)}
          size={20}
          color={getStatusColor(item.status)}
        />
      </View>
      <View style={styles.journeyDetails}>
        <Text style={styles.journeyLocation}>{item.location}</Text>
        <Text style={styles.journeyTime}>{item.timestamp}</Text>
        <View style={styles.journeyStats}>
          <Text style={styles.journeySpeed}>Speed: {item.speed} km/h</Text>
          <Text style={styles.journeyStatus}>Status: {item.status}</Text>
        </View>
      </View>
    </View>
  );

  const renderAlertItem = (alert: any) => (
    <View key={alert.id} style={styles.alertItem}>
      <View style={[
        styles.alertIcon,
        { backgroundColor: getAlertColor(alert.severity) + '20' }
      ]}>
        <Ionicons
          name="warning-outline"
          size={20}
          color={getAlertColor(alert.severity)}
        />
      </View>
      <View style={styles.alertDetails}>
        <Text style={styles.alertMessage}>{alert.message}</Text>
        <Text style={styles.alertTime}>{alert.timestamp}</Text>
        <Text style={[
          styles.alertSeverity,
          { color: getAlertColor(alert.severity) }
        ]}>
          {alert.severity.toUpperCase()}
        </Text>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Vehicle Tracking</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Vehicle Info Card */}
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleHeader}>
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{trackingData.vehicleName}</Text>
              <Text style={styles.bookingId}>Booking: {trackingData.bookingId}</Text>
            </View>
            <View style={styles.statusContainer}>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(trackingData.currentStatus) + '20' }
              ]}>
                <Ionicons
                  name={getStatusIcon(trackingData.currentStatus)}
                  size={16}
                  color={getStatusColor(trackingData.currentStatus)}
                />
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(trackingData.currentStatus) }
                ]}>
                  {trackingData.currentStatus.replace('_', ' ').toUpperCase()}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{trackingData.customerName}</Text>
            <Text style={styles.customerPhone}>{trackingData.customerPhone}</Text>
          </View>

          <View style={styles.timingInfo}>
            <View style={styles.timingItem}>
              <Text style={styles.timingLabel}>Start Time</Text>
              <Text style={styles.timingValue}>{trackingData.startTime}</Text>
            </View>
            <View style={styles.timingItem}>
              <Text style={styles.timingLabel}>Expected Return</Text>
              <Text style={styles.timingValue}>{trackingData.expectedEndTime}</Text>
            </View>
            <View style={styles.timingItem}>
              <Text style={styles.timingLabel}>Last Update</Text>
              <Text style={styles.timingValue}>{trackingData.lastUpdate}</Text>
            </View>
          </View>
        </View>

        {/* Current Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Location</Text>
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <Ionicons name="location-outline" size={24} color="#007AFF" />
              <Text style={styles.locationAddress}>{trackingData.currentLocation.address}</Text>
            </View>
            <View style={styles.locationStats}>
              <View style={styles.locationStat}>
                <Text style={styles.locationStatLabel}>Speed</Text>
                <Text style={styles.locationStatValue}>{trackingData.speed} km/h</Text>
              </View>
              <View style={styles.locationStat}>
                <Text style={styles.locationStatLabel}>Accuracy</Text>
                <Text style={styles.locationStatValue}>±{trackingData.currentLocation.accuracy}m</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.mapButton} onPress={handleViewOnMap}>
              <Ionicons name="map-outline" size={20} color="#FFFFFF" />
              <Text style={styles.mapButtonText}>View on Map</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Vehicle Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Status</Text>
          <View style={styles.statusCard}>
            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <Ionicons name="battery-half-outline" size={20} color="#34C759" />
                <Text style={styles.statusItemLabel}>Battery</Text>
                <Text style={styles.statusItemValue}>{trackingData.battery}%</Text>
              </View>
              <View style={styles.statusItem}>
                <Ionicons name="car-outline" size={20} color="#007AFF" />
                <Text style={styles.statusItemLabel}>Fuel</Text>
                <Text style={styles.statusItemValue}>{trackingData.fuel}%</Text>
              </View>
            </View>
            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <Ionicons name="speedometer-outline" size={20} color="#FF9500" />
                <Text style={styles.statusItemLabel}>Odometer</Text>
                <Text style={styles.statusItemValue}>{trackingData.odometer} km</Text>
              </View>
              <View style={styles.statusItem}>
                <Ionicons name="shield-outline" size={20} color="#34C759" />
                <Text style={styles.statusItemLabel}>Geofence</Text>
                <Text style={styles.statusItemValue}>
                  {trackingData.geofence.enabled ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleContactCustomer}>
            <Ionicons name="call-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleSendAlert}>
            <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Alert</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.emergencyButton]}
            onPress={handleEmergencyStop}
          >
            <Ionicons name="stop-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Emergency</Text>
          </TouchableOpacity>
        </View>

        {/* Alerts */}
        {trackingData.alerts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
            {trackingData.alerts.map(renderAlertItem)}
          </View>
        )}

        {/* Journey History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Journey History</Text>
          {trackingData.journeyHistory.map(renderJourneyItem)}
        </View>

        {/* Geofence Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Geofence Information</Text>
          <View style={styles.geofenceCard}>
            <View style={styles.geofenceHeader}>
              <Ionicons name="location-outline" size={20} color="#007AFF" />
              <Text style={styles.geofenceName}>{trackingData.geofence.name}</Text>
            </View>
            <Text style={styles.geofenceRadius}>
              Radius: {trackingData.geofence.radius / 1000} km
            </Text>
            <Text style={styles.geofenceStatus}>
              Status: {trackingData.geofence.enabled ? 'Active' : 'Inactive'}
            </Text>
          </View>
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
  moreButton: {
    padding: 8,
  },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  bookingId: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  customerInfo: {
    marginBottom: 16,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  customerPhone: {
    fontSize: 14,
    color: '#666',
  },
  timingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timingItem: {
    flex: 1,
    alignItems: 'center',
  },
  timingLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  timingValue: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationAddress: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
    flex: 1,
  },
  locationStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  locationStat: {
    alignItems: 'center',
  },
  locationStatLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  locationStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
  },
  mapButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  statusItemLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginBottom: 2,
  },
  statusItemValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 80,
    justifyContent: 'center',
  },
  emergencyButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 6,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertDetails: {
    flex: 1,
  },
  alertMessage: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  alertSeverity: {
    fontSize: 10,
    fontWeight: '600',
  },
  journeyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  journeyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  journeyDetails: {
    flex: 1,
  },
  journeyLocation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  journeyTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  journeyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  journeySpeed: {
    fontSize: 12,
    color: '#666',
  },
  journeyStatus: {
    fontSize: 12,
    color: '#666',
  },
  geofenceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  geofenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  geofenceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
  },
  geofenceRadius: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  geofenceStatus: {
    fontSize: 14,
    color: '#666',
  },
  bottomSpacer: {
    height: 40,
  },
});
