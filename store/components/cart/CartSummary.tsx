"use client";

import { Cart } from "@/types/cart/cart";
import { useRouter } from "next/navigation";

const CartSummary = ({ cart }: { cart: Cart }) => {
  const total = cart.items.reduce((sum, item) => sum + item.get_total_price, 0);
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="p-4 shadow rounded bg-white sticky top-6 max-h-[40vh] overflow-auto">
      <h2 className="text-lg font-semibold mb-2">خلاصه سفارش</h2>
      <p className="text-sm mb-2">تعداد اقلام: {cart.items.length}</p>
      <p className="font-bold text-lg">
        مجموع کل: {total.toLocaleString()} تومان
      </p>
      <button
        onClick={handleCheckout}
        className="mt-4 block text-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        ادامه فرایند خرید
      </button>
    </div>
  );
};

export default CartSummary;
