"use client";

import "../styles/globals.css";
import { ReactNode, useEffect } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider, useToast } from "@/context/ToastContext";
import ToastRenderer from "@/context/ToastRenderer";
import { setToastCallback } from "@/lib/toastCallback";

const ToastSetup: React.FC = () => {
  const { addToast } = useToast();
  useEffect(() => {
    setToastCallback(addToast);
  }, [addToast]);
  return null;
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <html lang="fa" dir="rtl">
      <body className="font-iranyekan bg-white text-gray-900 flex flex-col min-h-screen">
        <CartProvider>
          <ToastProvider>
            <ToastSetup />
            {!isAuthPage && !isAdminPage && <Header />}
            <main className="w-full flex-grow p-0 m-0">{children}</main>
            {!isAuthPage && !isAdminPage && <Footer />}
            <ToastRenderer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
