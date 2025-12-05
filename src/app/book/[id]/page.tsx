'use client';

import { Book } from '@/lib/types';
import { bookService } from '@/lib/bookService';
import { translators } from '@/data/books';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import BookCard from '@/components/ui/BookCard';
import BookRow from '@/components/ui/BookRow';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReviews } from '@/contexts/ReviewContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Check, Gift, Truck, Info, Globe, BookOpen, Calendar, FileText, Hash, Building, Scale, Ruler, Star, CheckCircle, XCircle, ShieldCheck } from 'lucide-react';

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
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [interestingBooks, setInterestingBooks] = useState<Book[]>([]);

  useEffect(() => {
    const foundBook = bookService.getBookById(params.id);
    if (!foundBook) {
      notFound();
      return;
    }
    
    setBook(foundBook);
    
    // Get related books (Customers also bought) - Same Category
    let related = bookService.getBooksByCategory(foundBook.category)
      .filter(b => b.id !== foundBook.id);
      
    // If we don't have enough related books (less than 4), fill with random books to make the row look good
    if (related.length < 4) {
       const otherBooks = bookService.getAllBooks()
         .filter(b => b.id !== foundBook.id && b.category !== foundBook.category);
       
       // Shuffle other books
       const shuffledOthers = [...otherBooks].sort(() => 0.5 - Math.random());
       
       // Fill up to 6 books
       related = [...related, ...shuffledOthers.slice(0, 6 - related.length)];
    } else {
       related = related.slice(0, 6);
    }
    
    setRelatedBooks(related);

    // Get interesting books (Maybe these topics...) - Random selection from remaining books
    const allBooks = bookService.getAllBooks();
    const interesting = allBooks
      .filter(b => b.id !== foundBook.id && !related.find(r => r.id === b.id))
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
    setInterestingBooks(interesting);
  }, [params.id]);
  
  if (!book) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">📚</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const discountPercentage = book.originalPrice 
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : 0;

  // Get localized content
  const title = currentLanguage === 'kmr' ? (book.titleKmr || book.title) : 
                currentLanguage === 'en' ? (book.titleEn || book.title) : 
                (book.titleKu || book.title);
                
  const author = currentLanguage === 'kmr' ? (book.authorKmr || book.author) : 
                 currentLanguage === 'en' ? (book.authorEn || book.author) : 
                 (book.authorKu || book.author);

  const description = currentLanguage === 'kmr' ? (book.descriptionKmr || book.description) : 
                      currentLanguage === 'en' ? (book.descriptionEn || book.description) : 
                      (book.descriptionKu || book.description);
    
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
        title: title,
        author: author,
        price: book.price,
        originalPrice: book.originalPrice,
        imageUrl: book.coverUrl || book.image,
        inStock: book.inStock
      });
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans pb-16">
      
      {/* Breadcrumb */}
      <div className="bg-white">
        <div className="w-full max-w-5xl mx-auto px-6 md:px-12 py-3">
          <nav className="text-xs text-gray-400 flex items-center gap-2">
            <Link href="/" className="hover:text-black transition-colors">{t('nav.home')}</Link>
            <span>»</span>
            <Link href="/books" className="hover:text-black transition-colors">{t('nav.books')}</Link>
            <span>»</span>
            <span className="text-gray-500 font-medium">{book.category}</span>
            <span>»</span>
            <span className="text-gray-400 truncate max-w-[200px]">{title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section - With Ads */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-8">
        <div className="flex gap-6 items-start justify-center">
           
           {/* Left Ad */}
           <div className="hidden 2xl:flex w-40 shrink-0 flex-col gap-4 sticky top-24">
              <div className="w-full h-[600px] bg-gray-50 border border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-300 relative overflow-hidden group hover:border-black transition-colors">
                <span className="text-xs font-medium uppercase tracking-widest mb-1">Ad Space</span>
                <span className="text-[10px] opacity-50">160x600</span>
              </div>
           </div>

           {/* Main Content */}
           <div className="flex-1 max-w-5xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Image (Left) */}
          <div className="lg:col-span-4">
            <div className="relative aspect-[2/3] w-full shadow-2xl shadow-gray-200 rounded-2xl overflow-hidden bg-white transform hover:scale-[1.02] transition-all duration-500 border border-gray-100">
              {book.coverUrl || book.image ? (
                <Image
                  src={book.coverUrl || book.image || '/images/default-book-cover.jpg'}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                  <BookOpen size={64} className="text-gray-200" />
                </div>
              )}
              
              {/* Bestseller Badge */}
              {book.bestseller && (
                <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-yellow-400/20 flex items-center gap-1">
                  <span className="text-sm">👑</span>
                  <span>Bestseller</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Info (Middle) */}
          <div className="lg:col-span-5 flex flex-col pt-2">
            <div className="mb-4">
               <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
                {title}
              </h1>
              <Link href={`/author/${book.author}`} className="text-lg font-medium text-blue-600 hover:text-blue-700 hover:underline">
                {author}
              </Link>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
               <div className="flex items-center gap-1">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <Star key={star} size={18} className={`${star <= (book.rating || 4) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                 ))}
                 <span className="text-sm text-gray-500 font-medium ml-2">({book.reviewCount || 12} reviews)</span>
               </div>
               <div className="w-px h-4 bg-gray-300"></div>
               <div className="text-sm text-gray-500 font-medium">
                 SKU: <span className="text-gray-900">{book.isbn || 'N/A'}</span>
               </div>
            </div>

            {/* Format Box */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="border-2 border-blue-600 bg-blue-50 rounded-xl px-4 py-3 cursor-pointer relative">
                <div className="absolute -top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">SELECTED</div>
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-600" />
                  <div>
                    <span className="block text-xs text-blue-600 font-bold uppercase tracking-wider">Paperback</span>
                    <span className="block text-sm font-bold text-gray-900">{formatPrice(book.price)}</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-gray-300 transition-colors opacity-60">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-gray-400" />
                  <div>
                    <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider">Hardcover</span>
                    <span className="block text-sm font-bold text-gray-900">{formatPrice(book.price * 1.4)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-sm text-gray-600 mb-6 line-clamp-4">
               {description}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
               <div className="flex items-center gap-2 text-gray-600">
                 <Globe size={16} className="text-gray-400" />
                 <span>Language: <span className="font-semibold text-gray-900 capitalize">{book.language}</span></span>
               </div>
               <div className="flex items-center gap-2 text-gray-600">
                 <Calendar size={16} className="text-gray-400" />
                 <span>Published: <span className="font-semibold text-gray-900">{book.publishedDate || '2023'}</span></span>
               </div>
               <div className="flex items-center gap-2 text-gray-600">
                 <FileText size={16} className="text-gray-400" />
                 <span>Pages: <span className="font-semibold text-gray-900">{book.pages || '320'}</span></span>
               </div>
               <div className="flex items-center gap-2 text-gray-600">
                 <Building size={16} className="text-gray-400" />
                 <span>Publisher: <span className="font-semibold text-gray-900">{book.publisher}</span></span>
               </div>
            </div>
          </div>

          {/* Column 3: Price & Action (Right) */}
          <div className="lg:col-span-3">
             <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl shadow-gray-100/50 sticky top-24">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-gray-900 tracking-tight">
                    {formatPrice(book.price)}
                  </span>
                  {book.originalPrice && (
                    <span className="text-lg text-gray-400 line-through font-medium">
                      {formatPrice(book.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-6">{t('book.inclVAT')}</p>

                {/* Stock Status */}
                <div className={`flex items-center gap-2 mb-6 ${book.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {book.inStock ? <CheckCircle size={18} /> : <XCircle size={18} />}
                  <span className="font-medium text-sm">
                    {book.inStock ? t('book.inStock') : t('book.outOfStock')}
                  </span>
                </div>

                {/* Quantity Selector */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Quantity</label>
                  <div className="flex items-center border border-gray-200 rounded-lg w-full">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <div className="flex-1 h-10 flex items-center justify-center font-bold text-gray-900 border-x border-gray-200">
                      {quantity}
                    </div>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!book.inStock}
                    className={`w-full py-3.5 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 ${
                      book.inStock 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={20} />
                    {book.inStock ? t('book.addToCart') : t('book.outOfStock')}
                  </button>
                  
                  <button 
                    onClick={handleWishlistToggle}
                    className={`w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 border transition-all ${
                      isInWishlist(book.id)
                        ? 'border-red-200 bg-red-50 text-red-600'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Heart size={20} fill={isInWishlist(book.id) ? "currentColor" : "none"} />
                    {isInWishlist(book.id) ? 'Saved to Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                   <div className="flex items-center gap-3 text-xs text-gray-500">
                     <Truck size={16} className="text-gray-400" />
                     <span>Free shipping on orders over $50</span>
                   </div>
                   <div className="flex items-center gap-3 text-xs text-gray-500">
                     <ShieldCheck size={16} className="text-gray-400" />
                     <span>Secure payment & checkout</span>
                   </div>
                </div>
             </div>
          </div>

              </div>
           </div>

           {/* Right Ad */}
           <div className="hidden 2xl:flex w-40 shrink-0 flex-col gap-4 sticky top-24">
              <div className="w-full h-[600px] bg-gray-50 border border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-300 relative overflow-hidden group hover:border-gray-300 transition-colors">
                <span className="text-xs font-medium uppercase tracking-widest mb-1">Ad Space</span>
                <span className="text-[10px] opacity-50">160x600</span>
              </div>
           </div>

        </div>
      </div>

      {/* Section 1: Customers also bought */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 mb-16 mt-16">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-bold text-gray-900">
              {t('book.customersAlsoBought')}
           </h2>
        </div>
        <BookRow 
          books={relatedBooks}
          variant="default"
          bgClass="bg-white"
        />
      </div>

      {/* Section 2: Details & Sidebar */}
      <div id="details-section" className="bg-gray-50 py-16">
        <div className="w-full max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content (Left) */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <Info className="text-blue-600" size={24} />
                  {t('book.information')}
                </h2>

                {/* Specs Grid - 2 Columns for better readability */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-10">
                    <SpecRow icon={<FileText size={18} />} label={t('book.fullName')} value={currentLanguage === 'ku' && book.titleKu ? book.titleKu : book.title} />
                    <SpecRow icon={<UserIcon size={18} />} label={t('book.author')} value={currentLanguage === 'ku' && book.authorKu ? book.authorKu : book.author} />
                    <SpecRow icon={<Globe size={18} />} label={t('book.language')} value={book.language} />
                    <SpecRow icon={<BookOpen size={18} />} label={t('book.binding')} value="Paperback" />
                    <SpecRow icon={<Calendar size={18} />} label={t('book.releaseDate')} value={book.publishedDate || '2009'} />
                    <SpecRow icon={<FileText size={18} />} label={t('book.pages')} value={book.pages?.toString() || '288'} />
                    <SpecRow icon={<Hash size={18} />} label={t('book.ean')} value={book.isbn ? `978${book.isbn.replace(/-/g, '')}` : '9788434893511'} />
                    <SpecRow icon={<Hash size={18} />} label={t('book.isbn')} value={book.isbn || '8434893517'} />
                    <SpecRow icon={<Building size={18} />} label={t('book.publisher')} value={book.publisher} />
                    <SpecRow icon={<Scale size={18} />} label={t('book.weight')} value="836g" />
                    <SpecRow icon={<Ruler size={18} />} label={t('book.dimensions')} value="211 x 288 x 22 mm" />
                </div>
                
                <div className="w-full h-px bg-gray-100 mb-8"></div>

                {/* Categories */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3 text-sm items-center">
                      <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{t('book.category')}</span>
                      <Link href={`/category/${book.category}`} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors capitalize">
                        {book.category}
                      </Link>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm items-center">
                      <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{t('book.tags')}</span>
                      {book.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium hover:bg-blue-100 transition-colors cursor-pointer">
                          {tag}
                      </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar (Right) - Gift Box */}
            <div className="w-full lg:w-[380px] flex-shrink-0">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl shadow-xl overflow-hidden relative">
                 {/* Decorative circles */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-10 -mb-10"></div>

                 {/* Header part of the box */}
                 <div className="p-8 pb-4 text-center relative z-10">
                    <div className="mx-auto mb-4 bg-white/20 w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Gift size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 leading-tight">
                      {t('book.giftTitle')}
                    </h3>
                 </div>

                 {/* Body part */}
                 <div className="p-8 pt-2 relative z-10">
                    <h4 className="text-white/90 font-medium text-lg mb-8 text-center border-b border-white/20 pb-4">
                        {t('book.giftSubtitle')}
                    </h4>
                    
                    <div className="space-y-6">
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-white text-purple-600 flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg">1</div>
                        <p className="text-sm text-white/90 leading-snug font-medium pt-1">{t('book.giftStep1')}</p>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-white text-purple-600 flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg">2</div>
                        <p className="text-sm text-white/90 leading-snug font-medium pt-1">{t('book.giftStep2')}</p>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-white text-purple-600 flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg">3</div>
                        <p className="text-sm text-white/90 leading-snug font-medium pt-1">{t('book.giftStep3')}</p>
                      </div>
                    </div>
                    
                    <button className="w-full mt-8 py-3 bg-white text-purple-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                      Add Gift Wrap (+$5.00)
                    </button>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Section 3: Interesting Topics */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 mb-24 mt-16">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-bold text-gray-900">
              {t('book.interestingTopics')}
           </h2>
        </div>
        <BookRow 
          books={interestingBooks}
          variant="default"
          bgClass="bg-white"
        />
      </div>

    </main>
  );
}

function SpecRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-200 last:border-0">
      <div className="text-gray-400 mt-0.5">{icon}</div>
      <div className="flex-1">
        <span className="block text-xs text-gray-500 uppercase tracking-wider mb-0.5">{label}</span>
        <span className="font-medium text-gray-900">{value}</span>
      </div>
    </div>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function UserIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}