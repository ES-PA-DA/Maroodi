import { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import Typography from "@constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";


type DropdownMenuProps = {
  items: string[];
  placeholder: string;
  selectedItem: string;
  onSelectedItem: (item: string) => void;
};


export default function DropdownMenu({
  items,
  placeholder,
  selectedItem,
  onSelectedItem
} : DropdownMenuProps) {

  const [toggle, onToggle] = useState(false);


  return (
    <View style={ styles.menu }>
      <Pressable 
        style={ styles.input }
        onPress={ () => { onToggle(!toggle); } } >
        <Text style={ styles.placeholder }>{ selectedItem || placeholder }</Text>
        <MaterialIcons 
          size={ 20 } 
          color="#000"
          name={ toggle ? "arrow-drop-up" : "arrow-drop-down" } />
      </Pressable>
      { toggle &&
        <View style={ styles.items }>
          { items.map((item) => (
              <Pressable>
                <Text style={ styles.item }>{ item }</Text>
              </Pressable>
            )) 
          }
        </View>
      }
    </View>
  );
}


const styles = StyleSheet.create({
  menu: {
    position: "relative",
  },
  input: {
    height: 56,
    borderWidth: 1,
    display: "flex",
    borderRadius: 4,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    borderColor: "#D3D3D3",
    justifyContent: "space-between",
  },
  placeholder: {
    color: "#757575",
    fontFamily: Typography.medium,
    fontSize: Typography.sizes.text,
  },
  items: {
    gap: 8,
    width: "100%",
    marginTop: 64,
    borderWidth: 1,
    display: "flex",
    position: "absolute",
    borderColor: "#D3D3D3",
    backgroundColor: "#000",
  },
  item: {
    color: "#000",
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontFamily: Typography.regular,
    fontSize: Typography.sizes.text,
  }
});
