import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient'; // <-- Import LinearGradient
import React, { useEffect, useRef, useState } from 'react';
import {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ITEM_HEIGHT = 50;

interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { id: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { id: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { id: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { id: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { id: 'en', name: 'English', nativeName: 'English', flag: '🇮🇳' },
  { id: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { id: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { id: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { id: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
];

export default function LanguageSelectionScreen({ navigation }: any) {
  const [selectedIndex, setSelectedIndex] = useState(5); // Default to English in middle
  const scrollViewRef = useRef<ScrollView>(null);
  const lastHapticIndex = useRef(5);

  // --- State for responsive height calculation ---
  const [pickerHeight, setPickerHeight] = useState(0);

  // Set initial scroll position once the component has a height
  useEffect(() => {
    if (pickerHeight > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: selectedIndex * ITEM_HEIGHT,
          animated: false,
        });
      }, 100);
    }
  }, [pickerHeight]); // Rerun only when pickerHeight is determined

  // --- Functions for scrolling and selection ---
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);

    if (index !== lastHapticIndex.current && index >= 0 && index < languages.length) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      lastHapticIndex.current = index;
      setSelectedIndex(index);
    }
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);

    if (index >= 0 && index < languages.length) {
      scrollViewRef.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: true });
      setSelectedIndex(index);
    }
  };

  const handleContinue = () => {
    const selectedLanguage = languages[selectedIndex];
    console.log('Selected Language:', selectedLanguage.name);

    // Navigate to phone verification screen
    navigation.navigate('PhoneVerificationScreen');
  };

  // --- Function to get the container height for perfect centering ---
  const handleLayout = (event: LayoutChangeEvent) => {
    setPickerHeight(event.nativeEvent.layout.height);
  };

  // --- Dynamic padding calculation for responsiveness ---
  const PADDING = pickerHeight ? (pickerHeight - ITEM_HEIGHT) / 2 : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#00242C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select a preferred language</Text>
      </View>

      <View style={styles.pickerContainer} onLayout={handleLayout}>
        {pickerHeight > 0 && ( // Render only after height is known
          <>
            {/* Layer 1: The scrollable list of languages */}
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onScroll={handleScroll}
              onMomentumScrollEnd={handleMomentumScrollEnd}
              scrollEventThrottle={16}
              contentContainerStyle={{
                paddingTop: PADDING,
                paddingBottom: PADDING,
              }}
            >
              {languages.map((language, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <View key={language.id} style={styles.itemContainer}>
                    <Text style={[styles.languageText, isSelected && { opacity: 0 }]}>
                      {language.nativeName}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>

            {/* Layer 2: The static overlay with highlight and selected text */}
            <View style={styles.overlay} pointerEvents="none">
              <View style={styles.highlightPill} />
              <Text style={styles.selectedLanguageText}>
                {languages[selectedIndex]?.nativeName}
              </Text>
            </View>

            {/* Layer 3: The top and bottom fades for a professional look */}
            <LinearGradient
              colors={['#FFFFFF', 'rgba(255, 255, 255, 0)']}
              style={[styles.fade, styles.fadeTop]}
              pointerEvents="none"
            />
            <LinearGradient
              colors={['rgba(255, 255, 255, 0)', '#FFFFFF']}
              style={[styles.fade, styles.fadeBottom]}
              pointerEvents="none"
            />
          </>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: { padding: 8 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#00242C',
    marginLeft: -40,
  },
  pickerContainer: { flex: 1, justifyContent: 'center' },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightPill: {
    position: 'absolute',
    width: '90%',
    height: ITEM_HEIGHT,
    backgroundColor: '#00242C',
    borderRadius: 25,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageText: { fontSize: 18, color: '#666666', fontWeight: '500' },
  selectedLanguageText: { fontSize: 20, color: '#FFFFFF', fontWeight: '700' },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '40%', // Adjust fade height
  },
  fadeTop: { top: 0 },
  fadeBottom: { bottom: 0 },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10, // Ensure button is on top of the fade
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00242C',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00D4D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
