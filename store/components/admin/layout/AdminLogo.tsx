"use client";
import Image from "next/image";
import Link from "next/link";

export default function AdminLogo() {
  return (
    <Link href="/admin/dashboard" className="flex items-center gap-2">
      <Image src="/logo-admin.png" alt="لوگو" width={32} height={32} />
      <span className="text-xl font-bold text-gray-800">مدیریت سایت</span>
    </Link>
  );
}
