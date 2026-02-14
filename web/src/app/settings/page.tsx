'use client';

import { useState } from 'react';
import { Navbar } from '@/components';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    panelPort: 8080,
    dnsPort: 53,
    maxClients: 100,
    defaultTraffic: 100,
    defaultExpiry: 30,
    enableNotifications: true,
    notificationEmail: '',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: any) => {
    setSettings({
      ...settings,
      [field]: value,
    });
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      // In production, send to API
      console.log('Saving settings:', settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('خطا در ذخیره تنظیمات');
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">تنظیمات</h1>
            <p className="text-gray-600 mt-2">پیکربندی پنل مدیریتی و سرور</p>
          </div>

          {/* Success Message */}
          {saved && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
              ✓ تنظیمات با موفقیت ذخیره شد
            </div>
          )}

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Panel Settings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">⚙️ تنظیمات پنل</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    درگاه پنل (Port)
                  </label>
                  <input
                    type="number"
                    value={settings.panelPort}
                    onChange={(e) =>
                      handleChange('panelPort', parseInt(e.target.value))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    حد بیشتر مشترکین
                  </label>
                  <input
                    type="number"
                    value={settings.maxClients}
                    onChange={(e) =>
                      handleChange('maxClients', parseInt(e.target.value))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Server Settings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🖥️ تنظیمات سرور</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    درگاه DNS (معمولاً ۵۳)
                  </label>
                  <input
                    type="number"
                    value={settings.dnsPort}
                    onChange={(e) =>
                      handleChange('dnsPort', parseInt(e.target.value))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    ⚠️ پیش از تغییر این مقدار، مطمئن شوید درگاه آزاد است
                  </p>
                </div>
              </div>
            </div>

            {/* Default Settings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📋 تنظیمات پیش‌فرض</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ترافیک پیش‌فرض (GB)
                  </label>
                  <input
                    type="number"
                    value={settings.defaultTraffic}
                    onChange={(e) =>
                      handleChange('defaultTraffic', parseInt(e.target.value))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    دوره انقضا پیش‌فرض (روز)
                  </label>
                  <input
                    type="number"
                    value={settings.defaultExpiry}
                    onChange={(e) =>
                      handleChange('defaultExpiry', parseInt(e.target.value))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🔔 تنظیمات اعلان</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={settings.enableNotifications}
                    onChange={(e) =>
                      handleChange('enableNotifications', e.target.checked)
                    }
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <label
                    htmlFor="notifications"
                    className="text-sm font-medium text-gray-700"
                  >
                    فعال‌کردن اعلان‌ها
                  </label>
                </div>

                {settings.enableNotifications && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ایمیل برای دریافت اعلان
                    </label>
                    <input
                      type="email"
                      value={settings.notificationEmail}
                      onChange={(e) =>
                        handleChange('notificationEmail', e.target.value)
                      }
                      placeholder="admin@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🔐 تنظیمات امنیتی</h2>
              <div className="space-y-4">
                <button className="w-full bg-orange-100 text-orange-800 px-4 py-2 rounded-lg hover:bg-orange-200 transition font-medium">
                  تغییر کلمه عبور
                </button>
                <button className="w-full bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition font-medium">
                  مدیریت API Keys
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-bold text-lg"
            >
              ذخیره تنظیمات
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
