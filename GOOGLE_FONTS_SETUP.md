# Google Fonts Setup Guide for Mova Vendor App

## 📋 Overview
This guide will help you download and implement 5 professional Google Fonts for the Mova car rental vendor application.

---

## 🎨 Selected Fonts

### 1. **Montserrat** (Primary - Headings & Buttons)
- **Use:** Page titles, section headers, button text, important labels
- **Weights:** Regular (400), Medium (500), SemiBold (600), Bold (700)
- **Download:** https://fonts.google.com/specimen/Montserrat

### 2. **Open Sans** (Secondary - Body Text)
- **Use:** Body text, descriptions, subtitles, helper text
- **Weights:** Regular (400), Medium (500), SemiBold (600), Bold (700)
- **Download:** https://fonts.google.com/specimen/Open+Sans

### 3. **Poppins** (Accent - Special Elements)
- **Use:** Card titles, feature highlights, special sections
- **Weights:** Regular (400), Medium (500), SemiBold (600), Bold (700)
- **Download:** https://fonts.google.com/specimen/Poppins

### 4. **Roboto** (Numbers & Data)
- **Use:** Prices, numbers, financial data, statistics
- **Weights:** Regular (400), Medium (500), Bold (700)
- **Download:** https://fonts.google.com/specimen/Roboto

### 5. **Space Grotesk** (Alternative - Modern)
- **Use:** Alternative headings, modern UI elements
- **Weights:** Regular (400), Medium (500), Bold (700)
- **Download:** https://fonts.google.com/specimen/Space+Grotesk

---

## 📥 Step-by-Step Download Instructions

### Step 1: Download Each Font

1. Visit Google Fonts: https://fonts.google.com/

2. For each font family:
   - Search for the font name (e.g., "Montserrat")
   - Click "Download family" button (top-right corner)
   - Save the ZIP file to your Downloads folder

3. Extract each ZIP file

### Step 2: Locate the TTF Files

Inside each extracted folder, navigate to:
```
static/
└── (Find the .ttf files you need)
```

**Required files for each font:**

#### Montserrat:
- `Montserrat-Regular.ttf`
- `Montserrat-Medium.ttf`
- `Montserrat-SemiBold.ttf`
- `Montserrat-Bold.ttf`

#### Open Sans:
- `OpenSans-Regular.ttf`
- `OpenSans-Medium.ttf`
- `OpenSans-SemiBold.ttf`
- `OpenSans-Bold.ttf`

#### Poppins:
- `Poppins-Regular.ttf`
- `Poppins-Medium.ttf`
- `Poppins-SemiBold.ttf`
- `Poppins-Bold.ttf`

#### Roboto:
- `Roboto-Regular.ttf`
- `Roboto-Medium.ttf`
- `Roboto-Bold.ttf`

#### Space Grotesk:
- `SpaceGrotesk-Regular.ttf`
- `SpaceGrotesk-Medium.ttf`
- `SpaceGrotesk-Bold.ttf`

### Step 3: Create Fonts Directory Structure

Navigate to your project:
```
D:\mova-platform\src\assets\fonts\
```

Create the following folders:
```
fonts/
├── Montserrat/
├── Inter/
├── Poppins/
├── Roboto/
└── SpaceGrotesk/
```

### Step 4: Copy Font Files

Copy the `.ttf` files to their respective folders:

```
src/assets/fonts/
├── Montserrat/
│   ├── Montserrat-Regular.ttf
│   ├── Montserrat-Medium.ttf
│   ├── Montserrat-SemiBold.ttf
│   └── Montserrat-Bold.ttf
├── OpenSans/
│   ├── OpenSans-Regular.ttf
│   ├── OpenSans-Medium.ttf
│   ├── OpenSans-SemiBold.ttf
│   └── OpenSans-Bold.ttf
├── Poppins/
│   ├── Poppins-Regular.ttf
│   ├── Poppins-Medium.ttf
│   ├── Poppins-SemiBold.ttf
│   └── Poppins-Bold.ttf
├── Roboto/
│   ├── Roboto-Regular.ttf
│   ├── Roboto-Medium.ttf
│   └── Roboto-Bold.ttf
└── SpaceGrotesk/
    ├── SpaceGrotesk-Regular.ttf
    ├── SpaceGrotesk-Medium.ttf
    └── SpaceGrotesk-Bold.ttf
```

