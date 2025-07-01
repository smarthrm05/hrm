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
  Eye,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Interface data request absen
interface RequestAbsenData {
  no: number;
  tanggal: Date;
  idKaryawan: string;
  divisi: string;
  jabatan: string;
  nama: string;
  absenMasuk: string;
  lokasiAbsen: string;
  detailLokasi: string; // Format: "lat,lng"
  shift: string;
  catatan: string;
  status:
    | "Menunggu Disetujui"
    | `Disetujui (Tanggal : ${string}, ${string})`
    | `Ditolak (Tanggal : ${string}, ${string})`;
}

// Mock Data
const mockRequestAbsen: RequestAbsenData[] = [
  {
    no: 1,
    tanggal: new Date("2024-06-20"),
    idKaryawan: "EMP003",
    nama: "Budi Santoso",
    divisi: "Finance",
    jabatan: "Staff",
    absenMasuk: "08:10",
    lokasiAbsen: "Kantor Pusat",
    detailLokasi: "-6.175392, 106.827153", // Jakarta
    shift: "Shift 1",
    catatan: "Terlambat karena kemacetan",
    status: "Menunggu Disetujui",
  },
  {
    no: 2,
    tanggal: new Date("2024-06-18"),
    idKaryawan: "EMP004",
    nama: "Siti Aminah",
    divisi: "IT",
    jabatan: "Programmer",
    absenMasuk: "08:00",
    lokasiAbsen: "Remote",
    detailLokasi: "-6.914744, 107.609810", // Bandung
    shift: "Shift 1",
    catatan: "Hadir tepat waktu",
    status: "Disetujui (Tanggal : 22/05/2025, 18:00)",
  },
  {
    no: 3,
    tanggal: new Date("2024-06-19"),
    idKaryawan: "EMP005",
    nama: "Rina Sari",
    divisi: "HR",
    jabatan: "Admin",
    absenMasuk: "08:30",
    lokasiAbsen: "Kantor Cabang",
    detailLokasi: "-7.7956, 110.3687", // Yogyakarta
    shift: "Shift 1",
    catatan: "Terlambat karena sakit",
    status: "Ditolak (Tanggal : 23/05/2025, 16:00)",
  },
];

export const RequestAbsenPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data] = useState<RequestAbsenData[]>(mockRequestAbsen);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  // Filter data
  const filteredData = data.filter((item) =>
    [item.idKaryawan, item.nama, item.divisi, item.jabatan]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Helper functions
  const formatDate = (date: Date) => date.toLocaleDateString("id-ID");
  const getStatusBadge = (status: string) => {
    let badgeColor = "";
    if (status.includes("Menunggu")) {
      badgeColor = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    } else if (status.includes("Disetujui")) {
      badgeColor = "bg-green-100 text-green-800 hover:bg-green-100";
    } else if (status.includes("Ditolak")) {
      badgeColor = "bg-red-100 text-red-800 hover:bg-red-100";
    }
    return <Badge className={badgeColor}>{status}</Badge>;
  };

  const openMapModal = (location: string) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Request Absen</h1>

      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Data Request Absen</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Header Controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Show</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
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
          </div>

          {/* Table */}
          <div className="overflow-x-auto border rounded-lg">
            <Table className="border border-gray-200">
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  {[
                    "No.",
                    "Tanggal",
                    "ID Karyawan",
                    "Divisi",
                    "Jabatan",
                    "Nama Karyawan",
                    "Absen Masuk",
                    "Lokasi Absen",
                    "Detail Lokasi",
                    "Shift",
                    "Catatan",
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
                    <TableCell className="text-left border">{item.no}</TableCell>
                    <TableCell className="text-left border">{formatDate(item.tanggal)}</TableCell>
                    <TableCell className="text-left border">{item.idKaryawan}</TableCell>
                    <TableCell className="text-left border">{item.divisi}</TableCell>
                    <TableCell className="text-left border">{item.jabatan}</TableCell>
                    <TableCell className="text-left border">{item.nama}</TableCell>
                    <TableCell className="text-left border">{item.absenMasuk}</TableCell>
                    <TableCell className="text-left border">{item.lokasiAbsen}</TableCell>
                    <TableCell className="text-left border">{item.detailLokasi}</TableCell>
                    <TableCell className="text-left border">{item.shift}</TableCell>
                    <TableCell className="text-left border">{item.catatan}</TableCell>
                    <TableCell className="text-left border">
                      {getStatusBadge(item.status)}
                    </TableCell>
                    <TableCell className="text-left border">
                      <div className="flex justify-start space-x-2">
                        <Button
                          size="sm"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => openMapModal(item.detailLokasi)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-green-600 text-white hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-red-600 text-white hover:bg-red-700"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
              {filteredData.length} entries
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
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal Google Maps */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Detail Lokasi Absen</h2>
            <div className="mb-4">
              <iframe
                width="100%"
                height="400"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${selectedLocation}&z=15&output=embed`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};