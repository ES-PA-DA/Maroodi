import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ListRenderItem } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { IStore } from "@/src/storage/storeService";
import { getStores } from "@/src/storage/storeService";

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
  const db = useSQLiteContext();

  const [_, onSearchInput] = useState("");
  const [stores, setStores] = useState<IStore[] | null>(null);

  useEffect(() => {

    const fetchStores = async () => {
      const data = await getStores(db);
      setStores(data);
    };

    fetchStores();
  }, []);


  const storeRenderItem: ListRenderItem<Store> = ({ item: store }) => (
    <ItemList
      id={ store.id }
      title={ store.name }
      subtitle={ store.created_at }
      slot={ <TextSlot text={ `N/A product(s)` } /> }
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
        data={ stores }
        renderItem={ storeRenderItem }
        keyExtractor={ storeKeyExtractor } />
    </Screen>
  );
}
