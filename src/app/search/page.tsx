'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { books, categories } from '@/data/books';
import { Book, Category } from '@/lib/types';
import BookCard from '@/components/ui/BookCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Filter, X, ChevronDown, SlidersHorizontal, Grid, List } from 'lucide-react';

function SearchContent() {
  const { t, isRTL } = useLanguage();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Derive unique authors
  const authors = Array.from(new Set(books.map(b => b.author))).sort();

  useEffect(() => {
    let filtered = books;

    // Search by title, author, or description
    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    // Filter by author
    if (selectedAuthor !== 'all') {
      filtered = filtered.filter(book => book.author === selectedAuthor);
    }

    // Filter by price range
    filtered = filtered.filter(book => 
      book.price >= priceRange.min && book.price <= priceRange.max
    );

    // Filter by rating
    if (minRating > 0) {
      filtered = filtered.filter(book => book.rating >= minRating);
    }

    // Filter by stock
    if (inStockOnly) {
      filtered = filtered.filter(book => book.inStock);
    }

    // Sort results
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.publishedDate || '').getTime() - new Date(a.publishedDate || '').getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishedDate || '').getTime() - new Date(b.publishedDate || '').getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredBooks(filtered);
  }, [searchQuery, selectedCategory, selectedAuthor, priceRange, minRating, inStockOnly, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchQuery);
    window.history.pushState({}, '', url);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedAuthor('all');
    setPriceRange({ min: 0, max: 100000 });
    setSearchQuery('');
    setSortBy('newest');
    setMinRating(0);
    setInStockOnly(false);
  };

  return (
    <main className="min-h-screen bg-white transition-colors duration-500">
      {/* Hero Section */}
      <div className="bg-gray-50 border-b border-gray-200 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6">
              {t('search.title')}
            </h1>
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search.placeholder')}
                className="w-full bg-white border-2 border-gray-200 rounded-full px-8 py-4 text-lg md:text-xl focus:border-black focus:outline-none transition-colors shadow-sm"
                autoFocus
              />
              <button 
                type="submit"
                className={`absolute top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors ${isRTL ? 'left-3' : 'right-3'}`}
              >
                <Search size={24} />
              </button>
            </form>
            <p className="mt-4 text-gray-500">
              {filteredBooks.length} {t('search.resultsFound')}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
            {/* Left: Filter Toggles */}
            <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors whitespace-nowrap
                  ${showFilters ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300 hover:border-black'}`}
              >
                <SlidersHorizontal size={16} />
                {t('search.filters')}
              </button>

              <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block"></div>

              {/* Quick Categories */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                    ${selectedCategory === 'all' ? 'bg-gray-100 text-black' : 'text-gray-500 hover:text-black'}`}
                >
                  {t('search.allCategories')}
                </button>
                {categories.slice(0, 3).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                      ${selectedCategory === cat.id ? 'bg-gray-100 text-black' : 'text-gray-500 hover:text-black'}`}
                  >
                    {cat.name.ku}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Sort & View */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden sm:inline">{t('search.sortBy')}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-900 outline-none cursor-pointer"
                >
                  <option value="newest">{t('search.newest')}</option>
                  <option value="oldest">{t('search.oldest')}</option>
                  <option value="price-low">{t('search.priceLowHigh')}</option>
                  <option value="price-high">{t('search.priceHighLow')}</option>
                  <option value="rating">{t('search.mostPopular')}</option>
                  <option value="name">{t('search.nameAZ')}</option>
                </select>
              </div>

              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? 'max-h-[500px] opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'}`}>
            <div className="py-6 grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">{t('book.category')}</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCategory === category.id ? 'bg-black border-black' : 'border-gray-300 group-hover:border-black'}`}>
                        {selectedCategory === category.id && <div className="w-2 h-2 bg-white rounded-sm" />}
                      </div>
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="hidden"
                      />
                      <span className={`text-sm ${selectedCategory === category.id ? 'text-black font-medium' : 'text-gray-600 group-hover:text-black'}`}>
                        {category.name.ku}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Authors */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">{t('books.authors')}</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedAuthor === 'all' ? 'bg-black border-black' : 'border-gray-300 group-hover:border-black'}`}>
                      {selectedAuthor === 'all' && <div className="w-2 h-2 bg-white rounded-sm" />}
                    </div>
                    <input
                      type="radio"
                      name="author"
                      value="all"
                      checked={selectedAuthor === 'all'}
                      onChange={(e) => setSelectedAuthor(e.target.value)}
                      className="hidden"
                    />
                    <span className={`text-sm ${selectedAuthor === 'all' ? 'text-black font-medium' : 'text-gray-600 group-hover:text-black'}`}>
                      {t('books.all')}
                    </span>
                  </label>
                  {authors.map((author) => (
                    <label key={author} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedAuthor === author ? 'bg-black border-black' : 'border-gray-300 group-hover:border-black'}`}>
                        {selectedAuthor === author && <div className="w-2 h-2 bg-white rounded-sm" />}
                      </div>
                      <input
                        type="radio"
                        name="author"
                        value={author}
                        checked={selectedAuthor === author}
                        onChange={(e) => setSelectedAuthor(e.target.value)}
                        className="hidden"
                      />
                      <span className={`text-sm ${selectedAuthor === author ? 'text-black font-medium' : 'text-gray-600 group-hover:text-black'}`}>
                        {author}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">{t('search.priceRange')}</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>0 €</span>
                    <span className="font-medium text-black">{priceRange.max} €</span>
                  </div>
                </div>
              </div>

              {/* Other Filters */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">{t('search.filters')}</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${inStockOnly ? 'bg-black border-black' : 'border-gray-300 group-hover:border-black'}`}>
                      {inStockOnly && <Check size={12} className="text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="hidden"
                    />
                    <span className={`text-sm ${inStockOnly ? 'text-black font-medium' : 'text-gray-600 group-hover:text-black'}`}>
                      {t('books.inStockOnly')}
                    </span>
                  </label>
                  
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-2 mt-4"
                  >
                    <X size={14} />
                    {t('search.resetAll')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="container mx-auto px-6 py-12">
        {filteredBooks.length > 0 ? (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
              : 'grid-cols-1 md:grid-cols-2'
          }`}>
            {filteredBooks.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-serif text-gray-900 mb-2">{t('search.noResults')}</h3>
            <p className="text-gray-500 mb-8">
              {t('search.noResultsFor')} "{searchQuery}"
            </p>
            <button
              onClick={clearFilters}
              className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              {t('search.clearSearch')}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

// Helper component for check icon
function Check({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-gray-600">Loading search...</p>
      </div>
    </div>}>
      <SearchContent />
    </Suspense>
  );
}