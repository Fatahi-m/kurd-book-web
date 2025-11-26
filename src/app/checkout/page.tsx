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
import { motion } from 'framer-motion';

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
      <main className="min-h-screen bg-slate-50 dark:bg-[#0f172a] py-24 transition-colors duration-300 font-sans">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="text-6xl mb-8">✓</div>
            <h1 className="text-4xl font-serif text-gray-900 dark:text-white mb-6">
              {currentLanguage === 'ku' ? 'داواکارییەکەت وەرگیرا' : currentLanguage === 'en' ? 'Order Placed Successfully' : 'Bestellung erfolgreich aufgegeben'}
            </h1>
            <div className="bg-white dark:bg-gray-800/50 p-6 mb-8 inline-block border border-gray-200 dark:border-gray-800">
              <p className="text-gray-600 dark:text-gray-300 font-mono text-lg tracking-widest">
                {currentLanguage === 'ku' ? `ژمارەی داواکاری: #${orderId}` : currentLanguage === 'en' ? `ORDER ID: #${orderId}` : `BESTELLNUMMER: #${orderId}`}
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-md mx-auto font-light leading-relaxed">
              {currentLanguage === 'ku' ? 'سوپاس بۆ کڕینەکەت. ئیمەیڵێکی پشتڕاستکردنەوەت بۆ دەنێرین.' : currentLanguage === 'en' ? 'Thank you for your purchase. We will send you a confirmation email shortly.' : 'Vielen Dank für Ihren Einkauf. Wir senden Ihnen in Kürze eine Bestätigungs-E-Mail.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/" className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                {currentLanguage === 'ku' ? 'گەڕانەوە بۆ ماڵەوە' : currentLanguage === 'en' ? 'Return Home' : 'Zurück zur Startseite'}
              </Link>
              <Link href="/profile?tab=orders" className="border border-black dark:border-white text-black dark:text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {currentLanguage === 'ku' ? 'بینینی داواکارییەکان' : currentLanguage === 'en' ? 'View Orders' : 'Bestellungen ansehen'}
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  if (cart.items.length === 0) {
    return null; // Will redirect via useEffect
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0f172a] py-12 md:py-24 transition-colors duration-300 font-sans">
      <div className="container mx-auto px-4">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 md:gap-12">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-3 ${
                  currentStep >= step.id ? 'text-black dark:text-white' : 'text-gray-400'
                }`}>
                  <span className={`w-8 h-8 flex items-center justify-center border rounded-full text-sm ${
                    currentStep >= step.id ? 'border-black dark:border-white' : 'border-gray-300'
                  }`}>
                    {step.id}
                  </span>
                  <span className="text-sm uppercase tracking-widest hidden md:inline-block">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-12 h-px bg-gray-300 mx-4 md:mx-6 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
          {/* Checkout Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-12">
              
              {/* Step 1: Contact Info */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: currentStep === 1 ? 1 : 0.5 }}
                className={currentStep === 1 ? 'block' : 'hidden'}
              >
                <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-8">
                  {currentLanguage === 'ku' ? 'زانیاری پەیوەندی' : currentLanguage === 'en' ? 'Contact Information' : 'Kontaktinformationen'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">
                      {currentLanguage === 'ku' ? 'ناو' : currentLanguage === 'en' ? 'First Name' : 'Vorname'}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 focus:border-black dark:focus:border-white outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">
                      {currentLanguage === 'ku' ? 'پاشناو' : currentLanguage === 'en' ? 'Last Name' : 'Nachname'}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 focus:border-black dark:focus:border-white outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">
                      {currentLanguage === 'ku' ? 'ئیمەیڵ' : currentLanguage === 'en' ? 'Email' : 'E-Mail'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 focus:border-black dark:focus:border-white outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">
                      {currentLanguage === 'ku' ? 'ژمارەی مۆبایل' : currentLanguage === 'en' ? 'Phone Number' : 'Telefonnummer'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 focus:border-black dark:focus:border-white outline-none transition-colors"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Step 2: Shipping Address */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: currentStep === 2 ? 1 : 0.5 }}
                className={currentStep === 2 ? 'block' : 'hidden'}
              >
                <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-8">
                  {currentLanguage === 'ku' ? 'ناونیشانی گەیاندن' : currentLanguage === 'en' ? 'Shipping Address' : 'Lieferadresse'}
                </h2>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">
                      {currentLanguage === 'ku' ? 'ناونیشان' : currentLanguage === 'en' ? 'Address' : 'Adresse'}
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 focus:border-black dark:focus:border-white outline-none transition-colors"
                      placeholder="Street, Apartment, etc."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500">
                        {currentLanguage === 'ku' ? 'شار' : currentLanguage === 'en' ? 'City' : 'Stadt'}
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 focus:border-black dark:focus:border-white outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500">
                        {currentLanguage === 'ku' ? 'کۆدی پۆستە' : currentLanguage === 'en' ? 'Zip Code' : 'Postleitzahl'}
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 focus:border-black dark:focus:border-white outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 3: Payment Method */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: currentStep === 3 ? 1 : 0.5 }}
                className={currentStep === 3 ? 'block' : 'hidden'}
              >
                <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-8">
                  {currentLanguage === 'ku' ? 'شێوازی پارەدان' : currentLanguage === 'en' ? 'Payment Method' : 'Zahlungsmethode'}
                </h2>
                
                <div className="grid grid-cols-2 gap-6 mb-12">
                  <label className={`cursor-pointer border p-6 flex flex-col items-center justify-center gap-4 transition-all ${
                    formData.paymentMethod === 'card' 
                      ? 'border-black dark:border-white bg-white dark:bg-gray-800' 
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span className="text-2xl">💳</span>
                    <span className="text-sm uppercase tracking-widest">Credit Card</span>
                  </label>
                  
                  <label className={`cursor-pointer border p-6 flex flex-col items-center justify-center gap-4 transition-all ${
                    formData.paymentMethod === 'cash' 
                      ? 'border-black dark:border-white bg-white dark:bg-gray-800' 
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span className="text-2xl">💵</span>
                    <span className="text-sm uppercase tracking-widest">Cash on Delivery</span>
                  </label>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="animate-fade-in">
                    <CreditCardForm onChange={() => {}} />
                  </div>
                )}
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-8 py-3 text-sm uppercase tracking-widest border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors"
                  >
                    {currentLanguage === 'ku' ? 'گەڕانەوە' : 'Back'}
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`flex-1 py-3 text-sm uppercase tracking-widest text-white transition-colors ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
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
            <div className="bg-white dark:bg-[#1a1a1a] p-8 border border-gray-100 dark:border-gray-800 sticky top-24">
              <h3 className="text-lg font-serif text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                {currentLanguage === 'ku' ? 'پوختەی داواکاری' : currentLanguage === 'en' ? 'Order Summary' : 'Bestellübersicht'}
              </h3>
              
              <div className="space-y-6 mb-8 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {cart.items.map((item) => (
                  <div key={item.book.id} className="flex gap-4">
                    <div className="w-12 aspect-[2/3] bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">
                      {item.book.image || item.book.coverUrl ? (
                        <img src={item.book.image || item.book.coverUrl} alt={item.book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs">📚</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-serif text-gray-900 dark:text-white truncate">{item.book.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.book.author}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Qty: {item.quantity}</span>
                        <span className="text-sm font-light">{formatPrice(item.book.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-between text-sm font-light text-gray-600 dark:text-gray-400">
                  <span>{currentLanguage === 'ku' ? 'کۆی گشتی کاڵاکان' : currentLanguage === 'en' ? 'Subtotal' : 'Zwischensumme'}</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-sm font-light text-gray-600 dark:text-gray-400">
                  <span>{currentLanguage === 'ku' ? 'گەیاندن' : currentLanguage === 'en' ? 'Shipping' : 'Versand'}</span>
                  <span className="text-green-600 dark:text-green-400">{currentLanguage === 'ku' ? 'بەخۆڕایی' : currentLanguage === 'en' ? 'Free' : 'Kostenlos'}</span>
                </div>
                <div className="flex justify-between text-lg font-serif text-gray-900 dark:text-white pt-4 border-t border-gray-100 dark:border-gray-800 mt-2">
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
