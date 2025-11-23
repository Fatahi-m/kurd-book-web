'use client';

import { categories } from '@/data/books';
import { Book, Category } from '@/lib/types';
import { bookService } from '@/lib/bookService';
import BookCard from '@/components/ui/BookCard';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import MiniBookSlider from '@/components/ui/MiniBookSlider';
import HeroSlider from '@/components/ui/HeroSlider';

export default function HomePage() {
  const { t } = useLanguage();
  const [books, setBooks] = useState<Book[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [bestsellerBooks, setBestsellerBooks] = useState<Book[]>([]);
  const [newReleaseBooks, setNewReleaseBooks] = useState<Book[]>([]);
  const [discountBooks, setDiscountBooks] = useState<Book[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<'featured' | 'bestsellers' | 'newReleases'>('featured');

  useEffect(() => {
    // Load books on client side
    const allBooks = bookService.getAllBooks();
    setBooks(allBooks);
    setFeaturedBooks(bookService.getFeaturedBooks());
    setBestsellerBooks(bookService.getBestsellerBooks());
    setNewReleaseBooks(bookService.getNewReleaseBooks());
    
    // Get random books for discount slider (simulated)
    setDiscountBooks(allBooks.slice(0, 5));
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }
  };

  const getActiveBooks = () => {
    switch(activeTab) {
      case 'featured': return featuredBooks;
      case 'bestsellers': return bestsellerBooks;
      case 'newReleases': return newReleaseBooks;
      default: return [];
    }
  };

  const currentBooks = getActiveBooks();
  const topBooks = currentBooks.slice(0, 12); // Show first 12 books (approx 4 rows) next to sidebars
  const bottomBooks = currentBooks.slice(12); // Show remaining books in full width

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-300">
                <h3 className="font-bold text-lg mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">{t('nav.categories')}</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link 
                        href={`/category/${category.slug}`}
                        className="flex items-center justify-between text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 p-2 rounded transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-xl">{category.icon}</span>
                          <span className="text-sm font-medium">{t(`categories.${category.id}`)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Small Ad -> Mini Slider */}
              <div className="h-[220px]">
                <MiniBookSlider books={discountBooks} title={t('offers.special') || 'پێشنیاری تایبەت'} />
              </div>

              {/* Top Authors */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-300">
                <h3 className="font-bold text-lg mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">{t('stats.authors')}</h3>
                <div className="space-y-3">
                  {['Sherko Bekas', 'Abdulla Pashew', 'Bachtyar Ali', 'Nali'].map((author, idx) => (
                    <Link key={idx} href={`/books?search=${author}`} className="flex items-center gap-3 group">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg border border-gray-200 dark:border-gray-600">
                        👤
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 transition-colors">{author}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{Math.floor(Math.random() * 20) + 5} {t('stats.books')}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-300">
                <h3 className="font-bold text-lg mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">{t('book.tags')}</h3>
                <div className="flex flex-wrap gap-2">
                  {['Roman', 'Shiir', 'Miju', 'Mndal', 'Zanst', 'Felsefe'].map((tag, idx) => (
                    <Link 
                      key={idx} 
                      href={`/books?category=${tag.toLowerCase()}`}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Hero Slider */}
            <div className="overflow-hidden mb-8">
               <HeroSlider />
            </div>

            {/* Categories Section */}
            <section className="overflow-hidden mb-8 md:mb-12">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">{t('nav.categories')}</h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  {t('description.categories')}
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                {categories.slice(0, 8).map((category: Category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 text-center shadow-sm hover:shadow-md transition-all group border border-gray-100 dark:border-gray-700"
                  >
                    <div className="text-2xl md:text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      {t(`categories.${category.id}`)}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>

            {/* Tabbed Books Section - Top Part */}
            <section className="mb-8">
              {/* Tabs Header */}
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                <button 
                  onClick={() => setActiveTab('featured')}
                  className={`px-4 md:px-6 py-2 rounded-full font-bold text-sm md:text-base transition-all ${activeTab === 'featured' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  {t('sections.featuredBooks')}
                </button>
                <button 
                  onClick={() => setActiveTab('bestsellers')}
                  className={`px-4 md:px-6 py-2 rounded-full font-bold text-sm md:text-base transition-all ${activeTab === 'bestsellers' ? 'bg-orange-500 text-white shadow-lg scale-105' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  {t('sections.bestSellers')}
                </button>
                <button 
                  onClick={() => setActiveTab('newReleases')}
                  className={`px-4 md:px-6 py-2 rounded-full font-bold text-sm md:text-base transition-all ${activeTab === 'newReleases' ? 'bg-green-500 text-white shadow-lg scale-105' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  {t('sections.newReleases')}
                </button>
              </div>

              {/* Tab Content - Top Grid */}
              <div className="min-h-[400px] animate-fade-in">
                <div className="flex justify-between items-center mb-4 md:mb-6 px-2">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                    {activeTab === 'featured' ? t('sections.featuredBooks') : 
                     activeTab === 'bestsellers' ? t('sections.bestSellers') : 
                     t('sections.newReleases')}
                  </h2>
                  <Link
                    href={activeTab === 'featured' ? "/books?filter=featured" : activeTab === 'bestsellers' ? "/bestsellers" : "/new-releases"}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-sm"
                  >
                    <span>{t('buttons.viewAll')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {topBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="space-y-6">
              {/* Newsletter */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
                <div className="text-4xl mb-3">📧</div>
                <h3 className="font-bold text-lg mb-2">{t('footer.newsletter')}</h3>
                <p className="text-xs text-blue-100 mb-4 leading-relaxed">
                  {t('footer.newsletterDesc') || 'بۆ ئاگاداربوون لە نوێترین کتێبەکان و داشکاندنەکان، ئیمەیڵەکەت بنووسە.'}
                </p>
                {newsletterStatus === 'success' ? (
                  <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-3 text-center animate-fade-in">
                    <span className="text-2xl block mb-1">✅</span>
                    <p className="text-sm font-bold">{t('common.success') || 'سەرکەوتوو بوو!'}</p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                    <input 
                      type="email" 
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Email..." 
                      className="w-full px-3 py-2 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-white text-blue-600 font-bold py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors shadow-sm"
                    >
                      {t('footer.subscribe')}
                    </button>
                  </form>
                )}
              </div>

              {/* Ad Space -> Mini Slider */}
              <div className="h-[250px]">
                  <MiniBookSlider books={newReleaseBooks.slice(0, 5)} title={t('sections.newReleases') || 'نوێترین کتێبەکان'} />
              </div>
              {featuredBooks.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-3 text-orange-500 font-bold border-b border-gray-100 dark:border-gray-700 pb-2">
                    <span>✨</span>
                    <h3 className="text-sm">{t('sections.featuredBooks')}</h3>
                  </div>
                  <div className="relative aspect-[2/3] w-full mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-inner">
                      <Image 
                        src={featuredBooks[0].coverUrl || featuredBooks[0].image || '/images/default-book-cover.jpg'} 
                        alt={featuredBooks[0].title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white truncate text-sm">{featuredBooks[0].title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-3">{featuredBooks[0].author}</p>
                  <Link 
                    href={`/book/${featuredBooks[0].id}`}
                    className="block w-full text-center bg-gray-900 dark:bg-blue-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors"
                  >
                    {t('buttons.viewDetails')}
                  </Link>
                </div>
              )}

              {/* Reading Challenge */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-bold mb-2">Reading Challenge 2025</h3>
                <p className="text-xs text-purple-100 mb-4">
                  {t('homepage.challengeDesc') || 'Join 5000+ readers in our annual reading challenge!'}
                </p>
                <div className="w-full bg-purple-900/30 rounded-full h-2 mb-4 overflow-hidden">
                  <div className="bg-yellow-400 h-full w-3/4 rounded-full animate-pulse"></div>
                </div>
                <button className="w-full bg-white text-purple-600 py-2 rounded-lg text-sm font-bold hover:bg-purple-50 transition-colors shadow-sm">
                  {t('buttons.joinNow') || 'Join Now'}
                </button>
              </div>

              {/* Testimonials */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span>💬</span> {t('homepage.testimonials') || 'Readers Say'}
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                    <div className="flex text-yellow-400 text-xs mb-1">⭐⭐⭐⭐⭐</div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 italic mb-2">"Best collection of Kurdish books I've ever found online."</p>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">- Ahmed K.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                    <div className="flex text-yellow-400 text-xs mb-1">⭐⭐⭐⭐⭐</div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 italic mb-2">"Fast delivery and great packaging. Highly recommended!"</p>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">- Sara M.</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Full Width Books Section (Remaining Books) */}
        {bottomBooks.length > 0 && (
          <section className="mt-8 animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {bottomBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        )}

        {/* Full Width Sections */}
        <div className="mt-12 space-y-12">
          {/* Special Offers Banner */}
          <section>
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
      </div>
    </main>
  );
}