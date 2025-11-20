'use client';

import { books } from '@/data/books';
import { Book } from '@/lib/types';
import BookCard from '@/components/ui/BookCard';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NewReleasesPage() {
  const { t } = useLanguage();
  const newReleaseBooks = books.filter((book: Book) => book.newRelease);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {t('sections.newReleases')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('currentLanguage') === 'ku' ? 'کتابە نوێ بڵاوکراوەکان' : t('currentLanguage') === 'en' ? 'Latest published books' : 'Die neuesten veröffentlichten Bücher'}
          </p>
          
          <div className="text-sm text-gray-600">
            {newReleaseBooks.length} {t('currentLanguage') === 'ku' ? 'کتابی نوێ' : t('currentLanguage') === 'en' ? 'new books' : 'neue Bücher'}
          </div>
        </div>

        {/* Books Grid */}
        {newReleaseBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {newReleaseBooks.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('currentLanguage') === 'ku' ? 'هیچ کتابی نوێ نییە' : t('currentLanguage') === 'en' ? 'No new releases' : 'Keine Neuerscheinungen'}
            </h2>
            <p className="text-gray-600">
              {t('currentLanguage') === 'ku' ? 'هێشتا کتابی نوێ بڵاونەکراوەتەوە' : t('currentLanguage') === 'en' ? 'No new books have been released yet' : 'Es wurden noch keine neuen Bücher veröffentlicht'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}