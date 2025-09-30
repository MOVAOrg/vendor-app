import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  status: 'available' | 'rented' | 'maintenance' | 'unavailable';
  dailyRate: number;
  image: string;
  location: string;
  mileage: number;
  fuelType: string;
  transmission: string;
}

/**
 * My Fleet Screen Component
 * Displays vendor's vehicle fleet with management options
 * Shows vehicle status, availability, and quick actions
 */
export default function MyFleetScreen({ navigation }: any) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'available' | 'rented' | 'maintenance'>('all');

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      // TODO: Fetch actual vehicles from backend
      // const data = await VehicleService.getVendorVehicles();

      // Mock data for now
      const mockVehicles: Vehicle[] = [
        {
          id: '1',
          make: 'Toyota',
          model: 'Camry',
          year: 2022,
          licensePlate: 'ABC-123',
          status: 'available',
          dailyRate: 150,
          image: 'https://example.com/camry.jpg',
          location: 'Dubai Marina',
          mileage: 15000,
          fuelType: 'Petrol',
          transmission: 'Automatic',
        },
        {
          id: '2',
          make: 'Honda',
          model: 'Civic',
          year: 2021,
          licensePlate: 'DEF-456',
          status: 'rented',
          dailyRate: 120,
          image: 'https://example.com/civic.jpg',
          location: 'JBR',
          mileage: 25000,
          fuelType: 'Petrol',
          transmission: 'Manual',
        },
        {
          id: '3',
          make: 'Nissan',
          model: 'Altima',
          year: 2023,
          licensePlate: 'GHI-789',
          status: 'maintenance',
          dailyRate: 180,
          image: 'https://example.com/altima.jpg',
          location: 'Downtown',
          mileage: 8000,
          fuelType: 'Petrol',
          transmission: 'Automatic',
        },
      ];

      setVehicles(mockVehicles);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVehicles();
    setRefreshing(false);
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    if (filter === 'all') return true;
    return vehicle.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return '#34C759';
      case 'rented':
        return '#007AFF';
      case 'maintenance':
        return '#FF9500';
      case 'unavailable':
        return '#FF3B30';
      default:
        return '#666666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return 'checkmark-circle';
      case 'rented':
        return 'time';
      case 'maintenance':
        return 'construct';
      case 'unavailable':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  const renderVehicleItem = ({ item }: { item: Vehicle }) => (
    <TouchableOpacity
      style={styles.vehicleCard}
      onPress={() => navigation.navigate('VehicleDetailsScreen', { vehicleId: item.id })}
    >
      <View style={styles.vehicleImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.vehicleImage}
          resizeMode="cover"
        />
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Ionicons name={getStatusIcon(item.status) as any} size={12} color="#FFFFFF" />
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.vehicleInfo}>
        <View style={styles.vehicleHeader}>
          <Text style={styles.vehicleTitle}>{item.year} {item.make} {item.model}</Text>
          <Text style={styles.dailyRate}>AED {item.dailyRate}/day</Text>
        </View>

        <View style={styles.vehicleDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color="#666666" />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="speedometer-outline" size={16} color="#666666" />
            <Text style={styles.detailText}>{item.mileage.toLocaleString()} km</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="car-outline" size={16} color="#666666" />
            <Text style={styles.detailText}>{item.licensePlate}</Text>
          </View>
        </View>

        <View style={styles.vehicleActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('EditVehicleScreen', { vehicleId: item.id })}
          >
            <Ionicons name="create-outline" size={16} color="#007AFF" />
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('MaintenanceLogScreen', { vehicleId: item.id })}
          >
            <Ionicons name="construct-outline" size={16} color="#FF9500" />
            <Text style={styles.actionButtonText}>Maintenance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleToggleAvailability(item)}
          >
            <Ionicons
              name={item.status === 'available' ? 'pause-circle-outline' : 'play-circle-outline'}
              size={16}
              color={item.status === 'available' ? '#FF9500' : '#34C759'}
            />
            <Text style={styles.actionButtonText}>
              {item.status === 'available' ? 'Pause' : 'Activate'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleToggleAvailability = async (vehicle: Vehicle) => {
    try {
      // TODO: Implement toggle availability API call
      // await VehicleService.toggleAvailability(vehicle.id);
      console.log('Toggle availability for vehicle:', vehicle.id);
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

  const filterButtons = [
    { key: 'all', label: 'All', count: vehicles.length },
    { key: 'available', label: 'Available', count: vehicles.filter(v => v.status === 'available').length },
    { key: 'rented', label: 'Rented', count: vehicles.filter(v => v.status === 'rented').length },
    { key: 'maintenance', label: 'Maintenance', count: vehicles.filter(v => v.status === 'maintenance').length },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Fleet</Text>
          <Text style={styles.subtitle}>{vehicles.length} vehicles in your fleet</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddVehicleScreen')}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filterButtons.map((button) => (
            <TouchableOpacity
              key={button.key}
              style={[
                styles.filterButton,
                filter === button.key && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(button.key as any)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === button.key && styles.filterButtonTextActive,
                ]}
              >
                {button.label} ({button.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Vehicles List */}
      <FlatList
        data={filteredVehicles}
        renderItem={renderVehicleItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="car-outline" size={64} color="#CCCCCC" />
            <Text style={styles.emptyTitle}>No vehicles found</Text>
            <Text style={styles.emptySubtitle}>
              {filter === 'all'
                ? 'Add your first vehicle to get started'
                : `No vehicles with status: ${filter}`
              }
            </Text>
            {filter === 'all' && (
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.navigate('AddVehicleScreen')}
              >
                <Text style={styles.emptyButtonText}>Add Vehicle</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    fontFamily: 'Montserrat-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'OpenSans-Regular',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'OpenSans-Regular',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  listContainer: {
    padding: 16,
  },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vehicleImageContainer: {
    position: 'relative',
    height: 200,
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: 'OpenSans-SemiBold',
  },
  vehicleInfo: {
    padding: 16,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  vehicleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Montserrat-SemiBold',
  },
  dailyRate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34C759',
    fontFamily: 'Montserrat-Bold',
  },
  vehicleDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
    fontFamily: 'OpenSans-Regular',
  },
  vehicleActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
    fontFamily: 'OpenSans-Regular',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666666',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Montserrat-SemiBold',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'OpenSans-Regular',
  },
  emptyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
});
