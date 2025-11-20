'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { books, authors } from '@/data/books';
import { Book, Author } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { adminDataService, AdminBook, AdminAuthor } from '@/lib/adminDataService';
import { Plus, Edit, Trash2, Users, BookOpen, TrendingUp, Eye, LogOut, Search, Upload } from 'lucide-react';

export default function AdminPage() {
  const { t, currentLanguage } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminBooks, setAdminBooks] = useState<AdminBook[]>([]);
  const [adminAuthors, setAdminAuthors] = useState<AdminAuthor[]>([]);
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalAuthors: 0,
    totalReviews: 0,
    averageRating: '0.0'
  });

  // Check authentication and load data
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in');
    if (isAdminLoggedIn !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadAdminData();
    }
  }, [router]);

  const loadAdminData = () => {
    const booksData = adminDataService.getAllBooks();
    const authorsData = adminDataService.getAllAuthors();
    const statsData = adminDataService.getStats();
    
    setAdminBooks(booksData);
    setAdminAuthors(authorsData);
    setStats(statsData);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    router.push('/admin/login');
  };

  // Show loading while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">
            {currentLanguage === 'ku' ? 'چاوەڕوان بە...' : currentLanguage === 'en' ? 'Loading...' : 'Laden...'}
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'authors', label: 'Authors', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">
                {currentLanguage === 'ku' ? 'پانێڵی بەڕێوەبەر' : currentLanguage === 'en' ? 'Admin Panel' : 'Admin Panel'}
              </h1>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="text-sm text-gray-600">
                {currentLanguage === 'ku' ? 'بەخێربێیت بەڕێوەبەر' : currentLanguage === 'en' ? 'Welcome Admin' : 'Willkommen Admin'}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 rtl:space-x-reverse text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut size={16} />
                <span className="text-sm">
                  {currentLanguage === 'ku' ? 'دەرچوون' : currentLanguage === 'en' ? 'Logout' : 'Abmelden'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-md p-4 h-fit">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg text-left rtl:text-right transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 ml-8 rtl:ml-0 rtl:mr-8">
            {activeTab === 'dashboard' && <DashboardTab stats={stats} recentBooks={adminBooks.slice(0, 5)} />}
            {activeTab === 'books' && <BooksTab books={adminBooks} onDataChange={loadAdminData} />}
            {activeTab === 'authors' && <AuthorsTab authors={adminAuthors} onDataChange={loadAdminData} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Tab Component
function DashboardTab({ stats, recentBooks }: { stats: any; recentBooks: AdminBook[] }) {
  const { currentLanguage } = useLanguage();
  
  const statCards = [
    {
      title: currentLanguage === 'ku' ? 'کتابەکان' : currentLanguage === 'en' ? 'Total Books' : 'Bücher Gesamt',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: currentLanguage === 'ku' ? 'نووسەران' : currentLanguage === 'en' ? 'Authors' : 'Autoren',
      value: stats.totalAuthors, 
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: currentLanguage === 'ku' ? 'نرخاندنەکان' : currentLanguage === 'en' ? 'Reviews' : 'Bewertungen',
      value: stats.totalReviews,
      icon: Eye,
      color: 'bg-purple-500'
    },
    {
      title: currentLanguage === 'ku' ? 'ڕێژەی نرخاندن' : currentLanguage === 'en' ? 'Avg Rating' : 'Durchschnitt',
      value: stats.averageRating,
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {currentLanguage === 'ku' ? 'داشبۆرد' : currentLanguage === 'en' ? 'Dashboard' : 'Dashboard'}
      </h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {currentLanguage === 'ku' ? 'چالاکیە تازەکان' : currentLanguage === 'en' ? 'Recent Activity' : 'Neueste Aktivitäten'}
        </h3>
        <div className="space-y-3">
          {recentBooks.map((book) => (
            <div key={book.id} className="flex items-center space-x-4 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
              <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center">
                <BookOpen size={16} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{book.title}</p>
                <p className="text-sm text-gray-600">{book.author}</p>
              </div>
              <div className="text-right rtl:text-left">
                <p className="font-bold text-blue-600">{formatPrice(book.price)}</p>
                <p className="text-sm text-gray-500">⭐ {book.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Books Tab Component
function BooksTab({ books, onDataChange }: { books: AdminBook[]; onDataChange: () => void }) {
  const { currentLanguage } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBook, setEditingBook] = useState<AdminBook | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleDeleteBook = (bookId: string) => {
    if (confirm(currentLanguage === 'ku' ? 'دڵنیایت لە سڕینەوەی ئەم کتابە؟' : currentLanguage === 'en' ? 'Are you sure you want to delete this book?' : 'Sind Sie sicher, dass Sie dieses Buch löschen möchten?')) {
      adminDataService.deleteBook(bookId);
      onDataChange();
    }
  };

  const filteredBooks = searchQuery 
    ? adminDataService.searchBooks(searchQuery)
    : books;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {currentLanguage === 'ku' ? 'بەڕێوەبردنی کتابەکان' : currentLanguage === 'en' ? 'Manage Books' : 'Bücher Verwalten'}
        </h2>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="relative">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={currentLanguage === 'ku' ? 'گەڕان لە کتابەکاندا...' : currentLanguage === 'en' ? 'Search books...' : 'Bücher suchen...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rtl:pl-3 rtl:pr-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 rtl:space-x-reverse bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>
              {currentLanguage === 'ku' ? 'کتابی نوێ' : currentLanguage === 'en' ? 'Add Book' : 'Buch Hinzufügen'}
            </span>
          </button>
        </div>
      </div>

      {/* Add/Edit Book Form */}
      {(showAddForm || editingBook) && (
        <AddBookForm 
          book={editingBook}
          onClose={() => {
            setShowAddForm(false);
            setEditingBook(null);
          }}
          onSave={() => {
            setShowAddForm(false);
            setEditingBook(null);
            onDataChange();
          }}
        />
      )}

      {/* Books List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredBooks.length === 0 ? (
          <div className="p-8 text-center">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">
              {currentLanguage === 'ku' ? 'هیچ کتابێک نەدۆزرایەوە' : currentLanguage === 'en' ? 'No books found' : 'Keine Bücher gefunden'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ku' ? 'کتاب' : currentLanguage === 'en' ? 'Book' : 'Buch'}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ku' ? 'نووسەر' : currentLanguage === 'en' ? 'Author' : 'Autor'}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ku' ? 'نرخ' : currentLanguage === 'en' ? 'Price' : 'Preis'}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ku' ? 'نرخاندن' : currentLanguage === 'en' ? 'Rating' : 'Bewertung'}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ku' ? 'کردارەکان' : currentLanguage === 'en' ? 'Actions' : 'Aktionen'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                          {book.imageUrl ? (
                            <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover rounded" />
                          ) : (
                            <BookOpen size={16} className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{book.title}</div>
                          <div className="text-sm text-gray-500">{book.category}</div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                            {book.featured && <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">Featured</span>}
                            {book.bestseller && <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Bestseller</span>}
                            {book.newRelease && <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">New</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                      {formatPrice(book.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ⭐ {book.rating} ({book.reviewCount})
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <button 
                          onClick={() => setEditingBook(book)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title={currentLanguage === 'ku' ? 'دەستکاری' : currentLanguage === 'en' ? 'Edit' : 'Bearbeiten'}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteBook(book.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title={currentLanguage === 'ku' ? 'سڕینەوە' : currentLanguage === 'en' ? 'Delete' : 'Löschen'}
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
}

// Authors Tab Component  
function AuthorsTab({ authors, onDataChange }: { authors: AdminAuthor[]; onDataChange: () => void }) {
  const { currentLanguage } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<AdminAuthor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleDeleteAuthor = (authorId: string) => {
    if (confirm(currentLanguage === 'ku' ? 'دڵنیایت لە سڕینەوەی ئەم نووسەرە؟' : currentLanguage === 'en' ? 'Are you sure you want to delete this author?' : 'Sind Sie sicher, dass Sie diesen Autor löschen möchten?')) {
      adminDataService.deleteAuthor(authorId);
      onDataChange();
    }
  };

  const filteredAuthors = searchQuery 
    ? adminDataService.searchAuthors(searchQuery)
    : authors;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {currentLanguage === 'ku' ? 'بەڕێوەبردنی نووسەران' : currentLanguage === 'en' ? 'Manage Authors' : 'Autoren Verwalten'}
        </h2>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="relative">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={currentLanguage === 'ku' ? 'گەڕان لە نووسەراندا...' : currentLanguage === 'en' ? 'Search authors...' : 'Autoren suchen...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rtl:pl-3 rtl:pr-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 rtl:space-x-reverse bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={20} />
            <span>
              {currentLanguage === 'ku' ? 'نووسەری نوێ' : currentLanguage === 'en' ? 'Add Author' : 'Autor Hinzufügen'}
            </span>
          </button>
        </div>
      </div>

      {/* Add/Edit Author Form */}
      {(showAddForm || editingAuthor) && (
        <AddAuthorForm 
          author={editingAuthor}
          onClose={() => {
            setShowAddForm(false);
            setEditingAuthor(null);
          }}
          onSave={() => {
            setShowAddForm(false);
            setEditingAuthor(null);
            onDataChange();
          }}
        />
      )}

      {/* Authors Grid */}
      {filteredAuthors.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">
            {currentLanguage === 'ku' ? 'هیچ نووسەرێک نەدۆزرایەوە' : currentLanguage === 'en' ? 'No authors found' : 'Keine Autoren gefunden'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuthors.map((author) => {
            const authorBooks = books.filter(book => book.author === author.name);
            return (
              <div key={author.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                    {author.imageUrl ? (
                      <img src={author.imageUrl} alt={author.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-xl font-bold">
                        {(currentLanguage === 'ku' ? author.name : (author.latinName || author.name)).charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {authorBooks.length} {currentLanguage === 'ku' ? 'کتاب' : currentLanguage === 'en' ? 'books' : 'Bücher'}
                    </p>
                    {author.nationality && (
                      <p className="text-xs text-gray-500">{author.nationality}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {author.birthYear && (
                      <span>{author.deathYear ? `${author.birthYear}-${author.deathYear}` : author.birthYear}</span>
                    )}
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <button 
                      onClick={() => setEditingAuthor(author)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title={currentLanguage === 'ku' ? 'دەستکاری' : currentLanguage === 'en' ? 'Edit' : 'Bearbeiten'}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteAuthor(author.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title={currentLanguage === 'ku' ? 'سڕینەوە' : currentLanguage === 'en' ? 'Delete' : 'Löschen'}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Add Book Form Component
function AddBookForm({ book, onClose, onSave }: { 
  book?: AdminBook | null; 
  onClose: () => void; 
  onSave: () => void; 
}) {
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    publisher: book?.publisher || '',
    price: book?.price?.toString() || '',
    originalPrice: book?.originalPrice?.toString() || '',
    description: book?.description || '',
    isbn: book?.isbn || '',
    pages: book?.pages?.toString() || '',
    language: book?.language || 'kurdish',
    category: book?.category || 'literature',
    tags: book?.tags?.join(', ') || '',
    publishedDate: book?.publishedDate || '',
    inStock: book?.inStock ?? true,
    featured: book?.featured || false,
    bestseller: book?.bestseller || false,
    newRelease: book?.newRelease || false,
    imageUrl: book?.imageUrl || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookData = {
      title: formData.title,
      author: formData.author,
      publisher: formData.publisher,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      description: formData.description,
      isbn: formData.isbn,
      pages: formData.pages ? parseInt(formData.pages) : undefined,
      language: formData.language,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      publishedDate: formData.publishedDate,
      inStock: formData.inStock,
      featured: formData.featured,
      bestseller: formData.bestseller,
      newRelease: formData.newRelease,
      imageUrl: formData.imageUrl
    };

    try {
      if (book) {
        // Update existing book
        adminDataService.updateBook(book.id, bookData);
        alert(currentLanguage === 'ku' ? 'کتاب نوێکرایەوە!' : currentLanguage === 'en' ? 'Book updated!' : 'Buch aktualisiert!');
      } else {
        // Add new book
        adminDataService.addBook(bookData);
        alert(currentLanguage === 'ku' ? 'کتاب زیادکرا!' : currentLanguage === 'en' ? 'Book added!' : 'Buch hinzugefügt!');
      }
      onSave();
    } catch (error) {
      alert(currentLanguage === 'ku' ? 'هەڵەیەک ڕوویدا!' : currentLanguage === 'en' ? 'An error occurred!' : 'Ein Fehler ist aufgetreten!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {book ? 
          (currentLanguage === 'ku' ? 'دەستکاری کتاب' : currentLanguage === 'en' ? 'Edit Book' : 'Buch Bearbeiten') :
          (currentLanguage === 'ku' ? 'کتابی نوێ زیاد بکە' : currentLanguage === 'en' ? 'Add New Book' : 'Neues Buch Hinzufügen')
        }
      </h3>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'ناونیشان' : currentLanguage === 'en' ? 'Title' : 'Titel'}
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'نووسەر' : currentLanguage === 'en' ? 'Author' : 'Autor'}
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'چاپخانە' : currentLanguage === 'en' ? 'Publisher' : 'Verlag'}
          </label>
          <input
            type="text"
            value={formData.publisher}
            onChange={(e) => setFormData({...formData, publisher: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'نرخ (یۆرۆ)' : currentLanguage === 'en' ? 'Price (EUR)' : 'Preis (EUR)'}
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'پۆل' : currentLanguage === 'en' ? 'Category' : 'Kategorie'}
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="literature">Literature</option>
            <option value="poetry">Poetry</option>
            <option value="history">History</option>
            <option value="children">Children</option>
            <option value="education">Education</option>
            <option value="science">Science</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'لاپەڕەکان' : currentLanguage === 'en' ? 'Pages' : 'Seiten'}
          </label>
          <input
            type="number"
            value={formData.pages}
            onChange={(e) => setFormData({...formData, pages: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'لینکی وێنە' : currentLanguage === 'en' ? 'Image URL' : 'Bild URL'}
          </label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'وهسف' : currentLanguage === 'en' ? 'Description' : 'Beschreibung'}
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Checkboxes */}
        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="mr-2 rtl:mr-0 rtl:ml-2"
              />
              <span className="text-sm">{currentLanguage === 'ku' ? 'تایبەت' : currentLanguage === 'en' ? 'Featured' : 'Empfohlen'}</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.bestseller}
                onChange={(e) => setFormData({...formData, bestseller: e.target.checked})}
                className="mr-2 rtl:mr-0 rtl:ml-2"
              />
              <span className="text-sm">{currentLanguage === 'ku' ? 'باشترین فرۆش' : currentLanguage === 'en' ? 'Bestseller' : 'Bestseller'}</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.newRelease}
                onChange={(e) => setFormData({...formData, newRelease: e.target.checked})}
                className="mr-2 rtl:mr-0 rtl:ml-2"
              />
              <span className="text-sm">{currentLanguage === 'ku' ? 'نوێ' : currentLanguage === 'en' ? 'New Release' : 'Neu'}</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                className="mr-2 rtl:mr-0 rtl:ml-2"
              />
              <span className="text-sm">{currentLanguage === 'ku' ? 'بەردەستە' : currentLanguage === 'en' ? 'In Stock' : 'Verfügbar'}</span>
            </label>
          </div>
        </div>
        
        <div className="md:col-span-2 flex justify-end space-x-4 rtl:space-x-reverse">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {currentLanguage === 'ku' ? 'پاشگەزبوونەوە' : currentLanguage === 'en' ? 'Cancel' : 'Abbrechen'}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {book ? 
              (currentLanguage === 'ku' ? 'نوێکردنەوە' : currentLanguage === 'en' ? 'Update Book' : 'Buch Aktualisieren') :
              (currentLanguage === 'ku' ? 'زیادکردن' : currentLanguage === 'en' ? 'Add Book' : 'Buch Hinzufügen')
            }
          </button>
        </div>
      </form>
    </div>
  );
}

// Add Author Form Component
function AddAuthorForm({ author, onClose, onSave }: { 
  author?: AdminAuthor | null; 
  onClose: () => void; 
  onSave: () => void; 
}) {
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    name: author?.name || '',
    latinName: author?.latinName || '',
    birthYear: author?.birthYear?.toString() || '',
    deathYear: author?.deathYear?.toString() || '',
    nationality: author?.nationality || '',
    biographyKu: author?.biographyKu || '',
    biographyEn: author?.biographyEn || '',
    biographyDe: author?.biographyDe || '',
    imageUrl: author?.imageUrl || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const authorData = {
      name: formData.name,
      latinName: formData.latinName,
      birthYear: formData.birthYear ? parseInt(formData.birthYear) : undefined,
      deathYear: formData.deathYear ? parseInt(formData.deathYear) : undefined,
      nationality: formData.nationality,
      biographyKu: formData.biographyKu,
      biographyEn: formData.biographyEn,
      biographyDe: formData.biographyDe,
      imageUrl: formData.imageUrl
    };

    try {
      if (author) {
        // Update existing author
        adminDataService.updateAuthor(author.id, authorData);
        alert(currentLanguage === 'ku' ? 'نووسەر نوێکرایەوە!' : currentLanguage === 'en' ? 'Author updated!' : 'Autor aktualisiert!');
      } else {
        // Add new author
        adminDataService.addAuthor(authorData);
        alert(currentLanguage === 'ku' ? 'نووسەر زیادکرا!' : currentLanguage === 'en' ? 'Author added!' : 'Autor hinzugefügt!');
      }
      onSave();
    } catch (error) {
      alert(currentLanguage === 'ku' ? 'هەڵەیەک ڕوویدا!' : currentLanguage === 'en' ? 'An error occurred!' : 'Ein Fehler ist aufgetreten!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {author ? 
          (currentLanguage === 'ku' ? 'دەستکاری نووسەر' : currentLanguage === 'en' ? 'Edit Author' : 'Autor Bearbeiten') :
          (currentLanguage === 'ku' ? 'نووسەری نوێ زیاد بکە' : currentLanguage === 'en' ? 'Add New Author' : 'Neuen Autor Hinzufügen')
        }
      </h3>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'ناو (کوردی)' : currentLanguage === 'en' ? 'Name (Kurdish)' : 'Name (Kurdisch)'}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'ناو (لاتینی)' : currentLanguage === 'en' ? 'Name (Latin)' : 'Name (Lateinisch)'}
          </label>
          <input
            type="text"
            value={formData.latinName}
            onChange={(e) => setFormData({...formData, latinName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'ساڵی لەدایکبوون' : currentLanguage === 'en' ? 'Birth Year' : 'Geburtsjahr'}
          </label>
          <input
            type="number"
            value={formData.birthYear}
            onChange={(e) => setFormData({...formData, birthYear: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'ساڵی مردن (ئاپشناڵ)' : currentLanguage === 'en' ? 'Death Year (Optional)' : 'Todesjahr (Optional)'}
          </label>
          <input
            type="number"
            value={formData.deathYear}
            onChange={(e) => setFormData({...formData, deathYear: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'نیتیوە' : currentLanguage === 'en' ? 'Nationality' : 'Nationalität'}
          </label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => setFormData({...formData, nationality: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'لینکی وێنە' : currentLanguage === 'en' ? 'Image URL' : 'Bild URL'}
          </label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'بیۆگرافی (کوردی)' : currentLanguage === 'en' ? 'Biography (Kurdish)' : 'Biografie (Kurdisch)'}
          </label>
          <textarea
            rows={3}
            value={formData.biographyKu}
            onChange={(e) => setFormData({...formData, biographyKu: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'بیۆگرافی (ئینگلیزی)' : currentLanguage === 'en' ? 'Biography (English)' : 'Biografie (Englisch)'}
          </label>
          <textarea
            rows={3}
            value={formData.biographyEn}
            onChange={(e) => setFormData({...formData, biographyEn: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ku' ? 'بیۆگرافی (ئاڵمانی)' : currentLanguage === 'en' ? 'Biography (German)' : 'Biografie (Deutsch)'}
          </label>
          <textarea
            rows={3}
            value={formData.biographyDe}
            onChange={(e) => setFormData({...formData, biographyDe: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div className="md:col-span-2 flex justify-end space-x-4 rtl:space-x-reverse">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {currentLanguage === 'ku' ? 'پاشگەزبوونەوە' : currentLanguage === 'en' ? 'Cancel' : 'Abbrechen'}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {author ? 
              (currentLanguage === 'ku' ? 'نوێکردنەوە' : currentLanguage === 'en' ? 'Update Author' : 'Autor Aktualisieren') :
              (currentLanguage === 'ku' ? 'زیادکردن' : currentLanguage === 'en' ? 'Add Author' : 'Autor Hinzufügen')
            }
          </button>
        </div>
      </form>
    </div>
  );
}