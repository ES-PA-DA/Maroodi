import { ReactNode } from "react";
import Spacing from "@constants/Spacing";
import { StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FloatingActionButton from "@components/FloatingActionButton";

type ScreenProps = {
  children?: ReactNode,
  floatingActionButtonShown?: boolean,
  onFloatingActionButtonClick?: () => void,
};

export default function Screen({
  children,
  floatingActionButtonShown,
  onFloatingActionButtonClick
} : ScreenProps) {

  const insets = useSafeAreaInsets();
  const windowDimensions = useWindowDimensions();

  return (
    <SafeAreaView style={ styles.screen }>
      { children }
      { floatingActionButtonShown &&
        <FloatingActionButton
          iconName="add"
          insets={ insets }
          windowDimensions={ windowDimensions }
          onClick={ onFloatingActionButtonClick }
        />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: 16,
    flex: 1,
    position: "relative",
    padding: Spacing.screenPadding,
  },
});
