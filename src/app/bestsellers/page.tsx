'use client';

import { books } from '@/data/books';
import { Book } from '@/lib/types';
import BookCard from '@/components/ui/BookCard';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function BestsellersPage() {
  const { t, currentLanguage } = useLanguage();
  const bestsellerBooks = books.filter((book: Book) => book.bestseller);

  return (
    <main className="min-h-screen bg-[#F5F2E9] dark:bg-[#121212] transition-colors duration-300">
      {/* Header Section */}
      <div className="bg-[#F5F2E9] dark:bg-[#121212] border-b border-[#E5E0D5] dark:border-[#2A2A2A] pt-32 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex items-center space-x-2 text-sm tracking-widest uppercase text-[#8C8C8C] dark:text-[#A0A0A0]">
              <Link href="/" className="hover:text-[#D4AF37] transition-colors">
                {t('nav.home')}
              </Link>
              <span>/</span>
              <span className="text-[#D4AF37]">{t('sections.bestSellers')}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2C2C2C] dark:text-[#E0E0E0]">
              {t('sections.bestSellers')}
            </h1>
            
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
            
            <p className="max-w-2xl text-lg text-[#5C5C5C] dark:text-[#B0B0B0] font-serif leading-relaxed">
              {currentLanguage === 'ku' ? 'باشترین کتابە فرۆشراوەکان' : currentLanguage === 'en' ? 'Most popular and best-selling books' : 'Die beliebtesten und meistverkauften Bücher'}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-7xl px-4 py-16">
        {/* Results Count */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#E5E0D5] dark:border-[#2A2A2A]">
          <span className="text-[#5C5C5C] dark:text-[#B0B0B0] font-serif">
            {bestsellerBooks.length} {currentLanguage === 'ku' ? 'کتاب' : currentLanguage === 'en' ? 'Books' : 'Bücher'}
          </span>
        </div>

        {/* Books Grid */}
        {bestsellerBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
            {bestsellerBooks.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-6 opacity-20">📚</div>
            <h2 className="text-2xl font-serif text-[#2C2C2C] dark:text-[#E0E0E0] mb-3">
              {currentLanguage === 'ku' ? 'هیچ کتابی باشترین فرۆشراو نییە' : currentLanguage === 'en' ? 'No bestsellers' : 'Keine Bestseller'}
            </h2>
            <p className="text-[#5C5C5C] dark:text-[#B0B0B0]">
              {currentLanguage === 'ku' ? 'هێشتا کتابی باشترین فرۆشراو نییە' : currentLanguage === 'en' ? 'No bestselling books available yet' : 'Es sind noch keine Bestseller verfügbar'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}