import Spacing from "@constants/Spacing";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { ScaledSize } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EdgeInsets } from "react-native-safe-area-context";

type FloatingActionButtonProps = {
  insets: EdgeInsets,
  windowDimensions: ScaledSize,
  iconName: keyof typeof Ionicons.glyphMap,
  onClick?: () => void
};

export default function FloatingActionButton({
  windowDimensions,
  insets,
  iconName,
  onClick
} : FloatingActionButtonProps) {

  const top = (
    windowDimensions.height -
    insets.bottom -
    Spacing.floatingActionButton.height -
    Spacing.floatingActionButton.marginBottom
  );
  const left = (
    windowDimensions.width -
    Spacing.floatingActionButton.width -
    Spacing.floatingActionButton.marginLeft
  );

  return (
    <Pressable onPress={ onClick } style={ [styles.button, { top: top, left: left }] }>
      <Ionicons name={ iconName } size={ Spacing.floatingActionButton.iconSize } color="#FFF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    position: "absolute",
    alignItems: "center",
    backgroundColor: "#000",
    justifyContent: "center",
    width: Spacing.floatingActionButton.width,
    height: Spacing.floatingActionButton.height,
    elevation: Spacing.floatingActionButton.elevation,
    borderRadius: Spacing.floatingActionButton.borderRadius,
  },
});
