'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { X, Home, BookOpen, Heart, ShoppingCart, User, Search, Globe, ChevronRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t, currentLanguage, setLanguage } = useLanguage();
  const { getCartItemCount } = useCart();
  const { getWishlistItemCount } = useWishlist();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleLanguageChange = (lang: 'ku' | 'en' | 'de') => {
    setLanguage(lang);
    setShowLanguageMenu(false);
    onClose();
  };

  const itemCount = getCartItemCount();
  const wishlistCount = getWishlistItemCount();

  const menuItems = [
    {
      href: '/',
      icon: Home,
      label: t('nav.home'),
      badge: null
    },
    {
      href: '/books',
      icon: BookOpen,
      label: t('nav.books'),
      badge: null
    },
    {
      href: '/categories',
      icon: BookOpen,
      label: t('nav.categories'),
      badge: null
    },
    {
      href: '/authors',
      icon: User,
      label: t('nav.authors'),
      badge: null
    },
    {
      href: '/wishlist',
      icon: Heart,
      label: t('nav.wishlist'),
      badge: wishlistCount > 0 ? wishlistCount : null
    },
    {
      href: '/cart',
      icon: ShoppingCart,
      label: t('nav.cart'),
      badge: itemCount > 0 ? itemCount : null
    }
  ];

  const languages = [
    { code: 'ku', name: 'کوردی', flag: '🇰🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className={`fixed top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        currentLanguage === 'ku' 
          ? `right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'} text-right` 
          : `left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} text-left`
      }`} dir={currentLanguage === 'ku' ? 'rtl' : 'ltr'}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white">
          <h2 className="text-lg font-semibold">
            {t('nav.menu')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <nav className="space-y-0">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className={`flex items-center space-x-3 ${currentLanguage === 'ku' ? 'space-x-reverse' : ''}`}>
                  <item.icon size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[18px] text-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="mt-3 px-4">
            <div className="border-t border-gray-200 pt-3">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center justify-between w-full px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className={`flex items-center space-x-3 ${currentLanguage === 'ku' ? 'space-x-reverse' : ''}`}>
                  <Globe size={18} className="text-gray-500" />
                  <div className={`flex flex-col ${currentLanguage === 'ku' ? 'items-end' : 'items-start'}`}>
                    <span className="text-sm font-medium">{t('nav.language')}</span>
                    <span className="text-xs text-gray-500">
                      {languages.find(lang => lang.code === currentLanguage)?.name}
                    </span>
                  </div>
                </div>
                <ChevronRight 
                  size={14} 
                  className={`transform transition-transform ${showLanguageMenu ? 'rotate-90' : ''} ${
                    currentLanguage === 'ku' ? 'rtl:rotate-180' : ''
                  }`} 
                />
              </button>
              
              {showLanguageMenu && (
                <div className="mt-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <div className="space-y-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code as 'ku' | 'en' | 'de')}
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors ${
                          currentLanguage === lang.code
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'text-gray-700 hover:bg-white hover:shadow-sm'
                        }`}
                      >
                        <div className={`flex items-center space-x-3 ${currentLanguage === 'ku' ? 'space-x-reverse' : ''}`}>
                          <span className="text-lg">{lang.flag}</span>
                          <span className="font-medium">{lang.name}</span>
                        </div>
                        {currentLanguage === lang.code && (
                          <span className="text-blue-600 font-bold">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 px-4 text-center text-xs text-gray-500">
            <div className="border-t border-gray-200 pt-3">
              <p className="text-xs">{t('app.name')}</p>
              <p className="mt-1 text-xs opacity-70">v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}