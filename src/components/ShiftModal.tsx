import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

interface ShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const employeeData = [
  { id: 'PF10023', name: 'Meida Dwi', selected: false },
  { id: 'PF10024', name: 'Ahmad Rizki', selected: false },
  { id: 'PF10025', name: 'Sari Indah', selected: false },
  { id: 'PF10026', name: 'Budi Santoso', selected: false },
  { id: 'PF10027', name: 'Rina Wati', selected: false }
];

export const ShiftModal = ({ isOpen, onClose, onSave }: ShiftModalProps) => {
  const [selectedEmployees, setSelectedEmployees] = useState(employeeData);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleEmployeeToggle = (id: string) => {
    setSelectedEmployees(prev => 
      prev.map(emp => 
        emp.id === id ? { ...emp, selected: !emp.selected } : emp
      )
    );
  };

  const handleSave = () => {
    onSave();
    onClose();
  };

  const filteredEmployees = selectedEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Atur Shift</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Tanggal Shift</Label>
              <Input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Group</Label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="group-a">Group A - Admin</SelectItem>
                  <SelectItem value="group-b">Group B - Operasional</SelectItem>
                  <SelectItem value="group-c">Group C - Security</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Shift</Label>
              <Select value={selectedShift} onValueChange={setSelectedShift}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih Shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pagi">Pagi (08:00 - 15:00)</SelectItem>
                  <SelectItem value="siang">Siang (15:00 - 22:00)</SelectItem>
                  <SelectItem value="malam">Malam (22:00 - 06:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-4">
              <p className="text-sm text-gray-600 mb-2">Di setting oleh:</p>
              <Badge variant="secondary" className="bg-gray-200 text-gray-700">HRD</Badge>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Karyawan yang dijadwalkan</Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari ID / Nama Karyawan"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="border rounded-lg max-h-64 overflow-y-auto bg-white">
              {filteredEmployees.map((emp) => (
                <div key={emp.id} className="flex items-center p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={emp.selected}
                    onChange={() => handleEmployeeToggle(emp.id)}
                    className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900">{emp.id}</span>
                    <span className="text-sm text-gray-600 ml-2">- {emp.name}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-sm text-gray-600">
              <p>Terpilih: {selectedEmployees.filter(emp => emp.selected).length} karyawan</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Batal
          </Button>
          <Button 
            onClick={handleSave}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white"
          >
            Simpan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};