import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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


import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const StatusLabel = ({ status }: { status: string }) => {
  const isAktif = status === 'Aktif';
  const color = isAktif ? 'bg-green-600 text-white' : 'bg-red-600 text-white';
  const Icon = isAktif ? CheckCircle : XCircle;

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${color} whitespace-nowrap max-w-full truncate`}>
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
  {
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
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 'K004',
    nama: 'Dewi Lestari',
    divisi: 'Finance',
    jabatan: 'Accountant',
    kategori: 'Full Time',
    tanggalBergabung: '2022-01-10',
    tanggalKontrak: '2022-01-10',
    selesaiKontrak: '2025-01-10',
    statusKerja: 'Aktif',
    statusAkun: 'Aktif',
    pengingat: 'Kontrak akan habis dalam 395 hari',
    foto: 'https://randomuser.me/api/portraits/women/26.jpg',
  },
  {
    id: 'K005',
    nama: 'Eko Prasetyo',
    divisi: 'IT',
    jabatan: 'DevOps Engineer',
    kategori: 'Full Time',
    tanggalBergabung: '2020-11-05',
    tanggalKontrak: '2023-11-05',
    selesaiKontrak: '2024-11-05',
    statusKerja: 'Aktif',
    statusAkun: 'Tidak Aktif',
    pengingat: 'Kontrak akan habis dalam 328 hari',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
];

const formatTanggal = (tanggal: string): string => {
  const [year, month, day] = tanggal.split('-');
  return `${day}-${month}-${year}`;
};

const ReminderLabel = ({ text }: { text: string }) => {
  const isReminder = text?.toLowerCase().includes('kontrak akan habis');

  if (!text || text.trim() === '' || text === '-' || !isReminder) {
    return <span className="text-gray-400 text-sm whitespace-nowrap max-w-full truncate">{text}</span>;
  }

  return (
    <span className="inline-block bg-orange-300 text-black text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap max-w-full truncate">
      {text}
    </span>
  );
};

export const DataKaryawanPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Karyawan[]>(mockData);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState('10');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const filteredData = data.filter((k) =>
    [k.id, k.nama, k.divisi, k.jabatan, k.statusKerja]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

  const entriesPerPage = parseInt(show);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
    setSelectAll(false);
  }, [show, search]);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((k) => k.id));
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

  const updateStatusKaryawan = (statusBaru: string) => {
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
            selectedIds.includes(k.id)
              ? { ...k, statusKerja: statusBaru, statusAkun: statusBaru } 
              : k
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

  const handleDeleteSingle = (id: string) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data karyawan ini akan dihapus permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
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
        setData((prev) => prev.filter((k) => k.id !== id));
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        Swal.fire({
          title: 'Berhasil!',
          text: 'Karyawan berhasil dihapus.',
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

  const handleDeleteMultiple = () => {
    if (selectedIds.length === 0) return;
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data karyawan terpilih akan dihapus permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
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
        setData((prev) => prev.filter((k) => !selectedIds.includes(k.id)));
        setSelectedIds([]);
        setSelectAll(false);
        Swal.fire({
          title: 'Berhasil!',
          text: 'Karyawan berhasil dihapus.',
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

  const handleViewDetail = (id: string) => {
    navigate(`/detail-karyawan/${id}`);
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
    setSelectedFile(null);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      Swal.fire({
        title: 'Error!',
        text: 'Silakan pilih file Excel terlebih dahulu.',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false,
        background: '#3b82f6',
        color: '#ffffff',
        customClass: {
          popup: 'bg-blue-500 text-white',
        },
      });
      return;
    }

    Swal.fire({
      title: 'Berhasil!',
      text: `File "${selectedFile.name}" berhasil diunggah.`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      background: '#3b82f6',
      color: '#ffffff',
      customClass: {
        popup: 'bg-blue-500 text-white',
      },
    });

    closeUploadModal();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Karyawan</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-green-700 border-green-800 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-white">
              Total Karyawan Aktif
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(k => k.statusKerja === 'Aktif').length}
            </div>
            <p className="text-xs text-white">Karyawan</p>
          </CardContent>
        </Card>

        <Card className="bg-red-600 border-red-800 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-white">
              Total Karyawan Tidak Aktif
            </CardTitle>
            <XCircle className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(k => k.statusKerja === 'Tidak Aktif').length}
            </div>
            <p className="text-xs text-white">Karyawan</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="bg-blue-50 border-b mb-4">
          <CardTitle className="text-blue-800">Data Karyawan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              className="bg-green-700 hover:bg-green-600 text-white flex items-center gap-1"
              disabled={selectedIds.length === 0}
              onClick={() => updateStatusKaryawan('Aktif')}
            >
              <CheckCircle className="w-4 h-4" /> Aktifkan
            </Button>
            <Button
              className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-1"
              disabled={selectedIds.length === 0}
              onClick={() => updateStatusKaryawan('Tidak Aktif')}
            >
              <XCircle className="w-4 h-4" /> Non Aktifkan
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Perbarui Kontrak
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-1"
              disabled={selectedIds.length === 0}
              onClick={handleDeleteMultiple}
            >
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
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={openUploadModal}
              >
                <Upload className="w-4 h-4" />
                Unggah Data
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                Download Data
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => navigate('/tambah-karyawan')}
              >
                + Tambah Karyawan
              </Button>
            </div>
          </div>
          <div className="overflow-auto rounded border border-gray-300">
            <Table className="w-full border border-gray-300 border-collapse">
              <TableHeader>
                <TableRow className="bg-[#196de3] hover:bg-[#196de3] text-white">
                  <TableHead className="text-white border border-gray-200">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">No</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Foto</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">ID Karyawan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Nama Karyawan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Divisi</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Jabatan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tgl Bergabung</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Kategori</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Tgl Kontrak</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Selesai Kontrak</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Status Kerja</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">
                    Status Akun
                  </TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Pengingat Kontrak</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((k, idx) => (
                  <TableRow key={`${k.id}-${idx}`}>
                    <TableCell className="border border-gray-200">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(k.id)}
                        onChange={() => toggleSelectRow(k.id)}
                      />
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      {(currentPage - 1) * entriesPerPage + idx + 1}
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      <img
                        src={k.foto.trim()}
                        alt={k.nama}
                        className="rounded-full w-8 h-8 object-cover"
                      />
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{k.id}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{k.nama}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{k.divisi}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{k.jabatan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      {formatTanggal(k.tanggalBergabung)}
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{k.kategori}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      {formatTanggal(k.tanggalKontrak)}
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      {formatTanggal(k.selesaiKontrak)}
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      <StatusLabel status={k.statusKerja} />
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      <StatusLabel status={k.statusAkun} />
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      <ReminderLabel text={k.pengingat} />
                    </TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">
                      <div className="flex justify-start space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          title="Lihat Detail"
                          onClick={() => handleViewDetail(k.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-red-600 text-white hover:bg-red-700"
                          title="Hapus Data"
                          onClick={() => handleDeleteSingle(k.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Menampilkan{' '}
              <strong>
                {Math.max((currentPage - 1) * entriesPerPage + 1, 1)} to{' '}
                {Math.min(currentPage * entriesPerPage, filteredData.length)}
              </strong>{' '}
              of <strong>{filteredData.length}</strong> data
            </div>
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

      {/* Modal Upload */}
      <Dialog.Root open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" />
          <Dialog.Content className="fixed z-[9999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 focus:outline-none max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <Dialog.Title className="text-xl font-bold">Unggah Data Baru Karyawan</Dialog.Title>
              <Dialog.Close asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-gray-200"
                >
                  <Cross2Icon className="h-4 w-4" />
                </Button>
              </Dialog.Close>
            </div>

            {/* Bagian Unggah Excel */}
            <div className="mb-6 pt-2">
              <label className="font-medium text-sm text-gray-700 block mb-2">Unggah dokumen Excel</label>
              <div className="flex items-center gap-0">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  className="hidden"
                  id="upload-excel"
                />
                <label
                  htmlFor="upload-excel"
                  className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap"
                >
                  Pilih File
                </label>
                <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate">
                  {selectedFile ? selectedFile.name : "Tidak ada file yang dipilih"}
                </div>
              </div>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
                Download Template disini
              </a>
            </div>

            {/* Panduan Pengisian */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Panduan pengisian data karyawan di excel</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>
                  Kolom <strong>Username</strong> harus diisi dengan 3–20 karakter tanpa spasi, hanya huruf, angka, titik (<code>.</code>) atau underscore (<code>_</code>), dan tidak boleh diawali dengan simbol.
                </li>
                <li>
                  Password akun karyawan yang baru ditambahkan akan menggunakan password otomatis dari sistem: <strong>“1234”</strong>.
                </li>
                <li>
                  Kolom <strong>Email</strong> harus diisi dengan format <code>nama@domain.com</code> tanpa spasi dan menggunakan domain yang valid.
                </li>
                <li>
                  Kolom <strong>Role</strong> hanya dapat diisi dengan salah satu pilihan berikut: “Karyawan”, “Atasan”, “HRD”, “Direktur”, atau “Finance”.
                </li>
                <li>
                  Pengisian <strong>Tanggal</strong> harus berformat <strong>DD/MM/YYYY</strong>. Contoh: <code>25/05/2025</code>.
                </li>
                <li>
                  Kolom <strong>Jenis Kelamin</strong> hanya dapat diisi dengan “L” (Laki-laki) atau “P” (Perempuan).
                </li>
                <li>
                  Kolom <strong>Pendidikan</strong> hanya dapat diisi dengan salah satu pilihan berikut: “SD”, “SMP”, “SMA”, “SMK”, “MA”, “D1”, “D2”, “D3”, “D4”, “S1”, “S2”, atau “S3”.
                </li>
                <li>
                  Kolom <strong>Agama</strong> hanya dapat diisi dengan salah satu dari pilihan berikut: “Islam”, “Kristen”, “Katolik”, “Hindu”, “Buddha”, “Konghucu”, atau “Atheis”. Pengisian di luar opsi ini akan dianggap tidak valid.
                </li>
                <li>
                  Sebelum mengisi kolom <strong>Divisi</strong>, <strong>Jabatan</strong>, <strong>Bagian</strong>, dan <strong>Lokasi Kerja</strong>, pastikan bahwa data tersebut sudah terdaftar dalam aplikasi yang digunakan serta penulisannya harus sama persis antara data yang tersedia di sistem dengan data yang diisi di Excel.
                </li>
                <li>
                  Kolom <strong>Kategori Karyawan</strong> hanya dapat diisi dengan salah satu pilihan berikut: “Magang”, “PKWT”, “PKWTT”, “KHL”, “Harian”, atau “Borongan”.
                </li>
                <li>
                  Kolom <strong>Status Marital</strong> hanya dapat diisi dengan salah satu pilihan berikut: “TK/0”, “TK/1”, “TK/2”, “TK/3”, “K/0”, “K/1”, “K/2”, atau “K/3”.
                </li>
                <li>
                  Kolom <strong>Nomor KTP, KK, NPWP, KPJ, JKN, SIM</strong>, dan <strong>STNK</strong> harus diisi sesuai format resmi yang berlaku.
                </li>
                <li>
                  Kolom <strong>Hubungan</strong> hanya dapat diisi dengan salah satu pilihan berikut: “Orang Tua (Ayah)”, “Orang Tua (Ibu)”, “Suami”, “Istri”, “Saudara Kandung”, “Saudara Sepupu”, “Teman”, atau “Lainnya”.
                </li>
              </ul>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-3">
              <Dialog.Close asChild>
                <Button variant="outline">Batal</Button>
              </Dialog.Close>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};