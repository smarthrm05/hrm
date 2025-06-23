import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface IzinData {
  no: number;
  idKaryawan: string;
  nama: string;
  divisi: string;
  jabatan: string;
  tanggal: Date;
  jamKeluar: string;
  jamKembali: string;
  keperluan: string;
  tanggalPengajuan: Date;
  status: 'Menunggu Disetujui' | 'Disetujui';
  tanggalDisetujui?: Date;
}

const mockData: IzinData[] = [
  {
    no: 1,
    idKaryawan: 'EMP003',
    nama: 'Doni Hartono',
    divisi: 'Finance',
    jabatan: 'Akuntan',
    tanggal: new Date('2024-06-14'),
    jamKeluar: '13:00',
    jamKembali: '15:00',
    keperluan: 'Ke bank',
    tanggalPengajuan: new Date('2024-06-13T16:30:00'),
    status: 'Menunggu Disetujui'
  },
  {
    no: 2,
    idKaryawan: 'EMP004',
    nama: 'Lisa Wahyuni',
    divisi: 'Marketing',
    jabatan: 'Marketing Lead',
    tanggal: new Date('2024-06-12'),
    jamKeluar: '10:00',
    jamKembali: '12:00',
    keperluan: 'Konsultasi ke dokter',
    tanggalPengajuan: new Date('2024-06-11T09:00:00'),
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-06-11T13:45:00')
  }
];

export const IzinPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<IzinData[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = data.filter(item =>
    item.idKaryawan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.divisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jabatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.keperluan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (date: Date) => date.toLocaleDateString('id-ID');
  const formatDateTime = (date: Date) =>
    date.toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

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
        <h1 className="text-3xl font-bold text-gray-900">Izin </h1>
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
                  placeholder="Cari ID, nama, divisi, jabatan, keperluan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Ajukan Izin
            </Button>
          </div>

          <div className="overflow-x-auto border rounded-lg">
            <Table>
            <TableHeader>
            <TableRow className="bg-blue-600 [&>th]:text-white hover:bg-blue-600 pointer-events-none">
              <TableHead className="border border-gray-300 font-semibold text-sm">No</TableHead>
              <TableHead className="border border-gray-300 font-semibold text-sm">ID</TableHead>
              <TableHead className="border border-gray-300 font-semibold text-sm">Nama</TableHead>
              <TableHead className="border border-gray-300 font-semibold text-sm">Divisi</TableHead>
              <TableHead className="border border-gray-300 font-semibold text-sm">Jabatan</TableHead>
              <TableHead className="border border-gray-300 font-semibold text-sm">Tanggal</TableHead>
              <TableHead className="border border-gray-300 font-semibold text-sm">Jam Keluar</TableHead>
              <TableHead className="border border-gray-300 font-semibold text-sm">Jam Kembali</TableHead>
              <TableHead className="border border-gray-300 font-semibold text-sm">Keperluan</TableHead>
              <TableHead className="border border-gray-300 font-semibold text-sm">Tanggal Pengajuan</TableHead>
              <TableHead className="border border-gray-300 font-semibold text-sm">Status</TableHead>
              <TableHead className="border border-gray-300 font-semibold text-sm">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.no}>
                <TableCell className="border border-gray-200">{item.no}</TableCell>
                <TableCell className="border border-gray-200">{item.idKaryawan}</TableCell>
                <TableCell className="border border-gray-200">{item.nama}</TableCell>
                <TableCell className="border border-gray-200">{item.divisi}</TableCell>
                <TableCell className="border border-gray-200">{item.jabatan}</TableCell>
                <TableCell className="border border-gray-200">{formatDate(item.tanggal)}</TableCell>
                <TableCell className="border border-gray-200">{item.jamKeluar}</TableCell>
                <TableCell className="border border-gray-200">{item.jamKembali}</TableCell>
                <TableCell className="border border-gray-200">{item.keperluan}</TableCell>
                <TableCell className="border border-gray-200">{formatDateTime(item.tanggalPengajuan)}</TableCell>
                <TableCell className="border border-gray-200">{getStatusBadge(item.status, item.tanggalDisetujui)}</TableCell>
                <TableCell className="border border-gray-200">
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
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm">Page {currentPage} of {totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
