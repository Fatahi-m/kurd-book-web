'use client';

import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { bookService } from '@/lib/bookService';
import { Book } from '@/lib/types';
import BookCard from '@/components/ui/BookCard';
import Link from 'next/link';
import { ChevronDown, Search, Filter, X } from 'lucide-react';

const categories = [
  { id: 'all', key: 'categories.all' },
  { id: 'literature', key: 'categories.literature' },
  { id: 'poetry', key: 'categories.poetry' },
  { id: 'history', key: 'categories.history' },
  { id: 'children', key: 'categories.children' },
  { id: 'education', key: 'categories.education' },
  { id: 'science', key: 'categories.science' }
];

export default function BooksPage() {
  const { t, currentLanguage } = useLanguage();
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPublisher, setSelectedPublisher] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('bestselling');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Data States
  const [books, setBooks] = useState<Book[]>([]);
  const [publishers, setPublishers] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI States
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    publisher: false,
    author: false,
    translator: false
  });

  useEffect(() => {
    const loadBooks = () => {
      try {
        const allBooks = bookService.getAllBooks();
        console.log('Books loaded:', allBooks.length);
        setBooks(allBooks);
        
        // Extract unique values for filters
        const uniquePublishers = Array.from(new Set(allBooks.map(b => b.publisher).filter(Boolean))) as string[];
        const uniqueAuthors = Array.from(new Set(allBooks.map(b => b.author).filter(Boolean))) as string[];
        
        setPublishers(uniquePublishers);
        setAuthors(uniqueAuthors);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
      const matchesPublisher = !selectedPublisher || book.publisher === selectedPublisher;
      const matchesAuthor = !selectedAuthor || book.author === selectedAuthor;
      const matchesStock = !inStockOnly || book.inStock;
      
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        book.title.toLowerCase().includes(searchLower) ||
        (book.titleKu && book.titleKu.toLowerCase().includes(searchLower)) ||
        (book.titleEn && book.titleEn.toLowerCase().includes(searchLower)) ||
        (book.titleKmr && book.titleKmr.toLowerCase().includes(searchLower)) ||
        book.author.toLowerCase().includes(searchLower) ||
        (book.authorKu && book.authorKu.toLowerCase().includes(searchLower)) ||
        (book.authorEn && book.authorEn.toLowerCase().includes(searchLower)) ||
        (book.authorKmr && book.authorKmr.toLowerCase().includes(searchLower)) ||
        (book.translator && book.translator.toLowerCase().includes(searchLower));
        
      return matchesCategory && matchesPublisher && matchesAuthor && matchesStock && matchesSearch;
    });
  }, [books, selectedCategory, selectedPublisher, selectedAuthor, inStockOnly, searchTerm]);

  const sortedBooks = useMemo(() => {
    if (!filteredBooks) return [];
    
    return [...filteredBooks].sort((a, b) => {
      try {
        switch (sortBy) {
          case 'price-asc': return a.price - b.price;
          case 'price-desc': return b.price - a.price;
          case 'newest': 
            const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
            const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
            return dateB - dateA;
          case 'bestselling': return (b.rating || 0) - (a.rating || 0);
          default: return 0;
        }
      } catch (e) {
        console.error('Sorting error:', e);
        return 0;
      }
    });
  }, [filteredBooks, sortBy]);

  return (
    <main className="min-h-screen bg-white transition-colors duration-300">
      
      {/* Header Section - Consistent with Home/NewReleases */}
      <div className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex items-center space-x-2 text-sm tracking-widest uppercase text-gray-500">
              <Link href="/" className="hover:text-black transition-colors">
                {t('nav.home')}
              </Link>
              <span>/</span>
              <span className="text-black">{t('nav.books')}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black">
              {t('nav.books')}
            </h1>
            
            <div className="w-24 h-1 bg-black mx-auto"></div>
            
            <p className="max-w-2xl text-lg text-gray-600 font-serif leading-relaxed">
              {t('books.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar - Sticky */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4 px-4 shadow-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-4 overflow-x-auto w-full md:w-auto no-scrollbar">
              
              {/* Category Select */}
              <div className="relative group">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-full text-sm focus:outline-none focus:border-black cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{t(cat.key)}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none rtl:left-3 rtl:right-auto" />
              </div>

              {/* Sort Select */}
              <div className="relative group">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-full text-sm focus:outline-none focus:border-black cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <option value="bestselling">{t('books.sortBestselling')}</option>
                  <option value="newest">{t('books.sortNewest')}</option>
                  <option value="price-asc">{t('books.sortPriceLowHigh')}</option>
                  <option value="price-desc">{t('books.sortPriceHighLow')}</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none rtl:left-3 rtl:right-auto" />
              </div>

              {/* In Stock Toggle */}
              <button 
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-colors ${
                  inStockOnly 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span>{t('books.inStockOnly')}</span>
                {inStockOnly && <X size={14} />}
              </button>

            </div>

            {/* Mobile Filter Button */}
            <button 
              className="md:hidden w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter size={18} />
              <span>Filters & Sort</span>
            </button>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('books.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:border-black outline-none transition-colors"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4 rtl:right-3 rtl:left-auto" />
            </div>

          </div>

          {/* Mobile Filters Panel */}
          {showMobileFilters && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-100 space-y-4 animate-in slide-in-from-top-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">{t('books.category')}</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{t(cat.key)}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">{t('books.sortBy')}</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm"
                >
                  <option value="bestselling">{t('books.sortBestselling')}</option>
                  <option value="newest">{t('books.sortNewest')}</option>
                  <option value="price-asc">{t('books.sortPriceLowHigh')}</option>
                  <option value="price-desc">{t('books.sortPriceHighLow')}</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">{t('books.inStockOnly')}</span>
                <div 
                  className={`w-10 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${inStockOnly ? 'bg-black' : 'bg-gray-200'}`}
                  onClick={() => setInStockOnly(!inStockOnly)}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${inStockOnly ? 'left-5 rtl:right-5 rtl:left-auto' : 'left-1 rtl:right-1 rtl:left-auto'}`} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        
        {/* Results Count */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-gray-500 font-serif italic">
            {t('books.found')} {sortedBooks.length} {t('books.results')}
          </span>
        </div>

        {/* Books Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : sortedBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
            {sortedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-6xl mb-6 opacity-20 grayscale">📚</div>
            <h3 className="text-xl font-bold text-black mb-2 font-serif">
              {t('books.noResults')}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {t('books.noResultsMessage')}
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setInStockOnly(false);
              }}
              className="mt-6 px-6 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}