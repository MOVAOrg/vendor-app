import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
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

import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function WalletScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const tabs = [
    { id: 'overview', title: 'Overview', icon: 'wallet' },
    { id: 'transactions', title: 'Transactions', icon: 'list' },
    { id: 'withdraw', title: 'Withdraw', icon: 'arrow-up' },
    { id: 'history', title: 'History', icon: 'time' },
  ];

  // Mock wallet data
  const walletData = {
    balance: 125000,
    availableBalance: 100000,
    pendingAmount: 25000,
    totalEarnings: 500000,
    thisMonthEarnings: 45000,
    lastWithdrawal: '2024-02-15',
    nextWithdrawal: '2024-03-15',
  };

  const transactions = [
    {
      id: 'TXN001',
      type: 'credit',
      amount: 5000,
      description: 'Booking payment from Rajesh Kumar',
      date: '2024-03-10',
      status: 'completed',
      bookingId: 'BK001',
    },
    {
      id: 'TXN002',
      type: 'debit',
      amount: 2000,
      description: 'Withdrawal to bank account',
      date: '2024-03-08',
      status: 'completed',
      bookingId: null,
    },
    {
      id: 'TXN003',
      type: 'credit',
      amount: 4400,
      description: 'Booking payment from Priya Sharma',
      date: '2024-03-05',
      status: 'pending',
      bookingId: 'BK002',
    },
    {
      id: 'TXN004',
      type: 'credit',
      amount: 3600,
      description: 'Booking payment from Amit Patel',
      date: '2024-03-03',
      status: 'completed',
      bookingId: 'BK003',
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

  const handleWithdraw = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('WithdrawScreen');
  };

  const handleAddMoney = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Add Money', 'Add money functionality coming soon!');
  };

  const handleTransactionSelect = (transaction: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Transaction Details', `Transaction ID: ${transaction.id}`);
  };

  const getTransactionIcon = (type: string) => {
    return type === 'credit' ? 'arrow-down-circle' : 'arrow-up-circle';
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

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Balance Card */}
      <Card variant="gradient" size="lg" style={styles.balanceCard}>
        <LinearGradient
          colors={[BrandColors.primary, BrandColors.primaryDark]}
          style={styles.balanceGradient}
        >
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceTitle}>Total Balance</Text>
            <TouchableOpacity onPress={handleAddMoney} style={styles.addMoneyButton}>
              <Ionicons name="add" size={20} color={BrandColors.secondary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.balanceAmount}>₹{walletData.balance.toLocaleString()}</Text>

          <View style={styles.balanceDetails}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceItemLabel}>Available</Text>
              <Text style={styles.balanceItemValue}>₹{walletData.availableBalance.toLocaleString()}</Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceItemLabel}>Pending</Text>
              <Text style={styles.balanceItemValue}>₹{walletData.pendingAmount.toLocaleString()}</Text>
            </View>
          </View>
        </LinearGradient>
      </Card>

      {/* Quick Actions */}
      <Card variant="elevated" size="md" style={styles.actionsCard}>
        <Text style={styles.actionsTitle}>Quick Actions</Text>

        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionItem} onPress={handleWithdraw}>
            <LinearGradient
              colors={[BrandColors.accent, BrandColors.accentLight]}
              style={styles.actionGradient}
            >
              <Ionicons name="arrow-up" size={24} color={BrandColors.secondary} />
              <Text style={styles.actionText}>Withdraw</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleAddMoney}>
            <LinearGradient
              colors={[BrandColors.dot, BrandColors.accent]}
              style={styles.actionGradient}
            >
              <Ionicons name="add" size={24} color={BrandColors.secondary} />
              <Text style={styles.actionText}>Add Money</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <LinearGradient
              colors={[BrandColors.warning, BrandColors.accent]}
              style={styles.actionGradient}
            >
              <Ionicons name="card" size={24} color={BrandColors.secondary} />
              <Text style={styles.actionText}>Bank Details</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <LinearGradient
              colors={[BrandColors.primary, BrandColors.primaryDark]}
              style={styles.actionGradient}
            >
              <Ionicons name="receipt" size={24} color={BrandColors.secondary} />
              <Text style={styles.actionText}>Statements</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Earnings Summary */}
      <Card variant="elevated" size="md" style={styles.earningsCard}>
        <Text style={styles.earningsTitle}>Earnings Summary</Text>

        <View style={styles.earningsRow}>
          <View style={styles.earningsItem}>
            <Text style={styles.earningsValue}>₹{walletData.totalEarnings.toLocaleString()}</Text>
            <Text style={styles.earningsLabel}>Total Earnings</Text>
          </View>

          <View style={styles.earningsItem}>
            <Text style={styles.earningsValue}>₹{walletData.thisMonthEarnings.toLocaleString()}</Text>
            <Text style={styles.earningsLabel}>This Month</Text>
          </View>
        </View>
      </Card>

      {/* Withdrawal Info */}
      <Card variant="outlined" size="md" style={styles.withdrawalCard}>
        <View style={styles.withdrawalContent}>
          <Ionicons name="information-circle" size={24} color={BrandColors.dot} />
          <View style={styles.withdrawalInfo}>
            <Text style={styles.withdrawalTitle}>Withdrawal Schedule</Text>
            <Text style={styles.withdrawalText}>
              Last withdrawal: {walletData.lastWithdrawal}{'\n'}
              Next withdrawal: {walletData.nextWithdrawal}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderTransactions = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="lg" style={styles.transactionsCard}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>

        {transactions.map((transaction) => (
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
                  name={getTransactionIcon(transaction.type)}
                  size={20}
                  color={getTransactionColor(transaction.type)}
                />
              </View>

              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDescription}>{transaction.description}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
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
    </View>
  );

  const renderWithdraw = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="lg" style={styles.withdrawCard}>
        <Text style={styles.withdrawTitle}>Withdraw Funds</Text>

        <View style={styles.withdrawForm}>
          <Text style={styles.withdrawLabel}>Available Balance</Text>
          <Text style={styles.withdrawBalance}>₹{walletData.availableBalance.toLocaleString()}</Text>

          <Text style={styles.withdrawLabel}>Withdrawal Amount</Text>
          <View style={styles.withdrawInput}>
            <Text style={styles.withdrawInputText}>₹</Text>
            <Text style={styles.withdrawInputPlaceholder}>Enter amount</Text>
          </View>

          <Button
            title="Withdraw Now"
            onPress={handleWithdraw}
            variant="primary"
            size="lg"
            icon="arrow-up"
            iconPosition="right"
            style={styles.withdrawButton}
          />
        </View>
      </Card>
    </View>
  );

  const renderHistory = () => (
    <View style={styles.tabContent}>
      <Card variant="elevated" size="lg" style={styles.historyCard}>
        <Text style={styles.historyTitle}>Withdrawal History</Text>

        <View style={styles.historyItem}>
          <View style={styles.historyLeft}>
            <View style={styles.historyIcon}>
              <Ionicons name="arrow-up-circle" size={20} color={BrandColors.accent} />
            </View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyDescription}>Withdrawal to Bank Account</Text>
              <Text style={styles.historyDate}>2024-02-15</Text>
            </View>
          </View>
          <View style={styles.historyRight}>
            <Text style={styles.historyAmount}>-₹2,000</Text>
            <Text style={styles.historyStatus}>Completed</Text>
          </View>
        </View>

        <View style={styles.historyDivider} />

        <View style={styles.historyItem}>
          <View style={styles.historyLeft}>
            <View style={styles.historyIcon}>
              <Ionicons name="arrow-up-circle" size={20} color={BrandColors.accent} />
            </View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyDescription}>Withdrawal to Bank Account</Text>
              <Text style={styles.historyDate}>2024-01-15</Text>
            </View>
          </View>
          <View style={styles.historyRight}>
            <Text style={styles.historyAmount}>-₹5,000</Text>
            <Text style={styles.historyStatus}>Completed</Text>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'transactions': return renderTransactions();
      case 'withdraw': return renderWithdraw();
      case 'history': return renderHistory();
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
            <Text style={styles.title}>Wallet</Text>
            <Text style={styles.subtitle}>
              Manage your earnings and withdrawals
            </Text>
          </View>
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

  // Balance Card
  balanceCard: {
    marginBottom: Spacing.lg,
  },
  balanceGradient: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  balanceTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.secondary,
  },
  addMoneyButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: `${BrandColors.secondary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceAmount: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.secondary,
    marginBottom: Spacing.lg,
  },
  balanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceItem: {
    alignItems: 'center',
  },
  balanceItemLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.secondary,
    opacity: 0.8,
    marginBottom: Spacing.xs,
  },
  balanceItemValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.secondary,
  },

  // Actions
  actionsCard: {
    marginBottom: Spacing.lg,
  },
  actionsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '48%',
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  actionText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.secondary,
    marginLeft: Spacing.sm,
  },

  // Earnings
  earningsCard: {
    marginBottom: Spacing.lg,
  },
  earningsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  earningsItem: {
    alignItems: 'center',
  },
  earningsValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  earningsLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },

  // Withdrawal Info
  withdrawalCard: {
    marginBottom: Spacing.lg,
  },
  withdrawalContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  withdrawalInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  withdrawalTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.sm,
  },
  withdrawalText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    lineHeight: 20,
  },

  // Transactions
  transactionsCard: {
    marginBottom: Spacing.lg,
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
  transactionDate: {
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

  // Withdraw
  withdrawCard: {
    marginBottom: Spacing.lg,
  },
  withdrawTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  withdrawForm: {
    width: '100%',
  },
  withdrawLabel: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.sm,
  },
  withdrawBalance: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.accent,
    marginBottom: Spacing.lg,
  },
  withdrawInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.gray50,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
    marginBottom: Spacing.lg,
  },
  withdrawInputText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginRight: Spacing.sm,
  },
  withdrawInputPlaceholder: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textLight,
  },
  withdrawButton: {
    width: '100%',
  },

  // History
  historyCard: {
    marginBottom: Spacing.lg,
  },
  historyTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
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
    backgroundColor: `${BrandColors.accent}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  historyInfo: {
    flex: 1,
  },
  historyDescription: {
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
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyAmount: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.error,
    marginBottom: Spacing.xs,
  },
  historyStatus: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.accent,
    fontWeight: Typography.fontWeight.medium,
  },
  historyDivider: {
    height: 1,
    backgroundColor: BrandColors.borderLight,
    marginVertical: Spacing.sm,
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
