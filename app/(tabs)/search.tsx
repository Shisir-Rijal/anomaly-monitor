import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import ApodListItem from '../../components/ApodListItem';
import { fetchApodRange } from '../../services/apodService';
import { Apod } from '../../types/Apod';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

type PickerTarget = 'from' | 'to' | null;

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function SearchScreen() {
  const insets = useSafeAreaInsets();

  const [fromDate, setFromDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const [toDate, setToDate] = useState(new Date());
  const [pickerTarget, setPickerTarget] = useState<PickerTarget>(null);

  const [results, setResults] = useState<Apod[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const [selectedApod, setSelectedApod] = useState<Apod | null>(null);

  async function handleSearch() {
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const data = await fetchApodRange(formatDate(fromDate), formatDate(toDate));
      setResults(data);
    } catch (e) {
      setError('Failed to load results. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleDateChange(_: unknown, date?: Date) {
    if (!date) { setPickerTarget(null); return; }
    if (pickerTarget === 'from') setFromDate(date);
    if (pickerTarget === 'to') setToDate(date);
    setPickerTarget(null);
  }

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
            <Pressable style={styles.dateInput} onPress={() => setPickerTarget('from')}>
              <Text style={styles.dateText}>{formatDisplayDate(fromDate)}</Text>
            </Pressable>
          </View>
          <View style={styles.dateField}>
            <Text style={styles.dateLabel}>TO</Text>
            <Pressable style={styles.dateInput} onPress={() => setPickerTarget('to')}>
              <Text style={styles.dateText}>{formatDisplayDate(toDate)}</Text>
            </Pressable>
          </View>
        </View>

        {pickerTarget && (
          <DateTimePicker
            value={pickerTarget === 'from' ? fromDate : toDate}
            mode="date"
            maximumDate={new Date()}
            onChange={handleDateChange}
          />
        )}

        <Pressable style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>

      {loading && (
        <View style={styles.feedback}>
          <ActivityIndicator color={Colors.accent} size="large" />
        </View>
      )}

      {error && !loading && (
        <View style={styles.feedback}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!loading && !error && searched && results.length === 0 && (
        <View style={styles.feedback}>
          <Text style={styles.emptyText}>No image results found for this date range.</Text>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.date}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => (
            <ApodListItem
              date={item.date}
              title={item.title}
              description={item.explanation}
              imageUri={item.url}
              onPress={() => setSelectedApod(item)}
            />
          )}
        />
      )}

      {selectedApod && (
        <ApodDetail apod={selectedApod} onClose={() => setSelectedApod(null)} />
      )}
    </View>
  );
}

import ApodDetail from '../../components/ApodDetail';

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
    color: Colors.background,
  },
  list: {
    padding: 24,
  },
  feedback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorText: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  emptyText: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
