import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';

interface ApodListItemProps {
  date: string;
  title: string;
  description: string;
  imageUri: string;
  onPress: () => void;
}

export default function ApodListItem({ date, title, description, imageUri, onPress }: ApodListItemProps) {
  return (
    <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} onPress={onPress}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={Colors.border} style={styles.chevron} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: 8,
    backgroundColor: Colors.border,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  date: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Colors.accent,
    letterSpacing: 0.5,
  },
  title: {
    fontFamily: Typography.bodySemiBold,
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  description: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  chevron: {
    flexShrink: 0,
  },
});
