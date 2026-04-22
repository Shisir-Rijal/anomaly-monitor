import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Image, Alert } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAnomalies } from '../../context/AnomalyContext';
import ScreenHeader from '../../components/ScreenHeader';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

export default function NewAnomalyScreen() {
  const insets = useSafeAreaInsets();
  const { addAnomaly } = useAnomalies();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  async function openGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  async function openCamera() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Camera access is needed to take photos.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  function handleSave() {
    if (!title.trim()) {
      Alert.alert('Missing field', 'Please enter a name for the anomaly.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Missing field', 'Please enter a description.');
      return;
    }
    if (!imageUri) {
      Alert.alert('Missing image', 'Please select or take a photo.');
      return;
    }

    addAnomaly({
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      imageUri,
      createdAt: new Date().toLocaleString(),
    });

    setTitle('');
    setDescription('');
    setImageUri(null);

    Alert.alert('Saved', 'Anomaly has been recorded.');
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader label="CREATE A REPORT" title="New Anomaly" />
      </View>

      <View style={styles.form}>
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Mission Section 31"
            placeholderTextColor={Colors.textSecondary}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>DESCRIPTION</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe what you observed..."
            placeholderTextColor={Colors.textSecondary}
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>IMAGE</Text>
          <Pressable onPress={openGallery}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image-outline" size={48} color={Colors.textSecondary} />
                <Text style={styles.imagePlaceholderText}>Tap to select from gallery</Text>
              </View>
            )}
          </Pressable>
          <Pressable style={styles.cameraButton} onPress={openCamera}>
            <Ionicons name="camera-outline" size={20} color={Colors.textPrimary} />
            <Text style={styles.cameraButtonText}>Take Photo</Text>
          </Pressable>
        </View>

        <Pressable style={styles.saveButton} onPress={handleSave}>
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
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
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
  cameraButton: {
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
  cameraButtonText: {
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
