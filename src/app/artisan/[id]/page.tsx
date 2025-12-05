'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { artisans, artProducts } from '@/data/arts';
import { useLanguage } from '@/contexts/LanguageContext';
import ArtCard from '@/components/ui/ArtCard';
import { MapPin, Award } from 'lucide-react';

export default function ArtisanProfilePage() {
  const { id } = useParams();
  const { t, currentLanguage } = useLanguage();

  const artisan = artisans.find(a => a.id === id);

  if (!artisan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Artisan Not Found</h1>
          <Link href="/arts" className="text-[#e11d48] hover:underline">Back to Arts</Link>
        </div>
      </div>
    );
  }

  const artisanProducts = artProducts.filter(p => p.artisanId === artisan.id);
  
  const name = currentLanguage === 'ku' ? artisan.name : (artisan.latinName || artisan.name);
  const bio = currentLanguage === 'ku' ? artisan.bio.ku : (currentLanguage === 'kmr' ? artisan.bio.kmr : artisan.bio.en);
  const story = artisan.story ? (currentLanguage === 'ku' ? artisan.story.ku : (currentLanguage === 'kmr' ? artisan.story.kmr : artisan.story.en)) : bio;

  return (
    <main className="min-h-screen bg-slate-50 transition-colors duration-500">
      {/* Hero / Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0 bg-gray-200">
               {/* Replace with actual Image */}
               <div className="w-full h-full flex items-center justify-center text-6xl bg-gray-300 text-gray-500">👤</div>
            </div>
            
            <div className="text-center md:text-left rtl:md:text-right flex-1">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-2">
                    {name}
                  </h1>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{artisan.location.city}, {artisan.location.country}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {artisan.specialty.map(spec => (
                    <span key={spec} className="px-4 py-2 bg-[#e11d48]/10 text-[#e11d48] rounded-full text-sm font-bold uppercase tracking-wider">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="max-w-3xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2 justify-center md:justify-start">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Master Artisan
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {story}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-serif text-gray-900 mb-10 text-center md:text-left rtl:md:text-right">
          Creations by {name}
        </h2>
        
        {artisanProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {artisanProducts.map(product => (
              <ArtCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-xl text-gray-500">
              No products available at the moment.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
