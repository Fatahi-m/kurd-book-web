'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { bookService } from '@/lib/bookService';
import { Book } from '@/lib/types';
import { 
  Search, ShoppingCart, User, Menu, ChevronDown, HelpCircle, Rocket, Home, Gift,
  BookOpen, Feather, Landmark, Baby, GraduationCap, Moon, Gavel, Microscope, 
  Globe, Brain, Lightbulb, Palette, Briefcase, Utensils, Plane, HeartPulse, X,
  Heart, Star, ChevronRight
} from 'lucide-react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import MobileMenu from '@/components/ui/MobileMenu';
import { categories } from '@/data/books';

const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case 'literature': return <BookOpen size={20} />;
    case 'poetry': return <Feather size={20} />;
    case 'history': return <Landmark size={20} />;
    case 'children': return <Baby size={20} />;
    case 'education': return <GraduationCap size={20} />;
    case 'religion': return <Moon size={20} />;
    case 'politics': return <Gavel size={20} />;
    case 'science': return <Microscope size={20} />;
    case 'biography': return <User size={20} />;
    case 'culture': return <Globe size={20} />;
    case 'psychology': return <Brain size={20} />;
    case 'philosophy': return <Lightbulb size={20} />;
    case 'art': return <Palette size={20} />;
    case 'business': return <Briefcase size={20} />;
    case 'cooking': return <Utensils size={20} />;
    case 'travel': return <Plane size={20} />;
    case 'health': return <HeartPulse size={20} />;
    default: return <BookOpen size={20} />;
  }
};

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { getCartItemCount, getCartTotal } = useCart();
  const { t, currentLanguage } = useLanguage();
  const { user } = useAuth();

  const navLinks = [
    { href: '/', label: t('nav.home') || 'Home' },
    { href: '/books', label: t('nav.books') || 'Books' },
    { href: '/new-releases', label: t('home.newReleases') || 'New Releases' },
    { href: '/bestsellers', label: t('home.bestsellers') || 'Bestsellers' },
    { href: '/authors', label: t('nav.authors') || 'Authors' },
  ];

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      setIsSearching(false);
    }
  };

  return (
    <header className="w-full flex flex-col z-50 relative font-sans sticky top-0 bg-white shadow-sm border-b border-gray-200">
      
      {/* 1. Top Bar (Language & Auth) */}
      <div className="bg-black text-white py-2 text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="hidden md:inline opacity-80">Welcome to Kurdish Library</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {!user && (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-800">
                <Link href="/auth/login" className="hover:text-gray-300 transition-colors">{t('auth.login')}</Link>
                <span>/</span>
                <Link href="/auth/register" className="hover:text-gray-300 transition-colors">{t('auth.register')}</Link>
              </div>
            )}
            {user && (
              <Link href="/profile" className="flex items-center gap-2 hover:text-gray-300 transition-colors pl-4 border-l border-gray-800">
                <User size={14} />
                <span>{user.firstName}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-lg flex items-center justify-center text-white shadow-lg group-hover:rotate-3 transition-transform">
                <BookOpen size={24} className="md:w-7 md:h-7" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-bold text-black font-serif tracking-tight group-hover:text-gray-600 transition-colors">
                  {t('app.name') || 'Kurdish Library'}
                </h1>
              </div>
            </Link>

            {/* Search Bar - Centered */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative" ref={searchRef as any}>
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder={t('hero.searchPlaceholder') || "Search for books, authors..."}
                  className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-gray-200 bg-white focus:bg-white focus:border-black focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  <Search size={18} />
                </button>
              </form>

              {/* Search Results Dropdown */}
              {isSearching && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                  {searchResults.map((book) => (
                    <Link 
                      key={book.id} 
                      href={`/book/${book.id}`}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none"
                      onClick={() => setIsSearching(false)}
                    >
                      <img src={book.image || book.coverUrl || '/images/default-book-cover.jpg'} alt={book.title} className="w-10 h-14 object-cover rounded shadow-sm" />
                      <div>
                        <h4 className="font-bold text-black text-sm line-clamp-1">{book.title}</h4>
                        <p className="text-xs text-gray-500">{book.author}</p>
                      </div>
                    </Link>
                  ))}
                  <Link 
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    className="block p-3 text-center text-sm text-black font-bold hover:bg-gray-50 transition-colors"
                    onClick={() => setIsSearching(false)}
                  >
                    View all results
                  </Link>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link href="/cart" className="relative p-2 text-black hover:bg-gray-50 rounded-full transition-colors">
                <ShoppingCart size={24} />
                {getCartItemCount() > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                    {getCartItemCount()}
                  </span>
                )}
              </Link>
              
              <button 
                className="lg:hidden p-2 text-black hover:bg-gray-50 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={28} />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Navigation Bar */}
      <div className="hidden lg:block border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-8">
            <div className="relative group z-50">
              <button className="flex items-center gap-2 py-2 px-4 bg-gray-100 text-black font-bold rounded-md cursor-pointer hover:bg-gray-200 transition-colors my-2">
                 <Menu size={18} />
                 <span>{t('nav.categories') || 'Categories'}</span>
                 <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 rtl:right-0 rtl:left-auto w-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 p-6">
                <div className="grid grid-cols-2 gap-4">
                  {categories.slice(0, 10).map((category) => (
                    <Link 
                      key={category.id} 
                      href={`/category/${category.slug}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group/item"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover/item:bg-black group-hover/item:text-white transition-colors">
                        {getCategoryIcon(category.slug)}
                      </div>
                      <div>
                        <h4 className="font-bold text-black group-hover/item:text-black transition-colors">
                          {category.name[currentLanguage === 'ku' ? 'ku' : currentLanguage === 'kmr' ? 'kmr' : 'en']}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {category.description?.[currentLanguage === 'ku' ? 'ku' : currentLanguage === 'kmr' ? 'kmr' : 'en']}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <Link href="/categories" className="text-black font-bold hover:text-gray-600 text-sm flex items-center justify-center gap-1">
                    {t('buttons.viewAll') || 'View All Categories'} <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-sm font-bold uppercase tracking-wide hover:text-black transition-colors py-4 border-b-2 border-transparent hover:border-black ${
                    pathname === link.href ? 'text-black border-black' : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </nav>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}