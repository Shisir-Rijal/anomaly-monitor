import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnomalyCard from '../../components/AnomalyCard';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

const DUMMY_DATA = [
  {
    id: '1',
    title: 'Mission Section 31',
    description: 'A very complicated mission. Strange lights observed near the old tower.',
    date: '19.04.2026, 16:45',
  },
  {
    id: '2',
    title: 'Unknown Signal Detected',
    description: 'Recurring radio frequency pattern, no known source identified.',
    date: '18.04.2026, 09:12',
  },
  {
    id: '3',
    title: 'Object Over Horizon',
    description: 'Fast-moving object observed at dusk, no aircraft in registered flight paths.',
    date: '17.04.2026, 20:03',
  },
];

export default function MyAnomaliesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.label}>ASSIGNED TO YOU</Text>
        <Text style={styles.title}>My Anomalies</Text>
      </View>

      <FlatList
        data={DUMMY_DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => (
          <AnomalyCard
            title={item.title}
            description={item.description}
            date={item.date}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 6,
  },
  label: {
    fontFamily: Typography.bodySemiBold,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.accent,
  },
  title: {
    fontFamily: Typography.heading,
    fontSize: 36,
    color: Colors.textPrimary,
  },
  list: {
    padding: 24,
  },
});
