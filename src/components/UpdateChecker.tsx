import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface UpdateCheckerProps {
  onUpdateAvailable?: () => void;
}

export default function UpdateChecker({ onUpdateAvailable }: UpdateCheckerProps) {
  const [updateStatus, setUpdateStatus] = useState<string>('');
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    if (__DEV__) {
      // Skip update checks in development
      console.log('🔄 UpdateChecker: Skipping updates in development mode');
      return;
    }

    setIsChecking(true);
    setUpdateStatus('Проверка обновлений...');

    try {
      const update = await Updates.checkForUpdateAsync();
      
      if (update.isAvailable) {
        setUpdateStatus('Обновление доступно');
        onUpdateAvailable?.();
        
        Alert.alert(
          'Доступно обновление',
          'Найдено обновление для приложения Лицей 67. Установить сейчас?',
          [
            {
              text: 'Позже',
              style: 'cancel',
              onPress: () => setUpdateStatus('Обновление отложено')
            },
            {
              text: 'Установить',
              onPress: () => downloadAndReload(),
            },
          ]
        );
      } else {
        setUpdateStatus('Приложение актуально');
        console.log('✅ UpdateChecker: App is up to date');
      }
    } catch (error) {
      console.error('❌ UpdateChecker: Error checking for updates:', error);
      setUpdateStatus('Ошибка проверки обновлений');
    } finally {
      setIsChecking(false);
    }
  };

  const downloadAndReload = async () => {
    try {
      setUpdateStatus('Загрузка обновления...');
      await Updates.fetchUpdateAsync();
      
      setUpdateStatus('Применение обновления...');
      await Updates.reloadAsync();
    } catch (error) {
      console.error('❌ UpdateChecker: Error downloading update:', error);
      setUpdateStatus('Ошибка загрузки обновления');
      
      Alert.alert(
        'Ошибка обновления',
        'Не удалось загрузить обновление. Попробуйте позже.',
        [{ text: 'OK' }]
      );
    }
  };

  const manualCheckForUpdates = async () => {
    if (__DEV__) {
      Alert.alert(
        'Режим разработки',
        'Проверка обновлений недоступна в режиме разработки',
        [{ text: 'OK' }]
      );
      return;
    }

    await checkForUpdates();
  };

  // Don't render in development mode
  if (__DEV__) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      {isChecking && (
        <ThemedText style={styles.statusText}>
          {updateStatus}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

// Export function for manual update checking
export const checkForUpdatesManually = async (): Promise<void> => {
  if (__DEV__) {
    Alert.alert(
      'Режим разработки',
      'Проверка обновлений недоступна в режиме разработки',
      [{ text: 'OK' }]
    );
    return;
  }

  try {
    const update = await Updates.checkForUpdateAsync();
    
    if (update.isAvailable) {
      Alert.alert(
        'Доступно обновление',
        'Найдено обновление для приложения. Установить сейчас?',
        [
          { text: 'Отмена', style: 'cancel' },
          {
            text: 'Установить',
            onPress: async () => {
              try {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
              } catch (error) {
                console.error('Error downloading update:', error);
                Alert.alert('Ошибка', 'Не удалось установить обновление');
              }
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'Обновления не найдены',
        'У вас установлена последняя версия приложения',
        [{ text: 'OK' }]
      );
    }
  } catch (error) {
    console.error('Error checking for updates:', error);
    Alert.alert(
      'Ошибка',
      'Не удалось проверить обновления. Проверьте подключение к интернету.',
      [{ text: 'OK' }]
    );
  }
};