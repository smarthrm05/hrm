import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface KehadiranData {
  no: number;
  idKaryawan: string;
  nama: string;
  karyawan: string;
  divisi: string;
  jabatan: string;
  tanggal: string;
  absenMasuk: {
    jam: string;
    shift: string;
    lokasi: string;
    detail: string;
    catatan: string;
  };
  absenPulang: {
    jam: string;
    shift: string;
    lokasi: string;
    detail: string;
    catatan: string;
  };
}

const mockData: KehadiranData[] = [
  { no: 1, idKaryawan: 'EMP001', nama: 'Andi Saputra', karyawan: 'Tetap', divisi: 'IT', jabatan: 'Frontend Developer', tanggal: '20/06/2025', absenMasuk: { jam: '06:00', shift: 'Shift 1', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: 'Tepat Waktu' }, absenPulang: { jam: '14:00', shift: 'Shift 1', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: 'Pulang Normal' } },
  { no: 2, idKaryawan: 'EMP002', nama: 'Budi Hartono', karyawan: 'Kontrak', divisi: 'Finance', jabatan: 'Accountant', tanggal: '20/06/2025', absenMasuk: { jam: '14:05', shift: 'Shift 2', lokasi: 'Remote', detail: 'Rumah, Bekasi', catatan: 'WFH Disetujui' }, absenPulang: { jam: '22:00', shift: 'Shift 2', lokasi: 'Remote', detail: 'Rumah, Bekasi', catatan: 'Lembur 30 Menit' } },
  { no: 3, idKaryawan: 'EMP003', nama: 'Citra Dewi', karyawan: 'Tetap', divisi: 'HRD', jabatan: 'Recruiter', tanggal: '21/06/2025', absenMasuk: { jam: '22:10', shift: 'Shift 3', lokasi: 'Kantor Cabang', detail: 'Jl. Gatot Subroto No.20', catatan: 'Night Shift' }, absenPulang: { jam: '06:10', shift: 'Shift 3', lokasi: 'Kantor Cabang', detail: 'Jl. Gatot Subroto No.20', catatan: 'Lembur 1 Jam' } },
  { no: 4, idKaryawan: 'EMP004', nama: 'Dian Permana', karyawan: 'Magang', divisi: 'IT', jabatan: 'Backend Intern', tanggal: '21/06/2025', absenMasuk: { jam: '06:15', shift: 'Long Shift 1', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: 'Terlambat 15 Menit' }, absenPulang: { jam: '18:15', shift: 'Long Shift 1', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: 'Pulang Normal' } },
  { no: 5, idKaryawan: 'EMP005', nama: 'Eka Lestari', karyawan: 'Tetap', divisi: 'Marketing', jabatan: 'Content Strategist', tanggal: '22/06/2025', absenMasuk: { jam: '14:00', shift: 'Long Shift 2', lokasi: 'Remote', detail: 'Jl. Cendana No.5', catatan: 'WFH Disetujui' }, absenPulang: { jam: '02:00', shift: 'Long Shift 2', lokasi: 'Remote', detail: 'Jl. Cendana No.5', catatan: 'Meeting Online' } },
  { no: 6, idKaryawan: 'EMP006', nama: 'Fajar Nugroho', karyawan: 'Kontrak', divisi: 'IT', jabatan: 'DevOps Engineer', tanggal: '22/06/2025', absenMasuk: { jam: '22:00', shift: 'Shift 3', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: 'Server Maintenance' }, absenPulang: { jam: '06:10', shift: 'Shift 3', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: 'Pagi Subuh' } },
  { no: 7, idKaryawan: 'EMP007', nama: 'Gita Sari', karyawan: 'Magang', divisi: 'Customer Service', jabatan: 'CS Online', tanggal: '23/06/2025', absenMasuk: { jam: '06:05', shift: 'Shift 1', lokasi: 'Remote', detail: 'Bandung', catatan: 'Tepat Waktu' }, absenPulang: { jam: '14:00', shift: 'Shift 1', lokasi: 'Remote', detail: 'Bandung', catatan: 'Pulang Normal' } },
  { no: 8, idKaryawan: 'EMP008', nama: 'Hadi Santoso', karyawan: 'Tetap', divisi: 'Logistik', jabatan: 'Driver', tanggal: '23/06/2025', absenMasuk: { jam: '14:00', shift: 'Long Shift 1', lokasi: 'Gudang Utama', detail: 'Jl. Raya Cibubur', catatan: 'Antar Barang' }, absenPulang: { jam: '00:30', shift: 'Long Shift 1', lokasi: 'Gudang Utama', detail: 'Jl. Raya Cibubur', catatan: 'Lembur 30 Menit' } },
  { no: 9, idKaryawan: 'EMP009', nama: 'Irfan Maulana', karyawan: 'Kontrak', divisi: 'Design', jabatan: 'UI Designer', tanggal: '24/06/2025', absenMasuk: { jam: '22:20', shift: 'Long Shift 2', lokasi: 'Remote', detail: 'Tangerang', catatan: 'WFH Malam' }, absenPulang: { jam: '10:20', shift: 'Long Shift 2', lokasi: 'Remote', detail: 'Tangerang', catatan: 'Pagi Hari' } },
  { no: 10, idKaryawan: 'EMP010', nama: 'Joko Widodo', karyawan: 'Tetap', divisi: 'Manajemen', jabatan: 'Direktur', tanggal: '24/06/2025', absenMasuk: { jam: '06:30', shift: 'Shift 2', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: 'Rapat Direksi' }, absenPulang: { jam: '18:30', shift: 'Shift 2', lokasi: 'Kantor Pusat', detail: 'Jl. Merdeka No.1', catatan: 'Lembur & Rapat' } },
];

