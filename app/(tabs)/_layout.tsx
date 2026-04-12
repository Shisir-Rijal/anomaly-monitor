import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="new-anomaly" options={{ title: 'New Anomaly' }} />
      <Tabs.Screen name="my-anomalies" options={{ title: 'My Anomalies' }} />
      <Tabs.Screen name="search" options={{ title: 'Search' }} />
    </Tabs>
  );
}
