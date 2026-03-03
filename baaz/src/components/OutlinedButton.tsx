import { Text } from "react-native";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import Typography from "../constants/Typography";


type OutlinedButtonProps = {
  children: string;
  alignSelf?: string;
};


export default function OutlinedButton({ children } : OutlinedButtonProps) {
  return (
    <Pressable style={ styles.button }>
      <Text style={ styles.text }>{ children }</Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  button: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderColor: "#D3D3D3",
    justifyContent: "center",
  },
  text: {
    fontFamily: Typography.medium,
    fontSize: Typography.sizes.caption,
  }
});
