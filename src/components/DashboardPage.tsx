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
import { useAuth } from "@/contexts/AuthContext";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "Selamat Pagi";
  if (hour < 15) return "Selamat Siang";
  if (hour < 18) return "Selamat Sore";
  return "Selamat Malam";
}

function formatTanggalIndonesia(date: Date) {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { username } = useAuth();
  const greeting = getGreeting();
  const today = formatTanggalIndonesia(new Date());

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
    { title: "Karyawan", value: "10", icon: Users },
    { title: "Divisi", value: "3", icon: Building2 },
    { title: "Admin", value: "1", icon: ShieldCheck },
    { title: "Pola Kerja", value: "5", icon: Briefcase },
    { title: "Lokasi Kehadiran", value: "2", icon: MapPin },
    { title: "Presensi", value: "470", icon: ClipboardList },
    { title: "Izin", value: "3", icon: Coffee },
    { title: "Cuti", value: "6", icon: CalendarCheck },
  ];

  return (
    <main className="flex-1 overflow-auto pt-[80px] pb-6 px-4 md:px-6">

      {/* GREETING SECTION */}
      <div className="bg-white border rounded-md p-4 mb-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">
          {greeting}, {username || "Pengguna"}
        </h2>
        <p className="text-sm text-gray-500">
          Selamat Beraktivitas. {today}
        </p>
      </div>

      {/* TRIAL INFO */}
      <div className="bg-white border rounded-md p-4 flex justify-between items-center shadow-sm mb-6">
        <p className="text-sm">
          Selamat mencoba masa <strong>Trial 14 hari</strong>, jika ada pertanyaan{" "}
          <a href="#" className="text-blue-600 underline">kami siap membantu</a>.
        </p>
        <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-4">
          Upgrade Paket Langganan
        </Button>
      </div>

      {/* WELCOME + CALENDAR */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mb-6">
        <Card className="p-6">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">Halo Jefri 👋</h2>
            <p className="text-sm text-gray-600">
              Agendakan jadwal meeting dan konsultasi gratis melalui Zoom Meeting selama 45 menit
              untuk mendapatkan penjelasan fitur dan harga terbaik.
            </p>
            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm">
              JADWALKAN SEKARANG
            </Button>
          </div>
        </Card>

        <div className="bg-white border rounded-md p-4 shadow-sm">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md [&_.rdp-day_selected]:bg-blue-500 [&_.rdp-day_selected]:text-white [&_.rdp-day_today]:border-blue-500"
          />
          <p className="text-xs mt-2 text-center text-red-500 italic">
            * Tanggal merah = Libur Nasional / Cuti Bersama
          </p>
        </div>
      </div>

      {/* FILTER DIVISI + TANGGAL */}
      <div className="flex justify-between items-center gap-4 mb-6">
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
        <span className="text-sm text-muted-foreground">{today}</span>
      </div>

      {/* TOP STATS */}
      <Card className="p-4 mb-6">
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 text-center gap-4">
          {topStats.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                {item.label}
              </p>
              <p className="text-lg font-bold text-indigo-700">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryStats.map((item) => (
          <Card key={item.title} className="flex items-center gap-4 p-4">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{item.title}</p>
              <p className="text-lg font-bold">{item.value}</p>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
