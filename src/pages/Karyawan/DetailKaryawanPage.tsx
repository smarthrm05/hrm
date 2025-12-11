import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle, User, Building, Briefcase, Mail, Phone, MapPin, Calendar, File} from 'lucide-react';

const mockData: Record<string, any> = {
  'K001': {
    id: 'K001',
    nama: 'Andi Prasetyo',
    divisi: 'IT',
    jabatan: 'Software Engineer',
    kategori: 'Full Time',
    tanggalBergabung: '2021-03-15',
    tanggalKontrak: '2021-03-15',
    selesaiKontrak: '2024-03-15',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: 'Kontrak akan habis dalam 90 hari',
    foto: 'https://randomuser.me/api/portraits/men/19.jpg',
    email: 'andi.prasetyo@example.com',
    nomorHandphone: '08567300484',
    alamat: 'Jl. Lapangan No. 13, RT. 001/008, Kranji, Bekasi Barat',
    username: '031125',
  },
  'K002': {
    id: 'K002',
    nama: 'Budi Santoso',
    divisi: 'HRD',
    jabatan: 'HR Manager',
    kategori: 'Full Time',
    tanggalBergabung: '2019-07-20',
    tanggalKontrak: '2019-07-20',
    selesaiKontrak: '2024-07-20',
    statusKerja: 'Tidak Aktif',
    statusAkun: 'Tidak Aktif',
    pengingat: '-',
    foto: 'https://randomuser.me/api/portraits/men/13.jpg',
    email: 'budi.santoso@example.com',
    nomorHandphone: '08123456789',
    alamat: 'Jl. Merdeka No. 1, Jakarta Pusat',
    username: '031126',
  },
  'K003': {
    id: 'K003',
    nama: 'Cindy Putri',
    divisi: 'Marketing',
    jabatan: 'Digital Marketing',
    kategori: 'Internship',
    tanggalBergabung: '2023-06-01',
    tanggalKontrak: '2023-06-01',
    selesaiKontrak: '2024-06-01',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: 'Kontrak akan habis dalam 365 hari',
    foto: 'https://randomuser.me/api/portraits/women/11.jpg',
    email: 'cindy.putri@example.com',
    nomorHandphone: '08987654321',
    alamat: 'Jl. Sudirman No. 100, Bandung',
    username: '031127',
  },
};

interface KaryawanDetail {
  id: string;
  nama: string;
  divisi: string;
  jabatan: string;
  kategori: string;
  tanggalBergabung: string;
  tanggalKontrak: string;
  selesaiKontrak: string;
  statusKerja: string;
  statusAkun: string;
  pengingat: string;
  foto: string;
  email: string;
  nomorHandphone: string;
  alamat: string;
  username: string;
}

const DetailKaryawanPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [karyawan, setKaryawan] = useState<KaryawanDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = mockData[id as string];
        if (!data) {
          throw new Error('Karyawan tidak ditemukan.');
        }
        setKaryawan(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="p-6">Memuat data karyawan...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => navigate(-1)} className="mt-4">Kembali ke Daftar</Button>
      </div>
    );
  }

  if (!karyawan) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Data Tidak Ditemukan</AlertTitle>
          <AlertDescription>Karyawan dengan ID {id} tidak ditemukan.</AlertDescription>
        </Alert>
        <Button onClick={() => navigate(-1)} className="mt-4">Kembali ke Daftar</Button>
      </div>
    );
  }

  const formatTanggal = (tanggal: string): string => {
    const [year, month, day] = tanggal.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src={karyawan.foto} alt={karyawan.nama} />
          <AvatarFallback>{karyawan.nama.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{karyawan.nama}</h1>
          <p className="text-gray-500">{karyawan.email}</p>
        </div>
      </div>

      {/* Informasi Singkat */}
      <div className="flex gap-4 bg-gray-50 p-4 rounded">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">Jabatan: {karyawan.jabatan}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">Divisi: {karyawan.divisi}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">ID Karyawan: {karyawan.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">Tanggal Kontrak: {formatTanggal(karyawan.tanggalKontrak)}</span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="akun" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="akun" className="flex items-center gap-1">
            <Mail className="w-4 h-4" /> Akun
          </TabsTrigger>
          <TabsTrigger value="dataDiri" className="flex items-center gap-1">
            <User className="w-4 h-4" /> Data Diri
          </TabsTrigger>
          <TabsTrigger value="kepegawaian" className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" /> Kepegawaian
          </TabsTrigger>
          <TabsTrigger value="manajemenFile" className="flex items-center gap-1">
            <File className="w-4 h-4" /> Manajemen File
          </TabsTrigger>
          <TabsTrigger value="kontakDarurat" className="flex items-center gap-1">
            <Phone className="w-4 h-4" /> Kontak Darurat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="akun" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Perbarui Akun</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" value={karyawan.username} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={karyawan.email} readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Masukkan password baru" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Konfirmasi Password" />
                  </div>
                </div>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">Perbarui</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dataDiri" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pribadi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Nama Lengkap:</span>
                  <span>{karyawan.nama}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">E-mail:</span>
                  <span>{karyawan.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Nomor Handphone:</span>
                  <span>{karyawan.nomorHandphone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Alamat:</span>
                  <span>{karyawan.alamat}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kepegawaian" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Kepegawaian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">ID Karyawan:</span>
                  <span>{karyawan.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Jabatan:</span>
                  <span>{karyawan.jabatan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Divisi:</span>
                  <span>{karyawan.divisi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Kategori:</span>
                  <span>{karyawan.kategori}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tanggal Bergabung:</span>
                  <span>{formatTanggal(karyawan.tanggalBergabung)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tanggal Kontrak:</span>
                  <span>{formatTanggal(karyawan.tanggalKontrak)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Selesai Kontrak:</span>
                  <span>{formatTanggal(karyawan.selesaiKontrak)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status Kerja:</span>
                  <span>{karyawan.statusKerja}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status Akun:</span>
                  <span>{karyawan.statusAkun}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Pengingat:</span>
                  <span>{karyawan.pengingat}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manajemenFile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manajemen File</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Fitur ini masih dalam pengembangan.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kontakDarurat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kontak Darurat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Fitur ini masih dalam pengembangan.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Kembali
        </Button>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => navigate('/edit-karyawan/' + karyawan.id)}
        >
          Edit Profil
        </Button>
      </div>
    </div>
  );
};

export default DetailKaryawanPage;