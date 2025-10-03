import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { AppSettings, Class, Schedule, Holiday } from '../types';
import { StorageService, STORAGE_KEYS } from '../utils/storage';

interface AppState {
  settings: AppSettings;
  isOnboardingCompleted: boolean;
  classes: Class[];
  schedule: Schedule | null;
  weekSchedule: Schedule[];
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

  const updateSettings = useCallback(async (newSettings: Partial<AppSettings>) => {
    setState(prev => {
      const updatedSettings = { ...prev.settings, ...newSettings };
      
      // Persist to AsyncStorage (don't await in setState)
      StorageService.setItem(STORAGE_KEYS.APP_SETTINGS, updatedSettings)
        .then(() => console.log('📱 Settings saved to storage:', updatedSettings))
        .catch(error => console.error('📱 Error saving settings:', error));
      
      return {
        ...prev,
        settings: updatedSettings
      };
    });
  }, []);

  const setSelectedClass = useCallback(async (classId: string) => {
    setState(prev => {
      const updatedSettings = { ...prev.settings, selectedClassId: classId };
      
      // Persist to AsyncStorage (don't await in setState)
      StorageService.setItem(STORAGE_KEYS.APP_SETTINGS, updatedSettings)
        .then(() => console.log('📱 Selected class saved to storage:', classId))
        .catch(error => console.error('📱 Error saving selected class:', error));
      
      return {
        ...prev,
        settings: updatedSettings
      };
    });
  }, []);

  const completeOnboarding = useCallback(async () => {
    setState(prev => ({ ...prev, isOnboardingCompleted: true }));
    
    // Persist to AsyncStorage
    try {
      await StorageService.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
      console.log('📱 Onboarding completion saved to storage');
    } catch (error) {
      console.error('📱 Error saving onboarding status:', error);
    }
  }, []);

  const resetOnboarding = useCallback(async () => {
    setState(prev => {
      const clearedSettings = { ...prev.settings, selectedClassId: undefined };
      
      // Persist to AsyncStorage (don't await in setState)
      StorageService.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, false)
        .then(() => console.log('📱 Onboarding reset saved to storage'))
        .catch(error => console.error('📱 Error saving onboarding reset:', error));
      
      StorageService.setItem(STORAGE_KEYS.APP_SETTINGS, clearedSettings)
        .then(() => console.log('📱 Settings cleared and saved to storage'))
        .catch(error => console.error('📱 Error saving cleared settings:', error));
      
      return { 
        ...prev, 
        isOnboardingCompleted: false,
        settings: clearedSettings
      };
    });
  }, []);

  const setSchedule = useCallback((schedule: Schedule) => {
    setState(prev => ({ ...prev, schedule }));
  }, []);

  const setWeekSchedule = useCallback((schedules: Schedule[]) => {
    setState(prev => ({ ...prev, weekSchedule: schedules }));
  }, []);

  const setHolidays = useCallback((holidays: Holiday[]) => {
    setState(prev => ({ ...prev, holidays }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  }, []);

  const setOfflineStatus = useCallback((offline: boolean) => {
    setState(prev => ({ ...prev, isOffline: offline }));
  }, []);

  const updateLastSync = useCallback(() => {
    setState(prev => ({ ...prev, lastSync: new Date() }));
  }, []);

  const actions = useMemo(() => ({
    updateSettings,
    setSelectedClass,
    completeOnboarding,
    resetOnboarding,
    setSchedule,
    setWeekSchedule,
    setHolidays,
    setLoading,
    setOfflineStatus,
    updateLastSync,
  }), [
    updateSettings,
    setSelectedClass,
    completeOnboarding,
    resetOnboarding,
    setSchedule,
    setWeekSchedule,
    setHolidays,
    setLoading,
    setOfflineStatus,
    updateLastSync,
  ]);

  const contextValue = useMemo(() => ({
    ...state,
    ...actions
  }), [state, actions]);

  console.log('🏪 AppProvider rendering context with actions');
  
  return (
    <AppContext.Provider value={contextValue}>
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