import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Edit, Trash2, Plus, Search, Users } from 'lucide-react';

const dummyBagian = [
  { id: 1, nama: 'IT Support', divisi: 'Divisi IT' },
  { id: 2, nama: 'IT Helpdesk', divisi: 'Divisi IT' },
  { id: 3, nama: 'System Analyst', divisi: 'Divisi IT' },
];

const listDivisi = [
  { id: 1, nama: "Divisi IT" },
  { id: 2, nama: "Divisi HR" },
  { id: 3, nama: "Divisi Finance" },
];

export const BagianPage = () => {
  const [bagian, setBagian] = useState(dummyBagian);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNamaBagian, setNewNamaBagian] = useState('');
  const [selectedDivisi, setSelectedDivisi] = useState('');

  const filteredData = bagian.filter((item) =>
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
      <Card className="border border-[#E2E8F0] shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-[#0F2A4D] font-semibold">
            <Users className="h-5 w-5 mr-2" />
            Data Bagian
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* Controls */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Show</span>
              <Select value={showEntries} onValueChange={setShowEntries}>
                <SelectTrigger className="w-20 border-[#E2E8F0]">
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
                  placeholder="Cari bagian..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 border-[#E2E8F0] focus:border-[#1E4F85]"
                />
              </div>

              <Button
                className="bg-[#1E4F85] hover:bg-[#163E6B] text-white shadow-sm"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Bagian
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
            <Table className="w-full border-collapse">
              <TableHeader>
                <TableRow className="bg-[#0F2A4D] text-white">
                  <TableHead className="border border-[#1E3A5F] text-white">No.</TableHead>
                  <TableHead className="border border-[#1E3A5F] text-white">Nama Bagian</TableHead>
                  <TableHead className="border border-[#1E3A5F] text-white">Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.map((item, idx) => (
                  <TableRow key={item.id} className="hover:bg-[#F5F9FF] transition">
                    <TableCell className="border border-[#E2E8F0]">
                      {(currentPage - 1) * entriesPerPage + idx + 1}
                    </TableCell>

                    <TableCell className="border border-[#E2E8F0]">
                      {item.nama}
                    </TableCell>

                    <TableCell className="border border-[#E2E8F0]">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-[#1E4F85] text-white hover:bg-[#163E6B] shadow-sm"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          size="sm"
                          className="bg-red-600 text-white hover:bg-red-700 shadow-sm"
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
                className="bg-[#1E4F85] text-white hover:bg-[#163E6B]"
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
                      : 'bg-white text-[#1E4F85] border border-[#1E4F85]/30 hover:bg-[#EAF2FB]'
                  }
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="bg-[#1E4F85] text-white hover:bg-[#163E6B]"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MODAL */}
      <Dialog.Root open={showCreateModal} onOpenChange={setShowCreateModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />

          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-96 rounded-xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-[#0F2A4D]">
                Tambah Bagian
              </Dialog.Title>

              <Dialog.Close asChild>
                <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                  <Cross2Icon />
                </Button>
              </Dialog.Close>
            </div>

            <div className="space-y-3">
              <Input
                placeholder="Nama bagian"
                value={newNamaBagian}
                onChange={(e) => setNewNamaBagian(e.target.value)}
                className="focus:border-[#1E4F85]"
              />

              <Select value={selectedDivisi} onValueChange={setSelectedDivisi}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih divisi" />
                </SelectTrigger>
                <SelectContent>
                  {listDivisi.map((div) => (
                    <SelectItem key={div.id} value={div.nama}>
                      {div.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <Dialog.Close asChild>
                <Button variant="outline">Batal</Button>
              </Dialog.Close>

              <Dialog.Close asChild>
                <Button
                  className="bg-[#1E4F85] text-white hover:bg-[#163E6B]"
                  onClick={() => {
                    const newItem = {
                      id: bagian.length + 1,
                      nama: newNamaBagian,
                      divisi: selectedDivisi,
                    };
                    setBagian([...bagian, newItem]);
                    setNewNamaBagian('');
                    setSelectedDivisi('');
                  }}
                >
                  Simpan
                </Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};