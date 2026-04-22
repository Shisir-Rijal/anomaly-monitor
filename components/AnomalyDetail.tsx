import { View, Text, Image, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Anomaly } from '../types/Anomaly';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';

interface AnomalyDetailProps {
  anomaly: Anomaly;
  onClose: () => void;
}

export default function AnomalyDetail({ anomaly, onClose }: AnomalyDetailProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.date}>{anomaly.createdAt}</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={18} color={Colors.textPrimary} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          {anomaly.imageUri ? (
            <Image source={{ uri: anomaly.imageUri }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={48} color={Colors.border} />
            </View>
          )}
          <View style={styles.content}>
            <Text style={styles.title}>{anomaly.title}</Text>
            <Text style={styles.description}>{anomaly.description}</Text>
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
          <Pressable style={styles.closeButtonFull} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
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
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
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
  description: {
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
  closeButtonFull: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    fontFamily: Typography.bodySemiBold,
    fontSize: 16,
    color: Colors.textPrimary,
  },
});
