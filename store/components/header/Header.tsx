"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import SearchBox from "./SearchBar";
import AccountActions from "./AccountActions";
import CartButton from "./CartButton";
import { Notification } from "./Notification";
import CategoriesMenu from "../categories/CategoriesMenu";
import MobileCategoriesMenu from "../categories/MobileCategoriesMenu";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* ساختار موبایل */}
      <div className="relative flex justify-between items-center px-4 py-3 min-h-[80px] lg:hidden">
        {/* لوگو و دکمه منوی موبایل کنار هم سمت راست */}
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="باز کردن منوی موبایل"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Logo />
        </div>

        {/* آیکن‌ها سمت چپ */}
        <div className="flex items-center gap-2">
          <Notification />
          <AccountActions />
          <CartButton />
        </div>
      </div>

      {/* منوی موبایل */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60">
          <div className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg p-4 overflow-auto z-70 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <Logo />
              <button
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="بستن منوی موبایل"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <SearchBox />
            </div>

            <MobileCategoriesMenu onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* ساختار دسکتاپ */}
      <div className="hidden lg:flex max-w-[1200px] mx-auto px-4 flex-col min-h-[80px] mt-6">
        <div className="flex justify-between items-center">
          {/* لوگو سمت چپ */}
          <div>
            <Logo />
          </div>
          <div>
            <SearchBox />
          </div>

          {/* آیکن‌ها سمت راست */}
          <div className="flex items-center gap-2">
            <Notification />
            <AccountActions />
            <CartButton />
          </div>
        </div>

        {/* ردیف دوم دسکتاپ - منو دسته‌بندی */}
        <div className="mt-4">
          <CategoriesMenu />
        </div>
      </div>
    </header>
  );
}
