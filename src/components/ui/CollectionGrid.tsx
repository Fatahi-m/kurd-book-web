'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const collections = [
  { id: 'literature', title: 'Literature', image: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&q=80&w=800' },
  { id: 'poetry', title: 'Poetry', image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=800' },
  { id: 'history', title: 'History', image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800' },
  { id: 'philosophy', title: 'Philosophy', image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&q=80&w=800' },
  { id: 'children', title: 'Children', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800' },
  { id: 'science', title: 'Science', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800' },
];

export default function CollectionGrid() {
  const { t } = useLanguage();

  return (
    <section className="py-20 border-b border-[#e5e5e5] dark:border-[#333]">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2c2c2c] dark:text-[#e0e0e0] mb-4 tracking-tight">
            Curated Collections
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto italic">
            Explore our hand-picked selections across various genres.
          </p>
        </div>

        {/* Elegant Grid - Uniform Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link 
              key={collection.id} 
              href={`/category/${collection.id}`} 
              className="group relative h-64 overflow-hidden border border-gray-200 dark:border-gray-800"
            >
              {/* Image Background */}
              <Image 
                src={collection.image} 
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500"></div>
              
              {/* Content - Centered & Elegant */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                <div className="w-12 h-[1px] bg-white/60 mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <h3 className="text-2xl font-serif font-light tracking-wide mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {t(`categories.${collection.id}`) || collection.title}
                </h3>
                <span className="text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 font-light">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}