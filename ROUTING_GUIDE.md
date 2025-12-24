# Mova Vendor App - Complete Routing Guide

## 🎯 Navigation Structure Overview

The app uses **React Navigation** with a combination of **Stack Navigators** and **Tab Navigators** to provide a seamless user experience.

---

## 📱 App Flow

```
App Start
    ↓
Splash Screen (2 seconds)
    ↓
Authentication Check
    ↓
┌─────────────────┬─────────────────┐
│  Unauthenticated │   Authenticated  │
│   (Auth Stack)   │  (Main App Stack)│
└─────────────────┴─────────────────┘
```

---

## 🔐 Authentication Flow (Auth Stack)

### **Route**: `AuthStack`
**Initial Screen**: `GetStartedScreen`

### Navigation Flow:
```
1. GetStartedScreen (Language Selection)
    ↓
2. PhoneVerificationScreen
    ↓
3. OTPVerificationScreen
    ↓
4. PersonalDetailsScreen
    ↓
5. BusinessDetailsScreen
    ↓
6. LocationDetailsScreen
    ↓
7. BankDetailsScreen
    ↓
8. DocumentUploadScreen
    ↓
9. VerificationPendingScreen
```

### Screen Names & Navigation:

| Screen Name | Route Name | Navigation Example |
|------------|-----------|-------------------|
| Get Started | `GetStartedScreen` | `navigation.navigate('GetStartedScreen')` |
| Language Selection | `LanguageSelectionScreen` | `navigation.navigate('LanguageSelectionScreen')` |
| Phone Verification | `PhoneVerificationScreen` | `navigation.navigate('PhoneVerificationScreen')` |
| OTP Verification | `OTPVerificationScreen` | `navigation.navigate('OTPVerificationScreen')` |
| Personal Details | `PersonalDetailsScreen` | `navigation.navigate('PersonalDetailsScreen')` |
| Business Details | `BusinessDetailsScreen` | `navigation.navigate('BusinessDetailsScreen')` |
| Location Details | `LocationDetailsScreen` | `navigation.navigate('LocationDetailsScreen')` |
| Bank Details | `BankDetailsScreen` | `navigation.navigate('BankDetailsScreen')` |
| Document Upload | `DocumentUploadScreen` | `navigation.navigate('DocumentUploadScreen')` |
| Verification Pending | `VerificationPendingScreen` | `navigation.navigate('VerificationPendingScreen')` |

---

## 🏠 Main App Structure (Main App Stack)

### **Route**: `MainAppStack`
**Initial Screen**: `MainTabs` (Tab Navigator)

---

## 📊 Bottom Tab Navigator

### **Route**: `MainTabs`

| Tab Name | Icon | Screen Component | Route Name |
|---------|------|-----------------|-----------|
| Home | home/home-outline | HomeScreen | `Home` |
| Explore | search/search-outline | ExploreScreen | `Explore` |
| Bookings | calendar/calendar-outline | MyBookingsScreen | `Bookings` |
| Profile | person/person-outline | ProfileScreen | `Profile` |

### Tab Bar Styling:
- **Active Color**: `#00242C` (Brand Primary)
- **Inactive Color**: `#ADB5BD` (Text Light)
- **Background**: White
- **Border**: Light gray
- **Height**: 60px

---

## 🚗 Fleet Management Screens

### Navigation Examples:

```typescript
// View all vehicles
navigation.navigate('MyFleetScreen');

// Add new vehicle (multi-step)
navigation.navigate('BasicDetailsScreen');
navigation.navigate('FeaturesSpecsScreen');
navigation.navigate('PhotosDocumentsScreen');
navigation.navigate('PricingAvailabilityScreen');

// View/Edit vehicle
navigation.navigate('VehicleDetailsScreen', { vehicleId: 'xxx' });
navigation.navigate('EditVehicleScreen', { vehicleId: 'xxx' });

// Add maintenance
navigation.navigate('AddMaintenanceScreen', { vehicleId: 'xxx' });
```

| Screen Name | Route Name | Parameters |
|------------|-----------|-----------|
| My Fleet | `MyFleetScreen` | None |
| Basic Details | `BasicDetailsScreen` | None |
| Features & Specs | `FeaturesSpecsScreen` | None |
| Photos & Documents | `PhotosDocumentsScreen` | None |
| Pricing & Availability | `PricingAvailabilityScreen` | None |
| Vehicle Details | `VehicleDetailsScreen` | `{ vehicleId: string }` |
| Edit Vehicle | `EditVehicleScreen` | `{ vehicleId: string }` |
| Add Maintenance | `AddMaintenanceScreen` | `{ vehicleId: string }` |

---

## 📅 Bookings Management Screens

### Navigation Examples:

