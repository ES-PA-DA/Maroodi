import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "@constants/Colors";
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
    backgroundColor: Colors.backgroundColor,
  },
});
