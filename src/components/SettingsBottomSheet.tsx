import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";

interface SettingsBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onChangeClass: () => void;
  onCheckUpdates: () => void;
  onBugReport: () => void;
}

export default function SettingsBottomSheet({
  visible,
  onClose,
  onChangeClass,
  onCheckUpdates,
  onBugReport,
}: SettingsBottomSheetProps) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.bottomSheet}>
          {/* Header with title and close button */}
          <View style={styles.header}>
            <ThemedText type="subtitle" style={styles.title}>
              Настройки
            </ThemedText>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.closeIcon}>✕</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Settings options */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                onClose();
                onChangeClass();
              }}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.optionIcon}>🎯</ThemedText>
              <ThemedText style={styles.optionText}>Сменить класс</ThemedText>
              <ThemedText style={styles.chevron}>›</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                onClose();
                onCheckUpdates();
              }}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.optionIcon}>🔄</ThemedText>
              <ThemedText style={styles.optionText}>Проверить обновления</ThemedText>
              <ThemedText style={styles.chevron}>›</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => { 
                onClose();
                onBugReport();
              }}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.optionIcon}>📧</ThemedText>
              <ThemedText style={styles.optionText}>Обратная связь</ThemedText>
              <ThemedText style={styles.chevron}>›</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Bottom safe area */}
          <View style={styles.bottomSafeArea} />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    padding: 6,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  optionsContainer: {
    paddingVertical: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f8f8",
  },
  optionIcon: {
    fontSize: 22,
    marginRight: 16,
    width: 28,
    textAlign: "center",
  },
  optionText: {
    fontSize: 16,
    flex: 1,
    color: "#333",
  },
  chevron: {
    fontSize: 20,
    color: "#ccc",
    fontWeight: "300",
  },
  bottomSafeArea: {
    height: 20,
  },
});