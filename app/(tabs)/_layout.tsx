import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // Always call the hook
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            paddingBottom: insets.bottom,
            height: 49 + insets.bottom,
          },
          default: {
            paddingBottom: Math.max(insets.bottom, 5),
            height: 60 + Math.max(insets.bottom, 5),
            paddingTop: 5,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Расписание',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Календарь',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="calendar.badge.clock" color={color} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'Новости',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="newspaper" color={color} />,
        }}
      />
      <Tabs.Screen
        name="olympiads"
        options={{
          title: 'Олимпиады',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="trophy" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pamphlets"
        options={{
          title: 'Памятки',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="doc.text" color={color} />,
        }}
      />
      <Tabs.Screen
        name="graduates"
        options={{
          title: 'Выпускнику',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="graduationcap" color={color} />,
        }}
      />
    </Tabs>
  );
}
