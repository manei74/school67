import {
  MOCK_HOLIDAYS,
  getNextHoliday,
} from "../data/mockData";
import { Class, Holiday, Schedule, ApiLesson } from "../types";
import { ENV_CONFIG } from "../config/env";
import { StorageService, STORAGE_KEYS } from "../utils/storage";

// API Service class
class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = ENV_CONFIG.API_BASE_URL) {
    this.baseUrl = baseUrl;
    console.log('🔗 API Service initialized with URL:', this.baseUrl);
  }

  // Health check to verify API connectivity
  async healthCheck(): Promise<{ status: string; timestamp: string; uptime?: number }> {
    try {
      console.log('🔍 API: Checking health at', this.baseUrl);
      const response = await fetch(`${this.baseUrl.replace('/api/v1', '')}/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status} ${response.statusText}`);
      }

      const health = await response.json();
      console.log('✅ API: Health check passed', health);
      return health;
    } catch (error) {
      console.warn('⚠️ API: Health check failed', error);
      return { status: 'unhealthy', timestamp: new Date().toISOString() };
    }
  }

  // Simulate network delay for fallback mock data
  private async delay(ms: number = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Classes API
  async getClasses(): Promise<Class[]> {
    console.log("🔗 API: getClasses called");
    try {
      // Try to fetch from real API first
      const response = await fetch(`${this.baseUrl}/classes`);

      if (response.ok) {
        const apiClasses = await response.json();
        console.log("🔗 API: getClasses from API returning", apiClasses.length, "classes");

        // Map API response to our Class format
        const mappedClasses = apiClasses.map((apiClass: any) => ({
          id: apiClass.code || apiClass._id || apiClass.id || apiClass.classId,
          title: apiClass.title || apiClass.name || `${apiClass.grade}${apiClass.letter}` || 'Unknown'
        }));

        return mappedClasses;
      }

      // Fallback to hardcoded classes if API fails
      const classes: Class[] = [
        { id: "5a", title: "5А" },
        { id: "5b", title: "5Б" },
        { id: "5v", title: "5В" },
        { id: "6a", title: "6А" },
        { id: "6b", title: "6Б" },
        { id: "6v", title: "6В" },
        { id: "7a", title: "7А" },
        { id: "7b", title: "7Б" },
        { id: "7v", title: "7В" },
        { id: "8a", title: "8А" },
        { id: "8b", title: "8Б" },
        { id: "8v", title: "8В" },
        { id: "9a", title: "9А" },
        { id: "9b", title: "9Б" },
        { id: "9v", title: "9В" },
        { id: "10a", title: "10А" },
        { id: "10b", title: "10Б" },
        { id: "11a", title: "11А" }
      ];
      console.log("🔗 API: getClasses fallback returning", classes.length, "classes");
      return classes;
    } catch (error) {
      console.error('Failed to load classes:', error);
      // Minimal fallback
      return [
        { id: "8a", title: "8А" },
        { id: "8b", title: "8Б" },
        { id: "9a", title: "9А" },
        { id: "10a", title: "10А" },
        { id: "11a", title: "11А" }
      ];
    }
  }

  // Schedule API
  async getSchedule(classId: string, date: string): Promise<Schedule> {
    console.log(`🔗 API: getSchedule called for ${classId} on ${date}`);

    // First try to get from cache
    const cacheKey = `${STORAGE_KEYS.SCHEDULE_CACHE}_${classId}_${date}`;

    try {
      const response = await fetch(`${this.baseUrl}/schedule?classId=${classId}&date=${date}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`🔗 API: getSchedule received ${data.lessons.length} lessons`);

      // Group lessons by number to handle subgroups
      const lessonGroups = new Map<number, ApiLesson[]>();
      data.lessons.forEach((apiLesson: ApiLesson) => {
        if (!lessonGroups.has(apiLesson.num)) {
          lessonGroups.set(apiLesson.num, []);
        }
        lessonGroups.get(apiLesson.num)!.push(apiLesson);
      });

      // Transform grouped lessons to our interface
      const lessons = Array.from(lessonGroups.entries()).map(([num, apiLessons]) => {
        const firstLesson = apiLessons[0];
        return {
          num,
          timeStart: firstLesson.startTime,
          timeEnd: firstLesson.endTime,
          parts: apiLessons.map(apiLesson => ({
            subject: apiLesson.subject,
            subjectShort: apiLesson.subjectShort,
            teacher: apiLesson.teacher || '',
            subgroup: apiLesson.subgroup || undefined,
            room: apiLesson.room
          })),
          // For backward compatibility, use first lesson as primary
          subject: firstLesson.subject,
          teacher: firstLesson.teacher || '',
          room: firstLesson.room
        };
      }).sort((a, b) => a.num - b.num);

      const schedule: Schedule = {
        date: data.date,
        classId: data.classId,
        classCode: data.classCode,
        weekday: data.weekday,
        isSchoolDay: data.isSchoolDay,
        lessons,
        lastUpdated: data.lastUpdated,
        etag: data.etag
      };

      // Cache the successful response
      await StorageService.setCacheItem(cacheKey, schedule, 24 * 60); // Cache for 24 hours
      console.log('💾 Schedule cached successfully');

      return schedule;
    } catch (error) {
      console.error('Failed to load schedule from API:', error);

      // Try to get from cache when API fails
      const cachedSchedule = await StorageService.getCacheItem<Schedule>(cacheKey);
      if (cachedSchedule) {
        console.log('📱 Using cached schedule data');
        return cachedSchedule;
      }

      // If no cached data, throw error to let UI handle "no data" state
      console.log('❌ No cached data available, throwing error');
      throw new Error('No internet connection and no cached data available');
    }
  }

  async getWeekSchedule(classId: string, week: string): Promise<Schedule[]> {
    console.log(`🔗 API: getWeekSchedule called for ${classId}, week ${week}`);

    const cacheKey = `${STORAGE_KEYS.SCHEDULE_CACHE}_week_${classId}_${week}`;

    try {
      // Convert week format (YYYY-WXX) to a date from that week
      const weekDate = this.getDateFromWeek(week);
      const response = await fetch(`${this.baseUrl}/schedule/week?classId=${classId}&date=${weekDate}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`🔗 API: getWeekSchedule received ${data.days.length} days`);

      // Transform the API response to match our interface
      const weekSchedule: Schedule[] = data.days.map((day: any) => {
        // Group lessons by number to handle subgroups
        const lessonGroups = new Map<number, ApiLesson[]>();
        day.lessons.forEach((apiLesson: ApiLesson) => {
          if (!lessonGroups.has(apiLesson.num)) {
            lessonGroups.set(apiLesson.num, []);
          }
          lessonGroups.get(apiLesson.num)!.push(apiLesson);
        });

        // Transform grouped lessons
        const lessons = Array.from(lessonGroups.entries()).map(([num, apiLessons]) => {
          const firstLesson = apiLessons[0];
          return {
            num,
            timeStart: firstLesson.startTime,
            timeEnd: firstLesson.endTime,
            parts: apiLessons.map(apiLesson => ({
              subject: apiLesson.subject,
              subjectShort: apiLesson.subjectShort,
              teacher: apiLesson.teacher || '',
              subgroup: apiLesson.subgroup || undefined,
              room: apiLesson.room
            })),
            subject: firstLesson.subject,
            teacher: firstLesson.teacher || '',
            room: firstLesson.room
          };
        }).sort((a, b) => a.num - b.num);

        return {
          date: day.date,
          classId: data.classId,
          classCode: day.classCode || data.classCode || classId,
          weekday: day.weekday,
          isSchoolDay: day.isSchoolDay,
          lessons,
          lastUpdated: data.lastUpdated,
          etag: data.etag
        };
      });

      // Cache the successful response
      await StorageService.setCacheItem(cacheKey, weekSchedule, 24 * 60); // Cache for 24 hours
      console.log('💾 Week schedule cached successfully');

      return weekSchedule;
    } catch (error) {
      console.error('Failed to load week schedule from API:', error);

      // Try to get from cache when API fails
      const cachedWeekSchedule = await StorageService.getCacheItem<Schedule[]>(cacheKey);
      if (cachedWeekSchedule) {
        console.log('📱 Using cached week schedule data');
        return cachedWeekSchedule;
      }

      // If no cached data, throw error to let UI handle "no data" state
      console.log('❌ No cached week schedule available, throwing error');
      throw new Error('No internet connection and no cached data available');
    }
  }

  private getDateFromWeek(week: string): string {
    // Convert format "2025-W36" to a Monday date of that week
    const [yearStr, weekStr] = week.split('-W');
    const year = parseInt(yearStr);
    const weekNumber = parseInt(weekStr);

    // Calculate the Monday of the given week
    const jan1 = new Date(year, 0, 1);
    const jan1DayOfWeek = jan1.getDay() || 7; // Make Sunday = 7

    // Find the Monday of week 1
    const firstMonday = new Date(year, 0, 1 + (8 - jan1DayOfWeek) % 7);

    // Add weeks to get to target week
    const targetMonday = new Date(firstMonday);
    targetMonday.setDate(firstMonday.getDate() + (weekNumber - 1) * 7);

    return targetMonday.toISOString().split('T')[0];
  }

  // Bells API
  async getBells(): Promise<any[]> {
    console.log('🔗 API: getBells called');
    try {
      // Return the bell schedule from DATABASE_GUIDE.md with breaks
      const lessons = [
        { num: 1, timeStart: "08:30", timeEnd: "09:10", type: "lesson" as const },
        { num: 2, timeStart: "09:20", timeEnd: "10:00", type: "lesson" as const },
        { num: 3, timeStart: "10:10", timeEnd: "10:50", type: "lesson" as const },
        { num: 4, timeStart: "11:10", timeEnd: "11:50", type: "lesson" as const },
        { num: 5, timeStart: "12:10", timeEnd: "12:50", type: "lesson" as const },
        { num: 6, timeStart: "13:05", timeEnd: "13:45", type: "lesson" as const },
        { num: 7, timeStart: "14:00", timeEnd: "14:40", type: "lesson" as const },
        { num: 8, timeStart: "15:00", timeEnd: "15:40", type: "lesson" as const },
        { num: 9, timeStart: "15:50", timeEnd: "16:30", type: "lesson" as const },
        { num: 10, timeStart: "16:40", timeEnd: "17:20", type: "lesson" as const },
        { num: 11, timeStart: "17:30", timeEnd: "18:10", type: "lesson" as const },
        { num: 12, timeStart: "18:20", timeEnd: "19:00", type: "lesson" as const }
      ];

      // Add breaks between lessons
      const breaks = [
        { num: 1, timeStart: "09:10", timeEnd: "09:20", type: "break" as const },
        { num: 2, timeStart: "10:00", timeEnd: "10:10", type: "break" as const },
        { num: 3, timeStart: "10:50", timeEnd: "11:10", type: "break" as const }, // Big break
        { num: 4, timeStart: "11:50", timeEnd: "12:10", type: "break" as const }, // Big break
        { num: 5, timeStart: "12:50", timeEnd: "13:05", type: "break" as const },
        { num: 6, timeStart: "13:45", timeEnd: "14:00", type: "break" as const },
        { num: 7, timeStart: "14:40", timeEnd: "15:00", type: "break" as const }, // Big break
        { num: 8, timeStart: "15:40", timeEnd: "15:50", type: "break" as const },
        { num: 9, timeStart: "16:30", timeEnd: "16:40", type: "break" as const },
        { num: 10, timeStart: "17:20", timeEnd: "17:30", type: "break" as const },
        { num: 11, timeStart: "18:10", timeEnd: "18:20", type: "break" as const }
      ];

      const bells = [...lessons, ...breaks];
      console.log(`🔗 API: getBells returning ${bells.length} periods (${lessons.length} lessons, ${breaks.length} breaks)`);
      return bells;
    } catch (error) {
      console.error('Failed to load bells:', error);
      // Minimal fallback
      return [
        { num: 1, timeStart: "08:30", timeEnd: "09:10", type: "lesson" as const },
        { num: 2, timeStart: "09:20", timeEnd: "10:00", type: "lesson" as const },
        { num: 3, timeStart: "10:10", timeEnd: "10:50", type: "lesson" as const },
        { num: 4, timeStart: "11:10", timeEnd: "11:50", type: "lesson" as const },
        { num: 5, timeStart: "12:10", timeEnd: "12:50", type: "lesson" as const },
        { num: 6, timeStart: "13:05", timeEnd: "13:45", type: "lesson" as const }
      ];
    }
  }

  // Calendar API
  async getHolidays(): Promise<Holiday[]> {
    await this.delay(400);
    return MOCK_HOLIDAYS;
  }

  async getNextHoliday(): Promise<Holiday | null> {
    await this.delay(300);
    return getNextHoliday();
  }
}

export const apiService = new ApiService();
