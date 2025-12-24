/**
 * Get Started Screen
 * Onboarding screen with swipeable slides and gesture-based navigation
 * Shows app benefits with beautiful background images
 */

import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONT_FAMILIES } from '../../../config/fonts';

// Get device dimensions for responsive design
const { width, height } = Dimensions.get('window');

/**
 * Onboarding slides data with real background images from Unsplash
 */
const slides = [
  {
    id: 1,
    title: 'Manage Your Fleet\nEffortlessly',
    description: 'Add vehicles, track bookings, and grow your rental business',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80',
  },
  {
    id: 2,
    title: 'Maximize Your\nEarnings',
    description: 'Set your own prices, manage availability, and get instant payments',
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200&q=80',
  },
  {
    id: 3,
    title: 'Everything in\nOne Place',
    description: 'Real-time bookings, customer details, and analytics at your fingertips',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80',
  },
];

/**
 * GetStartedScreen Component
 * Main onboarding screen with gesture-controlled slides
 */
export default function GetStartedScreen({ navigation }: any) {
  // State for tracking current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Animation values for slide transitions
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const slideTranslateX = useRef(new Animated.Value(0)).current;
  const slideColor = useRef(new Animated.Value(0)).current;
  const textAnimation = useRef(new Animated.Value(0)).current;

  // Professional animations for enhanced UI
  const titleScale = useRef(new Animated.Value(1)).current;
  const titleOpacity = useRef(new Animated.Value(1)).current;
  const buttonPulse = useRef(new Animated.Value(1)).current;
  const contentSlide = useRef(new Animated.Value(0)).current;

  /**
   * Auto-slide functionality - automatically changes slides every 4 seconds
   */
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else {
        setCurrentSlide(0); // Loop back to first slide
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  /**
   * Animate slide changes when currentSlide changes
   * Includes smooth title and content animations
   */
  useEffect(() => {
    // Fade out and scale down current slide content
    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(titleScale, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(contentSlide, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Change slide
      Animated.timing(slideAnimation, {
        toValue: currentSlide,
        duration: 600,
        useNativeDriver: true,
      }).start();

      // Fade in and scale up new slide content
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 400,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.spring(titleScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.spring(contentSlide, {
          toValue: 0,
          tension: 50,
          friction: 7,
          delay: 250,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [currentSlide]);

  /**
   * Pulsing animation for the slide button to draw attention
   */
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulse, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(buttonPulse, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  /**
   * Handle slide gesture events for the "Get Started" button
   */
  const onSlideGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: slideTranslateX } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const { translationX } = event.nativeEvent;
        // Limit the slide to the width of the track minus button width
        const maxSlide = width * 0.7;
        const progress = Math.max(0, Math.min(1, translationX / maxSlide));
        slideColor.setValue(progress);
        textAnimation.setValue(progress);
      },
    }
  );

  /**
   * Handle gesture state changes (when user releases the button)
   */
  const onSlideHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      const maxSlide = width * 0.7;

      if (translationX > maxSlide * 0.5) {
        // Swipe completed - navigate to language selection
        Animated.parallel([
          Animated.timing(slideTranslateX, {
            toValue: maxSlide,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(slideColor, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(textAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start(() => {
          navigation.navigate('LanguageSelectionScreen');
        });
      } else {
        // Return to original position if swipe wasn't far enough
        Animated.parallel([
          Animated.spring(slideTranslateX, {
            toValue: 0,
            useNativeDriver: false,
            tension: 50,
            friction: 8,
          }),
          Animated.timing(slideColor, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(textAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start();
      }
    }
  };


  /**
   * Interpolate background color based on slide progress
   */
  const backgroundColor = slideColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#00242C'],
  });

  /**
   * Interpolate text color based on slide progress
   */
  const textColor = textAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#00242C', '#FFFFFF'],
  });

  /**
   * Render individual slide with professional animations
   * Includes parallax effect on background image
   */
  const renderSlide = (slide: any, index: number) => {
    // Calculate translateX for slide transition animation
    const translateX = slideAnimation.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [width, 0, -width],
      extrapolate: 'clamp',
    });

    // Calculate opacity for smooth fade transitions
    const opacity = slideAnimation.interpolate({
      inputRange: [index - 0.5, index, index + 0.5],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });

    // Parallax effect on background image
    const imageTranslateX = slideAnimation.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [width * 0.3, 0, -width * 0.3],
      extrapolate: 'clamp',
    });

    // Scale effect on background image for depth
    const imageScale = slideAnimation.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [1.2, 1, 1.2],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={slide.id}
        style={[
          styles.slide,
          {
            transform: [{ translateX }],
            opacity,
          },
        ]}
      >
        {/* Background Image with parallax effect */}
        <Animated.View
          style={{
            width: '100%',
            height: '100%',
            transform: [
              { translateX: imageTranslateX },
              { scale: imageScale },
            ],
          }}
        >
          <Image
            source={{ uri: slide.image }}
            style={styles.backgroundImage}
            contentFit="cover"
            priority="high"
          />
        </Animated.View>

        {/* Dark Overlay for better text readability */}
        <View style={styles.overlay} />

        {/* Content with smooth animations */}
        <Animated.View
          style={[
            styles.slideContent,
            {
              opacity: titleOpacity,
              transform: [
                { scale: titleScale },
                { translateY: contentSlide },
              ],
            },
          ]}
        >
          <Text style={styles.slideTitle}>{slide.title}</Text>
          <Text style={styles.slideDescription}>{slide.description}</Text>
        </Animated.View>
      </Animated.View>
    );
  };

  /**
   * Render pagination dots to show current slide position
   */
  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor:
                  index === currentSlide ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
                width: index === currentSlide ? 24 : 8,
              },
            ]}
            onPress={() => setCurrentSlide(index)}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Slides Container - renders all slides with animations */}
      <View style={styles.slidesContainer}>
        {slides.map((slide, index) => renderSlide(slide, index))}
      </View>

      {/* Pagination Dots - shows current slide position */}
      {renderPaginationDots()}

      {/* Slide to Get Started Button - gesture-controlled navigation with pulse effect */}
      <View style={styles.bottomSection}>
        <PanGestureHandler
          onGestureEvent={onSlideGestureEvent}
          onHandlerStateChange={onSlideHandlerStateChange}
        >
          <Animated.View style={styles.slideButtonContainer}>
            {/* Background Track - changes color as user slides */}
            <Animated.View style={[styles.slideTrack, { backgroundColor }]} />

            {/* Sliding Button - follows user's finger with pulse animation */}
            {/* Outer view handles translateX (non-native driver for gesture) */}
            <Animated.View
              style={[
                styles.slideButton,
                {
                  transform: [{ translateX: slideTranslateX }],
                },
              ]}
            >
              {/* Inner view handles pulse scale (native driver for performance) */}
              <Animated.View
                style={{
                  transform: [{ scale: buttonPulse }],
                }}
              >
                <View style={styles.slideButtonInner}>
                  <Text style={styles.slideButtonText}>→</Text>
                  </View>
              </Animated.View>
            </Animated.View>

            {/* Text - changes color as user slides */}
            <View style={styles.textContainer} pointerEvents="none">
              <Animated.Text style={[styles.slideInstructionText, { color: textColor }]}>
                Get Started
              </Animated.Text>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </SafeAreaView>
  );
}

