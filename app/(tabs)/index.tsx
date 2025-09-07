import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import SettingsBottomSheet from "@/src/components/SettingsBottomSheet";
import { checkForUpdatesManually } from "@/src/components/UpdateChecker";
import BellsScreen from "@/src/screens/BellsScreen";
import SchoolNavigationScreen from "@/src/screens/SchoolNavigationScreen";
import WeekScheduleScreen from "@/src/screens/WeekScheduleScreen";
import { apiService } from "@/src/services/api";
import { useAppStore } from "@/src/store/simpleStore";
import { formatClassName } from "@/src/utils/classUtils";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type ScheduleTab = "today" | "week" | "navigation" | "bells";

export default function ScheduleScreen() {
  const {
    settings,
    schedule,
    isLoading,
    isOnboardingCompleted,
    setSchedule,
    setLoading,
    setSelectedClass,
    resetOnboarding,
  } = useAppStore();

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<ScheduleTab>("today");
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  useEffect(() => {
    if (isOnboardingCompleted && settings.selectedClassId) {
      loadTodaySchedule();
    }
  }, [isOnboardingCompleted, settings.selectedClassId]);

  const loadTodaySchedule = async () => {
    if (!settings.selectedClassId) return;

    setLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const schedule = await apiService.getSchedule(
        settings.selectedClassId,
        today
      );
      setSchedule(schedule);
    } catch (error) {
      console.error("Failed to load schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTodaySchedule();
    setRefreshing(false);
  };

  const openBugReport = () => {
    Alert.alert(
      "Обратная связь",
      "Сейчас откроется почтовое приложение с шаблоном для сообщения об ошибках. Пожалуйста, приложите скриншоты или запись экрана, если возможно.",
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Открыть почту",
          onPress: () => {
            const subject = "Сообщение об ошибке - Лицей 67 App";
            const body = `Привет!

Я нашел ошибку в приложении Лицей 67.

ОПИСАНИЕ ОШИБКИ:
[Опишите, что произошло]

ШАГИ ДЛЯ ВОСПРОИЗВЕДЕНИЯ:
1. 
2. 
3. 

ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ:
• Класс: ${
              settings.selectedClassId
                ? formatClassName(settings.selectedClassId)
                : "не выбран"
            }
• Дата: ${new Date().toLocaleDateString()}

ВАЖНО: Пожалуйста, приложите скриншоты или запись экрана, если возможно.

Спасибо за помощь в улучшении приложения!`;

            const emailUrl = `mailto:maneev.nikita@gmail.com?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(body)}`;

            Linking.openURL(emailUrl).catch(() => {
              Alert.alert("Ошибка", "Не удалось открыть почтовое приложение");
            });
          },
        },
      ]
    );
  };

  const openSettings = () => {
    console.log(
      "🔧 Opening settings modal, current state:",
      settingsModalVisible
    );
    setSettingsModalVisible(true);
  };

  const showClassSelection = () => {
    console.log("🔄 Redirecting to class selection (onboarding screen)");
    Alert.alert(
      "Смена класса",
      "Сейчас откроется экран выбора класса со всеми доступными вариантами",
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Продолжить",
          onPress: async () => {
            console.log("🔄 Resetting onboarding to show class selection");
            try {
              await resetOnboarding();
            } catch (error) {
              console.error("Error resetting onboarding:", error);
            }
          },
        },
      ]
    );
  };

  const renderTabButton = (tab: ScheduleTab, label: string, icon: string) => (
    <TouchableOpacity
      key={tab}
      style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
      onPress={() => setActiveTab(tab)}
    >
      <IconSymbol
        size={18}
        name={icon as any}
        color={activeTab === tab ? "#FFFFFF" : "#666"}
      />
      <ThemedText
        style={[
          styles.tabButtonText,
          activeTab === tab && styles.tabButtonTextActive,
        ]}
      >
        {label}
      </ThemedText>
    </TouchableOpacity>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "week":
        return <WeekScheduleScreen />;
      case "bells":
        return <BellsScreen />;
      case "navigation":
        return <SchoolNavigationScreen />;
      case "today":
      default:
        return renderTodaySchedule();
    }
  };

  const renderTodaySchedule = () => {
    if (!isOnboardingCompleted || !settings.selectedClassId) {
      return (
        <ThemedView style={styles.emptyState}>
          <ThemedText type="title">Добро пожаловать!</ThemedText>
          <ThemedText style={styles.emptyText}>
            Для просмотра расписания необходимо выбрать класс в настройках
          </ThemedText>
          <TouchableOpacity style={styles.button} onPress={showClassSelection}>
            <ThemedText style={styles.buttonText}>Выбрать класс</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      );
    }

    return (
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ThemedView style={styles.loadingContainer}>
            <ThemedText>Загрузка расписания...</ThemedText>
          </ThemedView>
        ) : schedule && schedule.lessons.length > 0 ? (
          <ThemedView style={styles.lessonsContainer}>
            {schedule.lessons.map((lesson) => (
              <ThemedView key={lesson.num} style={styles.lessonCard}>
                <View style={styles.lessonHeader}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={styles.lessonNumber}
                  >
                    {lesson.num}
                  </ThemedText>
                  <ThemedText type="default" style={styles.lessonTime}>
                    {lesson.timeStart} - {lesson.timeEnd}
                  </ThemedText>
                </View>

                {/* Handle lessons with multiple parts (subgroups) */}
                {lesson.parts && lesson.parts.length > 0 ? (
                  lesson.parts.map((part, index) => (
                    <View
                      key={index}
                      style={
                        lesson.parts.length > 1 ? styles.lessonPart : undefined
                      }
                    >
                      {part.subgroup && (
                        <ThemedText style={styles.subgroupLabel}>
                          {part.subgroup}
                        </ThemedText>
                      )}
                      <ThemedText type="subtitle" style={styles.lessonSubject}>
                        {part.subject}
                      </ThemedText>
                      <View style={styles.lessonDetails}>
                        <ThemedText style={styles.lessonRoom}>
                          Кабинет: {part.room || "не указан"}
                        </ThemedText>

                        {part.teacher && (
                          <ThemedText style={styles.lessonTeacher}>
                            {part.teacher}
                          </ThemedText>
                        )}
                      </View>
                    </View>
                  ))
                ) : (
                  // Fallback for lessons without parts
                  <>
                    <ThemedText type="subtitle" style={styles.lessonSubject}>
                      {lesson.subject || "Предмет не указан"}
                    </ThemedText>
                    <View style={styles.lessonDetails}>
                      <ThemedText style={styles.lessonRoom}>
                        Кабинет: {lesson.room || "не указан"}
                      </ThemedText>
                      {lesson.teacher && (
                        <ThemedText style={styles.lessonTeacher}>
                          {lesson.teacher}
                        </ThemedText>
                      )}
                    </View>
                  </>
                )}
              </ThemedView>
            ))}
          </ThemedView>
        ) : (
          <ThemedView style={styles.emptyState}>
            <ThemedText>На сегодня уроков нет</ThemedText>
          </ThemedView>
        )}
      </ScrollView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      {/* Settings button positioned absolutely at top right */}
      <TouchableOpacity
        onPress={openSettings}
        style={styles.settingsButtonFloat}
      >
        <ThemedText style={styles.settingsIcon}>⚙️</ThemedText>
      </TouchableOpacity>

      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerContent}>
          <ThemedView>
            <ThemedText type="title">Расписание</ThemedText>
            <ThemedText style={styles.tagline}>
              В приложении — удобно, на доске лицея — точно
            </ThemedText>
            {settings.selectedClassId && (
              <ThemedText type="subtitle">
                {formatClassName(settings.selectedClassId)} класс
              </ThemedText>
            )}
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Tab Navigation */}
      <ThemedView style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {renderTabButton("today", "Сегодня", "calendar")}
          {renderTabButton("week", "Неделя", "calendar.badge.clock")}
          {renderTabButton("navigation", "Навигация", "map")}
          {renderTabButton("bells", "Звонки", "bell")}
        </ScrollView>
      </ThemedView>

      {/* Content */}
      {renderContent()}

      {/* Settings Bottom Sheet */}
      <SettingsBottomSheet
        visible={settingsModalVisible}
        onClose={() => setSettingsModalVisible(false)}
        onChangeClass={showClassSelection}
        onCheckUpdates={checkForUpdatesManually}
        onBugReport={openBugReport}
      />
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
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingsButton: {
    padding: 8,
    borderRadius: 8,
  },
  settingsButtonFloat: {
    position: "absolute",
    top: 60,
    right: 16,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(248, 249, 250, 0.9)",
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  settingsIcon: {
    fontSize: 20,
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 8,
  },
  tabScrollContent: {
    paddingHorizontal: 16,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  tabButtonActive: {
    backgroundColor: "#007AFF",
  },
  tabButtonText: {
    marginLeft: 6,
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
  tabButtonTextActive: {
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    textAlign: "center",
    marginVertical: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  lessonsContainer: {
    padding: 16,
  },
  lessonCard: {
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
  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  lessonNumber: {
    backgroundColor: "#007AFF",
    color: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    minWidth: 28,
    textAlign: "center",
  },
  lessonTime: {
    color: "#666",
    fontSize: 14,
  },
  lessonSubject: {
    marginBottom: 8,
  },
  lessonDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  lessonRoom: {
    color: "#666",
    fontSize: 14,
  },
  lessonTeacher: {
    color: "#666",
    fontSize: 14,
    fontStyle: "italic",
  },
  lessonPart: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  subgroupLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  tagline: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#007AFF",
    marginTop: 3,
    marginBottom: 6,
    fontWeight: "500",
  },
});
