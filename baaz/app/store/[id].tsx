import Input from "@components/Input";
import Screen from "@components/Screen";
import { useRouter } from "expo-router";
import { ListRenderItem } from "react-native";
import ItemList from "@/src/components/ItemList";
import TextSlot from "@/src/components/TextSlot";
import { useLocalSearchParams } from "expo-router";
import ScreenHeader from "@components/ScreenHeader";
import ScrollableList from "@/src/components/ScrollableList";

export default function Store() {

  const { id: storeId } = useLocalSearchParams();
  const title = Number(storeId) == 1 ? "Walmart" : "Calimax";

  type Product = {
    id: number;
    name: string;
    date: string;
  };
  
  const data: Product[] = [
    { id: 1, name: "Avocado", date: "2026-02-22" },
    { id: 2, name: "Milk", date: "2026-02-22" },
  ];

  const router = useRouter();

  const navigateToProduct = (id: number) => router.navigate({
    pathname: "../product/[id]",
    params: { id: String(id), storeId: storeId },
  });

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ItemList
      id={ item.id }
      title={ item.name }
      subtitle={ item.date }
      onItemClick={ navigateToProduct }
      slot={ <TextSlot text="10 prices" /> }
    />
  );
  const keyExtractor = (item: Product, index: number) => String(item.id);

  return (
    <Screen floatingActionButtonShown={ true }>
      <ScreenHeader iconShown={ true } iconName="edit">{ title }</ScreenHeader>
      <Input placeholder="Search" iconName="search" onInputChange={ () => {} }/>
      <ScrollableList
        data={ data }
        renderItem={ renderItem }
        keyExtractor={ keyExtractor }
      />
    </Screen>
  );
}
