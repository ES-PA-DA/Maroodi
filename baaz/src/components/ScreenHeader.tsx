import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Typography from "@constants/Typography";
import IconButton from "@components/IconButton";
import Spacing from "../constants/Spacing";

type ScreenHeaderProps = {
  children: string,
  iconShown?: boolean,
  iconName?: keyof typeof MaterialIcons.glyphMap,
  onIconClick?: () => void,
};

export default function ScreenHeader({ children, iconShown, iconName, onIconClick } : ScreenHeaderProps) {
  return (
    <View style={ styles.header }>
      <Text style={ styles.title }>{ children }</Text>
      { iconShown &&
        <IconButton iconName={ iconName } onIconClick={ onIconClick } />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    fontFamily: Typography.bold,
    fontSize: Typography.sizes.header,
  },
});
