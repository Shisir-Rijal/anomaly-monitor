import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnomalyCard from '../../components/AnomalyCard';
import { useAnomalies } from '../../context/AnomalyContext';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

export default function MyAnomaliesScreen() {
  const insets = useSafeAreaInsets();
  const { anomalies } = useAnomalies();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.label}>ASSIGNED TO YOU</Text>
        <Text style={styles.title}>My Anomalies</Text>
      </View>

      <FlatList
        data={anomalies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No anomalies recorded yet.</Text>
            <Text style={styles.emptySubtext}>Go to New to create your first report.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <AnomalyCard
            title={item.title}
            description={item.description}
            date={item.createdAt}
            imageUri={item.imageUri}
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
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 8,
  },
  emptyText: {
    fontFamily: Typography.bodySemiBold,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  emptySubtext: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
