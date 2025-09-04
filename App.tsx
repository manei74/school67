import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { AppProvider, useAppStore } from '@/src/store/simpleStore';
import OnboardingScreen from '@/src/screens/OnboardingScreen';

// Import screens
import ScheduleScreen from '@/app/(tabs)/index';
import CalendarScreen from '@/app/(tabs)/calendar';
import NewsScreen from '@/app/(tabs)/news';
import OlympiadsScreen from '@/app/(tabs)/olympiads';
import PamphletsScreen from '@/app/(tabs)/pamphlets';
import GraduatesScreen from '@/app/(tabs)/graduates';

const Tab = createBottomTabNavigator();

function MainTabs() {
  console.log('📱 MainTabs rendering');
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Schedule':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Calendar':
              iconName = focused ? 'today' : 'today-outline';
              break;
            case 'News':
              iconName = focused ? 'newspaper' : 'newspaper-outline';
              break;
            case 'Olympiads':
              iconName = focused ? 'trophy' : 'trophy-outline';
              break;
            case 'Pamphlets':
              iconName = focused ? 'document-text' : 'document-text-outline';
              break;
            case 'Graduates':
              iconName = focused ? 'school' : 'school-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ title: 'Расписание' }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ title: 'Календарь' }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{ title: 'Новости' }}
      />
      <Tab.Screen
        name="Olympiads"
        component={OlympiadsScreen}
        options={{ title: 'Олимпиады' }}
      />
      <Tab.Screen
        name="Pamphlets"
        component={PamphletsScreen}
        options={{ title: 'Памятки' }}
      />
      <Tab.Screen
        name="Graduates"
        component={GraduatesScreen}
        options={{ title: 'Выпускнику' }}
      />
    </Tab.Navigator>
  );
}

function AppContent() {
  console.log('📱 AppContent starting');
  
  const { isOnboardingCompleted } = useAppStore();
  console.log('👋 Onboarding completed:', isOnboardingCompleted);

  if (!isOnboardingCompleted) {
    console.log('✨ Showing OnboardingScreen');
    return <OnboardingScreen />;
  }

  console.log('🏠 Showing main app tabs');
  return <MainTabs />;
}

function App() {
  console.log('🚀 App starting');
  
  return (
    <AppProvider>
      <NavigationContainer>
        <AppContent />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AppProvider>
  );
}

registerRootComponent(App);

export default App;