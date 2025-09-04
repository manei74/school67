import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface FipiResource {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: 'demo' | 'spec' | 'codif';
  url: string;
  icon: string;
}

const FIPI_RESOURCES: FipiResource[] = [
  // Mathematics
  {
    id: '1',
    title: 'Демоверсия ЕГЭ по математике (базовый уровень)',
    description: 'Демонстрационный вариант КИМ ЕГЭ 2025 года',
    subject: 'Математика',
    type: 'demo',
    url: 'https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/173942232-3',
    icon: '📊'
  },
  {
    id: '2',
    title: 'Демоверсия ЕГЭ по математике (профильный уровень)',
    description: 'Демонстрационный вариант КИМ ЕГЭ 2025 года',
    subject: 'Математика',
    type: 'demo',
    url: 'https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/173942232-3',
    icon: '📈'
  },
  // Russian Language
  {
    id: '3',
    title: 'Демоверсия ЕГЭ по русскому языку',
    description: 'Демонстрационный вариант КИМ ЕГЭ 2025 года',
    subject: 'Русский язык',
    type: 'demo',
    url: 'https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/173942232-1',
    icon: '📝'
  },
  {
    id: '4',
    title: 'Кодификатор по русскому языку',
    description: 'Перечень элементов содержания и требований к уровню подготовки',
    subject: 'Русский язык',
    type: 'codif',
    url: 'https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/173942232-1',
    icon: '📋'
  },
  // Physics
  {
    id: '5',
    title: 'Демоверсия ЕГЭ по физике',
    description: 'Демонстрационный вариант КИМ ЕГЭ 2025 года',
    subject: 'Физика',
    type: 'demo',
    url: 'https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/173942232-4',
    icon: '🔬'
  },
  // Chemistry
  {
    id: '6',
    title: 'Демоверсия ЕГЭ по химии',
    description: 'Демонстрационный вариант КИМ ЕГЭ 2025 года',
    subject: 'Химия',
    type: 'demo',
    url: 'https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/173942232-5',
    icon: '🧪'
  },
  // Biology
  {
    id: '7',
    title: 'Демоверсия ЕГЭ по биологии',
    description: 'Демонстрационный вариант КИМ ЕГЭ 2025 года',
    subject: 'Биология',
    type: 'demo',
    url: 'https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/173942232-6',
    icon: '🧬'
  },
  // History
  {
    id: '8',
    title: 'Демоверсия ЕГЭ по истории',
    description: 'Демонстрационный вариант КИМ ЕГЭ 2025 года',
    subject: 'История',
    type: 'demo',
    url: 'https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/173942232-7',
    icon: '🏛️'
  }
];

const SUBJECTS = ['Все', ...Array.from(new Set(FIPI_RESOURCES.map(r => r.subject)))];

