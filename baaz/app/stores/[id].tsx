import { View } from "react-native";
import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

import Input from "@components/Input";
import Screen from "@components/Screen";
import Button from "@components/Button";
import ImageInput from "@components/ImageInput";
import ScreenHeader from "@components/ScreenHeader";


const getStore = (id: number) => ({ id: 1, name: "Walmart", lat: 1, log: 1 });


export default function CreateUpdateStore() {

  const props = useLocalSearchParams();


  return (
    <Screen>
      <ScreenHeader>New product</ScreenHeader>
      <Input
        placeholder="Name"
        iconName="text-fields"
        onInputChange={() => {}} />
      <Input
        placeholder="Latitude"
        iconName="text-fields"
        onInputChange={() => {}} />
      <Input
        iconName="text-fields"
        placeholder="Longitude"
        onInputChange={() => {}} />
      <ImageInput />
      <View style={ styles.buttons }>
        <Button onClick={ () => {} }>Add</Button>
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
