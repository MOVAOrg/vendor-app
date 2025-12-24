#!/usr/bin/env node

/**
 * Production Cleanup Script
 * Removes console.log statements and replaces with production-ready logging
 */

const fs = require('fs');
const path = require('path');

// Files to process
const filesToProcess = [
  'src/screens/analytics/reports/ReportsScreen.tsx',
  'src/screens/utilities/maintenance/MaintenanceLogScreen.tsx',
  'src/screens/utilities/documents/DocumentsScreen.tsx',
  'src/screens/utilities/calendar/CalendarViewScreen.tsx',
  'src/screens/fleet/vehicle-details/VehicleDetailsScreen.tsx',
  'src/screens/fleet/my-fleet/MyFleetScreen.tsx',
  'src/screens/fleet/edit-vehicle/EditVehicleScreen.tsx',
  'src/screens/fleet/add-vehicle/pricing-availability/PricingAvailabilityScreen.tsx',
  'src/screens/fleet/add-vehicle/photos-documents/PhotosDocumentsScreen.tsx',
  'src/screens/fleet/add-vehicle/features-specs/FeaturesSpecsScreen.tsx',
  'src/screens/fleet/add-maintenance/AddMaintenanceScreen.tsx',
  'src/screens/financial/withdraw/WithdrawScreen.tsx',
  'src/screens/financial/wallet/WalletScreen.tsx',
  'src/screens/financial/transactions/TransactionsScreen.tsx',
  'src/screens/financial/coupons/CouponsScreen.tsx',
  'src/screens/dashboard/DashboardScreen.tsx',
  'src/screens/common/offline/OfflineScreen.tsx',
  'src/screens/common/error/ErrorScreen.tsx',
  'src/screens/bookings/vehicle-tracking/VehicleTrackingScreen.tsx',
  'src/screens/bookings/pre-rental-inspection/PreRentalInspectionScreen.tsx',
  'src/screens/bookings/post-rental-inspection/PostRentalInspectionScreen.tsx',
  'src/screens/bookings/my-bookings/MyBookingsScreen.tsx',
  'src/screens/bookings/customer-profile/CustomerProfileScreen.tsx',
  'src/screens/bookings/booking-details/BookingDetailsScreen.tsx',
  'src/screens/bookings/add-manual-booking/AddManualBookingScreen.tsx',
  'src/screens/auth/verification-pending/VerificationPendingScreen.tsx',
  'src/screens/auth/registration/location-details/LocationDetailsScreen.tsx',
  'src/screens/auth/registration/document-upload/DocumentUploadScreen.tsx',
  'src/screens/auth/registration/bank-details/BankDetailsScreen.tsx',
  'src/screens/auth/phone-verification/PhoneVerificationScreen.tsx',
  'src/screens/auth/otp-verification/OTPVerificationScreen.tsx',
  'src/screens/analytics/reports/ReportsScreen.tsx',
  'src/screens/account/settings/SettingsScreen.tsx',
  'src/screens/account/reviews-ratings/ReviewsRatingsScreen.tsx',
  'src/screens/account/profile/ProfileScreen.tsx',
  'src/screens/account/notifications/NotificationsScreen.tsx',
  'src/screens/account/help-support/HelpSupportScreen.tsx',
  'src/screens/account/edit-profile/EditProfileScreen.tsx',
  'src/screens/(tabs)/index.tsx',
  'app/index.tsx'
];

// Replacement patterns
const replacements = [
  // Console.log statements
  {
    pattern: /console\.log\([^)]*\);?\s*/g,
    replacement: '// Logging removed for production\n'
  },
  // Console.error statements
  {
    pattern: /console\.error\([^)]*\);?\s*/g,
    replacement: 'logger.error($1);\n'
  },
  // Console.warn statements
  {
    pattern: /console\.warn\([^)]*\);?\s*/g,
    replacement: 'logger.warn($1);\n'
  },
  // TODO comments
  {
    pattern: /\/\/\s*TODO:.*$/gm,
    replacement: '// Implementation pending\n'
  }
];

// Process a single file
function processFile(filePath) {
  try {
    const fullPath = path.join(__dirname, '..', filePath);

    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;

    // Apply replacements
    replacements.forEach(({ pattern, replacement }) => {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });

    // Add logger import if needed
    if (content.includes('logger.') && !content.includes("from '../../utils/logger'")) {
      const importLine = "import { logger, ErrorHandler } from '../../utils/logger';\n";
      content = importLine + content;
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Processed: ${filePath}`);
    } else {
      console.log(`⏭️  No changes needed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Process all files
console.log('🚀 Starting production cleanup...\n');

filesToProcess.forEach(processFile);

console.log('\n✨ Production cleanup completed!');
console.log('\nNext steps:');
console.log('1. Review the changes');
console.log('2. Test the application');
console.log('3. Update environment variables');
console.log('4. Deploy to production');
