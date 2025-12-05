'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingCart, Heart, Star, BookOpen, Calendar, Globe, CheckCircle, XCircle } from 'lucide-react';
import { useQuickView } from '@/contexts/QuickViewContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';

export default function QuickViewModal() {
  const { isOpen, closeQuickView, selectedBook } = useQuickView();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { t, currentLanguage } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isAnimating && !isOpen) return null;

  const book = selectedBook;
  if (!book) return null;

  const inWishlist = isInWishlist(book.id);

  const handleAddToCart = () => {
    addToCart(book, quantity);
    closeQuickView();
  };

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  // Localized content
  const title = currentLanguage === 'kmr' ? (book.titleKmr || book.title) : 
                currentLanguage === 'en' ? (book.titleEn || book.title) : 
                (book.titleKu || book.title);
                
  const author = currentLanguage === 'kmr' ? (book.authorKmr || book.author) : 
                 currentLanguage === 'en' ? (book.authorEn || book.author) : 
                 (book.authorKu || book.author);

  const description = currentLanguage === 'kmr' ? (book.descriptionKmr || book.description) : 
                      currentLanguage === 'en' ? (book.descriptionEn || book.description) : 
                      (book.descriptionKu || book.description);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeQuickView}
      />

      {/* Modal Content */}
      <div className={`relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        <button 
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row h-[85vh] md:h-auto md:max-h-[85vh]">
          {/* Image Section */}
          <div className="w-full md:w-2/5 bg-gray-50 p-8 flex items-center justify-center relative">
            <div className="relative w-48 md:w-64 aspect-[2/3] shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <Image
                src={book.coverUrl || book.image || '/images/default-book-cover.jpg'}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
            {book.bestseller && (
              <div className="absolute top-6 left-6 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Bestseller
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="w-full md:w-3/5 p-8 overflow-y-auto">
            <div className="mb-6">
              <Link href={`/book/${book.id}`} onClick={closeQuickView} className="group">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {title}
                </h2>
              </Link>
              <Link href={`/author/${book.author}`} onClick={closeQuickView} className="text-lg text-gray-600 hover:text-blue-600 font-medium">
                {author}
              </Link>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className={star <= (book.rating || 4) ? 'fill-current' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-sm text-gray-500">({book.reviewCount || 12} reviews)</span>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className={`flex items-center gap-1 text-sm font-medium ${book.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {book.inStock ? <CheckCircle size={14} /> : <XCircle size={14} />}
                <span>{book.inStock ? t('book.inStock') : t('book.outOfStock')}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">{formatPrice(book.price)}</span>
              {book.originalPrice && (
                <span className="text-lg text-gray-400 line-through">{formatPrice(book.originalPrice)}</span>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed line-clamp-4">
              {description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe size={16} />
                <span>{book.language}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <span>{book.publishedDate || '2023'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <BookOpen size={16} />
                <span>{book.pages || '320'} pages</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!book.inStock}
                className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} />
                {t('buttons.addToCart')}
              </button>

              <button
                onClick={toggleWishlist}
                className={`p-3 rounded-lg border transition-colors ${inWishlist ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}
              >
                <Heart size={20} className={inWishlist ? 'fill-current' : ''} />
              </button>
            </div>
            
            <div className="mt-4 text-center">
               <Link href={`/book/${book.id}`} onClick={closeQuickView} className="text-sm text-blue-600 hover:underline">
                 {t('book.moreInfo')}
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
