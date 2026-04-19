import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Syne_700Bold } from '@expo-google-fonts/syne';
import { SpaceGrotesk_400Regular, SpaceGrotesk_600SemiBold } from '@expo-google-fonts/space-grotesk';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Syne_700Bold,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_600SemiBold,
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}