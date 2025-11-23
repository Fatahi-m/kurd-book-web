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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Category Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors duration-300">
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
            <div className="text-4xl">{category.icon}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{category.name.ku}</h1>
              <p className="text-gray-600 dark:text-gray-300">{category.description?.ku}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {categoryBooks.length} کتاب لە پۆلی {category.name.ku}
            </p>
            
            {/* Sort Options */}
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="newest">نوێترین</option>
              <option value="oldest">کۆنترین</option>
              <option value="price-low">نرخ: نزمەوە بەرز</option>
              <option value="price-high">نرخ: بەرزەوە نزم</option>
              <option value="rating">هەڵسەنگاندن</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        {categoryBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categoryBooks.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              هیچ کتابێک نەدۆزرایەوە
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              ئێستا لەم پۆلەدا کتاب نییە، زوو کتابەکان زیاد دەکرێن.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}