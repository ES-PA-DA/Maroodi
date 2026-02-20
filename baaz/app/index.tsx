import { useState } from "react";
import Input from "@components/Input";
import Screen from "@components/Screen";
import ScreenHeader from "@components/ScreenHeader";

export default function Index() {

  const [searchInput, onSearchInput] = useState("");

  return (
    <Screen floatingActionButtonShown={ true }>
      <ScreenHeader iconShown={ true } iconName="create">Stores</ScreenHeader>
      <Input iconName="search" placeholder="Search" onInputChange={ onSearchInput } />
    </Screen>
  );
}
