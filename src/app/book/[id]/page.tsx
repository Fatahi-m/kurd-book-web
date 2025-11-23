'use client';

import { Book } from '@/lib/types';
import { bookService } from '@/lib/bookService';
import { translators } from '@/data/books';
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
import { motion } from 'framer-motion';

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
  
  const translatorObj = book?.translator ? translators.find(t => t.name === book.translator || t.latinName === book.translator) : undefined;

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
    <main className="min-h-screen bg-[#F5F2E9] dark:bg-[#121212] transition-colors duration-300 font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            
            {/* Book Cover - Left Side */}
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative aspect-[2/3] shadow-2xl rounded-sm overflow-hidden"
              >
                {book.coverUrl || book.image ? (
                  <Image
                    src={book.coverUrl || book.image || '/images/default-book-cover.jpg'}
                    alt={book.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-6xl opacity-20">📚</span>
                  </div>
                )}
                
                {/* Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-white/10 pointer-events-none mix-blend-overlay" />
              </motion.div>
            </div>

            {/* Book Info - Right Side */}
            <div className="flex-1 relative z-10 pt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                {/* Breadcrumb */}
                <nav className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-light">
                  <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">{t('nav.home')}</Link>
                  <span className="mx-2">/</span>
                  <Link href="/books" className="hover:text-black dark:hover:text-white transition-colors">{t('nav.books')}</Link>
                  <span className="mx-2">/</span>
                  <span className="text-black dark:text-white">{book.category}</span>
                </nav>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-900 dark:text-white mb-4 leading-tight">
                  {currentLanguage === 'ku' && book.titleKu ? book.titleKu : book.title}
                </h1>
                
                <div className="flex items-center gap-4 mb-8">
                  <Link href={`/author/${book.author}`} className="text-xl font-light text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-gray-400">
                    {currentLanguage === 'ku' && book.authorKu ? book.authorKu : book.author}
                  </Link>
                  {book.translator && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500 font-light">
                        {currentLanguage === 'ku' ? 'وەرگێڕان:' : 'Trans:'} {book.translator}
                      </span>
                    </>
                  )}
                </div>

                {/* Price & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-12 border-t border-b border-gray-200 dark:border-gray-800 py-8">
                  <div className="flex items-baseline gap-4">
                    <span className="text-3xl font-serif text-gray-900 dark:text-white">
                      {formatPrice(book.price)}
                    </span>
                    {book.originalPrice && (
                      <span className="text-lg text-gray-400 line-through font-light">
                        {formatPrice(book.originalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-sm h-12">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 h-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 font-light min-w-[3rem] text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 h-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={!book.inStock}
                      className={`flex-1 sm:flex-none h-12 px-8 bg-black dark:bg-white text-white dark:text-black text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {book.inStock ? (currentLanguage === 'ku' ? 'زیادکردن' : 'Add to Cart') : (currentLanguage === 'ku' ? 'نامەوجود' : 'Out of Stock')}
                    </button>

                    <button 
                      onClick={handleWishlistToggle}
                      className={`h-12 w-12 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-sm hover:border-black dark:hover:border-white transition-colors ${isInWishlist(book.id) ? 'text-red-600 border-red-600' : ''}`}
                    >
                      <svg className="w-5 h-5" fill={isInWishlist(book.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Description Preview */}
                <div className="prose dark:prose-invert max-w-none mb-8 font-light leading-relaxed text-gray-600 dark:text-gray-300">
                  <p className="line-clamp-4">
                    {currentLanguage === 'ku' && book.descriptionKu ? book.descriptionKu : book.description}
                  </p>
                </div>

                {/* Meta Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-light text-gray-500 dark:text-gray-400">
                  <div>
                    <span className="block text-xs uppercase tracking-wider mb-1 text-gray-400 dark:text-gray-500">ISBN</span>
                    <span className="text-gray-900 dark:text-white">{book.isbn || '-'}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider mb-1 text-gray-400 dark:text-gray-500">{t('book.pages')}</span>
                    <span className="text-gray-900 dark:text-white">{book.pages || '-'}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider mb-1 text-gray-400 dark:text-gray-500">{t('book.language')}</span>
                    <span className="text-gray-900 dark:text-white capitalize">{book.language}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider mb-1 text-gray-400 dark:text-gray-500">{t('book.publisher')}</span>
                    <span className="text-gray-900 dark:text-white">{book.publisher}</span>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Tabs Section */}
      <section className="py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-center gap-8 mb-12 border-b border-gray-200 dark:border-gray-800">
            {['description', 'author', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`pb-4 text-sm uppercase tracking-widest transition-colors relative ${
                  selectedTab === tab 
                    ? 'text-black dark:text-white' 
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                {t(`book.${tab}`)}
                {selectedTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[300px]">
            {selectedTab === 'description' && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="prose dark:prose-invert max-w-none font-light leading-loose text-lg text-gray-700 dark:text-gray-300"
              >
                <p>{currentLanguage === 'ku' && book.descriptionKu ? book.descriptionKu : book.description}</p>
              </motion.div>
            )}
            
            {selectedTab === 'author' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
                  👤
                </div>
                <h3 className="text-2xl font-serif mb-4">{book.author}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-light max-w-xl mx-auto">
                  {currentLanguage === 'ku' ? 'زانیاری نووسەر بەم زووانە...' : 'Author biography coming soon...'}
                </p>
              </motion.div>
            )}

            {selectedTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Simplified Reviews for now */}
                <div className="text-center py-12 bg-white dark:bg-gray-800/50 rounded-sm border border-gray-100 dark:border-gray-800">
                  <h3 className="font-serif text-xl mb-2">{t('book.reviews')}</h3>
                  <p className="text-gray-500 font-light mb-6">
                    {getReviewCount(book.id) > 0 
                      ? `${getReviewCount(book.id)} ${t('book.reviews')}` 
                      : (currentLanguage === 'ku' ? 'هیچ ڕایەک نییە' : 'No reviews yet')}
                  </p>
                  <button className="px-6 py-2 border border-black dark:border-white text-sm uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                    {currentLanguage === 'ku' ? 'ڕای خۆت بنووسە' : 'Write a Review'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <section className="py-16 bg-white dark:bg-[#1a1a1a]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-center mb-12">
              {currentLanguage === 'ku' ? 'کتابە پەیوەندیدارەکان' : 'You May Also Like'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook) => (
                <BookCard key={relatedBook.id} book={relatedBook} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}