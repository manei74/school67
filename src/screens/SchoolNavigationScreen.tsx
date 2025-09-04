import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Mock school map data
interface Room {
  number: string;
  name: string;
  floor: number;
  type: 'classroom' | 'special' | 'office' | 'service';
  description?: string;
}

const SCHOOL_ROOMS: Room[] = [
  // 1st Floor
  { number: '101', name: 'Кабинет математики', floor: 1, type: 'classroom' },
  { number: '102', name: 'Кабинет физики', floor: 1, type: 'classroom' },
  { number: '103', name: 'Кабинет химии', floor: 1, type: 'classroom' },
  { number: '105', name: 'Лаборатория', floor: 1, type: 'special' },
  { number: '107', name: 'Кабинет биологии', floor: 1, type: 'classroom' },
  { number: '108', name: 'Кабинет географии', floor: 1, type: 'classroom' },
  { number: '110', name: 'Компьютерный класс', floor: 1, type: 'special' },
  { number: '112', name: 'Библиотека', floor: 1, type: 'special' },
  { number: 'Спортзал', name: 'Спортивный зал', floor: 1, type: 'special' },
  { number: 'Столовая', name: 'Столовая', floor: 1, type: 'service' },
  
  // 2nd Floor
  { number: '201', name: 'Кабинет русского языка', floor: 2, type: 'classroom' },
  { number: '202', name: 'Кабинет литературы', floor: 2, type: 'classroom' },
  { number: '203', name: 'Кабинет английского языка', floor: 2, type: 'classroom' },
  { number: '205', name: 'Кабинет истории', floor: 2, type: 'classroom' },
  { number: '207', name: 'Кабинет обществознания', floor: 2, type: 'classroom' },
  { number: '208', name: 'Кабинет французского языка', floor: 2, type: 'classroom' },
  { number: '210', name: 'Актовый зал', floor: 2, type: 'special' },
  { number: '212', name: 'Музыкальный класс', floor: 2, type: 'classroom' },
  
  // 3rd Floor
  { number: '301', name: 'Кабинет математики', floor: 3, type: 'classroom' },
  { number: '302', name: 'Кабинет математики', floor: 3, type: 'classroom' },
  { number: '303', name: 'Кабинет информатики', floor: 3, type: 'classroom' },
  { number: '305', name: 'Кабинет ИЗО', floor: 3, type: 'classroom' },
  { number: '307', name: 'Кабинет технологии (мальчики)', floor: 3, type: 'classroom' },
  { number: '308', name: 'Кабинет технологии (девочки)', floor: 3, type: 'classroom' },
  { number: '310', name: 'Кабинет ОБЖ', floor: 3, type: 'classroom' },
  { number: '312', name: 'Конференц-зал', floor: 3, type: 'special' },
  
  // Offices
  { number: 'Директор', name: 'Кабинет директора', floor: 2, type: 'office', description: 'Каб. 215' },
  { number: 'Завуч', name: 'Кабинет завуча', floor: 2, type: 'office', description: 'Каб. 216' },
  { number: 'Секретарь', name: 'Секретарь', floor: 1, type: 'office', description: 'Каб. 115' },
  { number: 'Медпункт', name: 'Медицинский кабинет', floor: 1, type: 'service', description: 'Каб. 116' },
];

