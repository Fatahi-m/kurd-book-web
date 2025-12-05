'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SearchHero() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative bg-slate-900 text-white py-20 md:py-32 overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem] shadow-xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 leading-tight">
          {t('hero.title') || 'The Largest Kurdish Library'}
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          {t('hero.subtitle') || 'Discover thousands of free books, articles, and resources in Kurdish, English, and German.'}
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-white rounded-full p-2 shadow-2xl">
              <div className="pl-4 md:pl-6 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('hero.searchPlaceholder') || "Search for books, authors, or categories..."}
                className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 px-4 py-3 md:py-4 text-base md:text-lg w-full"
              />
              <button 
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 md:py-4 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {t('common.search') || 'Search'}
              </button>
            </div>
          </div>
        </form>

        {/* Quick Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-400">
          <span>Popular:</span>
          <button onClick={() => router.push('/category/literature')} className="hover:text-amber-400 underline decoration-dotted underline-offset-4 transition-colors">Literature</button>
          <button onClick={() => router.push('/category/history')} className="hover:text-amber-400 underline decoration-dotted underline-offset-4 transition-colors">History</button>
          <button onClick={() => router.push('/category/poetry')} className="hover:text-amber-400 underline decoration-dotted underline-offset-4 transition-colors">Poetry</button>
          <button onClick={() => router.push('/category/science')} className="hover:text-amber-400 underline decoration-dotted underline-offset-4 transition-colors">Science</button>
        </div>
      </div>
    </div>
  );
}
