'use client';

import { authors, books } from '@/data/books';
import { Author, Book } from '@/lib/types';
import { notFound } from 'next/navigation';
import BookCard from '@/components/ui/BookCard';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface AuthorDetailPageProps {
  params: {
    id: string;
  };
}

export default function AuthorDetailPage({ params }: AuthorDetailPageProps) {
  const { t, currentLanguage } = useLanguage();
  const author = authors.find(a => a.id === params.id);
  
  if (!author) {
    notFound();
  }

  const authorBooks = books.filter(book => book.author === author.name);
  const totalReviews = authorBooks.reduce((sum, book) => sum + book.reviewCount, 0);
  const averageRating = authorBooks.length > 0 
    ? authorBooks.reduce((sum, book) => sum + book.rating, 0) / authorBooks.length 
    : 0;

  const booksByCategory = authorBooks.reduce((acc, book) => {
    const category = book.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(book);
    return acc;
  }, {} as Record<string, Book[]>);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">سەرەتا</Link>
          <span className="mx-2">←</span>
          <Link href="/authors" className="hover:text-blue-600">نووسەران</Link>
          <span className="mx-2">←</span>
          <span className="text-gray-900">
            {currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
          </span>
        </nav>

        {/* Author Profile */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-8 rtl:md:space-x-reverse">
            {/* Author Image */}
            <div className="flex-shrink-0 mb-6 md:mb-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto overflow-hidden">
                {author.image ? (
                  <img 
                    src={author.image} 
                    alt={currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-4xl font-bold">
                    {(currentLanguage === 'ku' ? author.name : (author.latinName || author.name)).charAt(0)}
                  </span>
                )}
              </div>
            </div>

            {/* Author Info */}
            <div className="flex-1 text-center md:text-right rtl:md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
              </h1>
              
              {/* Author Details */}
              <div className="flex flex-wrap justify-center md:justify-start rtl:md:justify-end gap-4 mb-4 text-sm text-gray-600">
                {author.birthYear && (
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    {author.deathYear ? `${author.birthYear}-${author.deathYear}` : `لەدایکبوو: ${author.birthYear}`}
                  </span>
                )}
                {author.nationality && (
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    نەتەوە: {author.nationality}
                  </span>
                )}
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {authorBooks.length} کتاب
                </span>
              </div>

              {/* Bio */}
              {author.bio?.[currentLanguage] && (
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {author.bio[currentLanguage]}
                  </p>
                </div>
              )}

              {/* Genre */}
              {author.genre && author.genre.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">بوارەکانی نووسین:</h3>
                  <div className="flex flex-wrap gap-2">
                    {author.genre.map((g, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards */}
              {author.awards && author.awards.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">خەڵاتەکان:</h3>
                  <div className="flex flex-wrap gap-2">
                    {author.awards.map((award, index) => (
                      <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                        🏆 {award}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{authorBooks.length}</div>
                  <div className="text-sm text-gray-600">کتاب</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{totalReviews}</div>
                  <div className="text-sm text-gray-600">نرخاندن</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">ڕێژەی نرخاندن</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Author's Books */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              کتابەکانی {currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
            </h2>
            <span className="text-gray-600">{authorBooks.length} کتاب</span>
          </div>

          {authorBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {authorBooks.map((book: Book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                هیچ کتابێک بەردەست نییە
              </h3>
              <p className="text-gray-600">
                ئێستا کتابی ئەم نووسەرە لە کتابخانەکەماندا نییە
              </p>
            </div>
          )}
        </div>

        {/* Books by Category */}
        {Object.keys(booksByCategory).length > 1 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">کتابەکان بەپێی پۆل</h2>
            
            <div className="space-y-8">
              {Object.entries(booksByCategory).map(([category, categoryBooks]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3 rtl:mr-0 rtl:ml-3">
                      {categoryBooks.length}
                    </span>
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categoryBooks.map((book: Book) => (
                      <Link
                        key={book.id}
                        href={`/book/${book.id}`}
                        className="flex items-center space-x-3 rtl:space-x-reverse p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-xl text-gray-400">📚</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 truncate">{book.title}</h4>
                          <p className="text-sm text-gray-600">{book.publisher}</p>
                          <p className="text-sm font-bold text-blue-600">
                            {formatPrice(book.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">کاتی بڵاوکردنەوە</h2>
          
          <div className="space-y-4">
            {authorBooks
              .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
              .map((book: Book) => (
                <Link
                  key={book.id}
                  href={`/book/${book.id}`}
                  className="flex items-center space-x-4 rtl:space-x-reverse p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">{book.title}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(book.publishedDate).getFullYear()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {book.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse mt-2">
                      <span className="text-sm text-blue-600 font-medium">
                        {formatPrice(book.price)}
                      </span>
                      <span className="text-sm text-gray-500">
                        ⭐ {book.rating} ({book.reviewCount})
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}