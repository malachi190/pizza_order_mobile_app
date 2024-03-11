import { StyleSheet, FlatList } from "react-native";
import Colors from "@/src/constants/Colors";
import products from "@/assets/data/products";
import { Text, View } from "@/src/components/Themed";
import { ProductListItem } from "@/src/components/content/ProductList";
import { Stack } from "expo-router";

export default function TabOneScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Menu' }} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{gap: 10}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
