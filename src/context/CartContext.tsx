import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "@/assets/types";
import { randomUUID } from "expo-crypto";

type CartProps = {
  items: CartItem[];
  addValue: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
};

export const CartContext = createContext<CartProps>({
  items: [],
  addValue: () => {},
  updateQuantity: () => {},
  total: 0,
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const addValue = (product: Product, size: CartItem["size"]) => {
    //   If item is already added in the cart then increment
    const existingItems = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItems) {
      updateQuantity(existingItems.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([...items, newCartItem]);
  };

  // Update cart items
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  const total = items.reduce((total, item) => (total += item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addValue, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
