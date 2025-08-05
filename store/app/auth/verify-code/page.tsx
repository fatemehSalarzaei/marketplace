"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VerifyCodeForm from "@/components/auth/VerifyCodeForm";
import { verifyCode } from "@/services/auth/verifyOtp";
import { setCookie } from "cookies-next"; // فقط در مرورگر استفاده شود (client-side)

export default function VerifyCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(120);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const paramNumber = searchParams.get("phone_number");
    const storedNumber = localStorage.getItem("phone_number");

    if (paramNumber) {
      setPhoneNumber(paramNumber);
      localStorage.setItem("phone_number", paramNumber);

      // حذف پارامتر از URL بدون رفرش
      const url = new URL(window.location.href);
      url.searchParams.delete("phone_number");
      window.history.replaceState({}, "", url.toString());

      setInitialized(true);
    } else if (storedNumber) {
      setPhoneNumber(storedNumber);
      setInitialized(true);
      localStorage.removeItem("phone_number");
    } else {
      router.replace("/auth/login");
      return; // مهم: توقف ادامه اجرا
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (!initialized) return;
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, initialized]);

  const handleVerify = async (code: string) => {
    if (!phoneNumber) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await verifyCode(phoneNumber, code);
      const { access, refresh, uuid, full_name, phone_number } = response.data;

      // ذخیره access token در localStorage
      // localStorage.setItem('access_token', access);
      localStorage.setItem("full_name", full_name);
      localStorage.setItem("phone_number", phone_number);

      // ذخیره refresh و uuid در کوکی (تنظیم زمان انقضا و مسیر مناسب)
      setCookie("access_token", access, {
        maxAge: 60 * 60,
        path: "/",
        secure: true,
        sameSite: "Lax",
      });

      // ذخیره refresh و uuid در کوکی (تنظیم زمان انقضا و مسیر مناسب)
      setCookie("refresh_token", refresh, {
        maxAge: 7 * 24 * 60 * 60, // یک هفته
        path: "/",
        secure: true,
        sameSite: "Lax",
      });

      setCookie("uuid", uuid, {
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
        secure: true,
        sameSite: "Lax",
      });
      setMessage("کد با موفقیت تایید شد.");
      localStorage.removeItem("phone_number");
      router.replace("/user/dashboard");
    } catch (error: any) {
      const apiErrorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.message ||
        "کد وارد شده اشتباه است یا خطایی رخ داده.";
      setError(apiErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    localStorage.removeItem("phone_number");
    router.replace("/auth/login");
  };

  if (!initialized || !phoneNumber) {
    return null;
  }

  const formattedTime = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 font-iranYekan text-right">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          تایید کد ورود
        </h1>
        <p className="text-sm text-neutral-700 mb-4">
          کد ۶ رقمی ارسال شده به شماره{" "}
          <span className="font-semibold">{phoneNumber}</span> را وارد کنید
        </p>

        <VerifyCodeForm
          onSubmit={handleVerify}
          loading={loading}
          error={error}
          message={message}
          timer={timer}
          onResend={handleResend}
        />

        <div className="mt-6 text-center text-neutral-600 text-sm font-mono">
          {formattedTime}
        </div>
      </div>
    </div>
  );
}
