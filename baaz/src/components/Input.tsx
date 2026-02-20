import { useState } from "react";
import { View } from "react-native";
import Spacing from "@constants/Spacing";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Typography from "../constants/Typography";

type InputProps = {
  placeholder: string,
  iconName: keyof typeof MaterialIcons.glyphMap,
  onInputChange: (input: string) => void,
};

export default function Input({ placeholder, iconName, onInputChange } : InputProps) {

  const [isFocus, onFocus] = useState(false);

  return (
    <View style={ [styles.input, isFocus ? styles.inputFocus : {} ]}>
      <MaterialIcons name={ iconName } size={ 24 } color="#000" />
      <TextInput
        placeholder={ placeholder }
        style={ styles.placeholder }
        onFocus={ () => { onFocus(!isFocus); } }
        onChangeText={ (input) => { onInputChange(input); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#D3D3D3",
    gap: Spacing.input.gap,
    height: Spacing.input.height,
    borderWidth: Spacing.input.borderWidth,
    paddingLeft: Spacing.input.paddingLeft,
    borderRadius: Spacing.input.borderRadius,
    paddingRight: Spacing.input.paddingRight,
  },
  inputFocus: {
    borderColor: "#000",
    borderWidth: Spacing.input.focus.borderWidth,
  },
  placeholder: {
    flex: 1,
    fontFamily: Typography.medium,
    fontSize: Typography.sizes.text,
  },
});
