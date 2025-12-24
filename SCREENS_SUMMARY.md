# Mova Vendor App - Screens Summary

## Overview
This document provides a comprehensive overview of all 48+ screens in the Mova Vendor Application, organized by category.

## Brand Colors
- **Primary**: `#00242C` (Dark teal)
- **Accent**: `#2DAA72` (Car swirl green)
- **Dot**: `#54AEC9` (Light blue)
- **Background**: `#FFFFFF` (White)

## Typography
- **Primary Font**: Montserrat (Bold/SemiBold)
- **Secondary Font**: Open Sans
- **Accent Font**: Raleway

---

## Authentication Screens (10 screens)

### 1. Splash Screen
- **Path**: `src/screens/auth/splash/SplashScreen.tsx`
- **Purpose**: Initial loading screen with app branding
- **Features**: Animated logo, brand colors

### 2. Get Started Screen
- **Path**: `src/screens/auth/get-started/GetStartedScreen.tsx`
- **Purpose**: Welcome screen with language selection
- **Features**: 10 Indian languages, haptic feedback, smooth animations

### 3. Language Selection Screen
- **Path**: `src/screens/auth/language-selection/LanguageSelectionScreen.tsx`
- **Purpose**: Dedicated language selection interface
- **Features**: Native language names, no back button

### 4. Phone Verification Screen
- **Path**: `src/screens/auth/phone-verification/PhoneVerificationScreen.tsx`
- **Purpose**: Phone number input and verification
- **Features**: Modern UI, gradient background, animated input

### 5. OTP Verification Screen
- **Path**: `src/screens/auth/otp-verification/OTPVerificationScreen.tsx`
- **Purpose**: OTP input and verification
- **Features**: Custom OTP cells, countdown timer, resend functionality

### 6. Personal Details Screen
- **Path**: `src/screens/auth/registration/personal-details/PersonalDetailsScreen.tsx`
- **Purpose**: Collect vendor personal information
- **Features**: Form validation, modern inputs

### 7. Business Details Screen
- **Path**: `src/screens/auth/registration/business-details/BusinessDetailsScreen.tsx`
- **Purpose**: Collect business/company information
- **Features**: Business name, GST, registration details

### 8. Location Details Screen
- **Path**: `src/screens/auth/registration/location-details/LocationDetailsScreen.tsx`
- **Purpose**: Collect business location information
- **Features**: Address input, location picker

### 9. Bank Details Screen
- **Path**: `src/screens/auth/registration/bank-details/BankDetailsScreen.tsx`
- **Purpose**: Collect banking information for payments
- **Features**: Account number, IFSC code, secure inputs

### 10. Document Upload Screen
- **Path**: `src/screens/auth/registration/document-upload/DocumentUploadScreen.tsx`
- **Purpose**: Upload required documents
- **Features**: Document picker, preview, upload progress

### 11. Verification Pending Screen
- **Path**: `src/screens/auth/verification-pending/VerificationPendingScreen.tsx`
- **Purpose**: Show verification status
- **Features**: Status updates, estimated time

---

## Main App Screens (4 screens)

### 12. Dashboard (Home) Screen
- **Path**: `src/screens/(tabs)/index.tsx`
- **Purpose**: Main dashboard with statistics
- **Features**: Animated cards, quick actions, recent activity

### 13. Explore Screen
- **Path**: `src/screens/(tabs)/explore.tsx`
- **Purpose**: Browse and search functionality
- **Features**: Search bar, filters, categories

### 14. Bookings Tab Screen
- **Path**: Integrated in tab navigator
- **Purpose**: Quick access to bookings
- **Features**: Tab navigation

### 15. Profile Tab Screen
- **Path**: Integrated in tab navigator
- **Purpose**: Quick access to profile
- **Features**: Tab navigation

---

## Fleet Management Screens (8 screens)

### 16. My Fleet Screen
- **Path**: `src/screens/fleet/my-fleet/MyFleetScreen.tsx`
- **Purpose**: View all vehicles in fleet
- **Features**: Vehicle cards, status badges, filters

### 17. Add Vehicle - Basic Details
- **Path**: `src/screens/fleet/add-vehicle/basic-details/BasicDetailsScreen.tsx`
- **Purpose**: Add vehicle basic information
- **Features**: Make, model, year, color

