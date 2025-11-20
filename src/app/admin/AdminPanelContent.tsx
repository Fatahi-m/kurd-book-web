'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';
import { adminDataService, AdminBook, AdminAuthor } from '@/lib/adminDataService';
import { Plus, Edit, Trash2, Users, BookOpen, TrendingUp, Eye, LogOut, Search } from 'lucide-react';
import EditBookForm from './EditBookForm';
import AddBookForm from './AddBookForm';

export default function AdminPanelContent() {
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [books, setBooks] = useState<AdminBook[]>([]);
  const [authors, setAuthors] = useState<AdminAuthor[]>([]);
  const [editingBook, setEditingBook] = useState<AdminBook | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const booksData = adminDataService.getAllBooks();
    const authorsData = adminDataService.getAllAuthors();
    setBooks(booksData);
    setAuthors(authorsData);
  };

  const handleEditBook = (book: AdminBook) => {
    setEditingBook(book);
  };

  const handleDeleteBook = (id: string) => {
    if (confirm(currentLanguage === 'ku' ? 'دەتەوێت ئەم کتابە بسڕیت؟' : 'Are you sure you want to delete this book?')) {
      adminDataService.deleteBook(id);
      loadData();
    }
  };

  const stats = adminDataService.getStats();

  const renderTabs = () => (
    <div className="flex border-b border-gray-200 mb-4 md:mb-6 overflow-x-auto">
      {[
        { id: 'dashboard', label: currentLanguage === 'ku' ? 'سەرەکی' : 'Dashboard', icon: TrendingUp },
        { id: 'books', label: currentLanguage === 'ku' ? 'کتابەکان' : 'Books', icon: BookOpen },
        { id: 'authors', label: currentLanguage === 'ku' ? 'نووسەران' : 'Authors', icon: Users }
      ].map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse px-3 md:px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <tab.icon size={16} className="md:w-5 md:h-5" />
          <span className="text-sm md:text-base">{tab.label}</span>
        </button>
      ))}
    </div>
  );

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-600">
              {currentLanguage === 'ku' ? 'کۆی کتابەکان' : 'Total Books'}
            </p>
            <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.totalBooks}</p>
          </div>
          <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
        </div>
      </div>
      
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-600">
              {currentLanguage === 'ku' ? 'کۆی نووسەران' : 'Total Authors'}
            </p>
            <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.totalAuthors}</p>
          </div>
          <Users className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
        </div>
      </div>
    </div>
  );

  const renderBooks = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          {currentLanguage === 'ku' ? 'بەڕێوەبردنی کتابەکان' : 'Manage Books'}
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
        >
          <Plus size={16} className="md:w-5 md:h-5 mr-1 md:mr-2 rtl:mr-0 rtl:ml-1 md:rtl:ml-2" />
          <span className="hidden sm:inline">{currentLanguage === 'ku' ? 'کتابی نوێ زیاد بکە' : 'Add New Book'}</span>
          <span className="sm:hidden">{currentLanguage === 'ku' ? 'زیادکردن' : 'Add'}</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {books.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">
              {currentLanguage === 'ku' ? 'هیچ کتابێک نەدۆزرایەوە' : 'No books found'}
            </p>
          </div>
          ) : (
            <div className="block md:hidden">
              {/* Mobile Cards View */}
              <div className="space-y-4">
                {books.map((book) => (
                  <div key={book.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3 rtl:space-x-reverse">
                      <div className="flex-shrink-0 h-16 w-12">
                        {book.imageUrl ? (
                          <img className="h-16 w-12 object-cover rounded" src={book.imageUrl} alt={book.title} />
                        ) : (
                          <div className="h-16 w-12 bg-gray-200 rounded flex items-center justify-center">
                            <BookOpen size={20} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{book.title}</div>
                        <div className="text-xs text-gray-500">{book.author}</div>
                        <div className="text-xs text-gray-500">{book.category}</div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="text-sm font-bold text-blue-600">{formatPrice(book.price)}</div>
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <button
                              onClick={() => handleEditBook(book)}
                              className="text-indigo-600 hover:text-indigo-900 p-1"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteBook(book.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            (book.inventoryCount || 0) > 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {(book.inventoryCount || 0) > 0 
                              ? `${book.inventoryCount}`
                              : currentLanguage === 'ku' ? 'نییە' : 'Out'
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) && (
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ku' ? 'کتاب' : 'Book'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ku' ? 'نووسەر' : 'Author'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ku' ? 'نرخ' : 'Price'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ku' ? 'موجودی' : 'Stock'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ku' ? 'کردار' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.map((book) => (
                  <tr key={book.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-8">
                          {book.imageUrl ? (
                            <img className="h-12 w-8 object-cover rounded" src={book.imageUrl} alt={book.title} />
                          ) : (
                            <div className="h-12 w-8 bg-gray-200 rounded flex items-center justify-center">
                              <BookOpen size={16} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4 rtl:ml-0 rtl:mr-4">
                          <div className="text-sm font-medium text-gray-900">{book.title}</div>
                          <div className="text-sm text-gray-500">{book.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPrice(book.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        (book.inventoryCount || 0) > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {(book.inventoryCount || 0) > 0 
                          ? `${book.inventoryCount} ${currentLanguage === 'ku' ? 'دەدان' : 'in stock'}`
                          : currentLanguage === 'ku' ? 'موجود نییە' : 'Out of stock'
                        }
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <button
                          onClick={() => handleEditBook(book)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderAuthors = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {currentLanguage === 'ku' ? 'بەڕێوەبردنی نووسەران' : 'Manage Authors'}
        </h2>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {authors.length === 0 ? (
          <div className="text-center py-8">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">
              {currentLanguage === 'ku' ? 'هیچ نووسەرێک نەدۆزرایەوە' : 'No authors found'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {authors.map((author) => (
              <div key={author.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{author.name}</h3>
                <p className="text-sm text-gray-600">{author.nationality}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">
              {currentLanguage === 'ku' ? 'پەنڵی بەڕێوەبەر' : 'Admin Panel'}
            </h1>
            <button
              onClick={() => router.push('/')}
              className="flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-gray-600 hover:text-gray-900"
            >
              <LogOut size={18} className="md:w-5 md:h-5" />
              <span className="text-sm md:text-base hidden sm:inline">{currentLanguage === 'ku' ? 'گەڕانەوە' : 'Back to Site'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {renderTabs()}
        
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'books' && renderBooks()}
        {activeTab === 'authors' && renderAuthors()}
      </div>

      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <EditBookForm
              book={editingBook}
              onClose={() => setEditingBook(null)}
              onSave={() => {
                setEditingBook(null);
                loadData();
              }}
            />
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <AddBookForm
              onClose={() => setShowAddForm(false)}
              onSave={() => {
                setShowAddForm(false);
                loadData();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}