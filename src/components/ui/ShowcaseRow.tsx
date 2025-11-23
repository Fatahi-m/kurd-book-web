'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';
import { Heart } from 'lucide-react';

interface ShowcaseRowProps {
  title: string;
  books: Book[];
  icon?: React.ReactNode;
}

export default function ShowcaseRow({ title, books, icon }: ShowcaseRowProps) {
  const { t } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);
  const [displayBooks, setDisplayBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    if (!books || books.length === 0) {
      setDisplayBooks([]);
      return;
    }

    // 1. Ensure we have enough items to fill a wide screen (e.g. 1920px)
    // A card is approx 220px wide (200px + 20px gap)
    // We need at least ~10-12 items to be safe.
    const minItemsToFillScreen = 12;
    let baseList = [...books];
    
    while (baseList.length < minItemsToFillScreen) {
      baseList = [...baseList, ...books];
    }

    // 2. Create the loop set: [BaseList, BaseList]
    // This allows us to scroll from 0% to -50% and have a perfect loop
    setDisplayBooks([...baseList, ...baseList]);
  }, [books]);

  if (displayBooks.length === 0) {
    return null; // Or return a skeleton/loading state
  }

  return (
    <section className="relative bg-[#f3efe9] dark:bg-[#1a1a1a] py-0 mb-12 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row group/section">
      
      {/* Side Title (Desktop) */}
      <div className="md:w-64 flex-shrink-0 p-6 md:p-8 flex flex-col justify-center items-center md:items-start text-center md:text-right rtl:md:text-left bg-[#e8e2d9] dark:bg-[#252525] z-20 shadow-lg md:shadow-none relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl md:text-4xl font-black text-gray-800 dark:text-white leading-tight mb-4">
            {title}
          </h2>
          <div className="w-12 h-1 bg-gray-800 dark:bg-white mb-6 mx-auto md:mx-0"></div>
          <Link 
            href="/books?filter=featured" 
            className="inline-flex items-center justify-center px-6 py-2 border-2 border-gray-800 dark:border-white text-gray-800 dark:text-white font-bold rounded-full hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all"
          >
            {t('buttons.viewAll')}
          </Link>
        </div>
        
        {/* Decorative Icon */}
        <div className="absolute -bottom-4 -right-4 md:bottom-8 md:right-8 opacity-5 text-9xl grayscale pointer-events-none select-none transform rotate-12">
          {icon || '✨'}
        </div>
      </div>

      {/* Scrolling Content */}
      <div className="flex-1 relative overflow-hidden py-8 md:py-10 bg-[#f3efe9] dark:bg-[#1a1a1a]">
        {/* Gradient Masks for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f3efe9] dark:from-[#1a1a1a] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f3efe9] dark:from-[#1a1a1a] to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Container */}
        <div 
          className="flex w-max"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className={`flex gap-5 ${isPaused ? 'paused' : ''}`}
            style={{ 
              animation: 'scroll 60s linear infinite',
            }}
          >
            {displayBooks.map((book, index) => (
              <div key={`showcase-${book.id}-${index}`} className="w-[200px] flex-shrink-0 transform transition-transform hover:scale-105 duration-300">
                <ShowcaseBookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        /* Force LTR direction for the marquee container to ensure consistent movement */
        .flex-1 {
          direction: ltr; 
        }

        .paused {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}

function ShowcaseBookCard({ book }: { book: Book }) {
  const { t } = useLanguage();
  
  const discountPercentage = book.originalPrice 
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white dark:bg-[#252525] rounded-xl p-3 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col relative group border border-gray-100 dark:border-gray-700">
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-[#ff6b6b] text-white text-sm font-bold px-2 py-1 rounded-lg shadow-sm">
          %{discountPercentage}
        </div>
      )}

      {/* Wishlist Icon */}
      <button className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-colors bg-white/80 dark:bg-black/50 rounded-full p-1.5 backdrop-blur-sm">
        <Heart className="w-4 h-4" />
      </button>

      {/* Image */}
      <Link href={`/book/${book.id}`} className="block relative aspect-[2/3] mb-3 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800">
        <Image
          src={book.coverUrl || book.image || '/images/default-book-cover.jpg'}
          alt={book.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <Link href={`/book/${book.id}`}>
          <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm mb-2 line-clamp-2 min-h-[2.5em] hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-tight">
            {book.title}
          </h3>
        </Link>

        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">{t('common.price')}:</span>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 dark:text-white text-sm">
                {formatPrice(book.price)}
              </span>
              {book.originalPrice && (
                <span className="text-[10px] text-gray-400 line-through decoration-red-400">
                  {formatPrice(book.originalPrice)}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end max-w-[50%]">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">{t('book.publisher')}:</span>
            <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 truncate w-full text-right">
              {book.publisher || book.author}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
