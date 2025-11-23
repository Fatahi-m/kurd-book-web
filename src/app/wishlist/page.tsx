'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, BookOpen, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Book } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export default function WishlistPage() {
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { t, currentLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (item: any) => {
    // Convert WishlistItem to Book type for cart
    // Note: In a real app, we might need to fetch full book details
    // or ensure WishlistItem has all necessary fields
    const book: Book = {
      id: item.id,
      title: item.title,
      author: item.author,
      price: item.price,
      originalPrice: item.originalPrice,
      coverUrl: item.imageUrl, // Mapping imageUrl to coverUrl
      description: '', // Missing in WishlistItem
      language: 'kurdish', // Default or missing
      category: 'general', // Default or missing
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500 fill-current" />
              {currentLanguage === 'ku' ? 'لیستی دڵخواز' : currentLanguage === 'en' ? 'My Wishlist' : 'Meine Wunschliste'}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {wishlistItems.length} {currentLanguage === 'ku' ? 'کتێب' : currentLanguage === 'en' ? 'items' : 'Artikel'}
            </p>
          </div>
          
          {wishlistItems.length > 0 && (
            <Link 
              href="/books" 
              className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              {currentLanguage === 'ku' ? 'زیاتر بگەڕێ' : currentLanguage === 'en' ? 'Continue Shopping' : 'Weiter einkaufen'}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto transition-all duration-300">
            <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-red-300 dark:text-red-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'ku' ? 'لیستی دڵخوازت بەتاڵە' : currentLanguage === 'en' ? 'Your wishlist is empty' : 'Ihre Wunschliste ist leer'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {currentLanguage === 'ku' 
                ? 'هیچ کتێبێکت زیاد نەکردووە بۆ لیستی دڵخواز. کتێبەکان بگەڕێ و ئەوانەی بەدڵتە زیادیان بکە.' 
                : currentLanguage === 'en' 
                  ? 'You haven\'t added any books to your wishlist yet. Browse our collection and save your favorites.' 
                  : 'Sie haben noch keine Bücher zu Ihrer Wunschliste hinzugefügt. Stöbern Sie in unserer Sammlung und speichern Sie Ihre Favoriten.'}
            </p>
            <Link 
              href="/books" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-none transform hover:-translate-y-1"
            >
              <BookOpen className="w-5 h-5" />
              {currentLanguage === 'ku' ? 'گەڕان بۆ کتێب' : currentLanguage === 'en' ? 'Browse Books' : 'Bücher durchsuchen'}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100 dark:border-gray-700">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img 
                    src={item.imageUrl || '/images/placeholder-book.jpg'} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="p-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors transform hover:scale-110 shadow-lg"
                      title={currentLanguage === 'ku' ? 'زیادکردن بۆ سەبەتە' : 'Add to Cart'}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-3 bg-white text-red-500 rounded-full hover:bg-red-50 transition-colors transform hover:scale-110 shadow-lg"
                      title={currentLanguage === 'ku' ? 'ل لابردن' : 'Remove'}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                      SALE
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <Link href={`/book/${item.id}`}>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {item.author}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                      {item.originalPrice && item.originalPrice > item.price ? (
                        <>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {formatPrice(item.price)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {formatPrice(item.price)}
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="md:hidden p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}