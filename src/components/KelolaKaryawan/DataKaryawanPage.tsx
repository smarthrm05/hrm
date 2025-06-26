import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Eye, Trash2, Download, Upload } from 'lucide-react';

interface Karyawan {
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
}

const mockData: Karyawan[] = [
  {
    id: 'EMP001',
    nama: 'Andi Saputra',
    divisi: 'IT',
    jabatan: 'Frontend Developer',
    kategori: 'Tetap',
    tanggalBergabung: '2024-01-10',
    tanggalKontrak: '2024-01-10',
    selesaiKontrak: '2026-01-10',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: '30 hari sebelum',
    foto: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'EMP002',
    nama: 'Citra Dewi',
    divisi: 'HRD',
    jabatan: 'Recruiter',
    kategori: 'Kontrak',
    tanggalBergabung: '2023-06-15',
    tanggalKontrak: '2023-06-15',
    selesaiKontrak: '2024-06-15',
    statusKerja: 'Nonaktif',
    statusAkun: 'Tidak Aktif',
    pengingat: '14 hari sebelum',
    foto: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
];

export const DataKaryawanPage = () => {
  const [search, setSearch] = useState('');
  const [show, setShow] = useState('10');

  const filteredData = mockData.filter((k) =>
    [k.id, k.nama, k.divisi, k.jabatan, k.statusKerja].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
     <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Karyawan</h1>
      </div>

      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Data Karyawan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Top Control */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            {/* Show & Search */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Show</span>
                <Select value={show} onValueChange={setShow}>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">entries</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari ID, nama, divisi, jabatan atau jenis"
                  className="pl-10 w-64"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Import / Export / Add */}
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-1">
                <Upload className="w-4 h-4" />
                Import
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                + Tambah Karyawan
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto rounded border">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 text-white">
                  <TableHead className="text-white">No</TableHead>
                  <TableHead className="text-white">Foto</TableHead>
                  <TableHead className="text-white">ID Karyawan</TableHead>
                  <TableHead className="text-white">Nama Karyawan</TableHead>
                  <TableHead className="text-white">Divisi</TableHead>
                  <TableHead className="text-white">Jabatan</TableHead>
                  <TableHead className="text-white">Tgl Bergabung</TableHead>
                  <TableHead className="text-white">Kategori</TableHead>
                  <TableHead className="text-white">Tgl Kontrak</TableHead>
                  <TableHead className="text-white">Selesai Kontrak</TableHead>
                  <TableHead className="text-white">Status Kerja</TableHead>
                  <TableHead className="text-white">Status Akun</TableHead>
                  <TableHead className="text-white">Pengingat</TableHead>
                  <TableHead className="text-white">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((k, idx) => (
                  <TableRow key={k.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      <img
                        src={k.foto}
                        alt={k.nama}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </TableCell>
                    <TableCell>{k.id}</TableCell>
                    <TableCell>{k.nama}</TableCell>
                    <TableCell>{k.divisi}</TableCell>
                    <TableCell>{k.jabatan}</TableCell>
                    <TableCell>{k.tanggalBergabung}</TableCell>
                    <TableCell>{k.kategori}</TableCell>
                    <TableCell>{k.tanggalKontrak}</TableCell>
                    <TableCell>{k.selesaiKontrak}</TableCell>
                    <TableCell>{k.statusKerja}</TableCell>
                    <TableCell>{k.statusAkun}</TableCell>
                    <TableCell>{k.pengingat}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Menampilkan 1 sampai {filteredData.length} dari {filteredData.length} entri
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
