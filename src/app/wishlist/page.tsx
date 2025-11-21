'use client';

import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingCart } from 'lucide-react';

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { currentLanguage, t } = useLanguage();

  const handleAddToCart = (item: any) => {
    const bookData = {
      id: item.id,
      title: item.title,
      author: item.author,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.imageUrl,
      coverUrl: item.imageUrl,
      inStock: item.inStock,
      rating: 0,
      reviewCount: 0,
      publisher: '',
      description: '',
      pages: 0,
      language: 'kurdish',
      category: '',
      tags: [],
      isbn: '',
      publishDate: '',
      featured: false,
      bestseller: false,
      newRelease: false,
      inventoryCount: 1
    };
    
    addToCart(bookData, 1);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center">
              {currentLanguage === 'ku' ? 'علاقەمەندییەکانت' : currentLanguage === 'en' ? 'Your Wishlist' : 'Deine Wunschliste'}
            </h1>
            
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mb-6">
                <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                  {currentLanguage === 'ku' ? 'علاقەمەندییەکانت بەتاڵە' : currentLanguage === 'en' ? 'Your wishlist is empty' : 'Deine Wunschliste ist leer'}
                </h2>
                <p className="text-gray-500 mb-6">
                  {currentLanguage === 'ku' ? 'کتابەکانی دڵخوازت زیاد بکە بۆ دواتر' : currentLanguage === 'en' ? 'Add your favorite books to save them for later' : 'Füge deine Lieblingsbücher hinzu, um sie für später zu speichern'}
                </p>
              </div>
              
              <Link 
                href="/books"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {currentLanguage === 'ku' ? 'گەڕان بۆ کتابەکان' : currentLanguage === 'en' ? 'Browse Books' : 'Bücher durchsuchen'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              {currentLanguage === 'ku' ? 'علاقەمەندییەکانت' : currentLanguage === 'en' ? 'Your Wishlist' : 'Deine Wunschliste'}
              <span className="text-sm sm:text-base md:text-lg font-normal text-gray-600 mr-2 rtl:mr-0 rtl:ml-2">
                ({items.length} {currentLanguage === 'ku' ? 'کتاب' : currentLanguage === 'en' ? 'items' : 'Artikel'})
              </span>
            </h1>
            
            {items.length > 0 && (
              <button
                onClick={() => {
                  if (confirm(currentLanguage === 'ku' ? 'دەتەوێت هەموو علاقەمەندییەکان بسڕیتەوە؟' : currentLanguage === 'en' ? 'Are you sure you want to clear your wishlist?' : 'Möchtest du deine Wunschliste leeren?')) {
                    clearWishlist();
                  }
                }}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                {currentLanguage === 'ku' ? 'سڕینەوەی هەموو' : currentLanguage === 'en' ? 'Clear All' : 'Alle löschen'}
              </button>
            )}
          </div>

          {/* Wishlist Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  {/* Book Image */}
                  <Link href={`/book/${item.id}`} className="flex-shrink-0">
                    <div className="w-20 h-28 bg-gray-200 rounded-lg overflow-hidden">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          width={80}
                          height={112}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          📚
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Book Details */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/book/${item.id}`}>
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors truncate">
                        {item.title}
                      </h3>
                    </Link>
                    
                    <Link href={`/author/${item.author}`}>
                      <p className="text-gray-600 hover:text-blue-600 transition-colors mb-2">
                        {item.author}
                      </p>
                    </Link>

                    {/* Price */}
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                      <span className="text-xl font-bold text-blue-600">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center mb-4">
                      {item.inStock ? (
                        <span className="text-sm text-green-600 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></div>
                          {currentLanguage === 'ku' ? 'بەردەستە' : currentLanguage === 'en' ? 'In Stock' : 'Auf Lager'}
                        </span>
                      ) : (
                        <span className="text-sm text-red-600 flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></div>
                          {currentLanguage === 'ku' ? 'موجود نییە' : currentLanguage === 'en' ? 'Out of Stock' : 'Nicht verfügbar'}
                        </span>
                      )}
                    </div>

                    {/* Added Date */}
                    <p className="text-xs text-gray-400">
                      {currentLanguage === 'ku' ? 'زیادکراوە لە' : currentLanguage === 'en' ? 'Added on' : 'Hinzugefügt am'}: {' '}
                      {new Date(item.addedAt).toLocaleDateString(
                        currentLanguage === 'ku' ? 'ku-IQ' : currentLanguage === 'en' ? 'en-US' : 'de-DE'
                      )}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                        item.inStock
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart size={16} className="mr-2 rtl:mr-0 rtl:ml-2" />
                      {currentLanguage === 'ku' ? 'بۆ سەبەت' : currentLanguage === 'en' ? 'Add to Cart' : 'In Warenkorb'}
                    </button>
                    
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="flex items-center px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} className="mr-2 rtl:mr-0 rtl:ml-2" />
                      {currentLanguage === 'ku' ? 'سڕینەوە' : currentLanguage === 'en' ? 'Remove' : 'Entfernen'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="mt-8 text-center">
            <Link 
              href="/books"
              className="inline-flex items-center px-6 py-3 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              {currentLanguage === 'ku' ? 'بەردەوامبوون لە گەڕان' : currentLanguage === 'en' ? 'Continue Shopping' : 'Weiter einkaufen'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}