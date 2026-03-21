import { useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useLocalSearchParams } from "expo-router";
import { deleteStore, getStoreById, IStore, updateStore } from "@/src/storage/storeService";
import { addStore } from "@/src/storage/storeService";

import Input from "@components/Input";
import Screen from "@components/Screen";
import Button from "@components/Button";
import ImageInput from "@components/ImageInput";
import ScreenHeader from "@components/ScreenHeader";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";


const getStore = (id: number) => ({ id: 1, name: "Walmart", lat: 1, log: 1 });


export default function CreateUpdateStore() {

  const db = useSQLiteContext();
  const params = useLocalSearchParams();
  const isEdition = !!params.id && !isNaN(Number(params.id));

  const [store, setStore] = useState<IStore | null>(null);
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {

    const fetchStore = async () => {
      const data = await getStoreById(db, Number(params.id));
      setStore(data);
    };

    if (isEdition) fetchStore();
  }, []);

  const onAddClick = async () => {
    const store: IStore = {
      id: 0,
      status: 0,
      name: name,
      picture: "",
      latitude: latitude,
      longitude: longitude,
      created_at: "2026-03-10"
    };
    const result = await addStore(db, store);
    if (result.changes > 0) console.info("OK!");
  };

  const onUpdateClick = async () => {
    const store: IStore = {
      id: Number(params.id),
      status: 0,
      name: name,
      picture: "",
      latitude: latitude,
      longitude: longitude,
      created_at: "2026-03-10"
    };
    const result = await updateStore(db, store);
    if (result.changes > 0) console.info("OK!");
  };

  const onDeleteClick = async () => {
    const result = await deleteStore(db, Number(params.id));
    if (result.changes > 0) console.info("OK!");
  };


  return (
    <Screen>
      <ScreenHeader
        iconName="delete"
        iconShown={ Boolean(store) } 
        onIconClick={ onDeleteClick }>{ store?.name || "New store" }</ScreenHeader>
      <Input
        iconName="text-fields"
        onInputChange={ setName } 
        placeholder={ store?.name || "Name" } />
      <Input
        iconName="text-fields"
        onInputChange={ setLatitude }
        placeholder={ !!store ? String(store.latitude) : "Latitude" } />
      <Input
        iconName="text-fields"
        onInputChange={ setLongitude }
        placeholder={ !!store ? String(store?.longitude) : "Longitude" } />
      <ImageInput />
      { !store &&
        <View style={ styles.buttons }>
          <Button onClick={ onAddClick }>Add</Button>
        </View>
      }
      { store &&
        <View style={ styles.buttons }>
          <Button onClick={ onUpdateClick }>Update</Button>
        </View>
      }
    </Screen>
  );
}


const styles = StyleSheet.create({
  buttons: {
    gap: 8,
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
});
