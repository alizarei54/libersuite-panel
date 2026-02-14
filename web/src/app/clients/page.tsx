'use client';

import { useEffect, useState } from 'react';
import { Navbar, ClientTable, AddClientModal } from '@/components';
import type { Client, CreateClientRequest } from '@/types';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch clients
  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      const data = await response.json();
      if (data.success) {
        setClients(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Add new client
  const handleAddClient = async (formData: CreateClientRequest) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setClients([...clients, data.data]);
        setSearchQuery('');
        alert('کاربر با موفقیت افزوده شد');
      } else {
        alert('خطا: ' + data.error);
      }
    } catch (error) {
      console.error('Failed to add client:', error);
      alert('خطا در افزودن کاربر');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle client status
  const handleToggleStatus = async (client: Client) => {
    const action = client.status === 'active' ? 'disable' : 'enable';
    try {
      const response = await fetch(`/api/clients/${client.id}/${action}`, {
        method: 'POST',
      });

      const data = await response.json();
      if (data.success) {
        setClients(
          clients.map((c) =>
            c.id === client.id ? { ...c, status: data.data.status } : c
          )
        );
        alert(`کاربر ${action === 'enable' ? 'فعال' : 'غیرفعال'} شد`);
      }
    } catch (error) {
      console.error('Failed to toggle client status:', error);
      alert('خطا در تغییر وضعیت کاربر');
    }
  };

  // Delete client
  const handleDeleteClient = async (client: Client) => {
    if (!confirm(`آیا مطمئن هستید که می‌خواهید \"${client.username}\" را حذف کنید?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/clients/${client.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        setClients(clients.filter((c) => c.id !== client.id));
        alert('کاربر حذف شد');
      }
    } catch (error) {
      console.error('Failed to delete client:', error);
      alert('خطا در حذف کاربر');
    }
  };

  // Filter clients based on search query
  const filteredClients = clients.filter((client) =>
    client.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">مشترکین</h1>
              <p className="text-gray-600 mt-2">
                کل مشترکین: <span className="font-bold">{clients.length}</span>
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition font-medium"
            >
              + افزودن کاربر جدید
            </button>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <input
              type="text"
              placeholder="جستجوی کاربر..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Clients Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-600 mt-4">بارگذاری داده‌ها...</p>
              </div>
            ) : (
              <ClientTable
                clients={filteredClients}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteClient}
              />
            )}
          </div>

          {/* Empty State */}
          {!loading && filteredClients.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg mb-4">
                {clients.length === 0 ? 'هنوز کاربری ثبت نشده‌است' : 'نتیجه‌ای یافت نشد'}
              </p>
              {clients.length === 0 && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  افزودن کاربر اول
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Add Client Modal */}
      <AddClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddClient}
        isLoading={isSubmitting}
      />
    </>
  );
}
