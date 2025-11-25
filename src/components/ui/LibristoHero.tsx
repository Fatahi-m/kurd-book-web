'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ShoppingCart, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { books } from '@/data/books';

// Select specific books for the hero slider
const HERO_SLIDES = books
  .filter(book => ['1', '2', '3', '5'].includes(book.id))
  .map(book => ({
    id: book.id,
    name: book.title,
    title: book.title,
    subtitle: book.description,
    image: book.image || '/images/default-book-cover.jpg',
    author: book.author,
    color: '#e11d48',
  }));

export default function LibristoHero() {
  const [activeSlide, setActiveSlide] = useState(HERO_SLIDES[0]);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => {
        const currentIndex = HERO_SLIDES.findIndex(s => s.id === current.id);
        const nextIndex = (currentIndex + 1) % HERO_SLIDES.length;
        return HERO_SLIDES[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0f172a] relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#e11d48]/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-slate-500/10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6 md:px-12 py-20 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left rtl:md:text-right">
            <div className="inline-block px-4 py-1.5 bg-[#e11d48]/20 text-[#e11d48] rounded-full text-sm font-bold mb-6 border border-[#e11d48]/30">
              {t('hero.badge') || "New Collection 2025"}
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
              {activeSlide.title}
            </h1>
            <p className="text-xl text-[#e11d48] font-medium mb-4">
              {activeSlide.author}
            </p>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed mx-auto md:mx-0 rtl:md:mx-0">
              {activeSlide.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start rtl:md:justify-start">
              <Link 
                href={`/book/${activeSlide.id}`} 
                className="px-8 py-4 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold rounded-full transition-all shadow-lg shadow-rose-900/20 hover:shadow-rose-900/40 hover:-translate-y-1 flex items-center gap-2"
              >
                {t('buttons.viewDetails') || "View Details"}
                <ChevronRight size={20} className="rtl:rotate-180" />
              </Link>
              <button 
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full transition-all border border-white/10 hover:border-white/20 backdrop-blur-sm flex items-center gap-2"
              >
                <ShoppingCart size={20} />
                {t('buttons.addToCart') || "Add to Cart"}
              </button>
            </div>
          </div>

          {/* Hero Image/Slider */}
          <div className="flex-1 relative w-full max-w-lg flex justify-center">
            <div className="relative w-[300px] md:w-[350px] aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/10 group transform transition-transform duration-500 hover:scale-105 hover:-translate-y-2">
              <Image 
                src={activeSlide.image} 
                alt={activeSlide.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent opacity-60"></div>
              
              {/* Slide Indicators inside image for mobile, or outside for desktop? Let's keep them outside or overlay */}
            </div>
            
            {/* Navigation Dots - Positioned below image */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
              {HERO_SLIDES.map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(slide)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide.id === slide.id 
                      ? 'w-8 bg-[#e11d48]' 
                      : 'w-2 bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${slide.name}`}
                />
              ))}
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-rose-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-[#e11d48]/20 rounded-full blur-xl"></div>
          </div>

        </div>
      </div>
    </div>
  );
}
