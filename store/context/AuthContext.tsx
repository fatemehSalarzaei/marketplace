// context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isLoggedIn: boolean;
  userName: string;
  userPhone: string;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userName: "",
  userPhone: "",
  logout: () => {},
  refreshUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const refreshUser = () => {
    const token = Cookies.get("access_token");
    setIsLoggedIn(!!token);
    setUserName(localStorage.getItem("full_name") || "");
    setUserPhone(localStorage.getItem("phone_number") || "");
  };

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    localStorage.removeItem("full_name");
    localStorage.removeItem("phone_number");
    setIsLoggedIn(false);
    setUserName("");
    setUserPhone("");
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, userPhone, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
