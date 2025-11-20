'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

// Mock data for books
const mockBooks = [
  {
    id: 1,
    title: 'میژووی کورد',
    author: 'د. کەمال مەزهەر ئەحمەد',
    publisher: 'دەزگای چاپ و بڵاوکردنەوەی کوردستان',
    price: 25.00,
    originalPrice: 30.00,
    category: 'history',
    language: 'ku',
    pages: 320,
    year: 2023,
    rating: 4.8,
    reviews: 156,
    inStock: true,
    description: 'کتابێکی گرنگ دەربارەی میژووی گەلی کورد لە سەدەکانی ڕابردوودا'
  },
  {
    id: 2,
    title: 'شیعرەکانی نالی',
    author: 'نالی',
    publisher: 'چاپخانەی کوردستان',
    price: 18.00,
    originalPrice: 22.00,
    category: 'poetry',
    language: 'ku',
    pages: 250,
    year: 2022,
    rating: 4.9,
    reviews: 203,
    inStock: true,
    description: 'کۆمەڵێک لە باشترین شیعرەکانی نالی'
  },
  {
    id: 3,
    title: 'چیرۆکەکانی مندالان',
    author: 'ئەحمەد کوردی',
    publisher: 'دەزگای مندالان',
    price: 15.00,
    category: 'children',
    language: 'ku',
    pages: 120,
    year: 2023,
    rating: 4.7,
    reviews: 89,
    inStock: true,
    description: 'کۆمەڵێک چیرۆکی خۆش و فێرکار بۆ منداڵان'
  },
  {
    id: 4,
    title: 'Kurdistan History',
    author: 'Dr. Ahmad Sharifi',
    publisher: 'Kurdistan Academic Press',
    price: 32.00,
    category: 'history',
    language: 'en',
    pages: 420,
    year: 2023,
    rating: 4.6,
    reviews: 134,
    inStock: true,
    description: 'Comprehensive history of Kurdistan and Kurdish people'
  },
  {
    id: 5,
    title: 'Kurdish Literature',
    author: 'Prof. Sara Mahmud',
    publisher: 'Academic Publishing',
    price: 28.00,
    category: 'literature',
    language: 'en',
    pages: 380,
    year: 2022,
    rating: 4.5,
    reviews: 98,
    inStock: true,
    description: 'An overview of Kurdish literary traditions and modern works'
  },
  {
    id: 6,
    title: 'Geschichte Kurdistans',
    author: 'Dr. Hassan Ali',
    publisher: 'Europäischer Verlag',
    price: 35.00,
    category: 'history',
    language: 'de',
    pages: 450,
    year: 2023,
    rating: 4.7,
    reviews: 76,
    inStock: true,
    description: 'Eine umfassende Geschichte Kurdistans und der kurdischen Kultur'
  }
];

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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');

  const filteredBooks = mockBooks.filter(book => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'year':
        return b.year - a.year;
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('nav.books')}</h1>
          <p className="text-gray-600">{t('books.subtitle')}</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('books.category')}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {t(category.key)}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('books.search')}
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('books.searchPlaceholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('books.sortBy')}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="title">{t('books.sortName')}</option>
                <option value="price">{t('books.sortPrice')}</option>
                <option value="rating">{t('books.sortRating')}</option>
                <option value="year">{t('books.sortYear')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {t('books.found')} {sortedBooks.length}
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Book Cover */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-4xl text-gray-400">📚</div>
              </div>

              {/* Book Info */}
              <div className="p-4">
                <Link href={`/book/${book.id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 mb-2 line-clamp-2">
                    {book.title}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-600 mb-1">{book.author}</p>
                <p className="text-xs text-gray-500 mb-3">{book.publisher}</p>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    {book.rating} ({book.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-bold text-blue-600">
                      {formatPrice(book.price)}
                    </span>
                    {book.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {formatPrice(book.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                  {t('book.addToCart')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedBooks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('books.noResults')}</h3>
            <p className="text-gray-600">{t('books.noResultsMessage')}</p>
          </div>
        )}
      </div>
    </main>
  );
}