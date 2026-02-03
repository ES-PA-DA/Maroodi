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
import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

preventAutoHideAsync();

export default function TabLayout() {

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
    <Tabs screenOptions={{ headerShown: false, }}>
      <Tabs.Screen
        name="index"
        options={{
          title:"New Price",
          tabBarIcon: ({ color }) => <MaterialIcons size={ 24 } name="add" color={ color } />
        }}
      />
    </Tabs>
  );
}