```typescript
// View all bookings
navigation.navigate('MyBookingsScreen');

// View booking details
navigation.navigate('BookingDetailsScreen', { bookingId: 'xxx' });

// Add manual booking
navigation.navigate('AddManualBookingScreen');

// View customer profile
navigation.navigate('CustomerProfileScreen', { customerId: 'xxx' });

// Inspections
navigation.navigate('PreRentalInspectionScreen', { bookingId: 'xxx' });
navigation.navigate('PostRentalInspectionScreen', { bookingId: 'xxx' });

// Track vehicle
navigation.navigate('VehicleTrackingScreen', { bookingId: 'xxx' });
```

| Screen Name | Route Name | Parameters |
|------------|-----------|-----------|
| My Bookings | `MyBookingsScreen` | None |
| Booking Details | `BookingDetailsScreen` | `{ bookingId: string }` |
| Add Manual Booking | `AddManualBookingScreen` | None |
| Customer Profile | `CustomerProfileScreen` | `{ customerId: string }` |
| Pre-Rental Inspection | `PreRentalInspectionScreen` | `{ bookingId: string }` |
| Post-Rental Inspection | `PostRentalInspectionScreen` | `{ bookingId: string }` |
| Vehicle Tracking | `VehicleTrackingScreen` | `{ bookingId: string }` |

---

## 💰 Financial Management Screens

### Navigation Examples:

```typescript
// Wallet
navigation.navigate('WalletScreen');

// Transactions
navigation.navigate('TransactionsScreen');

// Withdraw funds
navigation.navigate('WithdrawScreen');

// Manage coupons
navigation.navigate('CouponsScreen');
```

| Screen Name | Route Name | Parameters |
|------------|-----------|-----------|
| Wallet | `WalletScreen` | None |
| Transactions | `TransactionsScreen` | None |
| Withdraw | `WithdrawScreen` | None |
| Coupons | `CouponsScreen` | None |

---

## 📈 Analytics Screens

### Navigation Examples:

```typescript
// Analytics dashboard
navigation.navigate('AnalyticsDashboardScreen');

// Performance metrics
navigation.navigate('PerformanceMetricsScreen');

// Reports
navigation.navigate('ReportsScreen');
```

| Screen Name | Route Name | Parameters |
|------------|-----------|-----------|
| Analytics Dashboard | `AnalyticsDashboardScreen` | None |
| Performance Metrics | `PerformanceMetricsScreen` | None |
| Reports | `ReportsScreen` | None |

---

## 👤 Account & Profile Screens

### Navigation Examples:

```typescript
// Profile (accessible via tab)
navigation.navigate('Profile');

// Edit profile
navigation.navigate('EditProfileScreen');

// Settings
navigation.navigate('SettingsScreen');

// Notifications
navigation.navigate('NotificationsScreen');

// Reviews & Ratings
navigation.navigate('ReviewsRatingsScreen');

// Help & Support
navigation.navigate('HelpSupportScreen');
```

| Screen Name | Route Name | Parameters |
|------------|-----------|-----------|
| Profile | `Profile` | None (Tab) |
| Edit Profile | `EditProfileScreen` | None |
| Settings | `SettingsScreen` | None |
| Notifications | `NotificationsScreen` | None |
| Reviews & Ratings | `ReviewsRatingsScreen` | None |
| Help & Support | `HelpSupportScreen` | None |

---

## 🛠️ Utility Screens

### Navigation Examples:

```typescript
// Calendar view
navigation.navigate('CalendarViewScreen');

// Documents
navigation.navigate('DocumentsScreen');

// Maintenance log
navigation.navigate('MaintenanceLogScreen');
```

| Screen Name | Route Name | Parameters |
|------------|-----------|-----------|
| Calendar View | `CalendarViewScreen` | None |
| Documents | `DocumentsScreen` | None |
| Maintenance Log | `MaintenanceLogScreen` | None |

---

## 🔧 Common Screens

### Navigation Examples:

```typescript
// Loading screen
navigation.navigate('LoadingScreen', { message: 'Loading...' });

// Error screen
navigation.navigate('ErrorScreen', { 
  title: 'Error', 
  message: 'Something went wrong' 
});

// Offline screen
navigation.navigate('OfflineScreen');

// Empty state
navigation.navigate('EmptyStateScreen', { 
  title: 'No Data', 
  subtitle: 'Nothing to show here' 
});
```

| Screen Name | Route Name | Parameters |
|------------|-----------|-----------|
| Loading | `LoadingScreen` | `{ message?: string }` |
| Error | `ErrorScreen` | `{ title?: string, message?: string }` |
| Offline | `OfflineScreen` | None |
| Empty State | `EmptyStateScreen` | `{ title: string, subtitle?: string }` |

---

## 🎨 Navigation Styling

### Tab Bar Configuration:

```typescript
tabBarActiveTintColor: '#00242C',      // Brand primary
tabBarInactiveTintColor: '#ADB5BD',    // Text light
tabBarStyle: {
  backgroundColor: '#FFFFFF',
  borderTopColor: '#E9ECEF',
  borderTopWidth: 1,
  paddingBottom: 5,
  paddingTop: 5,
  height: 60,
}
```

### Stack Navigator Configuration:

