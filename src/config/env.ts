// Environment configuration for the Lyceum 67 app
// This file contains environment-specific settings

export const ENV_CONFIG = {
  // API Configuration
  API_BASE_URL: "https://school67-backend-frankfurt.onrender.com/api/v1/",

  // App Configuration
  APP_NAME: "Лицей №67",
  VERSION: "1.0.6",

  // Feature flags
  FEATURES: {
    REAL_API: true, // Enable real API calls instead of mock data
    OFFLINE_MODE: false, // Enable offline data caching
    PUSH_NOTIFICATIONS: true,
  },

  // External URLs
  WEBSITE_URL: "https://chel67.ru",
  VK_GROUP_URL: "https://vk.com/myschool_67",
  TELEGRAM_CHANNEL_URL: "https://t.me/licey67",
};
