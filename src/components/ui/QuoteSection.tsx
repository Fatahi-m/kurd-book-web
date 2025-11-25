'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function QuoteSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-[#0f172a] text-[#F5F2E9] overflow-hidden flex items-center justify-center border-y border-[#333]">
      {/* Parallax Background Text */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[12vw] md:text-[15vw] font-serif font-bold leading-none text-[#ffffff] opacity-[0.02] whitespace-nowrap">
          WISDOM
        </span>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-5xl md:text-7xl font-serif text-[#e11d48] block mb-6 opacity-80">“</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif leading-tight mb-8 italic font-light tracking-wide">
            A room without books is like a <br className="hidden md:block" />
            <span className="text-[#e11d48]">body without a soul.</span>
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#e11d48] to-transparent"></div>
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400 font-light">
              Marcus Tullius Cicero
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
