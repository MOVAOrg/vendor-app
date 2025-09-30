import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Transactions Screen - View all financial transactions
 * Displays comprehensive transaction history with filtering options
 */
export default function TransactionsScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [transactions, setTransactions] = useState([
    {
      id: '1',
      type: 'credit',
      amount: 4500,
      description: 'Booking payment - MOV-12345',
      date: '2025-01-18',
      time: '14:30',
      status: 'completed',
      category: 'booking',
    },
    {
      id: '2',
      type: 'debit',
      amount: 200,
      description: 'Commission fee',
      date: '2025-01-18',
      time: '14:30',
      status: 'completed',
      category: 'commission',
    },
    {
      id: '3',
      type: 'credit',
      amount: 3200,
      description: 'Booking payment - MOV-12344',
      date: '2025-01-17',
      time: '09:15',
      status: 'completed',
      category: 'booking',
    },
    {
      id: '4',
      type: 'debit',
      amount: 15000,
      description: 'Withdrawal to bank account',
      date: '2025-01-16',
      time: '16:45',
      status: 'completed',
      category: 'withdrawal',
    },
    {
      id: '5',
      type: 'credit',
      amount: 2800,
      description: 'Booking payment - MOV-12343',
      date: '2025-01-15',
      time: '11:20',
      status: 'completed',
      category: 'booking',
    },
    {
      id: '6',
      type: 'debit',
      amount: 150,
      description: 'Maintenance fee',
      date: '2025-01-14',
      time: '08:30',
      status: 'completed',
      category: 'maintenance',
    },
    {
      id: '7',
      type: 'credit',
      amount: 5000,
      description: 'Booking payment - MOV-12342',
      date: '2025-01-13',
      time: '19:45',
      status: 'completed',
      category: 'booking',
    },
    {
      id: '8',
      type: 'debit',
      amount: 25000,
      description: 'Withdrawal to bank account',
      date: '2025-01-12',
      time: '10:15',
      status: 'pending',
      category: 'withdrawal',
    },
  ]);

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'credit', label: 'Credits' },
    { key: 'debit', label: 'Debits' },
    { key: 'booking', label: 'Bookings' },
    { key: 'withdrawal', label: 'Withdrawals' },
    { key: 'commission', label: 'Commission' },
  ];

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      // TODO: Implement actual API call to fetch transactions
      console.log('Loading transactions...');
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const getFilteredTransactions = () => {
    if (selectedFilter === 'all') {
      return transactions;
    }
    return transactions.filter(transaction =>
      transaction.type === selectedFilter || transaction.category === selectedFilter
    );
  };

  const getTransactionIcon = (transaction: any) => {
    switch (transaction.category) {
      case 'booking':
        return 'car-outline';
      case 'withdrawal':
        return 'arrow-up-circle-outline';
      case 'commission':
        return 'percent-outline';
      case 'maintenance':
        return 'construct-outline';
      default:
        return transaction.type === 'credit' ? 'arrow-down-circle-outline' : 'arrow-up-circle-outline';
    }
  };

  const getTransactionColor = (transaction: any) => {
    if (transaction.status === 'pending') return '#FF9500';
    return transaction.type === 'credit' ? '#34C759' : '#FF3B30';
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const renderTransactionItem = ({ item }: { item: any }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        <Ionicons
          name={getTransactionIcon(item)}
          size={20}
          color={getTransactionColor(item)}
        />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>
          {item.date} • {item.time}
        </Text>
        {item.status === 'pending' && (
          <Text style={styles.pendingStatus}>Pending</Text>
        )}
      </View>
      <View style={styles.transactionAmount}>
        <Text style={[
          styles.amountText,
          { color: getTransactionColor(item) }
        ]}>
          {item.type === 'credit' ? '+' : '-'}{formatCurrency(item.amount)}
        </Text>
      </View>
    </View>
  );

  const renderFilterTab = (filter: any) => (
    <TouchableOpacity
      key={filter.key}
      style={[
        styles.filterTab,
        selectedFilter === filter.key && styles.activeFilterTab,
      ]}
      onPress={() => handleFilterChange(filter.key)}
    >
      <Text style={[
        styles.filterTabText,
        selectedFilter === filter.key && styles.activeFilterTabText,
      ]}>
        {filter.label}
      </Text>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="receipt-outline" size={64} color="#C7C7CC" />
      <Text style={styles.emptyTitle}>No transactions found</Text>
      <Text style={styles.emptyMessage}>
        Your transaction history will appear here
      </Text>
    </View>
  );

  const filteredTransactions = getFilteredTransactions();

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Ionicons name="download-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <FlatList
          data={filters}
          renderItem={({ item }) => renderFilterTab(item)}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        />
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Credits</Text>
          <Text style={[styles.summaryValue, { color: '#34C759' }]}>
            ₹{transactions
              .filter(t => t.type === 'credit')
              .reduce((sum, t) => sum + t.amount, 0)
              .toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Debits</Text>
          <Text style={[styles.summaryValue, { color: '#FF3B30' }]}>
            ₹{transactions
              .filter(t => t.type === 'debit')
              .reduce((sum, t) => sum + t.amount, 0)
              .toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Transactions List */}
      <FlatList
        data={filteredTransactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  exportButton: {
    padding: 8,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterList: {
    paddingRight: 20,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    marginRight: 8,
  },
  activeFilterTab: {
    backgroundColor: '#007AFF',
  },
  filterTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 16,
  },
  transactionsList: {
    flex: 1,
  },
  transactionsListContent: {
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    marginBottom: 2,
  },
  pendingStatus: {
    fontSize: 10,
    color: '#FF9500',
    backgroundColor: '#FFF5E6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
