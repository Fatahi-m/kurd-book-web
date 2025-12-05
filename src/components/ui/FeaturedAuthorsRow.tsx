'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { authors } from '@/data/books';
import { ArrowRight } from 'lucide-react';

export default function FeaturedAuthorsRow() {
  const { t, currentLanguage } = useLanguage();

  // Get first 4 authors
  const featuredAuthors = authors.slice(0, 4);

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-black font-serif">
            {t('nav.authors') || 'Featured Authors'}
          </h2>
          <p className="text-gray-500 mt-1 font-medium">
            Discover the minds behind the masterpieces
          </p>
        </div>
        <Link 
          href="/authors" 
          className="hidden md:flex text-sm font-bold text-gray-600 hover:text-black items-center gap-1 transition-colors group"
        >
          <span>{t('buttons.viewAll')}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {featuredAuthors.map((author) => (
          <Link href={`/author/${author.id}`} key={author.id} className="group flex flex-col items-center text-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg group-hover:shadow-xl group-hover:border-black transition-all duration-300 mb-4">
              {author.image ? (
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300 bg-gray-50">
                  ✒️
                </div>
              )}
            </div>
            
            <h3 className="text-lg font-bold text-black group-hover:text-gray-600 transition-colors line-clamp-1 w-full px-1 font-serif">
              {currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
            </h3>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mt-1">
              {author.genre && author.genre.length > 0 ? author.genre[0] : (t('common.author') || 'Author')}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}