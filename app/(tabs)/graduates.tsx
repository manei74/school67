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

export default function GraduatesScreen() {
  const openFipi = async () => {
    try {
      await Linking.openURL(
        "https://fipi.ru/ege/demoversii-specifikacii-kodifikatory"
      );
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось открыть ссылку");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Выпускнику</ThemedText>
        <ThemedText style={styles.subtitle}>
          Материалы ФИПИ для подготовки к ЕГЭ
        </ThemedText>
      </ThemedView>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.fipiCard}
            onPress={openFipi}
            activeOpacity={0.8}
          >
            <ThemedView style={styles.fipiHeader}>
              <ThemedText style={styles.fipiIcon}>📚</ThemedText>
              <ThemedView style={styles.fipiInfo}>
                <ThemedText type="defaultSemiBold" style={styles.fipiTitle}>
                  Материалы ФИПИ
                </ThemedText>
                <ThemedText style={styles.fipiDescription}>
                  Демоверсии, спецификации и кодификаторы ЕГЭ 2026
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedText style={styles.openText}>Открыть сайт ФИПИ →</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Info Section */}
        <ThemedView style={styles.infoSection}>
          <ThemedText type="subtitle" style={styles.infoTitle}>
            🎓 О материалах ФИПИ
          </ThemedText>
          <ThemedText style={styles.infoText}>
            Федеральный институт педагогических измерений (ФИПИ) — организация,
            разрабатывающая контрольные измерительные материалы для
            государственной итоговой аттестации.
          </ThemedText>
          <ThemedText style={styles.infoText}>
            • Демоверсии помогают понять структуру экзамена{"\n"}• Спецификации
            содержат детальное описание КИМ{"\n"}• Кодификаторы определяют
            элементы содержания
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
});
