import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ApodListItem from '../../components/ApodListItem';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

const DUMMY_RESULTS = [
  {
    id: '1',
    date: '2026-03-26',
    title: 'Black Holes and Neutron Stars: 218 Mergers and Counting',
    description: 'What is the sound of two black holes merging in deep space? Sound waves don\'t propagate in vacuum, but gravitational waves do.',
    imageUri: 'https://apod.nasa.gov/apod/image/2603/GWTC4-Events-Poster-Landscape_1024.jpg',
  },
  {
    id: '2',
    date: '2026-03-25',
    title: 'The Guardians of Rapa Nui beneath the Milky Way',
    description: 'What have these silent sentinels watched pass across the sky? The Easter Island statues have stood for hundreds of years.',
    imageUri: 'https://apod.nasa.gov/apod/image/2603/MoaiMilkyWay_1024.jpg',
  },
  {
    id: '3',
    date: '2026-03-22',
    title: 'Light Pillars and Orion over Mohe',
    description: 'What are those colorful pillars of light? Pictured here are not auroras but light pillars, a phenomenon typically close to the ground.',
    imageUri: 'https://apod.nasa.gov/apod/image/2603/LightPillars_1024.jpg',
  },
  {
    id: '4',
    date: '2026-03-21',
    title: 'Galaxies in the River: NGC 1300 and NGC 1297',
    description: 'Spiral NGC 1300 and elliptical NGC 1297 are galaxies that lie on the banks of the constellation Eridanus.',
    imageUri: 'https://apod.nasa.gov/apod/image/2603/NGC1300_1024.jpg',
  },
];

export default function SearchScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      <View style={styles.controls}>
        <View style={styles.header}>
          <Text style={styles.label}>EXPLORE RECORDS</Text>
          <Text style={styles.title}>APOD Search</Text>
        </View>

        <View style={styles.dateRow}>
          <View style={styles.dateField}>
            <Text style={styles.dateLabel}>FROM</Text>
            <View style={styles.dateInput}>
              <Text style={styles.dateText}>20. Mar 2026</Text>
            </View>
          </View>
          <View style={styles.dateField}>
            <Text style={styles.dateLabel}>TO</Text>
            <View style={styles.dateInput}>
              <Text style={styles.dateText}>26. Mar 2026</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>

      <FlatList
        data={DUMMY_RESULTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <ApodListItem
            date={item.date}
            title={item.title}
            description={item.description}
            imageUri={item.imageUri}
            onPress={() => {}}
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
  controls: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
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
  dateRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
  },
  dateField: {
    flex: 1,
    gap: 8,
  },
  dateLabel: {
    fontFamily: Typography.bodySemiBold,
    fontSize: 11,
    letterSpacing: 1.5,
    color: Colors.textSecondary,
  },
  dateInput: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 14,
  },
  dateText: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  searchButton: {
    marginHorizontal: 24,
    marginTop: 16,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  searchButtonText: {
    fontFamily: Typography.bodySemiBold,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  list: {
    padding: 24,
    gap: 12,
  },
});
