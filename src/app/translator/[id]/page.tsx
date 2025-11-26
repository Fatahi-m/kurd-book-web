'use client';

import { translators } from '@/data/books';
import { bookService } from '@/lib/bookService';
import { Book } from '@/lib/types';
import { notFound } from 'next/navigation';
import BookCard from '@/components/ui/BookCard';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

interface TranslatorDetailPageProps {
  params: {
    id: string;
  };
}

export default function TranslatorDetailPage({ params }: TranslatorDetailPageProps) {
  const { t, currentLanguage } = useLanguage();
  const [books, setBooks] = useState<Book[]>([]);
  const translator = translators.find(t => t.id === params.id);
  
  useEffect(() => {
    setBooks(bookService.getAllBooks());
  }, []);
  
  if (!translator) {
    notFound();
  }

  const translatedBooks = books.filter(book => {
    // Check if book ID is in translator's book list
    const isIdMatch = translator.books?.includes(book.id);
    
    // Check if translator name matches
    const isNameMatch = book.translator === translator.name || 
      (book.translator && book.translator.includes(translator.name));
      
    return isIdMatch || isNameMatch;
  });
  
  const totalReviews = translatedBooks.reduce((sum, book) => sum + book.reviewCount, 0);
  const averageRating = translatedBooks.length > 0 
    ? translatedBooks.reduce((sum, book) => sum + book.rating, 0) / translatedBooks.length 
    : 0;

  const booksByCategory = translatedBooks.reduce((acc, book) => {
    const category = book.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(book);
    return acc;
  }, {} as Record<string, Book[]>);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0f172a] py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">سەرەتا</Link>
          <span className="mx-2">←</span>
          <span className="text-gray-900 dark:text-white">
            {currentLanguage === 'ku' ? translator.name : (translator.latinName || translator.name)}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Translator Profile */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:space-x-8 rtl:md:space-x-reverse">
                {/* Translator Image */}
                <div className="flex-shrink-0 mb-6 md:mb-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto overflow-hidden">
                    {translator.image ? (
                      <img 
                        src={translator.image} 
                        alt={currentLanguage === 'ku' ? translator.name : (translator.latinName || translator.name)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-4xl font-bold">
                        {(currentLanguage === 'ku' ? translator.name : (translator.latinName || translator.name)).charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Translator Info */}
                <div className="flex-1 text-center md:text-right rtl:md:text-left">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {currentLanguage === 'ku' ? translator.name : (translator.latinName || translator.name)}
                  </h1>
                  
                  {/* Translator Details */}
                  <div className="flex flex-wrap justify-center md:justify-start rtl:md:justify-end gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {translator.birthYear && (
                      <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        {translator.deathYear ? `${translator.birthYear}-${translator.deathYear}` : `لەدایکبوو: ${translator.birthYear}`}
                      </span>
                    )}
                    {translator.nationality && (
                      <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        نەتەوە: {translator.nationality}
                      </span>
                    )}
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full">
                      {translatedBooks.length} وەرگێڕان
                    </span>
                  </div>

                  {/* Bio */}
                  {translator.bio?.[currentLanguage] && (
                    <div className="mb-6">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {translator.bio[currentLanguage]}
                      </p>
                    </div>
                  )}

                  {/* Languages */}
                  {translator.languages && translator.languages.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">زمانەکان:</h3>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start rtl:md:justify-end">
                        {translator.languages.map((lang, index) => (
                          <span key={index} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{translatedBooks.length}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">وەرگێڕان</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{totalReviews}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">نرخاندن</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {averageRating.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">ڕێژەی نرخاندن</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Translated Books */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  وەرگێڕانەکانی {currentLanguage === 'ku' ? translator.name : (translator.latinName || translator.name)}
                </h2>
                <span className="text-gray-600 dark:text-gray-400">{translatedBooks.length} کتاب</span>
              </div>

              {translatedBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {translatedBooks.map((book: Book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    هیچ کتابێک بەردەست نییە
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    ئێستا کتابی وەرگێڕدراوی ئەم وەرگێڕە لە کتابخانەکەماندا نییە
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-4 space-y-6">
              {/* Special Offers */}
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
                <div className="text-3xl mb-3">🔥</div>
                <h3 className="text-xl font-bold mb-2">تخفیفی تایبەت!</h3>
                <p className="text-sm mb-4 opacity-90">تا ٥٠٪ داشکاندن لەسەر کتابە هەڵبژێردراوەکان</p>
                <Link
                  href="/books?filter=discount"
                  className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block text-sm w-full text-center"
                >
                  بینینی تخفیفەکان
                </Link>
              </div>

              {/* Newsletter */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-900/30 transition-colors duration-300">
                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">
                  {currentLanguage === 'ku' ? 'ئاگاداری نوێترینەکان بە' : currentLanguage === 'de' ? 'Bleiben Sie auf dem Laufenden' : 'Stay Updated'}
                </h3>
                <p className="text-xs text-blue-600 dark:text-blue-300 mb-4">
                  {currentLanguage === 'ku' ? 'تۆمار بکە بۆ وەرگرتنی هەواڵی نوێترین کتێبەکان' : currentLanguage === 'de' ? 'Melden Sie sich an, um Neuigkeiten über die neuesten Bücher zu erhalten' : 'Subscribe to get news about the latest books'}
                </p>
                <input 
                  type="email" 
                  placeholder={currentLanguage === 'ku' ? 'ئیمەیڵەکەت بنووسە' : currentLanguage === 'de' ? 'Ihre E-Mail' : 'Your email'}
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  {currentLanguage === 'ku' ? 'تۆمارکردن' : currentLanguage === 'de' ? 'Abonnieren' : 'Subscribe'}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