export default function SchoolNavigationScreen() {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const floors = [1, 2, 3];
  
  const getFilteredRooms = () => {
    let rooms = SCHOOL_ROOMS.filter(room => room.floor === selectedFloor);
    
    if (searchQuery) {
      rooms = rooms.filter(room => 
        room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return rooms;
  };

  const getRoomTypeIcon = (type: Room['type']) => {
    switch (type) {
      case 'classroom': return '🏫';
      case 'special': return '🎯';
      case 'office': return '🏢';
      case 'service': return '🏥';
      default: return '📍';
    }
  };

  const getRoomTypeColor = (type: Room['type']) => {
    switch (type) {
      case 'classroom': return '#4CAF50';
      case 'special': return '#FF9800';
      case 'office': return '#2196F3';
      case 'service': return '#9C27B0';
      default: return '#666';
    }
  };

  const showRoomInfo = (room: Room) => {
    Alert.alert(
      room.name,
      `Кабинет: ${room.number}\nЭтаж: ${room.floor}\n${room.description || ''}`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const filteredRooms = getFilteredRooms();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Навигация по школе</ThemedText>
        <ThemedText style={styles.subtitle}>
          3 этажа • {SCHOOL_ROOMS.length} кабинетов
        </ThemedText>
      </ThemedView>

      {/* Floor Selector */}
      <ThemedView style={styles.floorSelector}>
        <ThemedText style={styles.floorSelectorTitle}>Этаж:</ThemedText>
        <ThemedView style={styles.floorButtons}>
          {floors.map(floor => (
            <TouchableOpacity
              key={floor}
              style={[
                styles.floorButton,
                selectedFloor === floor && styles.floorButtonActive
              ]}
              onPress={() => setSelectedFloor(floor)}
            >
              <ThemedText style={[
                styles.floorButtonText,
                selectedFloor === floor && styles.floorButtonTextActive
              ]}>
                {floor}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Room Types Legend */}
        <ThemedView style={styles.legendContainer}>
          <ThemedText type="defaultSemiBold" style={styles.legendTitle}>
            Условные обозначения:
          </ThemedText>
          <ThemedView style={styles.legendItems}>
            <ThemedView style={styles.legendItem}>
              <ThemedText style={styles.legendIcon}>🏫</ThemedText>
              <ThemedText style={styles.legendText}>Учебные кабинеты</ThemedText>
            </ThemedView>
            <ThemedView style={styles.legendItem}>
              <ThemedText style={styles.legendIcon}>🎯</ThemedText>
              <ThemedText style={styles.legendText}>Специальные кабинеты</ThemedText>
            </ThemedView>
            <ThemedView style={styles.legendItem}>
              <ThemedText style={styles.legendIcon}>🏢</ThemedText>
              <ThemedText style={styles.legendText}>Административные</ThemedText>
            </ThemedView>
            <ThemedView style={styles.legendItem}>
              <ThemedText style={styles.legendIcon}>🏥</ThemedText>
              <ThemedText style={styles.legendText}>Служебные</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Rooms Grid */}
        <ThemedView style={styles.roomsContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {selectedFloor} этаж ({filteredRooms.length} кабинетов)
          </ThemedText>
          
          <ThemedView style={styles.roomsGrid}>
            {filteredRooms.map((room) => (
              <TouchableOpacity
                key={`${room.floor}-${room.number}`}
                style={[
                  styles.roomCard,
                  { borderLeftColor: getRoomTypeColor(room.type) }
                ]}
                onPress={() => showRoomInfo(room)}
                activeOpacity={0.7}
              >
                <ThemedView style={styles.roomCardHeader}>
                  <ThemedText style={styles.roomIcon}>
                    {getRoomTypeIcon(room.type)}
                  </ThemedText>
                  <ThemedText type="defaultSemiBold" style={styles.roomNumber}>
                    {room.number}
                  </ThemedText>
                </ThemedView>
                <ThemedText style={styles.roomName} numberOfLines={2}>
                  {room.name}
                </ThemedText>
                {room.description && (
                  <ThemedText style={styles.roomDescription}>
                    {room.description}
                  </ThemedText>
                )}
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Quick Find Section */}
        <ThemedView style={styles.quickFindContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Быстрый поиск
          </ThemedText>
          
          <ThemedView style={styles.quickFindItems}>
            <TouchableOpacity 
              style={styles.quickFindButton}
              onPress={() => Alert.alert('Столовая', 'Столовая находится на 1 этаже')}
            >
              <ThemedText style={styles.quickFindIcon}>🍽️</ThemedText>
              <ThemedText style={styles.quickFindText}>Столовая</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickFindButton}
              onPress={() => Alert.alert('Спортзал', 'Спортивный зал находится на 1 этаже')}
            >
              <ThemedText style={styles.quickFindIcon}>🏀</ThemedText>
              <ThemedText style={styles.quickFindText}>Спортзал</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickFindButton}
              onPress={() => Alert.alert('Библиотека', 'Библиотека находится в кабинете 112 на 1 этаже')}
            >
              <ThemedText style={styles.quickFindIcon}>📚</ThemedText>
              <ThemedText style={styles.quickFindText}>Библиотека</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickFindButton}
              onPress={() => Alert.alert('Актовый зал', 'Актовый зал находится в кабинете 210 на 2 этаже')}
            >
              <ThemedText style={styles.quickFindIcon}>🎭</ThemedText>
              <ThemedText style={styles.quickFindText}>Актовый зал</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {/* Info */}
        <ThemedView style={styles.infoContainer}>
          <ThemedText type="defaultSemiBold" style={styles.infoTitle}>
            ℹ️ Информация
          </ThemedText>
          <ThemedText style={styles.infoText}>
            Нажмите на кабинет для получения подробной информации.{'\n'}
            Интерактивная карта школы будет доступна в следующих обновлениях.
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
  floorSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  floorSelectorTitle: {
    marginRight: 12,
    fontWeight: '600',
  },
  floorButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  floorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    minWidth: 40,
    alignItems: 'center',
  },
  floorButtonActive: {
    backgroundColor: '#007AFF',
  },
  floorButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  floorButtonTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  legendContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  legendTitle: {
    marginBottom: 12,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '45%',
  },
  legendIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },
  roomsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  roomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  roomCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    minWidth: '47%',
    maxWidth: '47%',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  roomCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  roomIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  roomNumber: {
    flex: 1,
  },
  roomName: {
    color: '#666',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  roomDescription: {
    color: '#999',
    fontSize: 12,
  },
  quickFindContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  quickFindItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickFindButton: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '45%',
  },
  quickFindIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  quickFindText: {
    color: '#1976D2',
    fontWeight: '600',
  },
  infoContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
  },
  infoTitle: {
    marginBottom: 8,
    color: '#F57C00',
  },
  infoText: {
    color: '#666',
    lineHeight: 20,
  },
});