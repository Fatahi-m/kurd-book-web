'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function NewsletterSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 bg-slate-50 dark:bg-[#121212] overflow-hidden border-t border-[#e5e5e5] dark:border-[#333]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#2c2c2c 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#1a1a1a] p-12 md:p-20 shadow-2xl border border-gray-100 dark:border-gray-800 text-center relative overflow-hidden">
          
          {/* Decorative Corner */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#e11d48]"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#e11d48]"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#e11d48] text-xs font-bold tracking-[0.3em] uppercase mb-6 block">
              Stay Connected
            </span>
            
            <h3 className="text-3xl md:text-5xl font-serif text-[#2c2c2c] dark:text-[#e0e0e0] mb-6 leading-tight">
              Join Our Literary Circle
            </h3>
            
            <p className="text-gray-500 dark:text-gray-400 mb-10 font-light max-w-lg mx-auto leading-relaxed">
              Receive curated updates on new arrivals, exclusive author interviews, and literary events directly to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-1 bg-transparent border-b-2 border-[#e5e5e5] dark:border-[#333] py-3 px-2 focus:outline-none focus:border-[#e11d48] text-[#2c2c2c] dark:text-[#e0e0e0] placeholder-gray-400 transition-colors font-serif"
              />
              <button className="px-8 py-3 bg-[#0f172a] dark:bg-[#e0e0e0] text-white dark:text-[#121212] text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </form>

            <p className="mt-6 text-[10px] text-gray-400 uppercase tracking-widest">
              No spam, just literature.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
