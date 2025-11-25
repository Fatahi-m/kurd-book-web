'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Book } from '@/lib/types';
import BookCard from './BookCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BookRowProps {
  title?: string;
  subtitle?: string;
  books: Book[];
  viewAllLink?: string;
  variant?: 'default' | 'colored' | 'gray' | 'showcase' | 'centered';
  bgClass?: string;
  icon?: React.ReactNode;
}

export default function BookRow({ 
  title, 
  subtitle,
  books, 
  viewAllLink, 
  variant = 'default', 
  bgClass,
  icon 
}: BookRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Determine background styles based on variant
  let containerClasses = "mb-12 relative group";
  let headerClasses = "flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-800 pb-2";
  let titleClasses = "text-xl md:text-2xl font-bold flex items-center gap-2 text-[#313131] dark:text-white";
  let linkClasses = "text-sm font-bold text-[#e11d48] hover:text-[#be123c] flex items-center gap-1 transition-colors";

  if (variant === 'colored') {
    containerClasses = `rounded-xl p-6 md:p-8 mb-12 relative group ${bgClass || 'bg-[#e11d48]'}`;
    headerClasses = "flex justify-between items-center mb-6";
    titleClasses = "text-xl md:text-2xl font-bold flex items-center gap-2 text-white";
    linkClasses = "text-sm font-bold text-white/90 hover:text-white flex items-center gap-1 transition-colors";
  } else if (variant === 'gray') {
    containerClasses = "rounded-xl p-6 md:p-8 mb-12 relative group bg-gray-50 dark:bg-gray-800/50";
  } else if (variant === 'centered') {
    containerClasses = `py-12 relative group ${bgClass || 'bg-white'}`;
    headerClasses = "flex flex-col items-center justify-center mb-10 text-center";
    titleClasses = "text-2xl md:text-3xl font-bold text-[#313131] mb-2 relative inline-block";
    linkClasses = "hidden"; 
  } else if (variant === 'showcase') {
    // ... existing showcase logic ...
    containerClasses = "rounded-xl p-0 mb-12 relative group bg-[#f5f5f5] dark:bg-gray-800 overflow-hidden flex flex-col md:flex-row border border-gray-200 dark:border-gray-700";
    headerClasses = "hidden"; 
  }

  if (variant === 'showcase') {
    return (
      <section className={containerClasses}>
        {/* Side Title for Desktop */}
        <div className="md:w-64 flex-shrink-0 p-6 md:p-8 flex flex-col justify-center items-center md:items-start text-center md:text-right rtl:md:text-left bg-white dark:bg-gray-800 border-b md:border-b-0 md:border-l rtl:md:border-l-0 rtl:md:border-r border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight mb-4">
            {title}
          </h2>
          <div className="w-12 h-1 bg-gray-900 dark:bg-white mb-6 mx-auto md:mx-0"></div>
          {viewAllLink && (
            <Link 
              href={viewAllLink} 
              className="inline-flex items-center justify-center px-6 py-2 border border-gray-900 dark:border-white text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all text-sm"
            >
              {t('buttons.viewAll')}
            </Link>
          )}
          {/* Decorative Icon */}
          <div className="mt-8 opacity-5 text-8xl hidden md:block grayscale">
            {icon || '📚'}
          </div>
        </div>

        {/* Books Slider */}
        <div className="flex-1 relative p-4 md:p-8 min-w-0">
           {/* Scroll Buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:block hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:block hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {books.map((book) => (
              <div key={book.id} className="flex-shrink-0 w-[180px] md:w-[200px] snap-start">
                <BookCard book={book} showDiscount={true} />
              </div>
            ))}
             {viewAllLink && (
              <div className="flex-shrink-0 w-[180px] md:w-[200px] snap-start flex items-center justify-center">
                <Link 
                  href={viewAllLink}
                  className="flex flex-col items-center justify-center w-full h-full min-h-[300px] rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="p-4 rounded-full bg-white dark:bg-gray-700 mb-3 shadow-sm">
                    <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
                  </div>
                  <span className="font-bold">{t('buttons.viewAll')}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={containerClasses}>
      {title && (
        <div className={`${headerClasses} ${variant === 'centered' ? 'max-w-6xl mx-auto px-4' : ''}`}>
          {variant === 'centered' ? (
            <>
              <h2 className={titleClasses}>
                <span className="text-[#e11d48] mr-2">»</span>
                {title}
                <span className="text-[#e11d48] ml-2">«</span>
              </h2>
              {subtitle && (
                <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </>
          ) : (
            <>
              <h2 className={titleClasses}>
                {icon && <span>{icon}</span>}
                {title}
              </h2>
              {viewAllLink && (
                <Link href={viewAllLink} className={linkClasses}>
                  <span>{t('buttons.viewAll')}</span>
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                </Link>
              )}
            </>
          )}
        </div>
      )}

      <div className={`relative ${variant === 'centered' ? 'max-w-6xl mx-auto px-12' : ''}`}>
        {/* Scroll Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:block hover:bg-gray-50 dark:hover:bg-gray-600"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:block hover:bg-gray-50 dark:hover:bg-gray-600"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Books Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {books.map((book) => (
            <div key={book.id} className="flex-shrink-0 w-[160px] md:w-[180px] snap-start">
              <BookCard book={book} showDiscount={variant === 'colored'} />
            </div>
          ))}
          
          {/* "See More" Card at the end */}
          {viewAllLink && (
            <div className="flex-shrink-0 w-[160px] md:w-[180px] snap-start flex items-center justify-center">
              <Link 
                href={viewAllLink}
                className={`flex flex-col items-center justify-center w-full h-full min-h-[300px] rounded-xl border-2 border-dashed transition-colors ${
                  variant === 'colored' 
                    ? 'border-white/30 text-white hover:bg-white/10' 
                    : 'border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className={`p-3 rounded-full mb-2 ${variant === 'colored' ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'}`}>
                  <ChevronLeft className={`w-6 h-6 rtl:rotate-180 ${variant === 'colored' ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
                </div>
                <span className="font-bold">{t('buttons.viewAll')}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
