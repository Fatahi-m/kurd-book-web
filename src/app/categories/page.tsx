'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories } from '@/data/books';
import { BookOpen, Feather, Landmark, Baby, GraduationCap, Moon, Gavel, Microscope, User, Globe, Brain, Lightbulb, Palette, Briefcase, Utensils, Plane, HeartPulse } from 'lucide-react';

const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case 'literature': return <BookOpen size={32} />;
    case 'poetry': return <Feather size={32} />;
    case 'history': return <Landmark size={32} />;
    case 'children': return <Baby size={32} />;
    case 'education': return <GraduationCap size={32} />;
    case 'religion': return <Moon size={32} />;
    case 'politics': return <Gavel size={32} />;
    case 'science': return <Microscope size={32} />;
    case 'biography': return <User size={32} />;
    case 'culture': return <Globe size={32} />;
    case 'psychology': return <Brain size={32} />;
    case 'philosophy': return <Lightbulb size={32} />;
    case 'art': return <Palette size={32} />;
    case 'business': return <Briefcase size={32} />;
    case 'cooking': return <Utensils size={32} />;
    case 'travel': return <Plane size={32} />;
    case 'health': return <HeartPulse size={32} />;
    default: return <BookOpen size={32} />;
  }
};

export default function CategoriesPage() {
  const { t, currentLanguage } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0f172a] py-12 md:py-20 transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            {t('nav.categories') || 'Browse Categories'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our extensive collection of books across various genres and topics.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={`/category/${category.slug}`} 
              className="group bg-white dark:bg-[#1e293b] p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-rose-100 dark:hover:border-rose-900/30 flex flex-col items-center text-center transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {getCategoryIcon(category.slug)}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-rose-600 transition-colors">
                {currentLanguage === 'ku' ? category.name.ku : (currentLanguage === 'kmr' ? category.name.kmr : category.name.en)}
              </h3>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('buttons.viewDetails') || 'View Collection'} &rarr;
              </p>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
