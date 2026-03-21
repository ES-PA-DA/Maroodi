import { FlatList, StyleSheet } from "react-native";
import { ListRenderItem } from "react-native";

type ScrollableProps<T> = {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
};

export default function ScrollableList<T>( { data, renderItem, keyExtractor } : ScrollableProps<T> ) {
  return (
    <FlatList
      data={ data }
      style={ styles.list }
      renderItem={ renderItem }
      keyExtractor={ keyExtractor }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
