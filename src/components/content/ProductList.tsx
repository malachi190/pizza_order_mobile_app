import { View, Text } from "../Themed";
import { Image } from "react-native";
import { StyleSheet, Pressable } from "react-native";
import Colors from "@/src/constants/Colors";
import { Product } from "@/assets/types";
import { Link, useSegments } from "expo-router";

type ProductListTypes = {
  product: Product;
};

export const ProductListItem = ({ product }: ProductListTypes) => {
  const defaultImage =
    "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGl6emF8ZW58MHx8MHx8fDA%3D";
  const segment = useSegments()

  return (
    <Link href={`/${segment[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultImage }}
          style={styles.image}
          resizeMode='contain'
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.prices}>${product.price.toFixed(2)}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    flex: 1,
    margin: 1,
    maxWidth: "50%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
    marginVertical: 10,
  },
  prices: {
    fontSize: 15,
    letterSpacing: 3,
    color: Colors.light.tint,
  },
});
