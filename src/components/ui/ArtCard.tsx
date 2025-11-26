'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArtProduct, Artisan } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';
import { artisans } from '@/data/arts';

interface ArtCardProps {
  product: ArtProduct;
}

export default function ArtCard({ product }: ArtCardProps) {
  const { currentLanguage, t } = useLanguage();
  
  // Find the artisan for this product
  const artisan = artisans.find(a => a.id === product.artisanId);
  
  const title = currentLanguage === 'ku' ? product.title.ku : 
                currentLanguage === 'kmr' ? product.title.kmr : product.title.en;
                
  const artisanName = artisan ? (currentLanguage === 'ku' ? artisan.name : (artisan.latinName || artisan.name)) : '';

  return (
    <Link href={`/arts/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4">
        {/* Image Placeholder - In real app use Next/Image with actual src */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200 dark:bg-gray-700 group-hover:scale-105 transition-transform duration-500">
           {/* Replace with actual Image component when you have images */}
           <span className="text-4xl">🎨</span>
        </div>
        
        {product.isHandmade && (
          <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider text-gray-900 dark:text-white shadow-sm">
            Handmade
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-serif text-gray-900 dark:text-white group-hover:text-[#e11d48] transition-colors">
          {title}
        </h3>
        {artisan && (
          <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
            {t('book.by')} <span className="font-medium text-gray-700 dark:text-gray-300">{artisanName}</span>
          </p>
        )}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}
