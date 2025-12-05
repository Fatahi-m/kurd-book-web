'use client';

import { useState } from 'react';
import { artProducts } from '@/data/arts';
import ArtCard from '@/components/ui/ArtCard';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ArtsPage() {
  const { t, currentLanguage } = useLanguage();
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: { ku: 'هەموو', en: 'All', kmr: 'Hemû' } },
    { id: 'textile', label: { ku: 'چنین و قوماش', en: 'Textiles', kmr: 'Tekstîl' } },
    { id: 'woodwork', label: { ku: 'دارتاشی', en: 'Woodwork', kmr: 'Karên Darîn' } },
    { id: 'jewelry', label: { ku: 'زیورآلات', en: 'Jewelry', kmr: 'Zêr û Zîv' } },
    { id: 'pottery', label: { ku: 'گۆزەگەری', en: 'Pottery', kmr: 'Kûzvanî' } },
  ];

  const filteredProducts = filter === 'all' 
    ? artProducts 
    : artProducts.filter(p => p.category === filter);

  return (
    <main className="min-h-screen bg-slate-50 transition-colors duration-500">
      {/* Hero Section */}
      <div className="relative bg-[#e11d48] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold tracking-widest uppercase mb-6">
            Kurdish Heritage
          </span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            Arts & Culture
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-white/90">
            Discover unique handmade treasures from skilled Kurdish artisans. 
            Every piece tells a story.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat.id
                  ? 'bg-gray-900 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {currentLanguage === 'ku' ? cat.label.ku : currentLanguage === 'kmr' ? cat.label.kmr : cat.label.en}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ArtCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
