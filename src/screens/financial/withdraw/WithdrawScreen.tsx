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
import { Input } from '../../../components/ui/Input';
import { BorderRadius, BrandColors, Spacing, Typography } from '../../../constants/brandTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function WithdrawScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    amount: '',
    bankAccount: '',
    accountHolderName: '',
    ifscCode: '',
    purpose: 'business',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const steps = [
    { title: 'Amount', icon: 'cash' },
    { title: 'Account', icon: 'card' },
    { title: 'Confirm', icon: 'checkmark' },
  ];

  const bankAccounts = [
    {
      id: '1',
      bankName: 'HDFC Bank',
      accountNumber: '****1234',
      accountHolderName: 'Rajesh Kumar',
      ifscCode: 'HDFC0001234',
      isDefault: true,
    },
    {
      id: '2',
      bankName: 'ICICI Bank',
      accountNumber: '****5678',
      accountHolderName: 'Rajesh Kumar',
      ifscCode: 'ICIC0005678',
      isDefault: false,
    },
  ];

  const quickAmounts = [5000, 10000, 25000, 50000];

  const withdrawalData = {
    availableBalance: 100000,
    pendingAmount: 25000,
    lastWithdrawal: '2024-02-15',
    nextWithdrawal: '2024-03-15',
    minWithdrawal: 1000,
    maxWithdrawal: 50000,
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuickAmount = (amount: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFormData(prev => ({ ...prev, amount: amount.toString() }));
  };

  const handleBankAccountSelect = (account: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFormData(prev => ({
      ...prev,
      bankAccount: account.id,
      accountHolderName: account.accountHolderName,
      ifscCode: account.ifscCode,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Withdrawal Request Submitted',
        'Your withdrawal request has been submitted successfully. You will receive the amount within 2-3 business days.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('WalletScreen'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to process withdrawal request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContent}>
            {/* Balance Info */}
            <Card variant="elevated" size="md" style={styles.balanceCard}>
              <View style={styles.balanceHeader}>
                <Text style={styles.balanceTitle}>Available Balance</Text>
                <Ionicons name="wallet" size={24} color={BrandColors.accent} />
              </View>
              <Text style={styles.balanceAmount}>₹{withdrawalData.availableBalance.toLocaleString()}</Text>
              <Text style={styles.balanceNote}>
                Pending amount: ₹{withdrawalData.pendingAmount.toLocaleString()}
              </Text>
            </Card>

            {/* Amount Input */}
            <Input
              label="Withdrawal Amount"
              value={formData.amount}
              onChangeText={(value) => handleInputChange('amount', value)}
              placeholder="Enter amount"
              leftIcon="cash"
              keyboardType="numeric"
              containerStyle={styles.input}
            />

            {/* Quick Amount Buttons */}
            <Text style={styles.quickAmountTitle}>Quick Amount</Text>
            <View style={styles.quickAmountGrid}>
              {quickAmounts.map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={[
                    styles.quickAmountButton,
                    formData.amount === amount.toString() && styles.quickAmountButtonSelected,
                  ]}
                  onPress={() => handleQuickAmount(amount)}
                >
                  <Text style={[
                    styles.quickAmountText,
                    formData.amount === amount.toString() && styles.quickAmountTextSelected,
                  ]}>
                    ₹{amount.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Withdrawal Limits */}
            <Card variant="outlined" size="md" style={styles.limitsCard}>
              <Text style={styles.limitsTitle}>Withdrawal Limits</Text>
              <View style={styles.limitsRow}>
                <Text style={styles.limitsLabel}>Minimum:</Text>
                <Text style={styles.limitsValue}>₹{withdrawalData.minWithdrawal}</Text>
              </View>
              <View style={styles.limitsRow}>
                <Text style={styles.limitsLabel}>Maximum:</Text>
                <Text style={styles.limitsValue}>₹{withdrawalData.maxWithdrawal}</Text>
              </View>
            </Card>
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.bankTitle}>Select Bank Account</Text>

            {bankAccounts.map((account) => (
              <TouchableOpacity
                key={account.id}
                style={[
                  styles.bankAccountItem,
                  formData.bankAccount === account.id && styles.bankAccountItemSelected,
                ]}
                onPress={() => handleBankAccountSelect(account)}
              >
                <View style={styles.bankAccountLeft}>
                  <View style={[
                    styles.bankIcon,
                    { backgroundColor: `${BrandColors.primary}20` },
                  ]}>
                    <Ionicons name="card" size={20} color={BrandColors.primary} />
                  </View>

                  <View style={styles.bankAccountInfo}>
                    <Text style={styles.bankName}>{account.bankName}</Text>
                    <Text style={styles.bankAccountNumber}>{account.accountNumber}</Text>
                    <Text style={styles.bankAccountHolder}>{account.accountHolderName}</Text>
                    {account.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultBadgeText}>Default</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.bankAccountRight}>
                  {formData.bankAccount === account.id && (
                    <Ionicons name="checkmark-circle" size={24} color={BrandColors.accent} />
                  )}
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.addAccountButton}>
              <LinearGradient
                colors={[BrandColors.dot, BrandColors.accent]}
                style={styles.addAccountGradient}
              >
                <Ionicons name="add" size={20} color={BrandColors.secondary} />
                <Text style={styles.addAccountText}>Add New Account</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Card variant="elevated" size="md" style={styles.confirmationCard}>
              <Text style={styles.confirmationTitle}>Withdrawal Summary</Text>

              <View style={styles.confirmationRow}>
                <Text style={styles.confirmationLabel}>Amount:</Text>
                <Text style={styles.confirmationValue}>₹{formData.amount}</Text>
              </View>

              <View style={styles.confirmationRow}>
                <Text style={styles.confirmationLabel}>Bank Account:</Text>
                <Text style={styles.confirmationValue}>
                  {bankAccounts.find(acc => acc.id === formData.bankAccount)?.bankName}
                </Text>
              </View>

              <View style={styles.confirmationRow}>
                <Text style={styles.confirmationLabel}>Account Number:</Text>
                <Text style={styles.confirmationValue}>
                  {bankAccounts.find(acc => acc.id === formData.bankAccount)?.accountNumber}
                </Text>
              </View>

              <View style={styles.confirmationRow}>
                <Text style={styles.confirmationLabel}>Processing Fee:</Text>
                <Text style={styles.confirmationValue}>₹0</Text>
              </View>

              <View style={styles.confirmationDivider} />

              <View style={styles.confirmationRow}>
                <Text style={styles.confirmationLabel}>Total Amount:</Text>
                <Text style={[styles.confirmationValue, { color: BrandColors.accent }]}>
                  ₹{formData.amount}
                </Text>
              </View>
            </Card>

            <Card variant="outlined" size="md" style={styles.infoCard}>
              <View style={styles.infoContent}>
                <Ionicons name="information-circle" size={24} color={BrandColors.dot} />
                <View style={styles.infoText}>
                  <Text style={styles.infoTitle}>Processing Time</Text>
                  <Text style={styles.infoSubtitle}>
                    Withdrawals are processed within 2-3 business days. You will receive a confirmation email once the amount is credited to your account.
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        const amount = parseInt(formData.amount);
        return amount >= withdrawalData.minWithdrawal && amount <= withdrawalData.maxWithdrawal;
      case 1:
        return formData.bankAccount;
      case 2:
        return true;
      default:
        return false;
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
            <Text style={styles.title}>Withdraw Funds</Text>
            <Text style={styles.subtitle}>
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </Text>
          </View>
        </Animated.View>

        {/* Progress Steps */}
        <Animated.View
          style={[
            styles.progressContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={[
                  styles.stepIcon,
                  index <= currentStep && styles.stepIconActive,
                  index < currentStep && styles.stepIconCompleted,
                ]}>
                  <Ionicons
                    name={index < currentStep ? 'checkmark' : step.icon as any}
                    size={20}
                    color={index <= currentStep ? BrandColors.secondary : BrandColors.textLight}
                  />
                </View>
                <Text style={[
                  styles.stepTitle,
                  index <= currentStep && styles.stepTitleActive,
                ]}>
                  {step.title}
                </Text>
                {index < steps.length - 1 && (
                  <View style={[
                    styles.stepLine,
                    index < currentStep && styles.stepLineCompleted,
                  ]} />
                )}
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Step Content */}
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
          <Card variant="elevated" size="lg" style={styles.formCard}>
            {renderStepContent()}
          </Card>
        </Animated.View>

        {/* Navigation Buttons */}
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
            {currentStep > 0 && (
              <Button
                title="Previous"
                onPress={handlePrevious}
                variant="outline"
                size="lg"
                icon="arrow-back"
                iconPosition="left"
                style={styles.previousButton}
              />
            )}

            <Button
              title={currentStep === steps.length - 1 ? 'Submit Request' : 'Next'}
              onPress={handleNext}
              variant="primary"
              size="lg"
              loading={isLoading}
              disabled={!isStepValid()}
              icon={currentStep === steps.length - 1 ? 'checkmark' : 'arrow-forward'}
              iconPosition="right"
              style={styles.nextButton}
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

  // Progress
  progressContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  stepIconActive: {
    backgroundColor: BrandColors.primary,
  },
  stepIconCompleted: {
    backgroundColor: BrandColors.accent,
  },
  stepTitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textLight,
    textAlign: 'center',
  },
  stepTitleActive: {
    color: BrandColors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
  },
  stepLine: {
    position: 'absolute',
    top: 24,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: BrandColors.borderLight,
    zIndex: -1,
  },
  stepLineCompleted: {
    backgroundColor: BrandColors.accent,
  },

  // Content
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  formCard: {
    width: '100%',
  },
  stepContent: {
    width: '100%',
  },

  // Balance Card
  balanceCard: {
    marginBottom: Spacing.lg,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  balanceTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
  },
  balanceAmount: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.accent,
    marginBottom: Spacing.sm,
  },
  balanceNote: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
  },

  // Input
  input: {
    marginBottom: Spacing.lg,
  },

  // Quick Amount
  quickAmountTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  quickAmountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  quickAmountButton: {
    width: '48%',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: BrandColors.gray50,
    alignItems: 'center',
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: BrandColors.borderLight,
  },
  quickAmountButtonSelected: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  quickAmountText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
  },
  quickAmountTextSelected: {
    color: BrandColors.secondary,
  },

  // Limits
  limitsCard: {
    marginTop: Spacing.md,
  },
  limitsTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.md,
  },
  limitsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  limitsLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },
  limitsValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
  },

  // Bank Account
  bankTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  bankAccountItem: {
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
  bankAccountItemSelected: {
    borderColor: BrandColors.primary,
    backgroundColor: `${BrandColors.primary}10`,
  },
  bankAccountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bankIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  bankAccountInfo: {
    flex: 1,
  },
  bankName: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  bankAccountNumber: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  bankAccountHolder: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  defaultBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    backgroundColor: BrandColors.accent,
  },
  defaultBadgeText: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.xs,
    color: BrandColors.secondary,
    fontWeight: Typography.fontWeight.medium,
  },
  bankAccountRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Add Account
  addAccountButton: {
    marginTop: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  addAccountGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  addAccountText: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.secondary,
    marginLeft: Spacing.sm,
  },

  // Confirmation
  confirmationCard: {
    marginBottom: Spacing.lg,
  },
  confirmationTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  confirmationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  confirmationLabel: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.base,
    color: BrandColors.textSecondary,
  },
  confirmationValue: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
  },
  confirmationDivider: {
    height: 1,
    backgroundColor: BrandColors.borderLight,
    marginVertical: Spacing.md,
  },

  // Info Card
  infoCard: {
    marginTop: Spacing.md,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  infoTitle: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.textPrimary,
    marginBottom: Spacing.sm,
  },
  infoSubtitle: {
    fontFamily: Typography.fontFamily.secondary,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.textSecondary,
    lineHeight: 20,
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
  previousButton: {
    flex: 1,
    marginRight: Spacing.md,
  },
  nextButton: {
    flex: 1,
  },

  // Bottom
  bottomSpacing: {
    height: Spacing.xl,
  },
});
