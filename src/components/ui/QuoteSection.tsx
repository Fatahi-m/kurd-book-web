'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function QuoteSection() {
  const { t } = useLanguage();

  return (
    <div className="h-full bg-black text-white p-10 rounded-2xl relative overflow-hidden flex flex-col justify-center items-center text-center shadow-xl min-h-[400px]">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-10 -mb-10"></div>
      
      <div className="relative z-10">
        <span className="text-6xl font-serif text-gray-600 block mb-6 opacity-80">“</span>
        <h2 className="text-2xl md:text-3xl font-serif leading-relaxed mb-8 italic font-light tracking-wide text-white">
          {t('quote.text') || "A room without books is like a body without a soul."}
        </h2>
        <div className="flex flex-col items-center gap-4">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 font-bold">
            {t('quote.author') || "Marcus Tullius Cicero"}
          </p>
        </div>
      </div>
    </div>
  );
}
