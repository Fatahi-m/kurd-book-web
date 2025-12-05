'use client';

import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { bookService } from '@/lib/bookService';
import { Book } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import BookRow from '@/components/ui/BookRow';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { t, currentLanguage } = useLanguage();
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);

  useEffect(() => {
    setRecommendedBooks(bookService.getBestsellerBooks().slice(0, 8));
  }, []);

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f8f5f2] py-20 transition-colors duration-300 font-sans flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h1 className="text-4xl font-serif text-gray-900 mb-4">{t('cart.empty')}</h1>
            <p className="text-gray-500 mb-10 font-light text-lg leading-relaxed">
              {t('cart.emptyMessage')}
            </p>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-10 py-4 text-sm uppercase tracking-widest hover:bg-gray-800 transition-all duration-300 group"
            >
              {t('cart.continueShopping')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f5f2] py-12 md:py-20 transition-colors duration-300 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-end justify-between mb-12 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-2">{t('cart.title')}</h1>
            <p className="text-gray-500 font-light">{cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your bag</p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">{t('cart.clearCart')}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="space-y-0 divide-y divide-gray-200 bg-white p-8 shadow-sm border border-gray-100">
              <AnimatePresence mode='popLayout'>
                {cart.items.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    key={item.book.id}
                    className="flex gap-6 py-8 first:pt-0 last:pb-0"
                  >
                    {/* Book Image */}
                    <Link href={`/book/${item.book.id}`} className="w-24 md:w-32 aspect-[2/3] bg-gray-100 flex-shrink-0 relative shadow-md hover:shadow-lg transition-shadow duration-300 block overflow-hidden">
                      {item.book.image || item.book.coverUrl ? (
                        <img src={item.book.image || item.book.coverUrl} alt={item.book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl opacity-20">📚</div>
                      )}
                    </Link>

                    {/* Book Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <Link href={`/book/${item.book.id}`} className="group">
                            <h3 className="text-xl font-serif text-gray-900 group-hover:text-gray-600 transition-colors leading-tight mb-1">
                              {item.book.title}
                            </h3>
                          </Link>
                          <span className="text-lg font-medium text-gray-900 font-mono">
                            {formatPrice(item.book.price * item.quantity)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 font-light mb-1">{item.book.author}</p>
                        <p className="text-xs text-gray-400 font-light uppercase tracking-wider">{item.book.publisher}</p>
                      </div>

                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center border border-gray-200 rounded-full h-10 px-1">
                          <button
                            onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.book.id)}
                          className="text-xs uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors border-b border-transparent hover:border-red-600 pb-0.5"
                        >
                          {t('cart.remove')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary - Receipt Style */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="bg-white p-8 border border-gray-200 sticky top-24 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
              {/* Receipt jagged edge top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[linear-gradient(45deg,transparent_33.333%,#f8f5f2_33.333%,#f8f5f2_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#f8f5f2_33.333%,#f8f5f2_66.667%,transparent_66.667%)] bg-[length:10px_20px] opacity-0"></div>

              <div className="text-center mb-8 pb-6 border-b-2 border-dashed border-gray-200">
                <h2 className="text-xl font-serif text-gray-900 uppercase tracking-widest">
                  {t('cart.orderSummary')}
                </h2>
                <p className="text-xs text-gray-400 mt-2 font-mono uppercase">
                  {new Date().toLocaleDateString()} • RECEIPT #{Math.floor(Math.random() * 10000)}
                </p>
              </div>
              
              <div className="space-y-4 mb-8 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 uppercase">{t('cart.subtotal')}</span>
                  <span className="text-gray-900">{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 uppercase">{t('cart.shipping')}</span>
                  <span className="text-gray-900">{t('cart.shippingFree')}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span className="uppercase">Tax (Included)</span>
                  <span>$0.00</span>
                </div>
                
                <div className="pt-6 mt-6 border-t-2 border-dashed border-gray-200">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-gray-900 uppercase">{t('cart.total')}</span>
                    <span className="text-gray-900">{formatPrice(getCartTotal())}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-gray-900 text-white py-4 text-center text-sm uppercase tracking-widest hover:bg-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-4"
              >
                {t('cart.checkout')}
              </Link>
              
              <Link
                href="/books"
                className="block w-full text-center text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
              >
                {t('cart.continueShopping')}
              </Link>

              {/* Barcode decoration */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center opacity-40">
                <div className="h-8 w-48 bg-[repeating-linear-gradient(90deg,black,black_1px,transparent_1px,transparent_3px)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Books */}
        {recommendedBooks.length > 0 && (
          <div className="mt-32">
            <BookRow 
              title={t('cart.youMightAlsoLike')}
              books={recommendedBooks}
              variant="default"
            />
          </div>
        )}
      </div>
    </main>
  );
}