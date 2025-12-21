import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2, Plus, Search, Users } from 'lucide-react';

const divisiData = [
  { id: 1, nama: 'Divisi SDM' },
  { id: 2, nama: 'Divisi Keuangan' },
  { id: 3, nama: 'Divisi Operasional' },
];

export const DivisiPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data
  const filteredData = divisiData.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const entriesPerPage = parseInt(showEntries);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="p-6 space-y-6">
      {/* Card dengan latar belakang putih */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Data Divisi
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Controls */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Show</span>
              <Select value={showEntries} onValueChange={setShowEntries}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-600">entries</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari divisi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Divisi
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table className="w-full border border-gray-300 border-collapse">
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600 text-white">
                  <TableHead className="text-white border border-gray-200">No.</TableHead>
                  <TableHead className="text-white border border-gray-200">Nama Divisi</TableHead>
                  <TableHead className="text-white border border-gray-200">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, idx) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="border border-gray-200">
                      {(currentPage - 1) * entriesPerPage + idx + 1}
                    </TableCell>
                    <TableCell className="border border-gray-200">{item.nama}</TableCell>
                    <TableCell className="border border-gray-200">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-blue-400 text-white hover:bg-blue-500"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-red-600 text-white hover:bg-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer / Pagination */}
          <div className="flex justify-between items-center mt-4">
            {/* Informasi pagination */}
            <div className="text-sm text-gray-500">
              Menampilkan{' '}
              <strong>
                {Math.max((currentPage - 1) * entriesPerPage + 1, 1)} sampai{' '}
                {Math.min(currentPage * entriesPerPage, filteredData.length)}
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