'use client';

import { Book } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReviews } from '@/contexts/ReviewContext';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BookCardProps {
  book: Book;
  showDiscount?: boolean;
}

export default function BookCard({ book, showDiscount = true }: BookCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { t } = useLanguage();
  const { getAverageRating, getReviewCount } = useReviews();
  
  const discountPercentage = book.originalPrice 
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : 0;

  const rating = getAverageRating(book.id) || book.rating;
  const reviewCount = getReviewCount(book.id) || book.reviewCount;

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-transparent group w-full flex flex-col h-full"
    >
      <Link href={`/book/${book.id}`} className="block relative flex-shrink-0 mb-3">
        <div className="relative perspective-1000">
          {/* Book Image */}
          <div className="aspect-[2/3] relative overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500 ease-out transform group-hover:-translate-y-1">
            {book.coverUrl || book.image ? (
              <Image
                src={book.coverUrl || book.image || '/images/default-book-cover.jpg'}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
              />
            ) : (
              <div className="w-full h-full bg-[#e5e5e5] dark:bg-[#2a2a2a] flex items-center justify-center">
                <span className="text-4xl opacity-20">📚</span>
              </div>
            )}
            
            {/* Sheen effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* Badges - Minimalist */}
          <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2 flex flex-col space-y-1 z-10">
            {showDiscount && discountPercentage > 0 && (
              <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 font-medium tracking-wider uppercase">
                -{discountPercentage}%
              </span>
            )}
          </div>

          {/* Quick Actions - Minimalist */}
          <div className="absolute bottom-2 right-2 rtl:right-auto rtl:left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex gap-2">
             <button 
                onClick={handleWishlistToggle}
                className={`p-2 bg-white text-black shadow-lg hover:bg-gray-100 transition-colors ${
                  isInWishlist(book.id) ? 'text-red-600' : ''
                }`}
              >
                <svg className="w-4 h-4" fill={isInWishlist(book.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
          </div>
        </div>
      </Link>

      {/* Book Details */}
      <div className="flex flex-col flex-grow text-center px-1">
        <div className="flex-grow">
          <Link href={`/book/${book.id}`}>
            <h3 className="text-base font-serif font-medium text-gray-900 dark:text-white mb-1 line-clamp-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors leading-tight">
              {book.title}
            </h3>
          </Link>
          <Link href={`/author/${book.author}`}>
            <p className="text-xs font-light text-gray-500 dark:text-gray-400 mb-2 hover:text-gray-800 dark:hover:text-gray-200 transition-colors line-clamp-1 uppercase tracking-wide">
              {book.author}
            </p>
          </Link>
        </div>

        {/* Price & Action */}
        <div className="mt-auto pt-2 border-t border-gray-100 dark:border-gray-800/50 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-light text-gray-900 dark:text-white">
              {formatPrice(book.price)}
            </span>
            {book.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-light">
                {formatPrice(book.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button - Only visible on hover or always visible but subtle */}
          <button 
            onClick={() => book.inStock && addToCart(book, 1)}
            className={`w-full py-1.5 px-3 text-xs font-light tracking-wide transition-all border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-100 uppercase
              ${book.inStock
                ? 'text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black'
                : 'text-gray-400 cursor-not-allowed border-dashed'}
            `}
            disabled={!book.inStock}
          >
            {book.inStock ? t('buttons.addToCart') : t('status.outOfStock')}
          </button>
        </div>
      </div>
    </motion.div>
  );
}