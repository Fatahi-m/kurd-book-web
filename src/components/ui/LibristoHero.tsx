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
    <div className="container mx-auto px-4 md:px-8 mt-6 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px] lg:h-[450px]">
        
        {/* Main Hero Slider - 8/12 Width */}
        <div className="lg:col-span-8 relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl group">
          {/* Background Image with Blur */}
          <div className="absolute inset-0">
            <Image 
              src={activeSlide.image} 
              alt="Background"
              fill
              className="object-cover opacity-40 blur-xl scale-110 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
          </div>

          <div className="absolute inset-0 flex items-center justify-between p-8 md:p-16 z-10">
            <div className="flex-1 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                {t('hero.badge') || "Featured Book"}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-serif">
                {activeSlide.title}
              </h1>
              <p className="text-xl text-slate-300 mb-8 font-medium">
                by <span className="text-amber-400">{activeSlide.author}</span>
              </p>
              <p className="text-slate-400 mb-10 line-clamp-2 hidden md:block text-lg leading-relaxed">
                {activeSlide.subtitle}
              </p>
              
              <div className="flex gap-4">
                <Link 
                  href={`/book/${activeSlide.id}`} 
                  className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-amber-500/25 flex items-center gap-2 group/btn"
                >
                  {t('buttons.viewDetails') || "Read Now"}
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 rtl:rotate-180" />
                </Link>
                <button className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all backdrop-blur-sm border border-white/10">
                  Add to Wishlist
                </button>
              </div>
            </div>
            
            {/* Book Cover - Floating Effect */}
            <div className="relative w-[200px] md:w-[260px] aspect-[2/3] hidden md:block perspective-1000">
              <div className="relative w-full h-full transform rotate-y-12 rotate-z-3 transition-transform duration-700 hover:rotate-0 hover:scale-105 shadow-2xl shadow-black/50 rounded-lg overflow-hidden">
                <Image 
                  src={activeSlide.image} 
                  alt={activeSlide.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          </div>
          
          {/* Slider Dots */}
          <div className="absolute bottom-8 left-8 md:left-16 flex gap-3 z-20">
            {HERO_SLIDES.map((slide) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(slide)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide.id === slide.id ? 'bg-amber-500 w-8' : 'bg-slate-600 w-4 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${slide.name}`}
              />
            ))}
          </div>
        </div>

        {/* Side Banners - 4/12 Width */}
        <div className="hidden lg:flex flex-col gap-6 lg:col-span-4 h-full">
          {/* Top Banner - Bestsellers */}
          <Link href="/bestsellers" className="flex-1 bg-amber-50 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-all border border-amber-100">
            <div className="relative z-10">
              <span className="text-amber-600 font-bold text-xs uppercase tracking-wider mb-2 block">Trending Now</span>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-serif">Bestsellers</h3>
              <p className="text-slate-600 text-sm mb-4">Top rated books this week</p>
              <span className="inline-flex items-center text-sm font-bold text-amber-700 group-hover:translate-x-2 transition-transform">
                Shop Now <ChevronRight className="w-4 h-4 ml-1 rtl:rotate-180" />
              </span>
            </div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-amber-200/50 rounded-full blur-3xl -mr-10 -mb-10 group-hover:bg-amber-300/50 transition-colors"></div>
            <div className="absolute right-4 bottom-4 w-24 h-36 shadow-lg transform rotate-12 group-hover:rotate-6 transition-transform duration-500">
               <Image src="/images/books/1.jpg" alt="Bestseller" fill className="object-cover rounded" />
            </div>
          </Link>

          {/* Bottom Banner - New Arrivals */}
          <Link href="/new-releases" className="flex-1 bg-slate-900 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="relative z-10">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-2 block">Just Arrived</span>
              <h3 className="text-2xl font-bold text-white mb-2 font-serif">New Releases</h3>
              <p className="text-slate-400 text-sm mb-4">Fresh from the press</p>
              <span className="inline-flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                Discover <ChevronRight className="w-4 h-4 ml-1 rtl:rotate-180" />
              </span>
            </div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mb-10 group-hover:bg-blue-500/30 transition-colors"></div>
            <div className="absolute right-4 bottom-4 w-24 h-36 shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
               <Image src="/images/books/2.jpg" alt="New Release" fill className="object-cover rounded" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
