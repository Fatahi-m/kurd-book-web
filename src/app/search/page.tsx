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
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

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

    // Filter by price range
    filtered = filtered.filter(book => 
      book.price >= priceRange.min && book.price <= priceRange.max
    );

    // Sort results
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime());
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
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchQuery);
    window.history.pushState({}, '', url);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
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
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {filteredBooks.length} {t('search.resultsFound')}
              {searchQuery && ` for "${searchQuery}"`}
            </span>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span>{t('search.sortBy')}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">{t('search.filters')}</h2>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">{t('book.category')}</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2 rtl:mr-0 rtl:ml-2"
                    />
                    {t('search.allCategories')}
                  </label>
                  {categories.map((category: Category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2 rtl:mr-0 rtl:ml-2"
                      />
                      {category.name.ku}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">{t('search.priceRange')}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">{t('search.minPrice')}:</label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">{t('search.maxPrice')}:</label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value) || 100000})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Quick Filters</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilteredBooks(books.filter(book => book.featured))}
                    className="w-full text-left rtl:text-right px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    {t('homepage.featured')}
                  </button>
                  <button
                    onClick={() => setFilteredBooks(books.filter(book => book.bestseller))}
                    className="w-full text-left rtl:text-right px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-md"
                  >
                    {t('homepage.bestsellers')}
                  </button>
                  <button
                    onClick={() => setFilteredBooks(books.filter(book => book.newRelease))}
                    className="w-full text-left rtl:text-right px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md"
                  >
                    {t('homepage.newReleases')}
                  </button>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange({ min: 0, max: 100000 });
                  setSearchQuery('');
                  setSortBy('newest');
                }}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Reset Filters
              </button>
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
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {t('search.noResults')}
                </h2>
                <p className="text-gray-600 mb-4">
                  No books found for "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPriceRange({ min: 0, max: 100000 });
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
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading search...</p>
      </div>
    </div>}>
      <SearchContent />
    </Suspense>
  );
}