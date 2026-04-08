import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Briefcase,
  UserCircle,
  LogIn,
} from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"management" | "employee">("management");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      Swal.fire({
        title: '<span style="color: white">Login Gagal</span>',
        text: "Username dan password harus diisi!",
        icon: "error",
        background: "#d11a2a",
        color: "white",
      });
      return;
    }

    // VALIDASI ROLE SWITCH
    if (
      role === "management" &&
      !username.includes("hrd") &&
      !username.includes("atasan")
    ) {
      Swal.fire({
        title: '<span style="color: white">Akses Ditolak</span>',
        text: "Akun ini bukan Management!",
        icon: "error",
        background: "#d11a2a",
        color: "white",
      });
      return;
    }

    if (role === "employee" && username.includes("hrd")) {
      Swal.fire({
        title: '<span style="color: white">Akses Ditolak</span>',
        text: "HR tidak bisa login sebagai Karyawan!",
        icon: "error",
        background: "#d11a2a",
        color: "white",
      });
      return;
    }

    // 🔥 MAPPING ROLE (FIX UTAMA)
    let mappedRole: "HR" | "KARYAWAN" | "ATASAN";

    if (role === "management") {
      if (username.includes("atasan")) {
        mappedRole = "ATASAN";
      } else {
        mappedRole = "HR"; // default management
      }
    } else {
      mappedRole = "KARYAWAN";
    }

    // SUCCESS LOGIN
    Swal.fire({
      title: '<span style="color: white">Berhasil Masuk!</span>',
      text: "Selamat Datang di SMART HRM",
      icon: "success",
      background: "#2794eb",
      color: "white",
      confirmButtonColor: "#ffffff",
      confirmButtonText:
        '<span style="color: #2794eb; font-weight: bold;">OK</span>',
      customClass: {
        popup: "rounded-xl",
        title: "text-xl",
        confirmButton: "text-sm px-6 py-2 rounded-lg",
      },
    }).then(() => {
      // 🔥 KIRIM ROLE KE AUTH
      login(username, password, mappedRole);

      navigate("/dashboard");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 sm:p-6">
      <div className="w-full max-w-full sm:max-w-5xl mx-auto">
        <div
          className="relative w-full min-h-[500px] md:min-h-[600px] rounded-2xl shadow-2xl overflow-hidden flex items-center"
          style={{
            backgroundImage: "url('/wave4.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-20 flex items-center justify-center sm:justify-start w-full sm:w-1/2 p-4 sm:p-8 sm:pl-12">
            <Card className="w-full max-w-full sm:max-w-md bg-white rounded-2xl shadow-2xl p-4 sm:p-8">
              <CardHeader className="space-y-1 text-center pb-4 sm:pb-6">
                <div className="flex items-center justify-center space-x-2">
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
                    SMART HRM
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-600 text-sm sm:text-base md:text-lg font-medium whitespace-nowrap">
                  Human Resource Information System
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5 md:space-y-6"
                >
                  {/* Role Switcher */}
                  <div className="flex justify-center mb-4 sm:mb-5">
                    <div className="inline-flex bg-gray-100 p-1 sm:p-2 rounded-full border border-gray-300 shadow-inner text-xs sm:text-sm md:text-base">
                      <button
                        type="button"
                        onClick={() => setRole("management")}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 font-medium rounded-full flex items-center gap-1 transition ${
                          role === "management"
                            ? "bg-[#2794eb] text-white shadow"
                            : "text-gray-500 hover:text-blue-600"
                        }`}
                      >
                        <Briefcase className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                        Manajemen
                      </button>

                      <button
                        type="button"
                        onClick={() => setRole("employee")}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 font-medium rounded-full flex items-center gap-1 transition ${
                          role === "employee"
                            ? "bg-[#2794eb] text-white shadow"
                            : "text-gray-500 hover:text-blue-600"
                        }`}
                      >
                        <UserCircle className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                        Karyawan
                      </button>
                    </div>
                  </div>

                  {/* Transisi form */}
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="space-y-4"
                  >
                    {/* Username */}
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="text-gray-500 w-4 sm:w-5 h-4 sm:h-5" />
                        <Label className="text-gray-700 font-semibold uppercase">
                          Username
                        </Label>
                      </div>
                      <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Masukkan username"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center space-x-2">
                        <Lock className="text-gray-500 w-4 sm:w-5 h-4 sm:h-5" />
                        <Label className="text-gray-700 font-semibold uppercase">
                          Password
                        </Label>
                      </div>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? <Eye /> : <EyeOff />}
                        </button>
                      </div>
                    </div>

                    {/* Remember */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={rememberMe}
                          onCheckedChange={(v) => setRememberMe(!!v)}
                        />
                        <span>Ingat saya</span>
                      </div>
                      <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => navigate("/forgot-password")}
                      >
                        Lupa password?
                      </span>
                    </div>
                  </motion.div>

                  {/* Submit */}
                  <Button type="submit" className="w-full">
                    <LogIn className="mr-2" /> Masuk
                  </Button>

                  <p className="text-xs text-center text-gray-400">
                    Demo: hrd@gmail.com | atasan@gmail.com | user bebas
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-4 text-gray-600 text-xs">
          © 2025 PT Proven Force Indonesia. All rights reserved.
        </div>
      </div>
    </div>
  );
};