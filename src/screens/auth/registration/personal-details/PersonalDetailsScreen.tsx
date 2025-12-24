import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define color constants
const COLORS = {
  primary: '#00242C',
  white: '#FFFFFF',
  gray: '#E5E5E5',
  lightGray: '#F5F5F5',
  textSecondary: '#666666',
};

const ITEM_HEIGHT = 50;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Custom Centered Date Picker Component
const CustomDatePicker = ({ visible, onClose, onSelect, selectedDate }: any) => {
  const [day, setDay] = useState(selectedDate?.day || 1);
  const [month, setMonth] = useState(selectedDate?.month || 0);
  const [year, setYear] = useState(selectedDate?.year || 2000);

  const dayScrollRef = useRef<ScrollView>(null);
  const monthScrollRef = useRef<ScrollView>(null);
  const yearScrollRef = useRef<ScrollView>(null);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = Array.from({ length: 70 }, (_, i) => 2024 - i);

  const handleConfirm = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onSelect({ day, month, year });
    onClose();
  };

  // Handle day scroll
  const handleDayScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const selectedDay = days[index];
    if (selectedDay !== day) {
      setDay(selectedDay);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  // Handle month scroll
  const handleMonthScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const selectedMonth = index;
    if (selectedMonth !== month) {
      setMonth(selectedMonth);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  // Handle year scroll
  const handleYearScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const selectedYear = years[index];
    if (selectedYear !== year) {
      setYear(selectedYear);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.datePickerContainer}>
          {/* Header */}
          <View style={styles.datePickerHeader}>
            <Text style={styles.datePickerTitle}>Select Date of Birth</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Picker Content */}
          <View style={styles.datePickerContent}>
            {/* Center Selection Indicator */}
            <View style={styles.centerIndicator} pointerEvents="none" />

            {/* Day Picker */}
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerLabel}>Day</Text>
              <ScrollView
                ref={dayScrollRef}
                style={styles.pickerScroll}
                contentContainerStyle={[
                  styles.pickerScrollContent,
                  { paddingVertical: ITEM_HEIGHT * 2 }
                ]}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={handleDayScroll}
                onScrollEndDrag={handleDayScroll}
              >
                {days.map((d, index) => {
                  const isSelected = d === day;
                  return (
                    <TouchableOpacity
                      key={d}
                      style={styles.pickerItem}
                      onPress={() => {
                        setDay(d);
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        dayScrollRef.current?.scrollTo({
                          y: index * ITEM_HEIGHT,
                          animated: true,
                        });
                      }}
                    >
                      <Text style={[
                        styles.pickerItemText,
                        isSelected && styles.pickerItemTextSelected
                      ]}>
                        {d}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Month Picker */}
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerLabel}>Month</Text>
              <ScrollView
                ref={monthScrollRef}
                style={styles.pickerScroll}
                contentContainerStyle={[
                  styles.pickerScrollContent,
                  { paddingVertical: ITEM_HEIGHT * 2 }
                ]}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={handleMonthScroll}
                onScrollEndDrag={handleMonthScroll}
              >
                {months.map((m, index) => {
                  const isSelected = index === month;
                  return (
                    <TouchableOpacity
                      key={m}
                      style={styles.pickerItem}
                      onPress={() => {
                        setMonth(index);
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        monthScrollRef.current?.scrollTo({
                          y: index * ITEM_HEIGHT,
                          animated: true,
                        });
                      }}
                    >
                      <Text style={[
                        styles.pickerItemText,
                        isSelected && styles.pickerItemTextSelected
                      ]}>
                        {m}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Year Picker */}
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerLabel}>Year</Text>
              <ScrollView
                ref={yearScrollRef}
                style={styles.pickerScroll}
                contentContainerStyle={[
                  styles.pickerScrollContent,
                  { paddingVertical: ITEM_HEIGHT * 2 }
                ]}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={handleYearScroll}
                onScrollEndDrag={handleYearScroll}
              >
                {years.map((y, index) => {
                  const isSelected = y === year;
                  return (
                    <TouchableOpacity
                      key={y}
                      style={styles.pickerItem}
                      onPress={() => {
                        setYear(y);
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        yearScrollRef.current?.scrollTo({
                          y: index * ITEM_HEIGHT,
                          animated: true,
                        });
                      }}
                    >
                      <Text style={[
                        styles.pickerItemText,
                        isSelected && styles.pickerItemTextSelected
                      ]}>
                        {y}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Gender Dropdown Component
const GenderDropdown = ({ visible, onClose, onSelect, selectedGender }: any) => {
  const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.dropdownContainer}>
          {/* Header */}
          <View style={styles.dropdownHeader}>
            <Text style={styles.dropdownTitle}>Select Gender</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Options */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {genders.map((gender) => (
              <TouchableOpacity
                key={gender}
                style={[
                  styles.dropdownItem,
                  selectedGender === gender && styles.dropdownItemSelected
                ]}
                onPress={() => {
                  onSelect(gender);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  onClose();
                }}
              >
                <Text style={[
                  styles.dropdownItemText,
                  selectedGender === gender && styles.dropdownItemTextSelected
                ]}>
                  {gender}
                </Text>
                {selectedGender === gender && (
                  <Ionicons name="checkmark" size={20} color={COLORS.white} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default function PersonalDetailsScreen({ navigation }: any) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleContinue = async () => {
    if (!fullName.trim()) {
      Alert.alert('Required', 'Please enter your full name');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Required', 'Please enter your email');
      return;
    }

    if (!gender) {
      Alert.alert('Required', 'Please select your gender');
      return;
    }

    if (!dob) {
      Alert.alert('Required', 'Please select your date of birth');
      return;
    }

    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate to next screen
      navigation.navigate('BusinessDetailsScreen', {
        personalDetails: { fullName, email, gender, dob }
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to save details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const formatDate = (dateObj: any) => {
    if (!dateObj) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${dateObj.day} ${months[dateObj.month]} ${dateObj.year}`;
  };

  const isFormValid = fullName.trim() && email.trim() && gender && dob;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Personal Details</Text>
            <Text style={styles.subtitle}>
              Let's get to know you better
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={COLORS.textSecondary}
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                placeholderTextColor={COLORS.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>

            {/* Gender */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowGenderDropdown(true);
                }}
              >
                <Text style={[styles.dropdownButtonText, !gender && styles.placeholderText]}>
                  {gender || 'Select gender'}
                </Text>
                <Ionicons name="chevron-down" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Date of Birth */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowDatePicker(true);
                }}
              >
                <Text style={[styles.dropdownButtonText, !dob && styles.placeholderText]}>
                  {dob ? formatDate(dob) : 'Select date of birth'}
                </Text>
                <Ionicons name="calendar-outline" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                (!isFormValid || isLoading) && styles.continueButtonDisabled
              ]}
              onPress={handleContinue}
              disabled={!isFormValid || isLoading}
            >
              <Text style={styles.continueButtonText}>
                {isLoading ? 'Saving...' : 'Continue'}
              </Text>
              {!isLoading && (
                <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
              )}
            </TouchableOpacity>
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Gender Dropdown Modal */}
      <GenderDropdown
        visible={showGenderDropdown}
        onClose={() => setShowGenderDropdown(false)}
        onSelect={(value: string) => {
          setGender(value);
        }}
        selectedGender={gender}
      />

      {/* Date Picker Modal */}
      <CustomDatePicker
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelect={(date: any) => {
          setDob(date);
        }}
        selectedDate={dob}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },

  // Header Styles
  header: {
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Title Styles
  titleContainer: {
    marginTop: 8,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },

  // Form Styles
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 8,
  },
  input: {
    height: 56,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    paddingHorizontal: 16,
    fontSize: 15,
    color: COLORS.primary,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    paddingHorizontal: 16,
  },
  dropdownButtonText: {
    fontSize: 15,
    color: COLORS.primary,
  },
  placeholderText: {
    color: COLORS.textSecondary,
  },

  // Button Styles
  buttonContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 12,
    gap: 8,
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.gray,
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 40,
  },

  // Modal Overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  // Gender Dropdown Styles
  dropdownContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '60%',
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  dropdownItemSelected: {
    backgroundColor: COLORS.primary,
  },
  dropdownItemText: {
    fontSize: 15,
    color: COLORS.primary,
  },
  dropdownItemTextSelected: {
    color: COLORS.white,
    fontWeight: '600',
  },

  // Date Picker Styles
  datePickerContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 20,
    maxHeight: '70%',
  },
  datePickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  datePickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
  },
  datePickerContent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 20,
    position: 'relative',
    height: 250,
  },

  // Center Indicator (Selection Area)
  centerIndicator: {
    position: 'absolute',
    left: 10,
    right: 10,
    top: '50%',
    marginTop: -25,
    height: ITEM_HEIGHT,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    zIndex: -1,
  },

  // Picker Column Styles
  pickerColumn: {
    flex: 1,
    marginHorizontal: 4,
  },
  pickerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 10,
  },
  pickerScroll: {
    height: 250,
  },
  pickerScrollContent: {
    alignItems: 'center',
  },
  pickerItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  pickerItemText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  pickerItemTextSelected: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  // Confirm Button
  confirmButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 16,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
});
