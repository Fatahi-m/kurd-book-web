'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories } from '@/data/books';

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
    <section className="py-16 border-b border-[#e5e5e5] dark:border-[#333] bg-white dark:bg-[#121212]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Header - Centered & Clean */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] dark:text-[#f5f5f5] mb-3">
            {t('nav.categories') || 'Browse by Category'}
          </h2>
          <div className="w-12 h-[1px] bg-[#e11d48] mx-auto"></div>
        </div>

        {/* Uniform Grid Layout - Clean & Organized */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {displayCategories.map((category) => (
            <Link 
              key={category.id}
              href={`/category/${category.slug}`} 
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-full mb-4 border border-gray-200 dark:border-gray-800 group-hover:border-[#e11d48] transition-colors duration-300 max-w-[160px]">
                <Image 
                  src={categoryImages[category.slug]} 
                  alt={currentLanguage === 'ku' ? category.name.ku : (currentLanguage === 'kmr' ? category.name.kmr : category.name.en)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
              </div>
              
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a] dark:text-[#f5f5f5] group-hover:text-[#e11d48] transition-colors">
                {currentLanguage === 'ku' ? category.name.ku : (currentLanguage === 'kmr' ? category.name.kmr : category.name.en)}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/categories" className="text-xs font-bold tracking-widest uppercase border-b border-[#1a1a1a] dark:border-[#f5f5f5] pb-1 hover:opacity-60 transition-opacity">
            {t('buttons.viewAll') || 'View All Categories'}
          </Link>
        </div>

      </div>
    </section>
  );
}
