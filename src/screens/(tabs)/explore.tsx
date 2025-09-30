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

import { ThemedView } from '../../components/themed-view';
import { Car } from '../../types';
import { formatCurrency } from '../../utils/helpers';

/**
 * ExploreScreen Component (Car Management)
 * Displays and manages the vendor's car fleet
 */
export default function ExploreScreen() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'available' | 'unavailable'>('all');

  // Sample car data for development
  const sampleCars: Car[] = [
    {
      id: '1',
      vendorId: 'vendor1',
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      color: 'Silver',
      licensePlate: 'ABC-123',
      dailyRate: 75,
      isAvailable: true,
      features: ['GPS', 'Bluetooth', 'Air Conditioning'],
      images: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '2',
      vendorId: 'vendor1',
      make: 'Honda',
      model: 'Civic',
      year: 2022,
      color: 'Blue',
      licensePlate: 'XYZ-789',
      dailyRate: 65,
      isAvailable: false,
      features: ['GPS', 'Bluetooth'],
      images: [],
      createdAt: '2024-01-02',
      updatedAt: '2024-01-02',
    },
    {
      id: '3',
      vendorId: 'vendor1',
      make: 'Ford',
      model: 'Mustang',
      year: 2023,
      color: 'Red',
      licensePlate: 'DEF-456',
      dailyRate: 120,
      isAvailable: true,
      features: ['GPS', 'Bluetooth', 'Premium Sound', 'Sport Mode'],
      images: [],
      createdAt: '2024-01-03',
      updatedAt: '2024-01-03',
    },
  ];

  useEffect(() => {
    loadCars();
  }, []);

  /**
   * Load cars from the service
   */
  const loadCars = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await CarService.getCars();
      // setCars(response.data || []);

      // Using sample data for now
      setTimeout(() => {
        setCars(sampleCars);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading cars:', error);
      Alert.alert('Error', 'Failed to load cars');
      setLoading(false);
    }
  };

  /**
   * Handle pull-to-refresh
   */
  const onRefresh = async () => {
    setRefreshing(true);
    await loadCars();
    setRefreshing(false);
  };

  /**
   * Filter cars by availability
   */
  const filteredCars = filter === 'all'
    ? cars
    : cars.filter(car =>
        filter === 'available' ? car.isAvailable : !car.isAvailable
      );

  /**
   * Handle car availability toggle
   * @param carId - ID of the car to toggle
   */
  const toggleCarAvailability = async (carId: string) => {
    try {
      // TODO: Implement actual API call
      // await CarService.toggleAvailability(carId);

      // Update local state for now
      setCars(prev =>
        prev.map(car =>
          car.id === carId
            ? { ...car, isAvailable: !car.isAvailable }
            : car
        )
      );

      Alert.alert('Success', 'Car availability updated successfully');
    } catch (error) {
      console.error('Error updating car availability:', error);
      Alert.alert('Error', 'Failed to update car availability');
    }
  };

  /**
   * Handle add new car
   */
  const handleAddCar = () => {
    // TODO: Navigate to add car screen
    Alert.alert('Add Car', 'Add car functionality coming soon');
  };

  /**
   * Render individual car item
   * @param item - Car data
   */
  const renderCarItem = ({ item }: { item: Car }) => (
    <TouchableOpacity style={styles.carCard}>
      <View style={styles.carHeader}>
        <View style={styles.carInfo}>
          <Text style={styles.carMakeModel}>
            {item.year} {item.make} {item.model}
          </Text>
          <Text style={styles.carLicensePlate}>
            {item.licensePlate} • {item.color}
          </Text>
        </View>
        <View style={[
          styles.availabilityBadge,
          { backgroundColor: item.isAvailable ? '#28A745' : '#DC3545' }
        ]}>
          <Ionicons
            name={item.isAvailable ? 'checkmark-circle' : 'close-circle'}
            size={16}
            color="white"
          />
          <Text style={styles.availabilityText}>
            {item.isAvailable ? 'Available' : 'Unavailable'}
          </Text>
        </View>
      </View>

      <View style={styles.carDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="cash-outline" size={16} color="#666" />
          <Text style={styles.detailText}>
            {formatCurrency(item.dailyRate)}/day
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="list-outline" size={16} color="#666" />
          <Text style={styles.detailText}>
            {item.features.length} features
          </Text>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.toggleButton,
            { backgroundColor: item.isAvailable ? '#DC3545' : '#28A745' }
          ]}
          onPress={() => toggleCarAvailability(item.id)}
        >
          <Text style={styles.actionButtonText}>
            {item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => Alert.alert('Edit Car', 'Edit functionality coming soon')}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  /**
   * Render filter buttons
   */
  const renderFilterButtons = () => {
    const filters = [
      { key: 'all' as const, label: 'All Cars' },
      { key: 'available' as const, label: 'Available' },
      { key: 'unavailable' as const, label: 'Unavailable' },
    ];

    return (
      <View style={styles.filterContainer}>
        {filters.map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.filterButton,
              filter === key && styles.activeFilterButton,
            ]}
            onPress={() => setFilter(key)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === key && styles.activeFilterButtonText,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading cars...</Text>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header with add button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Car Fleet</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddCar}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Filter buttons */}
      {renderFilterButtons()}

      {/* Cars list */}
      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.id}
        renderItem={renderCarItem}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="car-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No cars found</Text>
            <Text style={styles.emptySubtext}>
              {filter === 'all'
                ? 'Add your first car to get started'
                : `No ${filter} cars found`
              }
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'OpenSans-Medium',
  },
  activeFilterButtonText: {
    color: 'white',
  },
  listContainer: {
    padding: 16,
  },
  carCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  carInfo: {
    flex: 1,
  },
  carMakeModel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  carLicensePlate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontFamily: 'OpenSans-Regular',
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 4,
    fontFamily: 'Montserrat-Bold',
  },
  carDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    fontFamily: 'OpenSans-Regular',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  toggleButton: {
    // Color will be set dynamically
  },
  editButton: {
    backgroundColor: '#6C757D',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
  },
});
