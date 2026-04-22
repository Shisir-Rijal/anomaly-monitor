import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator, Modal, Platform } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import ApodListItem from '../../components/ApodListItem';
import ApodDetail from '../../components/ApodDetail';
import ScreenHeader from '../../components/ScreenHeader';
import { formatApiDate, formatDisplayDate } from '../../utils/dateUtils';
import { fetchApodRange } from '../../services/apodService';
import { Apod } from '../../types/Apod';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

type PickerTarget = 'from' | 'to' | null;


export default function SearchScreen() {
  const insets = useSafeAreaInsets();

  const [fromDate, setFromDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const [toDate, setToDate] = useState(new Date());
  const [pickerTarget, setPickerTarget] = useState<PickerTarget>(null);
  const [tempDate, setTempDate] = useState(new Date());

  const [results, setResults] = useState<Apod[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const [selectedApod, setSelectedApod] = useState<Apod | null>(null);

  function openPicker(target: 'from' | 'to') {
    setTempDate(target === 'from' ? fromDate : toDate);
    setPickerTarget(target);
  }

  function handlePickerChange(_: unknown, date?: Date) {
    if (date) setTempDate(date);
    // On Android the dialog closes itself — apply immediately
    if (Platform.OS === 'android') {
      if (date) {
        if (pickerTarget === 'from') setFromDate(date);
        if (pickerTarget === 'to') setToDate(date);
      }
      setPickerTarget(null);
    }
  }

  function confirmDate() {
    if (pickerTarget === 'from') setFromDate(tempDate);
    if (pickerTarget === 'to') setToDate(tempDate);
    setPickerTarget(null);
  }

  async function handleSearch() {
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const data = await fetchApodRange(formatApiDate(fromDate), formatApiDate(toDate));
      setResults(data);
    } catch (e) {
      setError('Failed to load results. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.controls}>
        <ScreenHeader label="EXPLORE RECORDS" title="APOD Search" />

        <View style={styles.dateRow}>
          <View style={styles.dateField}>
            <Text style={styles.dateLabel}>FROM</Text>
            <Pressable style={styles.dateInput} onPress={() => openPicker('from')}>
              <Text style={styles.dateText}>{formatDisplayDate(fromDate)}</Text>
            </Pressable>
          </View>
          <View style={styles.dateField}>
            <Text style={styles.dateLabel}>TO</Text>
            <Pressable style={styles.dateInput} onPress={() => openPicker('to')}>
              <Text style={styles.dateText}>{formatDisplayDate(toDate)}</Text>
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>

      {/* iOS: Bottom Sheet Modal with spinner */}
      {Platform.OS === 'ios' && (
        <Modal
          visible={pickerTarget !== null}
          transparent
          animationType="slide"
          onRequestClose={() => setPickerTarget(null)}
        >
          <Pressable style={styles.pickerBackdrop} onPress={() => setPickerTarget(null)}>
            <View style={[styles.pickerSheet, { paddingBottom: insets.bottom + 16 }]}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                minimumDate={pickerTarget === 'to' ? fromDate : undefined}
                maximumDate={pickerTarget === 'from' ? toDate : new Date()}
                onChange={handlePickerChange}
                textColor={Colors.textPrimary}
                style={styles.picker}
              />
              <Pressable style={styles.pickerDoneButton} onPress={confirmDate}>
                <Text style={styles.pickerDoneText}>Done</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      )}

      {/* Android: native dialog, no wrapper needed */}
      {Platform.OS === 'android' && pickerTarget && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          minimumDate={pickerTarget === 'to' ? fromDate : undefined}
          maximumDate={pickerTarget === 'from' ? toDate : new Date()}
          onChange={handlePickerChange}
        />
      )}

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
  pickerBackdrop: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  pickerSheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  picker: {
    backgroundColor: Colors.surface,
  },
  pickerDoneButton: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  pickerDoneText: {
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
