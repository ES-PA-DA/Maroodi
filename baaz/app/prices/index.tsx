import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ListRenderItem } from "react-native";
import { useLocalSearchParams } from "expo-router";

import Screen from "@components/Screen";
import PriceModal from "@components/PriceModal";
import IconButton from "@components/IconButton";
import ItemList from "@/src/components/ItemList";
import CustomTitle from "@components/CustomTitle";
import ScreenHeader from "@/src/components/ScreenHeader";
import ScrollableList from "@/src/components/ScrollableList";
import { useSQLiteContext } from "expo-sqlite";
import { getProductById, IProduct } from "@/src/storage/productService";


type Price = {
  id: number;
  amount: string;
  created_at: string;
};


const priceKeyExtractor = (price: Price, _: number) => String(price.id);


export default function Product() {

  const router = useRouter();
  const db = useSQLiteContext();

  const [showModal, setShowModal] = useState(false);
  const { storeId, productId } = useLocalSearchParams();
  const [product, setProduct] = useState<IProduct | null>(null);

  const data: Price[] = [
    { id: 1, amount: "17.90", created_at: "2026-02-27" },
    { id: 2, amount: "18.90", created_at: "2026-02-27" },
    { id: 3, amount: "21.90", created_at: "2026-02-27" },
  ];


  useEffect(() => {

    const fetchProduct = async () => {
      const data = await getProductById(db, Number(productId));
      setProduct(data);
    };

    fetchProduct();
  }, []);


  const onPriceModalDismiss = () => setShowModal(false);


  const priceRenderItem: ListRenderItem<Price> = ({ item: price }) => (
    <ItemList
      id={ price.id }
      onItemClick={ () => {} }
      title={ "$" + price.amount }
      subtitle={ price.created_at }
      slot={ <IconButton iconName="close" /> } />
  );


  return (
    <>
      <Screen
        floatingActionButtonShown={ true }
        onFloatingActionButtonClick={ () => { setShowModal(true); }}>
        <ScreenHeader 
          iconName="edit"
          iconShown={ true }
          onIconClick={ () => {
            router.push({ pathname: "./products/[id]", params: { id: productId, storeId: storeId} }) }
          }
          >{ product?.name || "Prices" }</ScreenHeader>
        <CustomTitle 
          text="$78.95"
          title="Current Price" />
        <ScrollableList
          data={ data }
          renderItem={ priceRenderItem }
          keyExtractor={ priceKeyExtractor } />
      </Screen>
      { showModal && <PriceModal onDismiss={ onPriceModalDismiss }/> }
    </>
  );
}
