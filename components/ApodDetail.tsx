import { View, Text, Image, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAnomalies } from '../context/AnomalyContext';
import { Apod } from '../types/Apod';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';

interface ApodDetailProps {
  apod: Apod;
  onClose: () => void;
}

export default function ApodDetail({ apod, onClose }: ApodDetailProps) {
  const insets = useSafeAreaInsets();
  const { addAnomaly } = useAnomalies();

  function handleSave() {
    addAnomaly({
      id: Date.now().toString(),
      title: apod.title,
      description: apod.explanation,
      imageUri: apod.url,
      createdAt: apod.date,
    });
    onClose();
  }

  return (
    <Modal animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.date}>{apod.date}</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={18} color={Colors.textPrimary} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <Image source={{ uri: apod.url }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.title}>{apod.title}</Text>
            <Text style={styles.explanation}>{apod.explanation}</Text>
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save to My Anomalies</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  date: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    paddingBottom: 24,
  },
  image: {
    width: '100%',
    height: 280,
    backgroundColor: Colors.surface,
  },
  content: {
    padding: 24,
    gap: 16,
  },
  title: {
    fontFamily: Typography.heading,
    fontSize: 26,
    color: Colors.textPrimary,
    lineHeight: 32,
  },
  explanation: {
    fontFamily: Typography.body,
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  saveButton: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: Typography.bodySemiBold,
    fontSize: 16,
    color: Colors.background,
  },
});
