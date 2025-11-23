'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

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
    <section className="relative py-32 overflow-hidden bg-[#2c2c2c] text-[#F5F2E9]">
      {/* Abstract Background Art */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#c5a47e] rounded-full blur-[120px] opacity-40"></div>
         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
          
          {/* 3D Book Presentation */}
          <motion.div 
            initial={{ opacity: 0, rotateY: -30, x: -50 }}
            whileInView={{ opacity: 1, rotateY: -15, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12 flex justify-center perspective-1000"
          >
            <div className="relative w-[280px] md:w-[360px] aspect-[2/3] transform-style-3d group cursor-pointer">
              {/* Book Spine Effect */}
              <div className="absolute top-1 left-0 w-full h-full bg-white transform -translate-x-4 translate-z-[-10px] shadow-2xl"></div>
              <div className="absolute top-2 left-0 w-full h-full bg-gray-800 transform -translate-x-2 translate-z-[-5px]"></div>
              
              {/* Main Cover */}
              <div className="relative w-full h-full shadow-[20px_20px_60px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:rotate-y-12 group-hover:scale-105">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover border-r-2 border-white/10"
                />
                {/* Lighting/Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20 pointer-events-none"></div>
                
                {/* Floating Badge */}
                <div className="absolute -top-6 -right-6 bg-[#c5a47e] text-[#2c2c2c] w-20 h-20 rounded-full flex items-center justify-center font-bold text-xs uppercase tracking-widest shadow-lg animate-pulse-slow">
                  <span className="text-center leading-tight">Book<br/>of the<br/>Month</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Editorial Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full lg:w-6/12 text-center lg:text-left lg:rtl:text-right"
          >
            <div className="inline-block border border-[#c5a47e] px-4 py-1 mb-6">
              <span className="text-[#c5a47e] text-xs tracking-[0.3em] uppercase">Masterpiece Collection</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif text-[#F5F2E9] mb-4 leading-tight">
              {title}
            </h2>
            
            <p className="text-xl text-[#c5a47e] mb-8 font-serif italic">
              by {author}
            </p>
            
            <p className="text-lg text-gray-400 leading-relaxed mb-10 font-light max-w-xl mx-auto lg:mx-0">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
              <Link href={link} className="group relative px-8 py-4 bg-[#F5F2E9] text-[#2c2c2c] overflow-hidden">
                <span className="relative z-10 text-sm tracking-widest uppercase font-bold group-hover:text-[#F5F2E9] transition-colors duration-300">View Details</span>
                <div className="absolute inset-0 bg-[#c5a47e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
              
              <button className="text-[#F5F2E9] text-sm tracking-widest uppercase border-b border-transparent hover:border-[#c5a47e] pb-1 transition-all">
                Add to Wishlist
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
