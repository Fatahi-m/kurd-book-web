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
import { useReviews } from '@/contexts/ReviewContext';
import { useAuth } from '@/contexts/AuthContext';
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
  const { addReview, getReviewsByBookId, getAverageRating, getReviewCount } = useReviews();
  const { user } = useAuth();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [sidebarBooks, setSidebarBooks] = useState<Book[]>([]);

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  
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
  
  useEffect(() => {
    const allBooks = bookService.getAllBooks();
    setSidebarBooks(allBooks.filter(b => b.rating >= 4.5).slice(0, 3));
  }, []);
  
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

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      // Prompt user to login
      alert(currentLanguage === 'ku' ? 'تکایە سەرەتا بچۆ ژوورەوە' : 'Please login to review');
      return;
    }
    
    if (!book) return;
    
    addReview(book.id, {
      userName: `${user.firstName} ${user.lastName}`,
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment
    });
    
    // Reset review form
    setReviewRating(5);
    setReviewTitle('');
    setReviewComment('');
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 md:py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-6 px-2">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">{t('nav.home')}</Link>
          <span className="mx-1 md:mx-2">←</span>
          <Link href="/books" className="hover:text-blue-600 dark:hover:text-blue-400">{t('nav.books')}</Link>
          <span className="mx-1 md:mx-2">←</span>
          <span className="text-gray-900 dark:text-white truncate">{book.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 transition-colors duration-300">
          {/* Book Image */}
          <div className="md:col-span-1">
            <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden mx-auto max-w-[280px] shadow-sm">
              {book.coverUrl || book.image ? (
                <Image
                  src={book.coverUrl || book.image || '/images/default-book-cover.jpg'}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="text-6xl text-gray-400">📚</div>
              )}
              
              {/* Badges */}
              <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 flex flex-col space-y-1">
                {book.newRelease && (
                  <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    نوێ
                  </span>
                )}
                {book.bestseller && (
                  <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    باشترین
                  </span>
                )}
                {book.featured && (
                  <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    تایبەت
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    -{discountPercentage}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                {currentLanguage === 'ku' && book.titleKu ? book.titleKu : 
                 currentLanguage === 'en' && book.titleEn ? book.titleEn :
                 currentLanguage === 'de' && book.titleDe ? book.titleDe :
                 book.title}
              </h1>
              <p className="text-base text-blue-600 dark:text-blue-400 mb-1">
                {currentLanguage === 'ku' ? 'نووسەر' : currentLanguage === 'en' ? 'by' : 'von'}: {' '}
                {currentLanguage === 'ku' && book.authorKu ? book.authorKu : 
                 currentLanguage === 'en' && book.authorEn ? book.authorEn :
                 currentLanguage === 'de' && book.authorDe ? book.authorDe :
                 book.author}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
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
                    className={`w-4 h-4 ${
                      i < Math.floor(getAverageRating(book.id) || book.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {getAverageRating(book.id) || book.rating} ({getReviewCount(book.id) || book.reviewCount} {t('book.reviews')})
              </span>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatPrice(book.price)}
                </span>
                {book.originalPrice && (
                  <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                    {formatPrice(book.originalPrice)}
                  </span>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center mb-4">
                {book.inStock ? (
                  <span className="text-sm text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></div>
                    {t('status.available')}
                  </span>
                ) : (
                  <span className="text-sm text-red-600 flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></div>
                    {t('status.unavailable')}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-3 max-w-md">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <label className="text-sm text-gray-700 dark:text-gray-300">{t('book.quantity')}</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md h-9">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 hover:bg-gray-100 dark:hover:bg-gray-700 h-full text-gray-600 dark:text-gray-300"
                  >
                    -
                  </button>
                  <span className="px-3 border-x border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 hover:bg-gray-100 dark:hover:bg-gray-700 h-full text-gray-600 dark:text-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-2 rtl:space-x-reverse">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors text-sm ${
                    book.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
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
                  className={`px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    isInWishlist(book.id) ? 'text-red-500 border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800' : 'text-gray-600 dark:text-gray-300'
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
                className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors text-sm ${
                  book.inStock
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
                disabled={!book.inStock}
              >
                {currentLanguage === 'ku' ? 'ئێستا بیکڕە' : currentLanguage === 'en' ? 'Buy Now' : 'Jetzt kaufen'}
              </button>
            </div>

            {/* Book Info */}
            <div className="grid grid-cols-2 gap-3 text-xs md:text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg mt-4">
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-200">ISBN:</span> {book.isbn || 'نادیار'}
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-200">{currentLanguage === 'ku' ? 'لاپەڕە' : currentLanguage === 'en' ? 'Pages' : 'Seiten'}:</span> {book.pages || 'نادیار'}
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-200">{currentLanguage === 'ku' ? 'زمان' : currentLanguage === 'en' ? 'Language' : 'Sprache'}:</span> {book.language === 'kurdish' ? 'کوردی' : book.language}
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-200">{currentLanguage === 'ku' ? 'بەرواری چاپ' : currentLanguage === 'en' ? 'Publish Date' : 'Veröffentlichungsdatum'}:</span> {book.publishedDate || 'نادیار'}
              </div>
              {book.translator && (
                <div className="col-span-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-200">{currentLanguage === 'ku' ? 'وەرگێڕ' : currentLanguage === 'en' ? 'Translator' : 'Übersetzer'}:</span> {book.translator}
                </div>
              )}
              {(book.inventoryCount !== undefined) && (
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-200">{currentLanguage === 'ku' ? 'موجودی' : currentLanguage === 'en' ? 'In Stock' : 'Verfügbar'}:</span> {book.inventoryCount}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-4 md:mb-8 transition-colors duration-300">
          <div className="border-b border-gray-200 dark:border-gray-700">
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
                  className={`py-3 md:py-4 px-2 md:px-2 border-b-2 font-medium text-xs md:text-sm whitespace-nowrap transition-colors ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 md:p-8">
            {selectedTab === 'description' && (
              <div className="prose dark:prose-invert max-w-none">
                <div className="space-y-4">
                  {/* Multi-language descriptions */}
                  {currentLanguage === 'ku' && (book.descriptionKu || book.description) && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">پێناسە (کوردی)</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {book.descriptionKu || book.description}
                      </p>
                    </div>
                  )}
                  {currentLanguage === 'en' && (book.descriptionEn || book.description) && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Description (English)</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {book.descriptionEn || book.description}
                      </p>
                    </div>
                  )}
                  {currentLanguage === 'de' && (book.descriptionDe || book.description) && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Beschreibung (Deutsch)</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {book.descriptionDe || book.description}
                      </p>
                    </div>
                  )}
                  
                  {/* Fallback if no description in selected language */}
                  {!book.descriptionKu && !book.descriptionEn && !book.descriptionDe && !book.description && (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      {currentLanguage === 'ku' ? 'پێناسە بەردەست نییە' : currentLanguage === 'en' ? 'No description available' : 'Keine Beschreibung verfügbar'}
                    </p>
                  )}
                </div>
                
                {book.tags && book.tags.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">{currentLanguage === 'ku' ? 'تاگەکان' : currentLanguage === 'en' ? 'Tags' : 'Tags'}</h4>
                    <div className="flex flex-wrap gap-2">
                      {book.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
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
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <div className="space-y-3">
                    {/* Multi-language author names */}
                    {book.authorKu && (
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">کوردی:</span>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{book.authorKu}</h3>
                      </div>
                    )}
                    {book.authorEn && (
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">English:</span>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{book.authorEn}</h3>
                      </div>
                    )}
                    {book.authorDe && (
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Deutsch:</span>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{book.authorDe}</h3>
                      </div>
                    )}
                    {!book.authorKu && !book.authorEn && !book.authorDe && (
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{book.author}</h3>
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-2 mt-4">
                    {currentLanguage === 'ku' ? 'زانیاری نووسەر زوو زیاد دەکرێت...' : currentLanguage === 'en' ? 'Author information coming soon...' : 'Autorinformationen folgen bald...'}
                  </p>
                </div>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="space-y-8">
                {/* Mock Reviews List */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {currentLanguage === 'ku' ? 'ڕای کڕیاران' : currentLanguage === 'en' ? 'Customer Reviews' : 'Kundenrezensionen'}
                  </h3>
                  
                  {getReviewsByBookId(book.id).length > 0 ? (
                    getReviewsByBookId(book.id).map((review) => (
                    <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-xs">
                            {review.userName.charAt(0)}
                          </div>
                          <span className="font-bold text-gray-800 dark:text-white">{review.userName}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
                      </div>
                      {review.title && (
                        <h5 className="font-bold text-sm text-gray-900 dark:text-white mb-1">{review.title}</h5>
                      )}
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{review.comment}</p>
                    </div>
                  ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      {currentLanguage === 'ku' ? 'هیچ ڕایەک نییە. یەکەم کەس بە بۆ نووسینی ڕا.' : currentLanguage === 'en' ? 'No reviews yet. Be the first to review!' : 'Noch keine Bewertungen. Seien Sie der Erste!'}
                    </p>
                  )}
                </div>

                {/* Add Review Form */}
                <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">
                    {currentLanguage === 'ku' ? 'ڕای خۆت بنووسە' : currentLanguage === 'en' ? 'Write a Review' : 'Bewertung schreiben'}
                  </h4>
                  <form className="space-y-4" onSubmit={handleReviewSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {currentLanguage === 'ku' ? 'ناونیشان' : currentLanguage === 'en' ? 'Title' : 'Titel'}
                      </label>
                      <input 
                        type="text" 
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                        placeholder={currentLanguage === 'ku' ? 'ناونیشانی کورت...' : currentLanguage === 'en' ? 'Short title...' : 'Kurzer Titel...'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {currentLanguage === 'ku' ? 'نرخاندن' : currentLanguage === 'en' ? 'Rating' : 'Bewertung'}
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button 
                            key={star} 
                            type="button" 
                            onClick={() => setReviewRating(star)}
                            className={`text-2xl transition-colors ${
                              star <= reviewRating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                            }`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {currentLanguage === 'ku' ? 'لێدوان' : currentLanguage === 'en' ? 'Comment' : 'Kommentar'}
                      </label>
                      <textarea 
                        rows={4}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                        placeholder={currentLanguage === 'ku' ? 'ڕای خۆت بنووسە...' : currentLanguage === 'en' ? 'Write your review...' : 'Schreiben Sie Ihre Bewertung...'}
                      ></textarea>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      {currentLanguage === 'ku' ? 'ناردن' : currentLanguage === 'en' ? 'Submit Review' : 'Bewertung absenden'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {selectedTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                    {currentLanguage === 'ku' ? 'زانیاری تەکنیکی' : currentLanguage === 'en' ? 'Technical Information' : 'Technische Informationen'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                      <span className="text-gray-600 dark:text-gray-400">ISBN:</span>
                      <span className="text-gray-900 dark:text-gray-200">{book.isbn || 'نادیار'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                      <span className="text-gray-600 dark:text-gray-400">{currentLanguage === 'ku' ? 'ژمارەی لاپەڕە' : currentLanguage === 'en' ? 'Pages' : 'Seiten'}:</span>
                      <span className="text-gray-900 dark:text-gray-200">{book.pages || 'نادیار'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                      <span className="text-gray-600 dark:text-gray-400">{currentLanguage === 'ku' ? 'زمان' : currentLanguage === 'en' ? 'Language' : 'Sprache'}:</span>
                      <span className="text-gray-900 dark:text-gray-200">{book.language === 'kurdish' ? 'کوردی' : book.language}</span>
                    </div>
                    {book.translator && (
                      <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                        <span className="text-gray-600 dark:text-gray-400">{currentLanguage === 'ku' ? 'وەرگێڕ' : currentLanguage === 'en' ? 'Translator' : 'Übersetzer'}:</span>
                        <span className="text-gray-900 dark:text-gray-200">{book.translator}</span>
                      </div>
                    )}
                      <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                        <span className="text-gray-600 dark:text-gray-400">{currentLanguage === 'ku' ? 'بەرواری بڵاوکردنەوە' : currentLanguage === 'en' ? 'Publish Date' : 'Veröffentlichungsdatum'}:</span>
                        <span className="text-gray-900 dark:text-gray-200">{book.publishedDate || 'نادیار'}</span>
                      </div>
                    {book.inventoryCount !== undefined && (
                      <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                        <span className="text-gray-600 dark:text-gray-400">{currentLanguage === 'ku' ? 'موجودی' : currentLanguage === 'en' ? 'Stock' : 'Lagerbestand'}:</span>
                        <span className={book.inventoryCount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {book.inventoryCount > 0 ? `${book.inventoryCount} ${currentLanguage === 'ku' ? 'دانە' : currentLanguage === 'en' ? 'items' : 'Stück'}` : (currentLanguage === 'ku' ? 'موجود نییە' : currentLanguage === 'en' ? 'Out of stock' : 'Nicht verfügbar')}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Multi-language publisher info */}
                  <div className="mt-6">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">{currentLanguage === 'ku' ? 'چاپخانە' : currentLanguage === 'en' ? 'Publisher' : 'Verlag'}</h5>
                    <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      {book.publisherKu && <div><span className="text-gray-600 dark:text-gray-400">کوردی:</span> {book.publisherKu}</div>}
                      {book.publisherEn && <div><span className="text-gray-600 dark:text-gray-400">English:</span> {book.publisherEn}</div>}
                      {book.publisherDe && <div><span className="text-gray-600 dark:text-gray-400">Deutsch:</span> {book.publisherDe}</div>}
                      {!book.publisherKu && !book.publisherEn && !book.publisherDe && <div>{book.publisher}</div>}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">{currentLanguage === 'ku' ? 'پۆل' : currentLanguage === 'en' ? 'Category' : 'Kategorie'}</h4>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                    {book.category}
                  </span>
                  
                  {/* Status indicators */}
                  <div className="mt-6">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">{currentLanguage === 'ku' ? 'دۆخ' : currentLanguage === 'en' ? 'Status' : 'Status'}</h5>
                    <div className="space-y-2">
                      {book.featured && (
                        <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs mr-2 rtl:mr-0 rtl:ml-2">
                          {currentLanguage === 'ku' ? 'تایبەت' : currentLanguage === 'en' ? 'Featured' : 'Empfohlen'}
                        </span>
                      )}
                      {book.bestseller && (
                        <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-2 py-1 rounded-full text-xs mr-2 rtl:mr-0 rtl:ml-2">
                          {currentLanguage === 'ku' ? 'باشترین' : currentLanguage === 'en' ? 'Bestseller' : 'Bestseller'}
                        </span>
                      )}
                      {book.newRelease && (
                        <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs">
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-8 transition-colors duration-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
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

          {/* Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-4 space-y-6">
              {/* Special Offers */}
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
                <div className="text-3xl mb-3">🔥</div>
                <h3 className="text-xl font-bold mb-2">تخفیفی تایبەت!</h3>
                <p className="text-sm mb-4 opacity-90">تا ٥٠٪ داشکاندن لەسەر کتابە هەڵبژێردراوەکان</p>
                <Link
                  href="/books?filter=discount"
                  className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block text-sm w-full text-center"
                >
                  بینینی تخفیفەکان
                </Link>
              </div>

              {/* Recommended Books */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors duration-300">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <span>⭐</span>
                  کتابی پێشنیارکراو
                </h3>
                <div className="space-y-4">
                  {sidebarBooks.map((book) => (
                    <Link
                      key={book.id}
                      href={`/book/${book.id}`}
                      className="flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                    >
                      <div className="w-12 h-16 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {book.image || book.coverUrl ? (
                          <img src={book.image || book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl">📚</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-xs text-gray-800 dark:text-white truncate">{book.title}</h4>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{book.author}</p>
                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">{formatPrice(book.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Ad Space */}
              <div className="bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg h-[250px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 p-4 transition-colors duration-300">
                <span className="text-4xl mb-2">📢</span>
                <span className="text-center font-medium">شوێنی ریکلام</span>
                <span className="text-xs text-center mt-2">(Ad Space)</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}