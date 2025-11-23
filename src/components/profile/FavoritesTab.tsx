'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Book } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface FavoritesTabProps {
  userId: string;
}

export default function FavoritesTab({ userId }: FavoritesTabProps) {
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { t, currentLanguage } = useLanguage();

  const handleAddToCart = (item: any) => {
    const book: Book = {
      id: item.id,
      title: item.title,
      author: item.author,
      price: item.price,
      originalPrice: item.originalPrice,
      coverUrl: item.imageUrl,
      description: '',
      language: 'kurdish',
      category: 'general',
      tags: [],
      inStock: item.inStock,
      featured: false,
      bestseller: false,
      newRelease: false,
      rating: 0,
      reviewCount: 0,
      publisher: ''
    };
    addToCart(book, 1);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {currentLanguage === 'ku' ? 'لیستی دڵخواز بەتاڵە' : currentLanguage === 'en' ? 'Wishlist is empty' : 'Wunschliste ist leer'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {currentLanguage === 'ku' 
            ? 'تۆ تا ئێستا هیچ کتێبێکت زیاد نەکردووە بۆ لیستی دڵخواز.' 
            : currentLanguage === 'en' 
              ? 'You haven\'t added any books to your wishlist yet.' 
              : 'Sie haben noch keine Bücher zu Ihrer Wunschliste hinzugefügt.'}
        </p>
        <Link 
          href="/books" 
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {currentLanguage === 'ku' ? 'گەڕان بۆ کتێب' : currentLanguage === 'en' ? 'Browse Books' : 'Bücher durchsuchen'}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        {currentLanguage === 'ku' ? 'لیستی دڵخواز' : currentLanguage === 'en' ? 'My Wishlist' : 'Meine Wunschliste'}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="relative aspect-[2/3] overflow-hidden">
              <img 
                src={item.imageUrl || '/images/placeholder-book.jpg'} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="p-2 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors shadow-lg transform hover:scale-110"
                  title={currentLanguage === 'ku' ? 'زیادکردن بۆ سەبەتە' : 'Add to Cart'}
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="p-2 bg-white text-red-500 rounded-full hover:bg-red-50 transition-colors shadow-lg transform hover:scale-110"
                  title={currentLanguage === 'ku' ? 'ل لابردن' : 'Remove'}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <Link href={`/book/${item.id}`}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-1">
                {item.author}
              </p>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col">
                  {item.originalPrice && item.originalPrice > item.price ? (
                    <>
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        {formatPrice(item.price)}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(item.originalPrice)}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {formatPrice(item.price)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}