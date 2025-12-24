import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
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

export default function MaintenanceLogScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const vehicles = [
    { id: 'all', name: 'All Vehicles', color: BrandColors.primary },
    { id: '1', name: 'Toyota Camry 2023', color: BrandColors.accent },
    { id: '2', name: 'Honda City 2022', color: BrandColors.dot },
    { id: '3', name: 'Maruti Swift 2023', color: BrandColors.warning },
  ];

  const statusOptions = [
    { id: 'all', title: 'All', color: BrandColors.textLight },
    { id: 'scheduled', title: 'Scheduled', color: BrandColors.warning },
    { id: 'in-progress', title: 'In Progress', color: BrandColors.info },
    { id: 'completed', title: 'Completed', color: BrandColors.accent },
    { id: 'overdue', title: 'Overdue', color: BrandColors.error },
  ];

  // Mock maintenance data
  const maintenanceLogs = [
    {
      id: 'MT001',
      vehicleId: '1',
      vehicleName: 'Toyota Camry 2023',
      type: 'Oil Change',
      description: 'Regular oil change and filter replacement',
      scheduledDate: '2024-03-20',
      completedDate: '2024-03-20',
      status: 'completed',
      cost: 2500,
      mileage: 15000,
      nextDueDate: '2024-06-20',
      technician: 'Rajesh Kumar',
      notes: 'All systems working properly',
    },
    {
      id: 'MT002',
      vehicleId: '2',
      vehicleName: 'Honda City 2022',
      type: 'Brake Service',
      description: 'Brake pad replacement and brake fluid check',
      scheduledDate: '2024-03-25',
      completedDate: null,
      status: 'scheduled',
      cost: 4500,
      mileage: 25000,
      nextDueDate: '2024-09-25',
      technician: 'Amit Patel',
      notes: 'Scheduled for next week',
    },
    {
      id: 'MT003',
      vehicleId: '3',
      vehicleName: 'Maruti Swift 2023',
      type: 'Engine Service',
      description: 'Engine tune-up and spark plug replacement',
      scheduledDate: '2024-03-15',
      completedDate: null,
      status: 'in-progress',
      cost: 3200,
      mileage: 12000,
      nextDueDate: '2024-09-15',
      technician: 'Priya Sharma',
      notes: 'Engine running smoothly',
    },
    {
      id: 'MT004',
      vehicleId: '1',
      vehicleName: 'Toyota Camry 2023',
      type: 'Tire Rotation',
      description: 'Tire rotation and alignment check',
      scheduledDate: '2024-03-10',
      completedDate: null,
      status: 'overdue',
      cost: 1800,
      mileage: 14500,
      nextDueDate: '2024-09-10',
      technician: 'Vikram Singh',
      notes: 'Overdue - needs immediate attention',
    },
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

  const handleVehicleChange = (vehicleId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedVehicle(vehicleId);
  };

  const handleStatusChange = (statusId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedStatus(statusId);
  };

  const handleMaintenanceSelect = (maintenance: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Maintenance Details', `Viewing details for ${maintenance.type}...`);
  };

  const handleAddMaintenance = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Add Maintenance', 'Add new maintenance record feature coming soon!');
  };

  const handleUpdateStatus = (maintenanceId: string, newStatus: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      'Update Status',
      `Mark this maintenance as ${newStatus}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Update', onPress: () => {
          Alert.alert('Success', 'Maintenance status updated successfully!');
        }},
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return BrandColors.accent;
      case 'in-progress': return BrandColors.info;
      case 'scheduled': return BrandColors.warning;
      case 'overdue': return BrandColors.error;
      default: return BrandColors.textLight;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return 'checkmark-circle';
      case 'in-progress': return 'time';
      case 'scheduled': return 'calendar';
      case 'overdue': return 'warning';
      default: return 'help-circle';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Oil Change': return 'water';
      case 'Brake Service': return 'stop-circle';
      case 'Engine Service': return 'settings';
      case 'Tire Rotation': return 'disc';
      default: return 'construct';
    }
  };

  const filteredMaintenance = maintenanceLogs.filter(log =>
    (selectedVehicle === 'all' || log.vehicleId === selectedVehicle) &&
    (selectedStatus === 'all' || log.status === selectedStatus)
  );

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
            <Text style={styles.title}>Maintenance Log</Text>
            <Text style={styles.subtitle}>
              Track vehicle maintenance records
            </Text>
          </View>
        </Animated.View>

        {/* Filters */}
        <Animated.View
          style={[
            styles.filtersContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Vehicle Filter */}
          <Card variant="elevated" size="md" style={styles.filterCard}>
            <Text style={styles.filterTitle}>Filter by Vehicle</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterOptions}>
                {vehicles.map((vehicle) => (
                  <TouchableOpacity
                    key={vehicle.id}
                    style={[
                      styles.filterOption,
                      selectedVehicle === vehicle.id && styles.filterOptionActive,
                    ]}
                    onPress={() => handleVehicleChange(vehicle.id)}
                  >
                    <View style={[
                      styles.filterColor,
                      { backgroundColor: vehicle.color },
                    ]} />
                    <Text style={[
                      styles.filterOptionText,
                      selectedVehicle === vehicle.id && styles.filterOptionTextActive,
                    ]}>
                      {vehicle.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Card>

          {/* Status Filter */}
          <Card variant="elevated" size="md" style={styles.filterCard}>
            <Text style={styles.filterTitle}>Filter by Status</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterOptions}>
                {statusOptions.map((status) => (
                  <TouchableOpacity
                    key={status.id}
                    style={[
                      styles.filterOption,
                      selectedStatus === status.id && styles.filterOptionActive,
                    ]}
                    onPress={() => handleStatusChange(status.id)}
                  >
                    <View style={[
                      styles.filterColor,
                      { backgroundColor: status.color },
                    ]} />
                    <Text style={[
                      styles.filterOptionText,
                      selectedStatus === status.id && styles.filterOptionTextActive,
                    ]}>
                      {status.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Card>
        </Animated.View>

        {/* Maintenance Logs */}
        <Animated.View
          style={[
            styles.logsContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          <Card variant="elevated" size="lg" style={styles.logsCard}>
            <Text style={styles.logsTitle}>Maintenance Records</Text>

            {filteredMaintenance.map((log) => (
              <TouchableOpacity
                key={log.id}
                style={styles.logItem}
                onPress={() => handleMaintenanceSelect(log)}
              >
                <View style={styles.logLeft}>
                  <View style={[
                    styles.logIcon,
                    { backgroundColor: `${getStatusColor(log.status)}20` },
                  ]}>
                    <Ionicons name={getTypeIcon(log.type)} size={20} color={getStatusColor(log.status)} />
                  </View>

                  <View style={styles.logInfo}>
                    <Text style={styles.logType}>{log.type}</Text>
                    <Text style={styles.logVehicle}>{log.vehicleName}</Text>
                    <Text style={styles.logDescription}>{log.description}</Text>

                    <View style={styles.logMeta}>
                      <Text style={styles.logDate}>
                        Scheduled: {log.scheduledDate}
                      </Text>
                      {log.completedDate && (
                        <Text style={styles.logCompleted}>
                          Completed: {log.completedDate}
                        </Text>
                      )}
                    </View>

                    <View style={styles.logDetails}>
                      <Text style={styles.logMileage}>Mileage: {log.mileage.toLocaleString()} km</Text>
                      <Text style={styles.logCost}>Cost: ₹{log.cost}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.logRight}>
                  <View style={styles.logStatus}>
                    <Ionicons name={getStatusIcon(log.status)} size={14} color={getStatusColor(log.status)} />
                    <Text style={[styles.logStatusText, { color: getStatusColor(log.status) }]}>
                      {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                    </Text>
                  </View>

                  {log.status !== 'completed' && (
                    <TouchableOpacity
                      style={styles.updateButton}
                      onPress={() => handleUpdateStatus(log.id, 'completed')}
                    >
                      <Ionicons name="checkmark" size={14} color={BrandColors.accent} />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            ))}
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

  // Filters
  filtersContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  filterCard: {
    width: '100%',
    marginBottom: Spacing.md,
  },
  filterTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.gray50,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  filterOptionActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  filterColor: {
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
  },
  filterOptionText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textLight,
  },
  filterOptionTextActive: {
    color: BrandColors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Logs
  logsContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  logsCard: {
    width: '100%',
  },
  logsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  logItem: {
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
  logLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  logInfo: {
    flex: 1,
  },
  logType: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  logVehicle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  logDescription: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  logMeta: {
    marginBottom: Spacing.xs,
  },
  logDate: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textLight,
  },
  logCompleted: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.accent,
  },
  logDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logMileage: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textLight,
  },
  logCost: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.accent,
    fontWeight: Typography.fontWeight.medium,
  },
  logRight: {
    alignItems: 'flex-end',
  },
  logStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  logStatusText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    marginLeft: Spacing.xs,
  },
  updateButton: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.sm,
    backgroundColor: BrandColors.accent + '20',
    alignItems: 'center',
    justifyContent: 'center',
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
