'use client';

import { books } from '@/data/books';
import { Book } from '@/lib/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import BookCard from '@/components/ui/BookCard';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  
  const book = books.find(b => b.id === params.id);
  // const author = authors.find(a => a.name === book?.author);
  
  if (!book) {
    notFound();
  }

  const discountPercentage = book.originalPrice 
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : 0;

  const relatedBooks = books.filter(b => 
    b.category === book.category && b.id !== book.id
  ).slice(0, 4);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <span>{t('nav.home')}</span>
          <span className="mx-2">←</span>
          <span>{t('nav.books')}</span>
          <span className="mx-2">←</span>
          <span className="text-gray-900">{book.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-8 mb-8">
          {/* Book Image */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-8xl text-gray-400">📚</div>
              
              {/* Badges */}
              <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 flex flex-col space-y-2">
                {book.newRelease && (
                  <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                    نوێ
                  </span>
                )}
                {book.bestseller && (
                  <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                    باشترین
                  </span>
                )}
                {book.featured && (
                  <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                    تایبەت
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    -{discountPercentage}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-blue-600 mb-1">{t('book.by')} {book.author}</p>
              <p className="text-gray-600">{t('book.publisher')} {book.publisher}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">
                {book.rating} ({book.reviewCount} {t('book.reviews')})
              </span>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                <span className="text-3xl font-bold text-blue-600">
                  {formatPrice(book.price)}
                </span>
                {book.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(book.originalPrice)}
                  </span>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center mb-4">
                {book.inStock ? (
                  <span className="text-green-600 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></div>
                    {t('status.available')}
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></div>
                    {t('status.unavailable')}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <label className="text-gray-700">{t('book.quantity')}</label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4 rtl:space-x-reverse">
                <button
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                    book.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!book.inStock}
                >
                  🛒 {t('book.addToCart')}
                </button>
                <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  ❤️
                </button>
              </div>

              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  book.inStock
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!book.inStock}
              >
                {t('book.buyNow')}
              </button>
            </div>

            {/* Book Info */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <div>
                <span className="font-semibold">ISBN:</span> {book.isbn}
              </div>
              <div>
                <span className="font-semibold">{t('book.pages')}</span> {book.pages}
              </div>
              <div>
                <span className="font-semibold">{t('book.language')}</span> {book.language === 'kurdish' ? 'کوردی' : book.language}
              </div>
              <div>
                <span className="font-semibold">{t('book.publishDate')}</span> {book.publishedDate}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 rtl:space-x-reverse px-8">
              {[
                { id: 'description', label: t('book.description') },
                { id: 'author', label: t('book.author') },
                { id: 'reviews', label: t('book.reviews') },
                { id: 'details', label: t('book.moreInfo') }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {selectedTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {book.description}
                </p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">{t('book.tags')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {book.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'author' && (
              <div className="flex space-x-6 rtl:space-x-reverse">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{book.author}</h3>
                  <p className="text-gray-700 mb-2">Author information coming soon...</p>
                </div>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold mb-2">نرخاندنەکان</h3>
                  <p className="text-gray-600">زوو نرخاندنەکان زیاد دەکرێن</p>
                </div>
              </div>
            )}

            {selectedTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg mb-4">زانیاری تەکنیکی</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ISBN:</span>
                      <span>{book.isbn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ژمارەی لاپەڕە:</span>
                      <span>{book.pages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">زمان:</span>
                      <span>{book.language === 'kurdish' ? 'کوردی' : book.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ناشر:</span>
                      <span>{book.publisher}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">بەرواری بڵاوکردنەوە:</span>
                      <span>{new Date(book.publishedDate).toLocaleDateString('ku')}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-4">{t('book.category')}</h4>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {book.category}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('book.relatedBooks')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook) => (
                <div key={relatedBook.id} className="text-center">
                  <div className="aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                    <div className="text-4xl text-gray-400">📚</div>
                  </div>
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">{relatedBook.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{relatedBook.author}</p>
                  <p className="text-sm font-bold text-blue-600">
                    {formatPrice(relatedBook.price)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}