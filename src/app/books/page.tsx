'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { bookService } from '@/lib/bookService';
import { Book } from '@/lib/types';
import BookCard from '@/components/ui/BookCard';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

const categories = [
	{ id: 'all', key: 'categories.all' },
	{ id: 'literature', key: 'categories.literature' },
	{ id: 'poetry', key: 'categories.poetry' },
	{ id: 'history', key: 'categories.history' },
	{ id: 'children', key: 'categories.children' },
	{ id: 'education', key: 'categories.education' },
	{ id: 'science', key: 'categories.science' }
];

export default function BooksPage() {
	const { t } = useLanguage();
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [sortBy, setSortBy] = useState('title');
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		// Load books on client side
		const allBooks = bookService.getAllBooks();
		setBooks(allBooks);
	}, []);

	const filteredBooks = books.filter(book => {
		const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
		const matchesSearch =
			book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			book.author.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const sortedBooks = [...filteredBooks].sort((a, b) => {
		switch (sortBy) {
			case 'price':
				return a.price - b.price;
			case 'rating':
				return b.rating - a.rating;
			case 'publishedDate':
				return new Date(b.publishedDate || '').getTime() - new Date(a.publishedDate || '').getTime();
			default:
				return a.title.localeCompare(b.title);
		}
	});

	return (
		<main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
			<div className="container mx-auto px-4">
				<div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Categories & Ads */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4 space-y-6">
              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">{t('books.category')}</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`block w-full text-right rtl:text-right ltr:text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {t(category.key)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ad Space */}
              <div className="bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg h-[300px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 p-4 transition-colors duration-300">
                <span className="text-4xl mb-2">📢</span>
                <span className="text-center font-medium">شوێنی ریکلام</span>
                <span className="text-xs text-center mt-2">(Ad Space)</span>
              </div>
            </div>
          </div>					{/* Main Content */}
					<div className="flex-1">
						{/* Header */}
						<div className="mb-8">
							<h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{t('nav.books')}</h1>
							<p className="text-gray-600 dark:text-gray-400">{t('books.subtitle')}</p>
						</div>

						{/* Filters */}
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-300">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{/* Category Filter */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										{t('books.category')}
									</label>
									<select
										value={selectedCategory}
										onChange={(e) => setSelectedCategory(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
									>
										{categories.map(category => (
											<option key={category.id} value={category.id}>
												{t(category.key)}
											</option>
										))}
									</select>
								</div>

								{/* Search */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										{t('books.search')}
									</label>
									<input
										type="text"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										placeholder={t('books.searchPlaceholder')}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
									/>
								</div>

								{/* Sort */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										{t('books.sortBy')}
									</label>
									<select
										value={sortBy}
										onChange={(e) => setSortBy(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
									>
										<option value="title">{t('books.sortName')}</option>
										<option value="price">{t('books.sortPrice')}</option>
										<option value="rating">{t('books.sortRating')}</option>
										<option value="year">{t('books.sortYear')}</option>
									</select>
								</div>
							</div>
						</div>

						{/* Results Count */}
						<div className="mb-6">
							<p className="text-gray-600 dark:text-gray-400">
								{t('books.found')} {sortedBooks.length}
							</p>
						</div>

						{/* Books Grid */}
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
							{sortedBooks.map((book) => (
								<BookCard key={book.id} book={book} />
							))}
						</div>

						{/* No Results */}
						{sortedBooks.length === 0 && (
							<div className="text-center py-12">
								<div className="text-6xl mb-4">📚</div>
								<h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{t('books.noResults')}</h3>
								<p className="text-gray-600 dark:text-gray-400">{t('books.noResultsMessage')}</p>
							</div>
						)}
					</div>

          {/* Right Sidebar - Offers & Recommendations */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4 space-y-6">
              {/* Special Offers */}
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
                <div className="text-3xl mb-3">🔥</div>
                <h3 className="text-xl font-bold mb-2">تخفیفی تایبەت!</h3>
                <p className="text-sm mb-4 opacity-90">تا ٥٠٪ داشکاندن لەسەر کتابە هەڵبژێردراوەکان</p>
                <button
                  onClick={() => {
                    setSortBy('price');
                    // You might want to add a filter for discounted items here
                  }}
                  className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block text-sm w-full text-center"
                >
                  بینینی تخفیفەکان
                </button>
              </div>

              {/* Recommended Books */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors duration-300">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <span>⭐</span>
                  کتابی پێشنیارکراو
                </h3>
                <div className="space-y-4">
                  {books.filter(b => b.rating >= 4.5).slice(0, 3).map((book) => (
                    <Link
                      key={book.id}
                      href={`/book/${book.id}`}
                      className="flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                    >
                      <div className="w-12 h-16 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {book.image ? (
                          <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
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

              {/* Newsletter / Ad */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-900/30 transition-colors duration-300">
                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">ئاگاداری نوێترینەکان بە</h3>
                <p className="text-xs text-blue-600 dark:text-blue-300 mb-4">تۆمار بکە بۆ وەرگرتنی هەواڵی نوێترین کتێبەکان</p>
                <input 
                  type="email" 
                  placeholder="ئیمەیڵەکەت بنووسە" 
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  تۆمارکردن
                </button>
              </div>
            </div>
          </div>
				</div>
			</div>
		</main>
	);
}