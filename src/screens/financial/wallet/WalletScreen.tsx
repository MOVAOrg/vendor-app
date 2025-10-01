import { ThemedView } from '../../components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Wallet Screen - Financial overview and wallet management
 * Displays vendor earnings, transactions, and withdrawal options
 */
export default function WalletScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [walletData, setWalletData] = useState({
    totalBalance: 125000,
    availableBalance: 85000,
    pendingAmount: 40000,
    totalEarnings: 350000,
    monthlyEarnings: 45000,
    totalTransactions: 156,
  });

  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: '1',
      type: 'credit',
      amount: 4500,
      description: 'Booking payment - MOV-12345',
      date: '2025-01-18',
      time: '14:30',
      status: 'completed',
    },
    {
      id: '2',
      type: 'debit',
      amount: 200,
      description: 'Commission fee',
      date: '2025-01-18',
      time: '14:30',
      status: 'completed',
    },
    {
      id: '3',
      type: 'credit',
      amount: 3200,
      description: 'Booking payment - MOV-12344',
      date: '2025-01-17',
      time: '09:15',
      status: 'completed',
    },
    {
      id: '4',
      type: 'debit',
      amount: 15000,
      description: 'Withdrawal to bank account',
      date: '2025-01-16',
      time: '16:45',
      status: 'completed',
    },
    {
      id: '5',
      type: 'credit',
      amount: 2800,
      description: 'Booking payment - MOV-12343',
      date: '2025-01-15',
      time: '11:20',
      status: 'completed',
    },
  ]);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      // TODO: Implement actual API call to fetch wallet data
      // const data = await financialService.getWalletData();
      // setWalletData(data);
      console.log('Loading wallet data...');
    } catch (error) {
      console.error('Error loading wallet data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWalletData();
    setRefreshing(false);
  };

  const handleWithdraw = () => {
    navigation.navigate('WithdrawScreen');
  };

  const handleViewAllTransactions = () => {
    navigation.navigate('TransactionsScreen');
  };

  const getTransactionIcon = (type: string) => {
    return type === 'credit' ? 'arrow-down-circle' : 'arrow-up-circle';
  };

  const getTransactionColor = (type: string) => {
    return type === 'credit' ? '#34C759' : '#FF3B30';
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wallet</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Balance Overview */}
        <View style={styles.balanceSection}>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(walletData.totalBalance)}</Text>
            <Text style={styles.balanceSubtext}>Available: {formatCurrency(walletData.availableBalance)}</Text>
          </View>

          <View style={styles.balanceStats}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="time-outline" size={24} color="#FF9500" />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>Pending</Text>
                <Text style={styles.statValue}>{formatCurrency(walletData.pendingAmount)}</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="trending-up-outline" size={24} color="#34C759" />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>This Month</Text>
                <Text style={styles.statValue}>{formatCurrency(walletData.monthlyEarnings)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleWithdraw}>
              <View style={styles.actionIcon}>
                <Ionicons name="arrow-up-circle-outline" size={24} color="#007AFF" />
              </View>
              <Text style={styles.actionText}>Withdraw</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleViewAllTransactions}>
              <View style={styles.actionIcon}>
                <Ionicons name="list-outline" size={24} color="#007AFF" />
              </View>
              <Text style={styles.actionText}>Transactions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="card-outline" size={24} color="#007AFF" />
              </View>
              <Text style={styles.actionText}>Bank Details</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="analytics-outline" size={24} color="#007AFF" />
              </View>
              <Text style={styles.actionText}>Reports</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Earnings Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Earnings Summary</Text>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Earnings</Text>
              <Text style={styles.summaryValue}>{formatCurrency(walletData.totalEarnings)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Transactions</Text>
              <Text style={styles.summaryValue}>{walletData.totalTransactions}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Average per Booking</Text>
              <Text style={styles.summaryValue}>{formatCurrency(Math.round(walletData.totalEarnings / walletData.totalTransactions))}</Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsSection}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={handleViewAllTransactions}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsList}>
            {recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Ionicons
                    name={getTransactionIcon(transaction.type)}
                    size={20}
                    color={getTransactionColor(transaction.type)}
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <Text style={styles.transactionDate}>
                    {transaction.date} • {transaction.time}
                  </Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[
                    styles.amountText,
                    { color: getTransactionColor(transaction.type) }
                  ]}>
                    {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </Text>
                  <Text style={styles.statusText}>{transaction.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Withdrawal Info */}
        <View style={styles.withdrawalInfo}>
          <View style={styles.infoCard}>
            <Ionicons name="information-circle-outline" size={20} color="#007AFF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Withdrawal Information</Text>
              <Text style={styles.infoText}>
                Withdrawals are processed within 1-2 business days. Minimum withdrawal amount is ₹500.
              </Text>
            </View>
          </View>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationButton: {
    padding: 8,
  },
  balanceSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  balanceCard: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  balanceSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  balanceStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
  },
  summarySection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  transactionsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  transactionsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  withdrawalInfo: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#007AFF',
    lineHeight: 16,
  },
  bottomSpacer: {
    height: 40,
  },
});
