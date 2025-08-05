"use client";

import { useEffect, useState } from "react";
import { getCart } from "@/services/cart/getCart";
import CartView from "@/components/cart/CartView";
import { Cart } from "@/types/cart/cart";

const CartPageClient = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch {
      setError("خطا در دریافت سبد خرید");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>{error}</p>;
  if (!cart || cart.items.length === 0) return <p>سبد خرید شما خالی است.</p>;

  return <CartView cart={cart} onCartUpdated={fetchCart} />;
};

export default CartPageClient;
