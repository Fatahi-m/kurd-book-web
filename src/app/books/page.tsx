'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { bookService } from '@/lib/bookService';
import { Book } from '@/lib/types';
import BookCard from '@/components/ui/BookCard';

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
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Load books on client side
    const allBooks = bookService.getAllBooks();
    setBooks(allBooks);
  }, []);

  const filteredBooks = books.filter(book => {
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
      case 'publishedDate':
        return new Date(b.publishedDate || '').getTime() - new Date(a.publishedDate || '').getTime();
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Ad Space - Visible on Large Screens */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg h-[600px] flex flex-col items-center justify-center text-gray-400 p-4">
                <span className="text-4xl mb-2">📢</span>
                <span className="text-center font-medium">شوێنی ریکلام</span>
                <span className="text-xs text-center mt-2">(Ad Space)</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {sortedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
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

          {/* Right Ad Space - Visible on Large Screens */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg h-[600px] flex flex-col items-center justify-center text-gray-400 p-4">
                <span className="text-4xl mb-2">📢</span>
                <span className="text-center font-medium">شوێنی ریکلام</span>
                <span className="text-xs text-center mt-2">(Ad Space)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}