export const DataKehadiranPage = () => {
  const [startDate, setStartDate] = useState<string>('20/06/2025');
  const [endDate, setEndDate] = useState<string>('30/06/2025');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<KehadiranData[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, startDate, endDate, itemsPerPage]);

  const formatDateToInput = (dateString: string): string => {
    const [d, m, y] = dateString.split('/');
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  };

  const filteredData = data.filter((item) => {
    const matchesSearch = [item.idKaryawan, item.nama, item.divisi, item.jabatan, item.karyawan]
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === 'all' || item.karyawan === categoryFilter;

    const toComparable = (d: string) => d.split('/').reverse().join('');
    const itemDateComp = toComparable(item.tanggal);
    const startComp = toComparable(startDate);
    const endComp = toComparable(endDate);
    const matchesDate = itemDateComp >= startComp && itemDateComp <= endComp;

    return matchesSearch && matchesCategory && matchesDate;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Kehadiran Karyawan</h1>
      </div>

      <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Data Kehadiran</CardTitle>
        </CardHeader>
        <CardContent className="p-6">

          {/* Filter Field */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter kategori karyawan <span className="text-red-500">*</span>
              </label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="border border-gray-400 focus:border-blue-600">
                  <SelectValue placeholder="-- Semua Karyawan --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">-- Semua Karyawan --</SelectItem>
                  <SelectItem value="Tetap">Tetap (PKWTT)</SelectItem>
                  <SelectItem value="Kontrak">Kontrak (PKWT)</SelectItem>
                  <SelectItem value="Magang">Magang</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mulai dari tanggal</label>
              <div className="relative">
                <Input id="start-date" type="text" value={startDate} readOnly className="pr-10 border-gray-400 focus:border-blue-600 cursor-pointer" onClick={() => document.getElementById('hidden-start-date')?.showPicker?.()} />
                <input id="hidden-start-date" type="date" className="absolute inset-0 opacity-0 cursor-pointer" value={formatDateToInput(startDate)} onChange={(e) => setStartDate(e.target.value ? e.target.value.split('-').reverse().join('/') : '')} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sampai dengan tanggal</label>
              <div className="relative">
                <Input id="end-date" type="text" value={endDate} readOnly className="pr-10 border-gray-400 focus:border-blue-600 cursor-pointer" onClick={() => document.getElementById('hidden-end-date')?.showPicker?.()} />
                <input id="hidden-end-date" type="date" className="absolute inset-0 opacity-0 cursor-pointer" value={formatDateToInput(endDate)} onChange={(e) => setEndDate(e.target.value ? e.target.value.split('-').reverse().join('/') : '')} />
              </div>
            </div>
          </div>
          
          {/* Search and Table Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Show</span>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                  <SelectTrigger className="w-[80px] border border-gray-400 hover:border-gray-600 focus:border-blue-600 shadow-sm rounded-md">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-600">entries</span>
              </div>
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Cari ID, nama, divisi, jabatan, atau status..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-400 hover:border-gray-600 focus:border-blue-600 focus:ring-1 focus:ring-blue-500 rounded-md shadow-sm transition-colors"/>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border rounded-lg">
            <Table className="w-full border border-gray-300 border-collapse min-w-[1400px]">
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600 text-white">
                  <TableHead className="border text-white whitespace-nowrap">No.</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">ID Karyawan</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Nama Karyawan</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Karyawan</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Divisi</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Jabatan</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Tanggal</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Jam Masuk</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Shift</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Lokasi Masuk</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Detail Masuk</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Catatan Masuk</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Jam Pulang</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Shift</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Lokasi Pulang</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Detail Pulang</TableHead>
                  <TableHead className="border text-white whitespace-nowrap">Catatan Pulang</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <TableRow key={item.no} className="hover:bg-gray-50">
                      <TableCell className="border-r">{item.no}</TableCell>
                      <TableCell className="font-medium border-r">{item.idKaryawan}</TableCell>
                      <TableCell className="border-r">{item.nama}</TableCell>
                      <TableCell className="border-r">{item.karyawan}</TableCell>
                      <TableCell className="border-r">{item.divisi}</TableCell>
                      <TableCell className="border-r">{item.jabatan}</TableCell>
                      <TableCell className="border-r">{item.tanggal}</TableCell>
                      <TableCell className="border-r font-medium">{item.absenMasuk.jam}</TableCell>
                      <TableCell className="border-r whitespace-nowrap">{item.absenMasuk.shift}</TableCell>
                      <TableCell className="border-r">{item.absenMasuk.lokasi}</TableCell>
                      <TableCell className="border-r text-xs">{item.absenMasuk.detail}</TableCell>
                      <TableCell className="border-r">{item.absenMasuk.catatan}</TableCell>
                      <TableCell className="border-r font-medium">{item.absenPulang.jam}</TableCell>
                      <TableCell className="border-r whitespace-nowrap">{item.absenPulang.shift}</TableCell>
                      <TableCell className="border-r">{item.absenPulang.lokasi}</TableCell>
                      <TableCell className="border-r text-xs">{item.absenPulang.detail}</TableCell>
                      <TableCell className="border-r">{item.absenPulang.catatan}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={17} className="text-center py-8 text-gray-500">
                      Tidak ada data yang sesuai dengan filter yang dipilih.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
              <div className="text-sm text-gray-500">
                Menampilkan{' '}
                <strong>
                  {filteredData.length > 0 ? Math.max((currentPage - 1) * itemsPerPage + 1, 1) : 0} sampai{' '}
                  {Math.min(currentPage * itemsPerPage, filteredData.length)}
                </strong>{' '}
                dari <strong>{filteredData.length}</strong> data
              </div>
              <div className="flex gap-2">
                <Button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} className="bg-blue-500 text-white hover:bg-blue-600">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Sebelumnya
                </Button>
                {[...Array(totalPages)].map((_, i) => (
                  <Button key={i} size="sm" onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'}>
                    {i + 1}
                  </Button>
                ))}
                <Button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} className="bg-blue-500 text-white hover:bg-blue-600">
                  Selanjutnya <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

        </CardContent>
      </Card>
    </div>
  );
};