**Total files to copy: 19 font files**

---

## 🔧 Implementation (Already Done)

I've already created the following files for you:

### 1. **src/config/fonts.ts**
- Font families configuration
- Font files mapping with require statements
- Usage guide

### 2. **src/hooks/useFonts.ts**
- Custom hook to load fonts
- Error handling
- Loading state management

### 3. **App.tsx** (Updated)
- Integrated font loading hook
- Shows loading indicator while fonts load
- Prevents app from rendering until fonts are ready

---

## ✅ Verification Steps

### After copying font files:

1. **Check file structure:**
   ```bash
   ls src/assets/fonts/Montserrat/
   # Should show: 4 .ttf files
   ```

2. **Install expo-font** (if not already installed):
   ```bash
   npm install expo-font
   ```

3. **Clear Metro bundler cache:**
   ```bash
   npm start -- --clear
   ```

4. **Run the app:**
   ```bash
   npm run android
   # or
   npm run ios
   ```

---

## 🎨 How to Use Fonts in Your Components

### Example Usage:

```typescript
import { FONT_FAMILIES } from '../config/fonts';

const styles = StyleSheet.create({
  title: {
    fontFamily: FONT_FAMILIES.montserrat.bold,
    fontSize: 32,
    color: '#00242C',
  },
  bodyText: {
    fontFamily: FONT_FAMILIES.openSans.regular,
    fontSize: 15,
    color: '#666666',
  },
  price: {
    fontFamily: FONT_FAMILIES.roboto.bold,
    fontSize: 24,
    color: '#00242C',
  },
  button: {
    fontFamily: FONT_FAMILIES.montserrat.semibold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
```

---

## 📦 Quick Download Links

### Direct Google Fonts Links:

1. **Montserrat:** https://fonts.google.com/specimen/Montserrat
2. **Open Sans:** https://fonts.google.com/specimen/Open+Sans
3. **Poppins:** https://fonts.google.com/specimen/Poppins
4. **Roboto:** https://fonts.google.com/specimen/Roboto
5. **Space Grotesk:** https://fonts.google.com/specimen/Space+Grotesk

---

## 🎯 Font Usage Recommendations

### **Montserrat** → Headings & Buttons
```
✓ Screen titles
✓ Section headers
✓ Button labels
✓ Navigation items
```

### **Open Sans** → Body Content
```
✓ Paragraph text
✓ Descriptions
✓ Form labels
✓ Helper text
```

### **Poppins** → Accent Elements
```
✓ Card titles
✓ Feature badges
✓ Status labels
✓ Tags
```

### **Roboto** → Numeric Data
```
✓ Prices
✓ Revenue numbers
✓ Statistics
✓ Phone numbers
```

### **Space Grotesk** → Modern Elements
```
✓ Alternative headers
✓ Tech sections
✓ Modern cards
```

---

## ⚠️ Important Notes

1. **Exact File Names:** Ensure file names match exactly (case-sensitive)
2. **File Format:** Only use `.ttf` files (TrueType Font)
3. **File Size:** Each font file is ~50-200KB
4. **Total Size:** All fonts together ~2-3MB
5. **Loading Time:** Fonts load asynchronously on app start

---

## 🐛 Troubleshooting

### Font not loading?
1. Check file path is correct
2. Ensure exact file name match
3. Clear Metro cache: `npm start -- --clear`
4. Restart development server

### App crashes on start?
1. Check console for error messages
2. Verify all font files exist
3. Check `src/config/fonts.ts` paths

### Font appears as system default?
1. Font file might be corrupted
2. Re-download from Google Fonts
3. Check file extension is `.ttf`

---

## ✨ Next Steps

1. Download all 5 font families from Google Fonts
2. Create the folder structure in `src/assets/fonts/`
3. Copy all 19 `.ttf` files to their respective folders
4. Run `npm start -- --clear`
5. Test the app - fonts will load automatically!

The configuration is already done - you just need to add the font files! 🚀
