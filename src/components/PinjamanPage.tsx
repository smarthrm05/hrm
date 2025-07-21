import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Eye, Trash2, ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

interface PinjamanData {
  no: number;
  idKaryawan: string;
  namaKaryawan: string;
  divisi: string;
  jabatan: string;
  jumlahPinjaman: number;
  keteranganPinjaman: string;
  termin: string;
  tanggalPengajuan: Date;
  catatan: string;
  status: 'Menunggu Disetujui' | 'Disetujui' | 'Ditolak';
  tanggalDisetujui?: Date;
  tanggalDitolak?: Date;

}

const mockData: PinjamanData[] = [
  {
    no: 1,
    idKaryawan: 'EMP001',
    namaKaryawan: 'Ahmad Rizki',
    divisi: 'IT',
    jabatan: 'Developer',
    jumlahPinjaman: 5000000,
    keteranganPinjaman: 'Pinjaman untuk renovasi rumah',
    termin: '12 bulan',
    tanggalPengajuan: new Date('2024-01-15T09:30:00'),
    catatan: 'Pembayaran setiap tanggal 15',
    status: 'Menunggu Disetujui'
  },
  {
    no: 2,
    idKaryawan: 'EMP002',
    namaKaryawan: 'Siti Nurhaliza',
    divisi: 'HR',
    jabatan: 'HR Manager',
    jumlahPinjaman: 3000000,
    keteranganPinjaman: 'Pinjaman pendidikan anak',
    termin: '6 bulan',
    tanggalPengajuan: new Date('2024-01-10T14:20:00'),
    catatan: 'Potong gaji bulanan',
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-01-12T10:15:00')
  },
  {
    no: 3,
    idKaryawan: 'EMP002',
    namaKaryawan: 'Siti Nurhaliza',
    divisi: 'HR',
    jabatan: 'HR Manager',
    jumlahPinjaman: 3000000,
    keteranganPinjaman: 'Pinjaman pendidikan anak',
    termin: '6 bulan',
    tanggalPengajuan: new Date('2024-01-10T14:20:00'),
    catatan: 'Potong gaji bulanan',
    status: 'Ditolak',
    tanggalDitolak: new Date('2024-01-22T11:45:00')
  }
];

export const PinjamanPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<PinjamanData[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = data.filter(item => 
    item.namaKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.idKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.divisi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('id-ID') + ' ' + date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadge = (
  status: string,
  tanggalDisetujui?: Date,
  tanggalDitolak?: Date
) => {
  if (status === 'Disetujui') {
    return (
      <div className="flex flex-col">
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mb-1">
          {status}
        </Badge>
        {tanggalDisetujui && (
          <span className="text-xs text-gray-500">
            {formatDateTime(tanggalDisetujui)}
          </span>
        )}
      </div>
    );
  }

  if (status === 'Ditolak') {
    return (
      <div className="flex flex-col">
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 mb-1">
          {status}
        </Badge>
        {tanggalDitolak && (
          <span className="text-xs text-gray-500">
            {formatDateTime(tanggalDitolak)}
          </span>
        )}
      </div>
    );
  }

  return (
    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
      {status}
    </Badge>
  );
};

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Pinjaman Karyawan</h1>
      </div>
      

      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Data Pengajuan</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Show</span>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                  <SelectTrigger className="w-20">
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
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari berdasarkan nama, ID, atau divisi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Ajukan Pinjaman
            </Button>
          </div>

          <div className="overflow-x-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">No.</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">ID Karyawan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Nama Karyawan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Divisi</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Jabatan</TableHead>
                  <TableHead className="text-white border border-gray-200 whitespace-nowrap">Jumlah Pinjaman</TableHead>
                  <TableHead className="text-white border-r border-blue-500">Keterangan</TableHead>
                  <TableHead className="text-white border-r border-blue-500">Termin</TableHead>
                  <TableHead className="text-white border-r border-blue-500">Tanggal Pengajuan</TableHead>
                  <TableHead className="text-white border-r border-blue-500">Catatan</TableHead>
                  <TableHead className="text-white border-r border-blue-500">Status</TableHead>
                  <TableHead className="text-white">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.no} className="border-b hover:bg-gray-50">
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.no}</TableCell>
                    <TableCell className="font-medium border-r whitespace-nowrap">{item.idKaryawan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrapp">{item.namaKaryawan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.divisi}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.jabatan}</TableCell>
                    <TableCell className="font-semibold border-r whitespace-nowrap">{formatCurrency(item.jumlahPinjaman)}</TableCell>
                    <TableCell className="max-w-xs truncate border-r whitespace-nowrap">{item.keteranganPinjaman}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{item.termin}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap">{formatDateTime(item.tanggalPengajuan)}</TableCell>
                    <TableCell className="max-w-xs truncate border-r whitespace-nowrap">{item.catatan}</TableCell>
                    <TableCell className="border border-gray-200 whitespace-nowrap"> {getStatusBadge(item.status, item.tanggalDisetujui, item.tanggalDitolak)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                         variant="ghost"
                         size="sm"
                         className="bg-blue-600 text-white hover:bg-blue-700"
                         title="Lihat Detail"
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
                {Math.max((currentPage - 1) * itemsPerPage + 1, 1)} sampai{' '}
                {Math.min(currentPage * itemsPerPage, filteredData.length)}
              </strong>{' '}
              dari <strong>{filteredData.length}</strong> data
            </div>

            {/* Navigasi pagination */}
            <div className="flex gap-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Sebelumnya
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={
                    currentPage === i + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                  }
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="bg-blue-500 text-white hover:bg-blue-600"
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