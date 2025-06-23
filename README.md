# HRIS System

Sistem Human Resource Information System (HRIS) yang dibangun dengan React, TypeScript, dan Tailwind CSS.

## Fitur

- **Login System**: Autentikasi dengan username/password dan opsi "Ingat Saya"
- **Dashboard**: Ringkasan statistik karyawan dengan visualisasi data
- **Sidebar Navigation**: Menu lengkap untuk semua fitur HRIS
- **Responsive Design**: Tampilan yang optimal di semua perangkat
- **Modern UI**: Desain elegan dan mewah dengan Tailwind CSS

## Menu Utama

- Dashboard (Ringkasan)
- Kehadiran
- Request Absen
- Cuti
- Izin
- Lembur
- Penggajian
- Jadwal Shift
- Pinjaman
- Reimbursement
- Surat Peringatan
- Paklaring
- Kontrak Kerja
- KPI
- Pengaturan Akun

## Dashboard Statistics

- Total Karyawan
- Total Cuti
- Total Lembur
- Total Izin
- Total Gaji Dibayar
- Retensi Rate
- Turn Over Rate
- Domisili Karyawan

## Teknologi

- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui Components
- Recharts untuk visualisasi data
- Lucide React untuk ikon

## Instalasi

```bash
npm install
npm run dev
```

## Git Repository Issue

Jika Anda mengalami error "Repository not found" saat push ke GitHub:

1. **Periksa URL Repository**:
   ```bash
   git remote -v
   ```

2. **Update URL Repository** (jika perlu):
   ```bash
   git remote set-url origin https://github.com/username/repository-name.git
   ```

3. **Buat Repository Baru di GitHub** jika belum ada

4. **Push dengan branch yang benar**:
   ```bash
   git push -u origin main
   ```

## Solusi Cepat Git Error

Untuk mengatasi error "Repository not found":

```bash
# Hapus remote yang ada
git remote remove origin

# Tambah remote baru dengan URL yang benar
git remote add origin https://github.com/your-username/your-repo-name.git

# Push ke repository baru
git push -u origin main
```

Pastikan repository sudah dibuat di GitHub terlebih dahulu sebelum melakukan push.