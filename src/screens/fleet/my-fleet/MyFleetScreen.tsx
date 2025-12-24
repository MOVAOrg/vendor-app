import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Vehicle {
  id: string;
  name: string;
  model: string;
  year: number;
  price: number;
  status: 'available' | 'booked' | 'maintenance';
  rating: number;
  image: string;
  location: string;
}

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Toyota Camry',
    model: 'Hybrid LE',
    year: 2023,
    price: 2500,
    status: 'available',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
    location: 'Mumbai, Maharashtra',
  },
  {
    id: '2',
    name: 'Honda City',
    model: 'VX CVT',
    year: 2022,
    price: 1800,
    status: 'booked',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
    location: 'Delhi, NCR',
  },
  {
    id: '3',
    name: 'Hyundai Creta',
    model: 'SX Executive',
    year: 2023,
    price: 2200,
    status: 'maintenance',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
    location: 'Bangalore, Karnataka',
  },
];

interface VehicleCardProps {
  vehicle: Vehicle;
  onPress: () => void;
  index: number;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onPress, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

  const getStatusColor = () => {
    switch (vehicle.status) {
      case 'available': return BrandColors.accent;
      case 'booked': return BrandColors.warning;
      case 'maintenance': return BrandColors.error;
      default: return BrandColors.textSecondary;
    }
  };

  const getStatusText = () => {
    switch (vehicle.status) {
      case 'available': return 'Available';
      case 'booked': return 'Booked';
      case 'maintenance': return 'Maintenance';
      default: return 'Unknown';
    }
  };

  return (
    <Animated.View
      style={[
        styles.vehicleCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Card variant="elevated" size="lg" style={styles.vehicleCardContent}>
          <View style={styles.vehicleImageContainer}>
            <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} />
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
              <Text style={styles.statusText}>{getStatusText()}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={BrandColors.warning} />
              <Text style={styles.ratingText}>{vehicle.rating}</Text>
            </View>
          </View>

          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleName}>{vehicle.name}</Text>
            <Text style={styles.vehicleModel}>{vehicle.model} • {vehicle.year}</Text>
            <Text style={styles.vehicleLocation}>
              <Ionicons name="location" size={14} color={BrandColors.textSecondary} />
              {' '}{vehicle.location}
            </Text>

            <View style={styles.vehicleFooter}>
              <Text style={styles.vehiclePrice}>₹{vehicle.price}/day</Text>
              <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-horizontal" size={20} color={BrandColors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function MyFleetScreen({ navigation }: any) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'available' | 'booked' | 'maintenance'>('all');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const handleAddVehicle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('BasicDetailsScreen');
  };

