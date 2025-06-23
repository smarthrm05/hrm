import { useState } from 'react';
import { DataKehadiranPage } from '@/components/Kehadiran/DataKehadiranPage';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export const KehadiranPage = () => {
  const [activeTab, setActiveTab] = useState<'data-kehadiran'>('data-kehadiran');

  const handleTabChange = (tab: 'data-kehadiran') => {
    setActiveTab(tab);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Kehadiran</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>Data Kehadiran</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleTabChange('data-kehadiran')}>
              Data Kehadiran
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {activeTab === 'data-kehadiran' && <DataKehadiranPage />}
    </div>
  );
};

export default KehadiranPage;
