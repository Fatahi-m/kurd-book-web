'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { artProducts, artisans } from '@/data/arts';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, ArrowRight, MapPin } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function ArtProductPage() {
  const { id } = useParams();
  const { t, currentLanguage } = useLanguage();
  const { addToCart } = useCart();

  const product = artProducts.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0f172a]">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Product Not Found</h1>
          <Link href="/arts" className="text-[#e11d48] hover:underline">Back to Arts</Link>
        </div>
      </div>
    );
  }

  const artisan = artisans.find(a => a.id === product.artisanId);
  
  const title = currentLanguage === 'ku' ? product.title.ku : 
                currentLanguage === 'kmr' ? product.title.kmr : product.title.en;
  
  const description = currentLanguage === 'ku' ? product.description.ku : 
                      currentLanguage === 'kmr' ? product.description.kmr : product.description.en;

  const artisanName = artisan ? (currentLanguage === 'ku' ? artisan.name : (artisan.latinName || artisan.name)) : '';
  const artisanBio = artisan ? (currentLanguage === 'ku' ? artisan.bio.ku : (currentLanguage === 'kmr' ? artisan.bio.kmr : artisan.bio.en)) : '';

  // Mock adding to cart - in real app, map ArtProduct to CartItem structure
  const handleAddToCart = () => {
    // This is a placeholder. You might need to adjust your CartContext to accept ArtProducts
    // or map ArtProduct to a compatible structure.
    alert('Added to cart! (Functionality to be fully integrated)');
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0f172a] py-12 transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link href="/" className="hover:text-[#e11d48]">Home</Link>
          <span>/</span>
          <Link href="/arts" className="hover:text-[#e11d48]">Arts & Culture</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">{title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden relative">
               {/* Replace with actual Image */}
               <div className="absolute inset-0 flex items-center justify-center text-6xl">🎨</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:ring-2 ring-[#e11d48] transition-all"></div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2">
              <span className="text-[#e11d48] font-bold tracking-widest text-xs uppercase">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-4 leading-tight">
              {title}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.inStock ? (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase tracking-wider">
                  In Stock
                </span>
              ) : (
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full uppercase tracking-wider">
                  Out of Stock
                </span>
              )}
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {description}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-6 mb-10 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
              <div>
                <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Materials</span>
                <span className="font-medium text-gray-900 dark:text-white">{product.materials.join(', ')}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Dimensions</span>
                <span className="font-medium text-gray-900 dark:text-white">{product.dimensions}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Weight</span>
                <span className="font-medium text-gray-900 dark:text-white">{product.weight}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Creation Time</span>
                <span className="font-medium text-gray-900 dark:text-white">{product.creationTime}</span>
              </div>
            </div>

            <div className="flex gap-4 mb-16">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#e11d48] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#be123c] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            {/* Meet the Artisan Section */}
            {artisan && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-10">
                <h3 className="text-2xl font-serif mb-6 text-gray-900 dark:text-white">Meet the Artisan</h3>
                <div className="flex flex-col md:flex-row gap-6 items-start bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {/* Replace with actual Image */}
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-300 text-gray-500">👤</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">{artisanName}</h4>
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{artisan.location.city}, {artisan.location.country}</span>
                        </div>
                      </div>
                      <Link 
                        href={`/artisan/${artisan.id}`}
                        className="text-sm font-bold text-[#e11d48] hover:underline flex items-center gap-1"
                      >
                        View Profile <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      {artisanBio}
                    </p>
                    <div className="flex gap-2">
                      {artisan.specialty.map(spec => (
                        <span key={spec} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
