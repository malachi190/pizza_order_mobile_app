import { StyleSheet, FlatList, Pressable } from "react-native";
import products from "@/assets/data/products";
import { Text, View } from "@/src/components/Themed";
import { ProductListItem } from "@/src/components/content/ProductList";

export default function TabOneScreen() {
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
