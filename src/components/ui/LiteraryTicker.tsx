'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LiteraryTicker() {
  const { t, currentLanguage } = useLanguage();
  
  const messages = [
    currentLanguage === 'ku' ? "بەخێربێن بۆ کوردبووک - ماڵی ڕۆشنبیری کوردی" : "Welcome to KurdBook - The Home of Kurdish Culture",
    currentLanguage === 'ku' ? "گەیاندنی خۆڕایی بۆ هەموو شارەکانی کوردستان" : "Free Shipping to All Cities in Kurdistan",
    currentLanguage === 'ku' ? "کۆمەڵێک کتێبی دەگمەن و نایاب گەیشتن" : "Rare and Unique Books Collection Just Arrived",
    currentLanguage === 'ku' ? "تایبەت بۆ خوێنەرانی ئاست بەرز" : "Exclusively for Elite Readers"
  ];

  return (
    <div className="w-full bg-[#0f172a] text-[#F5F2E9] overflow-hidden py-2 border-b border-[#333] z-40 relative">
      <div className="relative flex items-center">
        {/* Gradient Masks for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0f172a] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0f172a] to-transparent z-10"></div>

        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ 
            repeat: Infinity, 
            duration: 40, 
            ease: "linear" 
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              {messages.map((msg, index) => (
                <div key={index} className="flex items-center mx-12">
                  <span className="text-[#e11d48] mr-4 text-lg">✦</span>
                  <span className="text-xs font-serif tracking-[0.2em] uppercase opacity-80">{msg}</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
