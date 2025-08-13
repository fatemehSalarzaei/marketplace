"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/auth/logout"; 


interface Props {
  userName?: string;
  userPhone?: string;
}

export default function UserMenu({ userName, userPhone }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.replace("/");
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = userName || userPhone || "کاربر";

  return (
    <div ref={containerRef} className="relative z-50">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-2 rounded-md focus:outline-none p-1 hover:bg-gray-100"
        type="button"
      >
        <User className="w-8 h-8 text-gray-700 rounded-full border border-gray-300 p-1" />
        <ChevronDown className="w-5 h-5 text-gray-700" />
      </button>

      {isMenuOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 text-right">
          <div
            onClick={() => {
              router.push("/admin/dashboard");
              setIsMenuOpen(false);
            }}
            className="px-4 py-3 border-b text-gray-900 font-semibold cursor-pointer flex items-center gap-2"
          >
            <User className="w-5 h-5 text-gray-700" />
            <span>{displayName}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full text-red-600 items-center gap-3 px-4 py-2 hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5" />
            خروج
          </button>
        </div>
      )}
    </div>
  );
}
