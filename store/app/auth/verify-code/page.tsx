"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VerifyCodeForm from "@/components/auth/VerifyCodeForm";
import { verifyCode } from "@/services/auth/verifyOtp";
import { setCookie } from "cookies-next";

export default function VerifyCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(120);
  const [initialized, setInitialized] = useState(false);

  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    const paramNumber = searchParams.get("phone_number");
    const storedNumber = localStorage.getItem("phone_number");

    if (paramNumber) {
      setPhoneNumber(paramNumber);
      localStorage.setItem("phone_number", paramNumber);
      setInitialized(true);
    } else if (storedNumber) {
      setPhoneNumber(storedNumber);
      setInitialized(true);
      localStorage.removeItem("phone_number");
    } else {
      router.replace("/auth/login");
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (!initialized || timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
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

      localStorage.setItem("full_name", full_name);
      localStorage.setItem("phone_number", phone_number);

      setCookie("access_token", access, { maxAge: 60 * 60, path: "/", secure: true, sameSite: "Lax" });
      setCookie("refresh_token", refresh, { maxAge: 7 * 24 * 60 * 60, path: "/", secure: true, sameSite: "Lax" });
      setCookie("uuid", uuid, { maxAge: 7 * 24 * 60 * 60, path: "/", secure: true, sameSite: "Lax" });

      localStorage.removeItem("phone_number");
      router.replace(redirect);
    } catch (error: any) {
      const apiErrorMessage = error?.response?.data?.message || error?.message || "کد اشتباه یا خطایی رخ داده.";
      setError(apiErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    localStorage.removeItem("phone_number");
    router.replace(`/auth/login?redirect=${encodeURIComponent(redirect)}`);
  };

  if (!initialized || !phoneNumber) return null;

  const formattedTime = `${Math.floor(timer / 60).toString().padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 text-right">
        <h1 className="text-2xl font-bold mb-2">تایید کد ورود</h1>
        <p className="text-sm mb-4">
          کد ۶ رقمی ارسال شده به شماره <span className="font-semibold">{phoneNumber}</span> را وارد کنید
        </p>
        <VerifyCodeForm onSubmit={handleVerify} loading={loading} error={error} message={message} timer={timer} onResend={handleResend} />
        <div className="mt-6 text-center text-sm font-mono">{formattedTime}</div>
      </div>
    </div>
  );
}
