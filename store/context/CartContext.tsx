"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Cart } from "@/types/cart/cart";
import { getCart } from "@/services/cart/getCart";

interface CartContextType {
  cart: Cart | null;
  refreshCart: () => Promise<void>;
  cartItemsCount: number;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  refreshCart: async () => {},
  cartItemsCount: 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  const refreshCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const cartItemsCount =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, refreshCart, cartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};
