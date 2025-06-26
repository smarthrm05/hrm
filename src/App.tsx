import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import { HRISApp } from "@/components/HRISApp";
import NotFound from "./pages/NotFound";

// ✅ Import semua halaman
import { ShiftPage } from "./components/jadwalshift/ShiftPage";
import { GroupPage } from "./components/jadwalshift/GroupPage";
import { JadwalShiftPage } from "./components/jadwalshift/JadwalShiftPage";
import { KehadiranPage } from "./components/kehadiran/KehadiranPage";
import { DataKehadiranPage } from "./components/kehadiran/DataKehadiranPage";
import { CutiPage } from "./components/CutiPage";
import { PinjamanPage } from "./components/PinjamanPage";
import { ReimbursementPage } from "./components/ReimbursementPage";
import { LemburPage } from "./components/LemburPage";
import { IzinPage } from "./components/IzinPage";
import { POPage } from "./components/POPage";
import { PengunduranDiriPage } from './components/PengunduranDiriPage';
import { KeteranganBekerjaPage } from './components/KeteranganBekerjaPage';
import { PaklaringPage } from './components/PaklaringPage';
import { RegisterPage } from "./components/RegisterPage";
import { LoginForm } from "./components/LoginForm";
import { SuratPeringatanPage } from "./components/SuratPeringatanPage";
import { KelolaKaryawanPage } from "./components/KelolaKaryawan/KelolaKaryawanPage";
import { DataKaryawanPage } from "./components/KelolaKaryawan/DataKaryawanPage";


// ✅ Auth
import { AuthProvider } from "@/contexts/AuthContext";
import { PrivateRoute } from "@/components/PrivateRoute";


const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>

              {/* ✅ Halaman bebas akses */}
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginForm />} />

              {/* ✅ Semua halaman setelah login (dilindungi oleh PrivateRoute) */}
              <Route path="/" element={<PrivateRoute />}>
                <Route path="" element={<HRISApp />}>
                  <Route index element={<div>Selamat datang di Dashboard</div>} />
                  <Route path="dashboard" element={<div>Selamat datang di Dashboard</div>} />
                  <Route path="kehadiran-page" element={<KehadiranPage />} />
                  <Route path="data-kehadiran" element={<DataKehadiranPage />} />
                  <Route path="kelola-karyawan" element={<KelolaKaryawanPage />} />
                  <Route path="data-karyawan" element={<DataKaryawanPage />} />
                  <Route path="cuti" element={<CutiPage />} />
                  <Route path="izin" element={<IzinPage />} />
                  <Route path="lembur" element={<LemburPage />} />
                  <Route path="shift" element={<ShiftPage />} />
                  <Route path="group" element={<GroupPage />} />
                  <Route path="jadwal-shift" element={<JadwalShiftPage />} />
                  <Route path="pinjaman" element={<PinjamanPage />} />
                  <Route path="reimbursement" element={<ReimbursementPage />} />
                  <Route path="po" element={<POPage />} />
                  <Route path="pengunduran-diri" element={<PengunduranDiriPage />} />
                  <Route path="keterangan-bekerja" element={<KeteranganBekerjaPage />} />
                  <Route path="paklaring" element={<PaklaringPage />} />
                  <Route path="surat-peringatan" element={<SuratPeringatanPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Route>

            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
