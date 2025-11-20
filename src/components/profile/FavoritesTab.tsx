'use client';

import React, { useState, useEffect } from 'react';
import { books } from '@/data/books';
import { Book, UserFavorites } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import BookCard from '@/components/ui/BookCard';

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
        <p className="text-gray-600">چاوەڕێ بکە...</p>
      </div>
    );
  }

  if (favoriteBooks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-gray-400 text-2xl">❤️</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ کتابێکت دڵخواز نەکردووە</h3>
        <p className="text-gray-500 mb-4">کتابەکانی دڵخوازت لێرە نیشان دەدرێن</p>
        <a
          href="/books"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          گەڕان بۆ کتاب
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">کتابە دڵخوازەکانت</h2>
        <p className="text-sm text-gray-600">{favoriteBooks.length} کتاب</p>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoriteBooks.map((book) => (
          <div key={book.id} className="relative">
            <BookCard book={book} />
            
            {/* Remove from favorites button */}
            <button
              onClick={() => removeFavorite(book.id)}
              className="absolute top-2 right-2 rtl:right-auto rtl:left-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
              title="سڕینەوە لە دڵخوازەکان"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Clear All Favorites */}
      {favoriteBooks.length > 0 && (
        <div className="flex justify-center pt-6 border-t border-gray-200">
          <button
            onClick={() => setFavorites([])}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-800 border border-red-300 hover:border-red-400 rounded-md transition-colors"
          >
            سڕینەوەی هەموو دڵخوازەکان
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">کردارە خێراکان</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              const allIds = favoriteBooks.map(book => book.id);
              // Add all favorites to cart logic here
              console.log('Adding all favorites to cart:', allIds);
            }}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            زیادکردنی هەموو بۆ سەبەتە
          </button>
          <a
            href="/books?category=recommendations"
            className="px-3 py-1 text-xs bg-white text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
          >
            پێشنیاری کتابی نوێ
          </a>
        </div>
      </div>
    </div>
  );
}