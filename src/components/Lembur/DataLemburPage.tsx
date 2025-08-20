import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Eye, Trash2, ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

interface LemburData {
  no: number;
  idKaryawan: string;
  nama: string;
  divisi: string;
  jabatan: string;
  tanggalLembur: Date;
  jamMulai: string;
  jamSelesai: string;
  alasan: string;
  status: "Menunggu Disetujui" | "Disetujui";
  tanggalPengajuan: Date;
  tanggalDisetujui?: Date;
}

const mockLembur: LemburData[] = [
  {
    no: 1,
    idKaryawan: "EMP003",
    nama: "Budi Santoso",
    divisi: "Finance",
    jabatan: "Staff",
    tanggalLembur: new Date("2024-06-20"),
    jamMulai: "18:00",
    jamSelesai: "21:00",
    alasan: "Laporan akhir bulan",
    tanggalPengajuan: new Date("2024-06-15T14:30:00"),
    status: "Menunggu Disetujui",
  },
  {
    no: 2,
    idKaryawan: "EMP004",
    nama: "Siti Aminah",
    divisi: "IT",
    jabatan: "Programmer",
    tanggalLembur: new Date("2024-06-18"),
    jamMulai: "19:00",
    jamSelesai: "22:00",
    alasan: "Maintenance sistem",
    tanggalPengajuan: new Date("2024-06-14T10:15:00"),
    status: "Disetujui",
    tanggalDisetujui: new Date("2024-06-01T09:30:00"),
  },
];

export const DataLemburPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data] = useState<LemburData[]>(mockLembur);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = data.filter((item) =>
    [item.idKaryawan, item.nama, item.divisi, item.jabatan]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (date: Date) => date.toLocaleDateString("id-ID");

  const formatDateTime = (date: Date) =>
    date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getStatusBadge = (
    status: string,
    tanggalDisetujui?: Date
  ) => {
    const badgeColor =
      status === "Disetujui"
        ? "bg-green-100 text-green-800 hover:bg-green-100"
        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";

    return (
      <div className="flex flex-col items-start">
        <Badge className={badgeColor}>{status}</Badge>
        {status === "Disetujui" && tanggalDisetujui && (
          <span className="text-xs text-gray-500 mt-1">
            {formatDateTime(tanggalDisetujui)}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Lembur</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        </div>
        
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Menunggu Disetujui */}
        <Card className="bg-yellow-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Menunggu Disetujui
            </CardTitle>
            <Clock className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(d => d.status === 'Menunggu Disetujui').length}
            </div>
            <p className="text-xs text-white">Pengajuan </p>
          </CardContent>
        </Card>

        {/* Disetujui */}
        <Card className="bg-green-700 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Pengajuan Disetujui
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(d => d.status === 'Disetujui').length}
            </div>
            <p className="text-xs text-white">Pengajuan</p>
          </CardContent>
        </Card>

        {/* Ditolak */}
        <Card className="bg-red-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Pengajuan Ditolak
            </CardTitle>
            <XCircle className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.filter(d => d.status === 'Ditolak').length}
            </div>
            <p className="text-xs text-white">Pengajuan</p>
          </CardContent>
        </Card>

        {/* Total Pengajuan */}
        <Card className="bg-blue-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Pengajuan Lembur
            </CardTitle>
            <FileText className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{data.length}</div>
            <p className="text-xs text-white">Pengajuan</p>
          </CardContent>
        </Card>
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
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => setItemsPerPage(Number(value))}
                >
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari ID, nama, divisi, atau jabatan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" /> Ajukan Lembur
            </Button>
          </div>

          <div className="overflow-x-auto border rounded-lg">
            <Table className="border border-gray-200">
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600 text-white">
                   <TableHead className="border text-white whitespace-nowrap">No.</TableHead>
                   <TableHead className="border text-white whitespace-nowrap">ID</TableHead>
                   <TableHead className="border text-white whitespace-nowrap">Nama</TableHead>
                   <TableHead className="border text-white whitespace-nowrap">Divisi</TableHead>
                   <TableHead className="border text-white whitespace-nowrap">Jabatan</TableHead>
                   <TableHead className="border text-white whitespace-nowrap">Tanggal Lembur</TableHead>
                   <TableHead className="border text-white whitespace-nowrap">Jam Mulai</TableHead> 
                   <TableHead className="border text-white whitespace-nowrap">Jam Selesai</TableHead> 
                   <TableHead className="border text-white whitespace-nowrap">Alasan Lembur</TableHead>
                    "Alasan Lembur",
                    "Tanggal Pengajuan",
                    "Status",
                    "Aksi",
                  ].map((title, idx) => (
                    <TableHead key={idx} className="text-white text-left border">
                      {title}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.no}>
                    <TableCell className="text-left border whitespace-nowrap">{item.no}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{item.idKaryawan}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{item.nama}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{item.divisi}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{item.jabatan}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{formatDate(item.tanggalLembur)}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{item.jamMulai}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{item.jamSelesai}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{item.alasan}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{formatDateTime(item.tanggalPengajuan)}</TableCell>
                    <TableCell className="text-left border whitespace-nowrap">{getStatusBadge(item.status, item.tanggalDisetujui)}</TableCell>
                    <TableCell className="text-left border">
                      <div className="flex justify-start space-x-2">
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
      <footer className="mt-10 text-xs text-left">
        © 2025 PT Proven Force Indonesia, All Rights Reserved.
      </footer>
    </div>
  );
};