import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface CutiData {
  no: number;
  idKaryawan: string;
  nama: string;
  divisi: string;
  jabatan: string;
  jenisCuti: string;
  tanggalMulai: Date;
  tanggalSelesai: Date;
  alasan: string;
  status: 'Menunggu Disetujui' | 'Disetujui';
  tanggalDisetujui?: Date;
  tanggalPengajuan: Date;
  periodeCuti: string;
  sisaCuti: number;
}

const mockData: CutiData[] = [
  {
    no: 1,
    idKaryawan: 'EMP001',
    nama: 'Andi Saputra',
    divisi: 'IT',
    jabatan: 'Developer',
    jenisCuti: 'Cuti Tahunan',
    tanggalMulai: new Date('2024-07-01'),
    tanggalSelesai: new Date('2024-07-05'),
    alasan: 'Liburan bersama keluarga',
    status: 'Menunggu Disetujui',
    periodeCuti: '5 Hari',
    sisaCuti: 10,
    tanggalPengajuan: new Date('2024-06-15T10:12:00')
  },
  {
    no: 2,
    idKaryawan: 'EMP002',
    nama: 'Rina Maulida',
    divisi: 'HR',
    jabatan: 'HR Manager',
    jenisCuti: 'Cuti Melahirkan',
    tanggalMulai: new Date('2024-06-10'),
    tanggalSelesai: new Date('2024-09-10'),
    alasan: 'Kelahiran anak pertama',
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-06-01T09:30:00'),
    periodeCuti: '2 Hari',
    sisaCuti: 0,
    tanggalPengajuan: new Date('2024-05-25T08:45:00')
  }
];

export const CutiPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<CutiData[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = data.filter(item =>
    item.idKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.divisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jabatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jenisCuti.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID');
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string, tanggalDisetujui?: Date) => {
    if (status === 'Disetujui') {
      return (
        <div className="flex flex-col">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mb-1">{status}</Badge>
          {tanggalDisetujui && (
            <span className="text-xs text-gray-500">{formatDateTime(tanggalDisetujui)}</span>
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
        <h1 className="text-3xl font-bold text-gray-900">Cuti</h1>
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
                  placeholder="Cari ID, nama, divisi, jabatan, atau jenis cuti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Ajukan Cuti
            </Button>
          </div>

          <div className="overflow-x-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600 text-white">
                  <TableHead className="border text-white">No.</TableHead>
                  <TableHead className="border text-white">ID</TableHead>
                  <TableHead className="border text-white">Nama</TableHead>
                  <TableHead className="border text-white">Divisi</TableHead>
                  <TableHead className="border text-white">Jabatan</TableHead>
                  <TableHead className="border text-white">Jenis Cuti</TableHead>
                  <TableHead className="border text-white">Mulai Tanggal</TableHead>
                  <TableHead className="border text-white">Sampai Tanggal</TableHead>
                  <TableHead className="border text-white">Alasan</TableHead>
                  <TableHead className="border text-white">Periode Cuti</TableHead>
                  <TableHead className="border text-white">Sisa Cuti</TableHead>
                  <TableHead className="border text-white">Tanggal Pengajuan</TableHead>
                  <TableHead className="border text-white">Status</TableHead>
                  <TableHead className="border text-white">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.no} className="border">
                    <TableCell className="border">{item.no}</TableCell>
                    <TableCell className="border">{item.idKaryawan}</TableCell>
                    <TableCell className="border">{item.nama}</TableCell>
                    <TableCell className="border">{item.divisi}</TableCell>
                    <TableCell className="border">{item.jabatan}</TableCell>
                    <TableCell className="border">{item.jenisCuti}</TableCell>
                    <TableCell className="border">{formatDate(item.tanggalMulai)}</TableCell>
                    <TableCell className="border">{formatDate(item.tanggalSelesai)}</TableCell>
                    <TableCell className="border">{item.alasan}</TableCell>
                    <TableCell className="border">{item.periodeCuti}</TableCell>
                    <TableCell className="border">{item.sisaCuti}</TableCell>
                    <TableCell className="border">{formatDateTime(item.tanggalPengajuan)}</TableCell>
                    <TableCell className="border">{getStatusBadge(item.status, item.tanggalDisetujui)}</TableCell>
                    <TableCell className="border">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
