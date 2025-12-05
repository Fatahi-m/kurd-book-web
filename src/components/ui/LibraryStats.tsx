'use client';

import { Book, Users, Layers, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LibraryStats() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: <Book className="w-8 h-8 text-amber-500" />,
      value: "12,500+",
      label: t('stats.books') || "Books Available",
      color: "bg-amber-50"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      value: "850+",
      label: t('stats.authors') || "Authors & Translators",
      color: "bg-blue-50"
    },
    {
      icon: <Layers className="w-8 h-8 text-emerald-500" />,
      value: "45",
      label: t('stats.categories') || "Categories",
      color: "bg-emerald-50"
    },
    {
      icon: <Download className="w-8 h-8 text-purple-500" />,
      value: "1.2M+",
      label: t('stats.downloads') || "Total Downloads",
      color: "bg-purple-50"
    }
  ];

  return (
    <div className="container mx-auto px-4 -mt-16 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className={`p-4 rounded-full ${stat.color} mb-4`}>
              {stat.icon}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1 font-serif">
              {stat.value}
            </h3>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
