'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, BookOpen, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Book } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

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
      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] pt-24 pb-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b border-black dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] pt-12 pb-24 transition-colors duration-300 font-sans">
      <div className="container mx-auto px-4">
        <div className="flex items-baseline justify-between mb-12 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'ku' ? 'لیستی دڵخواز' : currentLanguage === 'en' ? 'My Wishlist' : 'Meine Wunschliste'}
            </h1>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              {wishlistItems.length} {currentLanguage === 'ku' ? 'کتێب' : currentLanguage === 'en' ? 'items' : 'Artikel'}
            </p>
          </div>
          
          {wishlistItems.length > 0 && (
            <Link 
              href="/books" 
              className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              {currentLanguage === 'ku' ? 'زیاتر بگەڕێ' : currentLanguage === 'en' ? 'Continue Shopping' : 'Weiter einkaufen'}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto py-24"
          >
            <div className="text-6xl mb-6 opacity-20">♡</div>
            <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'ku' ? 'لیستی دڵخوازت بەتاڵە' : currentLanguage === 'en' ? 'Your wishlist is empty' : 'Ihre Wunschliste ist leer'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 font-light leading-relaxed">
              {currentLanguage === 'ku' 
                ? 'هیچ کتێبێکت زیاد نەکردووە بۆ لیستی دڵخواز. کتێبەکان بگەڕێ و ئەوانەی بەدڵتە زیادیان بکە.' 
                : currentLanguage === 'en' 
                  ? 'You haven\'t added any books to your wishlist yet. Browse our collection and save your favorites.' 
                  : 'Sie haben noch keine Bücher zu Ihrer Wunschliste hinzugefügt. Stöbern Sie in unserer Sammlung und speichern Sie Ihre Favoriten.'}
            </p>
            <Link 
              href="/books" 
              className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              {currentLanguage === 'ku' ? 'گەڕان بۆ کتێب' : currentLanguage === 'en' ? 'Browse Books' : 'Bücher durchsuchen'}
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[2/3] mb-4 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src={item.imageUrl || '/images/placeholder-book.jpg'} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors"
                      title={currentLanguage === 'ku' ? 'زیادکردن بۆ سەبەتە' : 'Add to Cart'}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors"
                      title={currentLanguage === 'ku' ? 'ل لابردن' : 'Remove'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="text-center">
                  <Link href={`/book/${item.id}`}>
                    <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-1 hover:underline decoration-1 underline-offset-4">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                    {item.author}
                  </p>
                  
                  <div className="flex items-center justify-center gap-3">
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-sm text-gray-400 line-through font-light">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}