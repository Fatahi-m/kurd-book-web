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
    gradient: 'from-blue-600 to-blue-800',
  },
  {
    id: 2,
    titleKey: 'sections.newReleases',
    subtitleKey: 'homepage.newReleasesSubtitle', // We might need to add this key or use a fallback
    descriptionKey: 'homepage.newReleasesDesc', // We might need to add this key or use a fallback
    ctaKey: 'buttons.viewAll',
    ctaLink: '/new-releases',
    gradient: 'from-purple-600 to-indigo-800',
  },
  {
    id: 3,
    titleKey: 'sections.specialOffers',
    subtitleKey: 'offers.discount',
    descriptionKey: 'offers.limitedTime', // We might need to add this key or use a fallback
    ctaKey: 'offers.viewOffers',
    ctaLink: '/books?filter=discount',
    gradient: 'from-orange-500 to-red-600',
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
    <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-2xl shadow-xl mb-8 group">
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
          className={`absolute inset-0 bg-gradient-to-r ${currentSlide.gradient} text-white flex items-center justify-center`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 px-4 md:px-16 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block mb-4 p-3 bg-white/10 rounded-full backdrop-blur-sm">
                {currentSlide.id === 1 && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                )}
                {currentSlide.id === 2 && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                )}
                {currentSlide.id === 3 && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                )}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight drop-shadow-lg"
            >
              {content.title}
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-2xl mb-4 text-white/90 font-medium"
            >
              {content.subtitle}
            </motion.p>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg mb-8 text-white/80 font-light max-w-2xl mx-auto hidden md:block"
            >
              {content.description}
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href={currentSlide.ctaLink}
                className="inline-block bg-white text-gray-900 px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200"
              >
                {t(currentSlide.ctaKey)}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100 rtl:right-4 rtl:left-auto"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} className="rtl:rotate-180" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100 rtl:left-4 rtl:right-auto"
        onClick={nextSlide}
      >
        <ChevronRight size={24} className="rtl:rotate-180" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 rtl:space-x-reverse z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
