import Spacing from "@constants/Spacing";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type IconButtonProps = {
  iconName?: keyof typeof MaterialIcons.glyphMap,
  onIconClick?: () => void,
};

export default function IconButton({ iconName, onIconClick } : IconButtonProps) {
  return (
    <Pressable style={ styles.button } onPress={ onIconClick }>
      <MaterialIcons name={ iconName } size={ Spacing.iconButton.iconSize } color="#000" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    borderColor: "#D3D3D3",
    justifyContent: "center",
    width: Spacing.iconButton.width,
    height: Spacing.iconButton.height,
    borderRadius: Spacing.iconButton.borderRadius,
  },
});
