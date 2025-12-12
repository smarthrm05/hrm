import React, { useState } from 'react';
import { ShiftPage } from '@/components/JadwalShift/ShiftPage';
import { GrupPage } from '@/components/JadwalShift/GrupPage';
import { AturShiftPage } from '@/components/JadwalShift/AturShiftPage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export const JadwalShiftPage = () => {
  const [activeTab, setActiveTab] = useState('shift');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Shift</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>Jadwal</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setActiveTab('shift')}>
              Shift
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab('grup')}>
              Grup
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab('atur-shift')}>
              Atur Shift
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {activeTab === 'shift' && <ShiftPage />}
      {activeTab === 'grup' && <GrupPage />} 
      {activeTab === 'atur-shift' && <AturShiftPage />}
    </div>
  );
};