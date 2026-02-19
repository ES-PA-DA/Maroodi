import Screen from "@components/Screen";
import ScreenHeader from "@components/ScreenHeader";

export default function Index() {
  return (
    <Screen floatingActionButtonShown={ true }>
      <ScreenHeader iconShown={ true } iconName="create">Stores</ScreenHeader>
    </Screen>
  );
}
