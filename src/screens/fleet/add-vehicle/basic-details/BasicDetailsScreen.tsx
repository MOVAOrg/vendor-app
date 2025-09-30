import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Basic Details Screen Component
 * First step in adding a new vehicle to the fleet
 * Collects basic vehicle information like make, model, year, etc.
 */
export default function BasicDetailsScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    licensePlate: '',
    vin: '',
    engineNumber: '',
    chassisNumber: '',
    fuelType: '',
    transmission: '',
    bodyType: '',
    seatingCapacity: '',
    engineCapacity: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
  const transmissionTypes = ['Manual', 'Automatic', 'CVT', 'Semi-Automatic'];
  const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Pickup', 'Van'];
  const seatingOptions = ['2', '4', '5', '7', '8', '9'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.make.trim()) {
      newErrors.make = 'Make is required';
    }

    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'Year is required';
    } else if (parseInt(formData.year) < 2000 || parseInt(formData.year) > new Date().getFullYear() + 1) {
      newErrors.year = 'Please enter a valid year';
    }

    if (!formData.color.trim()) {
      newErrors.color = 'Color is required';
    }

    if (!formData.licensePlate.trim()) {
      newErrors.licensePlate = 'License plate is required';
    }

    if (!formData.fuelType.trim()) {
      newErrors.fuelType = 'Fuel type is required';
    }

    if (!formData.transmission.trim()) {
      newErrors.transmission = 'Transmission is required';
    }

    if (!formData.bodyType.trim()) {
      newErrors.bodyType = 'Body type is required';
    }

    if (!formData.seatingCapacity.trim()) {
      newErrors.seatingCapacity = 'Seating capacity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleContinue = () => {
    if (validateForm()) {
      navigation.navigate('FeaturesSpecsScreen', { basicDetails: formData });
    }
  };

  const renderOptionButtons = (options: string[], field: string, label: string) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label} *</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              formData[field as keyof typeof formData] === option && styles.optionButtonSelected,
            ]}
            onPress={() => handleInputChange(field, option)}
          >
            <Text
              style={[
                styles.optionButtonText,
                formData[field as keyof typeof formData] === option && styles.optionButtonTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Basic Details</Text>
            <Text style={styles.subtitle}>Enter the basic information about your vehicle</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Make and Model */}
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>Make *</Text>
                <TextInput
                  style={[styles.input, errors.make && styles.inputError]}
                  value={formData.make}
                  onChangeText={(value) => handleInputChange('make', value)}
                  placeholder="e.g., Toyota"
                  autoCapitalize="words"
                />
                {errors.make && <Text style={styles.errorText}>{errors.make}</Text>}
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.label}>Model *</Text>
                <TextInput
                  style={[styles.input, errors.model && styles.inputError]}
                  value={formData.model}
                  onChangeText={(value) => handleInputChange('model', value)}
                  placeholder="e.g., Camry"
                  autoCapitalize="words"
                />
                {errors.model && <Text style={styles.errorText}>{errors.model}</Text>}
              </View>
            </View>

            {/* Year and Color */}
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>Year *</Text>
                <TextInput
                  style={[styles.input, errors.year && styles.inputError]}
                  value={formData.year}
                  onChangeText={(value) => handleInputChange('year', value)}
                  placeholder="e.g., 2022"
                  keyboardType="numeric"
                  maxLength={4}
                />
                {errors.year && <Text style={styles.errorText}>{errors.year}</Text>}
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.label}>Color *</Text>
                <TextInput
                  style={[styles.input, errors.color && styles.inputError]}
                  value={formData.color}
                  onChangeText={(value) => handleInputChange('color', value)}
                  placeholder="e.g., White"
                  autoCapitalize="words"
                />
                {errors.color && <Text style={styles.errorText}>{errors.color}</Text>}
              </View>
            </View>

            {/* License Plate */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>License Plate *</Text>
              <TextInput
                style={[styles.input, errors.licensePlate && styles.inputError]}
                value={formData.licensePlate}
                onChangeText={(value) => handleInputChange('licensePlate', value.toUpperCase())}
                placeholder="e.g., ABC-123"
                autoCapitalize="characters"
              />
              {errors.licensePlate && <Text style={styles.errorText}>{errors.licensePlate}</Text>}
            </View>

            {/* VIN, Engine, Chassis Numbers */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>VIN Number</Text>
              <TextInput
                style={styles.input}
                value={formData.vin}
                onChangeText={(value) => handleInputChange('vin', value.toUpperCase())}
                placeholder="Vehicle Identification Number"
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Engine Number</Text>
              <TextInput
                style={styles.input}
                value={formData.engineNumber}
                onChangeText={(value) => handleInputChange('engineNumber', value.toUpperCase())}
                placeholder="Engine serial number"
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Chassis Number</Text>
              <TextInput
                style={styles.input}
                value={formData.chassisNumber}
                onChangeText={(value) => handleInputChange('chassisNumber', value.toUpperCase())}
                placeholder="Chassis serial number"
                autoCapitalize="characters"
              />
            </View>

            {/* Fuel Type */}
            {renderOptionButtons(fuelTypes, 'fuelType', 'Fuel Type')}

            {/* Transmission */}
            {renderOptionButtons(transmissionTypes, 'transmission', 'Transmission')}

            {/* Body Type */}
            {renderOptionButtons(bodyTypes, 'bodyType', 'Body Type')}

            {/* Seating Capacity */}
            {renderOptionButtons(seatingOptions, 'seatingCapacity', 'Seating Capacity')}

            {/* Engine Capacity */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Engine Capacity (CC)</Text>
              <TextInput
                style={styles.input}
                value={formData.engineCapacity}
                onChangeText={(value) => handleInputChange('engineCapacity', value)}
                placeholder="e.g., 2000"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
    fontFamily: 'Montserrat-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
  },
  formContainer: {
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfWidth: {
    width: '48%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    fontFamily: 'OpenSans-SemiBold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
    fontFamily: 'OpenSans-Regular',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'OpenSans-Regular',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F8F9FA',
    minWidth: '45%',
    alignItems: 'center',
  },
  optionButtonSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'OpenSans-Regular',
  },
  optionButtonTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
});
