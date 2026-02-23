import Screen from "@components/Screen";
import ScreenHeader from "@/src/components/ScreenHeader";
import { useLocalSearchParams } from "expo-router";

export default function Product() {

  const { id: productId, storeId } = useLocalSearchParams();
  const title = Number(productId) == 1 ? "Avocado" : "Milk";

  return (
    <Screen floatingActionButtonShown={ true }>
      <ScreenHeader iconShown={ true } iconName="edit">{ title }</ScreenHeader>
    </Screen>
  );
}
