import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Eye,
  Trash2,
  Send,
  Pencil,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface KontrakKerjaData {
  no: number;
  nomorSurat: string;
  nama: string;
  idKaryawan: string;
  tanggalMulai: Date;
  tanggalSelesai: Date;
  dibuatTanggal: Date;
  dibuatOleh: string;
  status: "Menunggu Disetujui" | "Disetujui" | "Telah Ditandatangani";
  tanggalStatus?: Date;
}

const mockKontrak: KontrakKerjaData[] = [
  {
    no: 1,
    nomorSurat: "SK-001/HRD/2024",
    nama: "Budi Santoso",
    idKaryawan: "EMP001",
    tanggalMulai: new Date("2024-07-01"),
    tanggalSelesai: new Date("2025-06-30"),
    dibuatTanggal: new Date("2024-06-15T09:00:00"),
    dibuatOleh: "Admin HR",
    status: "Disetujui",
    tanggalStatus: new Date("2024-06-20T14:00:00"),
  },
  {
    no: 2,
    nomorSurat: "SK-002/HRD/2024",
    nama: "Siti Aminah",
    idKaryawan: "EMP002",
    tanggalMulai: new Date("2024-07-15"),
    tanggalSelesai: new Date("2025-07-14"),
    dibuatTanggal: new Date("2024-06-25T10:30:00"),
    dibuatOleh: "Admin HR",
    status: "Menunggu Disetujui",
  },
];

export const KontrakKerjaPage = () => {
  const [search, setSearch] = useState("");
  const [data] = useState<KontrakKerjaData[]>(mockKontrak);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(10);

  const filteredData = data.filter((item) =>
    [item.nomorSurat, item.nama, item.idKaryawan]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / show);
  const startIndex = (currentPage - 1) * show;
  const paginatedData = filteredData.slice(startIndex, startIndex + show);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const formatDateTime = (date: Date) =>
    date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Kontrak Kerja</h1>
      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Data Kontrak</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
            <div className="flex gap-4 items-center">
              <span className="text-sm text-muted-foreground">Show</span>
              <Select value={show.toString()} onValueChange={(v) => setShow(Number(v))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">entries</span>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari nama, ID, atau surat..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <FileText className="w-4 h-4 mr-2" /> Tambah Kontrak
            </Button>
          </div>

          <div className="overflow-x-auto border rounded-lg">
            <Table className="border border-gray-200">
              <TableHeader>
                <TableRow className="bg-blue-600 text-white">
                  {[
                    "No",
                    "Nomor Surat",
                    "Nama",
                    "ID Karyawan",
                    "Tanggal Mulai",
                    "Tanggal Selesai",
                    "Dibuat Tanggal",
                    "Dibuat Oleh",
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
                    <TableCell>{item.no}</TableCell>
                    <TableCell>{item.nomorSurat}</TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>{item.idKaryawan}</TableCell>
                    <TableCell>{formatDate(item.tanggalMulai)}</TableCell>
                    <TableCell>{formatDate(item.tanggalSelesai)}</TableCell>
                    <TableCell>{formatDateTime(item.dibuatTanggal)}</TableCell>
                    <TableCell>{item.dibuatOleh}</TableCell>
                    <TableCell>
                      <div className="flex flex-col items-start">
                        <Badge
                          className={
                            item.status === "Disetujui"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Menunggu Disetujui"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        >
                          {item.status}
                        </Badge>
                        {item.tanggalStatus && (
                          <span className="text-xs text-gray-500 mt-1">
                            {item.status === "Disetujui"
                              ? `Disetujui: ${formatDateTime(item.tanggalStatus)}`
                              : item.status === "Telah Ditandatangani"
                              ? `Ditandatangani: ${formatDateTime(item.tanggalStatus)}`
                              : null}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-blue-600">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-green-600">
                          <Send className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
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
              Menampilkan {startIndex + 1} hingga {Math.min(startIndex + show, filteredData.length)} dari {filteredData.length} data
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm">
                Halaman {currentPage} dari {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