/**
 * Styles for GetStartedScreen
 * Organized by component for easy maintenance
 */
const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  // Slides Container
  slidesContainer: {
    flex: 1,
    position: 'relative',
  },

  // Individual Slide
  slide: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  // Slide Content
  slideContent: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
  },
  slideTitle: {
    fontSize: 42,
    fontWeight: '700',
    fontFamily: FONT_FAMILIES.spaceGrotesk.bold, // SpaceGrotesk Bold for modern titles
    color: '#FFFFFF',
    marginBottom: 16,
    lineHeight: 50,
    letterSpacing: -0.5,
  },
  slideDescription: {
    fontSize: 17,
    fontFamily: FONT_FAMILIES.openSans.regular, // Open Sans for descriptions
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 26,
    letterSpacing: 0.3,
  },

  // Pagination Dots
  paginationContainer: {
    position: 'absolute',
    bottom: 140,
    left: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
  },

  // Bottom Section (Slide Button)
  bottomSection: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  slideButtonContainer: {
    position: 'relative',
    height: 70,
    justifyContent: 'center',
  },
  slideTrack: {
    position: 'absolute',
    width: '100%',
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  slideButton: {
    position: 'absolute',
    left: 4,
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideButtonInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  slideButtonText: {
    fontSize: 28,
    fontFamily: FONT_FAMILIES.spaceGrotesk.bold, // SpaceGrotesk Bold for arrow
    color: '#00242C',
    fontWeight: '600',
  },
  textContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideInstructionText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: FONT_FAMILIES.montserrat.bold, // Montserrat Bold for button text
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
