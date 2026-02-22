import { ReactNode } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Pressable } from "react-native";
import Spacing from "@constants/Spacing";
import { StyleSheet } from "react-native";
import Typography from "@constants/Typography";

type ItemListProps = {
  title: string;
  slot: ReactNode;
  subtitle: string;
  onItemClick: () => void;
};

export default function ItemList({ title, slot, subtitle, onItemClick } : ItemListProps) {
  return (
    <Pressable style={ styles.item } onPress={ onItemClick }>
      <View style={ styles.image } />
      <View style={ styles.texts }>
        <Text style={ styles.title }>{ title }</Text>
        <Text style={ styles.subtitle }>{ subtitle }</Text>
      </View>
      { slot }
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#D3D3D3",
    gap: Spacing.itemList.gap,
    paddingTop: Spacing.itemList.paddingY,
    paddingLeft: Spacing.itemList.paddingX,
    paddingRight: Spacing.itemList.paddingX,
    paddingBottom: Spacing.itemList.paddingY,
    marginBottom: Spacing.itemList.marginBottom,
  },
  image: {
    borderRadius: 4,
    backgroundColor: "#000",
    width: Spacing.itemList.image.width,
    height: Spacing.itemList.image.height,
  },
  texts: {
    flex: 1,
  },
  title: {
    fontFamily: Typography.bold,
    fontSize: Typography.sizes.text,
  },
  subtitle: {
    color: "#D3D3D3",
    fontFamily: Typography.regular,
    fontSize: Typography.sizes.caption,
  },
});