  const handleVehiclePress = (vehicle: Vehicle) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('VehicleDetailsScreen', { vehicle });
  };

  const handleFilterPress = (filter: typeof selectedFilter) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedFilter(filter);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    selectedFilter === 'all' || vehicle.status === selectedFilter
  );

  const getFilterCount = (status: typeof selectedFilter) => {
    if (status === 'all') return vehicles.length;
    return vehicles.filter(v => v.status === status).length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={BrandColors.primary}
            colors={[BrandColors.primary]}
          />
        }
      >
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.headerContent}>
            <Text style={styles.title}>My Fleet</Text>
            <Text style={styles.subtitle}>
              Manage your {vehicles.length} vehicles
            </Text>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddVehicle}>
            <LinearGradient
              colors={[BrandColors.accent, BrandColors.accentLight]}
              style={styles.addButtonGradient}
            >
              <Ionicons name="add" size={24} color={BrandColors.secondary} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Stats Cards */}
        <Animated.View
          style={[
            styles.statsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Card variant="gradient" size="md" style={styles.statCard}>
            <View style={styles.statContent}>
              <Ionicons name="car" size={24} color={BrandColors.secondary} />
              <Text style={styles.statValue}>{vehicles.length}</Text>
              <Text style={styles.statLabel}>Total Vehicles</Text>
            </View>
          </Card>

          <Card variant="elevated" size="md" style={styles.statCard}>
            <View style={styles.statContent}>
              <Ionicons name="checkmark-circle" size={24} color={BrandColors.accent} />
              <Text style={styles.statValue}>
                {vehicles.filter(v => v.status === 'available').length}
              </Text>
              <Text style={styles.statLabel}>Available</Text>
            </View>
          </Card>

          <Card variant="elevated" size="md" style={styles.statCard}>
            <View style={styles.statContent}>
              <Ionicons name="calendar" size={24} color={BrandColors.dot} />
              <Text style={styles.statValue}>
                {vehicles.filter(v => v.status === 'booked').length}
              </Text>
              <Text style={styles.statLabel}>Booked</Text>
            </View>
          </Card>
        </Animated.View>

        {/* Filter Tabs */}
        <Animated.View
          style={[
            styles.filterContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterTabs}>
              {(['all', 'available', 'booked', 'maintenance'] as const).map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterTab,
                    selectedFilter === filter && styles.filterTabActive,
                  ]}
                  onPress={() => handleFilterPress(filter)}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      selectedFilter === filter && styles.filterTabTextActive,
                    ]}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Text>
                  <View style={[
                    styles.filterBadge,
                    selectedFilter === filter && styles.filterBadgeActive,
                  ]}>
                    <Text style={[
                      styles.filterBadgeText,
                      selectedFilter === filter && styles.filterBadgeTextActive,
                    ]}>
                      {getFilterCount(filter)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Vehicle List */}
        <Animated.View
          style={[
            styles.vehiclesContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {filteredVehicles.length === 0 ? (
            <Card variant="elevated" size="lg" style={styles.emptyCard}>
              <View style={styles.emptyContent}>
                <Ionicons name="car-outline" size={64} color={BrandColors.textLight} />
                <Text style={styles.emptyTitle}>No vehicles found</Text>
                <Text style={styles.emptySubtitle}>
                  {selectedFilter === 'all'
                    ? 'Add your first vehicle to get started'
                    : `No vehicles with ${selectedFilter} status`
                  }
                </Text>
                {selectedFilter === 'all' && (
                  <Button
                    title="Add Vehicle"
                    onPress={handleAddVehicle}
                    variant="primary"
                    size="md"
                    icon="add"
                    style={styles.emptyButton}
                  />
                )}
              </View>
            </Card>
          ) : (
            filteredVehicles.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onPress={() => handleVehiclePress(vehicle)}
                index={index}
              />
            ))
          )}
        </Animated.View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.backgroundPrimary,
  },
  scrollView: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  addButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
  },
  statContent: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    textAlign: 'center',
  },

  // Filters
  filterContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  filterTabs: {
    flexDirection: 'row',
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.gray50,
    marginRight: Spacing.sm,
  },
  filterTabActive: {
    backgroundColor: BrandColors.primary,
  },
  filterTabText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.textSecondary,
    marginRight: Spacing.xs,
  },
  filterTabTextActive: {
    color: BrandColors.secondary,
  },
  filterBadge: {
    backgroundColor: BrandColors.secondary,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  filterBadgeActive: {
    backgroundColor: BrandColors.accent,
  },
  filterBadgeText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.primary,
  },
  filterBadgeTextActive: {
    color: BrandColors.secondary,
  },

  // Vehicles
  vehiclesContainer: {
    paddingHorizontal: Spacing.lg,
  },
  vehicleCard: {
    marginBottom: Spacing.lg,
  },
  vehicleCardContent: {
    padding: 0,
    overflow: 'hidden',
  },
  vehicleImageContainer: {
    position: 'relative',
    height: 200,
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  statusBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  statusText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.secondary,
  },
  ratingContainer: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.backgroundOverlay,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  ratingText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.secondary,
    marginLeft: Spacing.xs,
  },
  vehicleInfo: {
    padding: Spacing.md,
  },
  vehicleName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  vehicleModel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  vehicleLocation: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.md,
  },
  vehicleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vehiclePrice: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.accent,
  },
  moreButton: {
    padding: Spacing.sm,
  },

  // Empty State
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  emptyContent: {
    alignItems: 'center',
  },
  emptyTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  emptyButton: {
    marginTop: Spacing.md,
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
