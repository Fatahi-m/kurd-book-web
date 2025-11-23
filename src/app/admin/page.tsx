'use client';

import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with localStorage
const AdminPanelContent = dynamic(() => import('./AdminPanelContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading Admin Panel...</p>
      </div>
    </div>
  )
});

export default function AdminPage() {
  return <AdminPanelContent />;
}