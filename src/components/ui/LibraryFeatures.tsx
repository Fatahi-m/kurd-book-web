'use client';

import { Palette, Globe, BookOpen, Smartphone, Monitor, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LibraryFeatures() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Palette className="w-10 h-10 text-rose-500" />,
      title: t('features.aesthetics') || "Aesthetics",
      description: t('features.aestheticsDesc') || "Designed to suit all tastes, with care taken in arrangement and presentation."
    },
    {
      icon: <Globe className="w-10 h-10 text-blue-500" />,
      title: t('features.diversity') || "Diversity",
      description: t('features.diversityDesc') || "A comprehensive portal containing all sciences and constantly adding new collections."
    },
    {
      icon: <BookOpen className="w-10 h-10 text-amber-500" />,
      title: t('features.originality') || "Originality",
      description: t('features.originalityDesc') || "Combines the richness of heritage with contemporary books and messages."
    },
    {
      icon: <Smartphone className="w-10 h-10 text-purple-500" />,
      title: t('features.platforms') || "Multi-Platform",
      description: t('features.platformsDesc') || "Browse from any device: Windows, Mac, Android, and iOS systems."
    },
    {
      icon: <Monitor className="w-10 h-10 text-emerald-500" />,
      title: t('features.digital') || "Digital Library",
      description: t('features.digitalDesc') || "Read the textbook version and easily view the original picture book."
    },
    {
      icon: <Zap className="w-10 h-10 text-orange-500" />,
      title: t('features.fast') || "Fast & Precise",
      description: t('features.fastDesc') || "Fast and accurate search engine for content, books, and authors."
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif mb-4">
            {t('features.title') || "Project Advantages"}
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
