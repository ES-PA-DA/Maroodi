import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable
} from "react-native";

import Typography from "@constants/Typography";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";

type CustomSelectProps = {
  items: any[],
  placeholder?: string,
  selectedItem: any,
  setSelectedItem: (item: string) => void
};

export default function CustomSelect({
  items,
  placeholder,
  selectedItem,
  setSelectedItem
} : CustomSelectProps) {

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Pressable onPress={() => setOpen(!isOpen)}>
        <View style={ styles.container }>
          <Text style={ styles.placeholder }>{ selectedItem ? selectedItem.name : placeholder }</Text>
          <MaterialIcons size={24}color="#000" name={isOpen ? "arrow-drop-up": "arrow-drop-down"} />
        </View>
      </Pressable>
      { isOpen &&
      <ScrollView style={ styles.list }>
        { items?.map((item, index) => (
          <View key={ item.id } style={ [styles.item, selectedItem.id == item.id ? styles.selectedBackground : {}] }>
            <Pressable onPress={() => {setSelectedItem(item); setOpen(!isOpen);} }>
              <Text style={[styles.text, selectedItem.id == item.id ? styles.selectedColor : {}]}>{ item.name }</Text>
            </Pressable>
          </View>
        )) }
      </ScrollView>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    padding: 8,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholder: {
    fontSize: Typography.sizes.text,
    fontFamily: Typography.fonts.medium,
  },
  list: {
    marginTop: 8,
    maxHeight: 192,
    borderWidth: 1,
    borderRadius: 8,
  },
  item: {
    padding: 8,
    height: 64,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  text: {
    fontFamily: Typography.fonts.regular,
  },
  selectedColor: {
    color: "white",
  },
  selectedBackground: {
    backgroundColor: "blue",
  },
});
