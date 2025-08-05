"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginButton() {
  return (
    <Link href="/auth/login">
      <button className="flex items-center gap-1 border px-3 py-1 rounded">
        <LogIn className="w-4 h-4" />
        <span>ورود | ثبت‌نام</span>
      </button>
    </Link>
  );
}
