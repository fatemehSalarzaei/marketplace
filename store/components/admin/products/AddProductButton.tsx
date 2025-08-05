"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const AddProductButton: React.FC = () => {
  const router = useRouter();

  const handleAddProduct = () => {
    router.push("/admin/products/create");
  };

  return (
    <button
      onClick={handleAddProduct}
      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
    >
      افزودن محصول
    </button>
  );
};
