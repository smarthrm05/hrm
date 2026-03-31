import { Card, CardContent } from '@/components/ui/card';

const TabDetailAkunBank = () => {
  return (
    <Card>
      <CardContent className="p-6 grid grid-cols-2 gap-4">
        <Field label="Nama Pemilik" value="Andi Prasetyo" />
        <Field label="Nomor Rekening" value="1234567890" />
        <Field label="Bank" value="BCA" />
      </CardContent>
    </Card>
  );
};

export default TabDetailAkunBank;

const Field = ({ label, value }: any) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);