import { ListRenderItem } from "react-native";
import { useLocalSearchParams } from "expo-router";

import Screen from "@components/Screen";
import IconButton from "@components/IconButton";
import ItemList from "@/src/components/ItemList";
import CustomTitle from "@components/CustomTitle";
import ScreenHeader from "@/src/components/ScreenHeader";
import ScrollableList from "@/src/components/ScrollableList";


type Price = {
  id: number;
  amount: string;
  created_at: string;
};


const priceKeyExtractor = (price: Price, _: number) => String(price.id);


export default function Product() {

  const { storeId, productId } = useLocalSearchParams();

  const data: Price[] = [
    { id: 1, amount: "17.90", created_at: "2026-02-27" },
    { id: 2, amount: "18.90", created_at: "2026-02-27" },
    { id: 3, amount: "21.90", created_at: "2026-02-27" },
  ];


  const priceRenderItem: ListRenderItem<Price> = ({ item: price }) => (
    <ItemList
      id={ price.id }
      onItemClick={ () => {} }
      title={ "$" + price.amount }
      subtitle={ price.created_at }
      slot={ <IconButton iconName="close" /> } />
  );


  return (
    <Screen floatingActionButtonShown={ true }>
      <ScreenHeader 
        iconName="edit"
        iconShown={ true }>Prices</ScreenHeader>
      <CustomTitle 
        text="$78.95"
        title="Current Price" />
      <ScrollableList
        data={ data }
        renderItem={ priceRenderItem }
        keyExtractor={ priceKeyExtractor } />
    </Screen>
  );
}
