import { useRouter } from "expo-router";
import { ListRenderItem } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { IStore } from "@/src/storage/storeService";
import { IProduct } from "@/src/storage/productService";
import { getStoreById } from "@/src/storage/storeService";
import { getProducts } from "@/src/storage/productService";

import Input from "@components/Input";
import Screen from "@components/Screen";
import ItemList from "@/src/components/ItemList";
import TextSlot from "@/src/components/TextSlot";
import ScreenHeader from "@components/ScreenHeader";
import ScrollableList from "@/src/components/ScrollableList";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";


type Product = {
  id: number;
  name: string;
  created_at: string;
  amountOfPrices: number;
};


const productKeyExtractor = (product: Product, _: number) => String(product.id);


export default function Store() {

  const router = useRouter();
  const db = useSQLiteContext();
  const { storeId } = useLocalSearchParams();

  const [store, setStore] = useState<IStore | null>(null);
  const [products, setProducts] = useState<IProduct[] | null>(null);


  useEffect(() => {
    
    const fetchStore = async () => {
      const data = await getStoreById(db, Number(storeId));
      setStore(data);
    };

    const fetchProducts = async () => {
      const data = await getProducts(db, Number(storeId));
      setProducts(data);
    };

    fetchStore();
    fetchProducts();
  }, []);


  const productRenderItem: ListRenderItem<Product> = ({ item: product }) => (
    <ItemList
      id={ product.id }
      title={ product.name }
      subtitle={ product.created_at }
      slot={ <TextSlot text={ `${product.amountOfPrices} price(s)` } /> } 
      onItemClick={ (id: number) => {
        router.push({ pathname: "./prices", params: { storeId: storeId, productId: id }})
      }} />
  );


  return (
    <Screen 
      floatingActionButtonShown={ true }
      onFloatingActionButtonClick={ () => { router.push({
        pathname: "./products/create",
        params: { storeId: storeId }
      }); } } >
      <ScreenHeader
        iconName="edit"
        iconShown={ true }
        onIconClick={ () => router.push({ pathname: "./stores/[id]", params: { id: storeId } }) }>
        { store?.name || "Products" }
      </ScreenHeader>
      <Input 
        iconName="search"
        placeholder="Search"
        onInputChange={ () => {} } />
      <ScrollableList
        data={ products }
        renderItem={ productRenderItem }
        keyExtractor={ productKeyExtractor } />
    </Screen>
  );
}
