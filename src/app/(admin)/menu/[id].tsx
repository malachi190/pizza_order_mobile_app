import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import products from "@/assets/data/products";
import { useState } from "react";
import Button from "@/src/components/content/Button";
import { PizzaSize } from "@/assets/types";
import { useCart } from "@/src/context/CartContext";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const router = useRouter();
  const { addValue } = useCart();
  const { id } = useLocalSearchParams();
  const [selectSize, setSelectSize] = useState<PizzaSize>("M");
  const product = products?.find((product) => product.id.toString() === id);

  const addToCart = () => {
    if (!product) {
      return;
    }
    addValue(product, selectSize);
    router.push('/cart')
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }
  const defaultImage =
    "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGl6emF8ZW58MHx8MHx8fDA%3D";

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product?.image || defaultImage }}
        style={styles.image}
        resizeMode='contain'
      />
      <Text>Select Size</Text>
      <View style={styles.sizeContainer}>
        {sizes.map((size, index) => (
          <Pressable
            key={index}
            style={[
              styles.size,
              { backgroundColor: selectSize === size ? "lightblue" : "white" },
            ]}
            onPress={() => {
              setSelectSize(size);
            }}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectSize === size ? "#333" : "gray" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product?.price.toFixed(2)}</Text>
      <Button onPress={addToCart} text='Add to cart'></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  size: {
    backgroundColor: "lightblue",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 30,
    fontWeight: "500",
    color: "#333",
  },
});

export default ProductDetailsScreen;