### 18. Add Vehicle - Features & Specs
- **Path**: `src/screens/fleet/add-vehicle/features-specs/FeaturesSpecsScreen.tsx`
- **Purpose**: Add vehicle features and specifications
- **Features**: Checkboxes, feature selection

### 19. Add Vehicle - Photos & Documents
- **Path**: `src/screens/fleet/add-vehicle/photos-documents/PhotosDocumentsScreen.tsx`
- **Purpose**: Upload vehicle photos and documents
- **Features**: Image picker, document upload

### 20. Add Vehicle - Pricing & Availability
- **Path**: `src/screens/fleet/add-vehicle/pricing-availability/PricingAvailabilityScreen.tsx`
- **Purpose**: Set pricing and availability
- **Features**: Price inputs, calendar availability

### 21. Vehicle Details Screen
- **Path**: `src/screens/fleet/vehicle-details/VehicleDetailsScreen.tsx`
- **Purpose**: View detailed vehicle information
- **Features**: Full specs, photos, booking history

### 22. Edit Vehicle Screen
- **Path**: `src/screens/fleet/edit-vehicle/EditVehicleScreen.tsx`
- **Purpose**: Edit existing vehicle information
- **Features**: Pre-filled forms, update functionality

### 23. Add Maintenance Screen
- **Path**: `src/screens/fleet/add-maintenance/AddMaintenanceScreen.tsx`
- **Purpose**: Add maintenance records
- **Features**: Maintenance type, cost, date

---

## Bookings Management Screens (7 screens)

### 24. My Bookings Screen
- **Path**: `src/screens/bookings/my-bookings/MyBookingsScreen.tsx`
- **Purpose**: View all bookings
- **Features**: Booking cards, status filters, search

### 25. Booking Details Screen
- **Path**: `src/screens/bookings/booking-details/BookingDetailsScreen.tsx`
- **Purpose**: View detailed booking information
- **Features**: Customer info, vehicle info, timeline

### 26. Add Manual Booking Screen
- **Path**: `src/screens/bookings/add-manual-booking/AddManualBookingScreen.tsx`
- **Purpose**: Create manual booking
- **Features**: Customer selection, date picker, vehicle selection

### 27. Customer Profile Screen
- **Path**: `src/screens/bookings/customer-profile/CustomerProfileScreen.tsx`
- **Purpose**: View customer information
- **Features**: Contact details, booking history, ratings

### 28. Pre-Rental Inspection Screen
- **Path**: `src/screens/bookings/pre-rental-inspection/PreRentalInspectionScreen.tsx`
- **Purpose**: Document vehicle condition before rental
- **Features**: Checklist, photo capture, notes

### 29. Post-Rental Inspection Screen
- **Path**: `src/screens/bookings/post-rental-inspection/PostRentalInspectionScreen.tsx`
- **Purpose**: Document vehicle condition after rental
- **Features**: Checklist, damage reporting, comparison

### 30. Vehicle Tracking Screen
- **Path**: `src/screens/bookings/vehicle-tracking/VehicleTrackingScreen.tsx`
- **Purpose**: Track vehicle location during rental
- **Features**: Map view, location updates, geofencing

---

## Financial Management Screens (4 screens)

### 31. Wallet Screen
- **Path**: `src/screens/financial/wallet/WalletScreen.tsx`
- **Purpose**: View wallet balance and transactions
- **Features**: Balance display, transaction history, quick actions

### 32. Transactions Screen
- **Path**: `src/screens/financial/transactions/TransactionsScreen.tsx`
- **Purpose**: View detailed transaction history
- **Features**: Filters, search, export

### 33. Withdraw Screen
- **Path**: `src/screens/financial/withdraw/WithdrawScreen.tsx`
- **Purpose**: Withdraw funds to bank account
- **Features**: Amount input, bank selection, confirmation

### 34. Coupons Screen
- **Path**: `src/screens/financial/coupons/CouponsScreen.tsx`
- **Purpose**: Manage promotional coupons
- **Features**: Create coupons, view active/expired, analytics

---

## Analytics Screens (3 screens)

