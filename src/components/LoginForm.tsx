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
import { useAuth } from '@/contexts/AuthContext'; // ✅ Import AuthContext

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'management' | 'employee'>('management');

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Ambil fungsi login dari context

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      Swal.fire({
        title: '<span style="color: white">Berhasil Masuk!</span>',
        text: 'Selamat Datang di SMART HRM',
        icon: 'success',
        background: '#1166d8',
        color: 'white',
        confirmButtonColor: '#ffffff',
        confirmButtonText: '<span style="color: #1166d8; font-weight: bold;">OK</span>',
        customClass: {
          popup: 'rounded-xl',
          title: 'text-xl',
          confirmButton: 'text-sm px-6 py-2 rounded-lg',
        },
      }).then(() => {
        login(username, password); // ✅ Simpan token dummy dan status login
        navigate('/dashboard'); // ✅ Pindah ke dashboard
      });
    } else {
      Swal.fire({
        title: '<span style="color: white">Login Gagal</span>',
        text: 'Username dan password harus diisi!',
        icon: 'error',
        background: '#d11a2a',
        color: 'white',
        confirmButtonColor: '#ffffff',
        confirmButtonText: '<span style="color: #d11a2a; font-weight: bold;">OK</span>',
        customClass: {
          popup: 'rounded-xl',
          title: 'text-xl',
          confirmButton: 'text-sm px-6 py-2 rounded-lg',
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1166d8] relative overflow-hidden">
      <img
        src="/wave3.png"
        alt="Gelombang"
        className="absolute bottom-0 left-0 w-full object-cover z-0"
      />

      <div className="absolute top-[calc(50%-330px)] z-20">
        <div className="bg-[#1166d8] rounded-full p-4 shadow-lg mx-auto border-2 border-white">
          <Users className="text-white h-8 w-8 stroke-[2]" />
        </div>
      </div>

      <Card className="w-full max-w-md shadow-2xl backdrop-blur-lg bg-white/95 border-0 relative z-10">
        <CardHeader className="space-y-1 text-center pb-8 pt-14">
          <CardTitle className="text-4xl font-bold text-[#1166d8]">
            SMART HRM
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg font-medium">
            Human Resource Information System
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center mb-4">
              <div className="inline-flex bg-gray-100 p-1 rounded-full border border-gray-300 shadow-inner">
                <button
                  type="button"
                  onClick={() => setRole('management')}
                  className={`px-4 py-1 text-sm font-medium rounded-full flex items-center gap-1 transition ${
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
                  className={`px-4 py-1 text-sm font-medium rounded-full flex items-center gap-1 transition ${
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

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="text-gray-500 w-5 h-5" />
                <Label htmlFor="username" className="text-gray-700 font-semibold text-sm uppercase tracking-wide">
                  Username
                </Label>
              </div>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="Masukkan username"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Lock className="text-gray-500 w-5 h-5" />
                <Label htmlFor="password" className="text-gray-700 font-semibold text-sm uppercase tracking-wide">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-200 bg-gray-50 focus:bg-white pr-12"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  className="border-2 border-gray-300"
                />
                <Label htmlFor="remember" className="text-sm text-gray-600 font-medium">
                  Ingat saya
                </Label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Lupa password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Users className="w-5 h-5 mr-2" />
              Masuk ke Sistem
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              © 2025 PT Proven Force Indonesia. All rights reserved.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
