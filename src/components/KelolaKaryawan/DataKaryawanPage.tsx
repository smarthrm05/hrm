import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Swal from 'sweetalert2';
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
import {
  Search,
  Eye,
  Trash2,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Calendar,
  Trash,
} from 'lucide-react';

// Komponen Label Status
const StatusLabel = ({ status }: { status: string }) => {
  const isAktif = status === 'Aktif';
  const color = isAktif
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';
  const Icon = isAktif ? CheckCircle : XCircle;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${color}`}
    >
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
    foto: 'https://via.placeholder.com/50 ',
  },
  {
    id: 'K002',
    nama: 'Budi Santoso',
    divisi: 'HRD',
    jabatan: 'HR Manager',
    kategori: 'Full Time',
    tanggalBergabung: '2019-07-20',
    tanggalKontrak: '2019-07-20',
    selesaiKontrak: '2024-07-20',
    statusKerja: 'Aktif',
    statusAkun: 'Tidak Aktif',
    pengingat: '-',
    foto: 'https://via.placeholder.com/50 ',
  },
  {
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
    foto: 'https://via.placeholder.com/50 ',
  },
  {
    id: 'K004',
    nama: 'David Fernando',
    divisi: 'Finance',
    jabatan: 'Accountant',
    kategori: 'Full Time',
    tanggalBergabung: '2020-04-10',
    tanggalKontrak: '2020-04-10',
    selesaiKontrak: '2025-04-10',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: '-',
    foto: 'https://via.placeholder.com/50 ',
  },
  {
    id: 'K005',
    nama: 'Eka Suryadi',
    divisi: 'Sales',
    jabatan: 'Sales Executive',
    kategori: 'Part Time',
    tanggalBergabung: '2022-08-12',
    tanggalKontrak: '2022-08-12',
    selesaiKontrak: '2024-08-12',
    statusKerja: 'Aktif',
    statusAkun: 'Tidak Aktif',
    pengingat: 'Kontrak akan habis dalam 200 hari',
    foto: 'https://via.placeholder.com/50 ',
  },
  {
    id: 'K006',
    nama: 'Farah Meilina',
    divisi: 'IT',
    jabatan: 'Frontend Developer',
    kategori: 'Full Time',
    tanggalBergabung: '2021-10-05',
    tanggalKontrak: '2021-10-05',
    selesaiKontrak: '2024-10-05',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: '-',
    foto: 'https://via.placeholder.com/50 ',
  },
  {
    id: 'K007',
    nama: 'Gilang Ramadhan',
    divisi: 'R&D',
    jabatan: 'Research Analyst',
    kategori: 'Full Time',
    tanggalBergabung: '2020-01-22',
    tanggalKontrak: '2020-01-22',
    selesaiKontrak: '2025-01-22',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: 'Kontrak akan habis dalam 400 hari',
    foto: 'https://via.placeholder.com/50 ',
  },
  {
    id: 'K008',
    nama: 'Hana Febrianti',
    divisi: 'Customer Service',
    jabatan: 'Customer Support',
    kategori: 'Internship',
    tanggalBergabung: '2023-03-10',
    tanggalKontrak: '2023-03-10',
    selesaiKontrak: '2024-03-10',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: '-',
    foto: 'https://via.placeholder.com/50 ',
  },
  {
    id: 'K009',
    nama: 'Indra Perdana',
    divisi: 'Logistik',
    jabatan: 'Warehouse Supervisor',
    kategori: 'Full Time',
    tanggalBergabung: '2018-11-18',
    tanggalKontrak: '2018-11-18',
    selesaiKontrak: '2024-11-18',
    statusKerja: 'Aktif',
    statusAkun: 'Tidak Aktif',
    pengingat: 'Kontrak akan habis dalam 100 hari',
    foto: 'https://via.placeholder.com/50 ',
  },
  {
    id: 'K010',
    nama: 'Joko Susilo',
    divisi: 'IT',
    jabatan: 'System Administrator',
    kategori: 'Full Time',
    tanggalBergabung: '2019-09-05',
    tanggalKontrak: '2019-09-05',
    selesaiKontrak: '2024-09-05',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: '-',
    foto: 'https://via.placeholder.com/50 ',
  },
  {
    id: 'K011',
    nama: 'Kartika Dewi',
    divisi: 'Finance',
    jabatan: 'Finance Staff',
    kategori: 'Full Time',
    tanggalBergabung: '2021-02-28',
    tanggalKontrak: '2021-02-28',
    selesaiKontrak: '2024-02-28',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: 'Kontrak akan habis dalam 120 hari',
    foto: 'https://via.placeholder.com/50 ',
  },
  {
    id: 'K012',
    nama: 'Lutfi Andriansyah',
    divisi: 'Marketing',
    jabatan: 'Social Media Specialist',
    kategori: 'Part Time',
    tanggalBergabung: '2022-05-07',
    tanggalKontrak: '2022-05-07',
    selesaiKontrak: '2024-05-07',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: '-',
    foto: 'https://via.placeholder.com/50 ',
  },
  {
    id: 'K013',
    nama: 'Mira Yulianti',
    divisi: 'HRD',
    jabatan: 'Recruitment Officer',
    kategori: 'Full Time',
    tanggalBergabung: '2020-12-14',
    tanggalKontrak: '2020-12-14',
    selesaiKontrak: '2025-12-14',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: '-',
    foto: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'K014',
    nama: 'Nanda Praditha',
    divisi: 'IT',
    jabatan: 'Backend Developer',
    kategori: 'Internship',
    tanggalBergabung: '2023-09-01',
    tanggalKontrak: '2023-09-01',
    selesaiKontrak: '2024-09-01',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: 'Kontrak akan habis dalam 365 hari',
    foto: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 'K015',
    nama: 'Omar Faris',
    divisi: 'Sales',
    jabatan: 'Area Sales Manager',
    kategori: 'Full Time',
    tanggalBergabung: '2017-06-20',
    tanggalKontrak: '2017-06-20',
    selesaiKontrak: '2024-06-20',
    statusKerja: 'Aktif',
    statusAkun: 'Tidak Aktif',
    pengingat: '-',
    foto: 'https://randomuser.me/api/portraits/men/4.jpg ',
  },
];

const formatTanggal = (tanggal: string): string => {
  const [year, month, day] = tanggal.split('-');
  return `${day}-${month}-${year}`;
};

export const DataKaryawanPage = () => {
  const [data, setData] = useState<Karyawan[]>(mockData);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState('10');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data berdasarkan search
  const filteredData = data.filter((k) =>
    [k.id, k.nama, k.divisi, k.jabatan, k.statusKerja]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination
  const entriesPerPage = parseInt(show);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Reset halaman dan selected saat show/search berubah
  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
    setSelectAll(false);
  }, [show, search]);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((k) => k.id)); // hanya halaman ini
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const updateStatusAkun = (statusBaru: string) => {
    if (selectedIds.length === 0) return;

    Swal.fire({
      title: `Apakah Anda yakin?`,
      text: `Karyawan terpilih akan ${statusBaru === 'Aktif' ? 'diaktifkan' : 'dinonaktifkan'}!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Ya, ${statusBaru === 'Aktif' ? 'Aktifkan' : 'Non Aktifkan'}!`,
      cancelButtonText: 'Batal',
      background: '#3b82f6',
      color: '#ffffff',
      customClass: {
        popup: 'bg-blue-500 text-white',
        title: 'text-white',
        confirmButton: 'bg-white text-blue-500 hover:bg-blue-100',
        cancelButton: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
      },
      iconColor: '#bfdbfe',
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) =>
          prevData.map((k) =>
            selectedIds.includes(k.id) ? { ...k, statusAkun: statusBaru } : k
          )
        );
        setSelectedIds([]);
        setSelectAll(false);

        Swal.fire({
          title: 'Berhasil!',
          text: `Karyawan berhasil ${statusBaru === 'Aktif' ? 'diaktifkan' : 'dinonaktifkan'}.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#3b82f6',
          color: '#ffffff',
          customClass: {
            popup: 'bg-blue-500 text-white',
          },
        });
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Karyawan</h1>
      </div>
      <Card>
        <CardHeader className="bg-blue-50 border-b mb-4">
          <CardTitle className="text-blue-800">Data Karyawan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {/* Tombol Aktifkan */}
            <Button
              className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1"
              disabled={selectedIds.length === 0}
              onClick={() => updateStatusAkun('Aktif')}
            >
              <CheckCircle className="w-4 h-4" /> Aktifkan
            </Button>

            {/* Tombol Non Aktifkan */}
            <Button
              className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-1"
              disabled={selectedIds.length === 0}
              onClick={() => updateStatusAkun('Tidak Aktif')}
            >
              <XCircle className="w-4 h-4" /> Non Aktifkan
            </Button>

            <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Perbarui Kontrak
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-1">
              <Trash className="w-4 h-4" /> Hapus karyawan terpilih
            </Button>
          </div>
          <div className="flex justify-between items-center flex-wrap gap-4">
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
          <div className="overflow-auto rounded border border-gray-300">
            <Table className="w-full border border-gray-300 border-collapse">
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600 text-white">
                  <TableHead className="text-white border border-gray-200">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-white border border-gray-200">No</TableHead>
                  <TableHead className="text-white border border-gray-200">Foto</TableHead>
                  <TableHead className="text-white border border-gray-200">ID Karyawan</TableHead>
                  <TableHead className="text-white border border-gray-200">Nama Karyawan</TableHead>
                  <TableHead className="text-white border border-gray-200">Divisi</TableHead>
                  <TableHead className="text-white border border-gray-200">Jabatan</TableHead>
                  <TableHead className="text-white border border-gray-200">Tgl Bergabung</TableHead>
                  <TableHead className="text-white border border-gray-200">Kategori</TableHead>
                  <TableHead className="text-white border border-gray-200">Tgl Kontrak</TableHead>
                  <TableHead className="text-white border border-gray-200">Selesai Kontrak</TableHead>
                  <TableHead className="text-white border border-gray-200">Status Kerja</TableHead>
                  <TableHead className="text-white border border-gray-200">Status Akun</TableHead>
                  <TableHead className="text-white border border-gray-200">Pengingat</TableHead>
                  <TableHead className="text-white border border-gray-200">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((k, idx) => (
                  <TableRow key={k.id}>
                    <TableCell className="border border-gray-200">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(k.id)}
                        onChange={() => toggleSelectRow(k.id)}
                      />
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {(currentPage - 1) * entriesPerPage + idx + 1}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      <img
                        src={k.foto}
                        alt={k.nama}
                        className="rounded-full w-8 h-8 object-cover"
                      />
                    </TableCell>
                    <TableCell className="border border-gray-200">{k.id}</TableCell>
                    <TableCell className="border border-gray-200">{k.nama}</TableCell>
                    <TableCell className="border border-gray-200">{k.divisi}</TableCell>
                    <TableCell className="border border-gray-200">{k.jabatan}</TableCell>
                    <TableCell className="border border-gray-200">
                      {formatTanggal(k.tanggalBergabung)}
                    </TableCell>
                    <TableCell className="border border-gray-200">{k.kategori}</TableCell>
                    <TableCell className="border border-gray-200">
                      {formatTanggal(k.tanggalKontrak)}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {formatTanggal(k.selesaiKontrak)}
                    </TableCell>
                    <TableCell className="border border-gray-200">{k.statusKerja}</TableCell>
                    <TableCell className="border border-gray-200">
                      <StatusLabel status={k.statusAkun} />
                    </TableCell>
                    <TableCell className="border border-gray-200">{k.pengingat}</TableCell>
                    <TableCell className="border border-gray-200">
                      <Button variant="ghost" size="sm" className="mr-1">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="mr-1">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            {/* Informasi pagination */}
            <div className="text-sm text-gray-500">
              Menampilkan{' '}
              <strong>
                {Math.max((currentPage - 1) * entriesPerPage + 1, 1)} to{' '}
                {Math.min(currentPage * entriesPerPage, filteredData.length)}
              </strong>{' '}
              of <strong>{filteredData.length}</strong> data
            </div>

            {/* Navigasi pagination */}
            <div className="flex gap-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              >
                Sebelumnya
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? 'default' : 'outline'}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};