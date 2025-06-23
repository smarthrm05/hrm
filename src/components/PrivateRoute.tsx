// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Kalau belum login, redirect ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Kalau sudah login, izinkan akses ke route yang dilindungi
  return <Outlet />;
};
