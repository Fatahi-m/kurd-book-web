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
    <section className="py-16 md:py-24 border-b border-[#e5e5e5] dark:border-[#333]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header - Minimalist & Centered */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2c2c2c] dark:text-[#e0e0e0] mb-4 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto italic">
              {subtitle}
            </p>
          )}
          <div className="w-16 h-[1px] bg-[#2c2c2c] dark:bg-[#e0e0e0] mt-6"></div>
        </div>

        {/* Grid - Spacious & Clean */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          {books.slice(0, 4).map((book) => (
            <div key={book.id} className="group flex flex-col items-center text-center">
              
              {/* Cover - Enhanced with Shadow and Frame */}
              <Link href={`/book/${book.id}`} className="relative w-full aspect-[2/3] mb-6 group-hover:-translate-y-3 transition-transform duration-500 ease-out">
                {/* Realistic Shadow */}
                <div className="absolute bottom-0 left-4 right-4 h-4 bg-black/40 blur-xl rounded-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Book Frame/Border */}
                <div className="relative w-full h-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-shadow duration-500 bg-[#f0f0f0] overflow-hidden border border-gray-100 dark:border-gray-800">
                  <Image
                    src={book.coverUrl || book.image || '/images/default-book-cover.jpg'}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                  {/* Subtle Sheen/Glare Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                </div>
              </Link>

              {/* Typography - Serif & Elegant */}
              <Link href={`/book/${book.id}`} className="block group-hover:opacity-70 transition-opacity">
                <h3 className="font-serif font-light text-lg md:text-xl text-[#2c2c2c] dark:text-[#e0e0e0] mb-2 leading-tight">
                  {book.title}
                </h3>
              </Link>
              
              <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 font-light">
                {book.author}
              </p>

              <span className="font-light text-[#2c2c2c] dark:text-[#e0e0e0] text-sm">
                {formatPrice(book.price)}
              </span>

            </div>
          ))}
        </div>

        {/* Footer Link */}
        {viewAllLink && (
          <div className="mt-16 text-center">
            <Link 
              href={viewAllLink}
              className="inline-block border-b border-[#2c2c2c] dark:border-[#e0e0e0] pb-1 text-sm uppercase tracking-widest text-[#2c2c2c] dark:text-[#e0e0e0] hover:opacity-60 transition-opacity"
            >
              {t('buttons.viewAll') || 'VIEW ALL COLLECTION'}
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}