export default function GraduatesScreen() {
  const [selectedSubject, setSelectedSubject] = useState('Все');
  const [favorites, setFavorites] = useState<string[]>([]);

  const openResource = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось открыть ссылку');
    }
  };

  const toggleFavorite = (resourceId: string) => {
    setFavorites(prev => 
      prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const getTypeLabel = (type: FipiResource['type']) => {
    switch (type) {
      case 'demo': return 'Демоверсия';
      case 'spec': return 'Спецификация';
      case 'codif': return 'Кодификатор';
      default: return 'Документ';
    }
  };

  const getTypeColor = (type: FipiResource['type']) => {
    switch (type) {
      case 'demo': return '#4CAF50';
      case 'spec': return '#FF9800';
      case 'codif': return '#2196F3';
      default: return '#666';
    }
  };

  const filteredResources = selectedSubject === 'Все' 
    ? FIPI_RESOURCES 
    : FIPI_RESOURCES.filter(resource => resource.subject === selectedSubject);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Выпускнику</ThemedText>
        <ThemedText style={styles.subtitle}>
          Материалы ФИПИ для подготовки к ЕГЭ
        </ThemedText>
      </ThemedView>

      {/* Subject Filter */}
      <ThemedView style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {SUBJECTS.map((subject) => (
            <TouchableOpacity
              key={subject}
              style={[
                styles.filterButton,
                selectedSubject === subject && styles.filterButtonActive
              ]}
              onPress={() => setSelectedSubject(subject)}
            >
              <ThemedText style={[
                styles.filterButtonText,
                selectedSubject === subject && styles.filterButtonTextActive
              ]}>
                {subject}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.resourcesContainer}>
          {filteredResources.map((resource) => (
            <ThemedView key={resource.id} style={styles.resourceCard}>
              <ThemedView style={styles.resourceHeader}>
                <ThemedView style={styles.resourceTitleRow}>
                  <ThemedText style={styles.resourceIcon}>
                    {resource.icon}
                  </ThemedText>
                  <ThemedView style={styles.resourceInfo}>
                    <ThemedText type="defaultSemiBold" style={styles.resourceTitle}>
                      {resource.title}
                    </ThemedText>
                    <ThemedText style={styles.resourceDescription}>
                      {resource.description}
                    </ThemedText>
                  </ThemedView>
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(resource.id)}
                  >
                    <ThemedText style={[
                      styles.favoriteIcon,
                      { color: favorites.includes(resource.id) ? '#FFD700' : '#ccc' }
                    ]}>
                      ★
                    </ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>

              <ThemedView style={styles.resourceFooter}>
                <ThemedView style={styles.badges}>
                  <ThemedView style={styles.subjectBadge}>
                    <ThemedText style={styles.subjectText}>
                      {resource.subject}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView 
                    style={[
                      styles.typeBadge,
                      { backgroundColor: getTypeColor(resource.type) + '20' }
                    ]}
                  >
                    <ThemedText 
                      style={[
                        styles.typeText,
                        { color: getTypeColor(resource.type) }
                      ]}
                    >
                      {getTypeLabel(resource.type)}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
                
                <TouchableOpacity
                  style={styles.openButton}
                  onPress={() => openResource(resource.url)}
                >
                  <ThemedText style={styles.openButtonText}>
                    Открыть на ФИПИ →
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          ))}
        </ThemedView>

        {/* Info Section */}
        <ThemedView style={styles.infoSection}>
          <ThemedText type="subtitle" style={styles.infoTitle}>
            🎓 О материалах ФИПИ
          </ThemedText>
          <ThemedText style={styles.infoText}>
            Федеральный институт педагогических измерений (ФИПИ) — 
            организация, разрабатывающая контрольные измерительные материалы 
            для государственной итоговой аттестации.
          </ThemedText>
          <ThemedText style={styles.infoText}>
            • Демоверсии помогают понять структуру экзамена{'\n'}
            • Спецификации содержат детальное описание КИМ{'\n'}
            • Кодификаторы определяют элементы содержания
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  subtitle: {
    marginTop: 4,
    color: '#666',
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  filterButtonActive: {
    backgroundColor: '#9C27B0',
  },
  filterButtonText: {
    color: '#666',
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  resourcesContainer: {
    padding: 16,
  },
  resourceCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resourceHeader: {
    marginBottom: 16,
  },
  resourceTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  resourceIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    marginBottom: 4,
  },
  resourceDescription: {
    color: '#666',
    lineHeight: 20,
  },
  favoriteButton: {
    padding: 4,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  resourceFooter: {
    gap: 12,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  subjectBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  subjectText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '600',
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  openButton: {
    alignSelf: 'flex-end',
  },
  openButtonText: {
    color: '#9C27B0',
    fontSize: 14,
    fontWeight: '600',
  },
  infoSection: {
    margin: 16,
    padding: 16,
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
  },
  infoTitle: {
    marginBottom: 12,
    color: '#7B1FA2',
  },
  infoText: {
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
});