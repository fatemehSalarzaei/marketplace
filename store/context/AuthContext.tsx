// context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import apiClient from "@/lib/axiosInstance";

interface Role {
  id: number;
  name: string;
  description: string;
}

interface Permission {
  model: {
    id: number;
    name: string;
    code: string;
  };
  can_create: boolean;
  can_read: boolean;
  can_update: boolean;
  can_delete: boolean;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userName: string;
  userPhone: string;
  role: Role | null;
  permissions: Permission[];
  loadingPermissions: boolean;
  logout: () => void;
  refreshUser: () => void;
  hasPermission: (model: string, action?: "create" | "read" | "update" | "delete") => boolean;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userName: "",
  userPhone: "",
  role: null,
  permissions: [],
  loadingPermissions: true,
  logout: () => {},
  refreshUser: () => {},
  hasPermission: () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [role, setRole] = useState<Role | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loadingPermissions, setLoadingPermissions] = useState(true);

  const refreshUser = async () => {
    const token = Cookies.get("access_token");
    const loggedIn = !!token;
    setIsLoggedIn(loggedIn);
    setUserName(localStorage.getItem("full_name") || "");
    setUserPhone(localStorage.getItem("phone_number") || "");

    if (loggedIn) {
      try {
        setLoadingPermissions(true);
        const res = await apiClient.get("accounts/admin/my-role/");
        setRole(res.data.role);
        setPermissions(res.data.permissions);
      } catch (error) {
        console.error("Error fetching role/permissions", error);
        setRole(null);
        setPermissions([]);
      } finally {
        setLoadingPermissions(false);
      }
    } else {
      setRole(null);
      setPermissions([]);
      setLoadingPermissions(false);
    }
  };

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    localStorage.removeItem("full_name");
    localStorage.removeItem("phone_number");
    setIsLoggedIn(false);
    setUserName("");
    setUserPhone("");
    setRole(null);
    setPermissions([]);
  };

  const hasPermission = (
    model: string,
    action: "create" | "read" | "update" | "delete" = "read"
  ) => {
    return permissions.some(
      (p: Permission) => p.model.code === model && p[`can_${action}`] === true
    );
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userName,
        userPhone,
        role,
        permissions,
        loadingPermissions,
        logout,
        refreshUser,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
