import { ThemedView } from '../../components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Vehicle Details Screen - View comprehensive vehicle information
 * Displays detailed vehicle specifications, features, pricing, and management options
 */
export default function VehicleDetailsScreen({ navigation, route }: any) {
  const { vehicle } = route.params || {};

  const [activeTab, setActiveTab] = useState('overview');

  // Mock vehicle data
  const vehicleData = {
    id: '1',
    make: 'Maruti',
    model: 'Swift Dzire',
    year: '2022',
    color: 'White',
    licensePlate: 'KA01AB1234',
    image: 'https://via.placeholder.com/400x300',
    status: 'active',
    rating: 4.7,
    totalBookings: 45,
    totalEarnings: 87500,
    mileage: '18 km/l',
    fuelType: 'Petrol',
    transmission: 'Manual',
    seatingCapacity: 5,
    features: ['AC', 'Power Steering', 'Power Windows', 'Music System', 'Bluetooth'],
    pricing: {
      hourlyRate: 150,
      dailyRate: 1200,
      weeklyRate: 7500,
      monthlyRate: 25000,
    },
    availability: {
      isAvailable: true,
      nextAvailableDate: '2025-01-20',
      advanceBookingDays: 7,
      minimumRentalHours: 4,
    },
    documents: {
      rc: 'Valid',
      insurance: 'Valid',
      pollution: 'Valid',
      fitness: 'Valid',
    },
    maintenance: {
      lastService: '2025-01-10',
      nextService: '2025-04-10',
      odometer: '45,000 km',
    },
  };

  // Tabs configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'information-circle-outline' },
    { id: 'features', label: 'Features', icon: 'star-outline' },
    { id: 'pricing', label: 'Pricing', icon: 'cash-outline' },
    { id: 'documents', label: 'Documents', icon: 'document-outline' },
    { id: 'maintenance', label: 'Maintenance', icon: 'construct-outline' },
  ];

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Handle edit vehicle
  const handleEditVehicle = () => {
    navigation.navigate('EditVehicleScreen', { vehicle: vehicleData });
  };

  // Handle toggle availability
  const handleToggleAvailability = () => {
    Alert.alert(
      'Toggle Availability',
      `Are you sure you want to ${vehicleData.availability.isAvailable ? 'disable' : 'enable'} this vehicle?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            // TODO: Implement toggle availability API
            console.log('Toggle availability');
          },
        },
      ]
    );
  };

  // Render overview tab
  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      {/* Vehicle Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: vehicleData.image }} style={styles.vehicleImage} />
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {vehicleData.availability.isAvailable ? 'Available' : 'Unavailable'}
          </Text>
        </View>
      </View>

      {/* Basic Information */}
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Basic Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Make & Model</Text>
          <Text style={styles.infoValue}>{vehicleData.make} {vehicleData.model}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Year</Text>
          <Text style={styles.infoValue}>{vehicleData.year}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Color</Text>
          <Text style={styles.infoValue}>{vehicleData.color}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>License Plate</Text>
          <Text style={styles.infoValue}>{vehicleData.licensePlate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Fuel Type</Text>
          <Text style={styles.infoValue}>{vehicleData.fuelType}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Transmission</Text>
          <Text style={styles.infoValue}>{vehicleData.transmission}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Seating Capacity</Text>
          <Text style={styles.infoValue}>{vehicleData.seatingCapacity} seats</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Mileage</Text>
          <Text style={styles.infoValue}>{vehicleData.mileage}</Text>
        </View>
      </View>

      {/* Statistics */}
      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>Performance Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{vehicleData.totalBookings}</Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹{vehicleData.totalEarnings.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Earnings</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{vehicleData.rating}</Text>
            <Text style={styles.statLabel}>Customer Rating</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Render features tab
  const renderFeaturesTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.featuresCard}>
        <Text style={styles.cardTitle}>Vehicle Features</Text>
        <View style={styles.featuresList}>
          {vehicleData.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#34C759" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  // Render pricing tab
  const renderPricingTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.pricingCard}>
        <Text style={styles.cardTitle}>Pricing Structure</Text>
        <View style={styles.pricingList}>
          <View style={styles.pricingItem}>
            <Text style={styles.pricingLabel}>Hourly Rate</Text>
            <Text style={styles.pricingValue}>₹{vehicleData.pricing.hourlyRate}</Text>
          </View>
          <View style={styles.pricingItem}>
            <Text style={styles.pricingLabel}>Daily Rate</Text>
            <Text style={styles.pricingValue}>₹{vehicleData.pricing.dailyRate}</Text>
          </View>
          <View style={styles.pricingItem}>
            <Text style={styles.pricingLabel}>Weekly Rate</Text>
            <Text style={styles.pricingValue}>₹{vehicleData.pricing.weeklyRate}</Text>
          </View>
          <View style={styles.pricingItem}>
            <Text style={styles.pricingLabel}>Monthly Rate</Text>
            <Text style={styles.pricingValue}>₹{vehicleData.pricing.monthlyRate}</Text>
          </View>
        </View>
      </View>

      <View style={styles.availabilityCard}>
        <Text style={styles.cardTitle}>Availability Settings</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status</Text>
          <Text style={[
            styles.infoValue,
            vehicleData.availability.isAvailable ? styles.availableText : styles.unavailableText
          ]}>
            {vehicleData.availability.isAvailable ? 'Available' : 'Unavailable'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Next Available</Text>
          <Text style={styles.infoValue}>{vehicleData.availability.nextAvailableDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Advance Booking</Text>
          <Text style={styles.infoValue}>{vehicleData.availability.advanceBookingDays} days</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Minimum Rental</Text>
          <Text style={styles.infoValue}>{vehicleData.availability.minimumRentalHours} hours</Text>
        </View>
      </View>
    </View>
  );

  // Render documents tab
  const renderDocumentsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.documentsCard}>
        <Text style={styles.cardTitle}>Vehicle Documents</Text>
        <View style={styles.documentsList}>
          {Object.entries(vehicleData.documents).map(([doc, status]) => (
            <View key={doc} style={styles.documentItem}>
              <View style={styles.documentInfo}>
                <Ionicons name="document-outline" size={20} color="#007AFF" />
                <Text style={styles.documentLabel}>
                  {doc.toUpperCase()} Certificate
                </Text>
              </View>
              <View style={styles.documentStatus}>
                <Text style={[
                  styles.statusText,
                  status === 'Valid' ? styles.validStatus : styles.invalidStatus
                ]}>
                  {status}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  // Render maintenance tab
  const renderMaintenanceTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.maintenanceCard}>
        <Text style={styles.cardTitle}>Maintenance Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Last Service</Text>
          <Text style={styles.infoValue}>{vehicleData.maintenance.lastService}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Next Service Due</Text>
          <Text style={styles.infoValue}>{vehicleData.maintenance.nextService}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Current Odometer</Text>
          <Text style={styles.infoValue}>{vehicleData.maintenance.odometer}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addMaintenanceButton}>
        <Ionicons name="add-circle-outline" size={20} color="#007AFF" />
        <Text style={styles.addMaintenanceText}>Add Maintenance Record</Text>
      </TouchableOpacity>
    </View>
  );

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'features':
        return renderFeaturesTab();
      case 'pricing':
        return renderPricingTab();
      case 'documents':
        return renderDocumentsTab();
      case 'maintenance':
        return renderMaintenanceTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Vehicle Details</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditVehicle}>
            <Ionicons name="create-outline" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  activeTab === tab.id && styles.activeTab,
                ]}
                onPress={() => handleTabChange(tab.id)}
              >
                <Ionicons
                  name={tab.icon}
                  size={16}
                  color={activeTab === tab.id ? '#007AFF' : '#666'}
                />
                <Text style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              vehicleData.availability.isAvailable ? styles.unavailableButton : styles.availableButton,
            ]}
            onPress={handleToggleAvailability}
          >
            <Ionicons
              name={vehicleData.availability.isAvailable ? 'pause-circle-outline' : 'play-circle-outline'}
              size={20}
              color={vehicleData.availability.isAvailable ? '#FF3B30' : '#34C759'}
            />
            <Text style={[
              styles.actionButtonText,
              vehicleData.availability.isAvailable ? styles.unavailableButtonText : styles.availableButtonText,
            ]}>
              {vehicleData.availability.isAvailable ? 'Make Unavailable' : 'Make Available'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleEditVehicle}>
            <Ionicons name="create-outline" size={20} color="#007AFF" />
            <Text style={styles.actionButtonText}>Edit Vehicle</Text>
          </TouchableOpacity>
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
  editButton: {
    padding: 8,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  activeTab: {
    backgroundColor: '#F0F8FF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#007AFF',
  },
  tabContent: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  vehicleImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(52, 199, 89, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  featuresCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 12,
  },
  pricingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pricingList: {
    gap: 12,
  },
  pricingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  pricingLabel: {
    fontSize: 16,
    color: '#000',
  },
  pricingValue: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  availabilityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  availableText: {
    color: '#34C759',
  },
  unavailableText: {
    color: '#FF3B30',
  },
  documentsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  documentsList: {
    gap: 12,
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  documentLabel: {
    fontSize: 16,
    color: '#000',
    marginLeft: 12,
  },
  documentStatus: {
    alignItems: 'flex-end',
  },
  validStatus: {
    color: '#34C759',
  },
  invalidStatus: {
    color: '#FF3B30',
  },
  maintenanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addMaintenanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginBottom: 20,
  },
  addMaintenanceText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 8,
    fontWeight: '500',
  },
  actionButtons: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  availableButton: {
    backgroundColor: '#F0FDF4',
    borderColor: '#34C759',
  },
  unavailableButton: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FF3B30',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  availableButtonText: {
    color: '#34C759',
  },
  unavailableButtonText: {
    color: '#FF3B30',
  },
  bottomSpacer: {
    height: 40,
  },
});