```typescript
screenOptions={{
  headerShown: false,  // All headers hidden for custom UI
}}
```

---

## 🔄 Navigation Methods

### Basic Navigation:

```typescript
// Navigate to screen
navigation.navigate('ScreenName');

// Navigate with parameters
navigation.navigate('ScreenName', { param1: 'value1' });

// Go back
navigation.goBack();

// Replace current screen
navigation.replace('ScreenName');

// Reset navigation stack
navigation.reset({
  index: 0,
  routes: [{ name: 'ScreenName' }],
});

// Pop to top of stack
navigation.popToTop();
```

### Tab Navigation:

```typescript
// Navigate to specific tab
navigation.navigate('Home');
navigation.navigate('Explore');
navigation.navigate('Bookings');
navigation.navigate('Profile');
```

---

## 🧪 Testing Navigation on Phone

### Prerequisites:
1. ✅ Install Expo Go app on your phone
2. ✅ Ensure phone and computer are on same WiFi
3. ✅ Run `npx expo start` in terminal

### Test Flow:

#### **1. Authentication Flow**
```
Start App → Splash (2s) → Get Started → Select Language → 
Phone Verification → OTP → Personal Details → Business Details → 
Location → Bank Details → Documents → Verification Pending
```

#### **2. Main App Flow**
```
Home Tab → View Dashboard → Navigate to Fleet → Add Vehicle → 
View Bookings → Check Wallet → View Analytics → Edit Profile
```

#### **3. Deep Navigation Test**
```typescript
// Test nested navigation
Home → My Fleet → Vehicle Details → Edit Vehicle → Save
Home → Bookings → Booking Details → Pre-Rental Inspection
Home → Profile → Settings → Notifications
```

---

## 🐛 Common Navigation Issues & Solutions

### Issue 1: Screen not found
**Error**: `The action 'NAVIGATE' with payload {"name":"ScreenName"} was not handled`

**Solution**: Check screen is registered in navigator with exact name

### Issue 2: Parameters not received
**Error**: `undefined is not an object`

**Solution**: 
```typescript
// Use optional chaining
const { vehicleId } = route.params || {};
const vehicleId = route.params?.vehicleId;
```

### Issue 3: Back button not working
**Solution**: Ensure screen is in stack navigator, not root

### Issue 4: Tab bar not showing
**Solution**: Check you're navigating to MainTabs, not individual screens

---

## 📊 Complete Screen Count

- **Authentication**: 10 screens
- **Main Tabs**: 4 tabs
- **Fleet Management**: 8 screens
- **Bookings**: 7 screens
- **Financial**: 4 screens
- **Analytics**: 3 screens
- **Account/Profile**: 6 screens
- **Utilities**: 3 screens
- **Common**: 4 screens

**Total**: **49 navigable screens** ✅

---

## 🚀 Quick Start Commands

### Start Development Server:
```bash
npx expo start
```

### Start with specific platform:
```bash
npx expo start --android
npx expo start --ios
```

### Clear cache and restart:
```bash
npx expo start -c
```

### Run on physical device:
1. Scan QR code with Expo Go app (Android)
2. Scan QR code with Camera app (iOS)

---

## ✅ Navigation Checklist for Testing

### Authentication Flow:
- [ ] Splash screen appears for 2 seconds
- [ ] Get Started screen loads
- [ ] Language selection works
- [ ] Phone verification screen accessible
- [ ] OTP verification screen accessible
- [ ] All registration screens in sequence
- [ ] Verification pending screen shows

### Main App Navigation:
- [ ] Bottom tabs visible and working
- [ ] Home tab loads dashboard
- [ ] Explore tab accessible
- [ ] Bookings tab shows bookings
- [ ] Profile tab shows profile

### Deep Navigation:
- [ ] Fleet screens accessible from home
- [ ] Booking details accessible from bookings
- [ ] Settings accessible from profile
- [ ] All utility screens accessible
- [ ] Common screens (error, loading) work

### Back Navigation:
- [ ] Back button works on all screens
- [ ] Tab navigation persists state
- [ ] Deep links work correctly

---

## 🎯 Navigation Best Practices

1. **Always use typed navigation**:
```typescript
navigation.navigate('ScreenName', { id: '123' });
```

2. **Handle parameters safely**:
```typescript
const { id } = route.params || {};
if (!id) return <ErrorScreen />;
```

3. **Use haptic feedback**:
```typescript
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
navigation.navigate('ScreenName');
```

4. **Show loading states**:
```typescript
if (isLoading) return <LoadingScreen />;
```

5. **Handle errors gracefully**:
```typescript
if (error) return <ErrorScreen message={error.message} />;
```

---

## 📝 Summary

✅ **All 49 screens properly registered**  
✅ **Navigation structure complete**  
✅ **Tab navigation configured**  
✅ **Brand colors applied**  
✅ **No linting errors**  
✅ **Ready for phone testing**  

Your app is **100% ready** to test on your phone! 🎉
