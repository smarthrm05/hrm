import React from 'react';

interface DataTableProps {
  data: any[];
  columns: string[];
  type: 'shift' | 'group' | 'atur-shift';
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

export const DataTable: React.FC<DataTableProps> = ({ data, columns, type, onEdit, onDelete }) => {
  const renderRow = (row: any, index: number) => {
    const renderActions = () => (
      <td className="px-4 py-2 border-b flex gap-2">
        <button
          className="text-blue-600 hover:underline"
          onClick={() => onEdit?.(row)}
        >
          Edit
        </button>
        <button
          className="text-red-600 hover:underline"
          onClick={() => onDelete?.(row)}
        >
          Delete
        </button>
      </td>
    );

    switch (type) {
      case 'shift':
        return (
          <>
            <td className="px-4 py-2 border-b">{index + 1}</td>
            <td className="px-4 py-2 border-b">{row.keterangan}</td>
            <td className="px-4 py-2 border-b">{row.jam}</td>
            {renderActions()}
          </>
        );
      case 'group':
        return (
          <>
            <td className="px-4 py-2 border-b">{index + 1}</td>
            <td className="px-4 py-2 border-b">{row.nama}</td>
            <td className="px-4 py-2 border-b">{row.jumlahAnggota}</td>
            {renderActions()}
          </>
        );
      case 'atur-shift':
        return (
          <>
            <td className="px-4 py-2 border-b">{index + 1}</td>
            <td className="px-4 py-2 border-b">{row.namaKaryawan}</td>
            <td className="px-4 py-2 border-b">{row.shift}</td>
            <td className="px-4 py-2 border-b">{row.tanggal}</td>
            {renderActions()}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-2 border-b bg-gray-100 text-left text-sm font-semibold text-gray-700">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id || idx} className="hover:bg-gray-50">
              {renderRow(row, idx)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
