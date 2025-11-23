'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { t, currentLanguage } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  });

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address?.street || '',
        city: user.address?.city || '',
        zipCode: user.address?.zipCode || ''
      }));
    }
  }, [user]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.items.length === 0 && !orderComplete) {
      router.push('/cart');
    }
  }, [cart.items.length, orderComplete, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Success
    const newOrderId = 'ORD-' + Math.floor(Math.random() * 1000000);
    setOrderId(newOrderId);
    setOrderComplete(true);
    clearCart();
    setIsProcessing(false);
  };

  if (orderComplete) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'ku' ? 'داواکارییەکەت وەرگیرا' : currentLanguage === 'en' ? 'Order Placed Successfully!' : 'Bestellung erfolgreich aufgegeben!'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {currentLanguage === 'ku' ? `ژمارەی داواکاری: ${orderId}` : currentLanguage === 'en' ? `Order ID: ${orderId}` : `Bestellnummer: ${orderId}`}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {currentLanguage === 'ku' ? 'سوپاس بۆ کڕینەکەت. ئیمەیڵێکی پشتڕاستکردنەوەت بۆ دەنێرین.' : currentLanguage === 'en' ? 'Thank you for your purchase. We will send you a confirmation email shortly.' : 'Vielen Dank für Ihren Einkauf. Wir senden Ihnen in Kürze eine Bestätigungs-E-Mail.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                {currentLanguage === 'ku' ? 'گەڕانەوە بۆ ماڵەوە' : currentLanguage === 'en' ? 'Return Home' : 'Zurück zur Startseite'}
              </Link>
              <Link href="/profile" className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold">
                {currentLanguage === 'ku' ? 'بینینی داواکارییەکان' : currentLanguage === 'en' ? 'View Orders' : 'Bestellungen ansehen'}
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (cart.items.length === 0) {
    return null; // Will redirect via useEffect
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {currentLanguage === 'ku' ? 'تەواوکردنی کڕین' : currentLanguage === 'en' ? 'Checkout' : 'Kasse'}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 space-y-8">
              {/* Contact Info */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm">1</span>
                  {currentLanguage === 'ku' ? 'زانیاری پەیوەندی' : currentLanguage === 'en' ? 'Contact Information' : 'Kontaktinformationen'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {currentLanguage === 'ku' ? 'ناو' : currentLanguage === 'en' ? 'First Name' : 'Vorname'}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {currentLanguage === 'ku' ? 'پاشناو' : currentLanguage === 'en' ? 'Last Name' : 'Nachname'}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {currentLanguage === 'ku' ? 'ئیمەیڵ' : currentLanguage === 'en' ? 'Email' : 'E-Mail'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {currentLanguage === 'ku' ? 'ژمارەی مۆبایل' : currentLanguage === 'en' ? 'Phone Number' : 'Telefonnummer'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm">2</span>
                  {currentLanguage === 'ku' ? 'ناونیشانی گەیاندن' : currentLanguage === 'en' ? 'Shipping Address' : 'Lieferadresse'}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {currentLanguage === 'ku' ? 'ناونیشان' : currentLanguage === 'en' ? 'Address' : 'Adresse'}
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {currentLanguage === 'ku' ? 'شار' : currentLanguage === 'en' ? 'City' : 'Stadt'}
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {currentLanguage === 'ku' ? 'کۆدی پۆستە' : currentLanguage === 'en' ? 'Zip Code' : 'Postleitzahl'}
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm">3</span>
                  {currentLanguage === 'ku' ? 'شێوازی پارەدان' : currentLanguage === 'en' ? 'Payment Method' : 'Zahlungsmethode'}
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 rtl:ml-0 rtl:mr-3 flex-1 font-medium text-gray-900 dark:text-white">
                      {currentLanguage === 'ku' ? 'کارتی بانکی' : currentLanguage === 'en' ? 'Credit/Debit Card' : 'Kredit-/Debitkarte'}
                    </span>
                    <span className="text-2xl">💳</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 rtl:ml-0 rtl:mr-3 flex-1 font-medium text-gray-900 dark:text-white">
                      {currentLanguage === 'ku' ? 'پارەدان لە کاتی گەیاندن' : currentLanguage === 'en' ? 'Cash on Delivery' : 'Barzahlung bei Lieferung'}
                    </span>
                    <span className="text-2xl">💵</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all shadow-lg ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {currentLanguage === 'ku' ? 'جێبەجێکردن...' : currentLanguage === 'en' ? 'Processing...' : 'Verarbeitung...'}
                  </span>
                ) : (
                  currentLanguage === 'ku' ? 'تەواوکردنی داواکاری' : currentLanguage === 'en' ? 'Place Order' : 'Bestellung aufgeben'
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {currentLanguage === 'ku' ? 'پوختەی داواکاری' : currentLanguage === 'en' ? 'Order Summary' : 'Bestellübersicht'}
              </h3>
              
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                {cart.items.map((item) => (
                  <div key={item.book.id} className="flex gap-3">
                    <div className="w-16 h-20 bg-gray-100 dark:bg-gray-700 rounded flex-shrink-0 overflow-hidden">
                      {item.book.image || item.book.coverUrl ? (
                        <img src={item.book.image || item.book.coverUrl} alt={item.book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">📚</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.book.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.book.author}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">x{item.quantity}</span>
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{formatPrice(item.book.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{currentLanguage === 'ku' ? 'کۆی گشتی کاڵاکان' : currentLanguage === 'en' ? 'Subtotal' : 'Zwischensumme'}</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{currentLanguage === 'ku' ? 'گەیاندن' : currentLanguage === 'en' ? 'Shipping' : 'Versand'}</span>
                  <span className="text-green-600 dark:text-green-400">{currentLanguage === 'ku' ? 'بەخۆڕایی' : currentLanguage === 'en' ? 'Free' : 'Kostenlos'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                  <span>{currentLanguage === 'ku' ? 'کۆی گشتی' : currentLanguage === 'en' ? 'Total' : 'Gesamt'}</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
