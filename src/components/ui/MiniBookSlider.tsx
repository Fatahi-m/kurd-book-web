'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface MiniBookSliderProps {
  books: Book[];
  title?: string;
}

export default function MiniBookSlider({ books, title }: MiniBookSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % books.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [books.length, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % books.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
    setIsAutoPlaying(false);
  };

  if (books.length === 0) return null;

  const currentBook = books[currentIndex];

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {title && (
        <div className="p-3 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
        </div>
      )}
      
      <div className="relative p-4">
        <div className="flex gap-4">
          {/* Image */}
          <div className="w-24 h-36 flex-shrink-0 relative rounded-md overflow-hidden shadow-sm">
            {currentBook.coverUrl || currentBook.image ? (
              <Image
                src={currentBook.coverUrl || currentBook.image || '/images/default-book-cover.jpg'}
                alt={currentBook.title}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-2xl">
                📚
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
            <div>
              <h4 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1">
                {currentBook.title}
              </h4>
              <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                {currentBook.author}
              </p>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-xs text-gray-600">{currentBook.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="font-bold text-[#e11d48] text-sm">
                {formatPrice(currentBook.price)}
              </span>
              <Link 
                href={`/book/${currentBook.id}`}
                className="bg-[#e11d48] text-white p-1.5 rounded-md hover:bg-[#be123c] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-1 mt-3">
          {books.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsAutoPlaying(false);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                idx === currentIndex 
                  ? 'bg-[#e11d48]' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
