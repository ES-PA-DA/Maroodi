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

  const params = useLocalSearchParams();
  const isEdition = !!params.id && !isNaN(Number(params.id));

  const store = isEdition ? getStore(Number(params.id)) : undefined;


  return (
    <Screen>
      <ScreenHeader
        iconName="delete"
        iconShown={ Boolean(store) } 
        onIconClick={ () => {} }>{ store?.name || "New store" }</ScreenHeader>
      <Input
        iconName="text-fields"
        onInputChange={() => {}} 
        placeholder={ store?.name || "Name" } />
      <Input
        iconName="text-fields"
        onInputChange={() => {}} 
        placeholder={ !!store ? String(store.lat) : "Latitude" } />
      <Input
        iconName="text-fields"
        onInputChange={() => {}} 
        placeholder={ !!store ? String(store?.log) : "Longitude" } />
      <ImageInput />
      { !store &&
        <View style={ styles.buttons }>
          <Button onClick={ () => {} }>Add</Button>
        </View>
      }
      { store &&
        <View style={ styles.buttons }>
          <Button onClick={ () => {} }>Update</Button>
        </View>
      }
    </Screen>
  );
}


const styles = StyleSheet.create({
  buttons: {
    gap: 8,
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
});
