import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { cartItemsCount } = useCart();

  return (
    <Link href="/user/cart/">
      <Button variant="ghost" size="icon" className="relative rounded-full p-2">
        <ShoppingCart className="w-6 h-6 text-neutral-800" />
        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold leading-none">
            {cartItemsCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
