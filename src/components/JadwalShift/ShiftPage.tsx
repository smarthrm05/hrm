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
  SelectValue
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Plus, Search, Clock } from 'lucide-react';

const shiftData = [
  { id: 1, keterangan: 'Shift Pagi', jam: '08:00 - 15:00' },
  { id: 2, keterangan: 'Shift Siang', jam: '15:00 - 22:00' },
  { id: 3, keterangan: 'Shift Malam', jam: '22:00 - 06:00' }
];

export const ShiftPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState('10');

  const filteredData = shiftData.filter((item) =>
    item.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Data Shift
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Controls */}
          <div className="flex justify-between items-center">
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
                  placeholder="Cari shift..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Shift
              </Button>
            </div>
          </div>

         {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table className="w-full border border-gray-300">
              <TableHeader>
                <TableRow className="bg-blue-600 text-white">
                  <TableHead className="border border-gray-300 text-white font-semibold">No.</TableHead>
                  <TableHead className="border border-gray-300 text-white font-semibold">Keterangan Shift</TableHead>
                  <TableHead className="border border-gray-300 text-white font-semibold">Jam</TableHead>
                  <TableHead className="border border-gray-300 text-white font-semibold">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, idx) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="border border-gray-200">{idx + 1}</TableCell>
                    <TableCell className="border border-gray-200">{item.keterangan}</TableCell>
                    <TableCell className="border border-gray-200">{item.jam}</TableCell>
                    <TableCell className="border border-gray-200">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Showing 1 to {filteredData.length} of {filteredData.length} entries
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
