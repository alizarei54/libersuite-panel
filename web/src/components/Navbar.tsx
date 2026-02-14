'use client';

import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">
            LP
          </div>
          <span className="text-xl font-bold hidden sm:inline">Libersuite Panel</span>
        </Link>

        <div className="flex gap-6">
          <Link
            href="/"
            className="hover:text-blue-400 transition-colors"
          >
            داشبورد
          </Link>
          <Link
            href="/clients"
            className="hover:text-blue-400 transition-colors"
          >
            مشترکین
          </Link>
          <Link
            href="/settings"
            className="hover:text-blue-400 transition-colors"
          >
            تنظیمات
          </Link>
        </div>
      </div>
    </nav>
  );
}
