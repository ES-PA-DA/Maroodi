import { useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

import Input from "@components/Input";
import Screen from "@components/Screen";
import Button from "@components/Button";
import ImageInput from "@components/ImageInput";
import ScreenHeader from "@components/ScreenHeader";
import DropdownMenu from "@components/DropdownMenu";


const getProduct = (id: Number) => ({
  id: 1, name: "Avocado", unit: "KG", category: "Vegetables", price: 100
});


export default function CreateUpdateStore() {

  const params = useLocalSearchParams();
  const isEdition = params?.id && !isNaN(Number(params.id));
  const product = isEdition ? getProduct(Number(params.id)) : undefined;

  const [unit, setUnit] = useState(product?.unit || "");
  const [category, setCategory] = useState(product?.category || "");

  const units = ["KG", "PZ", "L"];
  const categories = ["Fruits", "Vegetables", "Meat"];


  return (
    <Screen>
      <ScreenHeader
        iconName="delete"
        onIconClick={ () => {} }
        iconShown={ Boolean(product) }
      >{ product?.name || "New product" }</ScreenHeader>
      <Input
        iconName="text-fields"
        onInputChange={() => {}}
        placeholder={ product?.name || "Name" } />
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
      <Input 
        iconName="money"
        onInputChange={() => {}}
        placeholder={ !!product ? String(product?.price) : "Price" } />
      <ImageInput />
      { !product &&
        <View style={ styles.buttons }>
          <Button onClick={ () => {} }>Add</Button>
        </View>
      }
      { product &&
        <View style={ styles.buttons }>
          <Button onClick={ () => {} }>Update</Button>
        </View>
      }
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
