import { useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { addProduct, deleteProduct, getProductById } from "@/src/storage/productService";
import { addProductToStore } from "@/src/storage/productService";
import { addProductPrice } from "@/src/storage/productService";
import { IProduct } from "@/src/storage/productService";
import { useLocalSearchParams } from "expo-router";

import Input from "@components/Input";
import Screen from "@components/Screen";
import Button from "@components/Button";
import ImageInput from "@components/ImageInput";
import ScreenHeader from "@components/ScreenHeader";
import DropdownMenu from "@components/DropdownMenu";
import { useSQLiteContext } from "expo-sqlite";


const getProduct = (id: Number) => ({
  id: 1, name: "Avocado", unit: "KG", category: "Vegetables", price: 100
});


export default function CreateUpdateStore() {

  const db = useSQLiteContext();
  const params = useLocalSearchParams();
  const isEdition = params?.id && !isNaN(Number(params.id));

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState<IProduct | null>(null);
  const [unit, setUnit] = useState(product?.unit || "");
  const [category, setCategory] = useState(product?.category || "");

  const units = ["KG", "PZ", "L"];
  const categories = ["Fruits", "Vegetables", "Meat"];


  useEffect(() => {

    const fetchProduct = async () => {
      const data = await getProductById(db, Number(params.id));
      setProduct(data);
    };

    fetchProduct();
    setUnit(product?.unit || "");
    setCategory(product?.category || "");
  }, []);

  const onAddClick = async () => {
    const product: IProduct = {
      id: 0,
      status: 0,
      name: name,
      unit: unit,
      picture: "",
      category: category,
      created_at: "2026-03-10"
    };
    let result = await addProduct(db, product);
    if (result.changes > 0) {
      const productId = result.lastInsertRowId;
      console.log(params);
      result = await addProductToStore(db, productId, Number(params.storeId));
      if (result.changes > 0) {
        const storeProductId = result.lastInsertRowId;
        result = await addProductPrice(db, storeProductId, price);
        if (result.changes > 0) console.info("OK");
      }
    }
  };

  const onDeleteClick = async () => {
    deleteProduct(db, Number(params.id));
  };


  return (
    <Screen>
      <ScreenHeader
        iconName="delete"
        onIconClick={ onDeleteClick }
        iconShown={ Boolean(product) }
      >{ product?.name || "New product" }</ScreenHeader>
      <Input
        iconName="text-fields"
        onInputChange={ setName }
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
      { !product &&
        <Input 
          iconName="money"
          placeholder={ "Price" } 
          onInputChange={ setPrice } />
      }
      <ImageInput />
      { !product &&
        <View style={ styles.buttons }>
          <Button onClick={ onAddClick }>Add</Button>
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
