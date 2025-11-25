'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    text: "A sanctuary for book lovers. The collection of Kurdish literature is unmatched.",
    author: "Sarah Ahmed",
    role: "Literature Student"
  },
  {
    id: 2,
    text: "Finally, a place where I can find rare editions of classic poetry. Beautifully designed website.",
    author: "Kamaran Ali",
    role: "Poet"
  },
  {
    id: 3,
    text: "Fast shipping and excellent packaging. The books arrived in perfect condition.",
    author: "Hana Mohammed",
    role: "Avid Reader"
  }
];

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#1a1a1a] border-t border-[#e5e5e5] dark:border-[#333]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2c2c2c] dark:text-[#e0e0e0] mb-4">
            Voices of Our Community
          </h2>
          <div className="w-24 h-[1px] bg-[#e11d48] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-4xl text-[#e11d48] font-serif mb-6">“</div>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-light italic mb-8 leading-relaxed">
                {testimonial.text}
              </p>
              <div>
                <h4 className="text-[#2c2c2c] dark:text-[#e0e0e0] font-serif font-medium tracking-wide">
                  {testimonial.author}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-widest mt-1 block">
                  {testimonial.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
