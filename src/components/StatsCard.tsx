import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
}

export const StatsCard = ({ title, value, icon: Icon, color = 'blue' }: StatsCardProps) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    green: 'text-green-600 bg-gradient-to-br from-green-50 to-green-100 border-green-200',
    orange: 'text-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200',
    purple: 'text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
    red: 'text-red-600 bg-gradient-to-br from-red-50 to-red-100 border-red-200'
  };

  const iconColorClasses = {
    blue: 'text-white bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-200',
    green: 'text-white bg-gradient-to-br from-green-500 to-green-600 shadow-green-200',
    orange: 'text-white bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-200',
    purple: 'text-white bg-gradient-to-br from-purple-500 to-purple-600 shadow-purple-200',
    red: 'text-white bg-gradient-to-br from-red-500 to-red-600 shadow-red-200'
  };

  return (
    <Card className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{title}</CardTitle>
        <div className={`p-3 rounded-xl shadow-lg ${iconColorClasses[color as keyof typeof iconColorClasses] || iconColorClasses.blue}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
        <div className="text-xs text-gray-500 font-medium">Data terkini</div>
      </CardContent>
    </Card>
  );
};