### 35. Analytics Dashboard Screen
- **Path**: `src/screens/analytics/dashboard/AnalyticsDashboardScreen.tsx`
- **Purpose**: View business analytics and insights
- **Features**: Charts, graphs, KPIs, trends

### 36. Performance Metrics Screen
- **Path**: `src/screens/analytics/performance/PerformanceMetricsScreen.tsx`
- **Purpose**: View detailed performance metrics
- **Features**: Revenue metrics, utilization rates, comparisons

### 37. Reports Screen
- **Path**: `src/screens/analytics/reports/ReportsScreen.tsx`
- **Purpose**: Generate and view reports
- **Features**: Report types, date ranges, export

---

## Account & Profile Screens (6 screens)

### 38. Profile Screen
- **Path**: `src/screens/account/profile/ProfileScreen.tsx`
- **Purpose**: View vendor profile
- **Features**: Profile info, statistics, quick actions

### 39. Edit Profile Screen
- **Path**: `src/screens/account/edit-profile/EditProfileScreen.tsx`
- **Purpose**: Edit profile information
- **Features**: Form inputs, photo upload, save

### 40. Settings Screen
- **Path**: `src/screens/account/settings/SettingsScreen.tsx`
- **Purpose**: App settings and preferences
- **Features**: Notifications, language, theme, privacy

### 41. Notifications Screen
- **Path**: `src/screens/account/notifications/NotificationsScreen.tsx`
- **Purpose**: View and manage notifications
- **Features**: Notification list, read/unread, actions

### 42. Reviews & Ratings Screen
- **Path**: `src/screens/account/reviews-ratings/ReviewsRatingsScreen.tsx`
- **Purpose**: View customer reviews and ratings
- **Features**: Rating display, review list, filters

### 43. Help & Support Screen
- **Path**: `src/screens/account/help-support/HelpSupportScreen.tsx`
- **Purpose**: Access help resources and support
- **Features**: FAQs, contact support, tutorials

---

## Utility Screens (3 screens)

### 44. Calendar View Screen
- **Path**: `src/screens/utilities/calendar-view/CalendarViewScreen.tsx`
- **Purpose**: View bookings in calendar format
- **Features**: Month/week/day views, vehicle filter, booking list

### 45. Documents Screen
- **Path**: `src/screens/utilities/documents/DocumentsScreen.tsx`
- **Purpose**: Manage all documents
- **Features**: Document categories, upload, view, delete

### 46. Maintenance Log Screen
- **Path**: `src/screens/utilities/maintenance-log/MaintenanceLogScreen.tsx`
- **Purpose**: Track vehicle maintenance records
- **Features**: Maintenance history, filters, add records

---

## Common Screens (4 screens)

### 47. Empty State Screen
- **Path**: `src/screens/common/empty-state/EmptyStateScreen.tsx`
- **Purpose**: Display when no data is available
- **Features**: Custom icon, message, action button

### 48. Error Screen
- **Path**: `src/screens/common/error/ErrorScreen.tsx`
- **Purpose**: Display error messages
- **Features**: Error details, retry button, go back

### 49. Loading Screen
- **Path**: `src/screens/common/loading/LoadingScreen.tsx`
- **Purpose**: Display during loading operations
- **Features**: Animated spinner, loading message

### 50. Offline Screen
- **Path**: `src/screens/common/offline/OfflineScreen.tsx`
- **Purpose**: Display when internet connection is lost
- **Features**: Offline status, retry button, tips

---

## UI Components

### Reusable Components
1. **Button Component** (`src/components/ui/Button.tsx`)
   - Variants: primary, secondary, accent, outline, ghost
   - Sizes: sm, md, lg
   - Features: Icons, loading states, haptic feedback

2. **Input Component** (`src/components/ui/Input.tsx`)
   - Features: Animated focus, icons, error states
   - Types: text, password, email, phone

3. **Card Component** (`src/components/ui/Card.tsx`)
   - Variants: flat, elevated, outlined
   - Sizes: sm, md, lg
   - Features: Shadows, rounded corners

---

## Theme System

### Brand Theme (`src/constants/brandTheme.ts`)
- **Colors**: Primary, accent, dot, background, text variants
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale (xs to 2xl)
- **Border Radius**: Consistent radius scale (sm to full)
- **Shadows**: Elevation system (sm, md, lg)

