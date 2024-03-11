import { View, Text, Platform, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCart } from "../context/CartContext";
import CartCardComponent from "../components/content/CartCard";
import Button from "../components/content/Button";

const Cart = () => {
  const { items, total } = useCart();
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartCardComponent cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <Text style={{margin: 10, fontSize: 20, fontWeight: "bold"}}>Total: ${total.toFixed(2)}</Text>
      <Button text='Checkout' />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default Cart;
