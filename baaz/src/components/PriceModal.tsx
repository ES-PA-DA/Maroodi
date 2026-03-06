import { View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

import Modal from "@components/Modal";
import Input from "@components/Input";
import Button from "@components/Button";
import IconButton from "@components/IconButton";
import Typography from "../constants/Typography";


type PriceModalProps = {
  onDismiss: () => void;
};


export default function PriceModal({ onDismiss } : PriceModalProps) {
  return (
    <Modal>
      <View style={ styles.content }>
        <View style={ styles.header }>
          <Text style={ styles.title }>New price</Text>
          <IconButton
            iconName="close" 
            onIconClick={ onDismiss } />
        </View>
        <Input placeholder="Price" iconName="money" onInputChange={ () => {} }/>
        <Button onClick={ () => {} }>Add</Button>
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
