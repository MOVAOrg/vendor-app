const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure the main entry point is properly resolved
config.resolver.mainFields = ['react-native', 'browser', 'main'];

module.exports = config;

