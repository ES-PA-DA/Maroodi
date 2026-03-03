import { Text } from "react-native";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import Typography from "../constants/Typography";


type ButtonProps = {
  children: string;
};


export default function Button({ children } : ButtonProps) {
  return (
    <Pressable style={ styles.button }>
      <Text style={ styles.text }>{ children }</Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  button: {
    height: 56,
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#000",
    justifyContent: "center",
  },
  text: {
    color: "#FFF",
    fontFamily: Typography.bold,
    fontSize: Typography.sizes.text,
  },
});
