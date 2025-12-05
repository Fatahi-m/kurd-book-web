'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Book } from '@/lib/types';
import BookCard from './BookCard';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BookRowProps {
  title?: string;
  subtitle?: string;
  books: Book[];
  viewAllLink?: string;
  variant?: 'default' | 'colored' | 'gray' | 'showcase' | 'centered' | 'dark';
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
  
  const isDark = variant === 'dark';

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

  return (
    <div className={`w-full mb-10 ${bgClass || ''}`}>
      {/* Header Strip - Clean & Modern */}
      {(title || viewAllLink) && (
        <div className="flex justify-between items-end mb-6 px-1">
          <div className="flex items-center gap-3">
            {icon && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h2 className={`text-2xl md:text-3xl font-bold leading-tight font-serif ${isDark ? 'text-white' : 'text-black'}`}>
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className={`text-sm mt-1 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {viewAllLink && (
              <Link href={viewAllLink} className={`hidden md:flex text-sm font-bold items-center gap-1 transition-colors group ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                {t('buttons.viewAll')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            )}
            
            {/* Navigation Buttons - Circular & Minimal */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scroll('left')}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-sm ${
                  isDark 
                    ? 'border-gray-700 text-gray-400 hover:bg-white hover:text-black hover:border-white' 
                    : 'border-gray-200 text-gray-500 hover:bg-black hover:text-white hover:border-black'
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-sm ${
                  isDark 
                    ? 'border-gray-700 text-gray-400 hover:bg-white hover:text-black hover:border-white' 
                    : 'border-gray-200 text-gray-500 hover:bg-black hover:text-white hover:border-black'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Grid/Scroll */}
      <div className="relative -mx-4 px-4">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-8 pt-2 px-1 scrollbar-hide snap-x"
          style={{ scrollBehavior: 'smooth' }}
        >
          {books.map((book) => (
            <div key={book.id} className="min-w-[140px] md:min-w-[180px] snap-start">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}