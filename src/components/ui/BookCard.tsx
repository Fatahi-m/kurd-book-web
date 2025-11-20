'use client';

import { Book } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';

interface BookCardProps {
  book: Book;
  showDiscount?: boolean;
}

export default function BookCard({ book, showDiscount = true }: BookCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { t } = useLanguage();
  const discountPercentage = book.originalPrice 
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : 0;
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        originalPrice: book.originalPrice,
        imageUrl: book.coverUrl || book.image,
        inStock: book.inStock
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group w-full">
      <Link href={`/book/${book.id}`}>
        <div className="relative">
          {/* Book Image */}
          <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden flex items-center justify-center">
            {book.coverUrl || book.image ? (
              <Image
                src={book.coverUrl || book.image || '/images/default-book-cover.jpg'}
                alt={book.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
              />
            ) : (
              <div className="text-4xl md:text-6xl text-gray-400">📚</div>
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-1 right-1 md:top-2 md:right-2 rtl:right-auto rtl:left-1 md:rtl:left-2 flex flex-col space-y-1">
            {book.newRelease && (
              <span className="bg-green-500 text-white text-[10px] md:text-xs px-1 md:px-2 py-0.5 md:py-1 rounded-md">
                {t('status.newRelease')}
              </span>
            )}
            {book.bestseller && (
              <span className="bg-orange-500 text-white text-[10px] md:text-xs px-1 md:px-2 py-0.5 md:py-1 rounded-md">
                {t('status.bestseller')}
              </span>
            )}
            {book.featured && (
              <span className="bg-blue-500 text-white text-[10px] md:text-xs px-1 md:px-2 py-0.5 md:py-1 rounded-md">
                {t('status.featured')}
              </span>
            )}
            {showDiscount && discountPercentage > 0 && (
              <span className="bg-red-500 text-white text-[10px] md:text-xs px-1 md:px-2 py-0.5 md:py-1 rounded-md">
                -{discountPercentage}%
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-1 left-1 md:top-2 md:left-2 rtl:left-auto rtl:right-1 md:rtl:right-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col space-y-1">
              <button 
                onClick={handleWishlistToggle}
                className={`p-1.5 md:p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors ${
                  isInWishlist(book.id) ? 'text-red-500' : 'text-gray-600'
                }`}
              >
                <svg className="w-3 h-3 md:w-4 md:h-4" fill={isInWishlist(book.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <Link href={`/book/${book.id}`} className="hidden md:block p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Link>

      {/* Book Details */}
      <div className="p-3 md:p-4">
        <Link href={`/book/${book.id}`}>
          <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-1 md:mb-2 line-clamp-2 hover:text-blue-600 transition-colors leading-tight">
            {book.title}
          </h3>
        </Link>
        
        <Link href={`/author/${book.author}`}>
          <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2 hover:text-blue-600 transition-colors line-clamp-1">
            {book.author}
          </p>
        </Link>

        <p className="text-xs text-gray-500 mb-2 md:mb-3 line-clamp-1">
          {book.publisher}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-2 md:mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 md:w-4 md:h-4 ${
                  i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs md:text-sm text-gray-600 mr-1 md:mr-2 rtl:mr-0 rtl:ml-1 md:rtl:ml-2">
            {book.rating} <span className="hidden sm:inline">({book.reviewCount})</span>
          </span>
        </div>

        {/* Price */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 md:mb-3 space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <span className="text-base md:text-lg font-bold text-blue-600">
              {formatPrice(book.price)}
            </span>
            {book.originalPrice && (
              <span className="text-xs md:text-sm text-gray-500 line-through">
                {formatPrice(book.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center">
            {book.inStock ? (
              <span className="text-xs text-green-600 flex items-center">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full mr-1 rtl:mr-0 rtl:ml-1"></div>
                <span className="hidden sm:inline">
                  {book.inventoryCount !== undefined ? (
                    `${book.inventoryCount} ${t('status.inStock')}`
                  ) : (
                    t('status.inStock')
                  )}
                </span>
                <span className="sm:hidden">✓</span>
              </span>
            ) : (
              <span className="text-xs text-red-600 flex items-center">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full mr-1 rtl:mr-0 rtl:ml-1"></div>
                <span className="hidden sm:inline">{t('status.outOfStock')}</span>
                <span className="sm:hidden">✗</span>
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={() => book.inStock && addToCart(book, 1)}
          className={`w-full py-2 md:py-2.5 px-3 md:px-4 rounded-md text-xs md:text-sm font-medium transition-colors ${
            book.inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!book.inStock}
        >
          <span className="flex items-center justify-center">
            <svg className="w-3 h-3 md:w-4 md:h-4 ml-1 rtl:ml-0 rtl:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.39.39-.586.876-.586 1.414V17a1 1 0 001 1h14M7 13v4a1 1 0 001 1h2m3-5a1 1 0 100 2 1 1 0 000-2z" />
            </svg>
            <span className="hidden sm:inline">{book.inStock ? t('buttons.addToCart') : t('status.outOfStock')}</span>
            <span className="sm:hidden">{book.inStock ? 'سەبەت' : 'نییە'}</span>
          </span>
        </button>
      </div>
    </div>
  );
}