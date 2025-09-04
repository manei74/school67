import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
export const STORAGE_KEYS = {
  APP_SETTINGS: 'app_settings',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  SCHEDULE_CACHE: 'schedule_cache',
  NEWS_CACHE: 'news_cache',
  OLYMPIADS_CACHE: 'olympiads_cache',
  HOLIDAYS_CACHE: 'holidays_cache',
} as const;

// Generic storage utilities
export class StorageService {
  static async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Failed to set item ${key}:`, error);
      throw error;
    }
  }

  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const serializedValue = await AsyncStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(`Failed to get item ${key}:`, error);
      return null;
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove item ${key}:`, error);
      throw error;
    }
  }

  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Failed to clear storage:', error);
      throw error;
    }
  }

  // Cache with TTL (Time To Live)
  static async setCacheItem<T>(
    key: string, 
    value: T, 
    ttlMinutes: number = 60
  ): Promise<void> {
    const cacheItem = {
      data: value,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000, // Convert to milliseconds
    };
    await this.setItem(key, cacheItem);
  }

  static async getCacheItem<T>(key: string): Promise<T | null> {
    try {
      const cacheItem = await this.getItem<{
        data: T;
        timestamp: number;
        ttl: number;
      }>(key);
      
      if (!cacheItem) {
        return null;
      }

      const now = Date.now();
      const isExpired = (now - cacheItem.timestamp) > cacheItem.ttl;
      
      if (isExpired) {
        await this.removeItem(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.error(`Failed to get cache item ${key}:`, error);
      return null;
    }
  }
}