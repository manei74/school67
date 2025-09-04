import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { apiService } from '../services/api';
import { Bell } from '../types';

export default function BellsScreen() {
  const [bells, setBells] = useState<Bell[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadBells();
  }, []);

  const loadBells = async () => {
    setIsLoading(true);
    try {
      const bellsData = await apiService.getBells();
      setBells(bellsData);
    } catch (error) {
      console.error('Failed to load bells:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBells();
    setRefreshing(false);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // HH:MM format
  };

  const isCurrentPeriod = (bell: Bell, index: number, bells: Bell[]) => {
    const currentTime = getCurrentTime();
    const currentTimeMinutes = timeToMinutes(currentTime);
    const startTimeMinutes = timeToMinutes(bell.timeStart);
    const endTimeMinutes = timeToMinutes(bell.timeEnd);
    
    return currentTimeMinutes >= startTimeMinutes && currentTimeMinutes <= endTimeMinutes;
  };

  const timeToMinutes = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getNextPeriod = () => {
    const currentTime = getCurrentTime();
    const currentTimeMinutes = timeToMinutes(currentTime);
    
    for (const bell of bells) {
      const startTimeMinutes = timeToMinutes(bell.timeStart);
      if (startTimeMinutes > currentTimeMinutes) {
        return bell;
      }
    }
    return null;
  };

  const lessons = bells.filter(bell => bell.type === 'lesson');
  const breaks = bells.filter(bell => bell.type === 'break');
  const nextPeriod = getNextPeriod();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.currentTime}>
          Текущее время: {getCurrentTime()}
        </ThemedText>
      </ThemedView>

      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ThemedView style={styles.loadingContainer}>
            <ThemedText>Загрузка звонков...</ThemedText>
          </ThemedView>
        ) : (
          <>
            {/* Next Period Info */}
            {nextPeriod && (
              <ThemedView style={styles.nextPeriodCard}>
                <ThemedText type="subtitle" style={styles.nextPeriodTitle}>
                  Следующий период
                </ThemedText>
                <ThemedText style={styles.nextPeriodInfo}>
                  {nextPeriod.type === 'lesson' ? `${nextPeriod.num} урок` : 'Перемена'} 
                  {' '}начинается в {nextPeriod.timeStart}
                </ThemedText>
              </ThemedView>
            )}

            {/* Lessons Schedule */}
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Расписание уроков
              </ThemedText>
              
              <ThemedView style={styles.tableContainer}>
                <ThemedView style={styles.tableHeader}>
                  <ThemedText style={[styles.tableHeaderText, styles.lessonColumn]}>
                    Урок
                  </ThemedText>
                  <ThemedText style={[styles.tableHeaderText, styles.timeColumn]}>
                    Время
                  </ThemedText>
                  <ThemedText style={[styles.tableHeaderText, styles.durationColumn]}>
                    Длительность
                  </ThemedText>
                </ThemedView>
                
                {lessons.map((lesson) => {
                  const isCurrent = isCurrentPeriod(lesson, 0, bells);
                  const duration = timeToMinutes(lesson.timeEnd) - timeToMinutes(lesson.timeStart);
                  
                  return (
                    <ThemedView 
                      key={`lesson-${lesson.num}`} 
                      style={[
                        styles.tableRow,
                        isCurrent && styles.currentRow
                      ]}
                    >
                      <ThemedText style={[
                        styles.tableCellText, 
                        styles.lessonColumn,
                        isCurrent && styles.currentText
                      ]}>
                        {lesson.num}
                      </ThemedText>
                      <ThemedText style={[
                        styles.tableCellText, 
                        styles.timeColumn,
                        isCurrent && styles.currentText
                      ]}>
                        {lesson.timeStart} - {lesson.timeEnd}
                      </ThemedText>
                      <ThemedText style={[
                        styles.tableCellText, 
                        styles.durationColumn,
                        isCurrent && styles.currentText
                      ]}>
                        {duration} мин
                      </ThemedText>
                    </ThemedView>
                  );
                })}
              </ThemedView>
            </ThemedView>

            {/* Breaks Schedule */}
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Перемены
              </ThemedText>
              
              <ThemedView style={styles.breaksContainer}>
                {breaks.map((breakTime, index) => {
                  const isCurrent = isCurrentPeriod(breakTime, 0, bells);
                  const duration = timeToMinutes(breakTime.timeEnd) - timeToMinutes(breakTime.timeStart);
                  
                  return (
                    <ThemedView 
                      key={`break-${index}`}
                      style={[
                        styles.breakCard,
                        isCurrent && styles.currentBreakCard
                      ]}
                    >
                      <ThemedText style={[
                        styles.breakTitle,
                        isCurrent && styles.currentText
                      ]}>
                        После {breakTime.num} урока
                      </ThemedText>
                      <ThemedText style={[
                        styles.breakTime,
                        isCurrent && styles.currentText
                      ]}>
                        {breakTime.timeStart} - {breakTime.timeEnd} ({duration} мин)
                      </ThemedText>
                    </ThemedView>
                  );
                })}
              </ThemedView>
            </ThemedView>

            {/* Additional Info */}
            <ThemedView style={styles.infoSection}>
              <ThemedText type="subtitle" style={styles.infoTitle}>
                ℹ️ Информация
              </ThemedText>
              <ThemedText style={styles.infoText}>
                • Общая длительность урока: 45 минут{'\n'}
                • Малые перемены: 10 минут{'\n'}
                • Большая перемена (после 3 урока): 15 минут{'\n'}
                • В случае сокращенных уроков расписание может изменяться
              </ThemedText>
            </ThemedView>
          </>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  currentTime: {
    marginTop: 4,
    color: '#666',
    fontSize: 16,
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
  nextPeriodCard: {
    backgroundColor: '#4CAF50',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextPeriodTitle: {
    color: '#FFFFFF',
    marginBottom: 4,
  },
  nextPeriodInfo: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  tableContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableHeaderText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  currentRow: {
    backgroundColor: '#E8F5E8',
  },
  tableCellText: {
    textAlign: 'center',
    color: '#333',
  },
  currentText: {
    fontWeight: '600',
    color: '#2E7D32',
  },
  lessonColumn: {
    flex: 1,
  },
  timeColumn: {
    flex: 2,
  },
  durationColumn: {
    flex: 1,
  },
  breaksContainer: {
    gap: 8,
  },
  breakCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9800',
  },
  currentBreakCard: {
    backgroundColor: '#FFF3E0',
    borderLeftColor: '#F57C00',
  },
  breakTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  breakTime: {
    color: '#666',
  },
  infoSection: {
    margin: 16,
    padding: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
  },
  infoTitle: {
    marginBottom: 12,
    color: '#1976D2',
  },
  infoText: {
    color: '#666',
    lineHeight: 20,
  },
});