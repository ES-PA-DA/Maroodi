import {
  hideAsync,
  preventAutoHideAsync
} from "expo-splash-screen";
import {
  useFonts,
  DMSans_700Bold,
  DMSans_300Light,
  DMSans_500Medium,
  DMSans_400Regular
} from "@expo-google-fonts/dm-sans";

import { useEffect } from "react";
import { Stack } from "expo-router";

preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    DMSans_700Bold,
    DMSans_300Light,
    DMSans_500Medium,
    DMSans_400Regular,
  });

  useEffect(() => {
    if (loaded || error) hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return <Stack screenOptions={{ headerShown: false, }} />;
}
