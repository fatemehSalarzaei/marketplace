"use client";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
import {
  LogIn,
  ShoppingCart,
  MapPin,
  Heart,
  MessageSquare,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { logoutUser } from "@/services/auth/logout";
import { useRouter, usePathname } from "next/navigation";

export default function AccountActions() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get("access_token");
    setIsLoggedIn(!!token);

    const name = localStorage.getItem("full_name") || "";
    const phone = localStorage.getItem("phone_number") || "";
    setUserName(name);
    setUserPhone(phone);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    router.replace("/");
  };

  const handleUserNameClick = () => {
    router.push("/user/dashboard");
    setIsMenuOpen(false);
  };

  if (isLoggedIn) {
    return (
      <div ref={containerRef} className="relative z-50">
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 rounded-md p-1 hover:bg-gray-100"
        >
          <User className="w-8 h-8 text-gray-700 rounded-full border border-gray-300 p-1" />
          <ChevronDown className="w-5 h-5 text-gray-700" />
        </button>

        {isMenuOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div
              onClick={handleUserNameClick}
              className="px-4 py-3 border-b text-gray-900 font-semibold cursor-pointer flex items-center gap-2"
            >
              <User className="w-5 h-5 text-gray-700" />
              <span>{userName || userPhone || "کاربر گرامی"}</span>
            </div>
            <ul className="py-1 text-gray-700">
              <li>
                <Link
                  href="/orders"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                >
                  <ShoppingCart className="w-5 h-5" /> سفارش‌ها
                </Link>
              </li>
              <li>
                <Link
                  href="/user/addresses"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                >
                  <MapPin className="w-5 h-5" /> آدرس‌ها
                </Link>
              </li>
              <li>
                <Link
                  href="/user/favorites"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                >
                  <Heart className="w-5 h-5" /> علاقه‌مندی‌ها
                </Link>
              </li>
              <li>
                <Link
                  href="/user/reviews"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                >
                  <MessageSquare className="w-5 h-5" /> دیدگاه‌ها
                </Link>
              </li>
              <li
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
              >
                <LogOut className="w-5 h-5" /> خروج
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
      <Button
        variant="outline"
        className="text-sm h-9 px-3 rounded-md flex items-center gap-2"
      >
        <LogIn className="w-4 h-4" /> <span>ورود | ثبت‌نام</span>
      </Button>
    </Link>
  );
}
