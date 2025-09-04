import { create } from 'zustand';
import { AppSettings, Class, Schedule, NewsItem, Olympiad, Holiday } from '../types';

interface AppState {
  // Settings
  settings: AppSettings;
  isOnboardingCompleted: boolean;
  
  // Data
  classes: Class[];
  schedule: Schedule | null;
  weekSchedule: Schedule[];
  news: NewsItem[];
  olympiads: Olympiad[];
  holidays: Holiday[];
  
  // UI State
  isLoading: boolean;
  isOffline: boolean;
  lastSync: Date | null;
  
  // Actions
  initializeApp: () => Promise<void>;
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

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  settings: {
    notificationsEnabled: true,
    olympiadNotificationTime: 120, // 2 hours before
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

  // Initialize app - just use default state for now
  initializeApp: async () => {
    // No external dependencies - just use default state
    console.log('App initialized with default state');
  },

  // Update settings (in-memory only for now)
  updateSettings: (newSettings: Partial<AppSettings>) => {
    const { settings } = get();
    const updatedSettings = { ...settings, ...newSettings };
    set({ settings: updatedSettings });
  },

  // Set selected class
  setSelectedClass: (classId: string) => {
    const { updateSettings } = get();
    updateSettings({ selectedClassId: classId });
  },

  // Complete onboarding
  completeOnboarding: () => {
    set({ isOnboardingCompleted: true });
  },

  // Data setters
  setSchedule: (schedule: Schedule) => set({ schedule }),
  setWeekSchedule: (schedules: Schedule[]) => set({ weekSchedule: schedules }),
  setNews: (news: NewsItem[]) => set({ news }),
  setOlympiads: (olympiads: Olympiad[]) => set({ olympiads }),
  setHolidays: (holidays: Holiday[]) => set({ holidays }),
  
  // UI state setters
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setOfflineStatus: (offline: boolean) => set({ isOffline: offline }),
  updateLastSync: () => set({ lastSync: new Date() }),
}));