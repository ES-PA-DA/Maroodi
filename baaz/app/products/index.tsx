import { useRouter } from "expo-router";
import { ListRenderItem } from "react-native";
import { useLocalSearchParams } from "expo-router";

import Input from "@components/Input";
import Screen from "@components/Screen";
import ItemList from "@/src/components/ItemList";
import TextSlot from "@/src/components/TextSlot";
import ScreenHeader from "@components/ScreenHeader";
import ScrollableList from "@/src/components/ScrollableList";


type Product = {
  id: number;
  name: string;
  created_at: string;
  amountOfPrices: number;
};


const productKeyExtractor = (product: Product, _: number) => String(product.id);


export default function Store() {

  const router = useRouter();
  const { storeId } = useLocalSearchParams();
  
  const data: Product[] = [
    { id: 1, name: "Avocado", created_at: "2026-02-27", amountOfPrices: 10 },
    { id: 2, name: "Milk", created_at: "2026-02-27", amountOfPrices: 8 },
    { id: 3, name: "Cereal", created_at: "2026-02-27", amountOfPrices: 21 },
  ];


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
      onFloatingActionButtonClick={ () => { router.push("./products/create"); } } >
      <ScreenHeader
        iconName="edit"
        iconShown={ true }>Products</ScreenHeader>
      <Input 
        iconName="search"
        placeholder="Search"
        onInputChange={ () => {} } />
      <ScrollableList
        data={ data }
        renderItem={ productRenderItem }
        keyExtractor={ productKeyExtractor } />
    </Screen>
  );
}
