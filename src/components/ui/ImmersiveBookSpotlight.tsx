'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRef } from 'react';

interface SpotlightProps {
  title?: string;
  author?: string;
  description?: string;
  image?: string;
  link?: string;
}

export default function ImmersiveBookSpotlight({ 
  title = "The Brothers Karamazov",
  author = "Fyodor Dostoevsky",
  description = "The final novel by the Russian author Fyodor Dostoevsky. Dostoevsky spent nearly two years writing The Brothers Karamazov, which was published as a serial in The Russian Messenger from January 1879 to November 1880.",
  image = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
  link = "/books"
}: SpotlightProps) {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative py-16 bg-slate-50 dark:bg-[#151515] text-[#1a1a1a] dark:text-[#f5f5f5] border-b border-[#e5e5e5] dark:border-[#333]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* Left: Image (Clean & Simple) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-[200px] md:w-[260px] aspect-[2/3] shadow-xl">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
          </div>

          {/* Right: Content (Structured) */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#e11d48] uppercase mb-3 block">
              Featured Selection
            </span>
            
            <h2 className="text-2xl md:text-3xl font-serif mb-3 leading-tight text-[#1a1a1a] dark:text-[#f5f5f5]">
              {title}
            </h2>
            
            <p className="text-base font-serif italic text-gray-600 dark:text-gray-400 mb-4">
              by <span className="text-[#1a1a1a] dark:text-[#f5f5f5]">{author}</span>
            </p>
            
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto md:mx-0 font-light">
              {description}
            </p>

            <Link 
              href={link} 
              className="inline-block px-6 py-2 bg-[#0f172a] dark:bg-[#f5f5f5] text-white dark:text-[#1a1a1a] text-[10px] font-bold tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              View Details
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
