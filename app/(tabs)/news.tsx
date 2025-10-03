import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { ThemedText } from '@/src/components/ui/ThemedText';
import { ThemedView } from '@/src/components/ui/ThemedView';
import { IconSymbol } from '@/src/components/ui/IconSymbol';
import { FontAwesome } from '@expo/vector-icons';
import { ENV_CONFIG } from '@/src/config/env';

export default function NewsScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const mediaLinks = [
    {
      id: 'website',
      title: 'Официальный сайт',
      description: 'Новости, объявления и информация о лицее',
      url: ENV_CONFIG.WEBSITE_URL,
      iconType: 'image',
      iconSource: require('@/assets/images/icon.png'),
      color: '#FF6B35',
      backgroundColor: '#FFF3E0'
    },
    {
      id: 'vk',
      title: 'ВКонтакте',
      description: 'Официальная группа лицея в VK',
      url: ENV_CONFIG.VK_GROUP_URL,
      iconType: 'fontawesome',
      icon: 'vk',
      color: '#4680C2',
      backgroundColor: '#E8F4FD'
    },
    {
      id: 'telegram',
      title: 'Telegram канал',
      description: 'Оперативные новости и уведомления',
      url: ENV_CONFIG.TELEGRAM_CHANNEL_URL,
      icon: 'paperplane.fill',
      color: '#0088CC',
      backgroundColor: '#E1F5FE'
    }
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Новости и медиа</ThemedText>
        <ThemedText style={styles.subtitle}>
          Официальные источники информации лицея
        </ThemedText>
      </ThemedView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.linksContainer}>
          {mediaLinks.map((link) => (
            <TouchableOpacity
              key={link.id}
              style={styles.linkCard}
              onPress={() => openLink(link.url)}
              activeOpacity={0.8}
            >
              <ThemedView style={[
                styles.iconContainer,
                { backgroundColor: link.backgroundColor }
              ]}>
                {link.iconType === 'image' ? (
                  <Image 
                    source={link.iconSource} 
                    style={styles.iconImage}
                  />
                ) : link.iconType === 'fontawesome' ? (
                  <FontAwesome 
                    name={link.icon as any} 
                    size={24} 
                    color={link.color} 
                  />
                ) : (
                  <IconSymbol 
                    size={24} 
                    name={link.icon as any} 
                    color={link.color} 
                  />
                )}
              </ThemedView>
              
              <ThemedView style={styles.linkContent}>
                <ThemedText type="defaultSemiBold" style={styles.linkTitle}>
                  {link.title}
                </ThemedText>
                <ThemedText style={styles.linkDescription}>
                  {link.description}
                </ThemedText>
                <ThemedText style={styles.linkUrl}>
                  {link.url.replace(/^https?:\/\//, '')}
                </ThemedText>
              </ThemedView>
              
              <IconSymbol 
                size={16} 
                name="chevron.right" 
                color="#666" 
              />
            </TouchableOpacity>
          ))}
        </ThemedView>
        
        <ThemedView style={styles.infoSection}>
          <ThemedText type="subtitle" style={styles.infoTitle}>
            ℹ️ Информация
          </ThemedText>
          <ThemedText style={styles.infoText}>
            • Все новости публикуются на официальном сайте лицея{'\n'}
            • В группе ВК размещаются актуальные объявления{'\n'}
            • Telegram канал - для оперативных уведомлений{'\n'}
            • Следите за обновлениями во всех источниках
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
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  linksContainer: {
    padding: 16,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  linkContent: {
    flex: 1,
  },
  linkTitle: {
    marginBottom: 4,
  },
  linkDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  linkUrl: {
    color: '#007AFF',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  infoSection: {
    margin: 16,
    marginTop: 8,
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