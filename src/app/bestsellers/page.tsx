'use client';

import { books } from '@/data/books';
import { Book } from '@/lib/types';
import BookCard from '@/components/ui/BookCard';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BestsellersPage() {
  const { t } = useLanguage();
  const bestsellerBooks = books.filter((book: Book) => book.bestseller);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {t('sections.bestSellers')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('currentLanguage') === 'ku' ? 'باشترین کتابە فرۆشراوەکان' : t('currentLanguage') === 'en' ? 'Most popular and best-selling books' : 'Die beliebtesten und meistverkauften Bücher'}
          </p>
          
          <div className="text-sm text-gray-600">
            {bestsellerBooks.length} {t('currentLanguage') === 'ku' ? 'کتابی باشترین فرۆشراو' : t('currentLanguage') === 'en' ? 'bestselling books' : 'Bestseller-Bücher'}
          </div>
        </div>

        {/* Books Grid */}
        {bestsellerBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {bestsellerBooks.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('currentLanguage') === 'ku' ? 'هیچ کتابی باشترین فرۆشراو نییە' : t('currentLanguage') === 'en' ? 'No bestsellers' : 'Keine Bestseller'}
            </h2>
            <p className="text-gray-600">
              {t('currentLanguage') === 'ku' ? 'هێشتا کتابی باشترین فرۆشراو نییە' : t('currentLanguage') === 'en' ? 'No bestselling books available yet' : 'Es sind noch keine Bestseller verfügbar'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}