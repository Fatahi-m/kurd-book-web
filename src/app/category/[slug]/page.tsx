'use client';

import { useState, useEffect } from 'react';
import { books, categories } from '@/data/books';
import { Book, Category } from '@/lib/types';
import { adminDataService, AdminBook } from '@/lib/adminDataService';
import BookCard from '@/components/ui/BookCard';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search } from 'lucide-react';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { t, currentLanguage } = useLanguage();
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  const categoryBooks = allBooks.filter(book => {
    const matchesCategory = book.category === category.id;
    const matchesSearch = searchQuery === '' || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-white py-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Category Header */}
        <div className="mb-20 text-center">
          <div className="text-6xl mb-6 opacity-80">{category.icon}</div>
          <span className="text-sm font-light tracking-[0.2em] text-gray-500 uppercase mb-6 block">
            {t('book.category')}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-black mb-8">
            {category.name[currentLanguage]}
          </h1>
          <p className="text-xl font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {category.description?.[currentLanguage]}
          </p>
          
          <div className="mt-12 flex flex-col items-center justify-center gap-8 border-t border-gray-200 pt-8 max-w-md mx-auto">
            <span className="text-sm font-light text-gray-500 uppercase tracking-widest">
              {categoryBooks.length} {t('stats.books')}
            </span>
            
            {/* Search Input */}
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('books.searchPlaceholder') || "Search in this category..."}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:border-black outline-none transition-colors text-center"
              />
              <Search className="absolute left-4 top-3 text-gray-400 w-4 h-4" />
            </div>
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
            <h2 className="text-2xl font-serif text-black mb-4">
              {t('search.noResults')}
            </h2>
            <p className="text-gray-500 font-light">
              {t('category.empty')}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}