'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories } from '@/data/books';
import { ArrowRight } from 'lucide-react';

// Map images to category slugs
const categoryImages: Record<string, string> = {
  literature: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&q=80&w=800',
  poetry: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=800',
  history: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800',
  philosophy: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&q=80&w=800',
  children: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
};

export default function CollectionGrid() {
  const { t, currentLanguage } = useLanguage();

  // Filter categories that have images defined above
  const displayCategories = categories.filter(cat => categoryImages[cat.slug]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {displayCategories.map((category) => (
        <Link 
          key={category.id}
          href={`/category/${category.slug}`} 
          className="group relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
        >
          {/* Background Image */}
          <Image 
            src={categoryImages[category.slug]} 
            alt={currentLanguage === 'ku' ? category.name.ku : (currentLanguage === 'kmr' ? category.name.kmr : category.name.en)}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
          
          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end items-start">
            <h3 className="text-xl font-bold text-white mb-2 leading-tight transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              {currentLanguage === 'ku' ? category.name.ku : (currentLanguage === 'kmr' ? category.name.kmr : category.name.en)}
            </h3>
            <div className="flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
              <span>{t('buttons.viewAll') || 'Explore'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}