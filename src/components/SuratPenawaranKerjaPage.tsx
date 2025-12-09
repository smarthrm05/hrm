import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Search, Plus, Eye, Trash2 } from 'lucide-react';

interface OfferData {
  no: number;
  noSurat: string;
  nama: string;
  posisi: string;
  gaji: number;
  tunjangan: boolean;
  tanggal: Date;
}

const mockData: OfferData[] = [
  {
    no: 1,
    noSurat: '2/PFI-MPO/INDOLOK/XII/2025',
    nama: 'Fasya Gani',
    posisi: 'Direktur',
    gaji: 5000000,
    tunjangan: true,
    tanggal: new Date('2025-12-09T11:19:00')
  }
];

export default function SuratPenawaranKerjaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(mockData);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = data.filter((item) =>
    item.noSurat.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.posisi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);

  const formatDate = (date: Date) =>
    date.toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Surat Penawaran Kerja</h1>

      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Data Surat Penawaran</CardTitle>
        </CardHeader>
        <CardContent className="p-6">

          {/* Filter & Search */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <Select value={itemsPerPage.toString()} onValueChange={(v) => setItemsPerPage(Number(v))}>
                <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-600">entries</span>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari nomor surat, nama, posisi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 w-full md:w-fit">
              <Plus className="w-4 h-4 mr-2" /> Tambah Surat
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 text-white">
                  <TableHead className="border">No</TableHead>
                  <TableHead className="border">No Surat</TableHead>
                  <TableHead className="border">Nama Karyawan</TableHead>
                  <TableHead className="border">Posisi</TableHead>
                  <TableHead className="border">Gaji Gross</TableHead>
                  <TableHead className="border">Tunjangan</TableHead>
                  <TableHead className="border">Tanggal Pembuatan</TableHead>
                  <TableHead className="border">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((item) => (
                  <TableRow key={item.no}>
                    <TableCell className="border">{item.no}</TableCell>
                    <TableCell className="border whitespace-nowrap">{item.noSurat}</TableCell>
                    <TableCell className="border">{item.nama}</TableCell>
                    <TableCell className="border">{item.posisi}</TableCell>
                    <TableCell className="border">{formatCurrency(item.gaji)}</TableCell>
                    <TableCell className="border">{item.tunjangan ? '✔' : '-'}</TableCell>
                    <TableCell className="border">{formatDate(item.tanggal)}</TableCell>
                    <TableCell className="border">
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white"><Eye className="w-4 h-4" /></Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Menampilkan <strong>{start + 1}</strong> sampai{' '}
              <strong>{Math.min(start + itemsPerPage, filtered.length)}</strong> dari{' '}
              <strong>{filtered.length}</strong> data
            </div>

            <div className="flex gap-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="bg-blue-500 text-white"
              >
                Sebelumnya
              </Button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={
                    currentPage === i + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-blue-600 border border-blue-600'
                  }
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="bg-blue-500 text-white"
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
