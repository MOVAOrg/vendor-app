# Mova Vendor App - Quick Start Guide

## 🚀 Development Server Started!

The Expo development server is now running with **cleared cache** for optimal performance.

---

## 📱 How to Test on Your Phone

### **For Android:**

1. **Install Expo Go** (if not already installed)
   - Open Google Play Store
   - Search for "Expo Go"
   - Install the app

2. **Connect to the App**
   - Open Expo Go app
   - Tap "Scan QR code"
   - Scan the QR code from your terminal/command prompt
   - App will start loading!

3. **Wait for Bundle**
   - First load may take 30-60 seconds
   - You'll see "Downloading JavaScript bundle"
   - Once complete, the app will launch

### **For iOS:**

1. **Install Expo Go** (if not already installed)
   - Open App Store
   - Search for "Expo Go"
   - Install the app

2. **Connect to the App**
   - Open Camera app (not Expo Go)
   - Point camera at QR code in terminal
   - Tap the notification that appears
   - App will open in Expo Go

3. **Wait for Bundle**
   - First load may take 30-60 seconds
   - You'll see "Downloading JavaScript bundle"
   - Once complete, the app will launch

---

## 🎯 What to Test First

### **1. Splash Screen (2 seconds)**
- Should show app logo/branding
- Smooth transition to next screen

### **2. Get Started Screen**
- Language selection visible
- Can scroll through languages
- English in the middle
- "Continue" button works

### **3. Phone Verification**
- Can enter phone number
- "Continue" button enabled
- Navigates to OTP screen

### **4. OTP Verification**
- 6 OTP input cells
- Auto-focus between cells
- Countdown timer works
- "Verify" button works

### **5. Registration Flow**
- Personal Details form
- Business Details form
- Location Details form
- Bank Details form
- Document Upload
- All inputs functional

### **6. Main App (After Registration)**
- Bottom tabs visible (Home, Explore, Bookings, Profile)
- Dashboard loads with statistics
- Can navigate between tabs
- All screens accessible

---

## 🔧 Development Server Controls

### **In Terminal:**

- **Press `r`** - Reload app
- **Press `m`** - Toggle menu
- **Press `j`** - Open debugger
- **Press `c`** - Clear cache and reload
- **Press `q`** - Quit server

### **On Phone (Shake Device):**
- Opens developer menu
- Options: Reload, Debug, Performance Monitor

---

## 📊 Expected Performance

### **First Load:**
- Bundle download: 30-60 seconds
- App initialization: 5-10 seconds
- Total: ~1 minute

### **Subsequent Loads:**
- Hot reload: 1-2 seconds
- Fast refresh: Instant for most changes

### **Navigation:**
- Screen transitions: Smooth (60fps)
- Animations: Fluid with no lag
- Haptic feedback: Responsive

---

## 🐛 Troubleshooting

### **Issue: QR Code Not Scanning**
**Solution:**
- Ensure phone and computer are on same WiFi
- Try manual connection: Enter URL shown in terminal
- Restart Expo Go app

### **Issue: Bundle Download Fails**
**Solution:**
- Check internet connection
- Restart development server: Press `r` in terminal
- Clear Expo Go cache: Settings → Clear Cache

### **Issue: App Crashes on Load**
**Solution:**
- Check terminal for error messages
- Restart server with: `npx expo start -c`
- Update Expo Go app to latest version

### **Issue: Slow Performance**
**Solution:**
- Enable Performance Monitor (shake device → Performance)
- Close other apps on phone
- Restart development server

### **Issue: Changes Not Reflecting**
**Solution:**
- Press `r` in terminal to reload
- Shake device → Reload
- Clear cache: `npx expo start -c`

---

## ✅ Testing Checklist

### **Quick Test (5 minutes)**
- [ ] App loads successfully
- [ ] Splash screen appears
- [ ] Can navigate through auth flow
- [ ] Bottom tabs work
- [ ] Dashboard loads
- [ ] Can navigate between screens

### **Standard Test (15 minutes)**
- [ ] Complete registration flow
- [ ] Test all bottom tabs
- [ ] Open fleet management
- [ ] Open bookings
- [ ] Check financial screens
- [ ] Test profile settings

### **Comprehensive Test (45 minutes)**
- [ ] Test all 50 screens
- [ ] Verify all animations
- [ ] Check haptic feedback
- [ ] Test form inputs
- [ ] Verify navigation flow
- [ ] Check error handling

---

## 📱 Device Requirements

### **Minimum:**
- Android 5.0+ or iOS 13+
- 2GB RAM
- Stable internet connection
- Expo Go app installed

### **Recommended:**
- Android 10+ or iOS 14+
- 4GB+ RAM
- WiFi connection
- Latest Expo Go version

---

## 🎨 What You'll See

### **Brand Colors:**
- Primary: Dark Teal (#00242C)
- Accent: Green (#2DAA72)
- Dot: Light Blue (#54AEC9)
- Background: White (#FFFFFF)

### **Design Features:**
- Modern, sleek UI
- Smooth animations
- Haptic feedback on interactions
- Consistent spacing and typography
- Professional appearance

### **Fonts:**
- Primary: Montserrat (Bold/SemiBold)
- Secondary: Open Sans
- Accent: Raleway

---

## 🔥 Features to Test

### **Authentication:**
- Language selection with 10 Indian languages
- Phone number verification
- OTP verification with countdown
- Multi-step registration process
- Document upload

### **Fleet Management:**
- View all vehicles
- Add new vehicle (multi-step)
- Edit vehicle details
- View vehicle statistics
- Add maintenance records

### **Bookings:**
- View all bookings
- Booking details
- Customer profiles
- Pre/post rental inspections
- Vehicle tracking

### **Financial:**
- Wallet with balance
- Transaction history
- Withdraw funds
- Manage coupons

### **Analytics:**
- Dashboard with charts
- Performance metrics
- Reports generation

### **Profile:**
- View/edit profile
- Settings
- Notifications
- Reviews & ratings
- Help & support

---

## 📞 Support

### **If You Encounter Issues:**

1. **Check Terminal Output**
   - Look for error messages
   - Note any warnings

2. **Check Phone Connection**
   - Same WiFi network
   - Stable internet
   - Expo Go updated

3. **Common Fixes:**
   - Restart server: `npx expo start -c`
   - Restart Expo Go app
   - Restart phone
   - Clear Expo Go cache

---

## 🎉 Success Indicators

### **You'll Know It's Working When:**
- ✅ QR code appears in terminal
- ✅ Expo Go connects successfully
- ✅ Bundle downloads without errors
- ✅ Splash screen appears
- ✅ App is responsive and smooth
- ✅ Navigation works perfectly
- ✅ Animations are fluid
- ✅ No crashes or freezes

---

## 📊 Terminal Output Guide

### **What You Should See:**

```
Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
› Press ? │ show all commands
```

### **QR Code:**
- Large QR code displayed in terminal
- Scan this with your phone
- URL shown below QR code

---

## 🚀 Ready to Test!

Your app is now running and ready to test. Simply:

1. **Look at your terminal** - Find the QR code
2. **Open Expo Go** on your phone
3. **Scan the QR code**
4. **Wait for the app to load**
5. **Start testing!** 🎉

---

## 💡 Pro Tips

1. **Keep terminal visible** - Watch for errors
2. **Shake device** - Access developer menu anytime
3. **Hot reload** - Most changes reflect instantly
4. **Test on multiple devices** - If available
5. **Document issues** - Take screenshots of any problems

---

**Happy Testing!** 🎊

Your Mova Vendor App is now running and ready for comprehensive testing on your phone!
