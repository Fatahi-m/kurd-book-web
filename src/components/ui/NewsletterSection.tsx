'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Mail } from 'lucide-react';

export default function NewsletterSection() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-black rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
      {/* Background Patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="max-w-2xl text-center lg:text-left rtl:lg:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
            <Mail size={14} />
            <span>Newsletter</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif leading-tight">
            {t('newsletter.title') || "Join Our Literary Circle"}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-medium">
            {t('newsletter.subtitle') || "Get the latest updates, new releases, and special offers delivered directly to your inbox."}
          </p>
        </div>

        <div className="w-full lg:w-auto bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            placeholder={t('newsletter.placeholder') || "Your email address"}
            className="flex-1 min-w-[280px] px-6 py-4 bg-transparent text-black placeholder-gray-400 focus:outline-none text-lg"
          />
          <button className="px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg text-lg whitespace-nowrap">
            {t('newsletter.button') || "Subscribe Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
