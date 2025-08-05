"use client";

import React, { useEffect, useState } from "react";
import EditProfileForm from "@/components/user/profile/EditProfileForm";
import { getUserProfile } from "@/services/user/profile/getProfile";
import type { UserProfileResponse } from "@/types/profile/profile";
import { Menu, X } from "lucide-react";

export default function EditProfilePage() {
  const [profileData, setProfileData] = useState<UserProfileResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserProfile();
        setProfileData(data);
      } catch {
        setError("خطا در دریافت اطلاعات پروفایل");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-6">در حال بارگذاری...</div>;
  if (error) return <div className="text-red-600 p-6">{error}</div>;

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col lg:flex-row relative">
      {/* دکمه منو در موبایل - اگر لازم نیست، می‌تونید این بخش رو هم حذف کنید */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow z-40 sticky top-0">
        <button onClick={() => setSidebarOpen(true)} className="ml-auto">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Drawer منو در موبایل - حذف کامل اگر دیگر SidebarMenu ندارید */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
          <div className="bg-white w-64 h-full shadow-lg overflow-y-auto relative">
            <button
              className="absolute left-3 top-3 text-gray-600 hover:text-red-600"
              onClick={() => setSidebarOpen(false)}
              aria-label="بستن منو"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1" onClick={() => setSidebarOpen(false)}></div>
        </div>
      )}

      {/* فرم ویرایش */}
      <main className="flex-1 p-4 sm:p-6">
        {profileData && <EditProfileForm initialData={profileData} />}
      </main>
    </div>
  );
}
