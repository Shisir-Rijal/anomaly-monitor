import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnomalyCard from '../../components/AnomalyCard';
import AnomalyDetail from '../../components/AnomalyDetail';
import ScreenHeader from '../../components/ScreenHeader';
import { useAnomalies } from '../../context/AnomalyContext';
import { Anomaly } from '../../types/Anomaly';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

export default function MyAnomaliesScreen() {
  const insets = useSafeAreaInsets();
  const { anomalies } = useAnomalies();
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader label="ASSIGNED TO YOU" title="My Anomalies" />

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
            onPress={() => setSelectedAnomaly(item)}
          />
        )}
      />

      {selectedAnomaly && (
        <AnomalyDetail
          anomaly={selectedAnomaly}
          onClose={() => setSelectedAnomaly(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
