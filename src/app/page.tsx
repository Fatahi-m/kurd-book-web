'use client';

import { categories } from '@/data/books';
import { Book, Category } from '@/lib/types';
import { bookService } from '@/lib/bookService';
import BookCard from '@/components/ui/BookCard';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const { t } = useLanguage();
  const [books, setBooks] = useState<Book[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [bestsellerBooks, setBestsellerBooks] = useState<Book[]>([]);
  const [newReleaseBooks, setNewReleaseBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Load books on client side
    const allBooks = bookService.getAllBooks();
    setBooks(allBooks);
    setFeaturedBooks(bookService.getFeaturedBooks());
    setBestsellerBooks(bookService.getBestsellerBooks());
    setNewReleaseBooks(bookService.getNewReleaseBooks());
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Ad Space - Visible on Large Screens */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg h-[600px] flex flex-col items-center justify-center text-gray-400 p-4">
                <span className="text-4xl mb-2">📢</span>
                <span className="text-center font-medium">شوێنی ریکلام</span>
                <span className="text-xs text-center mt-2">(Ad Space)</span>
              </div>
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg h-[600px] flex flex-col items-center justify-center text-gray-400 p-4 mt-4">
                <span className="text-4xl mb-2">📢</span>
                <span className="text-center font-medium">شوێنی ریکلام</span>
                <span className="text-xs text-center mt-2">(Ad Space)</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-10 md:py-16 rounded-2xl mb-8 shadow-lg">
              <div className="px-4 md:px-8 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="48" height="48" rx="12" fill="#fff" fillOpacity="0.08"/>
                      <path d="M12 36V14a2 2 0 012-2h20a2 2 0 012 2v22M12 36h24M12 36v2a2 2 0 002 2h20a2 2 0 002-2v-2" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round"/>
                      <path d="M16 18h16M16 24h16M16 30h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight drop-shadow-lg">
                    {t('homepage.welcome')}
                  </h1>
                  <p className="text-lg md:text-2xl mb-2 md:mb-4 text-blue-100 font-medium">
                    {t('homepage.subtitle')}
                  </p>
                  <p className="text-base md:text-lg mb-6 md:mb-8 text-blue-200 font-light max-w-2xl mx-auto">
                    {t('homepage.inspiration')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
                    <Link
                      href="/books"
                      className="bg-gradient-to-r from-blue-500 to-orange-400 text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-orange-500 transition-all duration-200"
                    >
                      {t('nav.books')}
                    </Link>
                    <Link
                      href="/category/literature"
                      className="border-2 border-white text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-700 transition-all duration-200"
                    >
                      {t('nav.categories')}
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Categories Section */}
            <section className="mb-8 md:mb-12">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('nav.categories')}</h2>
                <p className="text-sm md:text-base text-gray-600">
                  {t('description.categories')}
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                {categories.slice(0, 8).map((category: Category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="bg-white rounded-lg p-3 md:p-4 text-center shadow-sm hover:shadow-md transition-all group border border-gray-100"
                  >
                    <div className="text-2xl md:text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {t(`categories.${category.id}`)}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>

            {/* Featured Books Section */}
            {featuredBooks.length > 0 && (
              <section className="mb-8 md:mb-12">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">{t('sections.featuredBooks')}</h2>
                  <Link
                    href="/books?filter=featured"
                    className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-sm"
                  >
                    <span>{t('buttons.viewAll')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {featuredBooks.slice(0, 6).map((book: Book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </section>
            )}

            {/* Best Sellers Section */}
            {bestsellerBooks.length > 0 && (
              <section className="mb-8 md:mb-12">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">{t('sections.bestSellers')}</h2>
                  <Link
                    href="/bestsellers"
                    className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-sm"
                  >
                    <span>{t('buttons.viewAll')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {bestsellerBooks.slice(0, 6).map((book: Book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </section>
            )}

            {/* New Releases Section */}
            {newReleaseBooks.length > 0 && (
              <section className="mb-8 md:mb-12">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">{t('sections.newReleases')}</h2>
                  <Link
                    href="/new-releases"
                    className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-sm"
                  >
                    <span>{t('buttons.viewAll')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {newReleaseBooks.slice(0, 6).map((book: Book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </section>
            )}

            {/* Special Offers Banner */}
            <section className="mb-8 md:mb-12">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 md:p-8 text-white text-center shadow-lg">
                <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">{t('sections.specialOffers')}</h2>
                <p className="text-base md:text-lg mb-4 md:mb-6">{t('offers.discount')}</p>
                <Link
                  href="/books?filter=discount"
                  className="bg-white text-orange-600 px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block text-sm md:text-base"
                >
                  {t('offers.viewOffers')}
                </Link>
              </div>
            </section>

            {/* Statistics Section */}
            <section className="bg-gray-800 text-white rounded-xl p-6 md:p-8 shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">1000+</div>
                  <div className="text-xs md:text-sm text-gray-300">{t('stats.books')}</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">500+</div>
                  <div className="text-xs md:text-sm text-gray-300">{t('stats.authors')}</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">50+</div>
                  <div className="text-xs md:text-sm text-gray-300">{t('stats.publishers')}</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-red-400 mb-1">10000+</div>
                  <div className="text-xs md:text-sm text-gray-300">{t('stats.customers')}</div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Ad Space - Visible on Large Screens */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg h-[600px] flex flex-col items-center justify-center text-gray-400 p-4">
                <span className="text-4xl mb-2">📢</span>
                <span className="text-center font-medium">شوێنی ریکلام</span>
                <span className="text-xs text-center mt-2">(Ad Space)</span>
              </div>
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg h-[600px] flex flex-col items-center justify-center text-gray-400 p-4 mt-4">
                <span className="text-4xl mb-2">📢</span>
                <span className="text-center font-medium">شوێنی ریکلام</span>
                <span className="text-xs text-center mt-2">(Ad Space)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}