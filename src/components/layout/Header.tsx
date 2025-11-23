'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import MobileMenu from '@/components/ui/MobileMenu';
import { bookService } from '@/lib/bookService';
import { Book } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { getCartItemCount } = useCart();
  const { getWishlistItemCount } = useWishlist();
  const { t, dir, currentLanguage } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isRTL = currentLanguage === 'ku';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 1) {
      const results = bookService.searchBooks(query);
      setSearchResults(results.slice(0, 5));
      setIsSearching(true);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileSearchOpen(false);
      setIsSearching(false);
    }
  };

  return (
    <header className="relative bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      {/* Info Bar */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white text-xs md:text-sm py-2 px-4 flex justify-center items-center font-medium">
        <span>🎉 ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان | تخفیف ویژه پاییزه تا ۳۰٪</span>
      </div>
      <div className="relative z-10">
        {/* Top Bar - Logo and Language Switcher for Mobile */}
        <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-2">
            <div className="flex justify-between items-center text-sm">
              {/* Desktop Contact Info */}
              <div className="hidden sm:flex items-center space-x-4 rtl:space-x-reverse">
                <span className="text-gray-600 dark:text-gray-300">📞 +964 750 123 4567</span>
                <span className="text-gray-600 dark:text-gray-300 hidden md:inline">✉️ info@kurdbook.com</span>
              </div>
              {/* Mobile Logo and Site Name */}
              <div className="sm:hidden flex items-center space-x-2 rtl:space-x-reverse">
                <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">ک</span>
                  </div>
                  <div>
                    <h1 className="text-sm font-bold text-gray-800 dark:text-white">{t('site.title')}</h1>
                  </div>
                </Link>
              </div>
              {/* Language Switcher and Theme Toggle */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === 'light' ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </button>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
          {/* Mobile: Menu Button and Free Shipping */}
          <div className="lg:hidden flex items-center space-x-3 rtl:space-x-reverse">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <span className="text-xs text-blue-600 font-semibold">
              {currentLanguage === 'ku' ? 'گەیاندنی خۆڕایی' : currentLanguage === 'en' ? 'Free Shipping' : 'Kostenloser Versand'} 🚚
            </span>
          </div>

          {/* Desktop Logo */}
          <Link href="/" className="hidden lg:flex items-center space-x-2 md:space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">ک</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white transition-colors">{t('site.title')}</h1>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 hidden md:block transition-colors">{t('site.description')}</p>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <div className="relative">
                <input
                  name="search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery.trim().length > 1 && setIsSearching(true)}
                  placeholder={t('search.placeholder')}
                  className="w-full px-4 py-3 pr-12 rtl:pr-4 rtl:pl-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                  autoComplete="off"
                />
                <button 
                  type="submit"
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {/* Live Search Results */}
              {isSearching && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                  <ul>
                    {searchResults.map((book) => (
                      <li key={book.id}>
                        <Link 
                          href={`/book/${book.id}`}
                          onClick={() => setIsSearching(false)}
                          className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
                        >
                          <div className="w-12 h-16 bg-gray-100 dark:bg-gray-700 rounded flex-shrink-0 overflow-hidden">
                            {book.coverUrl || book.image ? (
                              <img src={book.coverUrl || book.image} alt={book.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xl">📚</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">{book.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{book.author}</p>
                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">{formatPrice(book.price)}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleSearchSubmit}
                        className="w-full text-center py-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        {currentLanguage === 'ku' ? 'بینینی هەموو ئەنجامەکان' : currentLanguage === 'en' ? 'View all results' : 'Alle Ergebnisse anzeigen'}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 md:space-x-4 rtl:space-x-reverse">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link href="/wishlist" className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 rounded transition relative">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {getWishlistItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 rtl:-right-auto rtl:-left-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-md border-2 border-white dark:border-gray-900">
                  {getWishlistItemCount()}
                </span>
              )}
            </Link>
            
            <Link href="/cart" className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 rounded transition relative">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.39.39-.586.876-.586 1.414V17a1 1 0 001 1h14M7 13v4a1 1 0 001 1h2m3-5a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 rtl:-right-auto rtl:-left-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-md border-2 border-white dark:border-gray-900">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group dropdown-container">
                <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs md:text-sm font-medium">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <span className="hidden md:inline text-sm">{user?.firstName}</span>
                </button>
                
                {/* User Dropdown */}
                <div className={`absolute mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
                  isRTL ? 'left-0' : 'right-0'
                }`}>
                  <div className="py-1">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                      {t('auth.profile')}
                    </Link>
                    <Link href="/profile?tab=orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                      {t('auth.orders')}
                    </Link>
                    <Link href="/profile?tab=favorites" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                      {t('auth.favorites')}
                    </Link>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <Link href="/admin/login" className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 flex items-center space-x-2 rtl:space-x-reverse">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{t('admin.panel')}</span>
                    </Link>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button 
                      onClick={() => logout()}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      {t('auth.logout')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 rounded transition">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="lg:hidden mt-3 pb-3 px-4">
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const query = formData.get('search') as string;
              if (query.trim()) {
                router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                setIsMobileSearchOpen(false);
              }
            }}>
              <div className="relative">
                <input
                  name="search"
                  type="text"
                  placeholder={t('search.placeholder')}
                  className="w-full px-4 py-2 pr-10 rtl:pr-4 rtl:pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-blue-600 dark:bg-blue-800 text-white transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 dropdown-container">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center space-x-8 rtl:space-x-reverse">
              <Link href="/" className="py-4 px-2 font-semibold hover:bg-blue-700 dark:hover:bg-blue-900 rounded transition">
                {t('nav.home')}
              </Link>
              <Link href="/about" className="py-4 px-2 font-semibold hover:bg-blue-700 dark:hover:bg-blue-900 rounded transition">
                {t('nav.about')}
              </Link>
              <div className="relative group dropdown-container">
                <button className="py-4 px-2 font-semibold hover:bg-blue-700 dark:hover:bg-blue-900 rounded transition flex items-center space-x-1 rtl:space-x-reverse">
                  <span>{t('nav.categories')}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 rtl:left-auto rtl:right-0 w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 rounded-md border border-gray-200 dark:border-gray-700">
                  <div className="py-2">
                    <Link href="/category/literature" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">📚 {t('categories.literature')}</Link>
                    <Link href="/category/poetry" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">✍️ {t('categories.poetry')}</Link>
                    <Link href="/category/history" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">🏛️ {t('categories.history')}</Link>
                    <Link href="/category/children" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">🧸 {t('categories.children')}</Link>
                    <Link href="/category/education" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">🎓 {t('categories.education')}</Link>
                    <Link href="/category/science" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">🔬 {t('categories.science')}</Link>
                  </div>
                </div>
              </div>
              <Link href="/books" className="py-4 px-2 font-semibold hover:bg-blue-700 dark:hover:bg-blue-900 rounded transition">
                {t('nav.books')}
              </Link>
              <Link href="/authors" className="py-4 px-2 font-semibold hover:bg-blue-700 dark:hover:bg-blue-900 rounded transition">
                {t('nav.authors')}
              </Link>
              <Link href="/bestsellers" className="py-4 px-2 font-semibold hover:bg-blue-700 dark:hover:bg-blue-900 rounded transition">
                {t('sections.bestSellers')}
              </Link>
              <Link href="/new-releases" className="py-4 px-2 font-semibold hover:bg-blue-700 dark:hover:bg-blue-900 rounded transition">
                {t('sections.newReleases')}
              </Link>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-sm">🚚 {currentLanguage === 'ku' ? 'گەیاندنی خۆڕایی' : currentLanguage === 'en' ? 'Free Shipping' : 'Kostenloser Versand'}</span>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <div className="flex items-center justify-center py-3">
              <span className="text-sm font-medium">{t('nav.categories')}</span>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
