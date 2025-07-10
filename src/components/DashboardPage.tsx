import { useState } from "react";
import {
  CalendarCheck,
  ClipboardList,
  Coffee,
  MapPin,
  ShieldCheck,
  Briefcase,
  Users,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";

export const DashboardPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const topStats = [
    { label: "Total Karyawan", value: "10" },
    { label: "Hari Kerja", value: "5" },
    { label: "Shift", value: "5" },
    { label: "Tepat Waktu", value: "0" },
    { label: "Terlambat", value: "0" },
    { label: "Tidak/Belum Masuk", value: "10" },
    { label: "Izin", value: "0" },
    { label: "Cuti", value: "0" },
    { label: "Libur", value: "0" },
  ];

  const summaryStats = [
    { title: "Karyawan", value: "10", icon: Users, color: "indigo" },
    { title: "Divisi", value: "3", icon: Building2, color: "yellow" },
    { title: "Admin", value: "1", icon: ShieldCheck, color: "green" },
    { title: "Pola Kerja", value: "5", icon: Briefcase, color: "orange" },
    { title: "Lokasi Kehadiran", value: "2", icon: MapPin, color: "red" },
    { title: "Presensi", value: "470", icon: ClipboardList, color: "blue" },
    { title: "Izin", value: "3", icon: Coffee, color: "amber" },
    { title: "Cuti", value: "6", icon: CalendarCheck, color: "purple" },
  ];

  return (
    <div className="bg-[#f9fafc] min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dasbor, Kementerian</h1>
        <div className="flex items-center gap-4">
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Jadwalkan Demo
          </Button>
          <span className="text-sm font-medium">Halo, Jefri</span>
        </div>
      </div>

      {/* Trial Info */}
      <div className="bg-white border rounded-md p-4 flex justify-between items-center">
        <p className="text-sm">
          Selamat mencoba masa <strong>Trial 14 hari</strong>, jika ada pertanyaan{' '}
          <a href="#" className="text-blue-600 underline">
            kami siap membantu
          </a>
          .
        </p>
        <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold">
          Upgrade Paket Langganan
        </Button>
      </div>

      {/* Welcome + Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Halo Jefri 👋</h3>
          <p className="text-sm text-gray-600">
            Agendakan jadwal meeting dan konsultasi gratis melalui Zoom selama 45 menit
            untuk mendapatkan penjelasan fitur dan harga terbaik.
          </p>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
            JADWALKAN SEKARANG
          </Button>
        </Card>
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border bg-white"
          />
          <p className="text-xs mt-2 text-center text-red-500 italic">
            * Tanggal merah = Libur Nasional / Cuti Bersama
          </p>
        </Card>
      </div>

      {/* Filter + Tanggal */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <Select>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="--Divisi--" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua">Semua</SelectItem>
            <SelectItem value="hrd">HRD</SelectItem>
            <SelectItem value="it">IT</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">Kamis, 10 Juli 2025</span>
      </div>

      {/* Top Stats */}
      <Card className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {topStats.map((item) => (
            <div key={item.label}>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-xl font-bold text-indigo-700">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {summaryStats.map((item) => (
          <Card key={item.title} className="flex items-center gap-4 p-4">
            <div
              className={clsx(
                "p-3 rounded-full",
                `bg-${item.color}-100`,
                `text-${item.color}-600`
              )}
            >
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{item.title}</p>
              <p className="text-lg font-bold">{item.value}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;