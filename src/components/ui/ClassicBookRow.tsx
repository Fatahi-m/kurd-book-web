'use client';

import { Book } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';

interface ClassicBookRowProps {
  title: string;
  subtitle?: string;
  books: Book[];
  viewAllLink?: string;
}

export default function ClassicBookRow({ title, subtitle, books, viewAllLink }: ClassicBookRowProps) {
  const { t } = useLanguage();

  return (
    <section className="py-8 md:py-10 border-b border-slate-200 dark:border-[#333]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header - Minimalist & Centered */}
        <div className="flex flex-col items-center text-center mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-light text-slate-900 dark:text-[#e0e0e0] mb-2 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto italic text-xs">
              {subtitle}
            </p>
          )}
          <div className="w-8 h-[1px] bg-slate-900 dark:bg-[#e0e0e0] mt-3"></div>
        </div>

        {/* Grid - Spacious & Clean */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
          {books.slice(0, 4).map((book) => (
            <div key={book.id} className="group flex flex-col items-center text-center">
              
              {/* Cover - Enhanced with Shadow and Frame */}
              <Link href={`/book/${book.id}`} className="relative w-full aspect-[2/3] mb-3 group-hover:-translate-y-1 transition-transform duration-500 ease-out perspective-1000 max-w-[130px] mx-auto">
                {/* Realistic Shadow */}
                <div className="absolute -bottom-2 left-2 right-2 h-2 bg-black/30 blur-sm rounded-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Book Frame/Border */}
                <div className="relative w-full h-full shadow-sm group-hover:shadow-md transition-all duration-500 bg-[#fff] overflow-hidden rounded-sm border-r border-gray-200 dark:border-gray-800">
                  <Image
                    src={book.coverUrl || book.image || '/images/default-book-cover.jpg'}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                  {/* Spine Highlight */}
                  <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/20 z-10"></div>
                  {/* Subtle Sheen/Glare Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                </div>
              </Link>

              {/* Typography - Serif & Elegant */}
              <Link href={`/book/${book.id}`} className="block group-hover:opacity-70 transition-opacity">
                <h3 className="font-serif font-light text-sm md:text-base text-slate-900 dark:text-[#e0e0e0] mb-0.5 leading-tight">
                  {book.title}
                </h3>
              </Link>
              
              <p className="text-[9px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1 font-light">
                {book.author}
              </p>

              <span className="font-light text-slate-900 dark:text-[#e0e0e0] text-[10px]">
                {formatPrice(book.price)}
              </span>

            </div>
          ))}
        </div>

        {/* Footer Link */}
        {viewAllLink && (
          <div className="mt-8 text-center">
            <Link 
              href={viewAllLink}
              className="inline-block border-b border-slate-900 dark:border-[#e0e0e0] pb-0.5 text-[10px] uppercase tracking-widest text-slate-900 dark:text-[#e0e0e0] hover:opacity-60 transition-opacity"
            >
              {t('buttons.viewAll') || 'VIEW ALL'}
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}