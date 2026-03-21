import { View } from "react-native";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import OutlinedButton from "@components/OutlinedButton";


type ImageInputProps = {};


export default function ImageInput() {
  return (
    <View style={ styles.input }>
      <MaterialIcons name="image" size={ 112 } color="#000" />
      <OutlinedButton>Select a image</OutlinedButton>
    </View>
  );
}


const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    display: "flex",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    borderColor: "#D3D3D3",
    justifyContent: "center",
  },
});
