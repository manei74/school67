import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

// Real school map data from Список кабинетов 2025.xlsx
interface Room {
  number: string;
  name: string;
  floor: number;
  type: "classroom" | "special" | "office" | "service";
  classAssigned?: string;
  teacher?: string;
  subject?: string;
}

const SCHOOL_ROOMS: Room[] = [
  // 1st Floor
  {
    number: "101",
    name: "Столовая",
    floor: 1,
    type: "service",
    teacher: "Союстова Анна Ивановна",
  },
  {
    number: "102",
    name: "Изобразительное искусство",
    floor: 1,
    type: "classroom",
    classAssigned: "6в",
    subject: "Изобразительное искусство",
    teacher: "Соловьёва Анна Александровна",
  },
  {
    number: "103",
    name: "Начальные классы",
    floor: 1,
    type: "classroom",
    classAssigned: "1б",
    subject: "Начальные классы",
    teacher: "Имамова Татьяна Сергеевна",
  },
  {
    number: "104",
    name: "Начальные классы",
    floor: 1,
    type: "classroom",
    classAssigned: "2а",
    subject: "Начальные классы",
    teacher: "Васильева Ксения Николаевна",
  },
  {
    number: "105",
    name: "Начальные классы",
    floor: 1,
    type: "classroom",
    classAssigned: "3б",
    subject: "Начальные классы",
    teacher: "Лукоянова Елена Николаевна",
  },
  {
    number: "106",
    name: "Начальные классы",
    floor: 1,
    type: "classroom",
    classAssigned: "1а",
    subject: "Начальные классы",
    teacher: "Ватутина Екатерина Александровна",
  },
  {
    number: "107",
    name: "Начальные классы",
    floor: 1,
    type: "classroom",
    classAssigned: "3а",
    subject: "Начальные классы",
    teacher: "Петрова Елена Степановна",
  },
  {
    number: "108",
    name: "Начальные классы",
    floor: 1,
    type: "classroom",
    classAssigned: "4а",
    subject: "Начальные классы",
    teacher: "Смолина Елена Николаевна",
  },
  {
    number: "109",
    name: "Начальные классы",
    floor: 1,
    type: "classroom",
    classAssigned: "2б",
    subject: "Начальные классы",
    teacher: "Заневская Светлана Владимировна",
  },
  {
    number: "110",
    name: "Начальные классы",
    floor: 1,
    type: "classroom",
    classAssigned: "4б",
    subject: "Начальные классы",
    teacher: "Бурдина Яна Владимировна",
  },
  {
    number: "111",
    name: "Зам. директора по УВР",
    floor: 1,
    type: "office",
    teacher: "Цыганова Светлана Константиновна",
  },
  {
    number: "112",
    name: "Медицинский кабинет",
    floor: 1,
    type: "service",
    teacher: "Шарапкова Ольга Михайловна",
  },
  {
    number: "113",
    name: "ОБЗР/ИЗО",
    floor: 1,
    type: "classroom",
    teacher: "Бабкина Елена Ивановна",
  },
  {
    number: "114",
    name: "Музыка",
    floor: 1,
    type: "classroom",
    classAssigned: "5а",
    subject: "Музыка",
    teacher: "Богословская Ольга Викторовна",
  },
  {
    number: "115",
    name: "Хореография",
    floor: 1,
    type: "special",
    teacher: "Хорват Лариса Анатольевна",
  },
  {
    number: "116",
    name: "БПЛА",
    floor: 1,
    type: "special",
    teacher: "Абилова Махаббат Бржановна",
  },
  {
    number: "117",
    name: "Труд",
    floor: 1,
    type: "classroom",
    classAssigned: "5в",
    subject: "Труд",
    teacher: "Немилостива Оксана Геннадьевна",
  },
  {
    number: "118",
    name: "Служба психолого-педагогического сопровождения",
    floor: 1,
    type: "office",
    teacher: "Мамаева Валерия Юрьевна",
  },
  {
    number: "119",
    name: "Начальные классы",
    floor: 1,
    type: "classroom",
    classAssigned: "2в/2г",
    subject: "Начальные классы",
    teacher: "Основина Татьяна Ивановна / Ростомян Анастасия Валерьевна",
  },
  {
    number: "120",
    name: "Начальные классы (2 смена)",
    floor: 1,
    type: "classroom",
    classAssigned: "4в",
    teacher: "Решетова Наталья Андреевна",
  },
  {
    number: "121",
    name: "Зам. директора по безопасности",
    floor: 1,
    type: "office",
    teacher: "Бабкина Елена Ивановна",
  },
  {
    number: "122",
    name: "Педагоги-психологи",
    floor: 1,
    type: "office",
    teacher: "Краснопеева Анна Петровна",
  },

  // 2nd Floor
  {
    number: "201",
    name: "Бухгалтерия",
    floor: 2,
    type: "office",
    teacher: "Уварова Наталья Борисовна",
  },
  {
    number: "202",
    name: "Английского языка",
    floor: 2,
    type: "classroom",
    subject: "Английский язык",
  },
  {
    number: "203",
    name: "Малый спортзал",
    floor: 2,
    type: "special",
    teacher: "Хорват Андрей Михайлович",
  },
  {
    number: "204",
    name: "Библиотека",
    floor: 2,
    type: "special",
    teacher: "Захарова Валентина Сергеевна",
  },
  {
    number: "205",
    name: "Зам. директора",
    floor: 2,
    type: "office",
    teacher: "Манеева Наталья Николаевна",
  },
  {
    number: "206",
    name: "Радиорубка",
    floor: 2,
    type: "special",
    teacher: "Ватутина Галина Александровна",
  },
  {
    number: "207",
    name: "Информатика",
    floor: 2,
    type: "classroom",
    subject: "Информатика",
    teacher: "Соловьёва Евгения Олеговна",
  },
  {
    number: "208",
    name: "Русский язык",
    floor: 2,
    type: "classroom",
    classAssigned: "8б",
    subject: "Русский язык",
    teacher: "Дружинина Светлана Владимировна",
  },
  {
    number: "209",
    name: "География",
    floor: 2,
    type: "classroom",
    classAssigned: "7в",
    subject: "География",
    teacher: "Сибирмовских Варвара Владимировна",
  },
  {
    number: "210",
    name: "Математика",
    floor: 2,
    type: "classroom",
    classAssigned: "7б",
    subject: "Математика",
    teacher: "Клюева Валентина Васильевна",
  },
  {
    number: "211",
    name: "Математика",
    floor: 2,
    type: "classroom",
    classAssigned: "10а",
    subject: "Математика",
    teacher: "Шалёва Ирина Станиславовна",
  },
  {
    number: "212",
    name: "Математика",
    floor: 2,
    type: "classroom",
    classAssigned: "6б",
    subject: "Математика",
    teacher: "Терешкова Екатерина Александровна",
  },
  {
    number: "213",
    name: "Учительская, зам. директора по УВР",
    floor: 2,
    type: "office",
    teacher: "Перегудова Наталья Евгеньевна",
  },
  {
    number: "214",
    name: "Директор/Секретарь",
    floor: 2,
    type: "office",
    teacher:
      "Веретенникова Светлана Павловна / Глумова Анастасия Александровна",
  },
  {
    number: "215",
    name: "Иностранные языки",
    floor: 2,
    type: "classroom",
    subject: "Иностранные языки",
    teacher: "Прокопенко Ольга Христофоровна",
  },
  {
    number: "216",
    name: "Физика",
    floor: 2,
    type: "classroom",
    classAssigned: "10б",
    subject: "Физика",
    teacher: "Манеева Наталья Николаевна",
  },
  {
    number: "217",
    name: "Английский язык",
    floor: 2,
    type: "classroom",
    subject: "Английский язык",
    teacher: "Козлова Мария Сергеевна",
  },
  {
    number: "218",
    name: "Большой спортивный зал",
    floor: 2,
    type: "special",
    teacher: "Пензина Юлия Андреевна",
  },
  {
    number: "218а",
    name: "Английский язык",
    floor: 2,
    type: "classroom",
    classAssigned: "8в",
    subject: "Английский язык",
    teacher: "Евченко Екатерина Юрьевна",
  },
  {
    number: "219",
    name: "Начальные классы (2 смены)",
    floor: 2,
    type: "classroom",
    classAssigned: "1в/3в",
    subject: "Начальные классы",
    teacher: "Мансурова Мария Андреевна / Башкина Елизавета Витальевна",
  },
  {
    number: "220",
    name: "Физика",
    floor: 2,
    type: "classroom",
    subject: "Физика",
    teacher: "Акимов Дмитрий Витальевич",
  },
  {
    number: "221",
    name: "Зам. директора по ВР, педагоги-организаторы",
    floor: 2,
    type: "office",
    teacher: "Шалёва Ирина Станиславовна",
  },

  // 3rd Floor
  {
    number: "301",
    name: "Биология",
    floor: 3,
    type: "classroom",
    classAssigned: "9а",
    subject: "Биология",
    teacher: "Зимина Наталья Валерьевна",
  },
  {
    number: "302",
    name: "Лаборантская химии и биологии",
    floor: 3,
    type: "special",
  },
  {
    number: "303",
    name: "Химия",
    floor: 3,
    type: "classroom",
    classAssigned: "11а",
    subject: "Химия",
    teacher: "Харин Олег Анатольевич",
  },
  {
    number: "304",
    name: "Английский язык",
    floor: 3,
    type: "classroom",
    classAssigned: "9в",
    subject: "Английский язык",
    teacher: "Кислицына Ольга Алексеевна",
  },
  {
    number: "305",
    name: "Биология",
    floor: 3,
    type: "classroom",
    classAssigned: "5б",
    subject: "Биология",
    teacher: "Женакова Анастасия Владимировна",
  },
  {
    number: "306",
    name: "Английский язык",
    floor: 3,
    type: "classroom",
    classAssigned: "8а",
    subject: "Английский язык",
    teacher: "Целикова Кристина Александровна",
  },
  { number: "307", name: "Лаборантская", floor: 3, type: "special" },
  {
    number: "308",
    name: "Русский язык",
    floor: 3,
    type: "classroom",
    classAssigned: "7а",
    subject: "Русский язык",
    teacher: "Бобырева Мария Александровна",
  },
  {
    number: "309",
    name: "История",
    floor: 3,
    type: "classroom",
    classAssigned: "9б",
    subject: "История",
    teacher: "Страшнова Наталья Николаевна",
  },
  {
    number: "310",
    name: "Русский язык",
    floor: 3,
    type: "classroom",
    classAssigned: "6а",
    subject: "Русский язык",
    teacher: "Вершинина Ирина Константиновна",
  },
];

