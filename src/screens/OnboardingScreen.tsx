import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppStore } from '../store/simpleStore';
import { apiService } from '../services/api';
import { Class } from '../types';
import DebugOverlay from '../components/DebugOverlay';

export default function OnboardingScreen() {
  console.log('👋 OnboardingScreen starting');
  
  const { completeOnboarding, setSelectedClass } = useAppStore();
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  console.log('👋 OnboardingScreen state:', { classes: classes.length, selectedClassId, isLoading });

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    console.log('📚 Loading classes...');
    try {
      const classesData = await apiService.getClasses();
      console.log('📚 Classes loaded:', classesData.length);
      setClasses(classesData);
    } catch (error) {
      console.error('❌ Failed to load classes:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить список классов');
    } finally {
      console.log('📚 Classes loading finished');
      setIsLoading(false);
    }
  };

  const handleClassSelect = (classId: string) => {
    console.log('🎯 Class selected:', classId);
    setSelectedClassId(classId);
  };

  const handleContinue = () => {
    if (!selectedClassId) {
      Alert.alert('Внимание', 'Пожалуйста, выберите ваш класс');
      return;
    }

    setSelectedClass(selectedClassId);
    completeOnboarding();
  };

  const handleSkip = () => {
    Alert.alert(
      'Пропустить выбор класса?',
      'Вы сможете выбрать класс позже в настройках. Некоторые функции будут недоступны без указания класса.',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Пропустить',
          style: 'destructive',
          onPress: () => completeOnboarding(),
        },
      ]
    );
  };

  if (isLoading) {
    console.log('⏳ OnboardingScreen showing loading');
    return (
      <ThemedView style={styles.container}>
        <DebugOverlay step="Loading Classes" details={`Classes: ${classes.length}`} />
        <ThemedView style={styles.loadingContainer}>
          <ThemedText>Загрузка...</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  console.log('✅ OnboardingScreen showing main UI');

  return (
    <ThemedView style={styles.container}>
      <DebugOverlay step="Onboarding Ready" details={`Classes: ${classes.length}, Selected: ${selectedClassId || 'none'}`} />
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Добро пожаловать в Лицей 67!
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Выберите ваш класс для персонализации расписания и получения актуальной информации
        </ThemedText>
      </ThemedView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.classesContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Выберите ваш класс:
          </ThemedText>
          
          <ThemedView style={styles.classGrid}>
            {classes.map((classItem) => {
              const isSelected = selectedClassId === classItem.id;
              console.log(`🔍 Rendering ${classItem.id}: selected=${isSelected} (selectedClassId="${selectedClassId}")`);
              return (
                <TouchableOpacity
                  key={classItem.id}
                  style={[
                    styles.classCard,
                    isSelected && styles.classCardSelected
                  ]}
                  onPress={() => handleClassSelect(classItem.id)}
                  activeOpacity={0.7}
                >
                  <ThemedText style={[
                    styles.classText,
                    isSelected && styles.classTextSelected
                  ]}>
                    {classItem.title}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.infoContainer}>
          <ThemedText style={styles.infoText}>
            ℹ️ После выбора класса вы сможете:
          </ThemedText>
          <ThemedText style={styles.featureText}>
            • Просматривать актуальное расписание{'\n'}
            • Получать уведомления об олимпиадах{'\n'}
            • Видеть информацию, относящуюся к вашему классу
          </ThemedText>
          <ThemedText style={styles.changeText}>
            Вы всегда можете изменить класс в настройках приложения.
          </ThemedText>
        </ThemedView>
      </ScrollView>

      <ThemedView style={styles.footer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <ThemedText style={styles.skipButtonText}>
            Пропустить
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedClassId && styles.continueButtonDisabled
          ]} 
          onPress={handleContinue}
          disabled={!selectedClassId}
        >
          <ThemedText style={styles.continueButtonText}>
            Продолжить
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
  },
  classesContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sectionTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  classGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  classCard: {
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '30%',
    flex: 1,
    maxWidth: '31%',
  },
  classCardSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  classText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  classTextSelected: {
    color: '#2196F3',
  },
  infoContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#f0f7ff',
    marginHorizontal: 24,
    marginVertical: 16,
    borderRadius: 12,
  },
  infoText: {
    marginBottom: 12,
    color: '#1976D2',
    fontWeight: '600',
  },
  featureText: {
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  changeText: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  skipButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    flex: 2,
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});