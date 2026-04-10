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

  const filteredData = divisiData.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const entriesPerPage = parseInt(showEntries);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="p-6 space-y-6 bg-[#F8FAFC] min-h-screen">
      <Card className="border border-[#D1D5DB] shadow-sm bg-white">
        
        {/* Header */}
        <CardHeader>
          <CardTitle className="flex items-center text-[#0F2A4D] font-semibold">
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
                <SelectTrigger className="w-20 border-[#D1D5DB]">
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari divisi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 border-[#D1D5DB]"
                />
              </div>

              <Button className="bg-[#1E4F85] text-white hover:bg-[#1E4F85]">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Divisi
              </Button>

            </div>
          </div>

          {/* Table */}
          <div className="border border-[#D1D5DB] rounded-lg overflow-hidden bg-white">
            <Table className="w-full border-collapse">
              
              <TableHeader>
                {/* Header dengan warna biru tua*/}
                <TableRow className="bg-[#0F2A4D] text-white">
                  <TableHead className="border border-white/20 text-white">No.</TableHead>
                  <TableHead className="border border-white/20 text-white">Nama Divisi</TableHead>
                  <TableHead className="border border-white/20 text-white">Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.map((item, idx) => (
                  <TableRow key={item.id} className="hover:bg-transparent">
                    
                    <TableCell className="border border-gray-300 bg-white text-center">
                      {(currentPage - 1) * entriesPerPage + idx + 1}
                    </TableCell>

                    <TableCell className="border border-gray-300 bg-white">
                      {item.nama}
                    </TableCell>

                    <TableCell className="border border-gray-300 bg-white">
                      <div className="flex gap-2 justify-center">
                        
                        <Button
                          size="sm"
                          className="bg-[#1E4F85] text-white hover:bg-[#1E4F85]"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          size="sm"
                          className="bg-red-600 text-white hover:bg-red-600"
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

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            
            <div className="text-sm text-gray-500">
              Menampilkan{' '}
              <strong>
                {Math.max((currentPage - 1) * entriesPerPage + 1, 1)} -{' '}
                {Math.min(currentPage * entriesPerPage, filteredData.length)}
              </strong>{' '}
              dari <strong>{filteredData.length}</strong>
            </div>

            <div className="flex gap-2">
              
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="bg-[#1E4F85] text-white hover:bg-[#1E4F85]"
              >
                Prev
              </Button>

              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={
                    currentPage === i + 1
                      ? 'bg-[#1E4F85] text-white'
                      : 'bg-white text-[#1E4F85] border border-[#1E4F85]'
                  }
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="bg-[#1E4F85] text-white hover:bg-[#1E4F85]"
              >
                Next
              </Button>

            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};