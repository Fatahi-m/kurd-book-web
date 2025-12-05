'use client';

import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with localStorage
const AdminPanelContent = dynamic(() => import('./AdminPanelContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-white flex items-center justify-center transition-colors duration-300">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent animate-spin mx-auto mb-4"></div>
        <p className="text-black font-serif uppercase tracking-widest text-xs">Loading Admin Panel...</p>
      </div>
    </div>
  )
});

export default function AdminPage() {
  return <AdminPanelContent />;
}