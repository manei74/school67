import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Linking } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppStore } from '@/src/store/simpleStore';
import { apiService } from '@/src/services/api';
import { NewsItem } from '@/src/types';

export default function NewsScreen() {
  const { news, setNews, isLoading, setLoading } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSource, setSelectedSource] = useState<'all' | 'site' | 'vk' | 'telegram'>('all');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    loadNews();
  }, [selectedSource]);

  useEffect(() => {
    // Auto-refresh news every 5 minutes when app is active
    const interval = setInterval(() => {
      if (selectedSource === 'all' || selectedSource === 'site') {
        loadNews(true); // Silent refresh
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [selectedSource]);

  const loadNews = async (silent: boolean = false) => {
    if (!silent) {
      setLoading(true);
    }
    try {
      const source = selectedSource === 'all' ? undefined : selectedSource;
      const newsData = await apiService.getNews(source as any);
      setNews(newsData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load news:', error);
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  };

  const openLink = (url?: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const getSourceLabel = (source: NewsItem['source']) => {
    switch (source) {
      case 'site': return '🌐 Сайт лицея';
      case 'vk': return '🔵 ВКонтакте';
      case 'telegram': return '✈️ Telegram';
      default: return 'Новость';
    }
  };

  const getSourceColor = (source: NewsItem['source']) => {
    switch (source) {
      case 'site': return '#007AFF';
      case 'vk': return '#0077FF';
      case 'telegram': return '#0088CC';
      default: return '#666';
    }
  };

  const filteredNews = selectedSource === 'all' 
    ? news 
    : news.filter(item => item.source === selectedSource);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Новости</ThemedText>
        {lastUpdated && (
          <ThemedText style={styles.lastUpdated}>
            Обновлено: {lastUpdated.toLocaleTimeString('ru-RU', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </ThemedText>
        )}
      </ThemedView>

      {/* Source Filter */}
      <ThemedView style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[
              styles.filterButton,
              selectedSource === 'all' && styles.filterButtonActive
            ]}
            onPress={() => setSelectedSource('all')}
          >
            <ThemedText style={[
              styles.filterButtonText,
              selectedSource === 'all' && styles.filterButtonTextActive
            ]}>
              Все
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton,
              selectedSource === 'site' && styles.filterButtonActive
            ]}
            onPress={() => setSelectedSource('site')}
          >
            <ThemedText style={[
              styles.filterButtonText,
              selectedSource === 'site' && styles.filterButtonTextActive
            ]}>
              Сайт
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton,
              selectedSource === 'vk' && styles.filterButtonActive
            ]}
            onPress={() => setSelectedSource('vk')}
          >
            <ThemedText style={[
              styles.filterButtonText,
              selectedSource === 'vk' && styles.filterButtonTextActive
            ]}>
              ВК
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton,
              selectedSource === 'telegram' && styles.filterButtonActive
            ]}
            onPress={() => setSelectedSource('telegram')}
          >
            <ThemedText style={[
              styles.filterButtonText,
              selectedSource === 'telegram' && styles.filterButtonTextActive
            ]}>
              Telegram
            </ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>

      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ThemedView style={styles.loadingContainer}>
            <ThemedText>Загрузка новостей...</ThemedText>
          </ThemedView>
        ) : filteredNews.length > 0 ? (
          <ThemedView style={styles.newsContainer}>
            {filteredNews.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.newsCard}
                onPress={() => openLink(item.link)}
                activeOpacity={0.7}
              >
                <ThemedView style={styles.newsHeader}>
                  <ThemedView 
                    style={[
                      styles.sourceBadge,
                      { backgroundColor: getSourceColor(item.source) + '20' }
                    ]}
                  >
                    <ThemedText 
                      style={[
                        styles.sourceText,
                        { color: getSourceColor(item.source) }
                      ]}
                    >
                      {getSourceLabel(item.source)}
                    </ThemedText>
                  </ThemedView>
                  <ThemedText style={styles.newsDate}>
                    {new Date(item.date).toLocaleDateString('ru-RU')}
                  </ThemedText>
                </ThemedView>
                
                <ThemedText type="defaultSemiBold" style={styles.newsTitle}>
                  {item.title}
                </ThemedText>
                
                <ThemedText style={styles.newsContent} numberOfLines={3}>
                  {item.content}
                </ThemedText>
                
                {item.link && (
                  <ThemedText style={styles.readMore}>
                    Читать полностью →
                  </ThemedText>
                )}
              </TouchableOpacity>
            ))}
          </ThemedView>
        ) : (
          <ThemedView style={styles.emptyState}>
            <ThemedText>Нет новостей для отображения</ThemedText>
          </ThemedView>
        )}
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
  lastUpdated: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
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
    backgroundColor: '#007AFF',
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
  loadingContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  newsContainer: {
    padding: 16,
  },
  newsCard: {
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
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sourceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  sourceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  newsDate: {
    color: '#666',
    fontSize: 12,
  },
  newsTitle: {
    marginBottom: 8,
    lineHeight: 22,
  },
  newsContent: {
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  readMore: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
});