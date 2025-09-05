import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppSettings, Class, Schedule, Olympiad, Holiday } from '../types';
import { StorageService, STORAGE_KEYS } from '../utils/storage';

interface AppState {
  settings: AppSettings;
  isOnboardingCompleted: boolean;
  classes: Class[];
  schedule: Schedule | null;
  weekSchedule: Schedule[];
  olympiads: Olympiad[];
  holidays: Holiday[];
  isLoading: boolean;
  isOffline: boolean;
  lastSync: Date | null;
}

interface AppActions {
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>;
  setSelectedClass: (classId: string) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  setSchedule: (schedule: Schedule) => void;
  setWeekSchedule: (schedules: Schedule[]) => void;
  setOlympiads: (olympiads: Olympiad[]) => void;
  setHolidays: (holidays: Holiday[]) => void;
  setLoading: (loading: boolean) => void;
  setOfflineStatus: (offline: boolean) => void;
  updateLastSync: () => void;
}

type AppContextType = AppState & AppActions;

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  console.log('🏪 AppProvider initializing');
  
  const [state, setState] = useState<AppState>({
    settings: {
      notificationsEnabled: true,
      olympiadNotificationTime: 120,
    },
    isOnboardingCompleted: false,
    classes: [],
    schedule: null,
    weekSchedule: [],
    olympiads: [],
    holidays: [],
    isLoading: false,
    isOffline: false,
    lastSync: null,
  });

  // Load persisted data on initialization
  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        console.log('📱 Loading persisted data...');
        
        // Load settings
        const savedSettings = await StorageService.getItem<AppSettings>(STORAGE_KEYS.APP_SETTINGS);
        if (savedSettings) {
          console.log('📱 Loaded settings:', savedSettings);
          setState(prev => ({
            ...prev,
            settings: { ...prev.settings, ...savedSettings }
          }));
        }

        // Load onboarding status
        const onboardingCompleted = await StorageService.getItem<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETED);
        if (onboardingCompleted !== null) {
          console.log('📱 Loaded onboarding status:', onboardingCompleted);
          setState(prev => ({
            ...prev,
            isOnboardingCompleted: onboardingCompleted
          }));
        }
      } catch (error) {
        console.error('📱 Error loading persisted data:', error);
      }
    };

    loadPersistedData();
  }, []);

  console.log('🏪 AppProvider state:', state);

  const actions: AppActions = {
    updateSettings: async (newSettings: Partial<AppSettings>) => {
      const updatedSettings = { ...state.settings, ...newSettings };
      setState(prev => ({
        ...prev,
        settings: updatedSettings
      }));
      // Persist to AsyncStorage
      try {
        await StorageService.setItem(STORAGE_KEYS.APP_SETTINGS, updatedSettings);
        console.log('📱 Settings saved to storage:', updatedSettings);
      } catch (error) {
        console.error('📱 Error saving settings:', error);
      }
    },

    setSelectedClass: async (classId: string) => {
      const updatedSettings = { ...state.settings, selectedClassId: classId };
      setState(prev => ({
        ...prev,
        settings: updatedSettings
      }));
      // Persist to AsyncStorage
      try {
        await StorageService.setItem(STORAGE_KEYS.APP_SETTINGS, updatedSettings);
        console.log('📱 Selected class saved to storage:', classId);
      } catch (error) {
        console.error('📱 Error saving selected class:', error);
      }
    },

    completeOnboarding: async () => {
      setState(prev => ({ ...prev, isOnboardingCompleted: true }));
      // Persist to AsyncStorage
      try {
        await StorageService.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
        console.log('📱 Onboarding completion saved to storage');
      } catch (error) {
        console.error('📱 Error saving onboarding status:', error);
      }
    },

    resetOnboarding: async () => {
      const clearedSettings = { ...state.settings, selectedClassId: undefined };
      setState(prev => ({ 
        ...prev, 
        isOnboardingCompleted: false,
        settings: clearedSettings
      }));
      // Persist to AsyncStorage
      try {
        await StorageService.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, false);
        await StorageService.setItem(STORAGE_KEYS.APP_SETTINGS, clearedSettings);
        console.log('📱 Onboarding reset and settings cleared');
      } catch (error) {
        console.error('📱 Error resetting onboarding:', error);
      }
    },

    setSchedule: (schedule: Schedule) => {
      setState(prev => ({ ...prev, schedule }));
    },

    setWeekSchedule: (schedules: Schedule[]) => {
      setState(prev => ({ ...prev, weekSchedule: schedules }));
    },

    setOlympiads: (olympiads: Olympiad[]) => {
      setState(prev => ({ ...prev, olympiads }));
    },

    setHolidays: (holidays: Holiday[]) => {
      setState(prev => ({ ...prev, holidays }));
    },

    setLoading: (loading: boolean) => {
      setState(prev => ({ ...prev, isLoading: loading }));
    },

    setOfflineStatus: (offline: boolean) => {
      setState(prev => ({ ...prev, isOffline: offline }));
    },

    updateLastSync: () => {
      setState(prev => ({ ...prev, lastSync: new Date() }));
    },
  };

  console.log('🏪 AppProvider rendering context with actions');
  
  return (
    <AppContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};