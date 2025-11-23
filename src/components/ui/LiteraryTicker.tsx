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
    <div className="w-full bg-[#2c2c2c] text-[#F5F2E9] overflow-hidden py-3 border-b border-[#3d3d3d]">
      <div className="relative flex items-center">
        {/* Gradient Masks for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#2c2c2c] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#2c2c2c] to-transparent z-10"></div>

        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ 
            repeat: Infinity, 
            duration: 30, 
            ease: "linear" 
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              {messages.map((msg, index) => (
                <div key={index} className="flex items-center mx-8">
                  <span className="w-2 h-2 bg-[#c5a47e] rounded-full mr-4"></span>
                  <span className="text-sm font-serif tracking-wider uppercase">{msg}</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
