import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: Colors.surface, borderTopColor: Colors.border },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="new-anomaly"
        options={{
          title: 'New',
          tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-anomalies"
        options={{
          title: 'My Anomalies',
          tabBarIcon: ({ color }) => <Ionicons name="list-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
