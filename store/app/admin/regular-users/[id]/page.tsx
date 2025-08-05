"use client";

import React, { use, useEffect, useState } from "react";
import { getUserById } from "@/services/admin/users/getUsers";
import UserDetailCard from "@/components/admin/users/UserDetailCard";
import { useRouter } from "next/navigation";

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export default function UserPage({ params }: UserPageProps) {
  // unwrap params (id)
  const { id } = use(params);
  const router = useRouter();

  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id, "regular");
        setUser(response.data);
      } catch (error) {
        setError(true);
      }
    };
    fetchUser();
  }, [id]);

  if (error) {
    router.replace("/not-found"); // یا مسیر دلخواه برای خطا
    return null;
  }

  if (!user) return <p className="p-4">در حال بارگذاری...</p>;

  return (
    <div className="p-4">
      <UserDetailCard user={user} />
    </div>
  );
}
