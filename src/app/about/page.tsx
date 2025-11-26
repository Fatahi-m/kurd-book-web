'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Heart, Users, GraduationCap, Sparkles, Globe } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const { t, currentLanguage } = useLanguage();
  const isRTL = currentLanguage === 'ku';

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500">
      {/* Editorial Hero */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="text-sm font-light tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase mb-6 block">
              {t('about.ourStory')}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 dark:text-white mb-8 leading-[1.1]">
              {t('about.title')}
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Intro Text */}
      <div className="px-6 py-20 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-2xl font-serif text-gray-900 dark:text-white">
              {t('about.vision')}
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg md:text-xl font-light text-gray-600 dark:text-gray-300 leading-loose">
              {t('about.intro')}
            </p>
          </div>
        </div>
      </div>

      {/* Missions */}
      <div className="px-6 py-20 bg-white dark:bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-6">
              {t('about.missions.title')}
            </h2>
            <p className="text-lg font-light text-gray-600 dark:text-gray-400 max-w-2xl">
              {t('about.missions.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="mb-6 text-gray-900 dark:text-white opacity-80 group-hover:opacity-100 transition-opacity">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">
                {t('about.missions.item1.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                {t('about.missions.item1.desc')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="mb-6 text-gray-900 dark:text-white opacity-80 group-hover:opacity-100 transition-opacity">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">
                {t('about.missions.item2.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                {t('about.missions.item2.desc')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="mb-6 text-gray-900 dark:text-white opacity-80 group-hover:opacity-100 transition-opacity">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">
                {t('about.missions.item3.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                {t('about.missions.item3.desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Donation Section - Editorial Style */}
      <div className="px-6 py-24 bg-slate-50 dark:bg-[#0f172a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-light tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase mb-6 block">
                Impact
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-8">
                {t('about.donation.title')}
              </h2>
              <p className="text-lg font-light text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t('about.donation.text')}
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✦</span>
                  <p className="text-gray-700 dark:text-gray-200 font-light">{t('about.donation.point1')}</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✦</span>
                  <p className="text-gray-700 dark:text-gray-200 font-light">{t('about.donation.point2')}</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✦</span>
                  <p className="text-gray-700 dark:text-gray-200 font-light">{t('about.donation.point3')}</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] md:aspect-square bg-gray-200 dark:bg-gray-800 overflow-hidden">
              {/* Abstract decorative element instead of image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-12">
                  <Heart className="w-16 h-16 mx-auto mb-6 text-gray-400 dark:text-gray-600" strokeWidth={1} />
                  <p className="text-xl font-serif text-gray-500 dark:text-gray-500 italic">
                    "{t('about.donation.closing')}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-24 border-t border-gray-200 dark:border-gray-800 text-center">
        <Link 
          href="/books" 
          className="inline-block px-12 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium tracking-[0.2em] uppercase hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          {t('about.cta')}
        </Link>
      </div>
    </main>
  );
}
