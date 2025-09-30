import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Maintenance Log Screen - Track vehicle service history
 * Displays maintenance records, upcoming services, and reminders
 */
export default function MaintenanceLogScreen() {
  const [selectedVehicle, setSelectedVehicle] = useState('all');
  const [maintenanceRecords, setMaintenanceRecords] = useState([
    {
      id: '1',
      vehicleId: 'vehicle1',
      vehicleName: 'Maruti Swift Dzire',
      date: '2024-12-15',
      type: 'Regular Service',
      description: 'Changed engine oil, brake pads, air filter',
      cost: 3500,
      serviceCenter: 'XYZ Motors, Bangalore',
      odometer: 35000,
      nextServiceDue: '2025-03-15',
      nextServiceOdometer: 40000,
      attachments: ['invoice1.pdf'],
    },
    {
      id: '2',
      vehicleId: 'vehicle2',
      vehicleName: 'Hyundai Creta',
      date: '2024-11-20',
      type: 'Oil Change',
      description: 'Engine oil change and filter replacement',
      cost: 2500,
      serviceCenter: 'ABC Service Center',
      odometer: 28000,
      nextServiceDue: '2025-02-20',
      nextServiceOdometer: 33000,
      attachments: [],
    },
    {
      id: '3',
      vehicleId: 'vehicle1',
      vehicleName: 'Maruti Swift Dzire',
      date: '2024-10-10',
      type: 'Tire Replacement',
      description: 'Replaced all 4 tires with new ones',
      cost: 12000,
      serviceCenter: 'Tire Center Bangalore',
      odometer: 32000,
      nextServiceDue: null,
      nextServiceOdometer: null,
      attachments: ['tire_invoice.pdf'],
    },
  ]);

  const [upcomingMaintenance, setUpcomingMaintenance] = useState([
    {
      id: '1',
      vehicleId: 'vehicle1',
      vehicleName: 'Maruti Swift Dzire',
      dueDate: '2025-03-15',
      dueOdometer: 40000,
      currentOdometer: 35500,
      type: 'Regular Service',
      estimatedCost: 3500,
      daysRemaining: 45,
    },
    {
      id: '2',
      vehicleId: 'vehicle2',
      vehicleName: 'Hyundai Creta',
      dueDate: '2025-02-20',
      dueOdometer: 33000,
      currentOdometer: 29500,
      type: 'Oil Change',
      estimatedCost: 2500,
      daysRemaining: 30,
    },
  ]);

  const [vehicles, setVehicles] = useState([
    { id: 'all', name: 'All Vehicles' },
    { id: 'vehicle1', name: 'Maruti Swift Dzire' },
    { id: 'vehicle2', name: 'Hyundai Creta' },
    { id: 'vehicle3', name: 'Toyota Fortuner' },
  ]);

  const [loading, setLoading] = useState(false);

  // Load maintenance data
  const loadMaintenanceData = async () => {
    setLoading(true);
    try {
      // TODO: Implement actual API call to fetch maintenance data
      // const data = await maintenanceService.getMaintenanceRecords(selectedVehicle);
      // setMaintenanceRecords(data);
    } catch (error) {
      console.error('Error loading maintenance data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMaintenanceData();
  }, [selectedVehicle]);

  // Filter maintenance records by selected vehicle
  const filteredRecords = selectedVehicle === 'all'
    ? maintenanceRecords
    : maintenanceRecords.filter(record => record.vehicleId === selectedVehicle);

  // Handle add maintenance record
  const handleAddRecord = () => {
    // TODO: Navigate to add maintenance record screen
    console.log('Navigate to add maintenance record');
  };

  // Handle edit maintenance record
  const handleEditRecord = (recordId: string) => {
    // TODO: Navigate to edit maintenance record screen
    console.log('Edit maintenance record:', recordId);
  };

  // Handle delete maintenance record
  const handleDeleteRecord = (recordId: string) => {
    Alert.alert(
      'Delete Record',
      'Are you sure you want to delete this maintenance record?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMaintenanceRecords(prev => prev.filter(record => record.id !== recordId));
          },
        },
      ]
    );
  };

  // Handle set reminder
  const handleSetReminder = (maintenanceId: string) => {
    Alert.alert(
      'Set Reminder',
      'Get notified 7 days before the service is due',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Set Reminder',
          onPress: () => {
            // TODO: Implement reminder setting
            console.log('Set reminder for:', maintenanceId);
          },
        },
      ]
    );
  };

  // Render maintenance record item
  const renderMaintenanceRecord = ({ item }: { item: any }) => (
    <View style={styles.recordCard}>
      <View style={styles.recordHeader}>
        <View style={styles.recordInfo}>
          <Text style={styles.recordVehicle}>{item.vehicleName}</Text>
          <Text style={styles.recordDate}>{item.date}</Text>
        </View>
        <View style={styles.recordActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEditRecord(item.id)}
          >
            <Ionicons name="create-outline" size={16} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteRecord(item.id)}
          >
            <Ionicons name="trash-outline" size={16} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.recordDetails}>
        <View style={styles.recordRow}>
          <Ionicons name="construct-outline" size={16} color="#666" />
          <Text style={styles.recordLabel}>Type:</Text>
          <Text style={styles.recordValue}>{item.type}</Text>
        </View>

        <View style={styles.recordRow}>
          <Ionicons name="document-text-outline" size={16} color="#666" />
          <Text style={styles.recordLabel}>Description:</Text>
          <Text style={styles.recordValue}>{item.description}</Text>
        </View>

        <View style={styles.recordRow}>
          <Ionicons name="cash-outline" size={16} color="#666" />
          <Text style={styles.recordLabel}>Cost:</Text>
          <Text style={styles.recordValue}>₹{item.cost.toLocaleString()}</Text>
        </View>

        <View style={styles.recordRow}>
          <Ionicons name="business-outline" size={16} color="#666" />
          <Text style={styles.recordLabel}>Service Center:</Text>
          <Text style={styles.recordValue}>{item.serviceCenter}</Text>
        </View>

        <View style={styles.recordRow}>
          <Ionicons name="speedometer-outline" size={16} color="#666" />
          <Text style={styles.recordLabel}>Odometer:</Text>
          <Text style={styles.recordValue}>{item.odometer.toLocaleString()} km</Text>
        </View>

        {item.nextServiceDue && (
          <View style={styles.recordRow}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.recordLabel}>Next Service:</Text>
            <Text style={styles.recordValue}>{item.nextServiceDue}</Text>
          </View>
        )}

        {item.attachments.length > 0 && (
          <View style={styles.attachmentsContainer}>
            <Text style={styles.attachmentsLabel}>Attachments:</Text>
            {item.attachments.map((attachment: string, index: number) => (
              <TouchableOpacity key={index} style={styles.attachmentItem}>
                <Ionicons name="document-outline" size={16} color="#007AFF" />
                <Text style={styles.attachmentText}>{attachment}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );

  // Render upcoming maintenance item
  const renderUpcomingMaintenance = ({ item }: { item: any }) => (
    <View style={styles.upcomingCard}>
      <View style={styles.upcomingHeader}>
        <View style={styles.upcomingInfo}>
          <Text style={styles.upcomingVehicle}>{item.vehicleName}</Text>
          <Text style={styles.upcomingType}>{item.type}</Text>
        </View>
        <View style={[
          styles.daysRemainingBadge,
          item.daysRemaining <= 7 ? styles.urgentBadge : styles.normalBadge
        ]}>
          <Text style={[
            styles.daysRemainingText,
            item.daysRemaining <= 7 ? styles.urgentText : styles.normalText
          ]}>
            {item.daysRemaining} days
          </Text>
        </View>
      </View>

      <View style={styles.upcomingDetails}>
        <View style={styles.upcomingRow}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.upcomingLabel}>Due Date:</Text>
          <Text style={styles.upcomingValue}>{item.dueDate}</Text>
        </View>

        <View style={styles.upcomingRow}>
          <Ionicons name="speedometer-outline" size={16} color="#666" />
          <Text style={styles.upcomingLabel}>Due Odometer:</Text>
          <Text style={styles.upcomingValue}>{item.dueOdometer.toLocaleString()} km</Text>
        </View>

        <View style={styles.upcomingRow}>
          <Ionicons name="cash-outline" size={16} color="#666" />
          <Text style={styles.upcomingLabel}>Estimated Cost:</Text>
          <Text style={styles.upcomingValue}>₹{item.estimatedCost.toLocaleString()}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.reminderButton}
        onPress={() => handleSetReminder(item.id)}
      >
        <Ionicons name="notifications-outline" size={16} color="#007AFF" />
        <Text style={styles.reminderButtonText}>Set Reminder</Text>
      </TouchableOpacity>
    </View>
  );

  // Calculate maintenance statistics
  const getMaintenanceStats = () => {
    const totalCost = maintenanceRecords.reduce((sum, record) => sum + record.cost, 0);
    const avgCost = maintenanceRecords.length > 0 ? totalCost / maintenanceRecords.length : 0;
    const lastService = maintenanceRecords.length > 0 ? maintenanceRecords[0].date : null;

    return {
      totalRecords: maintenanceRecords.length,
      totalCost,
      averageCost: avgCost,
      lastService,
    };
  };

  const stats = getMaintenanceStats();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadMaintenanceData} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Maintenance Log</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddRecord}>
            <Ionicons name="add" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Vehicle Selector */}
        <View style={styles.vehicleSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {vehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                style={[
                  styles.vehicleTab,
                  selectedVehicle === vehicle.id && styles.selectedVehicleTab,
                ]}
                onPress={() => setSelectedVehicle(vehicle.id)}
              >
                <Text style={[
                  styles.vehicleTabText,
                  selectedVehicle === vehicle.id && styles.selectedVehicleTabText,
                ]}>
                  {vehicle.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="document-text-outline" size={24} color="#007AFF" />
            <Text style={styles.statNumber}>{stats.totalRecords}</Text>
            <Text style={styles.statLabel}>Total Records</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="cash-outline" size={24} color="#34C759" />
            <Text style={styles.statNumber}>₹{stats.totalCost.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Cost</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="analytics-outline" size={24} color="#FF9500" />
            <Text style={styles.statNumber}>₹{Math.round(stats.averageCost).toLocaleString()}</Text>
            <Text style={styles.statLabel}>Average Cost</Text>
          </View>
        </View>

        {/* Upcoming Maintenance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Maintenance</Text>
          <FlatList
            data={upcomingMaintenance}
            renderItem={renderUpcomingMaintenance}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.upcomingList}
          />
        </View>

        {/* Maintenance History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Maintenance History</Text>
          <FlatList
            data={filteredRecords}
            renderItem={renderMaintenanceRecord}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    padding: 8,
  },
  vehicleSelector: {
    marginBottom: 20,
  },
  vehicleTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 20,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  selectedVehicleTab: {
    backgroundColor: '#007AFF',
  },
  vehicleTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedVehicleTabText: {
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  upcomingList: {
    paddingHorizontal: 20,
  },
  upcomingCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  upcomingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingVehicle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  upcomingType: {
    fontSize: 14,
    color: '#666',
  },
  daysRemainingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgentBadge: {
    backgroundColor: '#FFE5E5',
  },
  normalBadge: {
    backgroundColor: '#E5F2FF',
  },
  daysRemainingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  urgentText: {
    color: '#FF3B30',
  },
  normalText: {
    color: '#007AFF',
  },
  upcomingDetails: {
    marginBottom: 12,
  },
  upcomingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  upcomingLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    marginRight: 8,
  },
  upcomingValue: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  reminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    gap: 6,
  },
  reminderButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  recordCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordInfo: {
    flex: 1,
  },
  recordVehicle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  recordDate: {
    fontSize: 14,
    color: '#666',
  },
  recordActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  recordDetails: {
    gap: 8,
  },
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    marginRight: 8,
    minWidth: 80,
  },
  recordValue: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  attachmentsContainer: {
    marginTop: 8,
  },
  attachmentsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  attachmentText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 8,
  },
  bottomSpacer: {
    height: 40,
  },
});
