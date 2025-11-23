'use client';

import { authors } from '@/data/books';
import { bookService } from '@/lib/bookService';
import { Author, Book } from '@/lib/types';
import { notFound } from 'next/navigation';
import BookCard from '@/components/ui/BookCard';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

interface AuthorDetailPageProps {
  params: {
    id: string;
  };
}

export default function AuthorDetailPage({ params }: AuthorDetailPageProps) {
  const { t, currentLanguage } = useLanguage();
  const [books, setBooks] = useState<Book[]>([]);
  const author = authors.find(a => a.id === params.id);
  
  useEffect(() => {
    setBooks(bookService.getAllBooks());
  }, []);
  
  if (!author) {
    notFound();
  }

  const authorBooks = books.filter(book => book.author === author.name);
  const totalReviews = authorBooks.reduce((sum, book) => sum + book.reviewCount, 0);
  const averageRating = authorBooks.length > 0 
    ? authorBooks.reduce((sum, book) => sum + book.rating, 0) / authorBooks.length 
    : 0;

  const booksByCategory = authorBooks.reduce((acc, book) => {
    const category = book.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(book);
    return acc;
  }, {} as Record<string, Book[]>);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">سەرەتا</Link>
          <span className="mx-2">←</span>
          <Link href="/authors" className="hover:text-blue-600 dark:hover:text-blue-400">نووسەران</Link>
          <span className="mx-2">←</span>
          <span className="text-gray-900 dark:text-white">
            {currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Author Profile */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:space-x-8 rtl:md:space-x-reverse">
                {/* Author Image */}
                <div className="flex-shrink-0 mb-6 md:mb-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto overflow-hidden">
                    {author.image ? (
                      <img 
                        src={author.image} 
                        alt={currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-4xl font-bold">
                        {(currentLanguage === 'ku' ? author.name : (author.latinName || author.name)).charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex-1 text-center md:text-right rtl:md:text-left">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
                  </h1>
                  
                  {/* Author Details */}
                  <div className="flex flex-wrap justify-center md:justify-start rtl:md:justify-end gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {author.birthYear && (
                      <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        {author.deathYear ? `${author.birthYear}-${author.deathYear}` : `لەدایکبوو: ${author.birthYear}`}
                      </span>
                    )}
                    {author.nationality && (
                      <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        نەتەوە: {author.nationality}
                      </span>
                    )}
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full">
                      {authorBooks.length} کتاب
                    </span>
                  </div>

                  {/* Bio */}
                  {author.bio?.[currentLanguage] && (
                    <div className="mb-6">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {author.bio[currentLanguage]}
                      </p>
                    </div>
                  )}

                  {/* Genre */}
                  {author.genre && author.genre.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">بوارەکانی نووسین:</h3>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start rtl:md:justify-end">
                        {author.genre.map((g, index) => (
                          <span key={index} className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Awards */}
                  {author.awards && author.awards.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">خەڵاتەکان:</h3>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start rtl:md:justify-end">
                        {author.awards.map((award, index) => (
                          <span key={index} className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-sm">
                            🏆 {award}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{authorBooks.length}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">کتاب</div>
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

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      دوای نووسەر بکەوە
                    </button>
                    <button className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 font-medium">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      هاوبەشی بکە
                    </button>
                  </div>

                  {/* Social Media Links */}
                  {/* Social Media Links */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">بەستەرەکانی کۆمەڵایەتی:</h3>
                    <div className="flex gap-3 justify-center md:justify-start rtl:md:justify-end">
                      <a
                        href="#"
                        className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-gray-600 dark:text-gray-400"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-gray-600 dark:text-gray-400"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-gray-600 dark:text-gray-400"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Author's Books */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  کتابەکانی {currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
                </h2>
                <span className="text-gray-600 dark:text-gray-400">{authorBooks.length} کتاب</span>
              </div>

              {authorBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {authorBooks.map((book: Book) => (
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
                    ئێستا کتابی ئەم نووسەرە لە کتابخانەکەماندا نییە
                  </p>
                </div>
              )}
            </div>

            {/* Books by Category */}
            {Object.keys(booksByCategory).length > 1 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 transition-colors duration-300">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">کتابەکان بەپێی پۆل</h2>
                
                <div className="space-y-8">
                  {Object.entries(booksByCategory).map(([category, categoryBooks]) => (
                    <div key={category}>
                      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm mr-3 rtl:mr-0 rtl:ml-3">
                          {categoryBooks.length}
                        </span>
                        {category}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categoryBooks.map((book: Book) => (
                          <Link
                            key={book.id}
                            href={`/book/${book.id}`}
                            className="flex items-center space-x-3 rtl:space-x-reverse p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <div className="w-12 h-16 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-xl text-gray-400 dark:text-gray-500">📚</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-800 dark:text-white truncate">{book.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{book.publisher}</p>
                              <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                {formatPrice(book.price)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">کاتی بڵاوکردنەوە</h2>
              
              <div className="space-y-4">
                {authorBooks
                  .sort((a, b) => new Date(b.publishedDate || '').getTime() - new Date(a.publishedDate || '').getTime())
                  .map((book: Book) => (
                    <Link
                      key={book.id}
                      href={`/book/${book.id}`}
                      className="flex items-center space-x-4 rtl:space-x-reverse p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800 dark:text-white">{book.title}</h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {book.publishedDate ? new Date(book.publishedDate).getFullYear() : 'N/A'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {book.description.substring(0, 100)}...
                        </p>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse mt-2">
                          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                            {formatPrice(book.price)}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ⭐ {book.rating} ({book.reviewCount})
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar: تبلیغات و پیشنهادات */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-4 space-y-6">
              {/* Special Offers */}
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
                <div className="text-3xl mb-3">🔥</div>
                <h3 className="text-xl font-bold mb-2">تخفیفی تایبەت!</h3>
                <p className="text-sm mb-4 opacity-90">تا ٥٠٪ داشکاندن لەسەر کتابە هەڵبژێردراوەکان</p>
                <Link
                  href="/books?filter=discount"
                  className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block text-sm"
                >
                  بینینی تخفیفەکان
                </Link>
              </div>

              {/* Recommended Books */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors duration-300">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <span>⭐</span>
                  کتابی پێشنیارکراو
                </h3>
                <div className="space-y-4">
                  {books.slice(0, 3).map((book: Book) => (
                    <Link
                      key={book.id}
                      href={`/book/${book.id}`}
                      className="flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                    >
                      <div className="w-16 h-20 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📚</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-800 dark:text-white truncate">{book.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{book.author}</p>
                        <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">{formatPrice(book.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
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

        {/* Mobile Sidebar */}
        <div className="lg:hidden mt-8 space-y-6">
          {/* Special Offers */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
            <div className="text-3xl mb-3">🔥</div>
            <h3 className="text-xl font-bold mb-2">تخفیفی تایبەت!</h3>
            <p className="text-sm mb-4 opacity-90">تا ٥٠٪ داشکاندن لەسەر کتابە هەڵبژێردراوەکان</p>
            <Link
              href="/books?filter=discount"
              className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block text-sm"
            >
              بینینی تخفیفەکان
            </Link>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/contact" className="bg-white dark:bg-gray-800 rounded-lg h-[120px] flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 p-2 shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-2xl mb-2">📞</span>
              <span className="text-center font-medium text-xs">{currentLanguage === 'ku' ? 'پەیوەندی' : 'Contact'}</span>
            </Link>
            <Link href="/bestsellers" className="bg-blue-50 dark:bg-blue-900/20 rounded-lg h-[120px] flex flex-col items-center justify-center text-blue-600 dark:text-blue-300 p-2 shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-2xl mb-2">🏆</span>
              <span className="text-center font-medium text-xs">{currentLanguage === 'ku' ? 'باشترینەکان' : 'Bestsellers'}</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}