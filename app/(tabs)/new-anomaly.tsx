import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

export default function NewAnomalyScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.label}>CREATE A REPORT</Text>
        <Text style={styles.title}>New Anomaly</Text>
      </View>

      <View style={styles.form}>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Mission Section 31"
            placeholderTextColor={Colors.textSecondary}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>DESCRIPTION</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe what you observed..."
            placeholderTextColor={Colors.textSecondary}
            multiline
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>IMAGE</Text>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={48} color={Colors.textSecondary} />
            <Text style={styles.imagePlaceholderText}>No image selected</Text>
          </View>
          <View style={styles.imageButtons}>
            <Pressable style={styles.imageButton}>
              <Ionicons name="camera-outline" size={20} color={Colors.textPrimary} />
              <Text style={styles.imageButtonText}>Camera</Text>
            </Pressable>
            <Pressable style={[styles.imageButton, styles.imageButtonAccent]}>
              <Ionicons name="images-outline" size={20} color={Colors.background} />
              <Text style={[styles.imageButtonText, { color: Colors.background }]}>Gallery</Text>
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Anomaly</Text>
        </Pressable>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 24,
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
  form: {
    padding: 24,
    gap: 24,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontFamily: Typography.bodySemiBold,
    fontSize: 11,
    letterSpacing: 1.5,
    color: Colors.textSecondary,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 14,
    color: Colors.textPrimary,
    fontFamily: Typography.body,
    fontSize: 15,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  imagePlaceholder: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  imagePlaceholderText: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  imageButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  imageButtonAccent: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  imageButtonText: {
    fontFamily: Typography.bodySemiBold,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  saveButton: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    fontFamily: Typography.bodySemiBold,
    fontSize: 16,
    color: Colors.background,
  },
});
