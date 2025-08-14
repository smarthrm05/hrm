import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APP_CONFIG } from "@/config"; 

export const HRISApp = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuMenuOpen] = useState(false);
  const location = useLocation();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* SIDEBAR */}
      <div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out w-64 bg-white shadow-md`}
      >
        <Sidebar
          currentPath={location.pathname.split("/").pop() || ""}
          onLogout={logout}
          onCloseMobileMenu={() => setIsMobileMenuMenuOpen(false)}
        />
      </div>

      {/* OVERLAY untuk mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuMenuOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="sticky top-0 z-30 bg-white px-4 py-3 shadow flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Hamburger untuk mobile */}
            <button
              className="lg:hidden mr-2"
              onClick={() => setIsMobileMenuMenuOpen(true)}
            >
              <svg
                className="w-6 h-6 text-gray-700"
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

            {/* Nama PT + ikon */}
             <Building2 size={28} color="#0073ec" />
            <h1
              className="font-extrabold text-2xl leading-none"
              style={{ color: "#0073ec" }}
            >
              {APP_CONFIG.companyName}
            </h1>
          </div>

          {/* KANAN ATAS */}
          <div className="flex items-center gap-4">
            <Button
              className="text-white text-sm rounded-md px-3 py-1.5 hover:opacity-90"
              style={{ backgroundColor: "#0073ec" }}
            >
              Jadwalkan Demo
            </Button>

            <Bell className="w-5 h-5 cursor-pointer text-gray-700" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    src="https://randomuser.me/api/portraits/men/19.jpg"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                  <span className="text-sm font-medium hidden sm:block text-gray-700">
                    Halo, Meida
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white shadow-md rounded-md mt-2 text-black"
              >
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={logout}>
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* ISI HALAMAN */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
