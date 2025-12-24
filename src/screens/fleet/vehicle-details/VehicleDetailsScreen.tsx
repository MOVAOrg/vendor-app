import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Image,
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

export default function VehicleDetailsScreen({ navigation, route }: any) {
  const { vehicle } = route.params || {};
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Mock vehicle data if not provided
  const vehicleData = vehicle || {
    id: '1',
    name: 'Toyota Camry 2023',
    brand: 'Toyota',
    model: 'Camry',
    year: '2023',
    color: 'White',
    licensePlate: 'MH01AB1234',
    type: 'Sedan',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seatingCapacity: '5',
    mileage: '15 km/l',
    pricePerDay: '2500',
    status: 'available',
    rating: 4.8,
    totalBookings: 45,
    totalEarnings: '1,25,000',
    features: ['AC', 'GPS', 'Bluetooth', 'USB', 'Sunroof'],
    images: [
      'https://via.placeholder.com/300x200/007AFF/FFFFFF?text=Front+View',
      'https://via.placeholder.com/300x200/34C759/FFFFFF?text=Side+View',
      'https://via.placeholder.com/300x200/FF9500/FFFFFF?text=Interior',
      'https://via.placeholder.com/300x200/FF3B30/FFFFFF?text=Back+View',
    ],
    description: 'Well-maintained Toyota Camry with excellent fuel efficiency and comfortable seating. Perfect for city drives and long trips.',
    location: 'Mumbai, Maharashtra',
    lastService: '2024-01-15',
    nextService: '2024-04-15',
  };

  const tabs = [
    { id: 'overview', title: 'Overview', icon: 'information-circle' },
    { id: 'bookings', title: 'Bookings', icon: 'calendar' },
    { id: 'maintenance', title: 'Maintenance', icon: 'construct' },
    { id: 'earnings', title: 'Earnings', icon: 'cash' },
  ];

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
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleEdit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('EditVehicleScreen', { vehicle: vehicleData });
  };

  const handleStatusChange = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      'Change Status',
      'Select new status for this vehicle',
      [
        { text: 'Available', onPress: () => console.log('Status: Available') },
        { text: 'Booked', onPress: () => console.log('Status: Booked') },
        { text: 'Maintenance', onPress: () => console.log('Status: Maintenance') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const getStatusColor = () => {
    switch (vehicleData.status) {
      case 'available': return BrandColors.accent;
      case 'booked': return BrandColors.warning;
      case 'maintenance': return BrandColors.error;
      default: return BrandColors.textLight;
    }
  };

  const getStatusIcon = () => {
    switch (vehicleData.status) {
      case 'available': return 'checkmark-circle';
      case 'booked': return 'time';
      case 'maintenance': return 'construct';
      default: return 'help-circle';
    }
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Vehicle Images */}
      <Card variant="elevated" size="md" style={styles.imagesCard}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesScroll}>
          {vehicleData.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.vehicleImage} />
          ))}
        </ScrollView>
      </Card>

      {/* Basic Information */}
      <Card variant="elevated" size="md" style={styles.infoCard}>
        <Text style={styles.cardTitle}>Basic Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Brand & Model</Text>
          <Text style={styles.infoValue}>{vehicleData.brand} {vehicleData.model}</Text>
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
          <Text style={styles.infoLabel}>Location</Text>
          <Text style={styles.infoValue}>{vehicleData.location}</Text>
        </View>
      </Card>

      {/* Specifications */}
      <Card variant="elevated" size="md" style={styles.infoCard}>
        <Text style={styles.cardTitle}>Specifications</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Vehicle Type</Text>
          <Text style={styles.infoValue}>{vehicleData.type}</Text>
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
      </Card>

      {/* Features */}
      <Card variant="elevated" size="md" style={styles.infoCard}>
        <Text style={styles.cardTitle}>Features</Text>
        <View style={styles.featuresContainer}>
          {vehicleData.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color={BrandColors.accent} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Description */}
      <Card variant="elevated" size="md" style={styles.infoCard}>
        <Text style={styles.cardTitle}>Description</Text>
        <Text style={styles.descriptionText}>{vehicleData.description}</Text>
      </Card>
    </View>
  );

  const renderBookings = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="md" style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{vehicleData.totalBookings}</Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{vehicleData.rating}</Text>
            <Text style={styles.statLabel}>Average Rating</Text>
          </View>
        </View>
      </Card>

      <Card variant="elevated" size="md" style={styles.infoCard}>
        <Text style={styles.cardTitle}>Recent Bookings</Text>
        <Text style={styles.emptyText}>No recent bookings to display</Text>
      </Card>
    </View>
  );

  const renderMaintenance = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="md" style={styles.infoCard}>
        <Text style={styles.cardTitle}>Service History</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Last Service</Text>
          <Text style={styles.infoValue}>{vehicleData.lastService}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Next Service Due</Text>
          <Text style={styles.infoValue}>{vehicleData.nextService}</Text>
        </View>
      </Card>

      <Card variant="elevated" size="md" style={styles.infoCard}>
        <Text style={styles.cardTitle}>Maintenance Records</Text>
        <Text style={styles.emptyText}>No maintenance records available</Text>
      </Card>
    </View>
  );

  const renderEarnings = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="md" style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹{vehicleData.totalEarnings}</Text>
            <Text style={styles.statLabel}>Total Earnings</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹{vehicleData.pricePerDay}</Text>
            <Text style={styles.statLabel}>Daily Rate</Text>
          </View>
        </View>
      </Card>

      <Card variant="elevated" size="md" style={styles.infoCard}>
        <Text style={styles.cardTitle}>Earnings History</Text>
        <Text style={styles.emptyText}>No earnings data available</Text>
      </Card>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'bookings': return renderBookings();
      case 'maintenance': return renderMaintenance();
      case 'earnings': return renderEarnings();
      default: return renderOverview();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={BrandColors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <Text style={styles.title}>{vehicleData.name}</Text>
            <View style={styles.statusContainer}>
              <Ionicons name={getStatusIcon()} size={16} color={getStatusColor()} />
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                {vehicleData.status.charAt(0).toUpperCase() + vehicleData.status.slice(1)}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Ionicons name="create" size={24} color={BrandColors.primary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Tabs */}
        <Animated.View
          style={[
            styles.tabsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tabsRow}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  style={[
                    styles.tab,
                    activeTab === tab.id && styles.tabActive,
                  ]}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setActiveTab(tab.id);
                  }}
                >
                  <Ionicons
                    name={tab.icon as any}
                    size={20}
                    color={activeTab === tab.id ? BrandColors.primary : BrandColors.textLight}
                  />
                  <Text style={[
                    styles.tabText,
                    activeTab === tab.id && styles.tabTextActive,
                  ]}>
                    {tab.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Tab Content */}
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {renderTabContent()}
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.buttonRow}>
            <Button
              title="Change Status"
              onPress={handleStatusChange}
              variant="outline"
              size="lg"
              icon="swap-horizontal"
              style={styles.statusButton}
            />

            <Button
              title="Edit Vehicle"
              onPress={handleEdit}
              variant="primary"
              size="lg"
              icon="create"
              style={styles.editVehicleButton}
            />
          </View>
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginLeft: Spacing.xs,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Tabs
  tabsContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  tabsRow: {
    flexDirection: 'row',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    marginRight: Spacing.sm,
    backgroundColor: BrandColors.gray50,
  },
  tabActive: {
    backgroundColor: BrandColors.primary,
  },
  tabText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textLight,
    marginLeft: Spacing.xs,
  },
  tabTextActive: {
    color: BrandColors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Content
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  tabContent: {
    width: '100%',
  },

  // Images
  imagesCard: {
    marginBottom: Spacing.lg,
  },
  imagesScroll: {
    flexDirection: 'row',
  },
  vehicleImage: {
    width: 200,
    height: 120,
    borderRadius: BorderRadius.lg,
    marginRight: Spacing.md,
  },

  // Info Cards
  infoCard: {
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.borderLight,
  },
  infoLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },
  infoValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.textPrimary,
  },

  // Features
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: Spacing.sm,
  },
  featureText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textPrimary,
    marginLeft: Spacing.sm,
  },

  // Description
  descriptionText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
    lineHeight: 22,
  },

  // Stats
  statsCard: {
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },

  // Empty State
  emptyText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Buttons
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    flex: 1,
    marginRight: Spacing.md,
  },
  editVehicleButton: {
    flex: 1,
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
