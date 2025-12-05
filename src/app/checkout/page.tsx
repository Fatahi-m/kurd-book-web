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
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Lock, Truck, CreditCard, User } from 'lucide-react';

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    { id: 1, title: t('checkout.information'), icon: User },
    { id: 2, title: t('checkout.shipping'), icon: Truck },
    { id: 3, title: t('checkout.payment'), icon: CreditCard }
  ];

  if (orderComplete) {
    return (
      <main className="min-h-screen bg-[#f8f5f2] py-24 transition-colors duration-300 font-sans flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div  
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center bg-white p-12 shadow-xl border border-gray-100"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-serif text-gray-900 mb-6">
              {t('checkout.orderPlaced')}
            </h1>
            <div className="bg-gray-50 p-6 mb-8 inline-block border border-gray-200 rounded-lg">
              <p className="text-gray-600 font-mono text-lg tracking-widest">
                {t('checkout.orderId')}: <span className="text-black font-bold">#{orderId}</span>
              </p>
            </div>
            <p className="text-gray-600 mb-12 max-w-md mx-auto font-light leading-relaxed">
              {t('checkout.thankYou')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/" className="bg-gray-900 text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                {t('checkout.returnHome')}
              </Link>
              <Link href="/profile?tab=orders" className="border border-gray-300 text-gray-900 px-8 py-4 text-sm uppercase tracking-widest hover:bg-gray-50 transition-colors">
                {t('checkout.viewOrders')}
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
    <main className="min-h-screen bg-[#f8f5f2] py-12 md:py-20 transition-colors duration-300 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8">{t('cart.checkout')}</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep >= step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex flex-col items-center gap-2 relative z-10 ${
                    isActive ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white'
                    } ${isCurrent ? 'ring-4 ring-gray-200' : ''}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs uppercase tracking-widest font-medium hidden md:block">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 md:w-32 h-0.5 mx-2 md:mx-4 transition-colors duration-500 ${
                      currentStep > step.id ? 'bg-gray-900' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Checkout Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-12">
              <AnimatePresence mode="wait">
                {/* Step 1: Contact Info */}
                {currentStep === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white p-8 md:p-12 shadow-sm border border-gray-100"
                  >
                    <h2 className="text-2xl font-serif text-gray-900 mb-8 flex items-center gap-3">
                      <span className="text-gray-300 text-4xl font-light">01</span>
                      {t('checkout.contactInfo')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                          {t('auth.firstName')}
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-gray-900 outline-none transition-colors text-lg"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                          {t('auth.lastName')}
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-gray-900 outline-none transition-colors text-lg"
                          placeholder="Doe"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                          {t('auth.email')}
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-gray-900 outline-none transition-colors text-lg"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                          {t('auth.phone')}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-gray-900 outline-none transition-colors text-lg"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Shipping */}
                {currentStep === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white p-8 md:p-12 shadow-sm border border-gray-100"
                  >
                    <h2 className="text-2xl font-serif text-gray-900 mb-8 flex items-center gap-3">
                      <span className="text-gray-300 text-4xl font-light">02</span>
                      {t('checkout.shipping')}
                    </h2>
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                          {t('checkout.address')}
                        </label>
                        <input
                          type="text"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-gray-900 outline-none transition-colors text-lg"
                          placeholder="123 Book St"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                            {t('checkout.city')}
                          </label>
                          <input
                            type="text"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-gray-900 outline-none transition-colors text-lg"
                            placeholder="New York"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                            {t('checkout.zipCode')}
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            required
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-gray-900 outline-none transition-colors text-lg"
                            placeholder="10001"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white p-8 md:p-12 shadow-sm border border-gray-100"
                  >
                    <h2 className="text-2xl font-serif text-gray-900 mb-8 flex items-center gap-3">
                      <span className="text-gray-300 text-4xl font-light">03</span>
                      {t('checkout.payment')}
                    </h2>
                    
                    <div className="mb-8">
                      <div className="flex gap-4 mb-6">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                          className={`flex-1 py-4 border text-center transition-all duration-300 ${
                            formData.paymentMethod === 'card'
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-200 text-gray-500 hover:border-gray-400'
                          }`}
                        >
                          <span className="text-sm uppercase tracking-widest">Credit Card</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                          className={`flex-1 py-4 border text-center transition-all duration-300 ${
                            formData.paymentMethod === 'cod'
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-200 text-gray-500 hover:border-gray-400'
                          }`}
                        >
                          <span className="text-sm uppercase tracking-widest">Cash on Delivery</span>
                        </button>
                      </div>

                      {formData.paymentMethod === 'card' && (
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                          <CreditCardForm onChange={() => {}} />
                        </div>
                      )}
                      
                      {formData.paymentMethod === 'cod' && (
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 text-center text-gray-600">
                          <p>{t('checkout.codMessage') || 'You will pay when the package arrives.'}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="text-gray-500 hover:text-gray-900 uppercase tracking-widest text-sm font-medium transition-colors"
                  >
                    ← {t('common.back')}
                  </button>
                ) : (
                  <Link
                    href="/cart"
                    className="text-gray-500 hover:text-gray-900 uppercase tracking-widest text-sm font-medium transition-colors"
                  >
                    ← {t('cart.returnToCart')}
                  </Link>
                )}
                
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-gray-900 text-white px-10 py-4 text-sm uppercase tracking-widest hover:bg-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>
                      {currentStep === 3 ? t('checkout.placeOrder') : t('checkout.continue')}
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary - Sticky */}
          <div className="lg:w-[380px] flex-shrink-0">
            <div className="bg-white p-8 border border-gray-200 sticky top-24 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="text-lg font-serif text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                <span>{t('cart.orderSummary')}</span>
                <span className="text-sm font-sans text-gray-500 font-normal">{cart.items.length} items</span>
              </h3>
              
              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.items.map((item) => (
                  <div key={item.book.id} className="flex gap-4">
                    <div className="w-16 aspect-[2/3] bg-gray-100 flex-shrink-0 relative border border-gray-100">
                      {item.book.image || item.book.coverUrl ? (
                        <img src={item.book.image || item.book.coverUrl} alt={item.book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs opacity-20">📚</div>
                      )}
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-900 text-white text-[10px] flex items-center justify-center rounded-full">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate font-serif">{item.book.title}</h4>
                      <p className="text-xs text-gray-500 truncate">{item.book.author}</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">{formatPrice(item.book.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('cart.subtotal')}</span>
                  <span className="text-gray-900 font-medium">{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('cart.shipping')}</span>
                  <span className="text-green-600 font-medium">{t('cart.shippingFree')}</span>
                </div>
                <div className="flex justify-between text-lg font-serif pt-4 border-t border-gray-100 mt-4">
                  <span className="text-gray-900">{t('cart.total')}</span>
                  <span className="text-gray-900 font-bold">{formatPrice(getCartTotal())}</span>
                </div>
              </div>
              
              <div className="mt-6 flex items-center gap-2 text-xs text-gray-400 justify-center">
                <Lock className="w-3 h-3" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
