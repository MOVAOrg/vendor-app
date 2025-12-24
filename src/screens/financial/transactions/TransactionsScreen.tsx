import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../../../components/ui/Card';
import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function TransactionsScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const filters = [
    { id: 'all', title: 'All', icon: 'list' },
    { id: 'credit', title: 'Income', icon: 'arrow-down-circle' },
    { id: 'debit', title: 'Expenses', icon: 'arrow-up-circle' },
    { id: 'pending', title: 'Pending', icon: 'time' },
  ];

  const periods = [
    { id: 'week', title: 'This Week' },
    { id: 'month', title: 'This Month' },
    { id: 'quarter', title: 'This Quarter' },
    { id: 'year', title: 'This Year' },
  ];

  // Mock transaction data
  const transactions = [
    {
      id: 'TXN001',
      type: 'credit',
      amount: 5000,
      description: 'Booking payment from Rajesh Kumar',
      date: '2024-03-10',
      time: '10:30 AM',
      status: 'completed',
      bookingId: 'BK001',
      category: 'booking',
    },
    {
      id: 'TXN002',
      type: 'debit',
      amount: 2000,
      description: 'Withdrawal to bank account',
      date: '2024-03-08',
      time: '2:15 PM',
      status: 'completed',
      bookingId: null,
      category: 'withdrawal',
    },
    {
      id: 'TXN003',
      type: 'credit',
      amount: 4400,
      description: 'Booking payment from Priya Sharma',
      date: '2024-03-05',
      time: '9:45 AM',
      status: 'pending',
      bookingId: 'BK002',
      category: 'booking',
    },
    {
      id: 'TXN004',
      type: 'credit',
      amount: 3600,
      description: 'Booking payment from Amit Patel',
      date: '2024-03-03',
      time: '11:20 AM',
      status: 'completed',
      bookingId: 'BK003',
      category: 'booking',
    },
    {
      id: 'TXN005',
      type: 'debit',
      amount: 500,
      description: 'Service fee',
      date: '2024-03-01',
      time: '3:30 PM',
      status: 'completed',
      bookingId: null,
      category: 'fee',
    },
    {
      id: 'TXN006',
      type: 'credit',
      amount: 2800,
      description: 'Booking payment from Suresh Kumar',
      date: '2024-02-28',
      time: '8:15 AM',
      status: 'completed',
      bookingId: 'BK004',
      category: 'booking',
    },
  ];

  const summary = {
    totalIncome: 15800,
    totalExpenses: 2500,
    netAmount: 13300,
    pendingAmount: 4400,
  };

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

  const handleFilterChange = (filter: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedFilter(filter);
  };

  const handlePeriodChange = (period: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedPeriod(period);
  };

  const handleTransactionSelect = (transaction: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Transaction Details', `Transaction ID: ${transaction.id}`);
  };

  const handleExport = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Export', 'Export functionality coming soon!');
  };

  const getTransactionIcon = (type: string, category: string) => {
    if (type === 'credit') {
      switch (category) {
        case 'booking': return 'car';
        case 'bonus': return 'gift';
        case 'refund': return 'refresh';
        default: return 'arrow-down-circle';
      }
    } else {
      switch (category) {
        case 'withdrawal': return 'arrow-up-circle';
        case 'fee': return 'card';
        case 'maintenance': return 'construct';
        default: return 'arrow-up-circle';
      }
    }
  };

  const getTransactionColor = (type: string) => {
    return type === 'credit' ? BrandColors.accent : BrandColors.error;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return BrandColors.accent;
      case 'pending': return BrandColors.warning;
      case 'failed': return BrandColors.error;
      default: return BrandColors.textLight;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'credit') return transaction.type === 'credit';
    if (selectedFilter === 'debit') return transaction.type === 'debit';
    if (selectedFilter === 'pending') return transaction.status === 'pending';
    return true;
  });

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
            <Text style={styles.title}>Transactions</Text>
            <Text style={styles.subtitle}>
              Track your financial activity
            </Text>
          </View>

          <TouchableOpacity onPress={handleExport} style={styles.exportButton}>
            <Ionicons name="download" size={24} color={BrandColors.primary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Summary Cards */}
        <Animated.View
          style={[
            styles.summaryContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.summaryRow}>
            <Card variant="elevated" size="md" style={styles.summaryCard}>
              <View style={styles.summaryContent}>
                <Ionicons name="arrow-down-circle" size={24} color={BrandColors.accent} />
                <Text style={styles.summaryValue}>₹{summary.totalIncome.toLocaleString()}</Text>
                <Text style={styles.summaryLabel}>Total Income</Text>
              </View>
            </Card>

            <Card variant="elevated" size="md" style={styles.summaryCard}>
              <View style={styles.summaryContent}>
                <Ionicons name="arrow-up-circle" size={24} color={BrandColors.error} />
                <Text style={styles.summaryValue}>₹{summary.totalExpenses.toLocaleString()}</Text>
                <Text style={styles.summaryLabel}>Total Expenses</Text>
              </View>
            </Card>
          </View>

          <View style={styles.summaryRow}>
            <Card variant="elevated" size="md" style={styles.summaryCard}>
              <View style={styles.summaryContent}>
                <Ionicons name="wallet" size={24} color={BrandColors.primary} />
                <Text style={styles.summaryValue}>₹{summary.netAmount.toLocaleString()}</Text>
                <Text style={styles.summaryLabel}>Net Amount</Text>
              </View>
            </Card>

            <Card variant="elevated" size="md" style={styles.summaryCard}>
              <View style={styles.summaryContent}>
                <Ionicons name="time" size={24} color={BrandColors.warning} />
                <Text style={styles.summaryValue}>₹{summary.pendingAmount.toLocaleString()}</Text>
                <Text style={styles.summaryLabel}>Pending</Text>
              </View>
            </Card>
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
          <Card variant="elevated" size="md" style={styles.filtersCard}>
            <Text style={styles.filtersTitle}>Filter by Type</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filtersRow}>
                {filters.map((filter) => (
                  <TouchableOpacity
                    key={filter.id}
                    style={[
                      styles.filterItem,
                      selectedFilter === filter.id && styles.filterItemActive,
                    ]}
                    onPress={() => handleFilterChange(filter.id)}
                  >
                    <Ionicons
                      name={filter.icon as any}
                      size={16}
                      color={selectedFilter === filter.id ? BrandColors.primary : BrandColors.textLight}
                    />
                    <Text style={[
                      styles.filterText,
                      selectedFilter === filter.id && styles.filterTextActive,
                    ]}>
                      {filter.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Card>
        </Animated.View>

        {/* Period Selection */}
        <Animated.View
          style={[
            styles.periodContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Card variant="elevated" size="md" style={styles.periodCard}>
            <Text style={styles.periodTitle}>Time Period</Text>

            <View style={styles.periodRow}>
              {periods.map((period) => (
                <TouchableOpacity
                  key={period.id}
                  style={[
                    styles.periodItem,
                    selectedPeriod === period.id && styles.periodItemActive,
                  ]}
                  onPress={() => handlePeriodChange(period.id)}
                >
                  <Text style={[
                    styles.periodText,
                    selectedPeriod === period.id && styles.periodTextActive,
                  ]}>
                    {period.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        </Animated.View>

        {/* Transactions List */}
        <Animated.View
          style={[
            styles.transactionsContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          <Card variant="elevated" size="lg" style={styles.transactionsCard}>
            <Text style={styles.transactionsTitle}>Transaction History</Text>

            {filteredTransactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                style={styles.transactionItem}
                onPress={() => handleTransactionSelect(transaction)}
              >
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.transactionIcon,
                    { backgroundColor: `${getTransactionColor(transaction.type)}20` },
                  ]}>
                    <Ionicons
                      name={getTransactionIcon(transaction.type, transaction.category)}
                      size={20}
                      color={getTransactionColor(transaction.type)}
                    />
                  </View>

                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionDescription}>{transaction.description}</Text>
                    <Text style={styles.transactionDateTime}>
                      {transaction.date} • {transaction.time}
                    </Text>
                    {transaction.bookingId && (
                      <Text style={styles.transactionBooking}>Booking #{transaction.bookingId}</Text>
                    )}
                  </View>
                </View>

                <View style={styles.transactionRight}>
                  <Text style={[
                    styles.transactionAmount,
                    { color: getTransactionColor(transaction.type) },
                  ]}>
                    {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                  </Text>
                  <View style={styles.transactionStatus}>
                    <View style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(transaction.status) },
                    ]} />
                    <Text style={[
                      styles.statusText,
                      { color: getStatusColor(transaction.status) },
                    ]}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Summary
  summaryContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
  },
  summaryContent: {
    alignItems: 'center',
  },
  summaryValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  summaryLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },

  // Filters
  filtersContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  filtersCard: {
    width: '100%',
  },
  filtersTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  filtersRow: {
    flexDirection: 'row',
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.gray50,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  filterItemActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  filterText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textLight,
    marginLeft: Spacing.xs,
  },
  filterTextActive: {
    color: BrandColors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Period
  periodContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  periodCard: {
    width: '100%',
  },
  periodTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  periodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  periodItem: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  periodItemActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  periodText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textLight,
    textAlign: 'center',
  },
  periodTextActive: {
    color: BrandColors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Transactions
  transactionsContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  transactionsCard: {
    width: '100%',
  },
  transactionsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.borderLight,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  transactionDateTime: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  transactionBooking: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.textLight,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xs,
  },
  transactionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.xs,
  },
  statusText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
