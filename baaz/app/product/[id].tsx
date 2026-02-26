import Screen from "@components/Screen";
import CustomTitle from "@components/CustomTitle";
import { useLocalSearchParams } from "expo-router";
import ScreenHeader from "@/src/components/ScreenHeader";
import ScrollableList from "@/src/components/ScrollableList";
import { ListRenderItem, Text } from "react-native";
import ItemList from "@/src/components/ItemList";
import IconButton from "@components/IconButton";

export default function Product() {

  const { id: productId, storeId } = useLocalSearchParams();
  const title = Number(productId) == 1 ? "Avocado" : "Milk";

  type Price = {
    id: number;
    amount: string;
    date: string;
  };

  const data: Price[] = [
    { id: 1, amount: "10", date: "2026-02-25" },
    { id: 2, amount: "15", date: "2026-02-25" },
  ];
  const renderItem: ListRenderItem<Price> = ({ item }) => (
    <ItemList
      id={ item.id }
      subtitle={ item.date }
      onItemClick={ () => {} }
      title={ "$" + item.amount }
      slot={ <IconButton iconName="close" /> }
    />
  );
  const keyExtractor = (item: Price, index: number) => String(item.id);

  return (
    <Screen floatingActionButtonShown={ true }>
      <ScreenHeader iconShown={ true } iconName="edit">{ title }</ScreenHeader>
      <CustomTitle title="Current Price"text="$78.95" />
      <ScrollableList
        data={ data }
        renderItem={ renderItem }
        keyExtractor={ keyExtractor }
      />
    </Screen>
  );
}
