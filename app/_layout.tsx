import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import OnboardingScreen from "@/src/screens/OnboardingScreen";
import { AppProvider, useAppStore } from "@/src/store/simpleStore";

function AppContent() {
  console.log("📱 AppContent starting");

  const colorScheme = useColorScheme();
  console.log("🎨 Color scheme:", colorScheme);

  const { isOnboardingCompleted } = useAppStore();
  console.log("👋 Onboarding completed:", isOnboardingCompleted);

  if (!isOnboardingCompleted) {
    console.log("✨ Showing OnboardingScreen");
    return (
      <SafeAreaProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <View style={{ flex: 1 }}>
            <OnboardingScreen />
          </View>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }

  console.log("🏠 Showing main app tabs");
  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function RootLayout() {
  console.log("🚀 RootLayout starting");

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  console.log("📁 Fonts loaded:", loaded);

  if (!loaded) {
    console.log("⏳ Waiting for fonts...");
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontSize: 18, color: "black" }}>
          Loading fonts... 📁
        </Text>
      </View>
    );
  }

  console.log("✅ RootLayout rendering AppProvider");

  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

registerRootComponent(RootLayout);

export default RootLayout;
