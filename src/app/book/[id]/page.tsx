'use client';

import { Book } from '@/lib/types';
import { bookService } from '@/lib/bookService';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import BookCard from '@/components/ui/BookCard';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { t, currentLanguage } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    const foundBook = bookService.getBookById(params.id);
    if (!foundBook) {
      notFound();
      return;
    }
    
    setBook(foundBook);
    
    // Get related books
    const related = bookService.getBooksByCategory(foundBook.category)
      .filter(b => b.id !== foundBook.id)
      .slice(0, 4);
    setRelatedBooks(related);
  }, [params.id]);
  
  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const discountPercentage = book.originalPrice 
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : 0;
    
  const handleAddToCart = () => {
    if (book.inStock) {
      addToCart(book, quantity);
    }
  };
  
  const handleWishlistToggle = () => {
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        originalPrice: book.originalPrice,
        imageUrl: book.coverUrl || book.image,
        inStock: book.inStock
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6 px-2">
          <span>{t('nav.home')}</span>
          <span className="mx-1 md:mx-2">←</span>
          <span>{t('nav.books')}</span>
          <span className="mx-1 md:mx-2">←</span>
          <span className="text-gray-900 truncate">{book.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 bg-white rounded-lg shadow-lg p-4 md:p-8 mb-4 md:mb-8">
          {/* Book Image */}
          <div className="space-y-2 md:space-y-4">
            <div className="aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden mx-auto max-w-sm lg:max-w-none">
              {book.coverUrl || book.image ? (
                <Image
                  src={book.coverUrl || book.image || '/images/default-book-cover.jpg'}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="text-8xl text-gray-400">📚</div>
              )}
              
              {/* Badges */}
              <div className="absolute top-2 right-2 md:top-4 md:right-4 rtl:right-auto rtl:left-2 md:rtl:left-4 flex flex-col space-y-1 md:space-y-2">
                {book.newRelease && (
                  <span className="bg-green-500 text-white text-[10px] md:text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                    نوێ
                  </span>
                )}
                {book.bestseller && (
                  <span className="bg-orange-500 text-white text-[10px] md:text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                    باشترین
                  </span>
                )}
                {book.featured && (
                  <span className="bg-blue-500 text-white text-[10px] md:text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                    تایبەت
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-red-500 text-white text-[10px] md:text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                    -{discountPercentage}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {currentLanguage === 'ku' && book.titleKu ? book.titleKu : 
                 currentLanguage === 'en' && book.titleEn ? book.titleEn :
                 currentLanguage === 'de' && book.titleDe ? book.titleDe :
                 book.title}
              </h1>
              <p className="text-base md:text-xl text-blue-600 mb-1">
                {currentLanguage === 'ku' ? 'نووسەر' : currentLanguage === 'en' ? 'by' : 'von'}: {' '}
                {currentLanguage === 'ku' && book.authorKu ? book.authorKu : 
                 currentLanguage === 'en' && book.authorEn ? book.authorEn :
                 currentLanguage === 'de' && book.authorDe ? book.authorDe :
                 book.author}
              </p>
              <p className="text-sm md:text-base text-gray-600">
                {currentLanguage === 'ku' ? 'چاپخانە' : currentLanguage === 'en' ? 'Publisher' : 'Verlag'}: {' '}
                {currentLanguage === 'ku' && book.publisherKu ? book.publisherKu : 
                 currentLanguage === 'en' && book.publisherEn ? book.publisherEn :
                 currentLanguage === 'de' && book.publisherDe ? book.publisherDe :
                 book.publisher}
              </p>
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
            <div className="border-t border-b border-gray-200 py-3 md:py-4">
              <div className="flex items-center space-x-2 md:space-x-4 rtl:space-x-reverse mb-3 md:mb-4">
                <span className="text-2xl md:text-3xl font-bold text-blue-600">
                  {formatPrice(book.price)}
                </span>
                {book.originalPrice && (
                  <span className="text-lg md:text-xl text-gray-500 line-through">
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

              <div className="flex space-x-2 md:space-x-4 rtl:space-x-reverse">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-2.5 md:py-3 px-3 md:px-4 rounded-lg font-semibold transition-colors text-sm md:text-base ${
                    book.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!book.inStock}
                >
                  <span className="flex items-center justify-center">
                    🛒 <span className="ml-1 rtl:ml-0 rtl:mr-1 hidden sm:inline">{currentLanguage === 'ku' ? 'بۆ سەبەت زیادبکە' : currentLanguage === 'en' ? 'Add to Cart' : 'In Warenkorb'}</span>
                    <span className="ml-1 rtl:ml-0 rtl:mr-1 sm:hidden">{currentLanguage === 'ku' ? 'سەبەت' : currentLanguage === 'en' ? 'Cart' : 'Korb'}</span>
                  </span>
                </button>
                <button 
                  onClick={handleWishlistToggle}
                  className={`px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${
                    isInWishlist(book.id) ? 'text-red-500 border-red-300 bg-red-50' : ''
                  }`}
                >
                  {isInWishlist(book.id) ? '❤️' : '🤍'}
                </button>
              </div>

              <button
                onClick={() => {
                  if (book.inStock) {
                    handleAddToCart();
                    // Navigate to cart or checkout
                    window.location.href = '/cart';
                  }
                }}
                className={`w-full py-2.5 md:py-3 px-3 md:px-4 rounded-lg font-semibold transition-colors text-sm md:text-base ${
                  book.inStock
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!book.inStock}
              >
                {currentLanguage === 'ku' ? 'ئێستا بیکڕە' : currentLanguage === 'en' ? 'Buy Now' : 'Jetzt kaufen'}
              </button>
            </div>

            {/* Book Info */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <div>
                <span className="font-semibold">ISBN:</span> {book.isbn || 'نادیار'}
              </div>
              <div>
                <span className="font-semibold">{currentLanguage === 'ku' ? 'لاپەڕە' : currentLanguage === 'en' ? 'Pages' : 'Seiten'}:</span> {book.pages || 'نادیار'}
              </div>
              <div>
                <span className="font-semibold">{currentLanguage === 'ku' ? 'زمان' : currentLanguage === 'en' ? 'Language' : 'Sprache'}:</span> {book.language === 'kurdish' ? 'کوردی' : book.language}
              </div>
              <div>
                <span className="font-semibold">{currentLanguage === 'ku' ? 'بەرواری چاپ' : currentLanguage === 'en' ? 'Publish Date' : 'Veröffentlichungsdatum'}:</span> {book.publishedDate || 'نادیار'}
              </div>
              {book.translator && (
                <div className="col-span-2">
                  <span className="font-semibold">{currentLanguage === 'ku' ? 'وەرگێڕ' : currentLanguage === 'en' ? 'Translator' : 'Übersetzer'}:</span> {book.translator}
                </div>
              )}
              {(book.inventoryCount !== undefined) && (
                <div>
                  <span className="font-semibold">{currentLanguage === 'ku' ? 'موجودی' : currentLanguage === 'en' ? 'In Stock' : 'Verfügbar'}:</span> {book.inventoryCount}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-4 md:mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-2 md:space-x-8 rtl:space-x-reverse px-2 md:px-8 overflow-x-auto">
              {[
                { id: 'description', label: t('book.description') },
                { id: 'author', label: t('book.author') },
                { id: 'reviews', label: t('book.reviews') },
                { id: 'details', label: t('book.moreInfo') }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-3 md:py-4 px-2 md:px-2 border-b-2 font-medium text-xs md:text-sm whitespace-nowrap ${
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

          <div className="p-4 md:p-8">
            {selectedTab === 'description' && (
              <div className="prose max-w-none">
                <div className="space-y-4">
                  {/* Multi-language descriptions */}
                  {currentLanguage === 'ku' && (book.descriptionKu || book.description) && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-800">پێناسە (کوردی)</h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {book.descriptionKu || book.description}
                      </p>
                    </div>
                  )}
                  {currentLanguage === 'en' && (book.descriptionEn || book.description) && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-800">Description (English)</h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {book.descriptionEn || book.description}
                      </p>
                    </div>
                  )}
                  {currentLanguage === 'de' && (book.descriptionDe || book.description) && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-800">Beschreibung (Deutsch)</h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {book.descriptionDe || book.description}
                      </p>
                    </div>
                  )}
                  
                  {/* Fallback if no description in selected language */}
                  {!book.descriptionKu && !book.descriptionEn && !book.descriptionDe && !book.description && (
                    <p className="text-gray-500 italic">
                      {currentLanguage === 'ku' ? 'پێناسە بەردەست نییە' : currentLanguage === 'en' ? 'No description available' : 'Keine Beschreibung verfügbar'}
                    </p>
                  )}
                </div>
                
                {book.tags && book.tags.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">{currentLanguage === 'ku' ? 'تاگەکان' : currentLanguage === 'en' ? 'Tags' : 'Tags'}</h4>
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
                )}
              </div>
            )}

            {selectedTab === 'author' && (
              <div className="flex space-x-6 rtl:space-x-reverse">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <div className="space-y-3">
                    {/* Multi-language author names */}
                    {book.authorKu && (
                      <div>
                        <span className="text-sm text-gray-600">کوردی:</span>
                        <h3 className="text-xl font-semibold">{book.authorKu}</h3>
                      </div>
                    )}
                    {book.authorEn && (
                      <div>
                        <span className="text-sm text-gray-600">English:</span>
                        <h3 className="text-lg font-medium">{book.authorEn}</h3>
                      </div>
                    )}
                    {book.authorDe && (
                      <div>
                        <span className="text-sm text-gray-600">Deutsch:</span>
                        <h3 className="text-lg font-medium">{book.authorDe}</h3>
                      </div>
                    )}
                    {!book.authorKu && !book.authorEn && !book.authorDe && (
                      <h3 className="text-xl font-semibold mb-2">{book.author}</h3>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2 mt-4">
                    {currentLanguage === 'ku' ? 'زانیاری نووسەر زوو زیاد دەکرێت...' : currentLanguage === 'en' ? 'Author information coming soon...' : 'Autorinformationen folgen bald...'}
                  </p>
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
                  <h4 className="font-semibold text-lg mb-4">
                    {currentLanguage === 'ku' ? 'زانیاری تەکنیکی' : currentLanguage === 'en' ? 'Technical Information' : 'Technische Informationen'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ISBN:</span>
                      <span>{book.isbn || 'نادیار'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{currentLanguage === 'ku' ? 'ژمارەی لاپەڕە' : currentLanguage === 'en' ? 'Pages' : 'Seiten'}:</span>
                      <span>{book.pages || 'نادیار'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{currentLanguage === 'ku' ? 'زمان' : currentLanguage === 'en' ? 'Language' : 'Sprache'}:</span>
                      <span>{book.language === 'kurdish' ? 'کوردی' : book.language}</span>
                    </div>
                    {book.translator && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">{currentLanguage === 'ku' ? 'وەرگێڕ' : currentLanguage === 'en' ? 'Translator' : 'Übersetzer'}:</span>
                        <span>{book.translator}</span>
                      </div>
                    )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">{currentLanguage === 'ku' ? 'بەرواری بڵاوکردنەوە' : currentLanguage === 'en' ? 'Publish Date' : 'Veröffentlichungsdatum'}:</span>
                        <span>{book.publishedDate || 'نادیار'}</span>
                      </div>
                    {book.inventoryCount !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">{currentLanguage === 'ku' ? 'موجودی' : currentLanguage === 'en' ? 'Stock' : 'Lagerbestand'}:</span>
                        <span className={book.inventoryCount > 0 ? 'text-green-600' : 'text-red-600'}>
                          {book.inventoryCount > 0 ? `${book.inventoryCount} ${currentLanguage === 'ku' ? 'دانە' : currentLanguage === 'en' ? 'items' : 'Stück'}` : (currentLanguage === 'ku' ? 'موجود نییە' : currentLanguage === 'en' ? 'Out of stock' : 'Nicht verfügbar')}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Multi-language publisher info */}
                  <div className="mt-6">
                    <h5 className="font-semibold mb-2">{currentLanguage === 'ku' ? 'چاپخانە' : currentLanguage === 'en' ? 'Publisher' : 'Verlag'}</h5>
                    <div className="space-y-1 text-sm">
                      {book.publisherKu && <div><span className="text-gray-600">کوردی:</span> {book.publisherKu}</div>}
                      {book.publisherEn && <div><span className="text-gray-600">English:</span> {book.publisherEn}</div>}
                      {book.publisherDe && <div><span className="text-gray-600">Deutsch:</span> {book.publisherDe}</div>}
                      {!book.publisherKu && !book.publisherEn && !book.publisherDe && <div>{book.publisher}</div>}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-4">{currentLanguage === 'ku' ? 'پۆل' : currentLanguage === 'en' ? 'Category' : 'Kategorie'}</h4>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {book.category}
                  </span>
                  
                  {/* Status indicators */}
                  <div className="mt-6">
                    <h5 className="font-semibold mb-2">{currentLanguage === 'ku' ? 'دۆخ' : currentLanguage === 'en' ? 'Status' : 'Status'}</h5>
                    <div className="space-y-2">
                      {book.featured && (
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-2 rtl:mr-0 rtl:ml-2">
                          {currentLanguage === 'ku' ? 'تایبەت' : currentLanguage === 'en' ? 'Featured' : 'Empfohlen'}
                        </span>
                      )}
                      {book.bestseller && (
                        <span className="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs mr-2 rtl:mr-0 rtl:ml-2">
                          {currentLanguage === 'ku' ? 'باشترین' : currentLanguage === 'en' ? 'Bestseller' : 'Bestseller'}
                        </span>
                      )}
                      {book.newRelease && (
                        <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          {currentLanguage === 'ku' ? 'نوێ' : currentLanguage === 'en' ? 'New' : 'Neu'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
              {currentLanguage === 'ku' ? 'کتابە پەیوەندیدارەکان' : currentLanguage === 'en' ? 'Related Books' : 'Ähnliche Bücher'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {relatedBooks.map((relatedBook) => (
                <BookCard key={relatedBook.id} book={relatedBook} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}