---

## Navigation Structure

### Stack Navigators
1. **Auth Stack**: All authentication screens
2. **Main App Stack**: All main application screens
3. **Tab Navigator**: Bottom tab navigation (Home, Explore, Bookings, Profile)

### Navigation Flow
```
Splash → Get Started → Language Selection → Phone Verification → OTP Verification
→ Personal Details → Business Details → Location Details → Bank Details
→ Document Upload → Verification Pending → Main App (Dashboard)
```

---

## Features Implemented

### Animations
- Fade in/out animations
- Scale animations
- Slide animations
- Rotation animations
- Pulse animations
- Stagger animations

### Interactions
- Haptic feedback on all touchable elements
- Smooth transitions between screens
- Loading states
- Error handling
- Empty states

### Design Principles
- Modern, clean UI
- Consistent spacing and typography
- Brand color integration
- Responsive design
- Accessibility considerations
- Light theme only

---

## Technical Stack

### Core Technologies
- React Native
- TypeScript
- Expo
- React Navigation

### UI Libraries
- expo-linear-gradient
- expo-haptics
- @expo/vector-icons (Ionicons)
- react-native-safe-area-context

### State Management
- React Hooks (useState, useEffect, useRef)
- Animated API for animations

---

## Next Steps

### Pending Tasks
1. **Font Integration**: Download and integrate Google Fonts (Montserrat, Open Sans, Raleway)
2. **Backend Integration**: Connect to APIs (Twilio, Google Locations, etc.)
3. **Testing**: Comprehensive testing of all screens
4. **Performance Optimization**: Optimize images, animations, and rendering
5. **Accessibility**: Add accessibility labels and support
6. **Internationalization**: Implement i18n for multiple languages

### Future Enhancements
1. Dark theme support
2. Advanced analytics with charts
3. Real-time notifications
4. In-app chat support
5. Advanced filtering and search
6. Offline mode with data sync
7. Push notifications
8. Deep linking
9. Social media integration
10. Advanced reporting features

---

## File Structure

```
src/
├── components/
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── constants/
│   └── brandTheme.ts
├── navigation/
│   └── AppNavigator.tsx
├── screens/
│   ├── (tabs)/
│   │   ├── index.tsx (Dashboard)
│   │   └── explore.tsx
│   ├── account/
│   │   ├── edit-profile/
│   │   ├── help-support/
│   │   ├── notifications/
│   │   ├── profile/
│   │   ├── reviews-ratings/
│   │   └── settings/
│   ├── analytics/
│   │   ├── dashboard/
│   │   ├── performance/
│   │   └── reports/
│   ├── auth/
│   │   ├── get-started/
│   │   ├── language-selection/
│   │   ├── otp-verification/
│   │   ├── phone-verification/
│   │   ├── registration/
│   │   ├── splash/
│   │   └── verification-pending/
│   ├── bookings/
│   │   ├── add-manual-booking/
│   │   ├── booking-details/
│   │   ├── customer-profile/
│   │   ├── my-bookings/
│   │   ├── post-rental-inspection/
│   │   ├── pre-rental-inspection/
│   │   └── vehicle-tracking/
│   ├── common/
│   │   ├── empty-state/
│   │   ├── error/
│   │   ├── loading/
│   │   └── offline/
│   ├── financial/
│   │   ├── coupons/
│   │   ├── transactions/
│   │   ├── wallet/
│   │   └── withdraw/
│   ├── fleet/
│   │   ├── add-maintenance/
│   │   ├── add-vehicle/
│   │   ├── edit-vehicle/
│   │   ├── my-fleet/
│   │   └── vehicle-details/
│   └── utilities/
│       ├── calendar-view/
│       ├── documents/
│       └── maintenance-log/
└── types/
    └── index.ts
```

---

## Conclusion

All 50 screens have been successfully designed and implemented with:
- Modern, aesthetic UI design
- Consistent brand colors and typography
- Smooth animations and transitions
- Haptic feedback for better UX
- Proper navigation structure
- Reusable components
- Type-safe code with TypeScript
- No linting errors

The application is ready for backend integration and further testing.
