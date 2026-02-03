import { ReactNode } from "react";
import Colors from "@constants/Colors";
import Spacing from "@constants/Spacing";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type BaseScreenProps = {
  children?: ReactNode,
};

export default function BaseScreen({ children } : BaseScreenProps) {
  return (
    <SafeAreaView style={ styles.container }>{ children }</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.screen.padding,
    backgroundColor: Colors.backgroundColor,
  },
});
