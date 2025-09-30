import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// Import screens
import ExploreScreen from '../screens/(tabs)/explore';
import HomeScreen from '../screens/(tabs)/index';
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Import types
import { RootTabParamList } from '../types';

/**
 * Main App Navigator
 * Handles the primary navigation structure for the MovaVendorApp
 * Uses bottom tab navigation for main sections
 */
const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator();

// Main Tab Navigator Component
export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            // Set appropriate icons for each tab
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Explore') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Bookings') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else {
              iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF', // Primary blue color
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Montserrat-Bold',
          },
        })}
      >
        {/* Home Tab - Dashboard for vendors */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Dashboard',
            headerTitle: 'Mova Vendor Dashboard',
          }}
        />

        {/* Explore Tab - Browse cars and manage inventory */}
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            title: 'Cars',
            headerTitle: 'Manage Cars',
          }}
        />

        {/* Bookings Tab - View and manage bookings */}
        <Tab.Screen
          name="Bookings"
          component={BookingsScreen}
          options={{
            title: 'Bookings',
            headerTitle: 'Booking Management',
          }}
        />

        {/* Profile Tab - Vendor profile and settings */}
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            headerTitle: 'Vendor Profile',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/**
 * Stack Navigator for modal screens and detailed views
 * Can be extended for booking details, car details, etc.
 */
export function ModalStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={AppNavigator}
        options={{ headerShown: false }}
      />
      {/* Add modal screens here as needed */}
    </Stack.Navigator>
  );
}
