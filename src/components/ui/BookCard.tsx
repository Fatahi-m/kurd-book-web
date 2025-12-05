'use client';

import { Book } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReviews } from '@/contexts/ReviewContext';
import { useQuickView } from '@/contexts/QuickViewContext';
import { formatPrice } from '@/lib/utils';
import { Heart, ShoppingCart, BookOpen, Globe, Star, Eye } from 'lucide-react';

interface BookCardProps {
  book: Book;
  showDiscount?: boolean;
}

export default function BookCard({ book, showDiscount = true }: BookCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { openQuickView } = useQuickView();
  const { t, currentLanguage } = useLanguage();
  const { getAverageRating, getReviewCount } = useReviews();
  
  const discountPercentage = book.originalPrice 
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : 0;

  const rating = getAverageRating(book.id) || book.rating || 0;
  const reviewCount = getReviewCount(book.id) || book.reviewCount || 0;

  // Get localized content
  const title = currentLanguage === 'kmr' ? (book.titleKmr || book.title) : 
                currentLanguage === 'en' ? (book.titleEn || book.title) : 
                (book.titleKu || book.title);
                
  const author = currentLanguage === 'kmr' ? (book.authorKmr || book.author) : 
                 currentLanguage === 'en' ? (book.authorEn || book.author) : 
                 (book.authorKu || book.author);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist({
        id: book.id,
        title: title,
        author: author,
        price: book.price,
        originalPrice: book.originalPrice,
        imageUrl: book.coverUrl || book.image,
        inStock: book.inStock
      });
    }
  };

  return (
    <div className="group flex flex-col h-full bg-white transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 border border-gray-200 rounded-xl overflow-hidden relative">
      {/* Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-50">
        <Link href={`/book/${book.id}`} className="block w-full h-full">
          {book.coverUrl || book.image ? (
            <Image
              src={book.coverUrl || book.image || '/images/default-book-cover.jpg'}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <BookOpen size={48} strokeWidth={1} />
            </div>
          )}
        </Link>

        {/* Overlay Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Badges - Premium Look */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
           {book.bestseller && (
             <span className="text-[10px] font-bold bg-black text-white px-2 py-1 rounded-md uppercase tracking-wider shadow-lg shadow-black/20 backdrop-blur-sm">
               {t('status.bestseller')}
             </span>
           )}
           {showDiscount && discountPercentage > 0 && (
             <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-1 rounded-md uppercase tracking-wider shadow-lg shadow-red-600/20 backdrop-blur-sm">
               -{discountPercentage}%
             </span>
           )}
        </div>

        {/* Wishlist Button - Floating */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-20 shadow-lg backdrop-blur-sm
            ${isInWishlist(book.id) 
              ? 'text-red-600 bg-white hover:bg-red-50' 
              : 'text-gray-600 bg-white/90 hover:bg-white hover:text-red-600 hover:scale-110'}`}
          aria-label={isInWishlist(book.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} fill={isInWishlist(book.id) ? "currentColor" : "none"} />
        </button>

        {/* Quick View Button - Appears on Hover */}
        <button
          onClick={(e) => {
            e.preventDefault();
            openQuickView(book);
          }}
          className="absolute top-14 right-3 p-2 rounded-full bg-white/90 text-gray-600 hover:bg-white hover:text-blue-600 transition-all duration-300 z-20 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
          aria-label="Quick view"
        >
          <Eye size={16} />
        </button>

        {/* Quick Add Button - Appears on Hover */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(book);
          }}
          className="absolute bottom-4 left-4 right-4 bg-white text-black py-2.5 rounded-lg font-bold text-sm shadow-lg transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-black hover:text-white"
        >
          <ShoppingCart size={16} />
          {t('buttons.addToCart') || "Add to Cart"}
        </button>
      </div>

      {/* Content - High Density */}
      <div className="flex flex-col flex-grow p-3">
        <Link href={`/book/${book.id}`} className="block group-hover:text-gray-600 transition-colors">
          <h3 className="font-bold text-black text-sm leading-tight line-clamp-2 mb-1 h-9" title={title}>
            {title}
          </h3>
        </Link>
        
        <p className="text-xs text-gray-500 mb-2 line-clamp-1 hover:text-black">
          {author}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-black">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={10} 
                fill={i < Math.floor(rating) ? "currentColor" : "none"} 
                className={i < Math.floor(rating) ? "text-black" : "text-gray-200"}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({reviewCount})</span>
        </div>

        <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-black text-sm">
              {formatPrice(book.price)}
            </span>
            {book.originalPrice && book.originalPrice > book.price && (
              <span className="text-[10px] text-gray-400 line-through">
                {formatPrice(book.originalPrice)}
              </span>
            )}
          </div>
          
          <button
            onClick={() => addToCart(book)}
            className="p-1.5 bg-gray-100 hover:bg-black text-black hover:text-white rounded transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}