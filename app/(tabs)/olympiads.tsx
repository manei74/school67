import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function OlympiadsScreen() {
  const olympiadLinks = [
    {
      id: '1',
      title: 'Олимп74',
      description: 'Региональные олимпиады Челябинской области',
      url: 'http://olymp74.ru/',
      icon: '🏆'
    },
    {
      id: '2',
      title: 'Olimpiada.ru',
      description: 'Всероссийские олимпиады школьников',
      url: 'https://olimpiada.ru/',
      icon: '🥇'
    },
    {
      id: '3',
      title: 'ЮУрГУ',
      description: 'Олимпиады Южно-Уральского государственного университета',
      url: 'https://zv.susu.ru/',
      icon: '🎓'
    },
    {
      id: '4',
      title: 'ЧелГУ',
      description: 'Олимпиады Челябинского государственного университета',
      url: 'https://www.csu.ru/studying/start.aspx',
      icon: '📚'
    }
  ];

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Олимпиады</ThemedText>
        <ThemedText style={styles.subtitle}>
          Полезные ресурсы для подготовки к олимпиадам
        </ThemedText>
      </ThemedView>

      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.linksContainer}>
          {olympiadLinks.map((link) => (
            <TouchableOpacity
              key={link.id}
              style={styles.linkCard}
              onPress={() => openLink(link.url)}
              activeOpacity={0.7}
            >
              <ThemedView style={styles.linkHeader}>
                <ThemedText style={styles.linkIcon}>{link.icon}</ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.linkTitle}>
                  {link.title}
                </ThemedText>
              </ThemedView>
              
              <ThemedText style={styles.linkDescription}>
                {link.description}
              </ThemedText>
              
              <ThemedText style={styles.linkUrl}>
                {link.url}
              </ThemedText>
              
              <ThemedText style={styles.openButton}>
                Открыть →
              </ThemedText>
            </TouchableOpacity>
          ))}
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
    fontSize: 14,
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
  linkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  linkIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  linkTitle: {
    flex: 1,
    fontSize: 18,
  },
  linkDescription: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  linkUrl: {
    color: '#007AFF',
    fontSize: 12,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  openButton: {
    color: '#FF9800',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
});