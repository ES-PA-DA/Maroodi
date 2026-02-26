import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import Typography from "../constants/Typography";

type CustomTitleProps = {
  text: string;
  title: string;
};

export default function CustomTitle({ text, title } : CustomTitleProps) {
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>{ text }</Text>
      <Text style={ styles.text }>{ title }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontFamily: Typography.bold,
    fontSize: Typography.sizes.title,
  },
  text: {
    fontFamily: Typography.bold,
    fontSize: Typography.sizes.subtitle,
  },
});
