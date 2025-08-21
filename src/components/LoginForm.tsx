import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Users,
  User,
  Lock,
  Eye,
  EyeOff,
  Briefcase,
  UserCircle,
} from 'lucide-react';
import Swal from 'sweetalert2';
import { useAuth } from '@/contexts/AuthContext';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'management' | 'employee'>('management');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      Swal.fire({
        title: '<span style="color: white">Berhasil Masuk!</span>',
        text: 'Selamat Datang di SMART HRM',
        icon: 'success',
        background: '#2794EB',
        color: 'white',
        confirmButtonColor: '#ffffff',
        confirmButtonText:
          '<span style="color: #2794EB; font-weight: bold;">OK</span>',
        customClass: {
          popup: 'rounded-xl',
          title: 'text-xl',
          confirmButton: 'text-sm px-6 py-2 rounded-lg',
        },
      }).then(() => {
        login(username, password);
        navigate('/dashboard');
      });
    } else {
      Swal.fire({
        title: '<span style="color: white">Login Gagal</span>',
        text: 'Username dan password harus diisi!',
        icon: 'error',
        background: '#d11a2a',
        color: 'white',
        confirmButtonColor: '#ffffff',
        confirmButtonText:
          '<span style="color: #d11a2a; font-weight: bold;">OK</span>',
        customClass: {
          popup: 'rounded-xl',
          title: 'text-xl',
          confirmButton: 'text-sm px-6 py-2 rounded-lg',
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      {/* Card Besar */}
      <div className="flex w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden bg-white">
        
        {/* Kiri - Form Login */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex items-center">
          <Card className="w-full border-0 shadow-none">
            <CardHeader className="space-y-1 text-center pb-6">
              <div className="flex items-center justify-center space-x-2">
                <Users className="text-[#2794EB] h-8 w-8" />
                <CardTitle className="text-3xl font-bold text-[#2794EB]">
                  SMART HRM
                </CardTitle>
              </div>
              <CardDescription className="text-gray-600 text-base font-medium">
                Human Resource Information System
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Role Switcher */}
                <div className="flex justify-center mb-5">
                  <div className="inline-flex bg-gray-100 p-1 rounded-full border border-gray-300 shadow-inner text-xs sm:text-sm">
                    <button
                      type="button"
                      onClick={() => setRole('management')}
                      className={`px-3 py-1.5 sm:px-4 font-medium rounded-full flex items-center gap-1.5 transition ${
                        role === 'management'
                          ? 'bg-white text-blue-700 shadow'
                          : 'text-gray-500 hover:text-blue-600'
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                      Manajemen
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('employee')}
                      className={`px-3 py-1.5 sm:px-4 font-medium rounded-full flex items-center gap-1.5 transition ${
                        role === 'employee'
                          ? 'bg-white text-blue-700 shadow'
                          : 'text-gray-500 hover:text-blue-600'
                      }`}
                    >
                      <UserCircle className="w-4 h-4" />
                      Karyawan
                    </button>
                  </div>
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="text-gray-500 w-4 h-4" />
                    <Label
                      htmlFor="username"
                      className="text-gray-700 font-semibold text-xs uppercase tracking-wide"
                    >
                      Username
                    </Label>
                  </div>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-11 border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-gray-50 focus:bg-white"
                    placeholder="Masukkan username"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Lock className="text-gray-500 w-4 h-4" />
                    <Label
                      htmlFor="password"
                      className="text-gray-700 font-semibold text-xs uppercase tracking-wide"
                    >
                      Password
                    </Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-gray-50 focus:bg-white pr-10"
                      placeholder="Masukkan password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(!!checked)}
                      className="border-2 border-gray-300"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-gray-600 font-medium"
                    >
                      Ingat saya
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Lupa password?
                  </a>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-sm"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Masuk ke Sistem
                </Button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  © 2025 PT Proven Force Indonesia. All rights reserved.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kanan - Ilustrasi */}
        <div className="hidden lg:flex w-1/2 bg-blue-50 items-center justify-center p-8">
          <img
            src="/mockup.png" // ganti dengan path mockup ilustrasi kamu
            alt="Ilustrasi SMART HRM"
            className="w-4/5 max-h-[400px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};
