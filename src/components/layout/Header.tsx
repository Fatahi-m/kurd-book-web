'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import MobileMenu from '@/components/ui/MobileMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const router = useRouter();
  const { getCartItemCount } = useCart();
  const { getWishlistItemCount } = useWishlist();
  const { t, dir, currentLanguage } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const isRTL = currentLanguage === 'ku';



  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      {/* Top Bar - Logo and Language Switcher for Mobile */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            {/* Desktop Contact Info */}
            <div className="hidden sm:flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-gray-600">📞 +964 750 123 4567</span>
              <span className="text-gray-600 hidden md:inline">✉️ info@kurdbook.com</span>
            </div>
            
            {/* Mobile Logo and Site Name */}
            <div className="sm:hidden flex items-center space-x-2 rtl:space-x-reverse">
              <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ک</span>
                </div>
                <div>
                  <h1 className="text-sm font-bold text-gray-800">{t('site.title')}</h1>
                </div>
              </Link>
            </div>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Mobile: Menu Button and Free Shipping */}
          <div className="lg:hidden flex items-center space-x-3 rtl:space-x-reverse">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <span className="text-xs text-gray-600">
              {currentLanguage === 'ku' ? 'گەیاندنی خۆڕایی' : currentLanguage === 'en' ? 'Free Shipping' : 'Kostenloser Versand'} 🚚
            </span>
          </div>

          {/* Desktop Logo */}
          <Link href="/" className="hidden lg:flex items-center space-x-2 md:space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">ک</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">{t('site.title')}</h1>
              <p className="text-xs md:text-sm text-gray-600 hidden md:block">{t('site.description')}</p>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const query = formData.get('search') as string;
              if (query.trim()) {
                router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                setIsMobileSearchOpen(false);
              }
            }} className="w-full">
              <div className="relative">
                <input
                  name="search"
                  type="text"
                  placeholder={t('search.placeholder')}
                  className="w-full px-4 py-3 pr-12 rtl:pr-4 rtl:pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                  type="submit"
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 md:space-x-4 rtl:space-x-reverse">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link href="/wishlist" className="p-2 text-gray-600 hover:text-gray-800 relative">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {getWishlistItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center text-[10px] md:text-xs">
                  {getWishlistItemCount()}
                </span>
              )}
            </Link>
            
            <Link href="/cart" className="p-2 text-gray-600 hover:text-gray-800 relative">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.39.39-.586.876-.586 1.414V17a1 1 0 001 1h14M7 13v4a1 1 0 001 1h2m3-5a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center text-[10px] md:text-xs">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group dropdown-container">
                <button className="p-2 text-gray-600 hover:text-gray-800 flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs md:text-sm font-medium">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <span className="hidden md:inline text-sm">{user?.firstName}</span>
                </button>
                
                {/* User Dropdown */}
                <div className={`absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${isRTL ? 'left-0' : 'right-0'}`}>
                  <div className="py-1">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      {t('auth.profile')}
                    </Link>
                    <Link href="/profile?tab=orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      {t('auth.orders')}
                    </Link>
                    <Link href="/profile?tab=favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      {t('auth.favorites')}
                    </Link>
                    <hr className="my-1" />
                    <Link href="/admin/login" className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center space-x-2 rtl:space-x-reverse">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{t('admin.panel')}</span>
                    </Link>
                    <hr className="my-1" />
                    <button 
                      onClick={() => logout()}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      {t('auth.logout')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="p-2 text-gray-600 hover:text-gray-800">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="lg:hidden mt-3 pb-3">
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
                  className="w-full px-4 py-2 pr-10 rtl:pr-4 rtl:pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

      {/* Navigation Menu */}
      <nav className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 dropdown-container">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center space-x-8 rtl:space-x-reverse">
              <Link href="/" className="py-4 px-2 hover:bg-blue-700 transition-colors">
                {t('nav.home')}
              </Link>
              <div className="relative group dropdown-container">
                <button className="py-4 px-2 hover:bg-blue-700 transition-colors flex items-center space-x-1 rtl:space-x-reverse">
                  <span>{t('nav.categories')}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 rtl:left-auto rtl:right-0 w-64 bg-white text-gray-800 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 rounded-md border border-gray-200">
                  <div className="py-2">
                    <Link href="/category/literature" className="block px-4 py-2 hover:bg-gray-50">📚 {t('categories.literature')}</Link>
                    <Link href="/category/poetry" className="block px-4 py-2 hover:bg-gray-50">✍️ {t('categories.poetry')}</Link>
                    <Link href="/category/history" className="block px-4 py-2 hover:bg-gray-50">🏛️ {t('categories.history')}</Link>
                    <Link href="/category/children" className="block px-4 py-2 hover:bg-gray-50">🧸 {t('categories.children')}</Link>
                    <Link href="/category/education" className="block px-4 py-2 hover:bg-gray-50">🎓 {t('categories.education')}</Link>
                    <Link href="/category/science" className="block px-4 py-2 hover:bg-gray-50">🔬 {t('categories.science')}</Link>
                  </div>
                </div>
              </div>
              <Link href="/books" className="py-4 px-2 hover:bg-blue-700 transition-colors">
                {t('nav.books')}
              </Link>
              <Link href="/authors" className="py-4 px-2 hover:bg-blue-700 transition-colors">
                {t('nav.authors')}
              </Link>
              <Link href="/bestsellers" className="py-4 px-2 hover:bg-blue-700 transition-colors">
                {t('sections.bestSellers')}
              </Link>
              <Link href="/new-releases" className="py-4 px-2 hover:bg-blue-700 transition-colors">
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

        {/* Mobile Menu Overlay - Remove this as MobileMenu component handles it */}
        {/*isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}>
            <div className="fixed inset-y-0 left-0 rtl:right-0 rtl:left-auto w-80 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">ک</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">{t('site.title')}</h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-md text-gray-600 hover:text-gray-900"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-1">
                  <Link href="/" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                    🏠 {t('nav.home')}
                  </Link>
                  <Link href="/books" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                    📚 {t('nav.books')}
                  </Link>
                  <Link href="/authors" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                    ✍️ {t('nav.authors')}
                  </Link>
                  
                  <div className="py-2">
                    <h3 className="px-4 py-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">{t('nav.categories')}</h3>
                    <Link href="/category/literature" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                      📚 {t('categories.literature')}
                    </Link>
                    <Link href="/category/poetry" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                      ✍️ {t('categories.poetry')}
                    </Link>
                    <Link href="/category/history" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                      🏛️ {t('categories.history')}
                    </Link>
                    <Link href="/category/children" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                      🧸 {t('categories.children')}
                    </Link>
                    <Link href="/category/education" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                      🎓 {t('categories.education')}
                    </Link>
                    <Link href="/category/science" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                      🔬 {t('categories.science')}
                    </Link>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <Link href="/bestsellers" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                      🏆 {t('sections.bestSellers')}
                    </Link>
                    <Link href="/new-releases" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                      🆕 {t('sections.newReleases')}
                    </Link>
                  </div>

                  {!isAuthenticated && (
                    <div className="border-t pt-4 mt-4">
                      <Link href="/auth/login" className="block px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                        🔐 {t('auth.login')}
                      </Link>
                      <Link href="/auth/register" className="block px-4 py-3 text-green-600 hover:bg-green-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                        📝 {t('auth.register')}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )*/}
      </nav>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}