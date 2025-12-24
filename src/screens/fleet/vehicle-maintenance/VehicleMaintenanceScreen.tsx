import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function VehicleMaintenanceScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Mock data
  const vehicles = [
    {
      id: '1',
      name: 'Toyota Camry 2023',
      licensePlate: 'MH01AB1234',
      status: 'available',
      lastService: '2024-01-15',
      nextService: '2024-04-15',
      mileage: '15,000 km',
    },
    {
      id: '2',
      name: 'Honda City 2022',
      licensePlate: 'MH02CD5678',
      status: 'maintenance',
      lastService: '2024-02-10',
      nextService: '2024-05-10',
      mileage: '22,000 km',
    },
  ];

  const maintenanceTypes = [
    { id: 'oil', name: 'Oil Change', icon: 'water', frequency: 'Every 5,000 km' },
    { id: 'tire', name: 'Tire Rotation', icon: 'disc', frequency: 'Every 10,000 km' },
    { id: 'brake', name: 'Brake Service', icon: 'stop-circle', frequency: 'Every 15,000 km' },
    { id: 'engine', name: 'Engine Check', icon: 'construct', frequency: 'Every 20,000 km' },
    { id: 'battery', name: 'Battery Check', icon: 'battery-half', frequency: 'Every 6 months' },
    { id: 'ac', name: 'AC Service', icon: 'snow', frequency: 'Every 3 months' },
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

  const handleAddMaintenance = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('AddMaintenanceScreen');
  };

  const handleVehicleSelect = (vehicle: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedVehicle(vehicle);
  };

  const handleMaintenanceTypeSelect = (type: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('ScheduleMaintenanceScreen', {
      vehicle: selectedVehicle,
      maintenanceType: type
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return BrandColors.accent;
      case 'maintenance': return BrandColors.warning;
      case 'booked': return BrandColors.error;
      default: return BrandColors.textLight;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return 'checkmark-circle';
      case 'maintenance': return 'construct';
      case 'booked': return 'time';
      default: return 'help-circle';
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
            <Text style={styles.title}>Vehicle Maintenance</Text>
            <Text style={styles.subtitle}>
              Keep your vehicles in top condition
            </Text>
          </View>
        </Animated.View>

        {/* Vehicle Selection */}
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Card variant="elevated" size="lg" style={styles.formCard}>
            <Text style={styles.sectionTitle}>Select Vehicle</Text>

            {vehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                style={[
                  styles.vehicleItem,
                  selectedVehicle?.id === vehicle.id && styles.vehicleItemSelected,
                ]}
                onPress={() => handleVehicleSelect(vehicle)}
              >
                <View style={styles.vehicleLeft}>
                  <View style={[
                    styles.vehicleIcon,
                    { backgroundColor: `${getStatusColor(vehicle.status)}20` },
                  ]}>
                    <Ionicons name="car" size={24} color={getStatusColor(vehicle.status)} />
                  </View>

                  <View style={styles.vehicleInfo}>
                    <Text style={styles.vehicleName}>{vehicle.name}</Text>
                    <Text style={styles.vehiclePlate}>{vehicle.licensePlate}</Text>
                    <View style={styles.vehicleStatus}>
                      <Ionicons name={getStatusIcon(vehicle.status)} size={14} color={getStatusColor(vehicle.status)} />
                      <Text style={[styles.vehicleStatusText, { color: getStatusColor(vehicle.status) }]}>
                        {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.vehicleRight}>
                  <Text style={styles.vehicleMileage}>{vehicle.mileage}</Text>
                  <Text style={styles.vehicleNextService}>Next: {vehicle.nextService}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        </Animated.View>

        {/* Maintenance Types */}
        {selectedVehicle && (
          <Animated.View
            style={[
              styles.contentContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Card variant="elevated" size="lg" style={styles.formCard}>
              <Text style={styles.sectionTitle}>Maintenance Types</Text>

              <View style={styles.maintenanceGrid}>
                {maintenanceTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={styles.maintenanceItem}
                    onPress={() => handleMaintenanceTypeSelect(type)}
                  >
                    <View style={[
                      styles.maintenanceIcon,
                      { backgroundColor: `${BrandColors.primary}20` },
                    ]}>
                      <Ionicons name={type.icon as any} size={24} color={BrandColors.primary} />
                    </View>

                    <Text style={styles.maintenanceName}>{type.name}</Text>
                    <Text style={styles.maintenanceFrequency}>{type.frequency}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>
          </Animated.View>
        )}

        {/* Maintenance History */}
        {selectedVehicle && (
          <Animated.View
            style={[
              styles.contentContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Card variant="elevated" size="lg" style={styles.formCard}>
              <Text style={styles.sectionTitle}>Recent Maintenance</Text>

              <View style={styles.historyItem}>
                <View style={styles.historyLeft}>
                  <View style={[
                    styles.historyIcon,
                    { backgroundColor: `${BrandColors.accent}20` },
                  ]}>
                    <Ionicons name="checkmark-circle" size={20} color={BrandColors.accent} />
                  </View>

                  <View style={styles.historyInfo}>
                    <Text style={styles.historyTitle}>Oil Change</Text>
                    <Text style={styles.historyDate}>Completed on {selectedVehicle.lastService}</Text>
                    <Text style={styles.historyMileage}>At 15,000 km</Text>
                  </View>
                </View>

                <View style={styles.historyRight}>
                  <Text style={styles.historyCost}>₹2,500</Text>
                </View>
              </View>

              <View style={styles.historyDivider} />

              <View style={styles.historyItem}>
                <View style={styles.historyLeft}>
                  <View style={[
                    styles.historyIcon,
                    { backgroundColor: `${BrandColors.warning}20` },
                  ]}>
                    <Ionicons name="time" size={20} color={BrandColors.warning} />
                  </View>

                  <View style={styles.historyInfo}>
                    <Text style={styles.historyTitle}>Tire Rotation</Text>
                    <Text style={styles.historyDate}>Scheduled for {selectedVehicle.nextService}</Text>
                    <Text style={styles.historyMileage}>At 20,000 km</Text>
                  </View>
                </View>

                <View style={styles.historyRight}>
                  <Text style={styles.historyCost}>₹1,200</Text>
                </View>
              </View>
            </Card>
          </Animated.View>
        )}

        {/* Quick Actions */}
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Card variant="elevated" size="lg" style={styles.formCard}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>

            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.quickAction} onPress={handleAddMaintenance}>
                <LinearGradient
                  colors={[BrandColors.primary, BrandColors.primaryDark]}
                  style={styles.quickActionGradient}
                >
                  <Ionicons name="add" size={24} color={BrandColors.secondary} />
                  <Text style={styles.quickActionText}>Add Maintenance</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickAction}>
                <LinearGradient
                  colors={[BrandColors.accent, BrandColors.accentLight]}
                  style={styles.quickActionGradient}
                >
                  <Ionicons name="calendar" size={24} color={BrandColors.secondary} />
                  <Text style={styles.quickActionText}>Schedule Service</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Card>
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
          <Button
            title="Add Maintenance Record"
            onPress={handleAddMaintenance}
            variant="primary"
            size="lg"
            icon="add"
            iconPosition="right"
            style={styles.addButton}
          />
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

  // Content
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  formCard: {
    width: '100%',
  },
  sectionTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },

  // Vehicle Selection
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.backgroundCard,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  vehicleItemSelected: {
    borderColor: BrandColors.primary,
    backgroundColor: `${BrandColors.primary}10`,
  },
  vehicleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehicleIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  vehiclePlate: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  vehicleStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleStatusText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    marginLeft: Spacing.xs,
  },
  vehicleRight: {
    alignItems: 'flex-end',
  },
  vehicleMileage: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  vehicleNextService: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textLight,
  },

  // Maintenance Types
  maintenanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  maintenanceItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.backgroundCard,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  maintenanceIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  maintenanceName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  maintenanceFrequency: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textSecondary,
    textAlign: 'center',
  },

  // History
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  historyDate: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  historyMileage: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textLight,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyCost: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.accent,
  },
  historyDivider: {
    height: 1,
    backgroundColor: BrandColors.borderLight,
    marginVertical: Spacing.sm,
  },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    marginHorizontal: Spacing.xs,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  quickActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  quickActionText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.secondary,
    marginLeft: Spacing.sm,
  },

  // Buttons
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  addButton: {
    width: '100%',
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
