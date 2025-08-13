"use client";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { usePathname } from "next/navigation";

export default function LoginButton() {
  const pathname = usePathname();

  return (
    <Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
      <button className="flex items-center gap-1 border px-3 py-1 rounded">
        <LogIn className="w-4 h-4" /> <span>ورود | ثبت‌نام</span>
      </button>
    </Link>
  );
}
