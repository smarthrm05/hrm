import React, { useState } from 'react';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  User,
  Building2,
  Briefcase,
  Users,
  Phone,
  Mail,
} from 'lucide-react';

export const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    company: '',
    position: '',
    employees: '1',
    phone: '',
    email: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Tampilkan SweetAlert2 setelah submit
    Swal.fire({
      icon: 'success',
      title: '<span style="color: white;">Berhasil Mendaftar!</span>',
      text: 'Tim Kami Akan Segera Menghubungi Anda Segera dalam 1x24jam',
      background: '#1166d8',
      color: 'white',
      confirmButtonColor: '#ffffff',
      confirmButtonText:
        '<span style="color: #1166d8; font-weight: bold;">OK</span>',
      customClass: {
        popup: 'rounded-xl',
        title: 'text-xl',
        confirmButton: 'text-sm px-6 py-2 rounded-lg',
      },
    });
  };

  const renderField = (
    label: string,
    placeholder: string,
    icon: React.ReactNode,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type = 'text'
  ) => (
    <div>
      <Label className="text-sm mb-1 block">{label}</Label>
      <div className="flex items-center border rounded-md overflow-hidden bg-white">
        <div className="flex items-center justify-center w-10 h-10 border-r bg-gray-50">
          {icon}
        </div>
        <Input
          type={type}
          placeholder={placeholder}
          className="flex-1 border-0 focus:ring-0 focus:outline-none"
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-8"
      style={{ backgroundImage: "url('/public/wave.png')" }}
    >
      <div className="relative z-10 w-full max-w-2xl">
        <Card className="w-full shadow-2xl rounded-2xl">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-center mb-1">
              Daftar <span className="text-blue-600">SMART HRM</span> Sekarang
            </h1>
            <p className="text-center text-sm text-gray-600 mb-6">
              Dapatkan <span className="font-bold text-black">FREE TRIAL Akun 14 Hari!</span> berbagai fitur HR dalam satu aplikasi.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {renderField(
                'Nama Lengkap',
                'Nama',
                <User className="w-4 h-4 text-gray-400" />,
                form.name,
                (e) => handleChange('name', e.target.value)
              )}
              {renderField(
                'Nama Perusahaan',
                'PT XXX',
                <Building2 className="w-4 h-4 text-gray-400" />,
                form.company,
                (e) => handleChange('company', e.target.value)
              )}
              {renderField(
                'Jabatan di Perusahaan Sebagai',
                'Pemilik',
                <Briefcase className="w-4 h-4 text-gray-400" />,
                form.position,
                (e) => handleChange('position', e.target.value)
              )}
              {renderField(
                'Jumlah Karyawan',
                '1',
                <Users className="w-4 h-4 text-gray-400" />,
                form.employees,
                (e) => handleChange('employees', e.target.value),
                'number'
              )}
              {renderField(
                'Nomor HP',
                '0812XXXXXXX',
                <Phone className="w-4 h-4 text-gray-400" />,
                form.phone,
                (e) => handleChange('phone', e.target.value),
                'tel'
              )}
              {renderField(
                'Alamat Email',
                'alamat@email.com',
                <Mail className="w-4 h-4 text-gray-400" />,
                form.email,
                (e) => handleChange('email', e.target.value),
                'email'
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Daftar Sekarang
              </Button>

              <div className="text-center text-sm mt-3">
                Sudah pernah daftar?{' '}
                <a href="#" className="text-blue-600 hover:underline font-medium">
                  Login disini
                </a>
              </div>

              <p className="text-xs text-center text-gray-500 mt-2">
                Dengan klik tombol daftar, saya telah membaca dan menyetujui{' '}
                <a href="#" className="text-blue-600 hover:underline font-medium">
                  Syarat & Ketentuan SMART HRM
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
