'use client';

import { Book } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

interface EditorialHeroProps {
  book: Book;
}

export default function EditorialHero({ book }: EditorialHeroProps) {
  const { t, currentLanguage } = useLanguage();

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#F5F2E9] dark:bg-[#121212] text-[#2c2c2c] dark:text-[#e0e0e0]">
      
      {/* Background Texture/Pattern (Subtle Grain) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content - Editorial Style */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-start rtl:lg:text-right">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block py-1 px-3 border border-[#2c2c2c] dark:border-[#e0e0e0] rounded-full text-xs tracking-[0.2em] uppercase mb-6 font-medium">
                {t('sections.featuredBooks') || 'EDITOR\'S CHOICE'}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-serif font-light leading-[1.1] mb-6"
            >
              {book.title}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <p className="text-xl md:text-2xl font-light italic text-gray-600 dark:text-gray-400">
                {t('common.by')} <span className="font-normal text-[#2c2c2c] dark:text-[#e0e0e0] border-b border-gray-300 pb-0.5">{book.author}</span>
              </p>

              <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400 max-w-md mx-auto lg:mx-0 font-light">
                {book.description?.substring(0, 150)}...
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href={`/book/${book.id}`}
                  className="px-8 py-4 bg-[#2c2c2c] dark:bg-[#e0e0e0] text-[#F5F2E9] dark:text-[#121212] text-sm tracking-widest uppercase hover:bg-[#4a4a4a] dark:hover:bg-white transition-colors duration-300 min-w-[160px] text-center"
                >
                  {t('buttons.viewDetails') || 'READ MORE'}
                </Link>
                <button className="px-8 py-4 border border-[#2c2c2c] dark:border-[#e0e0e0] text-[#2c2c2c] dark:text-[#e0e0e0] text-sm tracking-widest uppercase hover:bg-[#2c2c2c] hover:text-[#F5F2E9] dark:hover:bg-[#e0e0e0] dark:hover:text-[#121212] transition-colors duration-300 min-w-[160px]">
                  {t('buttons.addToCart')}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Image Content - Artistic Display */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-[280px] md:w-[380px] aspect-[2/3] z-20"
            >
              {/* Realistic Book Shadow */}
              <div className="absolute -inset-4 bg-black/20 blur-2xl rounded-[50%] transform translate-y-12 scale-x-90 z-0"></div>
              
              <div className="relative w-full h-full shadow-2xl transform transition-transform duration-700 hover:scale-[1.02] hover:-translate-y-2">
                 <Image
                  src={book.coverUrl || book.image || '/images/default-book-cover.jpg'}
                  alt={book.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Book Spine Effect (Left side highlight) */}
                <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-white/30 to-transparent z-10"></div>
                {/* Book Fold Effect (Right side shadow) */}
                <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-l from-black/20 to-transparent z-10"></div>
              </div>
            </motion.div>

            {/* Decorative Elements behind book */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#2c2c2c]/10 dark:border-white/10 rounded-full z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-[#2c2c2c]/5 dark:border-white/5 rounded-full z-0"></div>
            
            {/* Large Background Text */}
            <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[15rem] font-serif font-bold text-[#2c2c2c]/5 dark:text-white/5 z-0 whitespace-nowrap pointer-events-none select-none">
              CLASSIC
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}