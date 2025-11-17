import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
const StatusLabel = ({ status }) => {
  const isAktif = status === 'Aktif';
  const color = isAktif ? 'bg-green-700 text-white' : 'bg-red-700 text-white';
  const Icon = isAktif ? CheckCircle : XCircle;

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${color} whitespace-nowrap max-w-full truncate`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

// ========================= DUMMY DATA TIDAK DIUBAH =========================

const mockData = [...] 

const formatTanggal = (tanggal) => {
  const [year, month, day] = tanggal.split('-');
  return `${day}-${month}-${year}`;
};

const ReminderLabel = ({ text }) => {
  const isReminder = text?.toLowerCase().includes("kontrak akan habis");

  if (!text || text.trim() === '' || text === '-' || !isReminder) {
    return <span className="text-gray-400 text-sm whitespace-nowrap max-w-full truncate">{text}</span>;
  }

  return (
    <span className="inline-block bg-orange-300 text-black text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap max-w-full truncate">
      {text}
    </span>
  );
};

// ========================= HALAMAN ===============================

export const DataKaryawanPage = () => {
  const router = useRouter();
  const [data, setData] = useState(mockData);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState('10');
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter
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

  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
    setSelectAll(false);
  }, [show, search]);

  const toggleSelectAll = () => {
    if (selectAll) setSelectedIds([]);
    else setSelectedIds(paginatedData.map((k) => k.id));
    setSelectAll(!selectAll);
  };

  const toggleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const updateStatusAkun = (statusBaru) => {
    if (selectedIds.length === 0) return;

    Swal.fire({
      title: `Apakah Anda yakin?`,
      text: `Karyawan terpilih akan ${statusBaru === 'Aktif' ? 'diaktifkan' : 'dinonaktifkan'}!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Ya`,
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.map((k) => (selectedIds.includes(k.id) ? { ...k, statusAkun: statusBaru } : k)));
        setSelectedIds([]);
        setSelectAll(false);
      }
    });
  };

  const handleDeleteSingle = (id) => {
    Swal.fire({
      title: 'Hapus data ini?',
      icon: 'warning',
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        setData((prev) => prev.filter((k) => k.id !== id));
      }
    });
  };

  const handleDeleteMultiple = () => {
    if (selectedIds.length === 0) return;
    Swal.fire({
      title: 'Hapus data terpilih?',
      icon: 'warning',
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        setData((prev) => prev.filter((k) => !selectedIds.includes(k.id)));
        setSelectedIds([]);
        setSelectAll(false);
      }
    });
  };

  return (
    <div className="p-6 space-y-6">

      {/* ================== BAGIAN PROFIL + DATA DIRI DIGABUNG ================== */}

      <Card className="p-6 border shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profil & Data Diri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            {/* Foto */}
            <div className="flex flex-col items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                className="w-28 h-28 rounded-full border"
              />
              <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700">Upload Foto</Button>
            </div>

            {/* Form Data Diri */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div>
                <label className="text-sm font-semibold">Nama Lengkap</label>
                <Input placeholder="Nama lengkap" />
              </div>

              <div>
                <label className="text-sm font-semibold">Nomor Telepon</label>
                <Input placeholder="08xxx" />
              </div>

              <div>
                <label className="text-sm font-semibold">Tempat Lahir</label>
                <Input placeholder="Tempat lahir" />
              </div>

              <div>
                <label className="text-sm font-semibold">Tanggal Lahir</label>
                <Input type="date" />
              </div>

              <div>
                <label className="text-sm font-semibold">Jenis Kelamin</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laki">Laki-laki</SelectItem>
                    <SelectItem value="perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-semibold">Alamat</label>
                <Input placeholder="Alamat KTP" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================== DASHBOARD KARYAWAN ================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-green-700 text-white">
          <CardHeader>
            <CardTitle>Total Karyawan Aktif</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {data.filter((k) => k.statusKerja === 'Aktif').length}
          </CardContent>
        </Card>

        <Card className="bg-red-600 text-white">
          <CardHeader>
            <CardTitle>Total Karyawan Tidak Aktif</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {data.filter((k) => k.statusKerja === 'Tidak Aktif').length}
          </CardContent>
        </Card>
      </div>

      {/* ================== TABEL DATA ================== */}

      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle>Data Karyawan</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button className="bg-green-700 text-white" disabled={selectedIds.length === 0} onClick={() => updateStatusAkun('Aktif')}>
                Aktifkan
              </Button>

              <Button className="bg-yellow-400" disabled={selectedIds.length === 0} onClick={() => updateStatusAkun('Tidak Aktif')}>
                Nonaktifkan
              </Button>

              <Button className="bg-red-600 text-white" disabled={selectedIds.length === 0} onClick={handleDeleteMultiple}>
                Hapus Terpilih
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">Import</Button>
              <Button variant="outline">Export</Button>

              {/* ================== DIRECT BUTTON TAMBAH KARYAWAN ================== */}
              <Button onClick={() => router.push('/karyawan/tambah')} className="bg-blue-600 text-white hover:bg-blue-700">
                + Tambah Karyawan
              </Button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-auto max-h-[500px] border rounded">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 text-white">
                  <TableHead><input type="checkbox" checked={selectAll} onChange={toggleSelectAll} /></TableHead>
                  <TableHead>No</TableHead>
                  <TableHead>Foto</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Divisi</TableHead>
                  <TableHead>Jabatan</TableHead>
                  <TableHead>Tgl Bergabung</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Akun</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.map((k, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <input type="checkbox" checked={selectedIds.includes(k.id)} onChange={() => toggleSelectRow(k.id)} />
                    </TableCell>
                    <TableCell>{(currentPage - 1) * entriesPerPage + i + 1}</TableCell>
                    <TableCell>
                      <img src={k.foto} className="w-8 h-8 rounded-full object-cover" />
                    </TableCell>
                    <TableCell>{k.id}</TableCell>
                    <TableCell>{k.nama}</TableCell>
                    <TableCell>{k.divisi}</TableCell>
                    <TableCell>{k.jabatan}</TableCell>
                    <TableCell>{formatTanggal(k.tanggalBergabung)}</TableCell>
                    <TableCell>{k.statusKerja}</TableCell>
                    <TableCell>
                      <StatusLabel status={k.statusAkun} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-blue-600 text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => handleDeleteSingle(k.id)} size="sm" className="bg-red-600 text-white">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm">Menampilkan halaman {currentPage} dari {totalPages}</div>
            <div className="flex gap-2">
              <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Sebelumnya</Button>
              <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Selanjutnya</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
