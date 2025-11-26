'use client';

import { authors } from '@/data/books';
import { bookService } from '@/lib/bookService';
import { Author, Book } from '@/lib/types';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';

export default function AuthorsPage() {
  const { t, currentLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(bookService.getAllBooks());
  }, []);
  
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
    <main className="min-h-screen bg-slate-50 dark:bg-[#0f172a] py-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="text-sm font-light tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase mb-6 block">
            {t('authors.literaryFigures')}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-gray-900 dark:text-white mb-8">
            {t('authors.title')}
          </h1>
          
          {/* Search & Filter */}
          <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-center mt-12">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('authors.search')}
                className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-3 text-center text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white outline-none transition-colors font-light placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-light text-gray-500 uppercase tracking-widest">{t('authors.sortBy')}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-gray-900 dark:text-white font-serif focus:ring-0 cursor-pointer"
              >
                <option value="name">{t('authors.sortName')}</option>
                <option value="books">{t('authors.sortBooks')}</option>
                <option value="year">{t('authors.sortYear')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Authors Grid */}
        {filteredAuthors.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
            {filteredAuthors.map((author: Author) => {
              const authorBooks = getAuthorBooks(author.name);
              return (
                <Link 
                  href={`/author/${author.id}`}
                  key={author.id} 
                  className="group block text-center"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border-4 border-transparent group-hover:border-gray-200 dark:group-hover:border-gray-700">
                    {author.image ? (
                      <img 
                        src={author.image} 
                        alt={currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-3xl font-serif text-gray-400">
                        {(currentLanguage === 'ku' ? author.name : (author.latinName || author.name)).charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-lg font-serif text-gray-900 dark:text-white mb-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors line-clamp-1">
                    {currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
                  </h2>
                  
                  <div className="text-xs font-light text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-widest line-clamp-1">
                    {author.nationality} {author.birthYear && `• ${author.birthYear}`}
                  </div>

                  <div className="flex items-center justify-center gap-6 text-xs font-light text-gray-600 dark:text-gray-400">
                    <span>{authorBooks.length} {authorBooks.length === 1 ? t('authors.book') : t('authors.books')}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl font-serif text-gray-500 dark:text-gray-400 italic">
              {t('authors.noAuthorsFound')}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}