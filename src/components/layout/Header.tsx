'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { getCartItemCount } = useCart();
  const { t, dir } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();



  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-gray-600">📞 +964 750 123 4567</span>
              <span className="text-gray-600">✉️ info@kurdbook.com</span>
            </div>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">ک</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{t('site.title')}</h1>
              <p className="text-sm text-gray-600">{t('site.description')}</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const query = formData.get('search') as string;
              if (query.trim()) {
                router.push(`/search?q=${encodeURIComponent(query.trim())}`);
              }
            }}>
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
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button className="p-2 text-gray-600 hover:text-gray-800 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            <Link href="/cart" className="p-2 text-gray-600 hover:text-gray-800 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.39.39-.586.876-.586 1.414V17a1 1 0 001 1h14M7 13v4a1 1 0 001 1h2m3-5a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 rtl:-right-auto rtl:-left-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="p-2 text-gray-600 hover:text-gray-800 flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <span className="hidden sm:inline text-sm">{user?.firstName}</span>
                </button>
                
                {/* User Dropdown */}
                <div className="absolute left-0 rtl:left-auto rtl:right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8 rtl:space-x-reverse">
              <Link href="/" className="py-4 px-2 hover:bg-blue-700 transition-colors">
                {t('nav.home')}
              </Link>
              <div className="relative group">
                <button className="py-4 px-2 hover:bg-blue-700 transition-colors flex items-center space-x-1 rtl:space-x-reverse">
                  <span>{t('nav.categories')}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 rtl:left-auto rtl:right-0 w-64 bg-white text-gray-800 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
              <span className="text-sm">🚚 {t('currentLanguage') === 'ku' ? 'گەیاندنی خۆڕایی' : t('currentLanguage') === 'en' ? 'Free Shipping' : 'Kostenloser Versand'}</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}