import { ThemedText } from "@/src/components/ui/ThemedText";
import { ThemedView } from "@/src/components/ui/ThemedView";
import React from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function GraduatesScreen() {
  const openURL = async (url: string, title: string = "ФИПИ") => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Ошибка", `Не удалось открыть ${title}`);
    }
  };

  const egeSubjects = [
    {
      name: "Русский язык",
      emoji: "📝",
      url: "https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/151883967-1",
    },
    {
      name: "Математика",
      emoji: "🔢",
      url: "https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/151883967-2",
    },
    {
      name: "Физика",
      emoji: "⚛️",
      url: "https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/151883967-3",
    },
    {
      name: "Химия",
      emoji: "🧪",
      url: "https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/151883967-4",
    },
    {
      name: "Биология",
      emoji: "🧬",
      url: "https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/151883967-6",
    },
    {
      name: "История",
      emoji: "🏛️",
      url: "https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/151883967-7",
    },
    {
      name: "Обществознание",
      emoji: "👥",
      url: "https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/151883967-9",
    },
    {
      name: "Литература",
      emoji: "📖",
      url: "https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/151883967-10",
    },
    {
      name: "География",
      emoji: "🌍",
      url: "https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/151883967-8",
    },
    {
      name: "Информатика",
      emoji: "💻",
      url: "https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/151883967-5",
    },
    {
      name: "Английский язык",
      emoji: "🇬🇧",
      url: "https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/151883967-11",
    },
    {
      name: "Немецкий язык",
      emoji: "🇩🇪",
      url: "https://fipi.ru/ege/demoversii-specifikacii-kodifikatory#!/tab/151883967-12",
    },
  ];

  const ogeSubjects = [
    {
      name: "Русский язык",
      emoji: "📝",
      url: "https://fipi.ru/oge/demoversii-specifikacii-kodifikatory#!/tab/173801626-1",
    },
    {
      name: "Математика",
      emoji: "🔢",
      url: "https://fipi.ru/oge/demoversii-specifikacii-kodifikatory#!/tab/173801626-2",
    },
    {
      name: "Физика",
      emoji: "⚛️",
      url: "https://fipi.ru/oge/demoversii-specifikacii-kodifikatory#!/tab/173801626-3",
    },
    {
      name: "Химия",
      emoji: "🧪",
      url: "https://fipi.ru/oge/demoversii-specifikacii-kodifikatory#!/tab/173801626-4",
    },
    {
      name: "Биология",
      emoji: "🧬",
      url: "https://fipi.ru/oge/demoversii-specifikacii-kodifikatory#!/tab/173801626-6",
    },
    {
      name: "История",
      emoji: "🏛️",
      url: "https://fipi.ru/oge/demoversii-specifikacii-kodifikatory#!/tab/173801626-7",
    },
    {
      name: "Обществознание",
      emoji: "👥",
      url: "https://fipi.ru/oge/demoversii-specifikacii-kodifikatory#!/tab/173801626-9",
    },
    {
      name: "Литература",
      emoji: "📖",
      url: "https://fipi.ru/oge/demoversii-specifikacii-kodifikatory#!/tab/173801626-10",
    },
    {
      name: "География",
      emoji: "🌍",
      url: "https://fipi.ru/oge/demoversii-specifikacii-kodifikatory#!/tab/173801626-8",
    },
    {
      name: "Информатика",
      emoji: "💻",
      url: "https://fipi.ru/oge/demoversii-specifikacii-kodifikatory#!/tab/173801626-5",
    },
    {
      name: "Английский язык",
      emoji: "🇬🇧",
      url: "https://fipi.ru/oge/demoversii-specifikacii-kodifikatory#!/tab/173801626-11",
    },
    {
      name: "Немецкий язык",
      emoji: "🇩🇪",
      url: "https://fipi.ru/oge/demoversii-specifikacii-kodifikatory#!/tab/173801626-12",
    },
  ];

  const renderSubjectCard = (subject: {
    name: string;
    emoji: string;
    url: string;
  }) => (
    <TouchableOpacity
      key={subject.name}
      style={styles.subjectCard}
      onPress={() => openURL(subject.url, subject.name)}
      activeOpacity={0.7}
    >
      <ThemedText style={styles.subjectEmoji}>{subject.emoji}</ThemedText>
      <ThemedText style={styles.subjectName}>{subject.name}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Выпускнику</ThemedText>
        <ThemedText style={styles.subtitle}>
          Материалы ФИПИ для подготовки к ОГЭ и ЕГЭ
        </ThemedText>
      </ThemedView>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* EGE Section */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🎓 ЕГЭ (11 класс) - Демоверсии
          </ThemedText>
          <ThemedText style={styles.sectionDescription}>
            Демонстрационные варианты, спецификации и кодификаторы по предметам
          </ThemedText>

          <ThemedView style={styles.subjectsGrid}>
            {egeSubjects.map(renderSubjectCard)}
          </ThemedView>
        </ThemedView>

        {/* Task Banks Section */}
        <ThemedView style={styles.contentContainer}>
          <TouchableOpacity
            style={[styles.fipiCard, styles.taskBankCard]}
            onPress={() =>
              openURL(
                "https://fipi.ru/ege/otkrytyy-bank-zadaniy-ege",
                "Банк заданий ЕГЭ"
              )
            }
            activeOpacity={0.8}
          >
            <ThemedView style={styles.fipiHeader}>
              <ThemedText style={styles.fipiIcon}>🎯</ThemedText>
              <ThemedView style={styles.fipiInfo}>
                <ThemedText type="defaultSemiBold" style={styles.fipiTitle}>
                  Открытый банк заданий ЕГЭ
                </ThemedText>
                <ThemedText style={styles.fipiDescription}>
                  Тысячи заданий для подготовки к ЕГЭ (11 класс)
                </ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedText style={styles.openText}>
              Открыть банк заданий ЕГЭ →
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* OGE Section */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            📝 ОГЭ (9 класс) - Демоверсии
          </ThemedText>
          <ThemedText style={styles.sectionDescription}>
            Демонстрационные варианты, спецификации и кодификаторы по предметам
          </ThemedText>

          <ThemedView style={styles.subjectsGrid}>
            {ogeSubjects.map(renderSubjectCard)}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.contentContainer}>
          <TouchableOpacity
            style={[
              styles.fipiCard,
              styles.taskBankCard,
              styles.ogeTaskBankCard,
            ]}
            onPress={() =>
              openURL(
                "https://fipi.ru/oge/otkrytyy-bank-zadaniy-oge",
                "Банк заданий ОГЭ"
              )
            }
            activeOpacity={0.8}
          >
            <ThemedView style={styles.fipiHeader}>
              <ThemedText style={styles.fipiIcon}>🎲</ThemedText>
              <ThemedView style={styles.fipiInfo}>
                <ThemedText type="defaultSemiBold" style={styles.fipiTitle}>
                  Открытый банк заданий ОГЭ
                </ThemedText>
                <ThemedText style={styles.fipiDescription}>
                  Тысячи заданий для подготовки к ОГЭ (9 класс)
                </ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedText style={styles.openText}>
              Открыть банк заданий ОГЭ →
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Info Section */}
        <ThemedView style={styles.infoSection}>
          <ThemedText type="subtitle" style={styles.infoTitle}>
            💡 О материалах ФИПИ
          </ThemedText>
          <ThemedText style={styles.infoText}>
            • <ThemedText style={styles.bold}>Демоверсии</ThemedText> —
            примерные варианты экзаменационных работ{"\n"}•{" "}
            <ThemedText style={styles.bold}>Спецификации</ThemedText> —
            подробное описание структуры КИМ{"\n"}•{" "}
            <ThemedText style={styles.bold}>Кодификаторы</ThemedText> — перечень
            элементов содержания{"\n"}•{" "}
            <ThemedText style={styles.bold}>Банк заданий</ThemedText> — реальные
            задания из экзаменов прошлых лет
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
    borderBottomColor: "#e0e0e0",
  },
  subtitle: {
    marginTop: 4,
    color: "#666",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  fipiCard: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskBankCard: {
    backgroundColor: "#E8F5E8",
    borderWidth: 2,
    borderColor: "#4CAF50",
    marginBottom: 16,
  },
  ogeTaskBankCard: {
    backgroundColor: "#E3F2FD",
    borderColor: "#2196F3",
  },
  fipiHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  fipiIcon: {
    fontSize: 23,
    marginLeft: 16,
    marginRight: 16,
  },
  fipiInfo: {
    flex: 1,
  },
  fipiTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  fipiDescription: {
    color: "#666",
    lineHeight: 20,
  },
  openText: {
    color: "#9C27B0",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  sectionContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 8,
    color: "#333",
  },
  sectionDescription: {
    color: "#666",
    marginBottom: 16,
    fontSize: 14,
  },
  subjectsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  subjectCard: {
    backgroundColor: "#fff",
    width: "48%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minHeight: 80,
  },
  subjectEmoji: {
    fontSize: 20,
    marginBottom: 6,
  },
  subjectName: {
    fontSize: 11,
    textAlign: "center",
    color: "#333",
    fontWeight: "500",
    lineHeight: 13,
  },
  infoSection: {
    margin: 16,
    padding: 16,
    backgroundColor: "#F3E5F5",
    borderRadius: 12,
  },
  infoTitle: {
    marginBottom: 12,
    color: "#7B1FA2",
  },
  infoText: {
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  bold: {
    fontWeight: "600",
    color: "#333",
  },
});
