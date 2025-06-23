import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface POData {
  poNo: number;
  judulPO: string;
  nomorPO: string;
  divisi: string;
  dibuatOleh: string;
  jumlah: number;
  dibuatTanggal: Date;
  status: 'Menunggu Disetujui' | 'Disetujui';
  tanggalDisetujui?: Date;
}

const mockPO: POData[] = [
  {
    poNo: 1,
    judulPO: 'Pengadaan Alat Tulis Kantor',
    nomorPO: 'PO/2024/001',
    divisi: 'Procurement',
    dibuatOleh: 'Rina Permata',
    jumlah: 1500000,
    dibuatTanggal: new Date('2024-06-14T08:30:00'),
    status: 'Menunggu Disetujui'
  },
  {
    poNo: 2,
    judulPO: 'Pembelian Laptop',
    nomorPO: 'PO/2024/002',
    divisi: 'IT',
    dibuatOleh: 'Budi Santoso',
    jumlah: 12000000,
    dibuatTanggal: new Date('2024-06-12T10:00:00'),
    status: 'Disetujui',
    tanggalDisetujui: new Date('2024-06-13T14:45:00')
  }
];

export const POPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<POData[]>(mockPO);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = data.filter(item =>
    item.nomorPO.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.judulPO.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.divisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dibuatOleh.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);

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
        <h1 className="text-3xl font-bold text-gray-900">Permintaan Pembelian (PO)</h1>
      </div>

      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Data Pengajuan</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
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
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari Nomor PO, Judul, Divisi, Pembuat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-auto">
              <Button className="w-full md:w-fit bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Ajukan PO
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto border rounded-lg">
            <Table>
            <TableHeader>
            <TableRow className="bg-blue-600 hover:bg-blue-600 text-white">
              <TableHead className="border text-white">No</TableHead>
              <TableHead className="border text-white">Nomor PO</TableHead>
              <TableHead className="border text-white">Judul</TableHead>
              <TableHead className="border text-white">Divisi</TableHead>
              <TableHead className="border text-white">Dibuat Oleh</TableHead>
              <TableHead className="border text-white">Jumlah</TableHead>
              <TableHead className="border text-white">Tanggal Pengajuan</TableHead>
              <TableHead className="border text-white">Status</TableHead>
              <TableHead className="border text-white">Aksi</TableHead>
            </TableRow>
          </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.poNo}>
                    <TableCell className="border border-gray-300">{item.poNo}</TableCell>
                    <TableCell className="border border-gray-300">{item.nomorPO}</TableCell>
                    <TableCell className="border border-gray-300">{item.judulPO}</TableCell>
                    <TableCell className="border border-gray-300">{item.divisi}</TableCell>
                    <TableCell className="border border-gray-300">{item.dibuatOleh}</TableCell>
                    <TableCell className="border border-gray-300">{formatCurrency(item.jumlah)}</TableCell>
                    <TableCell className="border border-gray-300">{formatDateTime(item.dibuatTanggal)}</TableCell>
                    <TableCell className="border border-gray-300">{getStatusBadge(item.status, item.tanggalDisetujui)}</TableCell>
                    <TableCell className="border border-gray-300">
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
