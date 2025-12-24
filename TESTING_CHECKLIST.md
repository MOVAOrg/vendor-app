# Mova Vendor App - Testing Checklist

## 📱 Quick Start Testing Guide

### **Step 1: Start the Development Server**

```bash
cd D:\mova-platform
npx expo start
```

### **Step 2: Connect Your Phone**

#### **For Android:**
1. Install **Expo Go** from Google Play Store
2. Open Expo Go app
3. Scan the QR code from terminal
4. App will load on your phone

#### **For iOS:**
1. Install **Expo Go** from App Store
2. Open Camera app
3. Scan the QR code from terminal
4. Tap notification to open in Expo Go

---

## ✅ Testing Checklist

### **1. App Launch & Splash Screen** ⏱️ 30 seconds
- [ ] App launches successfully
- [ ] Splash screen appears
- [ ] Splash screen shows for ~2 seconds
- [ ] Smooth transition to next screen

### **2. Authentication Flow** ⏱️ 5 minutes

#### Get Started Screen:
- [ ] Screen loads with language options
- [ ] Can scroll through languages
- [ ] English is in the middle (5th position)
- [ ] Language names in native script
- [ ] "Continue" button works
- [ ] Haptic feedback on button press

#### Phone Verification:
- [ ] Screen loads with phone input
- [ ] Can enter phone number
- [ ] Country code selector works
- [ ] "Continue" button enabled after input
- [ ] Navigation to OTP screen works

#### OTP Verification:
- [ ] Screen loads with OTP input cells
- [ ] Can enter 6-digit OTP
- [ ] Auto-focus moves between cells
- [ ] Countdown timer works
- [ ] "Resend OTP" button appears after timer
- [ ] "Verify" button works

#### Registration Screens:
- [ ] Personal Details screen loads
- [ ] Business Details screen loads
- [ ] Location Details screen loads
- [ ] Bank Details screen loads
- [ ] Document Upload screen loads
- [ ] All inputs are functional
- [ ] "Continue" buttons work
- [ ] Back navigation works

#### Verification Pending:
- [ ] Screen shows verification status
- [ ] Can navigate to main app (for testing)

### **3. Main App - Bottom Tabs** ⏱️ 2 minutes
- [ ] Bottom tab bar visible
- [ ] 4 tabs present (Home, Explore, Bookings, Profile)
- [ ] Tab icons change on selection
- [ ] Tab colors match brand (primary when active)
- [ ] Smooth tab switching
- [ ] Haptic feedback on tab press

### **4. Home/Dashboard Screen** ⏱️ 2 minutes
- [ ] Dashboard loads successfully
- [ ] Statistics cards visible
- [ ] Animations play smoothly
- [ ] Quick action buttons work
- [ ] Recent activity section visible
- [ ] Can navigate to other screens

### **5. Fleet Management** ⏱️ 5 minutes

#### My Fleet:
- [ ] Screen loads with vehicle list
- [ ] Vehicle cards display properly
- [ ] Status badges visible
- [ ] Filter tabs work
- [ ] Can tap on vehicle card

#### Add Vehicle Flow:
- [ ] Basic Details screen loads
- [ ] Features & Specs screen loads
- [ ] Photos & Documents screen loads
- [ ] Pricing & Availability screen loads
- [ ] All inputs functional
- [ ] Multi-step navigation works

#### Vehicle Details:
- [ ] Screen loads vehicle information
- [ ] Photos display correctly
- [ ] Specifications visible
- [ ] Action buttons work
- [ ] Can navigate to edit screen

### **6. Bookings Management** ⏱️ 5 minutes

#### My Bookings:
- [ ] Screen loads booking list
- [ ] Booking cards display properly
- [ ] Status filters work
- [ ] Search functionality works
- [ ] Can tap on booking card

#### Booking Details:
- [ ] Screen loads booking information
- [ ] Customer details visible
- [ ] Vehicle details visible
- [ ] Timeline/status visible
- [ ] Action buttons work

