import { useState } from "react";
import { Link } from "react-router-dom"; 
import { Users, ChevronRight, UserPlus } from "lucide-react";
import AkunSection from "./Sections/AkunSection";
import DataPribadiSection from "./Sections/DataPribadiSection";
import KepegawaianSection from "./Sections/DataKepegawaianSection";
import DokumenSection from "./Sections/DokumenSection";
import BankSection from "./Sections/BankSection";
import KontakSection from "./Sections/KontakSection";
import KendaraanSection from "./Sections/KendaraanSection";
import InformasiGajiSection from "./Sections/InformasiGajiSection"; 
import { Button } from "@/components/ui/button";

const TambahKaryawanPage = () => {
  const [formData, setFormData] = useState<any>({});

  const updateForm = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("DATA KARYAWAN:", formData);
  };

  return (
    <div className="space-y-4">
      {/* BREADCRUMB NAVIGATION */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <Link 
          to="/data-karyawan"
          className="flex items-center gap-1.5 text-[#0F2A4D] hover:text-[#1a3a5c] transition-colors"
        >
          <Users className="w-4 h-4" />
          <span>Karyawan</span>
        </Link>
        
        <ChevronRight className="w-4 h-4 text-gray-400" />
        
        <div className="flex items-center gap-1.5 text-gray-600">
          <UserPlus className="w-4 h-4" />
          <span>Tambah Karyawan</span>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Tambah Karyawan</h1>

        <div className="space-y-6">
          <AkunSection formData={formData} updateForm={updateForm} />
          <DataPribadiSection formData={formData} updateForm={updateForm} />
          <KepegawaianSection formData={formData} updateForm={updateForm} />
          <InformasiGajiSection formData={formData} updateForm={updateForm} />
          <DokumenSection formData={formData} updateForm={updateForm} />
          <BankSection formData={formData} updateForm={updateForm} />
          <KontakSection formData={formData} updateForm={updateForm} />
          <KendaraanSection formData={formData} updateForm={updateForm} />
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleSubmit} 
            className="bg-[#0F2A4D] text-white hover:bg-[#1a3a5c] transition-colors px-6"
          >
            Simpan Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TambahKaryawanPage;