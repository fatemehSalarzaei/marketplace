"use client";

import { Cart } from "@/types/cart/cart";
import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";

const CartView = ({
  cart,
  onCartUpdated,
}: {
  cart: Cart;
  onCartUpdated: () => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 min-h-screen">
      <div className="md:col-span-2 space-y-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">سبد خرید</h1>
        {cart.items.length === 0 ? (
          <div className="flex-grow flex justify-center items-center text-gray-600">
            <p>سبد خرید شما خالی است.</p>
          </div>
        ) : (
          <div className="flex-grow space-y-4 overflow-auto">
            {cart.items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onCartUpdated={onCartUpdated}
              />
            ))}
          </div>
        )}
      </div>
      {cart.items.length > 0 && <CartSummary cart={cart} />}
    </div>
  );
};

export default CartView;
