import { useState } from "react";
import AkunSection from "./Sections/AkunSection";
import DataPribadiSection from "./Sections/DataPribadiSection";
import KepegawaianSection from "./Sections/DataKepegawaianSection";
import DokumenSection from "./Sections/DokumenSection";
import BankSection from "./Sections/BankSection";
import KontakSection from "./Sections/KontakSection";
import KendaraanSection from "./Sections/KendaraanSection";
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Tambah Karyawan</h1>

      <div className="space-y-6">
        <AkunSection formData={formData} updateForm={updateForm} />
        <DataPribadiSection formData={formData} updateForm={updateForm} />

        {/* Data Kepegawaian — Header biru langsung di komponennya */}
        <KepegawaianSection formData={formData} updateForm={updateForm} />

        <DokumenSection formData={formData} updateForm={updateForm} />
        <BankSection formData={formData} updateForm={updateForm} />
        <KontakSection formData={formData} updateForm={updateForm} />
        <KendaraanSection formData={formData} updateForm={updateForm} />
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-700">
          Simpan
        </Button>
      </div>
    </div>
  );
};

export default TambahKaryawanPage;