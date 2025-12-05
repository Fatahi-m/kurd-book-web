'use client';

import { authors } from '@/data/books';
import { bookService } from '@/lib/bookService';
import { Author, Book } from '@/lib/types';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';
import { Search, ChevronDown } from 'lucide-react';

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
    <main className="min-h-screen bg-white transition-colors duration-300">
      
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex items-center space-x-2 text-sm tracking-widest uppercase text-gray-500">
              <Link href="/" className="hover:text-black transition-colors">
                {t('nav.home')}
              </Link>
              <span>/</span>
              <span className="text-black">{t('nav.authors')}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black">
              {t('authors.title') || t('nav.authors')}
            </h1>
            
            <div className="w-24 h-1 bg-black mx-auto"></div>
            
            <p className="max-w-2xl text-lg text-gray-600 font-serif leading-relaxed">
              {t('authors.literaryFigures')}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar - Sticky */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4 px-4 shadow-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Sort */}
            <div className="flex items-center gap-4">
               <div className="relative group">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-full text-sm focus:outline-none focus:border-black cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <option value="name">{t('authors.sortName')}</option>
                  <option value="books">{t('authors.sortBooks')}</option>
                  <option value="year">{t('authors.sortYear')}</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none rtl:left-3 rtl:right-auto" />
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('authors.search')}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:border-black outline-none transition-colors"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4 rtl:right-3 rtl:left-auto" />
            </div>

          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">

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
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border-4 border-transparent group-hover:border-gray-200">
                    {author.image ? (
                      <img 
                        src={author.image} 
                        alt={currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-3xl font-serif text-gray-400">
                        {(currentLanguage === 'ku' ? author.name : (author.latinName || author.name)).charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-lg font-serif text-black mb-1 group-hover:text-gray-600 transition-colors line-clamp-1">
                    {currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
                  </h2>
                  
                  <div className="text-xs font-light text-gray-500 mb-3 uppercase tracking-widest line-clamp-1">
                    {author.nationality} {author.birthYear && `• ${author.birthYear}`}
                  </div>

                  <div className="flex items-center justify-center gap-6 text-xs font-light text-gray-600">
                    <span>{authorBooks.length} {authorBooks.length === 1 ? t('authors.book') : t('authors.books')}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl font-serif text-gray-500 italic">
              {t('authors.noAuthorsFound')}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}