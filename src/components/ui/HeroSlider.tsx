'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Slide {
  id: number;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  ctaKey: string;
  ctaLink: string;
  gradient: string;
  pattern?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    titleKey: 'homepage.welcome',
    subtitleKey: 'homepage.subtitle',
    descriptionKey: 'homepage.inspiration',
    ctaKey: 'nav.books',
    ctaLink: '/books',
    gradient: 'from-gray-900 to-black',
  },
  {
    id: 2,
    titleKey: 'sections.newReleases',
    subtitleKey: 'homepage.newReleasesSubtitle', // We might need to add this key or use a fallback
    descriptionKey: 'homepage.newReleasesDesc', // We might need to add this key or use a fallback
    ctaKey: 'buttons.viewAll',
    ctaLink: '/new-releases',
    gradient: 'from-black to-gray-800',
  },
  {
    id: 3,
    titleKey: 'sections.specialOffers',
    subtitleKey: 'offers.discount',
    descriptionKey: 'offers.limitedTime', // We might need to add this key or use a fallback
    ctaKey: 'offers.viewOffers',
    ctaLink: '/books?filter=discount',
    gradient: 'from-gray-800 to-black',
  }
];

export default function HeroSlider() {
  const { t, currentLanguage } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  // Helper to safely get translation or fallback
  const safeT = (key: string, fallback: string) => {
    const translated = t(key);
    return translated !== key ? translated : fallback;
  };

  const currentSlide = slides[currentIndex];

  // Fallback texts for keys that might not exist yet
  const getSlideContent = (slide: Slide) => {
    if (slide.id === 2) {
      return {
        title: safeT(slide.titleKey, 'New Releases'),
        subtitle: safeT(slide.subtitleKey, 'Discover the latest additions to our library'),
        description: safeT(slide.descriptionKey, 'Be the first to read the newest books from top Kurdish and international authors.'),
      };
    }
    if (slide.id === 3) {
      return {
        title: safeT(slide.titleKey, 'Special Offers'),
        subtitle: safeT(slide.subtitleKey, 'Up to 50% discount on selected books'),
        description: safeT(slide.descriptionKey, 'Don\'t miss out on our limited time offers. Great books at great prices.'),
      };
    }
    return {
      title: t(slide.titleKey),
      subtitle: t(slide.subtitleKey),
      description: t(slide.descriptionKey),
    };
  };

  const content = getSlideContent(currentSlide);

  return (
    <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden rounded-2xl shadow-2xl group bg-gray-900">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background with Gradient & Pattern */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentSlide.gradient}`}>
             <div className="absolute inset-0 opacity-20 bg-[url('/images/noise.png')] mix-blend-overlay"></div>
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -mr-20 -mt-20 animate-pulse"></div>
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/20 rounded-full blur-[80px] -ml-10 -mb-10"></div>
          </div>

          <div className="relative z-10 container mx-auto px-8 md:px-16 h-full flex flex-col justify-center items-start text-white max-w-5xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-lg"
            >
              {content.subtitle || 'Featured Collection'}
            </motion.span>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.9] font-serif tracking-tight drop-shadow-xl"
            >
              {content.title}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-100 mb-10 max-w-xl leading-relaxed font-light drop-shadow-md"
            >
              {content.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link 
                href={currentSlide.ctaLink}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-xl overflow-hidden transition-all hover:bg-gray-100 hover:scale-105 shadow-xl shadow-black/20"
              >
                <span className="relative z-10 uppercase tracking-wider text-sm">{t(currentSlide.ctaKey)}</span>
                <ChevronRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button 
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 duration-300 shadow-lg"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
      </button>
      
      <button 
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 duration-300 shadow-lg"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6 rtl:rotate-180" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-white/30 w-2 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
