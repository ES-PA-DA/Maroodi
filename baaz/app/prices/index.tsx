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
import {
  getProductById, getProductPrices, IPrice, IProduct, getProductStoreId, addProductPrice, deleteProductPrice
} from "@/src/storage/productService";


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
  const [prices, setPrices] = useState<IPrice[] | null>(null);
  const [product, setProduct] = useState<IProduct | null>(null);


  useEffect(() => {

    const fetchProduct = async () => {
      const data = await getProductById(db, Number(productId));
      setProduct(data);
    };

    const fetchPrices = async () => {
      let data:any = await getProductStoreId(db, Number(storeId), Number(productId));
      if (data) {
        const prices = await getProductPrices(db, data.id);
        setPrices(prices);
      }
    };

    fetchProduct();
    fetchPrices();
  }, []);


  const onPriceModalDismiss = () => setShowModal(false);


  const onAddPriceClick = async (price: string) => {
    const id: any = await getProductStoreId(db, Number(storeId), Number(productId));
    await addProductPrice(db, id.id, price);
  };

  const onDeletePriceClick = async (id: number) => {
    await deleteProductPrice(db, id);
  }


  const priceRenderItem: ListRenderItem<any> = ({ item: price }) => (
    <ItemList
      id={ price.id }
      onItemClick={ () => {} }
      title={ "$" + price?.price || "" }
      subtitle={ price.created_at }
      slot={ <IconButton iconName="close" onIconClick={ () => { onDeletePriceClick(price.id); }} /> } />
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
          text={ prices ? "$" + prices[prices.length - 1].price : "N/A" }
          title="Current Price" />
        <ScrollableList
          data={ prices }
          renderItem={ priceRenderItem }
          keyExtractor={ priceKeyExtractor } />
      </Screen>
      { showModal && <PriceModal onDismiss={ onPriceModalDismiss } onClick={ onAddPriceClick }/> }
    </>
  );
}
