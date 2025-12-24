import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../../components/ui/Card';
import { BorderRadius, BrandColors, Shadows, Spacing, Typography } from '../../constants/brandTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Development mode detection for Expo Go
const isExpoGo = Constants.appOwnership === 'expo';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon, color }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return BrandColors.accent;
      case 'negative': return BrandColors.error;
      default: return BrandColors.textSecondary;
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive': return 'trending-up';
      case 'negative': return 'trending-down';
      default: return 'remove';
    }
  };

  return (
    <Animated.View
      style={[
        styles.statCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Card variant="elevated" size="md" style={styles.statCardContent}>
        <View style={styles.statHeader}>
          <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
            <Ionicons name={icon} size={24} color={color} />
          </View>
          <View style={styles.statChange}>
            <Ionicons
              name={getChangeIcon()}
              size={16}
              color={getChangeColor()}
            />
            <Text style={[styles.statChangeText, { color: getChangeColor() }]}>
              {change}
            </Text>
          </View>
        </View>

        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </Card>
    </Animated.View>
  );
};

interface QuickActionProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ title, icon, color, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.quickAction}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[color, `${color}CC`]}
          style={styles.quickActionGradient}
        >
          <Ionicons name={icon} size={28} color={BrandColors.secondary} />
        </LinearGradient>
        <Text style={styles.quickActionText}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function DashboardScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
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

  const handleQuickAction = (action: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    switch (action) {
      case 'add-vehicle':
        navigation.navigate('BasicDetailsScreen');
        break;
      case 'view-bookings':
        navigation.navigate('MyBookingsScreen');
        break;
      case 'analytics':
        navigation.navigate('AnalyticsDashboardScreen');
        break;
      case 'wallet':
        navigation.navigate('WalletScreen');
        break;
    }
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
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.userName}>Welcome back, Vendor</Text>
            {/* Development mode indicator */}
            {isExpoGo && (
              <View style={styles.devModeIndicator}>
                <Text style={styles.devModeText}>🚀 Development Mode</Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.profileButton}>
            <LinearGradient
              colors={[BrandColors.accent, BrandColors.accentLight]}
              style={styles.profileGradient}
            >
              <Ionicons name="person" size={24} color={BrandColors.secondary} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View
          style={[
            styles.statsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <StatCard
            title="Total Revenue"
            value="₹45,230"
            change="+12.5%"
            changeType="positive"
            icon="trending-up"
            color={BrandColors.accent}
          />

          <StatCard
            title="Active Bookings"
            value="23"
            change="+3"
            changeType="positive"
            icon="calendar"
            color={BrandColors.dot}
          />

          <StatCard
            title="Fleet Size"
            value="12"
            change="+1"
            changeType="positive"
            icon="car"
            color={BrandColors.primary}
          />

          <StatCard
            title="Rating"
            value="4.8"
            change="+0.2"
            changeType="positive"
            icon="star"
            color={BrandColors.warning}
          />
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View
          style={[
            styles.quickActionsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.quickActionsGrid}>
            <QuickAction
              title="Add Vehicle"
              icon="add-circle"
              color={BrandColors.accent}
              onPress={() => handleQuickAction('add-vehicle')}
            />

            <QuickAction
              title="View Bookings"
              icon="calendar"
              color={BrandColors.dot}
              onPress={() => handleQuickAction('view-bookings')}
            />

            <QuickAction
              title="Analytics"
              icon="analytics"
              color={BrandColors.primary}
              onPress={() => handleQuickAction('analytics')}
            />

            <QuickAction
              title="Wallet"
              icon="wallet"
              color={BrandColors.warning}
              onPress={() => handleQuickAction('wallet')}
            />
          </View>
        </Animated.View>

        {/* Recent Activity */}
        <Animated.View
          style={[
            styles.recentActivityContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <Card variant="elevated" size="lg">
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: `${BrandColors.accent}20` }]}>
                <Ionicons name="checkmark-circle" size={20} color={BrandColors.accent} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Booking Completed</Text>
                <Text style={styles.activitySubtitle}>Toyota Camry - ₹2,500</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityDivider} />

            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: `${BrandColors.dot}20` }]}>
                <Ionicons name="add-circle" size={20} color={BrandColors.dot} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New Vehicle Added</Text>
                <Text style={styles.activitySubtitle}>Honda City - Ready for booking</Text>
                <Text style={styles.activityTime}>5 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityDivider} />

            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: `${BrandColors.warning}20` }]}>
                <Ionicons name="cash" size={20} color={BrandColors.warning} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Payment Received</Text>
                <Text style={styles.activitySubtitle}>₹1,800 - Weekly earnings</Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
            </View>
          </Card>
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
  greeting: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  userName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  profileGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  devModeIndicator: {
    backgroundColor: BrandColors.accent,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    marginTop: Spacing.xs,
    alignSelf: 'flex-start',
  },
  devModeText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.secondary,
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  statCard: {
    width: '48%',
    marginBottom: Spacing.md,
    marginRight: '2%',
  },
  statCardContent: {
    alignItems: 'center',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: Spacing.sm,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statChangeText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    marginLeft: Spacing.xs,
  },
  statValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  statTitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    textAlign: 'center',
  },

  // Quick Actions
  quickActionsContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: '48%',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  quickActionGradient: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    ...Shadows.md,
  },
  quickActionText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.textPrimary,
    textAlign: 'center',
  },

  // Recent Activity
  recentActivityContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  viewAllText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.primary,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  activitySubtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  activityTime: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textLight,
  },
  activityDivider: {
    height: 1,
    backgroundColor: BrandColors.borderLight,
    marginVertical: Spacing.sm,
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
