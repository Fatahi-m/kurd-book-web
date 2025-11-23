'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

interface FeaturedAuthorProps {
  name: string;
  bio: string;
  imageUrl: string;
  quote?: string;
  link: string;
}

export default function FeaturedAuthor({ name, bio, imageUrl, quote, link }: FeaturedAuthorProps) {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#F5F2E9] dark:bg-[#121212] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mr-auto lg:ml-0 grayscale hover:grayscale-0 transition-all duration-700"
            >
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover"
              />
              {/* Frame Border */}
              <div className="absolute inset-0 border border-[#2c2c2c] dark:border-[#e0e0e0] transform translate-x-4 translate-y-4 -z-10"></div>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2 text-center lg:text-left rtl:lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-xs tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 mb-4 block">
                {t('nav.authors') || 'AUTHOR IN FOCUS'}
              </span>
              
              <h2 className="text-4xl md:text-6xl font-serif text-[#2c2c2c] dark:text-[#e0e0e0] mb-8">
                {name}
              </h2>

              {quote && (
                <blockquote className="text-xl md:text-2xl font-serif italic text-gray-600 dark:text-gray-300 mb-8 leading-relaxed border-l-2 border-[#2c2c2c] dark:border-[#e0e0e0] pl-6 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6 mx-auto lg:mx-0 max-w-lg">
                  "{quote}"
                </blockquote>
              )}

              <p className="text-base leading-loose text-gray-600 dark:text-gray-400 mb-10 font-light max-w-lg mx-auto lg:mx-0">
                {bio}
              </p>

              <Link 
                href={link}
                className="inline-block border-b border-[#2c2c2c] dark:border-[#e0e0e0] pb-1 text-sm uppercase tracking-widest text-[#2c2c2c] dark:text-[#e0e0e0] hover:opacity-60 transition-opacity"
              >
                {t('buttons.viewAll') || 'VIEW BIBLIOGRAPHY'}
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}