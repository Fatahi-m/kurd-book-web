'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/utils';
import { adminDataService } from '@/lib/adminDataService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CreditCardForm from '@/components/checkout/CreditCardForm';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { t, currentLanguage } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  
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
    
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order in adminDataService
    const newOrder = adminDataService.createOrder({
      userId: user?.id,
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      total: getCartTotal(),
      paymentMethod: formData.paymentMethod,
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
      items: cart.items.map(item => ({
        bookId: item.book.id,
        title: item.book.title,
        quantity: item.quantity,
        price: item.book.price,
        image: item.book.image || item.book.coverUrl,
        author: item.book.author
      }))
    });

    // Success
    setOrderId(newOrder.id);
    setOrderComplete(true);
    clearCart();
    setIsProcessing(false);
  };

  const steps = [
    { id: 1, title: currentLanguage === 'ku' ? 'زانیاری' : 'Information' },
    { id: 2, title: currentLanguage === 'ku' ? 'گەیاندن' : 'Shipping' },
    { id: 3, title: currentLanguage === 'ku' ? 'پارەدان' : 'Payment' }
  ];

  if (orderComplete) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center animate-fade-in">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
              <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'ku' ? 'داواکارییەکەت وەرگیرا' : currentLanguage === 'en' ? 'Order Placed Successfully!' : 'Bestellung erfolgreich aufgegeben!'}
            </h1>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6 inline-block">
              <p className="text-gray-600 dark:text-gray-300 font-mono text-lg">
                {currentLanguage === 'ku' ? `ژمارەی داواکاری: #${orderId}` : currentLanguage === 'en' ? `Order ID: #${orderId}` : `Bestellnummer: #${orderId}`}
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              {currentLanguage === 'ku' ? 'سوپاس بۆ کڕینەکەت. ئیمەیڵێکی پشتڕاستکردنەوەت بۆ دەنێرین.' : currentLanguage === 'en' ? 'Thank you for your purchase. We will send you a confirmation email shortly.' : 'Vielen Dank für Ihren Einkauf. Wir senden Ihnen in Kürze eine Bestätigungs-E-Mail.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-bold shadow-lg shadow-blue-200 dark:shadow-none">
                {currentLanguage === 'ku' ? 'گەڕانەوە بۆ ماڵەوە' : currentLanguage === 'en' ? 'Return Home' : 'Zurück zur Startseite'}
              </Link>
              <Link href="/profile?tab=orders" className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-8 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-bold">
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
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
            <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 transition-all duration-500 -z-10`} style={{ width: `${((currentStep - 1) / 2) * 100}%` }}></div>
            
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none scale-110' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                <span className={`mt-2 text-sm font-medium transition-colors ${
                  currentStep >= step.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Checkout Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-300">
              
              {/* Step 1: Contact Info */}
              <div className={currentStep === 1 ? 'block animate-fade-in' : 'hidden'}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {currentLanguage === 'ku' ? 'زانیاری پەیوەندی' : currentLanguage === 'en' ? 'Contact Information' : 'Kontaktinformationen'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {currentLanguage === 'ku' ? 'ناو' : currentLanguage === 'en' ? 'First Name' : 'Vorname'}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {currentLanguage === 'ku' ? 'پاشناو' : currentLanguage === 'en' ? 'Last Name' : 'Nachname'}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {currentLanguage === 'ku' ? 'ئیمەیڵ' : currentLanguage === 'en' ? 'Email' : 'E-Mail'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {currentLanguage === 'ku' ? 'ژمارەی مۆبایل' : currentLanguage === 'en' ? 'Phone Number' : 'Telefonnummer'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className={currentStep === 2 ? 'block animate-fade-in' : 'hidden'}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {currentLanguage === 'ku' ? 'ناونیشانی گەیاندن' : currentLanguage === 'en' ? 'Shipping Address' : 'Lieferadresse'}
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {currentLanguage === 'ku' ? 'ناونیشان' : currentLanguage === 'en' ? 'Address' : 'Adresse'}
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Street, Apartment, etc."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {currentLanguage === 'ku' ? 'شار' : currentLanguage === 'en' ? 'City' : 'Stadt'}
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {currentLanguage === 'ku' ? 'کۆدی پۆستە' : currentLanguage === 'en' ? 'Zip Code' : 'Postleitzahl'}
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className={currentStep === 3 ? 'block animate-fade-in' : 'hidden'}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {currentLanguage === 'ku' ? 'شێوازی پارەدان' : currentLanguage === 'en' ? 'Payment Method' : 'Zahlungsmethode'}
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                    formData.paymentMethod === 'card' 
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span className="text-3xl">💳</span>
                    <span className="font-bold text-sm">Credit Card</span>
                  </label>
                  
                  <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                    formData.paymentMethod === 'cash' 
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span className="text-3xl">💵</span>
                    <span className="font-bold text-sm">Cash on Delivery</span>
                  </label>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="animate-fade-in">
                    <CreditCardForm onChange={() => {}} />
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-6 py-3 rounded-xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {currentLanguage === 'ku' ? 'گەڕانەوە' : 'Back'}
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`flex-1 py-3 rounded-xl font-bold text-white transition-all shadow-lg shadow-blue-200 dark:shadow-none ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-0.5'
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    currentStep === 3 
                      ? (currentLanguage === 'ku' ? 'تەواوکردنی داواکاری' : 'Place Order')
                      : (currentLanguage === 'ku' ? 'دواتر' : 'Next Step')
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-4 transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                {currentLanguage === 'ku' ? 'پوختەی داواکاری' : currentLanguage === 'en' ? 'Order Summary' : 'Bestellübersicht'}
              </h3>
              
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {cart.items.map((item) => (
                  <div key={item.book.id} className="flex gap-4 group">
                    <div className="w-16 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                      {item.book.image || item.book.coverUrl ? (
                        <img src={item.book.image || item.book.coverUrl} alt={item.book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">📚</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">{item.book.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.book.author}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">x{item.quantity}</span>
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{formatPrice(item.book.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{currentLanguage === 'ku' ? 'کۆی گشتی کاڵاکان' : currentLanguage === 'en' ? 'Subtotal' : 'Zwischensumme'}</span>
                  <span className="font-medium">{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{currentLanguage === 'ku' ? 'گەیاندن' : currentLanguage === 'en' ? 'Shipping' : 'Versand'}</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">{currentLanguage === 'ku' ? 'بەخۆڕایی' : currentLanguage === 'en' ? 'Free' : 'Kostenlos'}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-4 border-t border-gray-100 dark:border-gray-700 mt-2">
                  <span>{currentLanguage === 'ku' ? 'کۆی گشتی' : currentLanguage === 'en' ? 'Total' : 'Gesamt'}</span>
                  <span className="text-blue-600 dark:text-blue-400">{formatPrice(getCartTotal())}</span>
                </div>
              </div>
              
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex items-start gap-3">
                <span className="text-xl">🛡️</span>
                <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                  {currentLanguage === 'ku' 
                    ? 'پاراستنی کڕیار: گەرەنتی گەڕاندنەوەی پارە ئەگەر کاڵاکە وەک وەسفەکە نەبوو.' 
                    : 'Buyer Protection: Money back guarantee if the item is not as described.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
