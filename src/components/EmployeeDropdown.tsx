import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  selected: boolean;
}

interface EmployeeDropdownProps {
  employees: Employee[];
  onEmployeeToggle: (id: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const EmployeeDropdown: React.FC<EmployeeDropdownProps> = ({
  employees,
  onEmployeeToggle,
  searchTerm,
  onSearchChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCount = employees.filter(emp => emp.selected).length;

  return (
    <div className="relative">
      <div 
        className="border rounded-lg p-3 cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Cari ID / Nama Karyawan"
              value={searchTerm}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setIsOpen(true);
              }}
              onClick={(e) => e.stopPropagation()}
              className="border-0 p-0 h-auto focus-visible:ring-0 bg-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            {selectedCount > 0 && (
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {selectedCount} dipilih
              </span>
            )}
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-200">
          <ScrollArea className="max-h-60">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <div 
                  key={emp.id} 
                  className="flex items-center p-3 border-b hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  onClick={() => onEmployeeToggle(emp.id)}
                >
                  <Checkbox
                    checked={emp.selected}
                    onChange={() => onEmployeeToggle(emp.id)}
                    className="mr-3"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{emp.name}</span>
                    <span className="text-sm text-gray-500">{emp.id}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-gray-500">
                Tidak ada karyawan ditemukan
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};