'use client';

import { books } from '@/data/books';
import { Book } from '@/lib/types';
import BookCard from '@/components/ui/BookCard';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function NewReleasesPage() {
  const { t, currentLanguage } = useLanguage();
  const newReleaseBooks = books.filter((book: Book) => book.newRelease);

  return (
    <main className="min-h-screen bg-white transition-colors duration-300">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex items-center space-x-2 text-sm tracking-widest uppercase text-gray-500">
              <Link href="/" className="hover:text-black transition-colors">
                {t('nav.home')}
              </Link>
              <span>/</span>
              <span className="text-black">{t('sections.newReleases')}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black">
              {t('sections.newReleases')}
            </h1>
            
            <div className="w-24 h-1 bg-black mx-auto"></div>
            
            <p className="max-w-2xl text-lg text-gray-600 font-serif leading-relaxed">
              {currentLanguage === 'ku' ? 'کتابە نوێ بڵاوکراوەکان' : currentLanguage === 'en' ? 'Latest published books' : 'Die neuesten veröffentlichten Bücher'}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-7xl px-4 py-16">
        {/* Results Count */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <span className="text-gray-600 font-serif">
            {newReleaseBooks.length} {currentLanguage === 'ku' ? 'کتاب' : currentLanguage === 'en' ? 'Books' : 'Bücher'}
          </span>
        </div>

        {/* Books Grid */}
        {newReleaseBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
            {newReleaseBooks.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-6 opacity-20">📚</div>
            <h2 className="text-2xl font-serif text-black mb-3">
              {currentLanguage === 'ku' ? 'هیچ کتابی نوێ نییە' : currentLanguage === 'en' ? 'No new releases' : 'Keine Neuerscheinungen'}
            </h2>
            <p className="text-gray-600">
              {currentLanguage === 'ku' ? 'هێشتا کتابی نوێ بڵاونەکراوەتەوە' : currentLanguage === 'en' ? 'No new books have been released yet' : 'Es wurden noch keine neuen Bücher veröffentlicht'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}