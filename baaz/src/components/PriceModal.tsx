import { View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

import Modal from "@components/Modal";
import Input from "@components/Input";
import Button from "@components/Button";
import IconButton from "@components/IconButton";
import Typography from "../constants/Typography";
import { useState } from "react";


type PriceModalProps = {
  onDismiss: () => void;
  onClick: (price: string) => void;
};


export default function PriceModal({ onDismiss, onClick } : PriceModalProps) {

  const [price, setPrice] = useState("");

  return (
    <Modal>
      <View style={ styles.content }>
        <View style={ styles.header }>
          <Text style={ styles.title }>New price</Text>
          <IconButton
            iconName="close" 
            onIconClick={ onDismiss } />
        </View>
        <Input placeholder="Price" iconName="money" onInputChange={ (x) => { setPrice(x); } }/>
        <Button onClick={ () => { onClick(price); } }>Add</Button>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  content: {
    gap: 16,
    display: "flex",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontFamily: Typography.bold,
  },
});
