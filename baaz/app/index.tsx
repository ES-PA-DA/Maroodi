import { useState } from "react";
import { Text } from "react-native";
import Input from "@components/Input";
import Screen from "@components/Screen";
import { useRouter } from "expo-router";
import TextSlot from "@components/TextSlot";
import ItemList from "@components/ItemList";
import { ListRenderItem } from "react-native";
import ScreenHeader from "@components/ScreenHeader";
import ScrollableList from "@components/ScrollableList";

export default function Index() {

  const router = useRouter();
  const [searchInput, onSearchInput] = useState("");

  type Store = { id: number, name: string, date: string };

  const data: Store[] = [
    { id: 1, name: "Walmart", date: "2026-02-21" },
    { id: 2, name: "Calimax", date: "2026-02-21" },
  ];

  const navigateToStore = (id: number) => router.navigate({
    pathname: "./store/[id]",
    params: { id: String(id) },
  });

  const keyExtractor = (item: Store, index: number ) => String(item.id);
  const renderItem: ListRenderItem<Store> = ({ item }) => (
    <ItemList
      id={ item.id }
      title={ item.name }
      subtitle={ item.date }
      onItemClick={ navigateToStore }
      slot={ <TextSlot text="10 products" /> }
    />
  );

  return (
    <Screen floatingActionButtonShown={ true }>
      <ScreenHeader>Stores</ScreenHeader>
      <Input iconName="search" placeholder="Search" onInputChange={ onSearchInput } />
      <ScrollableList data={ data } renderItem={ renderItem } keyExtractor={ keyExtractor } />
    </Screen>
  );
}
