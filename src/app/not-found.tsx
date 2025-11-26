'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NotFound() {
  const { currentLanguage } = useLanguage();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0f172a] px-4">
      <h1 className="text-9xl font-serif text-gray-200 dark:text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-serif text-gray-800 dark:text-white mb-6 text-center">
        {currentLanguage === 'ku' ? 'پەڕە نەدۆزرایەوە' : currentLanguage === 'en' ? 'Page Not Found' : 'Seite nicht gefunden'}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
        {currentLanguage === 'ku' 
          ? 'ببورە، ئەو پەڕەیەی بەدوایدا دەگەڕێیت بوونی نییە یان گواستراوەتەوە.' 
          : currentLanguage === 'en' 
          ? 'Sorry, the page you are looking for does not exist or has been moved.' 
          : 'Entschuldigung, die gesuchte Seite existiert nicht oder wurde verschoben.'}
      </p>
      <Link 
        href="/"
        className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors uppercase tracking-widest text-sm"
      >
        {currentLanguage === 'ku' ? 'گەڕانەوە بۆ سەرەتا' : currentLanguage === 'en' ? 'Back to Home' : 'Zurück zur Startseite'}
      </Link>
    </div>
  );
}
