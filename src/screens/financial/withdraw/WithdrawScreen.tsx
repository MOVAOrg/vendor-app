import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Withdraw Screen - Request money withdrawal to bank account
 * Allows vendors to withdraw their earnings to their registered bank account
 */
export default function WithdrawScreen({ navigation }: any) {
  const [availableBalance, setAvailableBalance] = useState(45680);
  const [pendingBalance, setPendingBalance] = useState(12450);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: '1',
      bankName: 'HDFC Bank',
      accountNumber: '****1234',
      accountHolderName: 'John Doe',
      ifscCode: 'HDFC0001234',
      isDefault: true,
      verified: true,
    },
    {
      id: '2',
      bankName: 'ICICI Bank',
      accountNumber: '****5678',
      accountHolderName: 'John Doe',
      ifscCode: 'ICIC0005678',
      isDefault: false,
      verified: true,
    },
  ]);
  const [withdrawHistory, setWithdrawHistory] = useState([
    {
      id: '1',
      amount: 25000,
      status: 'completed',
      requestedDate: '2025-01-15',
      processedDate: '2025-01-16',
      bankAccount: 'HDFC Bank ****1234',
      transactionId: 'TXN123456789',
    },
    {
      id: '2',
      amount: 15000,
      status: 'pending',
      requestedDate: '2025-01-18',
      processedDate: null,
      bankAccount: 'HDFC Bank ****1234',
      transactionId: null,
    },
    {
      id: '3',
      amount: 20000,
      status: 'completed',
      requestedDate: '2025-01-10',
      processedDate: '2025-01-11',
      bankAccount: 'ICICI Bank ****5678',
      transactionId: 'TXN987654321',
    },
  ]);

  useEffect(() => {
    loadWithdrawData();
  }, []);

  const loadWithdrawData = async () => {
    try {
      // TODO: Implement actual API call to fetch withdraw data
      console.log('Loading withdraw data...');
    } catch (error) {
      console.error('Error loading withdraw data:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#34C759';
      case 'pending':
        return '#FF9500';
      case 'failed':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'checkmark-circle';
      case 'pending':
        return 'time-outline';
      case 'failed':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  const handleAmountInput = (text: string) => {
    // Remove non-numeric characters
    const numericText = text.replace(/[^0-9]/g, '');
    setWithdrawAmount(numericText);
  };

  const handleQuickAmount = (amount: number) => {
    setWithdrawAmount(amount.toString());
  };

  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount);

    if (!amount || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid withdrawal amount.');
      return;
    }

    if (amount < 500) {
      Alert.alert('Minimum Amount', 'Minimum withdrawal amount is ₹500.');
      return;
    }

    if (amount > availableBalance) {
      Alert.alert('Insufficient Balance', 'You cannot withdraw more than your available balance.');
      return;
    }

    if (!selectedAccount) {
      Alert.alert('Select Account', 'Please select a bank account for withdrawal.');
      return;
    }

    Alert.alert(
      'Confirm Withdrawal',
      `Are you sure you want to withdraw ${formatCurrency(amount)} to ${selectedAccount.bankName} ${selectedAccount.accountNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            // TODO: Implement actual withdrawal API call
            console.log('Processing withdrawal:', { amount, account: selectedAccount });

            Alert.alert(
              'Withdrawal Requested',
              'Your withdrawal request has been submitted. It will be processed within 1-2 business days.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setWithdrawAmount('');
                    navigation.goBack();
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const handleAddBankAccount = () => {
    navigation.navigate('AddBankAccountScreen');
  };

  const renderBankAccount = (account: any) => (
    <TouchableOpacity
      key={account.id}
      style={[
        styles.bankAccountCard,
        selectedAccount?.id === account.id && styles.selectedBankAccount,
      ]}
      onPress={() => setSelectedAccount(account)}
    >
      <View style={styles.bankAccountHeader}>
        <View style={styles.bankInfo}>
          <Text style={styles.bankName}>{account.bankName}</Text>
          <Text style={styles.accountNumber}>{account.accountNumber}</Text>
          <Text style={styles.accountHolder}>{account.accountHolderName}</Text>
        </View>
        <View style={styles.bankAccountActions}>
          {account.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
          <View style={styles.radioButton}>
            {selectedAccount?.id === account.id && (
              <View style={styles.radioButtonSelected} />
            )}
          </View>
        </View>
      </View>
      {account.verified && (
        <View style={styles.verifiedBadge}>
          <Ionicons name="checkmark-circle" size={16} color="#34C759" />
          <Text style={styles.verifiedText}>Verified</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderWithdrawHistoryItem = (item: any) => (
    <View key={item.id} style={styles.historyItem}>
      <View style={styles.historyIcon}>
        <Ionicons
          name={getStatusIcon(item.status)}
          size={20}
          color={getStatusColor(item.status)}
        />
      </View>
      <View style={styles.historyDetails}>
        <Text style={styles.historyAmount}>{formatCurrency(item.amount)}</Text>
        <Text style={styles.historyBank}>{item.bankAccount}</Text>
        <Text style={styles.historyDate}>
          Requested: {item.requestedDate}
          {item.processedDate && ` • Processed: ${item.processedDate}`}
        </Text>
        {item.transactionId && (
          <Text style={styles.historyTransaction}>TXN: {item.transactionId}</Text>
        )}
      </View>
      <View style={styles.historyStatus}>
        <Text style={[
          styles.historyStatusText,
          { color: getStatusColor(item.status) }
        ]}>
          {item.status.toUpperCase()}
        </Text>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Withdraw Money</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Balance Cards */}
        <View style={styles.balanceSection}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Ionicons name="wallet-outline" size={24} color="#34C759" />
              <Text style={styles.balanceLabel}>Available Balance</Text>
            </View>
            <Text style={styles.balanceAmount}>{formatCurrency(availableBalance)}</Text>
            <Text style={styles.balanceSubtext}>Ready to withdraw</Text>
          </View>

          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Ionicons name="time-outline" size={24} color="#FF9500" />
              <Text style={styles.balanceLabel}>Pending Balance</Text>
            </View>
            <Text style={styles.balanceAmount}>{formatCurrency(pendingBalance)}</Text>
            <Text style={styles.balanceSubtext}>Processing (1-2 days)</Text>
          </View>
        </View>

        {/* Withdraw Amount */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Withdraw Amount</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              value={withdrawAmount}
              onChangeText={handleAmountInput}
              placeholder="0"
              keyboardType="numeric"
              placeholderTextColor="#C7C7CC"
            />
          </View>

          {/* Quick Amount Buttons */}
          <View style={styles.quickAmounts}>
            <TouchableOpacity
              style={styles.quickAmountButton}
              onPress={() => handleQuickAmount(availableBalance * 0.25)}
            >
              <Text style={styles.quickAmountText}>25%</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAmountButton}
              onPress={() => handleQuickAmount(availableBalance * 0.5)}
            >
              <Text style={styles.quickAmountText}>50%</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAmountButton}
              onPress={() => handleQuickAmount(availableBalance * 0.75)}
            >
              <Text style={styles.quickAmountText}>75%</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAmountButton}
              onPress={() => handleQuickAmount(availableBalance)}
            >
              <Text style={styles.quickAmountText}>All</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bank Accounts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bank Account</Text>
            <TouchableOpacity onPress={handleAddBankAccount}>
              <Text style={styles.addAccountText}>+ Add Account</Text>
            </TouchableOpacity>
          </View>

          {bankAccounts.map(renderBankAccount)}
        </View>

        {/* Withdraw Button */}
        <View style={styles.withdrawSection}>
          <TouchableOpacity
            style={[
              styles.withdrawButton,
              (!withdrawAmount || !selectedAccount) && styles.withdrawButtonDisabled,
            ]}
            onPress={handleWithdraw}
            disabled={!withdrawAmount || !selectedAccount}
          >
            <Text style={styles.withdrawButtonText}>
              Withdraw {withdrawAmount ? formatCurrency(parseInt(withdrawAmount)) : '₹0'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.withdrawNote}>
            Withdrawals are processed within 1-2 business days. Processing time may vary based on bank.
          </Text>
        </View>

        {/* Withdrawal History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Withdrawals</Text>
          {withdrawHistory.map(renderWithdrawHistoryItem)}
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  balanceSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  balanceSubtext: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  addAccountText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  quickAmountText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  bankAccountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedBankAccount: {
    borderColor: '#007AFF',
  },
  bankAccountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  accountNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  accountHolder: {
    fontSize: 14,
    color: '#666',
  },
  bankAccountActions: {
    alignItems: 'flex-end',
  },
  defaultBadge: {
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  defaultText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  verifiedText: {
    fontSize: 12,
    color: '#34C759',
    marginLeft: 4,
    fontWeight: '500',
  },
  withdrawSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  withdrawButton: {
    backgroundColor: '#34C759',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  withdrawButtonDisabled: {
    backgroundColor: '#E5E5EA',
  },
  withdrawButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  withdrawNote: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyDetails: {
    flex: 1,
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  historyBank: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  historyTransaction: {
    fontSize: 12,
    color: '#007AFF',
  },
  historyStatus: {
    alignItems: 'flex-end',
  },
  historyStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 40,
  },
});
