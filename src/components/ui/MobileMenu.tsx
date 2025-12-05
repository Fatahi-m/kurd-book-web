'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { categories } from '@/data/books';
import { 
  X, Home, BookOpen, Heart, ShoppingCart, User, Search, Globe, ChevronRight, ChevronDown, Info, Palette, LogIn, LogOut,
  Feather, Landmark, Baby, GraduationCap, Moon, Gavel, Microscope, Brain, Lightbulb, Briefcase, Utensils, Plane, HeartPulse
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t, currentLanguage, setLanguage } = useLanguage();
  const { getCartItemCount } = useCart();
  const { getWishlistItemCount } = useWishlist();
  const { user, logout } = useAuth();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

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

  const handleLanguageChange = (lang: 'ku' | 'en' | 'kmr') => {
    setLanguage(lang);
    setShowLanguageMenu(false);
    onClose();
  };

  const itemCount = getCartItemCount();
  const wishlistCount = getWishlistItemCount();

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'literature': return <BookOpen size={18} />;
      case 'poetry': return <Feather size={18} />;
      case 'history': return <Landmark size={18} />;
      case 'children': return <Baby size={18} />;
      case 'education': return <GraduationCap size={18} />;
      case 'religion': return <Moon size={18} />;
      case 'politics': return <Gavel size={18} />;
      case 'science': return <Microscope size={18} />;
      case 'biography': return <User size={18} />;
      case 'culture': return <Globe size={18} />;
      case 'psychology': return <Brain size={18} />;
      case 'philosophy': return <Lightbulb size={18} />;
      case 'art': return <Palette size={18} />;
      case 'business': return <Briefcase size={18} />;
      case 'cooking': return <Utensils size={18} />;
      case 'travel': return <Plane size={18} />;
      case 'health': return <HeartPulse size={18} />;
      default: return <BookOpen size={18} />;
    }
  };

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
      href: '/authors',
      icon: User,
      label: t('nav.authors'),
      badge: null
    },
    {
      href: '/arts',
      icon: Palette,
      label: t('nav.arts'),
      badge: null
    },
    // Categories will be handled separately
    {
      href: '/about',
      icon: Info,
      label: t('nav.about'),
      badge: null
    },
    {
      href: '/contact',
      icon: Info,
      label: t('nav.contact'),
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
    { code: 'kmr', name: 'Kurmancî', flag: '☀️' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className={`fixed top-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-out md:hidden ${
        currentLanguage === 'ku' 
          ? `right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}` 
          : `left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
      } ${
        currentLanguage === 'ku' ? 'text-right' : 'text-left'
      }`} dir={currentLanguage === 'ku' ? 'rtl' : 'ltr'}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-white">
          <h2 className="text-xl font-bold font-serif text-slate-900">
            {t('nav.menu')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-4 bg-slate-50 border-b border-slate-100">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
                {user.firstName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {user.email}
                </p>
              </div>
              <button 
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="p-2 text-slate-400 hover:text-amber-500 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link 
              href="/auth/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 bg-amber-600 text-white rounded-xl font-bold text-sm hover:bg-amber-700 transition-colors shadow-lg shadow-amber-900/10"
            >
              <LogIn size={18} />
              {t('auth.login')} / {t('auth.register')}
            </Link>
          )}
        </div>

        {/* Menu Items */}
        <div className="py-2 overflow-y-auto max-h-[calc(100vh-180px)]">
          <nav className="space-y-0">
            {menuItems.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors border-b border-slate-100"
              >
                <div className={`flex items-center space-x-3 ${currentLanguage === 'ku' ? 'space-x-reverse' : ''}`}>
                  <item.icon size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-amber-600 text-white text-xs rounded-full px-2 py-1 min-w-[18px] text-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* Categories Accordion */}
            <div className="border-b border-slate-100">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center justify-between w-full px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <div className={`flex items-center space-x-3 ${currentLanguage === 'ku' ? 'space-x-reverse' : ''}`}>
                  <BookOpen size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">{t('nav.categories')}</span>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`text-slate-400 transition-transform duration-200 ${showCategories ? 'rotate-180' : ''}`}
                />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showCategories ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-slate-50 py-2 px-4 space-y-1">
                  <Link
                    href="/categories"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-amber-600 hover:bg-slate-100 rounded-md"
                  >
                    <span>{t('nav.allCategories') || 'All Categories'}</span>
                    <ChevronRight size={14} className="rtl:rotate-180" />
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                    >
                      <span className="text-slate-400">{getCategoryIcon(category.id)}</span>
                      <span>
                        {t(`categories.${category.id}`) !== `categories.${category.id}` 
                          ? t(`categories.${category.id}`) 
                          : (category.name as any)[currentLanguage] || (category.name as any)['en'] || 'Category'}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {menuItems.slice(4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors border-b border-slate-100"
              >
                <div className={`flex items-center space-x-3 ${currentLanguage === 'ku' ? 'space-x-reverse' : ''}`}>
                  <item.icon size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-amber-600 text-white text-xs rounded-full px-2 py-1 min-w-[18px] text-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="mt-3 px-4">
            <div className="border-t border-slate-200 pt-3">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center justify-between w-full px-4 py-2.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <div className={`flex items-center space-x-3 ${currentLanguage === 'ku' ? 'space-x-reverse' : ''}`}>
                  <Globe size={18} className="text-slate-500" />
                  <div className={`flex flex-col ${currentLanguage === 'ku' ? 'items-end' : 'items-start'}`}>
                    <span className="text-sm font-medium">{t('nav.language')}</span>
                    <span className="text-xs text-slate-500">
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
                <div className="mt-2 bg-slate-50 rounded-lg p-2 border border-slate-200">
                  <div className="space-y-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code as 'ku' | 'en' | 'kmr')}
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors ${
                          currentLanguage === lang.code
                            ? 'bg-amber-50 text-amber-600 border border-amber-200'
                            : 'text-slate-700 hover:bg-white hover:shadow-sm'
                        }`}
                      >
                        <div className={`flex items-center space-x-3 ${currentLanguage === 'ku' ? 'space-x-reverse' : ''}`}>
                          <span className="text-lg">{lang.flag}</span>
                          <span className="font-medium">{lang.name}</span>
                        </div>
                        {currentLanguage === lang.code && (
                          <span className="text-amber-600 font-bold">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 px-4 text-center text-xs text-slate-500">
            <div className="border-t border-slate-200 pt-3">
              <p className="text-xs">{t('app.name')}</p>
              <p className="mt-1 text-xs opacity-70">v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}