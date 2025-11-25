'use client';

import { Book } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReviews } from '@/contexts/ReviewContext';
import { formatPrice } from '@/lib/utils';
import { Heart, ShoppingCart, BookOpen, Globe, Star } from 'lucide-react';

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

  const rating = getAverageRating(book.id) || book.rating || 0;
  const reviewCount = getReviewCount(book.id) || book.reviewCount || 0;

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
    <div className="group flex flex-col h-full">
      {/* Image Container - Standalone with shadow */}
      <Link href={`/book/${book.id}`} className="relative aspect-[5/8] w-full rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 bg-gray-100">
        <div className="relative w-full h-full">
          {book.coverUrl || book.image ? (
            <Image
              src={book.coverUrl || book.image || '/images/default-book-cover.jpg'}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-4xl opacity-20">📚</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
           {book.bestseller && (
             <span className="text-[10px] font-bold bg-yellow-400 text-black px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">Top</span>
           )}
           {book.newRelease && (
             <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">New</span>
           )}
           {showDiscount && discountPercentage > 0 && (
             <span className="text-[10px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">-{discountPercentage}%</span>
           )}
        </div>
      </Link>

      {/* Content - No border, just text */}
      <div className="mt-3 flex flex-col gap-1 px-1">
        <Link href={`/author/${book.author}`}>
           <p className="text-xs font-medium text-gray-500 uppercase tracking-wide hover:text-rose-600 transition-colors line-clamp-1">
             {book.author}
           </p>
        </Link>

        <Link href={`/book/${book.id}`}>
          <h3 className="font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-rose-600 transition-colors min-h-[2.5em]" title={book.title}>
            {book.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
           {[1, 2, 3, 4, 5].map((star) => (
             <Star 
                key={star} 
                size={10} 
                className={`${star <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} 
             />
           ))}
           <span className="text-[10px] text-gray-400 ml-1">({reviewCount})</span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col">
                {book.originalPrice && (
                  <span className="text-xs text-gray-400 line-through decoration-rose-500/30">
                    {formatPrice(book.originalPrice)}
                  </span>
                )}
                <span className="text-lg font-black text-slate-900 leading-none">
                  {formatPrice(book.price)}
                </span>
            </div>
            
            <button 
                onClick={(e) => {
                  e.preventDefault();
                  if (book.inStock) addToCart(book, 1);
                }}
                className={`h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md
                  ${book.inStock
                    ? 'bg-white border border-gray-200 text-gray-900 hover:bg-rose-600 hover:border-rose-600 hover:text-white'
                    : 'bg-gray-50 text-gray-300 cursor-not-allowed'}
                `}
                title={t('buttons.addToCart')}
            >
                <ShoppingCart size={16} />
            </button>
        </div>
      </div>
    </div>
  );
}