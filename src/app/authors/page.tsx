'use client';

import { authors, books } from '@/data/books';
import { Author, Book } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';

export default function AuthorsPage() {
  const { t, currentLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  const filteredAuthors = authors
    .filter(author => 
      author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (author.bio?.ku && author.bio.ku.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'books':
          return b.books.length - a.books.length;
        case 'year':
          return (b.birthYear || 0) - (a.birthYear || 0);
        default:
          return 0;
      }
    });

  const getAuthorBooks = (authorName: string): Book[] => {
    return books.filter(book => book.author === authorName);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('authors.title')}</h1>
          <p className="text-gray-600 mb-6">
            {t('authors.subtitle')}
          </p>

          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('authors.search')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-gray-600">{t('authors.sortBy')}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">{t('authors.sortName')}</option>
                <option value="books">{t('authors.sortBooks')}</option>
                <option value="year">{t('authors.sortYear')}</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredAuthors.length} {t('authors.found')}
          </div>
        </div>

        {/* Authors Grid */}
        {filteredAuthors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredAuthors.map((author: Author) => {
              const authorBooks = getAuthorBooks(author.name);
              
              return (
                <div
                  key={author.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"
                >
                  {/* Author Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                        {author.image ? (
                          <img 
                            src={author.image} 
                            alt={currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-lg font-bold">
                            {(currentLanguage === 'ku' ? author.name : (author.latinName || author.name)).charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-gray-800 truncate">
                          {currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
                        </h2>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse text-xs text-gray-500">
                          {author.birthYear && (
                            <span>{author.deathYear ? `${author.birthYear}-${author.deathYear}` : author.birthYear}</span>
                          )}
                          {author.nationality && (
                            <span>{author.nationality}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>
                        {authorBooks.length} {authorBooks.length === 1 ? t('authors.book') : t('authors.books')}
                      </span>
                      <span>
                        {authorBooks.reduce((sum, book) => sum + book.reviewCount, 0)} {t('book.reviews')}
                      </span>
                    </div>
                  </div>

                  {/* Author's Books Preview */}
                  <div className="px-4 pb-2 flex-grow">
                    <h3 className="font-semibold text-gray-800 mb-3">{t('authors.books')}</h3>
                    {authorBooks.length > 0 ? (
                      <div className="space-y-2">
                        {authorBooks.slice(0, 2).map((book: Book) => (
                          <div
                            key={book.id}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                          >
                            <div className="flex items-center space-x-2 rtl:space-x-reverse flex-1 min-w-0">
                              <div className="w-6 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                                <span className="text-xs text-blue-600">📚</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">
                                  {book.title}
                                </p>
                              </div>
                            </div>
                            <div className="text-right rtl:text-left flex-shrink-0 ml-2 rtl:ml-0 rtl:mr-2">
                              <p className="text-sm font-bold text-blue-600">
                                {formatPrice(book.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        {authorBooks.length > 2 && (
                          <div className="text-center mt-2">
                            <span className="text-xs text-gray-500">
                              +{authorBooks.length - 2} {t('authors.moreBooks')}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">
                        {t('authors.noBooks')}
                      </p>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="p-4 border-t border-gray-200 mt-auto">
                    <Link
                      href={`/author/${author.id}`}
                      className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block font-medium"
                    >
                      {t('authors.viewProfile')}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">👤</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('authors.noAuthorsFound')}
            </h2>
            <p className="text-gray-600 mb-4">
              {searchQuery ? `${t('search.noResultsFor')} "${searchQuery}"` : t('authors.noAuthorsMessage')}
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('authors.clearSearch')}
            </button>
          </div>
        )}

        {/* Popular Authors Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('authors.popularAuthors')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {authors.slice(0, 4).map((author: Author) => {
              const authorBooks = getAuthorBooks(author.name);
              const totalSales = authorBooks.reduce((sum, book) => sum + book.reviewCount, 0);
              
              return (
                <Link
                  key={author.id}
                  href={`/author/${author.id}`}
                  className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden">
                    {author.image ? (
                      <img 
                        src={author.image} 
                        alt={currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-xl font-bold">
                        {(currentLanguage === 'ku' ? author.name : (author.latinName || author.name)).charAt(0)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {authorBooks.length} {authorBooks.length === 1 ? t('authors.book') : t('authors.books')}
                  </p>
                  <p className="text-xs text-blue-600">{totalSales} {t('book.reviews')}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}