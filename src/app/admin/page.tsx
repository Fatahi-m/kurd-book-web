'use client';

import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with localStorage
const AdminPanelContent = dynamic(() => import('./AdminPanelContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex items-center justify-center transition-colors duration-300">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#2c2c2c] dark:border-white border-t-transparent animate-spin mx-auto mb-4"></div>
        <p className="text-[#2c2c2c] dark:text-white font-serif uppercase tracking-widest text-xs">Loading Admin Panel...</p>
      </div>
    </div>
  )
});

export default function AdminPage() {
  return <AdminPanelContent />;
}