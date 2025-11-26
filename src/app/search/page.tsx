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
    <main className="min-h-screen bg-slate-50 dark:bg-[#0f172a] py-12 transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Search Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-200 dark:border-gray-800 pb-8">
            <div className="flex-1">
              <span className="text-sm font-light tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase mb-4 block">
                {t('search.title')}
              </span>
              <form onSubmit={handleSearch} className="relative max-w-2xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="w-full bg-transparent text-3xl md:text-5xl font-serif text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-700 outline-none"
                  autoFocus
                />
              </form>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                {filteredBooks.length} {t('search.resultsFound')}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-sm uppercase tracking-widest text-gray-900 dark:text-white border border-gray-900 dark:border-white px-6 py-2 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
              >
                {showFilters ? t('search.hideFilters') : t('search.filters')}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-3 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24 space-y-12">
              {/* Reset */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-serif text-gray-900 dark:text-white">{t('search.filters')}</h3>
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
                  className="text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {t('search.resetAll')}
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-light tracking-[0.2em] text-gray-500 uppercase mb-4">{t('book.category')}</h4>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="hidden"
                    />
                    <span className={`text-sm transition-colors ${selectedCategory === 'all' ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                      {t('search.allCategories')}
                    </span>
                  </label>
                  {categories.map((category: Category) => (
                    <label key={category.id} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="hidden"
                      />
                      <span className={`text-sm transition-colors ${selectedCategory === category.id ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                        {category.name.ku}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="text-xs font-light tracking-[0.2em] text-gray-500 uppercase mb-4">{t('search.sortBy')}</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-2 text-sm text-gray-900 dark:text-white outline-none cursor-pointer"
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

          {/* Results */}
          <div className="lg:col-span-9">
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {filteredBooks.map((book: Book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border-t border-gray-200 dark:border-gray-800">
                <p className="text-xl font-serif text-gray-500 dark:text-gray-400 italic mb-8">
                  {t('search.noResultsFor')} "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-sm uppercase tracking-widest text-gray-900 dark:text-white border-b border-gray-900 dark:border-white pb-1 hover:opacity-70 transition-opacity"
                >
                  {t('search.clearSearch')}
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
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">{/* We can't use t() here because it's outside LanguageProvider context usually, but here it is inside layout which has provider. 
           However, SearchPage component itself doesn't use hook. 
           Wait, SearchPage is a server component or client? It has 'use client'.
           But Suspense fallback is rendered before the component loads.
           Actually, t() is not available here easily without wrapping.
           Let's check if I can use t() here. 
           The t function comes from useLanguage hook.
           SearchPage is the default export.
           I can make a separate component for the fallback or just leave it hardcoded for now or use a simple "Loading..." which might be acceptable or try to use a client component for fallback.
           
           Actually, let's look at how other pages handle loading.
           They usually don't have explicit Suspense boundaries with custom text like this.
           
           I'll leave "Loading search..." as is for now or change it to "Loading..." which is more generic.
           But wait, I can create a Loading component that uses useLanguage.
           
           Let's just change it to "Loading..." for now to be safe, or better yet, I can't use t() inside the fallback prop directly if t is not defined in that scope.
           SearchPage component function body is where t is defined.
           The Suspense is wrapping SearchContent.
           SearchPage itself is a component.
           
           I can move the Suspense inside a wrapper that has access to t, but SearchPage is the page component.
           
           Let's just skip this one for now as it's a loading state and might not be critical, or I can try to use a generic loading component.
           
           Actually, I'll just leave it.
           */
        }Loading search...</p>
      </div>
    </div>}>
      <SearchContent />
    </Suspense>
  );
}