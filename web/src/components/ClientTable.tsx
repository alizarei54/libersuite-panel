'use client';

import { Client } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { faIR } from 'date-fns/locale/fa-IR';

interface ClientTableProps {
  clients: Client[];
  onEdit?: (client: Client) => void;
  onDelete?: (client: Client) => void;
  onToggleStatus?: (client: Client) => void;
}

export function ClientTable({
  clients,
  onEdit,
  onDelete,
  onToggleStatus,
}: ClientTableProps) {
  const getStatusBadge = (status: Client['status']) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      disabled: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800',
    };

    const labels = {
      active: 'فعال',
      disabled: 'غیرفعال',
      expired: 'منقضی',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getTrafficPercentage = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-right font-semibold text-gray-700">نام کاربری</th>
            <th className="px-6 py-3 text-right font-semibold text-gray-700">وضعیت</th>
            <th className="px-6 py-3 text-right font-semibold text-gray-700">ترافیک</th>
            <th className="px-6 py-3 text-right font-semibold text-gray-700">تاریخ انقضا</th>
            <th className="px-6 py-3 text-right font-semibold text-gray-700">آخرین استفاده</th>
            <th className="px-6 py-3 text-center font-semibold text-gray-700">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-b hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-medium text-gray-900">{client.username}</td>
              <td className="px-6 py-4">{getStatusBadge(client.status)}</td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{client.trafficUsed.toFixed(1)} GB</span>
                    <span>{client.trafficLimit} GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${getTrafficPercentage(client.trafficUsed, client.trafficLimit)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600">
                {new Date(client.expiryDate).toLocaleDateString('fa-IR')}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {client.lastUsed
                  ? formatDistanceToNow(new Date(client.lastUsed), {
                      locale: faIR,
                      addSuffix: true,
                    })
                  : 'هرگز'}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => onEdit?.(client)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => onToggleStatus?.(client)}
                    className={`px-3 py-1 rounded transition text-white ${
                      client.status === 'active'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {client.status === 'active' ? 'غیرفعال' : 'فعال'}
                  </button>
                  <button
                    onClick={() => onDelete?.(client)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    حذف
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {clients.length === 0 && (
        <div className="text-center py-8 text-gray-500">کاربری یافت نشد</div>
      )}
    </div>
  );
}
