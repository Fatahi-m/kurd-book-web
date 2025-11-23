'use client';

import { useState, useEffect } from 'react';
import { books, categories } from '@/data/books';
import { Book, Category } from '@/lib/types';
import { adminDataService, AdminBook } from '@/lib/adminDataService';
import BookCard from '@/components/ui/BookCard';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const category = categories.find(cat => cat.slug === params.slug);
  
  useEffect(() => {
    // Combine static books with admin books
    const adminBooks = adminDataService.getAllBooks();
    const convertedAdminBooks: Book[] = adminBooks.map((adminBook: AdminBook) => ({
      id: adminBook.id,
      title: adminBook.title,
      author: adminBook.author,
      publisher: adminBook.publisher,
      price: adminBook.price,
      originalPrice: adminBook.originalPrice,
      image: adminBook.imageUrl,
      coverUrl: adminBook.imageUrl,
      description: adminBook.description,
      isbn: adminBook.isbn,
      pages: adminBook.pages,
      language: adminBook.language,
      category: adminBook.category,
      tags: adminBook.tags,
      publishDate: adminBook.publishDate,
      publishedDate: adminBook.publishDate,
      inStock: adminBook.inStock,
      inventoryCount: adminBook.inventoryCount,
      featured: adminBook.featured,
      bestseller: adminBook.bestseller,
      newRelease: adminBook.newRelease,
      rating: adminBook.rating,
      reviewCount: adminBook.reviewCount
    }));
    
    setAllBooks([...books, ...convertedAdminBooks]);
  }, []);
  
  if (!category) {
    notFound();
  }

  const categoryBooks = allBooks.filter(book => book.category === category.id);

  return (
    <main className="min-h-screen bg-[#F5F2E9] dark:bg-[#121212] py-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Category Header */}
        <div className="mb-20 text-center">
          <div className="text-6xl mb-6 opacity-80">{category.icon}</div>
          <span className="text-sm font-light tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase mb-6 block">
            Category
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-gray-900 dark:text-white mb-8">
            {category.name.ku}
          </h1>
          <p className="text-xl font-light text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {category.description?.ku}
          </p>
          
          <div className="mt-12 flex items-center justify-center gap-8 border-t border-gray-200 dark:border-gray-800 pt-8 max-w-xs mx-auto">
            <span className="text-sm font-light text-gray-500 uppercase tracking-widest">
              {categoryBooks.length} Books
            </span>
          </div>
        </div>

        {/* Books Grid */}
        {categoryBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {categoryBooks.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6 opacity-20">📚</div>
            <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-4">
              No books found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-light">
              This category is currently empty.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}