# 🎨 MOVA FONT HIERARCHY - QUICK REFERENCE

## ✅ Font Files Uploaded Successfully

All 19 font files are in place:
- ✅ Montserrat (4 files)
- ✅ Open Sans (4 files)
- ✅ Poppins (4 files)
- ✅ Roboto (3 files)
- ✅ Space Grotesk (3 files)

---

## 🎯 FONT HIERARCHY

### **PRIMARY FONT: Montserrat**
**Usage:** Titles, Headings, Buttons, Important Text
- `Montserrat-Bold` → Screen titles, main headings
- `Montserrat-SemiBold` → Section titles, labels
- `Montserrat-Medium` → Subheadings, button text
- `Montserrat-Regular` → Regular headings

**Where:**
- All screen titles (32px)
- Section headings (18px)
- Button text (16px)
- Form labels (14px)

---

### **SECONDARY FONT: Open Sans**
**Usage:** Body Text, Descriptions, Subtitles
- `OpenSans-Bold` → Emphasized body text
- `OpenSans-SemiBold` → Strong descriptions
- `OpenSans-Medium` → Medium descriptions
- `OpenSans-Regular` → Regular body text

**Where:**
- Subtitles (16px)
- Descriptions (13-15px)
- Helper text (12-13px)
- Info boxes (13px)

---

### **ACCENT FONT: Poppins**
**Usage:** Cards, Special Elements, Highlights
- `Poppins-Bold` → Card titles
- `Poppins-SemiBold` → Feature highlights
- `Poppins-Medium` → Card content
- `Poppins-Regular` → Special text

**Where:**
- Card headings
- Status badges
- Feature names
- Special sections

---

### **DATA FONT: Roboto**
**Usage:** Numbers, Financial Data, Statistics
- `Roboto-Bold` → Large numbers, prices
- `Roboto-Medium` → Medium numeric data
- `Roboto-Regular` → Regular numbers

**Where:**
- Prices (24px)
- Revenue (20-24px)
- Statistics (18px)
- Account numbers (16px monospace)

---

### **MODERN FONT: Space Grotesk**
**Usage:** Welcome Screens, Modern UI Elements
- `SpaceGrotesk-Bold` → Splash screen, welcome headers
- `SpaceGrotesk-Medium` → Modern headings
- `SpaceGrotesk-Regular` → Clean modern text

**Where:**
- ✅ **Splash Screen** - "MOVA" text
- Get Started page headers
- Modern UI sections
- Tech-focused areas

---

## 📱 CURRENT IMPLEMENTATION

### Screens Updated with Fonts:

✅ **SplashScreen**
- App Name: `SpaceGrotesk-Bold` (42px) ← Modern, bold
- Tagline: `OpenSans-Regular` (14px)
- Footer: `OpenSans-Regular` (12px)

✅ **PersonalDetailsScreen**
- Title: System default (will update)
- Labels: System default (will update)
- Body: System default (will update)

✅ **BusinessDetailsScreen**
- Title: System default (will update)
- Labels: System default (will update)
- Body: System default (will update)

✅ **LocationDetailsScreen**
- Title: System default (will update)
- Labels: System default (will update)
- Body: System default (will update)

✅ **BankDetailsScreen**
- Title: System default (will update)
- Account Numbers: System default monospace (will update to Roboto)
- Body: System default (will update)

✅ **DocumentUploadScreen**
- Title: System default (will update)
- Progress: System default (will update)
- Body: System default (will update)

✅ **RegistrationCompleteScreen**
- Title: System default (will update to Montserrat)
- Body: System default (will update to Open Sans)

✅ **VerificationPendingScreen**
- Title: System default (will update)
- Steps: System default (will update)

---

## 🎨 QUICK USAGE

```typescript
import { FONT_FAMILIES } from '../config/fonts';

// Titles
fontFamily: FONT_FAMILIES.montserrat.bold

// Body Text
fontFamily: FONT_FAMILIES.openSans.regular

// Prices/Numbers
fontFamily: FONT_FAMILIES.roboto.bold

// Special Headers
fontFamily: FONT_FAMILIES.spaceGrotesk.bold
```

---

## ⚡ TEST ON MOBILE

Run this command to test:
```bash
npm start -- --clear
```

The fonts will load automatically on app start!









