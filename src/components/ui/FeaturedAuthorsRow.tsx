'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { authors } from '@/data/books';

export default function FeaturedAuthorsRow() {
  const { t, currentLanguage } = useLanguage();

  // Get first 4 authors
  const featuredAuthors = authors.slice(0, 4);

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#121212] border-t border-slate-200 dark:border-[#333]">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-[#f5f5f5] mb-3">
              {t('nav.authors') || 'Featured Authors'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              {t('authors.subtitle') || 'The voices that define our literature.'}
            </p>
          </div>
          <Link 
            href="/authors" 
            className="hidden md:inline-block text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-[#f5f5f5] border-b border-slate-900 dark:border-[#f5f5f5] pb-1 hover:opacity-60 transition-opacity"
          >
            {t('buttons.viewAll') || 'View All Authors'}
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {featuredAuthors.map((author) => (
            <Link href={`/author/${author.id}`} key={author.id} className="group flex flex-col items-center text-center">
              <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg group-hover:shadow-xl group-hover:border-rose-100 dark:group-hover:border-rose-900/30 transition-all duration-300 transform group-hover:-translate-y-2">
                {author.image ? (
                  <Image
                    src={author.image}
                    alt={author.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    sizes="(max-width: 768px) 128px, 160px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-4xl">
                    ✒️
                  </div>
                )}
              </div>
              <div className="px-2">
                <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-[#f5f5f5] group-hover:text-[#e11d48] transition-colors line-clamp-1 mb-1">
                  {author.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-medium group-hover:text-rose-500/70 transition-colors">
                  {author.genre && author.genre.length > 0 ? author.genre[0] : (t('common.author') || 'Author')}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link 
            href="/authors" 
            className="inline-block text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-[#f5f5f5] border-b border-slate-900 dark:border-[#f5f5f5] pb-1 hover:opacity-60 transition-opacity"
          >
            {t('buttons.viewAll') || 'View All Authors'}
          </Link>
        </div>

      </div>
    </section>
  );
}
