import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';

interface ScreenHeaderProps {
  label: string;
  title: string;
}

export default function ScreenHeader({ label, title }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
