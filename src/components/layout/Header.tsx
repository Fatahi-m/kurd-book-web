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
    <header className="relative bg-[#F5F2E9] dark:bg-[#121212] shadow-sm border-b border-[#e5e5e5] dark:border-[#333] transition-colors duration-300 font-serif">
      {/* Info Bar - REMOVED as we have the Ticker now, or keep as secondary? User asked for Ticker. I will keep it but style it minimal */}
      {/* Actually, the user asked for the ticker to be the main thing. I will hide this top bar or make it very subtle. */}
      
      <div className="relative z-10">
        {/* Top Bar - Logo and Language Switcher for Mobile */}
        <div className="bg-[#F5F2E9] dark:bg-[#121212] border-b border-[#e5e5e5] dark:border-[#333] transition-colors duration-300">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-2">
            <div className="flex justify-between items-center text-sm">
              {/* Desktop Contact Info */}
              <div className="hidden sm:flex items-center space-x-4 rtl:space-x-reverse">
                <span className="text-[#2c2c2c] dark:text-[#e0e0e0] font-light tracking-wider">📞 +964 750 123 4567</span>
                <span className="text-[#2c2c2c] dark:text-[#e0e0e0] hidden md:inline font-light tracking-wider">✉️ info@kurdbook.com</span>
              </div>
              {/* Mobile Logo and Site Name */}
              <div className="sm:hidden flex items-center space-x-2 rtl:space-x-reverse">
                <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-[#2c2c2c] rounded-none flex items-center justify-center">
                    <span className="text-[#F5F2E9] font-serif font-bold text-sm">K</span>
                  </div>
                  <div>
                    <h1 className="text-sm font-serif font-bold text-[#2c2c2c] dark:text-[#e0e0e0] tracking-widest uppercase">{t('site.title')}</h1>
                  </div>
                </Link>
              </div>
              {/* Language Switcher and Theme Toggle */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-full text-[#2c2c2c] dark:text-[#e0e0e0] hover:bg-[#e5e5e5] dark:hover:bg-[#333] transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === 'light' ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </button>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex items-center justify-between">
          {/* Mobile: Menu Button and Free Shipping */}
          <div className="lg:hidden flex items-center space-x-3 rtl:space-x-reverse">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-[#2c2c2c] dark:text-[#e0e0e0] hover:bg-[#e5e5e5] dark:hover:bg-[#333] transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Logo */}
          <Link href="/" className="hidden lg:flex items-center space-x-3 md:space-x-4 rtl:space-x-reverse group">
            <div className="w-12 h-12 bg-[#2c2c2c] dark:bg-[#e0e0e0] rounded-none flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
              <span className="text-[#F5F2E9] dark:text-[#121212] font-serif font-bold text-2xl">K</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#2c2c2c] dark:text-[#e0e0e0] tracking-[0.2em] uppercase">{t('site.title')}</h1>
              <p className="text-xs text-[#666] dark:text-[#aaa] hidden md:block tracking-[0.3em] uppercase mt-1">{t('site.description')}</p>
            </div>
          </Link>

          {/* Desktop Search Bar - Minimalist */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-12" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <div className="relative group">
                <input
                  name="search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery.trim().length > 1 && setIsSearching(true)}
                  placeholder={t('search.placeholder')}
                  className="w-full px-0 py-2 pr-8 rtl:pr-0 rtl:pl-8 border-b-2 border-[#2c2c2c] dark:border-[#e0e0e0] focus:outline-none bg-transparent text-[#2c2c2c] dark:text-[#e0e0e0] placeholder-gray-400 transition-all font-serif text-lg"
                  autoComplete="off"
                />
                <button 
                  type="submit"
                  className="absolute right-0 rtl:right-auto rtl:left-0 top-1/2 transform -translate-y-1/2 text-[#2c2c2c] dark:text-[#e0e0e0] opacity-50 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {/* Live Search Results */}
              {isSearching && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-[#F5F2E9] dark:bg-[#1a1a1a] shadow-2xl border border-[#e5e5e5] dark:border-[#333] z-50">
                  <ul>
                    {searchResults.map((book) => (
                      <li key={book.id}>
                        <Link 
                          href={`/book/${book.id}`}
                          onClick={() => setIsSearching(false)}
                          className="flex items-center gap-4 p-4 hover:bg-[#e5e5e5] dark:hover:bg-[#333] transition-colors border-b border-[#e5e5e5] dark:border-[#333] last:border-0"
                        >
                          <div className="w-10 h-14 bg-gray-200 dark:bg-gray-700 flex-shrink-0 overflow-hidden shadow-sm">
                            {book.coverUrl || book.image ? (
                              <img src={book.coverUrl || book.image} alt={book.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs">📚</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-sm text-[#2c2c2c] dark:text-[#e0e0e0] truncate">{book.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate uppercase tracking-wider">{book.author}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4 md:space-x-6 rtl:space-x-reverse">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="lg:hidden p-2 text-[#2c2c2c] dark:text-[#e0e0e0]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link href="/wishlist" className="p-2 text-[#2c2c2c] dark:text-[#e0e0e0] hover:opacity-70 transition relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {getWishlistItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 bg-[#2c2c2c] text-[#F5F2E9] text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {getWishlistItemCount()}
                </span>
              )}
            </Link>
            
            <Link href="/cart" className="p-2 text-[#2c2c2c] dark:text-[#e0e0e0] hover:opacity-70 transition relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.39.39-.586.876-.586 1.414V17a1 1 0 001 1h14M7 13v4a1 1 0 001 1h2m3-5a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 bg-[#2c2c2c] text-[#F5F2E9] text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group dropdown-container">
                <button className="p-2 text-[#2c2c2c] dark:text-[#e0e0e0] hover:opacity-70 flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-[#2c2c2c] dark:bg-[#e0e0e0] rounded-full flex items-center justify-center">
                    <span className="text-[#F5F2E9] dark:text-[#121212] text-xs font-medium">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </span>
                  </div>
                </button>
                
                {/* User Dropdown */}
                <div className={`absolute mt-2 w-48 bg-[#F5F2E9] dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#333] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
                  isRTL ? 'left-0' : 'right-0'
                }`}>
                  <div className="py-1">
                    <Link href="/profile" className="block px-4 py-3 text-sm text-[#2c2c2c] dark:text-[#e0e0e0] hover:bg-[#e5e5e5] dark:hover:bg-[#333] font-serif">
                      {t('auth.profile')}
                    </Link>
                    <Link href="/profile?tab=orders" className="block px-4 py-3 text-sm text-[#2c2c2c] dark:text-[#e0e0e0] hover:bg-[#e5e5e5] dark:hover:bg-[#333] font-serif">
                      {t('auth.orders')}
                    </Link>
                    <Link href="/admin" className="block px-4 py-3 text-sm text-[#2c2c2c] dark:text-[#e0e0e0] hover:bg-[#e5e5e5] dark:hover:bg-[#333] font-serif">
                      {t('admin.panel')}
                    </Link>
                    <hr className="my-1 border-[#e5e5e5] dark:border-[#333]" />
                    <button 
                      onClick={() => logout()}
                      className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-serif"
                    >
                      {t('auth.logout')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="p-2 text-[#2c2c2c] dark:text-[#e0e0e0] hover:opacity-70 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="lg:hidden mt-3 pb-6 px-4">
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
                  className="w-full px-0 py-2 border-b border-[#2c2c2c] dark:border-[#e0e0e0] bg-transparent focus:outline-none text-[#2c2c2c] dark:text-[#e0e0e0] font-serif"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
        </div>
      </div>

      {/* Navigation Menu - Minimalist Centered */}
      <nav className="bg-[#2c2c2c] dark:bg-[#000] text-[#F5F2E9] transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 dropdown-container">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="flex items-center space-x-12 rtl:space-x-reverse">
              <Link href="/" className="py-4 text-sm font-serif tracking-widest uppercase hover:text-[#c5a47e] transition-colors">
                {t('nav.home')}
              </Link>
              <Link href="/about" className="py-4 text-sm font-serif tracking-widest uppercase hover:text-[#c5a47e] transition-colors">
                {t('nav.about')}
              </Link>
              <div className="relative group dropdown-container">
                <button className="py-4 text-sm font-serif tracking-widest uppercase hover:text-[#c5a47e] transition-colors flex items-center space-x-1 rtl:space-x-reverse">
                  <span>{t('nav.categories')}</span>
                </button>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-64 bg-[#2c2c2c] text-[#F5F2E9] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border-t-2 border-[#c5a47e]">
                  <div className="py-4">
                    <Link href="/category/literature" className="block px-6 py-3 hover:bg-[#3d3d3d] text-sm font-serif tracking-wider">{t('categories.literature')}</Link>
                    <Link href="/category/poetry" className="block px-6 py-3 hover:bg-[#3d3d3d] text-sm font-serif tracking-wider">{t('categories.poetry')}</Link>
                    <Link href="/category/history" className="block px-6 py-3 hover:bg-[#3d3d3d] text-sm font-serif tracking-wider">{t('categories.history')}</Link>
                    <Link href="/category/children" className="block px-6 py-3 hover:bg-[#3d3d3d] text-sm font-serif tracking-wider">{t('categories.children')}</Link>
                  </div>
                </div>
              </div>
              <Link href="/books" className="py-4 text-sm font-serif tracking-widest uppercase hover:text-[#c5a47e] transition-colors">
                {t('nav.books')}
              </Link>
              <Link href="/authors" className="py-4 text-sm font-serif tracking-widest uppercase hover:text-[#c5a47e] transition-colors">
                {t('nav.authors')}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
