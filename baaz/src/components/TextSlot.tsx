import { Text } from "react-native";
import { StyleSheet } from "react-native";
import Typography from "@constants/Typography";

type TextSlotProps = {
  text: string;
};

export default function TextSlot({ text } : TextSlotProps) {
  return <Text style={ styles.text }>{ text }</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Typography.regular,
    fontSize: Typography.sizes.text,
  },
});
