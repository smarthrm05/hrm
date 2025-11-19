import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

// Komponen Breadcrumb
const Breadcrumb = () => {
  return (
    <div className="text-sm text-blue-600 mb-4">
      <span>Home</span>
      <span className="mx-2">/</span>
      <span>Karyawan</span>
      <span className="mx-2">/</span>
      <span className="font-semibold">Tambah</span>
    </div>
  );
};

// Komponen untuk upload file (versi rapi)
const FileUpload = ({ label, onFileChange }: { label: string, onFileChange: (file: File | null) => void }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <Input type="file" onChange={handleFileChange} className="hidden" id={`file-${label}`} />
        <Button variant="outline" asChild size="sm">
          <label htmlFor={`file-${label}`}>Choose File</label>
        </Button>
        <span className="text-xs text-gray-500">No file chosen</span>
      </div>
    </div>
  );
};

// Komponen utama untuk halaman tambah karyawan
export const TambahKaryawanPage = () => {
  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    // Data Pribadi
    namaKaryawan: '',
    nomorTelepon: '',
    tempatLahir: '',
    tanggalLahir: new Date(),
    jenisKelamin: '',
    pendidikan: '',
    alamatKTP: '',
    alamatDomisili: '',
    usia: '',
    agama: '',
    namaSuamiIstri: '',
    namaAnak: '',
    jumlahAnak: '',
    namaBapak: '',
    namaIbu: '',
    
    // Data Kepegawaian
    idKaryawan: '',
    divisi: '',
    jabatan: '',
    lokasiKerja: '',
    tanggalBergabung: new Date(),
    tanggalKontrak: new Date(),
    selesaiKontrak: new Date(),
    grup: '',
    bagian: '',
    golonganKaryawan: '',
    statusMarital: '',
    email: '',
    password: '',
    referensi: '',
    noSIO: '',
    
    // Dokumen Pendukung
    ktpFile: null as File | null,
    nomorKTP: '',
    kartuKeluargaFile: null as File | null,
    nomorKartuKeluarga: '',
    npwpFile: null as File | null,
    nomorNPWP: '',
    kpjFile: null as File | null,
    nomorKPJ: '',
    jknFile: null as File | null,
    nomorJKN: '',
    cvFile: null as File | null,
    lainnyaFile: null as File | null,
    
    // Detail Akun Bank
    namaPemilikRekening: '',
    nomorRekening: '',
    namaBank: '',
    kodeBank: '',
    lokasiCabang: '',
    
    // Kontak Darurat
    namaLengkapKontak: '',
    hubungan: '',
    nomorTeleponKontak: '',
    alamatKontak: '',
    
    // Identitas Kendaraan
    simFile: null as File | null,
    nomorSIM: '',
    stnkFile: null as File | null,
    nomorSTNK: '',
    gambarKendaraanDepanFile: null as File | null,
    gambarKendaraanBelakangFile: null as File | null,
    gambarKendaraanSampingFile: null as File | null,
  });

  // Handler untuk perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler untuk perubahan date picker
  const handleDateChange = (fieldName: string, date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, [fieldName]: date }));
    }
  };

  // Handler untuk upload file
  const handleFileUpload = (fieldName: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [fieldName]: file }));
  };

  // Handler untuk submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Data yang akan disimpan:', formData);
    alert('Data karyawan berhasil disimpan!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Judul Halaman */}
      <h1 className="text-3xl font-bold text-gray-900">Tambah Karyawan Baru</h1>

      <form onSubmit={handleSubmit}>
        {/* Profile Section */}
        <Card>
          <CardHeader className="bg-blue-500 text-white">
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z M12 14a7 7 0 017 7h0a7 7 0 01-7-7z" />
                </svg>
              </div>
              <div>
                <Label>File Foto Profile</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input type="file" accept="image/*" className="hidden" id="profile-photo" />
                  <Button variant="outline" asChild size="sm">
                    <label htmlFor="profile-photo">Choose File</label>
                  </Button>
                  <span className="text-xs text-gray-500">No file chosen</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Pribadi & Data Kepegawaian */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Data Pribadi */}
          <Card>
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle>Data Pribadi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nama Karyawan*</Label>
                  <Input 
                    name="namaKaryawan" 
                    value={formData.namaKaryawan} 
                    onChange={handleChange} 
                    placeholder="Nama Karyawan" 
                  />
                </div>
                <div>
                  <Label>Nomor Telepon*</Label>
                  <Input 
                    name="nomorTelepon" 
                    value={formData.nomorTelepon} 
                    onChange={handleChange} 
                    placeholder="08xxx" 
                  />
                </div>
                <div>
                  <Label>Tempat Lahir*</Label>
                  <Input 
                    name="tempatLahir" 
                    value={formData.tempatLahir} 
                    onChange={handleChange} 
                    placeholder="Tempat Lahir" 
                  />
                </div>
                <div>
                  <Label>Tanggal Lahir*</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.tanggalLahir && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.tanggalLahir ? format(formData.tanggalLahir, "dd/MM/yyyy") : <span>dd/mm/yyyy</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.tanggalLahir}
                        onSelect={(date) => handleDateChange("tanggalLahir", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Jenis Kelamin*</Label>
                  <Select 
                    name="jenisKelamin" 
                    value={formData.jenisKelamin} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, jenisKelamin: value }))} 
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Pilih Jenis Kelamin --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="Perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Pendidikan*</Label>
                  <Select 
                    name="pendidikan" 
                    value={formData.pendidikan} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, pendidikan: value }))} 
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Pilih Pendidikan --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SD">SD</SelectItem>
                      <SelectItem value="SMP">SMP</SelectItem>
                      <SelectItem value="SMA">SMA</SelectItem>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                      <SelectItem value="Sarjana">Sarjana</SelectItem>
                      <SelectItem value="Magister">Magister</SelectItem>
                      <SelectItem value="Doktor">Doktor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Alamat KTP*</Label>
                  <Input 
                    name="alamatKTP" 
                    value={formData.alamatKTP} 
                    onChange={handleChange} 
                    placeholder="Alamat KTP" 
                  />
                  <p className="text-xs text-gray-500 mt-1">*) Jika mengisi domisili harap input nama kota</p>
                </div>
                <div>
                  <Label>Alamat Domisili*</Label>
                  <Input 
                    name="alamatDomisili" 
                    value={formData.alamatDomisili} 
                    onChange={handleChange} 
                    placeholder="Alamat Domisili" 
                  />
                  <p className="text-xs text-gray-500 mt-1">*) Jika mengisi domisili harap input nama kota</p>
                </div>
                <div>
                  <Label>Usia*</Label>
                  <Input 
                    name="usia" 
                    value={formData.usia} 
                    onChange={handleChange} 
                    placeholder="Usia" 
                  />
                </div>
                <div>
                  <Label>Agama*</Label>
                  <Select 
                    name="agama" 
                    value={formData.agama} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, agama: value }))} 
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Pilih Agama --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Islam">Islam</SelectItem>
                      <SelectItem value="Kristen">Kristen</SelectItem>
                      <SelectItem value="Katolik">Katolik</SelectItem>
                      <SelectItem value="Hindu">Hindu</SelectItem>
                      <SelectItem value="Buddha">Buddha</SelectItem>
                      <SelectItem value="Konghucu">Konghucu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Nama Suami/Istri</Label>
                  <Input 
                    name="namaSuamiIstri" 
                    value={formData.namaSuamiIstri} 
                    onChange={handleChange} 
                    placeholder="contoh: nama1, Nama2, dst" 
                  />
                </div>
                <div>
                  <Label>Nama Anak</Label>
                  <Input 
                    name="namaAnak" 
                    value={formData.namaAnak} 
                    onChange={handleChange} 
                    placeholder="Contoh: Nama1, Nama2, dst" 
                  />
                </div>
                <div>
                  <Label>Jumlah Anak</Label>
                  <Input 
                    name="jumlahAnak" 
                    value={formData.jumlahAnak} 
                    onChange={handleChange} 
                    placeholder="Total jumlah anak" 
                  />
                </div>
                <div>
                  <Label>Nama Bapak</Label>
                  <Input 
                    name="namaBapak" 
                    value={formData.namaBapak} 
                    onChange={handleChange} 
                    placeholder="Nama Bapak" 
                  />
                </div>
                <div>
                  <Label>Nama Ibu</Label>
                  <Input 
                    name="namaIbu" 
                    value={formData.namaIbu} 
                    onChange={handleChange} 
                    placeholder="Nama Ibu" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Kepegawaian */}
          <Card>
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle>Data Kepegawaian</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>ID Karyawan*</Label>
                  <Input 
                    name="idKaryawan" 
                    value={formData.idKaryawan} 
                    onChange={handleChange} 
                    placeholder="ID Karyawan" 
                  />
                </div>
                <div>
                  <Label>Divisi*</Label>
                  <Select 
                    name="divisi" 
                    value={formData.divisi} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, divisi: value }))} 
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Pilih Divisi --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="HRD">HRD</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Operasional">Operasional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Jabatan*</Label>
                  <Select 
                    name="jabatan" 
                    value={formData.jabatan} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, jabatan: value }))} 
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Pilih Jabatan --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Supervisor">Supervisor</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                      <SelectItem value="Intern">Intern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Lokasi Kerja*</Label>
                  <Input 
                    name="lokasiKerja" 
                    value={formData.lokasiKerja} 
                    onChange={handleChange} 
                    placeholder="PT SiCepat Ekspres Indonesia" 
                    disabled 
                  />
                </div>
                <div>
                  <Label>Tanggal Bergabung*</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.tanggalBergabung && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.tanggalBergabung ? format(formData.tanggalBergabung, "dd/MM/yyyy") : <span>dd/mm/yyyy</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.tanggalBergabung}
                        onSelect={(date) => handleDateChange("tanggalBergabung", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Tanggal Kontrak*</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.tanggalKontrak && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.tanggalKontrak ? format(formData.tanggalKontrak, "dd/MM/yyyy") : <span>dd/mm/yyyy</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.tanggalKontrak}
                        onSelect={(date) => handleDateChange("tanggalKontrak", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Selesai Kontrak*</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.selesaiKontrak && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.selesaiKontrak ? format(formData.selesaiKontrak, "dd/MM/yyyy") : <span>dd/mm/yyyy</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.selesaiKontrak}
                        onSelect={(date) => handleDateChange("selesaiKontrak", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Grup *</Label>
                  <Select 
                    name="grup" 
                    value={formData.grup} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, grup: value }))} 
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Pilih Grup --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Grup A</SelectItem>
                      <SelectItem value="B">Grup B</SelectItem>
                      <SelectItem value="C">Grup C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Bagian *</Label>
                  <Input 
                    name="bagian" 
                    value={formData.bagian} 
                    onChange={handleChange} 
                    placeholder="Isi Bagian Karyawan" 
                  />
                </div>
                <div>
                  <Label>Golongan Karyawan*</Label>
                  <Select 
                    name="golonganKaryawan" 
                    value={formData.golonganKaryawan} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, golonganKaryawan: value }))} 
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Pilih Golongan Karyawan --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Golongan 1">Golongan 1</SelectItem>
                      <SelectItem value="Golongan 2">Golongan 2</SelectItem>
                      <SelectItem value="Golongan 3">Golongan 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status Marital*</Label>
                  <Select 
                    name="statusMarital" 
                    value={formData.statusMarital} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, statusMarital: value }))} 
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Pilih Status Marital --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Menikah">Menikah</SelectItem>
                      <SelectItem value="Belum Menikah">Belum Menikah</SelectItem>
                      <SelectItem value="Cerai">Cerai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Email*</Label>
                  <Input 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email" 
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input 
                    name="password" 
                    type="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="••••••••" 
                  />
                </div>
                <div>
                  <Label>Referensi</Label>
                  <Input 
                    name="referensi" 
                    value={formData.referensi} 
                    onChange={handleChange} 
                    placeholder="Referensi" 
                  />
                </div>
                <div>
                  <Label>No SIO</Label>
                  <Input 
                    name="noSIO" 
                    value={formData.noSIO} 
                    onChange={handleChange} 
                    placeholder="32xxxxxx" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dokumen Pendukung & Detail Akun Bank */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Dokumen Pendukung */}
          <Card>
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle>Dokumen Pendukung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FileUpload label="Upload KTP" onFileChange={(file) => handleFileUpload('ktpFile', file)} />
                </div>
                <div>
                  <Label>Nomor KTP*</Label>
                  <Input 
                    name="nomorKTP" 
                    value={formData.nomorKTP} 
                    onChange={handleChange} 
                    placeholder="32xxxxxx" 
                  />
                </div>
                <div>
                  <FileUpload label="Upload Kartu Keluarga" onFileChange={(file) => handleFileUpload('kartuKeluargaFile', file)} />
                </div>
                <div>
                  <Label>No Kartu Keluarga</Label>
                  <Input 
                    name="nomorKartuKeluarga" 
                    value={formData.nomorKartuKeluarga} 
                    onChange={handleChange} 
                    placeholder="Nama Bapak" 
                  />
                </div>
                <div>
                  <FileUpload label="Upload NPWP" onFileChange={(file) => handleFileUpload('npwpFile', file)} />
                </div>
                <div>
                  <Label>Nomor NPWP</Label>
                  <Input 
                    name="nomorNPWP" 
                    value={formData.nomorNPWP} 
                    onChange={handleChange} 
                    placeholder="" 
                  />
                </div>
                <div>
                  <FileUpload label="Upload KPJ" onFileChange={(file) => handleFileUpload('kpjFile', file)} />
                </div>
                <div>
                  <Label>Nomor KPJ</Label>
                  <Input 
                    name="nomorKPJ" 
                    value={formData.nomorKPJ} 
                    onChange={handleChange} 
                    placeholder="32xxxxxx" 
                  />
                </div>
                <div>
                  <FileUpload label="Upload JKN" onFileChange={(file) => handleFileUpload('jknFile', file)} />
                </div>
                <div>
                  <Label>Nomor JKN</Label>
                  <Input 
                    name="nomorJKN" 
                    value={formData.nomorJKN} 
                    onChange={handleChange} 
                    placeholder="32xxxxxx" 
                  />
                </div>
                <div>
                  <FileUpload label="Upload CV / Riwayat Hidup" onFileChange={(file) => handleFileUpload('cvFile', file)} />
                </div>
                <div>
                  <FileUpload label="Upload File Pendukung Lainnya" onFileChange={(file) => handleFileUpload('lainnyaFile', file)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detail Akun Bank */}
          <Card>
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle>Detail Akun Bank</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nama Pemilik Rekening *</Label>
                  <Input 
                    name="namaPemilikRekening" 
                    value={formData.namaPemilikRekening} 
                    onChange={handleChange} 
                    placeholder="Harus sama dengan nama lengkap" 
                  />
                </div>
                <div>
                  <Label>Nomor Rekening *</Label>
                  <Input 
                    name="nomorRekening" 
                    value={formData.nomorRekening} 
                    onChange={handleChange} 
                    placeholder="xxxx" 
                  />
                </div>
                <div>
                  <Label>Nama Bank *</Label>
                  <Select 
                    name="namaBank" 
                    value={formData.namaBank} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, namaBank: value }))} 
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Pilih Bank --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BCA">BCA</SelectItem>
                      <SelectItem value="Mandiri">Mandiri</SelectItem>
                      <SelectItem value="BRI">BRI</SelectItem>
                      <SelectItem value="BNI">BNI</SelectItem>
                      <SelectItem value="CIMB">CIMB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Kode Bank*</Label>
                  <Input 
                    name="kodeBank" 
                    value={formData.kodeBank} 
                    onChange={handleChange} 
                    placeholder="123" 
                  />
                </div>
                <div>
                  <Label>Lokasi Cabang *</Label>
                  <Input 
                    name="lokasiCabang" 
                    value={formData.lokasiCabang} 
                    onChange={handleChange} 
                    placeholder="Jakarta" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kontak Darurat & Identitas Kendaraan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Kontak Darurat */}
          <Card>
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle>Kontak Darurat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nama lengkap</Label>
                  <Input 
                    name="namaLengkapKontak" 
                    value={formData.namaLengkapKontak} 
                    onChange={handleChange} 
                    placeholder="Nama kontak" 
                  />
                </div>
                <div>
                  <Label>Hubungan</Label>
                  <Input 
                    name="hubungan" 
                    value={formData.hubungan} 
                    onChange={handleChange} 
                    placeholder="Contoh: Orang tua (Ayah/Ibu)" 
                  />
                </div>
                <div>
                  <Label>Nomor Telepon</Label>
                  <Input 
                    name="nomorTeleponKontak" 
                    value={formData.nomorTeleponKontak} 
                    onChange={handleChange} 
                    placeholder="08xxx" 
                  />
                </div>
                <div>
                  <Label>Alamat</Label>
                  <Input 
                    name="alamatKontak" 
                    value={formData.alamatKontak} 
                    onChange={handleChange} 
                    placeholder="" 
                  />
                  <p className="text-xs text-gray-500 mt-1">*) Jika mengisi domisili harap input nama kota</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Identitas Kendaraan */}
          <Card>
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle>Identitas Kendaraan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FileUpload label="Upload SIM" onFileChange={(file) => handleFileUpload('simFile', file)} />
                </div>
                <div>
                  <Label>Nomor SIM</Label>
                  <Input 
                    name="nomorSIM" 
                    value={formData.nomorSIM} 
                    onChange={handleChange} 
                    placeholder="Nomor SIM" 
                  />
                </div>
                <div>
                  <FileUpload label="Upload STNK" onFileChange={(file) => handleFileUpload('stnkFile', file)} />
                </div>
                <div>
                  <Label>Nomor STNK</Label>
                  <Input 
                    name="nomorSTNK" 
                    value={formData.nomorSTNK} 
                    onChange={handleChange} 
                    placeholder="Nomor STNK" 
                  />
                </div>
                <div>
                  <FileUpload label="Upload Gambar Kendaraan Depan" onFileChange={(file) => handleFileUpload('gambarKendaraanDepanFile', file)} />
                </div>
                <div>
                  <FileUpload label="Upload Gambar Kendaraan Belakang" onFileChange={(file) => handleFileUpload('gambarKendaraanBelakangFile', file)} />
                </div>
                <div>
                  <FileUpload label="Upload Gambar Kendaraan Samping" onFileChange={(file) => handleFileUpload('gambarKendaraanSampingFile', file)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
};