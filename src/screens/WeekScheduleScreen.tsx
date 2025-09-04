import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppStore } from '../store/simpleStore';
import { apiService } from '../services/api';
import { Schedule } from '../types';

// Bell schedule is now provided by the API with each lesson

export default function WeekScheduleScreen() {
  const { settings, weekSchedule, isLoading, setWeekSchedule, setLoading } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (settings.selectedClassId) {
      loadWeekSchedule();
    }
  }, [settings.selectedClassId]);

  const loadWeekSchedule = async () => {
    if (!settings.selectedClassId) return;
    
    setLoading(true);
    try {
      const currentWeek = getCurrentWeek();
      const schedules = await apiService.getWeekSchedule(settings.selectedClassId, currentWeek);
      setWeekSchedule(schedules);
    } catch (error) {
      console.error('Failed to load week schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWeekSchedule();
    setRefreshing(false);
  };

  const getCurrentWeek = () => {
    const now = new Date();
    const week = getWeekNumber(now);
    return `${now.getFullYear()}-W${week.toString().padStart(2, '0')}`;
  };

  const getWeekNumber = (date: Date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
  };

  const formatLessonTime = (timeStart: string, timeEnd: string) => {
    return `${timeStart}–${timeEnd}`;
  };

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[date.getDay()];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long' 
    });
  };

  if (!settings.selectedClassId) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.emptyState}>
          <ThemedText>Необходимо выбрать класс в настройках</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ThemedView style={styles.loadingContainer}>
            <ThemedText>Загрузка расписания...</ThemedText>
          </ThemedView>
        ) : weekSchedule.length > 0 ? (
          <ThemedView style={styles.scheduleContainer}>
            {weekSchedule.map((daySchedule) => (
              <ThemedView key={daySchedule.date} style={styles.dayCard}>
                <ThemedView style={styles.dayHeader}>
                  <ThemedText type="defaultSemiBold" style={styles.dayName}>
                    {getDayName(daySchedule.date)}
                  </ThemedText>
                  <ThemedText style={styles.dayDate}>
                    {formatDate(daySchedule.date)}
                  </ThemedText>
                </ThemedView>
                
                {daySchedule.lessons.length > 0 ? (
                  <ThemedView style={styles.lessonsContainer}>
                    {daySchedule.lessons.map((lesson) => (
                      <ThemedView key={lesson.num} style={styles.lessonRow}>
                        <ThemedText style={styles.lessonNumber}>
                          {lesson.num}
                        </ThemedText>
                        <ThemedView style={styles.lessonInfo}>
                          {/* Handle lessons with multiple parts (subgroups) */}
                          {lesson.parts && lesson.parts.length > 0 ? (
                            lesson.parts.map((part, index) => (
                              <View key={index} style={lesson.parts.length > 1 ? styles.lessonPart : undefined}>
                                {lesson.parts.length > 1 && part.subgroup && (
                                  <ThemedText style={styles.subgroupLabel}>{part.subgroup}</ThemedText>
                                )}
                                <ThemedText type="defaultSemiBold" style={styles.lessonSubject}>
                                  {part.subject}
                                </ThemedText>
                                <ThemedText style={styles.lessonDetails}>
                                  {formatLessonTime(lesson.timeStart, lesson.timeEnd)} • {part.room || 'не указан'}
                                </ThemedText>
                                {part.teacher && (
                                  <ThemedText style={styles.lessonTeacher}>
                                    {part.teacher}
                                  </ThemedText>
                                )}
                              </View>
                            ))
                          ) : (
                            // Fallback for lessons without parts
                            <>
                              <ThemedText type="defaultSemiBold" style={styles.lessonSubject}>
                                {lesson.subject || 'Предмет не указан'}
                              </ThemedText>
                              <ThemedText style={styles.lessonDetails}>
                                {formatLessonTime(lesson.timeStart, lesson.timeEnd)} • {lesson.room || 'не указан'}
                              </ThemedText>
                              {lesson.teacher && (
                                <ThemedText style={styles.lessonTeacher}>
                                  {lesson.teacher}
                                </ThemedText>
                              )}
                            </>
                          )}
                        </ThemedView>
                      </ThemedView>
                    ))}
                  </ThemedView>
                ) : (
                  <ThemedText style={styles.noLessons}>Нет уроков</ThemedText>
                )}
              </ThemedView>
            ))}
          </ThemedView>
        ) : (
          <ThemedView style={styles.emptyState}>
            <ThemedText>Расписание на неделю не найдено</ThemedText>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  scheduleContainer: {
    padding: 16,
  },
  dayCard: {
    backgroundColor: '#f8f9fa',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayHeader: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayName: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dayDate: {
    color: '#FFFFFF',
    opacity: 0.9,
    fontSize: 14,
  },
  lessonsContainer: {
    padding: 16,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  lessonNumber: {
    backgroundColor: '#007AFF',
    color: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    minWidth: 28,
    textAlign: 'center',
    marginRight: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonSubject: {
    marginBottom: 4,
  },
  lessonDetails: {
    color: '#666',
    fontSize: 14,
    marginBottom: 2,
  },
  lessonTeacher: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
  noLessons: {
    textAlign: 'center',
    color: '#666',
    padding: 16,
    fontStyle: 'italic',
  },
  lessonPart: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  subgroupLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
});