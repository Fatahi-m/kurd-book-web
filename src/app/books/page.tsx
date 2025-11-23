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

  // UI States
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    publisher: false,
    author: false,
    translator: false
  });

  useEffect(() => {
    const allBooks = bookService.getAllBooks();
    setBooks(allBooks);
    
    // Extract unique values for filters
    const uniquePublishers = Array.from(new Set(allBooks.map(b => b.publisher).filter(Boolean))) as string[];
    const uniqueAuthors = Array.from(new Set(allBooks.map(b => b.author).filter(Boolean))) as string[];
    
    setPublishers(uniquePublishers);
    setAuthors(uniqueAuthors);
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
    return [...filteredBooks].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'newest': return new Date(b.publishedDate || '').getTime() - new Date(a.publishedDate || '').getTime();
        case 'bestselling': return (b.rating || 0) - (a.rating || 0); // Simplified proxy for bestselling
        default: return 0;
      }
    });
  }, [filteredBooks, sortBy]);

  return (
    <main className="min-h-screen bg-[#F5F2E9] dark:bg-[#121212] py-12 transition-colors duration-300 font-sans">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters - Minimalist */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
            
            {/* Search - Mobile only */}
            <div className="lg:hidden relative mb-6">
               <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={currentLanguage === 'ku' ? 'گەڕان...' : 'Search...'}
                className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-gray-300 dark:border-gray-700 text-sm focus:border-black dark:focus:border-white outline-none transition-colors"
              />
              <Search className="absolute left-0 top-2 text-gray-400 w-4 h-4 rtl:right-0 rtl:left-auto" />
            </div>

            {/* In Stock Toggle */}
            <div className="flex items-center justify-between cursor-pointer group"
                 onClick={() => setInStockOnly(!inStockOnly)}>
              <span className="font-serif text-gray-900 dark:text-white text-lg">
                {currentLanguage === 'ku' ? 'بەردەستەکان' : 'Available Only'}
              </span>
              <div className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${inStockOnly ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-700'}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white dark:bg-black rounded-full transition-all duration-300 ${inStockOnly ? 'left-4 rtl:right-4 rtl:left-auto' : 'left-0.5 rtl:right-0.5 rtl:left-auto'}`} />
              </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-800 w-full" />

            {/* Categories */}
            <div className="space-y-4">
              <button 
                onClick={() => toggleSection('category')}
                className="w-full flex items-center justify-between group"
              >
                <span className="font-serif text-xl text-gray-900 dark:text-white">{t('books.category')}</span>
                {expandedSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {expandedSections.category && (
                <div className="space-y-2 pl-2 rtl:pr-2 rtl:pl-0">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`block w-full text-left rtl:text-right text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'text-black dark:text-white font-medium underline decoration-1 underline-offset-4'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      {t(category.key)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-800 w-full" />

            {/* Publishers */}
            <div className="space-y-4">
              <button 
                onClick={() => toggleSection('publisher')}
                className="w-full flex items-center justify-between group"
              >
                <span className="font-serif text-xl text-gray-900 dark:text-white">
                  {currentLanguage === 'ku' ? 'بڵاوکراوە' : 'Publishers'}
                </span>
                {expandedSections.publisher ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {expandedSections.publisher && (
                <div className="space-y-2 pl-2 rtl:pr-2 rtl:pl-0 max-h-60 overflow-y-auto custom-scrollbar">
                   <button
                      onClick={() => setSelectedPublisher(null)}
                      className={`block w-full text-left rtl:text-right text-sm transition-colors ${
                        !selectedPublisher
                          ? 'text-black dark:text-white font-medium underline decoration-1 underline-offset-4'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      {currentLanguage === 'ku' ? 'هەموو' : 'All'}
                    </button>
                  {publishers.map(pub => (
                    <button
                      key={pub}
                      onClick={() => setSelectedPublisher(pub === selectedPublisher ? null : pub)}
                      className={`block w-full text-left rtl:text-right text-sm transition-colors ${
                        selectedPublisher === pub
                          ? 'text-black dark:text-white font-medium underline decoration-1 underline-offset-4'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      {pub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-800 w-full" />

            {/* Authors */}
            <div className="space-y-4">
              <button 
                onClick={() => toggleSection('author')}
                className="w-full flex items-center justify-between group"
              >
                <span className="font-serif text-xl text-gray-900 dark:text-white">
                  {currentLanguage === 'ku' ? 'نووسەر' : 'Authors'}
                </span>
                {expandedSections.author ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {expandedSections.author && (
                <div className="space-y-2 pl-2 rtl:pr-2 rtl:pl-0 max-h-60 overflow-y-auto custom-scrollbar">
                   <button
                      onClick={() => setSelectedAuthor(null)}
                      className={`block w-full text-left rtl:text-right text-sm transition-colors ${
                        !selectedAuthor
                          ? 'text-black dark:text-white font-medium underline decoration-1 underline-offset-4'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      {currentLanguage === 'ku' ? 'هەموو' : 'All'}
                    </button>
                  {authors.map(author => (
                    <button
                      key={author}
                      onClick={() => setSelectedAuthor(author === selectedAuthor ? null : author)}
                      className={`block w-full text-left rtl:text-right text-sm transition-colors ${
                        selectedAuthor === author
                          ? 'text-black dark:text-white font-medium underline decoration-1 underline-offset-4'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
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
            
            {/* Top Bar - Minimalist */}
            <div className="flex flex-col md:flex-row gap-6 items-end md:items-center justify-between mb-12 border-b border-gray-200 dark:border-gray-800 pb-6">
              
              <div className="hidden lg:block relative w-full max-w-md">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={currentLanguage === 'ku' ? 'گەڕان...' : 'Search...'}
                  className="w-full pl-0 pr-8 py-2 bg-transparent border-b border-gray-300 dark:border-gray-700 text-lg font-light focus:border-black dark:focus:border-white outline-none transition-colors placeholder-gray-400"
                />
                <Search className="absolute right-0 top-3 text-gray-400 w-5 h-5 rtl:left-0 rtl:right-auto" />
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <span className="text-sm text-gray-500 font-light uppercase tracking-widest">
                  {sortedBooks.length} {currentLanguage === 'ku' ? 'کتێب' : 'Books'}
                </span>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 font-light">
                    {currentLanguage === 'ku' ? 'ڕیزکردن:' : 'Sort:'}
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent font-serif text-gray-900 dark:text-white text-sm focus:outline-none cursor-pointer border-none pr-8"
                  >
                    <option value="bestselling">{currentLanguage === 'ku' ? 'پڕفرۆشترین' : 'Bestselling'}</option>
                    <option value="newest">{currentLanguage === 'ku' ? 'نوێترین' : 'Newest'}</option>
                    <option value="price-asc">{currentLanguage === 'ku' ? 'ارزانترین' : 'Price: Low to High'}</option>
                    <option value="price-desc">{currentLanguage === 'ku' ? 'گرانترین' : 'Price: High to Low'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Books Grid */}
            {sortedBooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {sortedBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="text-6xl mb-6 opacity-20 grayscale">📚</div>
                <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">
                  {currentLanguage === 'ku' ? 'هیچ ئەنجامێک نەدۆزرایەوە' : 'No results found'}
                </h3>
                <p className="text-gray-500 font-light">
                  {currentLanguage === 'ku' ? 'تکایە فیلتەرەکان بگۆڕە و دووبارە هەوڵ بدەرەوە' : 'Try adjusting your search or filters'}
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </main>
  );
}