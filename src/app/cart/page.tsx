'use client';

import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { t } = useLanguage();

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('cart.empty')}</h1>
            <p className="text-gray-600 mb-6">
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
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{t('cart.title')}</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 text-xs sm:text-sm"
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
                className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse"
              >
                {/* Book Image */}
                <div className="w-16 h-20 sm:w-20 sm:h-28 bg-gray-200 rounded flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                  <div className="text-xl sm:text-2xl text-gray-400">📚</div>
                </div>

                {/* Book Details */}
                <div className="flex-1 min-w-0 text-center sm:text-right rtl:text-right">
                  <Link href={`/book/${item.book.id}`}>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 hover:text-blue-600 mb-1">
                      {item.book.title}
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{item.book.author}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">{item.book.publisher}</p>
                  
                  {/* Price */}
                  <div className="flex items-center justify-center sm:justify-start space-x-2 rtl:space-x-reverse mb-3 sm:mb-4">
                    <span className="text-base sm:text-lg font-bold text-blue-600">
                      {formatPrice(item.book.price)}
                    </span>
                    {item.book.originalPrice && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through">
                        {formatPrice(item.book.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <span className="text-sm text-gray-600">{t('book.quantity')}:</span>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x border-gray-300 min-w-[50px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.book.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      {t('cart.remove')}
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right rtl:text-left">
                  <p className="text-lg font-bold text-gray-800">
                    {formatPrice(item.book.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t('cart.orderSummary')}</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('cart.itemCount')}</span>
                  <span>{cart.itemCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('cart.subtotal')}</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('cart.shipping')}</span>
                  <span className="text-green-600">{t('cart.shippingFree')}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t('cart.total')}</span>
                    <span className="text-blue-600">{formatPrice(getCartTotal())}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold mb-3">
                {t('cart.checkout')}
              </button>
              
              <Link
                href="/"
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center block"
              >
                {t('cart.continueShopping')}
              </Link>

              {/* Benefits */}
              <div className="mt-6 space-y-2 text-sm text-gray-600">
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
      </div>
    </main>
  );
}