import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onChangeClass: () => void;
  onCheckUpdates: () => void;
  onBugReport: () => void;
}

export default function SettingsModal({
  visible,
  onClose,
  onChangeClass,
  onCheckUpdates,
  onBugReport,
}: SettingsModalProps) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <ThemedView style={styles.modalContainer}>
          {/* Header with close button */}
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
            </TouchableOpacity>
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 0,
    minWidth: 280,
    maxWidth: 320,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    minWidth: 28,
    minHeight: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },
  optionsContainer: {
    padding: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginVertical: 2,
  },
  optionIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: "center",
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
});