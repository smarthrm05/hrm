import { StatsCard } from './StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Clock, FileText, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const statsData = [
  { title: 'Total Karyawan', value: '245', icon: Users, color: 'blue' },
  { title: 'Total Cuti', value: '32', icon: Calendar, color: 'green' },
  { title: 'Total Lembur', value: '18', icon: Clock, color: 'orange' },
  { title: 'Total Izin', value: '12', icon: FileText, color: 'purple' },
  { title: 'Total Gaji Dibayar', value: 'Rp 2.4M', icon: DollarSign, color: 'red' }
];

const retentionData = [
  { name: 'Bertahan', value: 85, color: '#10B981', percentage: '85%' },
  { name: 'Keluar', value: 15, color: '#EF4444', percentage: '15%' }
];

const turnoverData = [
  { month: 'Jan', turnover: 5, target: 8 },
  { month: 'Feb', turnover: 3, target: 8 },
  { month: 'Mar', turnover: 7, target: 8 },
  { month: 'Apr', turnover: 4, target: 8 },
  { month: 'Mei', turnover: 2, target: 8 },
  { month: 'Jun', turnover: 6, target: 8 }
];

const domisiliData = [
  { name: 'Jakarta', value: 120, color: '#3B82F6', percentage: '49%' },
  { name: 'Bogor', value: 45, color: '#10B981', percentage: '18%' },
  { name: 'Depok', value: 35, color: '#F59E0B', percentage: '14%' },
  { name: 'Tangerang', value: 30, color: '#8B5CF6', percentage: '12%' },
  { name: 'Bekasi', value: 15, color: '#EF4444', percentage: '6%' }
];

export const Dashboard = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">PT Proven Force Indonesia</h1>
          <p className="text-gray-600 text-lg">Selamat datang di Dashboard SMART HRM (Human Resource Management System)</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last Updated</p>
          <p className="text-lg font-semibold text-gray-700">{new Date().toLocaleDateString('id-ID')}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
            <CardTitle className="text-xl font-bold">Retensi Rate</CardTitle>
            <p className="text-green-100 text-sm">Tingkat retensi karyawan</p>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={retentionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  dataKey="value"
                  label={({ percentage }) => percentage}
                >
                  {retentionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Persentase']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-xl font-bold">Turn Over (6 Bulan)</CardTitle>
            <p className="text-blue-100 text-sm">Jumlah karyawan keluar per bulan</p>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={turnoverData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'turnover' ? 'Keluar' : 'Target']}
                  labelStyle={{ color: '#333' }}
                />
                <Bar dataKey="turnover" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-xl font-bold">Domisili Karyawan</CardTitle>
            <p className="text-purple-100 text-sm">Sebaran lokasi tempat tinggal</p>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={domisiliData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percentage }) => `${name} (${percentage})`}
                >
                  {domisiliData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Jumlah']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {domisiliData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value} orang</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};