'use client';

import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { bookService } from '@/lib/bookService';
import { Book } from '@/lib/types';
import BookCard from '@/components/ui/BookCard';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { t, currentLanguage } = useLanguage();
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);

  useEffect(() => {
    setRecommendedBooks(bookService.getBestsellerBooks().slice(0, 4));
  }, []);

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-[#0f172a] py-24 transition-colors duration-300 font-sans">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-6 opacity-20">🛒</div>
            <h1 className="text-3xl font-serif text-gray-900 dark:text-white mb-4">{t('cart.empty')}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 font-light">
              {t('cart.emptyMessage')}
            </p>
            <Link
              href="/books"
              className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              {t('cart.continueShopping')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0f172a] py-12 md:py-24 transition-colors duration-300 font-sans">
      <div className="container mx-auto px-4">
        <div className="flex items-baseline justify-between mb-12 border-b border-gray-200 dark:border-gray-800 pb-6">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white">{t('cart.title')}</h1>
          <button
            onClick={clearCart}
            className="text-sm uppercase tracking-widest text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            {t('cart.clearCart')}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="space-y-8">
              {cart.items.map((item) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={item.book.id}
                  className="flex gap-6 py-6 border-b border-gray-200 dark:border-gray-800 last:border-0"
                >
                  {/* Book Image */}
                  <div className="w-24 aspect-[2/3] bg-gray-200 dark:bg-gray-800 flex-shrink-0 relative shadow-sm">
                    {item.book.image || item.book.coverUrl ? (
                      <img src={item.book.image || item.book.coverUrl} alt={item.book.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl opacity-20">📚</div>
                    )}
                  </div>

                  {/* Book Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <Link href={`/book/${item.book.id}`} className="group">
                          <h3 className="text-lg font-serif text-gray-900 dark:text-white group-hover:underline decoration-1 underline-offset-4">
                            {item.book.title}
                          </h3>
                        </Link>
                        <span className="text-lg font-light text-gray-900 dark:text-white">
                          {formatPrice(item.book.price * item.quantity)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-light mb-1">{item.book.author}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-light uppercase tracking-wider">{item.book.publisher}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-300 dark:border-gray-700 h-8">
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                          className="px-3 h-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 text-sm font-light min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                          className="px-3 h-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.book.id)}
                        className="text-xs uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors"
                      >
                        {t('cart.remove')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white dark:bg-[#1a1a1a] p-8 border border-gray-100 dark:border-gray-800 sticky top-24">
              <h2 className="text-lg font-serif text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                {t('cart.orderSummary')}
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-light">
                  <span className="text-gray-600 dark:text-gray-400">{t('cart.subtotal')}</span>
                  <span className="text-gray-900 dark:text-white">{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-sm font-light">
                  <span className="text-gray-600 dark:text-gray-400">{t('cart.shipping')}</span>
                  <span className="text-gray-900 dark:text-white">{t('cart.shippingFree')}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between text-lg font-serif">
                    <span className="text-gray-900 dark:text-white">{t('cart.total')}</span>
                    <span className="text-gray-900 dark:text-white">{formatPrice(getCartTotal())}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-black dark:bg-white text-white dark:text-black py-4 text-center text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mb-4"
              >
                {t('cart.checkout')}
              </Link>
              
              <Link
                href="/books"
                className="block w-full text-center text-xs uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors"
              >
                {t('cart.continueShopping')}
              </Link>
            </div>
          </div>
        </div>

        {/* Recommended Books */}
        {recommendedBooks.length > 0 && (
          <div className="mt-24 pt-12 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-serif text-center mb-12">
              {t('cart.youMightAlsoLike')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}