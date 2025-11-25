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
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-white dark:bg-[#0f172a] pt-24 pb-12">
      
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-white to-white dark:from-rose-950/40 dark:via-[#0f172a] dark:to-[#0f172a] opacity-70"></div>
      
      {/* Abstract Shapes */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-1000"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Text Content - Modern Clean */}
          <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-start rtl:lg:text-right">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-900/30 text-[#e11d48] dark:text-rose-300 text-xs font-bold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-[#e11d48] animate-pulse"></span>
                {t('sections.featuredBooks') || 'Editor\'s Choice'}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-gray-900 dark:text-white"
            >
              {book.title}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8 w-full max-w-lg lg:max-w-none"
            >
              <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
                {t('common.by')} <span className="text-[#e11d48] dark:text-rose-400">{book.author}</span>
              </p>

              <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-400 font-light">
                {book.description?.substring(0, 180)}...
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Link 
                  href={`/book/${book.id}`}
                  className="px-8 py-4 bg-[#e11d48] hover:bg-[#be123c] text-white text-sm font-bold rounded-2xl shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:-translate-y-1 transition-all duration-300 text-center min-w-[160px]"
                >
                  {t('buttons.viewDetails') || 'Read More'}
                </Link>
                <button className="px-8 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 min-w-[160px]">
                  {t('buttons.addToCart')}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Image Content - Modern Floating */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative flex justify-center items-center py-10 lg:py-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-[260px] md:w-[320px] lg:w-[380px] aspect-[2/3] z-20"
            >
              {/* Soft Glow Behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-rose-500/20 rounded-full blur-3xl -z-10"></div>
              
              <div className="relative w-full h-full transform transition-transform duration-500 hover:scale-[1.02] hover:-translate-y-2 perspective-1000 group">
                 <div className="relative w-full h-full rounded-2xl shadow-2xl shadow-rose-900/20 overflow-hidden bg-white dark:bg-gray-800">
                    <Image
                      src={book.coverUrl || book.image || '/images/default-book-cover.jpg'}
                      alt={book.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Modern Glass Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 </div>
              </div>
            </motion.div>

            {/* Decorative Circle Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-rose-100 dark:border-white/5 rounded-full -z-20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] border border-rose-50 dark:border-white/5 rounded-full -z-20 opacity-50"></div>
          </div>

        </div>
      </div>
    </section>
  );
}