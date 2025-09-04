import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppSettings, Class, Schedule, NewsItem, Olympiad, Holiday } from '../types';

interface AppState {
  settings: AppSettings;
  isOnboardingCompleted: boolean;
  classes: Class[];
  schedule: Schedule | null;
  weekSchedule: Schedule[];
  news: NewsItem[];
  olympiads: Olympiad[];
  holidays: Holiday[];
  isLoading: boolean;
  isOffline: boolean;
  lastSync: Date | null;
}

interface AppActions {
  updateSettings: (settings: Partial<AppSettings>) => void;
  setSelectedClass: (classId: string) => void;
  completeOnboarding: () => void;
  setSchedule: (schedule: Schedule) => void;
  setWeekSchedule: (schedules: Schedule[]) => void;
  setNews: (news: NewsItem[]) => void;
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
    news: [],
    olympiads: [],
    holidays: [],
    isLoading: false,
    isOffline: false,
    lastSync: null,
  });

  console.log('🏪 AppProvider state:', state);

  const actions: AppActions = {
    updateSettings: (newSettings: Partial<AppSettings>) => {
      setState(prev => ({
        ...prev,
        settings: { ...prev.settings, ...newSettings }
      }));
    },

    setSelectedClass: (classId: string) => {
      setState(prev => ({
        ...prev,
        settings: { ...prev.settings, selectedClassId: classId }
      }));
    },

    completeOnboarding: () => {
      setState(prev => ({ ...prev, isOnboardingCompleted: true }));
    },

    setSchedule: (schedule: Schedule) => {
      setState(prev => ({ ...prev, schedule }));
    },

    setWeekSchedule: (schedules: Schedule[]) => {
      setState(prev => ({ ...prev, weekSchedule: schedules }));
    },

    setNews: (news: NewsItem[]) => {
      setState(prev => ({ ...prev, news }));
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