import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import 'react-native-reanimated';
import { registerRootComponent } from 'expo';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AppProvider, useAppStore } from '@/src/store/simpleStore';
import OnboardingScreen from '@/src/screens/OnboardingScreen';
import DebugOverlay from '@/src/components/DebugOverlay';

function AppContent() {
  console.log('📱 AppContent starting');
  
  const colorScheme = useColorScheme();
  console.log('🎨 Color scheme:', colorScheme);
  
  const { isOnboardingCompleted } = useAppStore();
  console.log('👋 Onboarding completed:', isOnboardingCompleted);

  if (!isOnboardingCompleted) {
    console.log('✨ Showing OnboardingScreen');
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
          <DebugOverlay step="Showing Onboarding" details={`Color: ${colorScheme}`} />
          <OnboardingScreen />
        </View>
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  console.log('🏠 Showing main app tabs');
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

function RootLayout() {
  console.log('🚀 RootLayout starting');
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  console.log('📁 Fonts loaded:', loaded);

  if (!loaded) {
    console.log('⏳ Waiting for fonts...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontSize: 18, color: 'black' }}>Loading fonts... 📁</Text>
      </View>
    );
  }

  console.log('✅ RootLayout rendering AppProvider');
  
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

registerRootComponent(RootLayout);

export default RootLayout;
