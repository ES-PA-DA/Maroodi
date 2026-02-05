import { useState } from "react";
import Header from "@components/Header";
import BaseScreen from "@components/BaseScreen";
import CustomSelect from "@components/CustomSelect";

const stores = [
  {
    id: 1,
    name: "Calimax"
  },
  {
    id: 2,
    name: "Ley"
  },
  {
    id: 3,
    name: "Walmart"
  },
];

export default function Index() {

  const [selectedStore, setSelectedStore] = useState("");

  return (
    <BaseScreen>
      <Header>New Price</Header>
      <CustomSelect
        placeholder="Select an option"
        items={ stores }
        selectedItem={selectedStore}
        setSelectedItem={setSelectedStore}
      />
    </BaseScreen>
  );
}
