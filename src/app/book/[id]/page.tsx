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
import { Heart, ShoppingCart, Check, Gift, Truck, Info, Globe, BookOpen, Calendar, FileText, Hash, Building, Scale, Ruler } from 'lucide-react';

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
    <main className="min-h-screen bg-slate-50 font-sans pb-16">
      
      {/* Breadcrumb */}
      <div className="bg-slate-50">
        <div className="w-full max-w-5xl mx-auto px-6 md:px-12 py-3">
          <nav className="text-xs text-gray-400 flex items-center gap-2">
            <Link href="/" className="hover:text-[#48B063] transition-colors">{t('nav.home')}</Link>
            <span>»</span>
            <Link href="/books" className="hover:text-[#48B063] transition-colors">{t('nav.books')}</Link>
            <span>»</span>
            <span className="text-gray-500 font-medium">{book.category}</span>
            <span>»</span>
            <span className="text-gray-400 truncate max-w-[200px]">{book.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section - 3 Column Layout */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Image (Left) - Adjusted Size & Shadow */}
          <div className="lg:col-span-4">
            <div className="relative aspect-[1/1.4] w-full shadow-[0_40px_70px_-15px_rgba(0,0,0,0.5)] rounded-md overflow-hidden bg-white transform hover:scale-[1.01] transition-all duration-500">
              {book.coverUrl || book.image ? (
                <Image
                  src={book.coverUrl || book.image || '/images/default-book-cover.jpg'}
                  alt={book.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-6xl opacity-20">📚</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Info (Middle) */}
          <div className="lg:col-span-5 flex flex-col pt-2">
            <div className="flex justify-between items-start mb-1">
               <h1 className="text-3xl lg:text-[2.5rem] font-serif font-bold text-[#002F34] leading-[1.1] tracking-tight">
                {currentLanguage === 'ku' && book.titleKu ? book.titleKu : book.title}
              </h1>
            </div>
            
            <div className="flex items-center gap-4 mb-4 mt-2">
               {/* Floating Badges moved here to match flow */}
               <div className="flex gap-2">
                 <div className="flex items-center gap-1 bg-white border border-purple-200 rounded-full px-3 py-1 shadow-sm">
                    <span className="text-purple-600 font-bold text-sm">56 b</span>
                    <div className="w-4 h-4 bg-purple-600 rounded-full text-[10px] text-white flex items-center justify-center font-serif italic">?</div>
                 </div>
                 {book.bestseller && (
                    <div className="flex items-center gap-1 bg-white border border-orange-200 rounded-full px-3 py-1 shadow-sm">
                      <span className="text-orange-500 text-sm">👑</span>
                      <span className="text-gray-600 font-bold text-sm">Top</span>
                    </div>
                 )}
              </div>
            </div>

            <div className="mb-6">
              <Link href={`/author/${book.author}`} className="text-lg font-medium text-[#48B063] hover:underline">
                {currentLanguage === 'ku' && book.authorKu ? book.authorKu : book.author}
              </Link>
            </div>

            {/* Format Box - Matching Screenshot Style */}
            <div className="bg-[#F0F2F2] rounded-md p-3 mb-6 flex flex-wrap gap-6 text-sm text-gray-700 w-fit border border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">{t('book.language')}:</span>
                <Globe size={16} className="text-gray-400" />
                <span className="font-bold capitalize text-[#002F34]">{book.language}</span>
              </div>
              <div className="w-px h-5 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">Format:</span>
                <BookOpen size={16} className="text-gray-400" />
                <span className="font-bold text-[#002F34]">Paperback</span>
              </div>
            </div>

            <div className="mb-4 text-sm text-gray-600">
               <span className="block mb-1 font-medium text-gray-400 text-xs uppercase tracking-wider">Publisher</span>
               <span className="text-[#48B063] font-bold text-base">{book.publisher}</span>
               <span className="text-gray-400 mx-2">•</span>
               <span className="text-gray-600">{book.publishedDate || 'November 2009'}</span>
            </div>

            <div className="text-gray-600 italic text-sm leading-relaxed mb-4 relative">
               <p className="line-clamp-3">
                  {currentLanguage === 'ku' && book.descriptionKu ? book.descriptionKu : book.description}
               </p>
               <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent"></div>
            </div>
            
            <button 
              onClick={() => document.getElementById('details-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#48B063] font-bold hover:underline flex items-center gap-1 text-sm w-fit"
            >
              Full description <ChevronDownIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Column 3: Price & Action (Right) */}
          <div className="lg:col-span-3">
             <div className="flex flex-col items-end lg:items-end pt-2">
                <div className="flex items-baseline gap-3 mb-0">
                  {book.originalPrice && (
                    <span className="text-lg text-gray-400 line-through font-medium">
                      {formatPrice(book.originalPrice)}
                    </span>
                  )}
                  <span className="text-5xl font-black text-[#002F34] tracking-tight">
                    {formatPrice(book.price)}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mb-8 font-medium">incl. VAT</p>

                {/* Delivery Badge - Yellow */}
                <div className="bg-[#FDF6B2] text-[#723B13] px-4 py-3 rounded-md font-bold text-xs flex items-center justify-center gap-2 relative shadow-sm mb-4 w-full">
                  <div className="absolute top-full right-10 border-8 border-transparent border-t-[#FDF6B2] w-0 h-0"></div>
                  <Truck size={16} strokeWidth={2.5} />
                  {book.inStock ? 'We deliver by Christmas' : 'Out of Stock'}
                </div>

                {/* Stock Badge - Green */}
                <div className="bg-[#84C493] text-white px-4 py-2.5 rounded-md font-bold text-xs w-full text-center shadow-sm mb-2 uppercase tracking-wide">
                   External Stock
                </div>
                <p className="text-[11px] text-gray-500 text-center w-full mb-6 font-medium">We ship in 4-7 days</p>

                <div className="flex items-center gap-3 w-full">
                  <button 
                    onClick={handleWishlistToggle}
                    className="text-[#48B063] hover:text-[#3a9e53] transition-colors p-0"
                  >
                    <Heart size={28} strokeWidth={1.5} fill={isInWishlist(book.id) ? "currentColor" : "none"} />
                  </button>

                  <button
                    onClick={handleAddToCart}
                    disabled={!book.inStock}
                    className={`h-14 rounded-md font-bold text-white text-lg flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 flex-1 ${
                      book.inStock ? 'bg-[#6BCBA6] hover:bg-[#5ab895]' : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={22} strokeWidth={2.5} />
                    {book.inStock ? (currentLanguage === 'ku' ? 'زیادکردن' : 'Add to Cart') : (currentLanguage === 'ku' ? 'نامەوجود' : 'Out of Stock')}
                  </button>
                </div>
                
                <p className="text-[10px] text-gray-400 mt-4 flex items-center gap-2 justify-center w-full">
                   <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[9px] font-bold text-gray-500">30</span>
                   30 days return policy
                </p>
             </div>
          </div>

        </div>
      </div>

      {/* Section 1: Customers also bought */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 mb-12 mt-12">
        <div className="text-center mb-8">
           <h2 className="text-3xl font-serif font-bold text-[#002F34] inline-flex items-center gap-4">
              <span className="text-gray-300">»</span>
              {currentLanguage === 'ku' ? 'کڕیارانی تر ئەمشیان کڕیوە' : 'Customers also bought'}
              <span className="text-gray-300">«</span>
           </h2>
        </div>
        <BookRow 
          books={relatedBooks}
          variant="default"
          bgClass="bg-white"
        />
      </div>

      {/* Section 2: Details & Sidebar */}
      <div id="details-section" className="bg-slate-50 py-12">
        <div className="w-full max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content (Left) */}
            <div className="flex-1">
              <h2 className="text-3xl font-serif font-bold text-[#002F34] mb-8">
                {currentLanguage === 'ku' ? 'زانیاری دەربارەی کتێب' : 'Information about the book'}
              </h2>

              {/* Specs Grid - 3 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-8 mb-12">
                  <div>
                      <span className="block text-xs text-gray-400 mb-1">Full Name</span>
                      <span className="font-bold text-[#002F34] text-sm leading-tight block">
                        {currentLanguage === 'ku' && book.titleKu ? book.titleKu : book.title}
                      </span>
                  </div>
                  <div>
                      <span className="block text-xs text-gray-400 mb-1">Author</span>
                      <Link href={`/author/${book.author}`} className="font-bold text-[#48B063] text-sm hover:underline">
                        {currentLanguage === 'ku' && book.authorKu ? book.authorKu : book.author}
                      </Link>
                  </div>
                  <div>
                      <span className="block text-xs text-gray-400 mb-1">Language</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#002F34] text-sm capitalize">{book.language}</span>
                      </div>
                  </div>

                  <div>
                      <span className="block text-xs text-gray-400 mb-1">Binding</span>
                      <div className="flex items-center gap-2">
                         <BookOpen size={16} className="text-gray-400" />
                         <span className="font-bold text-[#002F34] text-sm">Paperback</span>
                      </div>
                  </div>
                  <div>
                      <span className="block text-xs text-gray-400 mb-1">Release Date</span>
                      <span className="font-bold text-[#002F34] text-sm">{book.publishedDate || '2009'}</span>
                  </div>
                  <div>
                      <span className="block text-xs text-gray-400 mb-1">Pages</span>
                      <span className="font-bold text-[#002F34] text-sm">{book.pages || '288'}</span>
                  </div>

                  <div>
                      <span className="block text-xs text-gray-400 mb-1">EAN</span>
                      <span className="font-bold text-[#002F34] text-sm">{book.isbn ? `978${book.isbn.replace(/-/g, '')}` : '9788434893511'}</span>
                  </div>
                  <div>
                      <span className="block text-xs text-gray-400 mb-1">ISBN</span>
                      <span className="font-bold text-[#002F34] text-sm">{book.isbn || '8434893517'}</span>
                  </div>
                  <div>
                      <span className="block text-xs text-gray-400 mb-1">Libristo-Code</span>
                      <span className="font-bold text-[#002F34] text-sm">04456526</span>
                  </div>

                  <div>
                      <span className="block text-xs text-gray-400 mb-1">Publisher</span>
                      <span className="font-bold text-[#48B063] text-sm">{book.publisher}</span>
                  </div>
                  <div>
                      <span className="block text-xs text-gray-400 mb-1">Weight</span>
                      <span className="font-bold text-[#002F34] text-sm">836g</span>
                  </div>
                  <div>
                      <span className="block text-xs text-gray-400 mb-1">Dimensions</span>
                      <span className="font-bold text-[#002F34] text-sm">211 x 288 x 22 mm</span>
                  </div>
              </div>
              
              <div className="w-full h-px bg-gray-200 mb-8"></div>

              {/* Categories */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 text-sm items-center">
                    <span className="text-gray-400 text-xs uppercase tracking-wider">Category</span>
                    <Link href={`/category/${book.category}`} className="text-[#48B063] font-bold hover:underline capitalize">
                    {book.category}
                    </Link>
                    <span className="text-gray-300">&gt;</span>
                    <span className="text-[#48B063] font-bold">Indo-European Languages</span>
                    <span className="text-gray-300">&gt;</span>
                    <span className="text-[#48B063] font-bold">Romance Languages</span>
                </div>
                <div className="flex flex-wrap gap-2 text-sm items-center">
                    <span className="text-gray-400 text-xs uppercase tracking-wider">Tags</span>
                    {book.tags.map((tag, i) => (
                    <span key={i} className="text-[#48B063] font-bold hover:underline cursor-pointer">
                        {tag}{i < book.tags.length - 1 ? ',' : ''}
                    </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Sidebar (Right) - Gift Box */}
            <div className="w-full lg:w-[380px] flex-shrink-0">
              <div className="bg-[#D8B4CE] h-full text-center">
                 {/* Header part of the box */}
                 <div className="p-8 pb-4">
                    <div className="mx-auto mb-4 relative flex justify-center">
                        <Gift size={64} className="text-white drop-shadow-sm" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2 leading-tight px-4">
                      {currentLanguage === 'ku' ? 'ئەم کتێبە بکە بە دیاری' : 'Gift this book today'}
                    </h3>
                 </div>

                 {/* Body part */}
                 <div className="p-8 pt-2">
                    <h4 className="text-[#002F34] font-serif font-bold text-xl mb-6 text-center border-b border-[#cba6c1] pb-4 mx-4">
                        {currentLanguage === 'ku' ? 'زۆر ئاسانە' : 'It is very simple'}
                    </h4>
                    
                    <div className="space-y-6 text-left px-2">
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-[#002F34] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm mt-1">1</div>
                        <p className="text-sm text-[#002F34] leading-snug font-medium">Put the book in your cart and choose "Send as gift"</p>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-[#002F34] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm mt-1">2</div>
                        <p className="text-sm text-[#002F34] leading-snug font-medium">We send you a voucher immediately</p>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-[#002F34] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm mt-1">3</div>
                        <p className="text-sm text-[#002F34] leading-snug font-medium">The book will be sent to the recipient's address</p>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Section 3: Interesting Topics */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 mb-16 mt-12">
        <div className="text-center mb-8">
           <h2 className="text-3xl font-serif font-bold text-[#002F34] inline-flex items-center gap-4">
              <span className="text-gray-300">»</span>
              {currentLanguage === 'ku' ? 'شاید ئەم بابەتانەش جالب بن' : 'Maybe these topics are also interesting'}
              <span className="text-gray-300">«</span>
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