'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { authorPosts } from '@/data/authorPosts';
import AuthorPostCard from './AuthorPostCard';
import { PenTool } from 'lucide-react';

export default function AuthorCornerSection() {
  const { currentLanguage } = useLanguage();

  const title = {
    en: "Author's Corner",
    ku: "کونجی نووسەر",
    de: "Autorenecke",
    kmr: "Kuncî Nûser"
  };

  const subtitle = {
    en: "Daily thoughts, poems, and notes from your favorite authors",
    ku: "دلنوشتە، شیعر و یاداشتە ڕۆژانەکانی نووسەرە خۆشەویستەکانتان",
    de: "Tägliche Gedanken, Gedichte und Notizen Ihrer Lieblingsautoren",
    kmr: "Raman, helbest û têbiniyên rojane yên nivîskarên weyên bijare"
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-serif">
              {title[currentLanguage as keyof typeof title] || title.en}
            </h2>
            <p className="text-sm text-slate-500 mt-1 hidden md:block font-medium">
              {subtitle[currentLanguage as keyof typeof subtitle] || subtitle.en}
            </p>
          </div>
        </div>
        
        <button className="text-amber-600 font-bold hover:text-amber-700 text-sm md:text-base transition-colors">
          {currentLanguage === 'ku' ? 'بینینی هەمووی' : 'View All'}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authorPosts.map((post) => (
          <AuthorPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
