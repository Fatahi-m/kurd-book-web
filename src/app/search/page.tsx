'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { books, categories } from '@/data/books';
import { Book, Category } from '@/lib/types';
import BookCard from '@/components/ui/BookCard';
import { useLanguage } from '@/contexts/LanguageContext';

function SearchContent() {
  const { t } = useLanguage();
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

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
              {t('search.title')}
            </h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {showFilters ? 'Hide Filters' : t('search.filters')}
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex space-x-4 rtl:space-x-reverse">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search.placeholder')}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('search.title')}
              </button>
            </div>
          </form>

          {/* Results Info */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>
              {filteredBooks.length} {t('search.resultsFound')}
              {searchQuery && ` for "${searchQuery}"`}
            </span>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span>{t('search.sortBy')}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="newest">{t('search.newest')}</option>
                <option value="oldest">{t('search.oldest')}</option>
                <option value="price-low">{t('search.priceLowHigh')}</option>
                <option value="price-high">{t('search.priceHighLow')}</option>
                <option value="rating">{t('search.mostPopular')}</option>
                <option value="name">{t('search.nameAZ')}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4 transition-colors duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">{t('search.filters')}</h2>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedAuthor('all');
                    setPriceRange({ min: 0, max: 100000 });
                    setSearchQuery('');
                    setSortBy('newest');
                    setMinRating(0);
                    setInStockOnly(false);
                  }}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">{t('book.category')}</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2 rtl:mr-0 rtl:ml-2 accent-blue-600"
                    />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">{t('search.allCategories')}</span>
                  </label>
                  {categories.map((category: Category) => (
                    <label key={category.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2 rtl:mr-0 rtl:ml-2 accent-blue-600"
                      />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{category.name.ku}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Author Filter */}
              <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">{t('book.author')}</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="author"
                      value="all"
                      checked={selectedAuthor === 'all'}
                      onChange={(e) => setSelectedAuthor(e.target.value)}
                      className="mr-2 rtl:mr-0 rtl:ml-2 accent-blue-600"
                    />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">All Authors</span>
                  </label>
                  {authors.map((author) => (
                    <label key={author} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="author"
                        value={author}
                        checked={selectedAuthor === author}
                        onChange={(e) => setSelectedAuthor(e.target.value)}
                        className="mr-2 rtl:mr-0 rtl:ml-2 accent-blue-600"
                      />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{author}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">{t('search.priceRange')}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{t('search.minPrice')}:</label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{t('search.maxPrice')}:</label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value) || 200})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="mr-2 rtl:mr-0 rtl:ml-2 accent-blue-600"
                      />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 rtl:ml-0 rtl:mr-1">& Up</span>
                      </div>
                    </label>
                  ))}
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === 0}
                      onChange={() => setMinRating(0)}
                      className="mr-2 rtl:mr-0 rtl:ml-2 accent-blue-600"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Any Rating</span>
                  </label>
                </div>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Availability</h3>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="mr-2 rtl:mr-0 rtl:ml-2 accent-blue-600 w-4 h-4"
                  />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">In Stock Only</span>
                </label>
              </div>

            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book: Book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center transition-colors duration-300">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {t('search.noResults')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No books found for "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedAuthor('all');
                    setPriceRange({ min: 0, max: 100000 });
                    setMinRating(0);
                    setInStockOnly(false);
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading search...</p>
      </div>
    </div>}>
      <SearchContent />
    </Suspense>
  );
}