#### Inspections:
- [ ] Pre-rental inspection screen loads
- [ ] Post-rental inspection screen loads
- [ ] Checklist items functional
- [ ] Photo capture works (if implemented)
- [ ] Signature capture works (if implemented)

### **7. Financial Screens** ⏱️ 3 minutes

#### Wallet:
- [ ] Screen loads balance information
- [ ] Transaction history visible
- [ ] Quick actions work
- [ ] Charts/graphs display (if any)

#### Transactions:
- [ ] Screen loads transaction list
- [ ] Filters work
- [ ] Transaction cards display properly
- [ ] Details visible

#### Withdraw:
- [ ] Screen loads withdrawal form
- [ ] Amount input works
- [ ] Bank selection works
- [ ] Validation works

#### Coupons:
- [ ] Screen loads coupon list
- [ ] Can create new coupon
- [ ] Coupon cards display properly
- [ ] Status badges visible

### **8. Analytics Screens** ⏱️ 3 minutes

#### Analytics Dashboard:
- [ ] Screen loads with charts
- [ ] KPIs visible
- [ ] Graphs display properly
- [ ] Date filters work
- [ ] Smooth scrolling

#### Performance Metrics:
- [ ] Screen loads metrics
- [ ] Charts display correctly
- [ ] Comparison data visible
- [ ] Interactive elements work

#### Reports:
- [ ] Screen loads report options
- [ ] Report types selectable
- [ ] Date range picker works
- [ ] Export options visible

### **9. Profile & Settings** ⏱️ 3 minutes

#### Profile:
- [ ] Screen loads profile information
- [ ] Profile photo displays
- [ ] Statistics visible
- [ ] Quick actions work
- [ ] Can navigate to edit

#### Edit Profile:
- [ ] Screen loads with form
- [ ] All fields editable
- [ ] Photo upload works (if implemented)
- [ ] Save button works
- [ ] Validation works

#### Settings:
- [ ] Screen loads settings options
- [ ] Toggle switches work
- [ ] Language selection works
- [ ] Notification settings work
- [ ] Theme options visible

#### Notifications:
- [ ] Screen loads notification list
- [ ] Notifications display properly
- [ ] Read/unread status visible
- [ ] Can mark as read
- [ ] Can delete notifications

#### Reviews & Ratings:
- [ ] Screen loads reviews
- [ ] Rating display correct
- [ ] Review cards visible
- [ ] Filters work
- [ ] Can respond to reviews

#### Help & Support:
- [ ] Screen loads help options
- [ ] FAQs visible
- [ ] Contact options work
- [ ] Search functionality works

### **10. Utility Screens** ⏱️ 3 minutes

#### Calendar View:
- [ ] Screen loads calendar
- [ ] View options work (month/week/day)
- [ ] Vehicle filter works
- [ ] Bookings display on calendar
- [ ] Can tap on booking

#### Documents:
- [ ] Screen loads document list
- [ ] Categories work
- [ ] Document cards display
- [ ] Upload button works (if implemented)
- [ ] Can view/download documents

#### Maintenance Log:
- [ ] Screen loads maintenance records
- [ ] Filters work
- [ ] Maintenance cards display
- [ ] Can add new record
- [ ] Status updates work

### **11. Common Screens** ⏱️ 2 minutes

#### Loading Screen:
- [ ] Displays properly when triggered
- [ ] Animation works
- [ ] Message displays

#### Error Screen:
- [ ] Displays on error
- [ ] Error message visible
- [ ] Retry button works
- [ ] Go back button works

#### Offline Screen:
- [ ] Displays when offline
- [ ] Tips visible
- [ ] Retry button works

#### Empty State:
- [ ] Displays when no data
- [ ] Icon and message visible
- [ ] Action button works

### **12. UI/UX Elements** ⏱️ 5 minutes

#### Colors:
- [ ] Brand colors consistent throughout
- [ ] Primary: #00242C (dark teal)
- [ ] Accent: #2DAA72 (green)
- [ ] Dot: #54AEC9 (light blue)
- [ ] Background: #FFFFFF (white)

