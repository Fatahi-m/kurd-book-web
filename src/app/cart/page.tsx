'use client';

import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { bookService } from '@/lib/bookService';
import { Book } from '@/lib/types';
import BookCard from '@/components/ui/BookCard';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { t, currentLanguage } = useLanguage();
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);

  useEffect(() => {
    setRecommendedBooks(bookService.getBestsellerBooks().slice(0, 4));
  }, []);

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center transition-colors duration-300">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('cart.empty')}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('cart.emptyMessage')}
            </p>
            <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              {t('cart.continueShopping')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{t('cart.title')}</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-xs sm:text-sm"
          >
            {t('cart.clearCart')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.book.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse transition-colors duration-300"
              >
                {/* Book Image */}
                <div className="w-16 h-20 sm:w-20 sm:h-28 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0 overflow-hidden">
                  {item.book.image || item.book.coverUrl ? (
                    <img src={item.book.image || item.book.coverUrl} alt={item.book.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-xl sm:text-2xl text-gray-400 dark:text-gray-500">📚</div>
                  )}
                </div>

                {/* Book Details */}
                <div className="flex-1 min-w-0 text-center sm:text-right rtl:text-right">
                  <Link href={`/book/${item.book.id}`}>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mb-1">
                      {item.book.title}
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">{item.book.author}</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mb-2 sm:mb-3">{item.book.publisher}</p>
                  
                  {/* Price */}
                  <div className="flex items-center justify-center sm:justify-start space-x-2 rtl:space-x-reverse mb-3 sm:mb-4">
                    <span className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400">
                      {formatPrice(item.book.price)}
                    </span>
                    {item.book.originalPrice && (
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 line-through">
                        {formatPrice(item.book.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{t('book.quantity')}:</span>
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x border-gray-300 dark:border-gray-600 min-w-[50px] text-center text-gray-800 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.book.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
                    >
                      {t('cart.remove')}
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right rtl:text-left">
                  <p className="text-lg font-bold text-gray-800 dark:text-white">
                    {formatPrice(item.book.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4 transition-colors duration-300">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('cart.orderSummary')}</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{t('cart.itemCount')}</span>
                  <span className="text-gray-800 dark:text-white">{cart.itemCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{t('cart.subtotal')}</span>
                  <span className="text-gray-800 dark:text-white">{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{t('cart.shipping')}</span>
                  <span className="text-green-600 dark:text-green-400">{t('cart.shippingFree')}</span>
                </div>
                
                {/* Discount Code */}
                <div className="pt-2 pb-2">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <input 
                      type="text" 
                      placeholder={currentLanguage === 'ku' ? 'کۆدی داشکاندن' : currentLanguage === 'en' ? 'Discount Code' : 'Rabattcode'}
                      className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <button className="bg-gray-800 dark:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-500 transition-colors">
                      {currentLanguage === 'ku' ? 'جێبەجێکردن' : currentLanguage === 'en' ? 'Apply' : 'Anwenden'}
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-800 dark:text-white">{t('cart.total')}</span>
                    <span className="text-blue-600 dark:text-blue-400">{formatPrice(getCartTotal())}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold mb-3 block text-center"
              >
                {t('cart.checkout')}
              </Link>
              
              <Link
                href="/"
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center block"
              >
                {t('cart.continueShopping')}
              </Link>

              {/* Benefits */}
              <div className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span>✅</span>
                  <span>{t('cart.freeShipping')}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span>✅</span>
                  <span>{t('cart.returns')}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span>✅</span>
                  <span>{t('cart.buyerProtection')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Books */}
        {recommendedBooks.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {currentLanguage === 'ku' ? 'کتابەکانی تر کە ڕەنگە حەزت لێبێت' : currentLanguage === 'en' ? 'You Might Also Like' : 'Das könnte Ihnen auch gefallen'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
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