import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const TabRiwayatKontrakKerja = ({ data }: any) => {
  // Dummy data riwayat kontrak
  const kontrakHistory = [
    {
      no: 1,
      tanggalKontrak: '15/03/2021',
      selesaiKontrak: '15/03/2022',
      durasi: '1 Tahun',
      terakhirDiperbaharui: '15/03/2021',
      status: 'Selesai',
    },
    {
      no: 2,
      tanggalKontrak: '15/03/2022',
      selesaiKontrak: '15/03/2023',
      durasi: '1 Tahun',
      terakhirDiperbaharui: '10/03/2022',
      status: 'Selesai',
    },
    {
      no: 3,
      tanggalKontrak: '15/03/2023',
      selesaiKontrak: '15/03/2024',
      durasi: '1 Tahun',
      terakhirDiperbaharui: '08/03/2023',
      status: 'Selesai',
    },
    {
      no: 4,
      tanggalKontrak: '15/03/2024',
      selesaiKontrak: '15/03/2027',
      durasi: '3 Tahun',
      terakhirDiperbaharui: '10/03/2024',
      status: 'Aktif',
    },
  ];

  return (
    <Card className="bg-white">
      <CardContent className="p-6 bg-white">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-16 text-center">No.</TableHead>
                <TableHead>Tanggal Kontrak Kerja</TableHead>
                <TableHead>Selesai Kontrak Kerja</TableHead>
                <TableHead>Durasi Kontrak</TableHead>
                <TableHead>Terakhir Diperbaharui</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kontrakHistory.map((kontrak) => (
                <TableRow key={kontrak.no} className="hover:bg-gray-50">
                  <TableCell className="text-center font-medium">
                    {kontrak.no}
                  </TableCell>
                  <TableCell>{kontrak.tanggalKontrak}</TableCell>
                  <TableCell>{kontrak.selesaiKontrak}</TableCell>
                  <TableCell>{kontrak.durasi}</TableCell>
                  <TableCell>{kontrak.terakhirDiperbaharui}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={kontrak.status === 'Aktif' ? 'default' : 'secondary'}
                      className={
                        kontrak.status === 'Aktif'
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gray-500 hover:bg-gray-600'
                      }
                    >
                      {kontrak.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Total Riwayat Kontrak: {kontrakHistory.length} kali
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Kontrak aktif saat ini berlaku hingga {kontrakHistory.find(k => k.status === 'Aktif')?.selesaiKontrak}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TabRiwayatKontrakKerja;