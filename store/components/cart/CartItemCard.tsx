"use client";

import Image from "next/image";
import { CartItem } from "@/types/cart/addToCart";
import { useState } from "react";
import { addToCart, removeFromCart } from "@/services/cart/addToCart";
import { useCart } from "@/context/CartContext";

const CartItemCard = ({
  item,
  onCartUpdated,
}: {
  item: CartItem;
  onCartUpdated: () => void;
}) => {
  const { refreshCart } = useCart(); // اضافه شده
  const { product_variant, quantity, get_total_price } = item;
  const { product, image, sku, price, id } = product_variant;

  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [loading, setLoading] = useState(false);

  const handleUpdateQuantity = async (newQuantity: number) => {
    const quantityChange = newQuantity - localQuantity;
    if (quantityChange === 0) return;
    setLoading(true);

    if (newQuantity < 1) {
      try {
        await removeFromCart(id);
        setLocalQuantity(0);
        onCartUpdated();
        refreshCart(); // اضافه شده
      } catch (error) {
        alert("خطا در حذف آیتم");
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      await addToCart({ variant_id: id, quantity: quantityChange });
      setLocalQuantity(newQuantity);
      onCartUpdated();
      refreshCart(); // اضافه شده
    } catch (error) {
      alert("خطا در به‌روزرسانی سبد خرید");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async () => {
    setLoading(true);
    try {
      await removeFromCart(id);
      setLocalQuantity(0);
      onCartUpdated();
      refreshCart(); // اضافه شده
    } catch (error) {
      alert("خطا در حذف آیتم");
    } finally {
      setLoading(false);
    }
  };

  if (localQuantity === 0) return null;

  return (
    <div className="flex gap-4 p-4 border-b items-center">
      <Image
        src={image}
        alt={product.name}
        width={80}
        height={80}
        className="rounded"
      />
      <div className="flex-1">
        <p className="font-semibold">{product.name}</p>
        <p className="text-sm text-gray-500">SKU: {sku}</p>
        <p className="text-sm text-gray-600">
          قیمت: {Number(price).toLocaleString()} تومان
        </p>
        <div className="flex items-center gap-2 mt-1">
          <button
            disabled={loading || localQuantity <= 1}
            onClick={() => handleUpdateQuantity(localQuantity - 1)}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            -
          </button>
          <span>{localQuantity}</span>
          <button
            disabled={loading}
            onClick={() => handleUpdateQuantity(localQuantity + 1)}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>
        <p className="text-sm text-gray-800 font-semibold mt-1">
          مجموع: {Number(get_total_price).toLocaleString()} تومان
        </p>
      </div>
      <button
        onClick={handleRemoveItem}
        disabled={loading}
        className="text-red-600 hover:text-red-800 font-semibold"
      >
        حذف
      </button>
    </div>
  );
};

export default CartItemCard;
