import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require('../../assets/astronaut_home.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['transparent', 'rgba(13,17,23,0.6)', Colors.background]}
        locations={[0.3, 0.6, 0.85]}
        style={styles.gradient}
      >
        <View style={[styles.content, { paddingBottom: insets.bottom + 32 }]}>
          <Text style={styles.label}>ANOMALY MONITOR</Text>
          <Text style={styles.title}>Home</Text>
          <View style={styles.divider} />
          <Text style={styles.description}>
            Document the unexplained. Capture anomalies around you
            and search NASA's image archive for inspiration.
          </Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    gap: 16,
  },
  label: {
    fontFamily: Typography.bodySemiBold,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.accent,
  },
  title: {
    fontFamily: Typography.heading,
    fontSize: 48,
    color: Colors.textPrimary,
    lineHeight: 52,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: Colors.accent,
  },
  description: {
    fontFamily: Typography.body,
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 28,
  },
});
