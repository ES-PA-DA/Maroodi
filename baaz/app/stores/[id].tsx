import { View } from "react-native";
import { StyleSheet } from "react-native";

import Input from "@components/Input";
import Screen from "@components/Screen";
import Button from "@components/Button";
import ImageInput from "@components/ImageInput";
import ScreenHeader from "@components/ScreenHeader";


export default function CreateUpdateStore() {
  return (
    <Screen>
      <ScreenHeader>New store</ScreenHeader>
      <Input placeholder="Name" iconName="text-fields" onInputChange={() => {}} />
      <Input placeholder="Latitude" iconName="text-fields" onInputChange={() => {}} />
      <Input placeholder="Longitude" iconName="text-fields" onInputChange={() => {}} />
      <ImageInput />
      <View style={ styles.buttons }>
        <Button>Add</Button>
      </View>
    </Screen>
  );
}


const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
});
