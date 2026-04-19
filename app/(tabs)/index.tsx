import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar barStyle="light-content" />

      <View style={styles.hero} />

      <View style={styles.content}>
        <Text style={styles.label}>ANOMALY MONITOR</Text>
        <Text style={styles.title}>Home</Text>
        <View style={styles.divider} />
        <Text style={styles.description}>
          Document the unexplained. Capture anomalies around you
          and search NASA's image archive for inspiration.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    width: '100%',
    height: 320,
    backgroundColor: Colors.surface,
  },
  content: {
    padding: 24,
    gap: 12,
  },
  label: {
    fontFamily: Typography.bodySemiBold,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.accent,
  },
  title: {
    fontFamily: Typography.heading,
    fontSize: 42,
    color: Colors.textPrimary,
    lineHeight: 46,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: Colors.accent,
    marginVertical: 4,
  },
  description: {
    fontFamily: Typography.body,
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
});
