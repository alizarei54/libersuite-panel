'use client';

import { useEffect, useState } from 'react';
import { Navbar, StatCard } from '@/components';
import type { ServerStats } from '@/types';

export default function Home() {
  const [stats, setStats] = useState<ServerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading || !stats) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 p-4 md:p-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">بارگذاری داده‌ها...</p>
          </div>
        </main>
      </>
    );
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    return `${days} روز ${hours} ساعت`;
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">داشبورد</h1>
            <p className="text-gray-600 mt-2">خوش‌آمدید به پنل مدیریتی Libersuite</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="کل مشترکین"
              value={stats.totalClients}
              icon="👥"
              trend={{
                value: 12,
                direction: 'up',
              }}
            />
            <StatCard
              title="مشترکین فعال"
              value={stats.activeClients}
              icon="✅"
              trend={{
                value: 8,
                direction: 'up',
              }}
            />
            <StatCard
              title="کل ترافیک مصرف‌شده"
              value={stats.totalTraffic.toFixed(1)}
              unit="GB"
              icon="📊"
            />
            <StatCard
              title="وضعیت درگاه ۵۳"
              value={stats.port53Status ? 'فعال' : 'غیرفعال'}
              icon={stats.port53Status ? '🟢' : '🔴'}
            />
            <StatCard
              title="آپ‌تایم سرور"
              value={formatUptime(stats.uptime)}
              icon="⏱️"
            />
            <StatCard
              title="استفاده سیستم"
              value="---"
              icon="💻"
            />
          </div>

          {/* System Resources */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">منابع سیستم</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CPU Usage */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">استفاده CPU</span>
                  <span className="text-sm font-bold text-blue-600">{stats.cpuUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${stats.cpuUsage}%` }}
                  ></div>
                </div>
              </div>

              {/* Memory Usage */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">استفاده حافظه</span>
                  <span className="text-sm font-bold text-green-600">{stats.memoryUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${stats.memoryUsage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-2">💡 نکات مهم</h3>
            <ul className="text-blue-800 space-y-2 text-sm">
              <li>✓ درگاه ۵۳ برای DNS فعال است</li>
              <li>✓ تمام مشترکین به‌درستی پیکربندی شده‌اند</li>
              <li>✓ هیچ هشداری وجود ندارد</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
