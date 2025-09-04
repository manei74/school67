// Environment configuration for the Lyceum 67 app
// This file contains environment-specific settings

export const ENV_CONFIG = {
  // API Configuration
  API_BASE_URL: 'https://school67-backend.onrender.com/api/v1',
  
  // Database settings (from DATABASE_GUIDE.md)
  DATABASE: {
    MONGODB_URI: 'mongodb+srv://maneevnikita_db_user:Qwer123456asd@cluster0.6uahvol.mongodb.net/school-schedule',
    NAME: 'school-schedule'
  },
  
  // App Configuration  
  APP_NAME: 'Лицей №67',
  VERSION: '1.0.0',
  
  // Feature flags
  FEATURES: {
    REAL_API: true, // Enable real API calls instead of mock data
    OFFLINE_MODE: false, // Enable offline data caching
    PUSH_NOTIFICATIONS: true
  },
  
  // External URLs
  WEBSITE_URL: 'https://chel67.ru',
  VK_GROUP_URL: 'https://vk.com/myschool_67', 
  TELEGRAM_CHANNEL_URL: 'https://t.me/licey67'
};

// Development-specific overrides
if (__DEV__) {
  // In development, you can override any settings here
  console.log('🔧 Development mode - API URL:', ENV_CONFIG.API_BASE_URL);
}