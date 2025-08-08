'use client';

import { useState } from "react";
import { createNotification } from "@/services/admin/notifications/notificationsService";
import { AdminNotification } from "@/types/admin/notification/notification";
import ChannelSelect from "./ChannelSelect";
import TypeSelect from "./TypeSelect";
import UserSelect from "./UserSelect";

export default function NotificationForm() {
  const [formData, setFormData] = useState<AdminNotification>({
    user: null,
    title: "",
    message: "",
    type: "custom",
    channel: "site",
    link: "",
    expires_at: null,
    scheduled_at: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof AdminNotification, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createNotification(formData);
      alert("اعلان با موفقیت ایجاد شد");
      setFormData({
        user: null,
        title: "",
        message: "",
        type: "custom",
        channel: "site",
        link: "",
        expires_at: null,
        scheduled_at: null,
      });
    } catch (error) {
      console.error(error);
      alert("خطا در ایجاد اعلان");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 bg-white rounded-lg shadow-md space-y-4"
    >
      {/* بخش ورودی‌های دو ستونه */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UserSelect value={formData.user} onChange={(val) => handleChange("user", val)} />

        <div>
          <label className="block mb-1 font-medium">عنوان</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="عنوان اعلان را وارد کنید"
            required
          />
        </div>

        <TypeSelect value={formData.type} onChange={(val) => handleChange("type", val)} />
        <ChannelSelect value={formData.channel} onChange={(val) => handleChange("channel", val)} />

        <div>
          <label className="block mb-1 font-medium">لینک (اختیاری)</label>
          <input
            type="url"
            value={formData.link || ""}
            onChange={(e) => handleChange("link", e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">تاریخ انقضا</label>
          <input
            type="datetime-local"
            value={formData.expires_at || ""}
            onChange={(e) => handleChange("expires_at", e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">زمان ارسال برنامه‌ریزی شده</label>
          <input
            type="datetime-local"
            value={formData.scheduled_at || ""}
            onChange={(e) => handleChange("scheduled_at", e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* پیام، کل عرض */}
      <div>
        <label className="block mb-1 font-medium">پیام</label>
        <textarea
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="متن پیام را وارد کنید"
          required
        />
      </div>

      {/* دکمه ثبت */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg w-full"
        disabled={loading}
      >
        {loading ? "در حال ایجاد..." : "ایجاد اعلان"}
      </button>
    </form>
  );
}
