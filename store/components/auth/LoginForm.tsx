"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

type FormValues = {
  phone_number: string;
};

type LoginFormProps = {
  onSubmit: (phone_number: string) => void;
  loading: boolean;
  error: string;
  message: string;
};

export default function LoginForm({
  onSubmit,
  loading,
  error,
  message,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const phoneNumber = watch("phone_number");
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const regex = /^09\d{9}$/;
    setCanSubmit(regex.test(phoneNumber || ""));
  }, [phoneNumber]);

  const submitHandler = (data: FormValues) => {
    onSubmit(data.phone_number);
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 text-right font-iranYekan">
      <h1 className="text-2xl font-bold font-iranyekan text-neutral-900 mb-2">
        ورود به حساب
      </h1>
      <p className="text-sm text-neutral-700 mb-4 font-iranyekan">
        لطفاً شماره موبایل خود را وارد کنید
      </p>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div>
          <input
            type="text"
            inputMode="numeric"
            placeholder="شماره موبایل"
            {...register("phone_number", {
              required: "شماره موبایل الزامی است",
              pattern: {
                value: /^09\d{9}$/,
                message: "فرمت شماره موبایل صحیح نیست (مثال: 09xxxxxxxxx)",
              },
            })}
            className={`w-full text-right px-4 py-2 border rounded-md text-sm text-black focus:outline-none focus:ring-2 ${
              errors.phone_number
                ? "border-red-500 focus:ring-red-400"
                : "border-neutral-300 focus:ring-primary"
            }`}
          />
          {errors.phone_number && (
            <p className="text-sm text-red-500 mt-1">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className={`w-full py-2 rounded-md text-white transition-colors ${
            !canSubmit || loading
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {loading ? "در حال ارسال..." : "ورود"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600 text-right">{error}</p>}
      {message && (
        <p className="mt-4 text-sm text-green-600 text-right">{message}</p>
      )}
    </div>
  );
}
