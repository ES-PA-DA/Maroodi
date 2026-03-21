import { Text } from "react-native";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import Typography from "../constants/Typography";


type ButtonProps = {
  children: string;
  onClick: () => void;
};


export default function Button({ children, onClick } : ButtonProps) {
  return (
    <Pressable 
      style={ styles.button }
      onPress={ () => { onClick(); }}>
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
