// Common types for the Lyceum 67 app

export interface Class {
  id: string;
  title: string;
}

export interface ApiLesson {
  num: number;
  subject: string;
  subjectShort: string;
  teacher: string | null;
  subgroup: string | null;
  room: string;
  startTime: string;
  endTime: string;
}

export interface LessonPart {
  subject: string;
  subjectShort: string;
  teacher: string;
  subgroup?: string;
  room: string;
}

export interface Lesson {
  num: number;
  timeStart: string;
  timeEnd: string;
  parts: LessonPart[];
  subject?: string;
  room?: string;
  teacher?: string;
}

export interface Schedule {
  date: string;
  classId: string;
  classCode: string;
  weekday: number;
  isSchoolDay: boolean;
  lessons: Lesson[];
  lastUpdated: string;
  etag?: string;
}

export interface Bell {
  num: number;
  timeStart: string;
  timeEnd: string;
  type: 'lesson' | 'break';
}

export interface Holiday {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: 'vacation' | 'holiday';
}

export interface AppSettings {
  selectedClassId?: string;
  notificationsEnabled: boolean;
  olympiadNotificationTime: number; // minutes before event
}