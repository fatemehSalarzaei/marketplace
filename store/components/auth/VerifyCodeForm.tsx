"use client";

import { useState, useRef } from "react";

type VerifyCodeFormProps = {
  onSubmit: (code: string) => void;
  loading: boolean;
  error: string;
  message: string;
  timer: number;
  onResend: () => void;
};

export default function VerifyCodeForm({
  onSubmit,
  loading,
  error,
  message,
  timer,
  onResend,
}: VerifyCodeFormProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (timer === 0) return;

    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }

      if (index === 5 && value !== "" && timer > 0) {
        if (newCode.every((digit) => digit !== "")) {
          onSubmit(newCode.join(""));
        }
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (timer === 0) return;

    if (e.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        e.preventDefault();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (timer === 0) return;
    e.preventDefault();

    const pastedData = e.clipboardData.getData("Text");
    const digits = pastedData.replace(/\D/g, "").slice(0, 6).split("");

    if (digits.length === 0) return;

    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = digits[i] || "";
    }
    setCode(newCode);

    const firstEmptyIndex = newCode.findIndex((d) => d === "");
    if (firstEmptyIndex !== -1) {
      inputsRef.current[firstEmptyIndex]?.focus();
    } else {
      inputsRef.current[5]?.focus();
      if (newCode.every((digit) => digit !== "") && timer > 0) {
        onSubmit(newCode.join(""));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timer === 0) return;
    if (code.every((digit) => digit !== "")) {
      onSubmit(code.join(""));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="ltr">
      <div className="flex justify-center gap-2">
        {code.map((digit, i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            ref={(el) => (inputsRef.current[i] = el)}
            className="w-12 h-12 text-center text-3xl font-extrabold text-slate-900 bg-slate-100 border border-gray-300 rounded-md p-2 outline-none
              focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            pattern="\d*"
            autoComplete="one-time-code"
            disabled={timer === 0}
          />
        ))}
      </div>

      {timer > 0 ? (
        <button
          type="submit"
          disabled={loading || code.some((d) => d === "")}
          className="w-full py-3 bg-red-600 text-white rounded-md disabled:opacity-50 hover:bg-red-700 transition"
        >
          {loading ? "در حال تایید..." : "تایید کد"}
        </button>
      ) : (
        <button
          type="button"
          onClick={onResend}
          className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          ارسال مجدد
        </button>
      )}

      {error && <p className="text-red-600 mt-4 text-right">{error}</p>}
      {message && <p className="text-green-600 mt-4 text-right">{message}</p>}
    </form>
  );
}
