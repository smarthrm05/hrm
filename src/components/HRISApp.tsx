import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export const HRISApp = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out min-h-screen`}
      >
        <Sidebar
          currentPath={location.pathname.split("/").pop() || ""}
          onLogout={logout}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Overlay untuk mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Tombol hamburger hanya di mobile */}
        <div className="lg:hidden mb-4">
          <button
            className="text-blue-600 p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
};