export default function SchoolNavigationScreen() {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const floors = [1, 2, 3];

  const getFilteredRooms = () => {
    let rooms = SCHOOL_ROOMS.filter((room) => room.floor === selectedFloor);

    if (searchQuery) {
      rooms = rooms.filter(
        (room) =>
          room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return rooms;
  };

  const getRoomTypeIcon = (type: Room["type"]) => {
    switch (type) {
      case "classroom":
        return "🏫";
      case "special":
        return "🎯";
      case "office":
        return "🏢";
      case "service":
        return "🏥";
      default:
        return "📍";
    }
  };

  const getRoomTypeColor = (type: Room["type"]) => {
    switch (type) {
      case "classroom":
        return "#4CAF50";
      case "special":
        return "#FF9800";
      case "office":
        return "#2196F3";
      case "service":
        return "#9C27B0";
      default:
        return "#666";
    }
  };

  const showRoomInfo = (room: Room) => {
    let description = `Кабинет: ${room.number}\nЭтаж: ${room.floor}`;

    if (room.classAssigned) {
      description += `\nКласс: ${room.classAssigned}`;
    }

    if (room.subject) {
      description += `\nПредмет: ${room.subject}`;
    }

    if (room.teacher) {
      description += `\nОтветственный: ${room.teacher}`;
    }

    Alert.alert(room.name, description, [{ text: "OK", style: "default" }]);
  };

  const filteredRooms = getFilteredRooms();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.subtitle}>
          3 этажа • {SCHOOL_ROOMS.length} кабинета
        </ThemedText>
      </ThemedView>

      {/* Floor Selector */}
      <ThemedView style={styles.floorSelector}>
        <ThemedText style={styles.floorSelectorTitle}>Этаж:</ThemedText>
        <ThemedView style={styles.floorButtons}>
          {floors.map((floor) => (
            <TouchableOpacity
              key={floor}
              style={[
                styles.floorButton,
                selectedFloor === floor && styles.floorButtonActive,
              ]}
              onPress={() => setSelectedFloor(floor)}
            >
              <ThemedText
                style={[
                  styles.floorButtonText,
                  selectedFloor === floor && styles.floorButtonTextActive,
                ]}
              >
                {floor}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Room Types Legend */}
        <ThemedView style={styles.legendContainer}>
          <ThemedText type="defaultSemiBold" style={styles.legendTitle}>
            Условные обозначения:
          </ThemedText>
          <ThemedView style={styles.legendItems}>
            <ThemedView style={styles.legendItem}>
              <ThemedText style={styles.legendIcon}>🏫</ThemedText>
              <ThemedText style={styles.legendText}>
                Учебные кабинеты
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.legendItem}>
              <ThemedText style={styles.legendIcon}>🎯</ThemedText>
              <ThemedText style={styles.legendText}>
                Специальные кабинеты
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.legendItem}>
              <ThemedText style={styles.legendIcon}>🏢</ThemedText>
              <ThemedText style={styles.legendText}>
                Административные
              </ThemedText>
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
            {selectedFloor} этаж ({filteredRooms.length} каб.)
          </ThemedText>

          <ThemedView style={styles.roomsGrid}>
            {filteredRooms.map((room) => (
              <TouchableOpacity
                key={`${room.floor}-${room.number}`}
                style={[
                  styles.roomCard,
                  { borderLeftColor: getRoomTypeColor(room.type) },
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
                {room.classAssigned && (
                  <ThemedText style={styles.roomDescription}>
                    Класс: {room.classAssigned}
                  </ThemedText>
                )}
                {room.teacher && (
                  <ThemedText style={styles.roomTeacher} numberOfLines={1}>
                    {room.teacher.split(" ").slice(0, 2).join(" ")}
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
              onPress={() =>
                Alert.alert(
                  "Столовая",
                  "Столовая находится в кабинете 101 на 1 этаже\nОтветственный: Союстова Анна Ивановна"
                )
              }
            >
              <ThemedText style={styles.quickFindIcon}>🍽️</ThemedText>
              <ThemedText style={styles.quickFindText}>Столовая</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickFindButton}
              onPress={() =>
                Alert.alert(
                  "Спортзал",
                  "Большой спортзал - кабинет 218 на 2 этаже\nМалый спортзал - кабинет 203 на 2 этаже"
                )
              }
            >
              <ThemedText style={styles.quickFindIcon}>🏀</ThemedText>
              <ThemedText style={styles.quickFindText}>Спортзал</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickFindButton}
              onPress={() =>
                Alert.alert(
                  "Библиотека",
                  "Библиотека находится в кабинете 204 на 2 этаже\nОтветственный: Захарова Валентина Сергеевна"
                )
              }
            >
              <ThemedText style={styles.quickFindIcon}>📚</ThemedText>
              <ThemedText style={styles.quickFindText}>Библиотека</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickFindButton}
              onPress={() =>
                Alert.alert(
                  "Директор",
                  "Кабинет директора - кабинет 214 на 2 этаже\nВеретенникова Светлана Павловна"
                )
              }
            >
              <ThemedText style={styles.quickFindIcon}>🏢</ThemedText>
              <ThemedText style={styles.quickFindText}>Директор</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {/* Info */}
        <ThemedView style={styles.infoContainer}>
          <ThemedText type="defaultSemiBold" style={styles.infoTitle}>
            ℹ️ Информация
          </ThemedText>
          <ThemedText style={styles.infoText}>
            Нажмите на кабинет для получения подробной информации.{"\n"}
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
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  subtitle: {
    marginTop: 4,
    color: "#666",
  },
  floorSelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  floorSelectorTitle: {
    marginRight: 12,
    fontWeight: "600",
  },
  floorButtons: {
    flexDirection: "row",
    gap: 8,
  },
  floorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    minWidth: 40,
    alignItems: "center",
  },
  floorButtonActive: {
    backgroundColor: "#007AFF",
  },
  floorButtonText: {
    color: "#666",
    fontWeight: "600",
  },
  floorButtonTextActive: {
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  legendContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  legendTitle: {
    marginBottom: 12,
  },
  legendItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: "45%",
  },
  legendIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#666",
  },
  roomsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  roomsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  roomCard: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    minWidth: "47%",
    maxWidth: "47%",
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  roomCardHeader: {
    flexDirection: "row",
    alignItems: "center",
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
    color: "#666",
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  roomDescription: {
    color: "#999",
    fontSize: 12,
    marginBottom: 2,
  },
  roomTeacher: {
    color: "#007AFF",
    fontSize: 11,
    fontWeight: "500",
  },
  quickFindContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  quickFindItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickFindButton: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    minWidth: "45%",
  },
  quickFindIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  quickFindText: {
    color: "#1976D2",
    fontWeight: "600",
  },
  infoContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: "#FFF3E0",
    borderRadius: 12,
  },
  infoTitle: {
    marginBottom: 8,
    color: "#F57C00",
  },
  infoText: {
    color: "#666",
    lineHeight: 20,
  },
});
