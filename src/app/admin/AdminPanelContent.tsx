'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { books, authors } from '@/data/books';
import { Book, Author } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { adminDataService, AdminBook, AdminAuthor } from '@/lib/adminDataService';
import { Plus, Edit, Trash2, Users, BookOpen, TrendingUp, Eye, LogOut, Search, Upload } from 'lucide-react';

export default function AdminPanelContent() {
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
          {recentBooks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {currentLanguage === 'ku' ? 'هیچ چالاکیەک نییە' : currentLanguage === 'en' ? 'No recent activity' : 'Keine aktuellen Aktivitäten'}
            </p>
          ) : (
            recentBooks.map((book) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Books Tab Component - Simple version
function BooksTab({ books, onDataChange }: { books: AdminBook[]; onDataChange: () => void }) {
  const { currentLanguage } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {currentLanguage === 'ku' ? 'بەڕێوەبردنی کتابەکان' : currentLanguage === 'en' ? 'Manage Books' : 'Bücher Verwalten'}
        </h2>
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

      {/* Add Book Form */}
      {showAddForm && (
        <AddBookForm 
          onClose={() => setShowAddForm(false)}
          onSave={() => {
            setShowAddForm(false);
            onDataChange();
          }}
        />
      )}

      {/* Books List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {books.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">
              {currentLanguage === 'ku' ? 'هیچ کتابێک نەدۆزرایەوە' : currentLanguage === 'en' ? 'No books found' : 'Keine Bücher gefunden'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <div key={book.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                <p className="font-bold text-blue-600">{formatPrice(book.price)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Authors Tab Component - Simple version
function AuthorsTab({ authors, onDataChange }: { authors: AdminAuthor[]; onDataChange: () => void }) {
  const { currentLanguage } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {currentLanguage === 'ku' ? 'بەڕێوەبردنی نووسەران' : currentLanguage === 'en' ? 'Manage Authors' : 'Autoren Verwalten'}
        </h2>
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

      {/* Add Author Form */}
      {showAddForm && (
        <AddAuthorForm 
          onClose={() => setShowAddForm(false)}
          onSave={() => {
            setShowAddForm(false);
            onDataChange();
          }}
        />
      )}

      {/* Authors List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {authors.length === 0 ? (
          <div className="text-center py-8">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">
              {currentLanguage === 'ku' ? 'هیچ نووسەرێک نەدۆزرایەوە' : currentLanguage === 'en' ? 'No authors found' : 'Keine Autoren gefunden'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {authors.map((author) => (
              <div key={author.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {currentLanguage === 'ku' ? author.name : (author.latinName || author.name)}
                </h3>
                {author.birthYear && (
                  <p className="text-sm text-gray-600">
                    {author.deathYear ? `${author.birthYear}-${author.deathYear}` : author.birthYear}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Simple Add Book Form
function AddBookForm({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    price: '',
    description: '',
    category: 'literature',
    language: 'kurdish',
    inStock: true,
    featured: false,
    bestseller: false,
    newRelease: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookData = {
      title: formData.title,
      author: formData.author,
      publisher: formData.publisher,
      price: parseFloat(formData.price),
      description: formData.description,
      category: formData.category,
      language: formData.language,
      tags: [],
      inStock: formData.inStock,
      featured: formData.featured,
      bestseller: formData.bestseller,
      newRelease: formData.newRelease
    };

    try {
      adminDataService.addBook(bookData);
      alert(currentLanguage === 'ku' ? 'کتاب زیادکرا!' : currentLanguage === 'en' ? 'Book added!' : 'Buch hinzugefügt!');
      onSave();
    } catch (error) {
      alert(currentLanguage === 'ku' ? 'هەڵەیەک ڕوویدا!' : currentLanguage === 'en' ? 'An error occurred!' : 'Ein Fehler ist aufgetreten!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {currentLanguage === 'ku' ? 'کتابی نوێ زیاد بکە' : currentLanguage === 'en' ? 'Add New Book' : 'Neues Buch Hinzufügen'}
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
            {currentLanguage === 'ku' ? 'زیادکردن' : currentLanguage === 'en' ? 'Add Book' : 'Buch Hinzufügen'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Simple Add Author Form
function AddAuthorForm({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    latinName: '',
    birthYear: '',
    deathYear: '',
    nationality: '',
    biographyKu: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const authorData = {
      name: formData.name,
      latinName: formData.latinName,
      birthYear: formData.birthYear ? parseInt(formData.birthYear) : undefined,
      deathYear: formData.deathYear ? parseInt(formData.deathYear) : undefined,
      nationality: formData.nationality,
      biographyKu: formData.biographyKu
    };

    try {
      adminDataService.addAuthor(authorData);
      alert(currentLanguage === 'ku' ? 'نووسەر زیادکرا!' : currentLanguage === 'en' ? 'Author added!' : 'Autor hinzugefügt!');
      onSave();
    } catch (error) {
      alert(currentLanguage === 'ku' ? 'هەڵەیەک ڕوویدا!' : currentLanguage === 'en' ? 'An error occurred!' : 'Ein Fehler ist aufgetreten!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {currentLanguage === 'ku' ? 'نووسەری نوێ زیاد بکە' : currentLanguage === 'en' ? 'Add New Author' : 'Neuen Autor Hinzufügen'}
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
            {currentLanguage === 'ku' ? 'زیادکردن' : currentLanguage === 'en' ? 'Add Author' : 'Autor Hinzufügen'}
          </button>
        </div>
      </form>
    </div>
  );
}