#### Typography:
- [ ] Fonts load correctly
- [ ] Text sizes appropriate
- [ ] No oversized fonts
- [ ] Readable on all screens

#### Animations:
- [ ] Fade animations smooth
- [ ] Scale animations smooth
- [ ] Slide animations smooth
- [ ] No lag or jank
- [ ] 60fps performance

#### Haptic Feedback:
- [ ] Feedback on button press
- [ ] Feedback on tab switch
- [ ] Feedback on important actions
- [ ] Not too aggressive

#### Spacing & Layout:
- [ ] Consistent spacing
- [ ] Proper alignment
- [ ] No overlapping elements
- [ ] Responsive to screen size

### **13. Navigation** ⏱️ 5 minutes

#### Forward Navigation:
- [ ] All screens accessible
- [ ] Parameters pass correctly
- [ ] Smooth transitions
- [ ] No navigation errors

#### Back Navigation:
- [ ] Back button works everywhere
- [ ] Stack navigation correct
- [ ] No stuck screens
- [ ] Tab state persists

#### Deep Navigation:
- [ ] Can navigate multiple levels deep
- [ ] Back navigation works from deep screens
- [ ] No navigation loops
- [ ] State management correct

### **14. Performance** ⏱️ 5 minutes

#### Load Times:
- [ ] Screens load quickly (<1s)
- [ ] No blank screens
- [ ] Loading states show
- [ ] Smooth transitions

#### Scrolling:
- [ ] Lists scroll smoothly
- [ ] No lag on scroll
- [ ] Infinite scroll works (if implemented)
- [ ] Pull to refresh works (if implemented)

#### Memory:
- [ ] No memory leaks
- [ ] App doesn't crash
- [ ] No freezing
- [ ] Stable performance

#### Battery:
- [ ] No excessive battery drain
- [ ] No overheating
- [ ] Efficient resource usage

---

## 🐛 Bug Reporting Template

If you find any issues, document them using this template:

```
**Screen**: [Screen Name]
**Issue**: [Brief description]
**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior**: [What should happen]
**Actual Behavior**: [What actually happens]
**Screenshots**: [If applicable]
**Device**: [Phone model and OS version]
**Severity**: [Low/Medium/High/Critical]
```

---

## 📊 Testing Summary

### Time Estimate:
- **Quick Test**: 15 minutes (main flows only)
- **Standard Test**: 45 minutes (all major features)
- **Comprehensive Test**: 2 hours (every screen and feature)

### Priority Testing Order:
1. **Critical** (15 min): Auth flow, main tabs, basic navigation
2. **High** (30 min): Fleet, bookings, financial screens
3. **Medium** (30 min): Analytics, profile, utilities
4. **Low** (15 min): Common screens, edge cases

---

## ✅ Sign-Off Checklist

Before considering testing complete:

- [ ] All authentication screens tested
- [ ] All main tabs tested
- [ ] All fleet screens tested
- [ ] All booking screens tested
- [ ] All financial screens tested
- [ ] All analytics screens tested
- [ ] All profile screens tested
- [ ] All utility screens tested
- [ ] All common screens tested
- [ ] Navigation fully tested
- [ ] UI/UX elements verified
- [ ] Performance acceptable
- [ ] No critical bugs found
- [ ] Ready for next phase

---

## 🚀 Next Steps After Testing

1. **Document all bugs** found during testing
2. **Prioritize fixes** based on severity
3. **Test backend integration** (when ready)
4. **Performance optimization** if needed
5. **User acceptance testing** with stakeholders
6. **Production deployment** preparation

---

## 📝 Notes

- Test on **multiple devices** if possible (different screen sizes)
- Test in **different network conditions** (WiFi, 4G, slow connection)
- Test with **different data scenarios** (empty states, full lists)
- Test **edge cases** (long text, special characters, etc.)
- Document **any unexpected behavior**

---

**Happy Testing! 🎉**
