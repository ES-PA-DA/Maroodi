import { useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";

import Input from "@components/Input";
import Screen from "@components/Screen";
import Button from "@components/Button";
import ImageInput from "@components/ImageInput";
import ScreenHeader from "@components/ScreenHeader";
import DropdownMenu from "@components/DropdownMenu";


export default function CreateUpdateStore() {

  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");

  const units = ["KG", "PZ", "L"];
  const categories = ["Fruits", "Vegetables", "Meat"];


  return (
    <Screen>
      <ScreenHeader>New product</ScreenHeader>
      <Input placeholder="Name" iconName="text-fields" onInputChange={() => {}} />
      <DropdownMenu 
        items={ units } 
        placeholder="Unit"
        selectedItem={ unit }
        onSelectedItem={ setUnit } />
      <DropdownMenu 
        items={ categories } 
        placeholder="Category"
        selectedItem={ category }
        onSelectedItem={ setCategory } />
      <Input placeholder="Price" iconName="money" onInputChange={() => {}} />
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
