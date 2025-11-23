'use client';

import { authors } from '@/data/books';
import { bookService } from '@/lib/bookService';
import { Author, Book } from '@/lib/types';
import { notFound } from 'next/navigation';
import BookCard from '@/components/ui/BookCard';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

interface AuthorDetailPageProps {
  params: {
    id: string;
  };
}

export default function AuthorDetailPage({ params }: AuthorDetailPageProps) {
  const { t, currentLanguage } = useLanguage();
  const [books, setBooks] = useState<Book[]>([]);
  const author = authors.find(a => a.id === params.id);
  
  useEffect(() => {
    setBooks(bookService.getAllBooks());
  }, []);
  
  if (!author) {
    notFound();
  }

  const authorBooks = books.filter(book => book.author === author.name);
  const totalReviews = authorBooks.reduce((sum, book) => sum + book.reviewCount, 0);
  const averageRating = authorBooks.length > 0 
    ? authorBooks.reduce((sum, book) => sum + book.rating, 0) / authorBooks.length 
    : 0;

  const booksByCategory = authorBooks.reduce((acc, book) => {
    const category = book.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(book);
    return acc;
  }, {} as Record<string, Book[]>);

  return (
    <main className="min-h-screen bg-[#F5F2E9] dark:bg-[#121212] py-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="text-xs font-light tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase mb-12 text-center">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link>
          <span className="mx-4">/</span>
          <Link href="/authors" className="hover:text-gray-900 dark:hover:text-white transition-colors">Authors</Link>
          <span className="mx-4">/</span>
          <span className="text-gray-900 dark:text-white">
            {currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
          </span>
        </nav>

        <div className="max-w-5xl mx-auto">
          {/* Author Profile */}
          <div className="text-center mb-20">
            <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              {author.image ? (
                <img 
                  src={author.image} 
                  alt={currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-6xl font-serif text-gray-400">
                  {(currentLanguage === 'ku' ? author.name : (author.latinName || author.name)).charAt(0)}
                </div>
              )}
            </div>

            <h1 className="text-5xl md:text-6xl font-serif text-gray-900 dark:text-white mb-6">
              {currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
            </h1>

            <div className="flex flex-wrap justify-center gap-6 text-sm font-light text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-8">
              {author.birthYear && (
                <span>{author.deathYear ? `${author.birthYear} — ${author.deathYear}` : `Born ${author.birthYear}`}</span>
              )}
              {author.nationality && (
                <span>{author.nationality}</span>
              )}
            </div>

            {author.bio?.[currentLanguage] && (
              <p className="text-xl font-light text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
                {author.bio[currentLanguage]}
              </p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-b border-gray-200 dark:border-gray-800 py-8">
              <div>
                <div className="text-3xl font-serif text-gray-900 dark:text-white mb-2">{authorBooks.length}</div>
                <div className="text-xs font-light uppercase tracking-widest text-gray-500">Books</div>
              </div>
              <div>
                <div className="text-3xl font-serif text-gray-900 dark:text-white mb-2">{totalReviews}</div>
                <div className="text-xs font-light uppercase tracking-widest text-gray-500">Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-serif text-gray-900 dark:text-white mb-2">{averageRating.toFixed(1)}</div>
                <div className="text-xs font-light uppercase tracking-widest text-gray-500">Rating</div>
              </div>
            </div>
          </div>

          {/* Author's Books */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12 border-b border-gray-200 dark:border-gray-800 pb-6">
              <h2 className="text-3xl font-serif text-gray-900 dark:text-white">
                Bibliography
              </h2>
            </div>

            {authorBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
                {authorBooks.map((book: Book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 font-light italic">
                  No books available at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}