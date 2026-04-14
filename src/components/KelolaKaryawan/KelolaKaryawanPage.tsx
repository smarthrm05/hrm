import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Card, CardContent } from '@/components/ui/card';
import { Search, Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';

const StatusLabel = ({ status }: { status: string }) => {
  const isAktif = status === 'Aktif';
  const color = isAktif ? 'bg-green-600 text-white' : 'bg-red-600 text-white';
  const Icon = isAktif ? CheckCircle : XCircle;

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${color}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

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
  },
];

const KelolaKaryawanPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Karyawan[]>(mockData);
  const [search, setSearch] = useState('');

  const filteredData = data.filter((k) =>
    [k.nama, k.divisi, k.jabatan].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((k) => k.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manajemen Karyawan</h1>

      <div className="flex justify-between">
        <div className="relative">
          <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
          <Input
            className="pl-8 w-64"
            placeholder="Cari karyawan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Button onClick={() => navigate('/tambah-karyawan')}>
          + Tambah
        </Button>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Divisi</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData.map((k) => (
                <TableRow key={k.id}>
                  <TableCell>{k.nama}</TableCell>
                  <TableCell>{k.divisi}</TableCell>
                  <TableCell>{k.jabatan}</TableCell>
                  <TableCell>
                    <StatusLabel status={k.statusKerja} />
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => navigate(`/detail-karyawan/${k.id}`)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(k.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default KelolaKaryawanPage;