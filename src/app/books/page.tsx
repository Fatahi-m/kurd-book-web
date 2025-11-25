'use client';

import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { bookService } from '@/lib/bookService';
import { Book } from '@/lib/types';
import BookCard from '@/components/ui/BookCard';
import { ChevronDown, ChevronUp, Search, Filter, Check } from 'lucide-react';

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
        book.author.toLowerCase().includes(searchLower) ||
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
    <main className="min-h-screen bg-white dark:bg-[#0f172a] py-8 md:py-12 transition-colors duration-300 font-sans">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar Filters - Professional E-commerce Style */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 bg-white dark:bg-[#1e293b] p-0 lg:p-0 rounded-none h-fit">
            
            {/* Search - Mobile only */}
            <div className="lg:hidden relative mb-6">
               <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={currentLanguage === 'ku' ? 'گەڕان...' : 'Search...'}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:border-[#48B063] dark:focus:border-[#48B063] outline-none transition-colors"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4 rtl:right-3 rtl:left-auto" />
            </div>

            {/* In Stock Toggle */}
            <div className="flex items-center justify-between cursor-pointer group pb-4 border-b border-gray-100 dark:border-gray-700"
                 onClick={() => setInStockOnly(!inStockOnly)}>
              <span className="font-bold text-[#313131] dark:text-gray-200 text-sm uppercase tracking-wide">
                {currentLanguage === 'ku' ? 'بەردەستەکان' : 'In Stock Only'}
              </span>
              <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${inStockOnly ? 'bg-[#48B063]' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 shadow-sm ${inStockOnly ? 'left-5 rtl:right-5 rtl:left-auto' : 'left-1 rtl:right-1 rtl:left-auto'}`} />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <button 
                onClick={() => toggleSection('category')}
                className="w-full flex items-center justify-between group"
              >
                <span className="font-bold text-base text-[#313131] dark:text-white">{t('books.category')}</span>
                {expandedSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {expandedSections.category && (
                <div className="space-y-1 pl-1 rtl:pr-1 rtl:pl-0">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`block w-full text-left rtl:text-right text-sm py-1.5 px-2 rounded-md transition-colors ${
                        selectedCategory === category.id
                          ? 'text-[#48B063] font-bold bg-gray-50 dark:bg-gray-800'
                          : 'text-gray-600 dark:text-gray-400 hover:text-[#48B063] dark:hover:text-[#48B063]'
                      }`}
                    >
                      {t(category.key)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-px bg-gray-100 dark:bg-gray-700 w-full" />

            {/* Publishers */}
            <div className="space-y-3">
              <button 
                onClick={() => toggleSection('publisher')}
                className="w-full flex items-center justify-between group"
              >
                <span className="font-bold text-base text-[#313131] dark:text-white">
                  {currentLanguage === 'ku' ? 'بڵاوکراوە' : 'Publishers'}
                </span>
                {expandedSections.publisher ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {expandedSections.publisher && (
                <div className="space-y-1 pl-1 rtl:pr-1 rtl:pl-0 max-h-48 overflow-y-auto custom-scrollbar">
                   <button
                      onClick={() => setSelectedPublisher(null)}
                      className={`block w-full text-left rtl:text-right text-sm py-1.5 px-2 rounded-md transition-colors ${
                        !selectedPublisher
                          ? 'text-[#48B063] font-bold bg-gray-50 dark:bg-gray-800'
                          : 'text-gray-600 dark:text-gray-400 hover:text-[#48B063] dark:hover:text-[#48B063]'
                      }`}
                    >
                      {currentLanguage === 'ku' ? 'هەموو' : 'All'}
                    </button>
                  {publishers.map(pub => (
                    <button
                      key={pub}
                      onClick={() => setSelectedPublisher(pub === selectedPublisher ? null : pub)}
                      className={`block w-full text-left rtl:text-right text-sm py-1.5 px-2 rounded-md transition-colors ${
                        selectedPublisher === pub
                          ? 'text-[#48B063] font-bold bg-gray-50 dark:bg-gray-800'
                          : 'text-gray-600 dark:text-gray-400 hover:text-[#48B063] dark:hover:text-[#48B063]'
                      }`}
                    >
                      {pub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-px bg-gray-100 dark:bg-gray-700 w-full" />

            {/* Authors */}
            <div className="space-y-3">
              <button 
                onClick={() => toggleSection('author')}
                className="w-full flex items-center justify-between group"
              >
                <span className="font-bold text-base text-[#313131] dark:text-white">
                  {currentLanguage === 'ku' ? 'نووسەر' : 'Authors'}
                </span>
                {expandedSections.author ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {expandedSections.author && (
                <div className="space-y-1 pl-1 rtl:pr-1 rtl:pl-0 max-h-48 overflow-y-auto custom-scrollbar">
                   <button
                      onClick={() => setSelectedAuthor(null)}
                      className={`block w-full text-left rtl:text-right text-sm py-1.5 px-2 rounded-md transition-colors ${
                        !selectedAuthor
                          ? 'text-[#48B063] font-bold bg-gray-50 dark:bg-gray-800'
                          : 'text-gray-600 dark:text-gray-400 hover:text-[#48B063] dark:hover:text-[#48B063]'
                      }`}
                    >
                      {currentLanguage === 'ku' ? 'هەموو' : 'All'}
                    </button>
                  {authors.map(author => (
                    <button
                      key={author}
                      onClick={() => setSelectedAuthor(author === selectedAuthor ? null : author)}
                      className={`block w-full text-left rtl:text-right text-sm py-1.5 px-2 rounded-md transition-colors ${
                        selectedAuthor === author
                          ? 'text-[#48B063] font-bold bg-gray-50 dark:bg-gray-800'
                          : 'text-gray-600 dark:text-gray-400 hover:text-[#48B063] dark:hover:text-[#48B063]'
                      }`}
                    >
                      {author}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </aside>

          {/* Main Content */}
          <div className="flex-1">
            
            {/* Top Bar - Clean & Functional */}
            <div className="bg-white dark:bg-[#1e293b] p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              
              <div className="hidden lg:block relative w-full max-w-md">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={currentLanguage === 'ku' ? 'گەڕان...' : 'Search by title, author, ISBN...'}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[4px] text-sm focus:border-[#48B063] dark:focus:border-[#48B063] outline-none transition-all"
                />
                <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4 rtl:right-3 rtl:left-auto" />
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <span className="text-sm text-gray-500 font-medium">
                  {sortedBooks.length} {currentLanguage === 'ku' ? 'کتێب' : 'Results'}
                </span>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {currentLanguage === 'ku' ? 'ڕیزکردن:' : 'Sort by:'}
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[4px] text-sm py-1.5 px-3 focus:outline-none focus:border-[#48B063] cursor-pointer"
                  >
                    <option value="bestselling">{currentLanguage === 'ku' ? 'پڕفرۆشترین' : 'Bestselling'}</option>
                    <option value="newest">{currentLanguage === 'ku' ? 'نوێترین' : 'Newest'}</option>
                    <option value="price-asc">{currentLanguage === 'ku' ? 'ارزانترین' : 'Price: Low to High'}</option>
                    <option value="price-desc">{currentLanguage === 'ku' ? 'گرانترین' : 'Price: High to Low'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Books Grid - Dense & Professional */}
            {isLoading ? (
              <div className="flex items-center justify-center py-32">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#48B063]"></div>
              </div>
            ) : sortedBooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {sortedBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center bg-white dark:bg-[#1e293b] rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                <div className="text-6xl mb-6 opacity-20 grayscale">📚</div>
                <h3 className="text-xl font-bold text-[#313131] dark:text-white mb-2">
                  {currentLanguage === 'ku' ? 'هیچ ئەنجامێک نەدۆزرایەوە' : 'No results found'}
                </h3>
                <p className="text-gray-500">
                  {currentLanguage === 'ku' ? 'تکایە فیلتەرەکان بگۆڕە و دووبارە هەوڵ بدەرەوە' : 'Try adjusting your search or filters'}
                </p>
                {books.length === 0 && (
                   <p className="text-red-500 mt-4 text-sm">
                     Debug: No books loaded from service.
                   </p>
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </main>
  );
}