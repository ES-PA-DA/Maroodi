import { useEffect } from "react";
import { Stack } from "expo-router";
import client from "@/src/storage/client";
import { SQLiteProvider } from "expo-sqlite";
import { hideAsync } from "expo-splash-screen";
import { useFonts } from "@expo-google-fonts/dm-sans";
import { preventAutoHideAsync } from "expo-splash-screen";

import {
  DMSans_700Bold,
  DMSans_300Light,
  DMSans_500Medium,
  DMSans_400Regular
} from "@expo-google-fonts/dm-sans";

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

  return (
    <SQLiteProvider 
      onInit={client}
      databaseName="storage.db">
      <Stack screenOptions={{ headerShown: false }} />
    </SQLiteProvider>
  );
}
