import { useState } from "react";
import { useRouter } from "expo-router";
import { ListRenderItem } from "react-native";

import Input from "@components/Input";
import Screen from "@components/Screen";
import TextSlot from "@components/TextSlot";
import ItemList from "@components/ItemList";
import ScreenHeader from "@components/ScreenHeader";
import ScrollableList from "@components/ScrollableList";


type Store = {
  id: number;
  name: string;
  created_at: string;
  amountOfProducts: number;
};


const storeKeyExtractor = (store: Store, _: number) => String(store.id);


export default function Index() {

  const router = useRouter();
  const [_, onSearchInput] = useState("");

  const data: Store[] = [
    { id: 1, name: "Walmart", created_at: "2026-02-26", amountOfProducts: 10 },
    { id: 2, name: "Calimax", created_at: "2026-02-26", amountOfProducts: 8 },
    { id: 3, name: "Soriana", created_at: "2026-02-26", amountOfProducts: 21 },
  ];


  const storeRenderItem: ListRenderItem<Store> = ({ item: store }) => (
    <ItemList
      id={ store.id }
      title={ store.name }
      subtitle={ store.created_at }
      slot={ <TextSlot text={ `${store.amountOfProducts} product(s)` } /> }
      onItemClick={(id: number) => {router.push({ pathname: "./products", params: { storeId: id }})}} />
  );


  return (
    <Screen 
      floatingActionButtonShown={ true }
      onFloatingActionButtonClick={ () => { router.push("./stores/create"); } } >
      <ScreenHeader>Stores</ScreenHeader>
      <Input
        iconName="search"
        placeholder="Search"
        onInputChange={ onSearchInput } />
      <ScrollableList
        data={ data }
        renderItem={ storeRenderItem }
        keyExtractor={ storeKeyExtractor } />
    </Screen>
  );
}
