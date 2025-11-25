'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { bookService } from '@/lib/bookService';
import { Book } from '@/lib/types';
import { 
  Search, ShoppingCart, User, Menu, ChevronDown, HelpCircle, Rocket, Home, Gift,
  BookOpen, Feather, Landmark, Baby, GraduationCap, Moon, Gavel, Microscope, 
  Globe, Brain, Lightbulb, Palette, Briefcase, Utensils, Plane, HeartPulse
} from 'lucide-react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { getCartItemCount, getCartTotal } = useCart();
  const { t, currentLanguage } = useLanguage();
  const { user } = useAuth();

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
    <header className="w-full flex flex-col z-50 relative font-sans">
      
      {/* 1. Top Main Header (Modern Dark Slate) */}
      <div className="bg-[#0f172a] text-white py-4 border-b border-white/10 relative z-50">
        <div className="container mx-auto px-4">
          
          {/* Top Utility Line (Status) */}
          <div className="flex justify-between items-center mb-4 text-xs text-gray-400">
            <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
              <Rocket size={14} />
              <span>{t('header.orderStatus') || "Order Status"}</span>
            </div>
            <div className="flex items-center gap-4">
               <LanguageSwitcher variant="minimal" />
            </div>
          </div>

          <div className="flex items-center gap-8 justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#e11d48] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-rose-900/20">
                K
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-white leading-none tracking-wide">
                  KURD BOOK
                </span>
                <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Culture & Literature</span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-auto relative hidden md:block px-8">
              <form onSubmit={handleSearchSubmit} className="relative flex w-full h-12">
                <div className="absolute left-4 top-3.5 text-gray-400">
                  <Search size={20} />
                </div>
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder={t('search.placeholder') || "Search for books..."}
                  className="w-full h-full pl-12 pr-32 bg-[#1e293b] text-white rounded-full border border-gray-700 focus:border-[#e11d48] outline-none transition-all text-sm placeholder-gray-500"
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-[#e11d48] hover:bg-[#be123c] text-white font-medium text-sm rounded-full transition-colors shadow-md"
                >
                  {t('common.search') || "Search"}
                </button>
                
                {isSearching && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white text-gray-900 rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100">
                    {searchResults.map(book => (
                      <Link 
                        key={book.id} 
                        href={`/book/${book.id}`}
                        onClick={() => setIsSearching(false)}
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                      >
                        <div className="w-10 h-14 bg-gray-200 rounded overflow-hidden flex-shrink-0 relative shadow-sm">
                          {/* Image placeholder */}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800 line-clamp-1">{book.title}</p>
                          <p className="text-xs text-gray-500">{book.author}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 flex-shrink-0">
              
              <Link href={user ? "/profile" : "/auth/login"} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <User size={20} strokeWidth={2} />
                <span className="text-sm font-medium hidden lg:block">{t('header.account') || "Account"}</span>
              </Link>

              <div className="h-6 w-px bg-gray-700"></div>

              <Link href="/cart" className="flex items-center gap-2 group">
                <div className="relative">
                  <ShoppingCart size={24} className="text-gray-300 group-hover:text-white transition-colors" strokeWidth={2} />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#e11d48] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#0f172a]">
                    0
                  </span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-gray-400">Total</span>
                  <span className="text-sm font-bold text-white leading-none">$0.00</span>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* 2. Navigation Bar (Clean White) */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-8 text-[15px] font-medium h-16 text-gray-700">
            
            {/* Categories Dropdown - The Main Trigger */}
            <li className="relative group h-full flex items-center mr-4">
              <Link href="/categories" className="flex items-center gap-2 px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-900 font-bold">
                <Menu size={18} />
                {t('nav.categories') || "Categories"} 
              </Link>
              
              {/* Mega Menu */}
              <div className="absolute top-full ltr:left-0 rtl:right-0 w-[900px] bg-white shadow-2xl rounded-b-2xl p-8 hidden group-hover:block z-50 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-4 gap-6">
                  {categories.map((cat) => (
                    <Link 
                      key={cat.id} 
                      href={`/category/${cat.slug}`} 
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 text-gray-600 hover:text-[#e11d48] transition-colors rounded-lg group/item"
                    >
                      <span className="text-gray-400 group-hover/item:text-[#e11d48] transition-colors">{getCategoryIcon(cat.slug)}</span>
                      <span className="font-medium text-sm">
                        {currentLanguage === 'ku' ? cat.name.ku : (currentLanguage === 'de' ? cat.name.de : cat.name.en)}
                      </span>
                    </Link>
                  ))}
                </div>
                
                {/* Featured in Menu */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center bg-gray-50 -mx-8 -mb-8 p-8 rounded-b-2xl">
                   <div>
                      <h4 className="font-bold text-gray-900 mb-1">New Arrivals</h4>
                      <p className="text-xs text-gray-500">Check out the latest books added to our store</p>
                   </div>
                   <Link href="/new-releases" className="text-sm font-bold text-[#e11d48] hover:underline">View All &rarr;</Link>
                </div>
              </div>
            </li>

            {/* Standard Links */}
            <li>
              <Link href="/" className="hover:text-[#e11d48] transition-colors py-4 block relative group">
                {t('nav.home') || "Home"}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/books" className="hover:text-[#e11d48] transition-colors py-4 block relative group">
                {t('nav.books') || "Books"}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/authors" className="hover:text-[#e11d48] transition-colors py-4 block relative group">
                {t('nav.authors') || "Authors"}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#e11d48] transition-colors py-4 block relative group">
                {t('nav.about') || "About"}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#e11d48] transition-colors py-4 block relative group">
                {t('nav.contact') || "Contact"}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all group-hover:w-full"></span>
              </Link>
            </li>

            <li className="ml-auto">
               <Link href="/gift-cards" className="flex items-center gap-2 text-[#e11d48] font-bold text-sm bg-rose-50 px-4 py-2 rounded-full hover:bg-rose-100 transition-colors">
                  <Gift size={16} />
                  <span>Gift Cards</span>
               </Link>
            </li>

          </ul>
        </div>
      </div>

      {/* Mobile Search (Visible only on mobile) */}
      <div className="md:hidden bg-[#0f172a] px-4 pb-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            className="w-full h-10 pl-4 pr-12 bg-[#1e293b] text-white rounded-lg text-sm outline-none border border-gray-700 focus:border-[#e11d48]"
          />
          <button type="submit" className="absolute right-0 top-0 h-10 w-10 text-gray-400 flex items-center justify-center">
            <Search size={20} />
          </button>
        </form>
      </div>
    </header>
  );
}
