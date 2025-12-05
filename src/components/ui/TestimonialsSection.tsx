'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "A sanctuary for book lovers. The collection of Kurdish literature is unmatched.",
    author: "Sarah Ahmed",
    role: "Literature Student",
    rating: 5
  },
  {
    id: 2,
    text: "Finally, a place where I can find rare editions of classic poetry. Beautifully designed website.",
    author: "Kamaran Ali",
    role: "Poet",
    rating: 5
  },
  {
    id: 3,
    text: "Fast shipping and excellent packaging. The books arrived in perfect condition.",
    author: "Hana Mohammed",
    role: "Avid Reader",
    rating: 4
  }
];

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-serif mb-2">
          {t('home.testimonialsTitle') || "Voices of Our Community"}
        </h2>
        <p className="text-slate-500">
          {t('home.testimonialsSubtitle') || "Join thousands of satisfied readers who have found their next favorite book with us."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.slice(0, 2).map((testimonial, index) => (
          <motion.div 
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="absolute top-6 right-6 text-slate-100 group-hover:text-amber-50 transition-colors">
              <Quote size={40} fill="currentColor" />
            </div>
            
            <div className="flex gap-1 mb-4 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < testimonial.rating ? "currentColor" : "none"} className={i < testimonial.rating ? "" : "text-slate-200"} />
              ))}
            </div>

            <p className="text-base text-slate-700 font-medium italic mb-6 leading-relaxed relative z-10">
              "{testimonial.text}"
            </p>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {testimonial.author.charAt(0)}
              </div>
              <div>
                <h4 className="text-slate-900 font-bold text-sm">
                  {testimonial.author}
                </h4>
                <span className="text-xs text-amber-600 font-medium uppercase tracking-wide">
                  {testimonial.role}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
