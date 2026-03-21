import { ReactNode } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
import Spacing from "../constants/Spacing";


type ModalProps = {
  children: ReactNode;
};


export default function Modal({ children } : ModalProps) {

  return (
      <View
        style={ styles.modal }>
        <View style={ styles.content }>{ children }</View>
      </View>
  );
}


const styles = StyleSheet.create({
  modal: {
    zIndex: 100,
    padding: 16,
    width: "100%",
    height: "100%",
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  content: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#FFF",
  },
});
