'use client';

import React, { useState, useEffect } from 'react';
import { books } from '@/data/books';
import { Book, UserFavorites } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import BookCard from '@/components/ui/BookCard';
import Link from 'next/link';
import { Heart } from 'lucide-react';

// Mock favorites data
const mockFavorites: UserFavorites = {
  userId: '1',
  bookIds: ['1', '3', '5', '7'],
  updatedAt: new Date('2024-11-15')
};

interface FavoritesTabProps {
  userId: string;
}

export default function FavoritesTab({ userId }: FavoritesTabProps) {
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading favorites from API
    const loadFavorites = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In real app, this would be API call
      if (userId === mockFavorites.userId) {
        setFavorites(mockFavorites.bookIds);
      }
      setIsLoading(false);
    };

    loadFavorites();
  }, [userId]);

  const removeFavorite = (bookId: string) => {
    setFavorites(prev => prev.filter(id => id !== bookId));
    // In real app, this would also call API to update backend
  };

  const favoriteBooks = books.filter(book => favorites.includes(book.id));

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">چاوەڕێ بکە...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">لیستی دڵخواز بەتاڵە</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">تۆ تا ئێستا هیچ کتابێکت زیاد نەکردووە بۆ لیستی دڵخواز.</p>
        <Link 
          href="/books" 
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          گەڕان بەناو کتابەکان
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">لیستی دڵخواز</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}