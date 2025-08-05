"use client";

import { useEffect, useState } from "react";
import AdminLogo from "./AdminLogo";
import UserMenu from "./UserMenu";
import LoginButton from "./LoginButton";
import Cookies from "js-cookie";

export default function AdminHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  useEffect(() => {
    const token = Cookies.get("access_token");
    setIsLoggedIn(!!token);

    const name = localStorage.getItem("full_name") || "";
    const phone = localStorage.getItem("phone_numbers") || "";

    setUserName(name);
    setUserPhone(phone);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-12 bg-white shadow-md px-6 flex items-center justify-between z-50">
      <AdminLogo />
      <div>
        {isLoggedIn ? (
          <UserMenu userName={userName} userPhone={userPhone} />
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}
