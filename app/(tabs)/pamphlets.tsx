import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface Pamphlet {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: "pdf" | "html";
  url?: string;
  content?: string;
}

const PAMPHLETS: Pamphlet[] = [
  {
    id: "1",
    title: "Положение о школьной форме",
    description: "Требования к внешнему виду учащихся лицея",
    icon: "👔",
    type: "pdf",
    url: "https://chel67.ru/wp-content/uploads/2025/02/%D0%9F%D0%BE%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE-%D0%B2%D0%BD%D0%B5%D1%88%D0%BD%D0%B5%D0%BC-%D0%B2%D0%B8%D0%B4%D0%B5-%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%D1%81%D1%8F_2025.pdf",
  },
  {
    id: "2",
    title: "Правила поведения учащихся",
    description: "Правила внутреннего распорядка для учеников",
    icon: "📋",
    type: "pdf",
    url: "https://chel67.ru/wp-content/uploads/2025/02/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D0%B2%D0%BD%D1%83%D1%82%D1%80%D0%B5%D0%BD%D0%BD%D0%B5%D0%B3%D0%BE-%D1%80%D0%B0%D1%81%D0%BF%D0%BE%D1%80%D1%8F%D0%B4%D0%BA%D0%B0-%D0%B4%D0%BB%D1%8F-%D1%83%D1%87%D0%B0%D1%89%D0%B8%D1%85%D1%81%D1%8F_2025.pdf",
  },
  {
    id: "3",
    title: "Памятка по безопасности",
    description: "Правила безопасного поведения в школе и дома",
    icon: "🛡️",
    type: "html",
    content: `
# Памятка по безопасности

## Пожарная безопасность

1. Не играть с огнем и легковоспламеняющимися предметами
2. Знать план эвакуации
3. При обнаружении дыма немедленно сообщить взрослым

## Электробезопасность

1. Не трогать оголенные провода
2. Не засовывать посторонние предметы в розетки
3. Не пользоваться неисправными электроприборами

## Дорожная безопасность

1. Переходить дорогу только на зеленый свет
2. Смотреть по сторонам перед переходом
3. Не играть на проезжей части

## Интернет-безопасность

1. Не разглашать личную информацию
2. Не встречаться с незнакомцами из интернета
3. Сообщать взрослым о подозрительном контенте

## В зимний период

1. Не ходить по тонкому льду
2. Одеваться по погоде
3. Быть осторожным на скользких дорожках

## Летом

1. Не находиться долго на солнце без защиты
2. Купаться только в разрешенных местах
3. Пить достаточно воды
    `,
  },
];

export default function PamphletsScreen() {
  const openDocument = async (pamphlet: Pamphlet) => {
    if (pamphlet.type === "pdf" && pamphlet.url) {
      try {
        await Linking.openURL(pamphlet.url);
      } catch (error) {
        Alert.alert("Ошибка", "Не удалось открыть документ");
      }
    } else if (pamphlet.type === "html" && pamphlet.content) {
      // For HTML content, we'll show it in an alert for now
      // In a real app, this would open a dedicated screen
      Alert.alert(
        pamphlet.title,
        pamphlet.content.replace(/#{1,6}\s/g, "").replace(/\n\n/g, "\n"),
        [{ text: "Закрыть", style: "cancel" }],
        { cancelable: true }
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.subtitle}>
          Важная информация для учащихся и родителей
        </ThemedText>
      </ThemedView>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.pamphletsContainer}>
          {PAMPHLETS.map((pamphlet) => (
            <TouchableOpacity
              key={pamphlet.id}
              style={styles.pamphletCard}
              onPress={() => openDocument(pamphlet)}
              activeOpacity={0.7}
            >
              <ThemedView style={styles.pamphletHeader}>
                <ThemedText style={styles.pamphletIcon}>
                  {pamphlet.icon}
                </ThemedText>
                <ThemedView style={styles.pamphletInfo}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={styles.pamphletTitle}
                  >
                    {pamphlet.title}
                  </ThemedText>
                  <ThemedText style={styles.pamphletDescription}>
                    {pamphlet.description}
                  </ThemedText>
                </ThemedView>
              </ThemedView>

              <ThemedView style={styles.pamphletFooter}>
                <ThemedView
                  style={[
                    styles.typeBadge,
                    pamphlet.type === "pdf"
                      ? styles.pdfBadge
                      : styles.htmlBadge,
                  ]}
                >
                  <ThemedText style={styles.typeText}>
                    {pamphlet.type.toUpperCase()}
                  </ThemedText>
                </ThemedView>
                <ThemedText style={styles.openText}>Открыть →</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
        </ThemedView>

        {/* Additional Info Section */}
        <ThemedView style={styles.infoSection}>
          <ThemedText type="subtitle" style={styles.infoTitle}>
            ℹ️ Дополнительная информация
          </ThemedText>
          <ThemedText style={styles.infoText}>
            Все документы регулярно обновляются. Если у вас есть вопросы,
            обратитесь к классному руководителю или администрации лицея.
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
    paddingVertical: 8,
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
  pamphletsContainer: {
    padding: 16,
  },
  pamphletCard: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    marginBottom: 12,
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
  pamphletHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  pamphletIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  pamphletInfo: {
    flex: 1,
  },
  pamphletTitle: {
    marginBottom: 4,
  },
  pamphletDescription: {
    color: "#666",
    lineHeight: 20,
  },
  pamphletFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pdfBadge: {
    backgroundColor: "#FFE5E5",
  },
  htmlBadge: {
    backgroundColor: "#E5F3FF",
  },
  typeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  openText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
  },
  infoSection: {
    margin: 16,
    padding: 16,
    backgroundColor: "#FFF9C4",
    borderRadius: 12,
  },
  infoTitle: {
    marginBottom: 8,
  },
  infoText: {
    color: "#666",
    lineHeight: 20,
  },
});
