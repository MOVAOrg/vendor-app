/**
 * Font Configuration
 * Central configuration for all Google Fonts used in the Mova Vendor App
 */

export const FONT_FAMILIES = {
  // Primary Font - Montserrat (Headings, Buttons, Important Text)
  montserrat: {
    regular: 'Montserrat-Regular',
    medium: 'Montserrat-Medium',
    semibold: 'Montserrat-SemiBold',
    bold: 'Montserrat-Bold',
  },

  // Secondary Font - Open Sans (Body Text, Descriptions)
  openSans: {
    regular: 'OpenSans-Regular',
    medium: 'OpenSans-Medium',
    semibold: 'OpenSans-SemiBold',
    bold: 'OpenSans-Bold',
  },

  // Accent Font - Poppins (Special Elements, Cards)
  poppins: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semibold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },

  // Data Font - Roboto (Numbers, Financial Data)
  roboto: {
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
  },

  // Alternative Font - Space Grotesk (Modern Touch)
  spaceGrotesk: {
    regular: 'SpaceGrotesk-Regular',
    medium: 'SpaceGrotesk-Medium',
    bold: 'SpaceGrotesk-Bold',
  },

  // Legacy aliases for backward compatibility
  primary: 'Montserrat-Bold',
  secondary: 'OpenSans-Regular',
};

/**
 * Font Files Mapping
 * Maps font family names to their file paths
 */
export const FONT_FILES = {
  // Montserrat
  'Montserrat-Regular': require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
  'Montserrat-Medium': require('../assets/fonts/Montserrat/Montserrat-Medium.ttf'),
  'Montserrat-SemiBold': require('../assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
  'Montserrat-Bold': require('../assets/fonts/Montserrat/Montserrat-Bold.ttf'),

  // Open Sans
  'OpenSans-Regular': require('../assets/fonts/Opensans/OpenSans-Regular.ttf'),
  'OpenSans-Medium': require('../assets/fonts/Opensans/OpenSans-Medium.ttf'),
  'OpenSans-SemiBold': require('../assets/fonts/Opensans/OpenSans-SemiBold.ttf'),
  'OpenSans-Bold': require('../assets/fonts/Opensans/OpenSans-Bold.ttf'),

  // Poppins
  'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
  'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
  'Poppins-SemiBold': require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
  'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),

  // Roboto
  'Roboto-Regular': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
  'Roboto-Medium': require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
  'Roboto-Bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),

  // Space Grotesk
  'SpaceGrotesk-Regular': require('../assets/fonts/SpaceGrotesk/SpaceGrotesk-Regular.ttf'),
  'SpaceGrotesk-Medium': require('../assets/fonts/SpaceGrotesk/SpaceGrotesk-Medium.ttf'),
  'SpaceGrotesk-Bold': require('../assets/fonts/SpaceGrotesk/SpaceGrotesk-Bold.ttf'),
};

/**
 * Font Usage Guide
 *
 * Montserrat:
 * - Page titles
 * - Section headings
 * - Button text
 * - Important labels
 *
 * Open Sans:
 * - Body text
 * - Descriptions
 * - Subtitles
 * - Helper text
 *
 * Poppins:
 * - Card titles
 * - Feature highlights
 * - Special sections
 *
 * Roboto:
 * - Prices
 * - Numbers
 * - Financial data
 * - Statistics
 *
 * Space Grotesk:
 * - Alternative headings
 * - Modern UI elements
 * - Tech-focused sections
 */
