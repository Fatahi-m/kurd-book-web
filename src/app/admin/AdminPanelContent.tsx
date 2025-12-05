'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';
import { adminDataService, AdminBook, AdminAuthor, AdminTranslator, AdminOrder } from '@/lib/adminDataService';
import { Review } from '@/contexts/ReviewContext';
import { 
  Plus, Edit, Trash2, Users, BookOpen, TrendingUp, 
  LogOut, Search, ShoppingBag, DollarSign, Menu, X,
  Bell, Settings, ChevronRight, Package, CheckCircle, Clock, XCircle, Eye, MessageSquare, Languages
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import EditBookForm from './EditBookForm';
import AddBookForm from './AddBookForm';
import AuthorForm from './AuthorForm';
import TranslatorForm from './TranslatorForm';

export default function AdminPanelContent() {
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [books, setBooks] = useState<AdminBook[]>([]);
  const [authors, setAuthors] = useState<AdminAuthor[]>([]);
  const [translators, setTranslators] = useState<AdminTranslator[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [viewingOrder, setViewingOrder] = useState<AdminOrder | null>(null);
  const [editingBook, setEditingBook] = useState<AdminBook | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<AdminAuthor | null>(null);
  const [showAddAuthorForm, setShowAddAuthorForm] = useState(false);
  const [editingTranslator, setEditingTranslator] = useState<AdminTranslator | null>(null);
  const [showAddTranslatorForm, setShowAddTranslatorForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
    // Auto-close sidebar on mobile
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  const loadData = () => {
    const booksData = adminDataService.getAllBooks();
    const authorsData = adminDataService.getAllAuthors();
    const translatorsData = adminDataService.getAllTranslators();
    const ordersData = adminDataService.getAllOrders();
    setBooks(booksData);
    setAuthors(authorsData);
    setTranslators(translatorsData);
    setOrders(ordersData);
    
    // Load reviews
    const storedReviews = localStorage.getItem('kurd-book-reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
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

  const handleDeleteAuthor = (id: string) => {
    if (confirm(currentLanguage === 'ku' ? 'دەتەوێت ئەم نووسەرە بسڕیت؟' : 'Are you sure you want to delete this author?')) {
      adminDataService.deleteAuthor(id);
      loadData();
    }
  };

  const handleDeleteTranslator = (id: string) => {
    if (confirm(currentLanguage === 'ku' ? 'دەتەوێت ئەم وەرگێڕە بسڕیت؟' : 'Are you sure you want to delete this translator?')) {
      adminDataService.deleteTranslator(id);
      loadData();
    }
  };

  const handleOrderStatus = (id: string, status: AdminOrder['status']) => {
    adminDataService.updateOrderStatus(id, status);
    loadData();
  };

  const handleDeleteReview = (id: string) => {
    if (confirm(currentLanguage === 'ku' ? 'دەتەوێت ئەم پێداچوونەوەیە بسڕیت؟' : 'Are you sure you want to delete this review?')) {
      const updatedReviews = reviews.filter(r => r.id !== id);
      setReviews(updatedReviews);
      localStorage.setItem('kurd-book-reviews', JSON.stringify(updatedReviews));
    }
  };

  const stats = adminDataService.getStats();
  
  // Filter books based on search
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SidebarItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        if (window.innerWidth < 1024) setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 mx-2 rounded-lg transition-all duration-200 group mb-1 ${
        activeTab === id
          ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
      }`}
      style={{ width: 'calc(100% - 16px)' }}
    >
      <Icon size={20} className={activeTab === id ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'} />
      <span className={`font-medium text-sm ${activeTab === id ? 'font-bold' : ''}`}>{label}</span>
      {activeTab === id && (
        <ChevronRight size={16} className="ml-auto rtl:mr-auto rtl:ml-0 text-white opacity-75" />
      )}
    </button>
  );

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}>
          <Icon size={24} className={color.replace('bg-', 'text-').replace('600', '600')} />
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          trend === 'Live' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
        }`}>
          {trend}
        </span>
      </div>
      <h3 className="text-gray-500 text-xs uppercase tracking-widest font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 font-serif">{value}</p>
    </div>
  );

  const renderDashboard = () => {
    // Prepare data for charts
    const categoryData = books.reduce((acc: any[], book) => {
      const existing = acc.find(item => item.name === book.category);
      if (existing) {
        existing.value++;
      } else {
        acc.push({ name: book.category, value: 1 });
      }
      return acc;
    }, []);

    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    // Mock sales data for demonstration
    const salesData = [
      { name: 'Sat', sales: 4000 },
      { name: 'Sun', sales: 3000 },
      { name: 'Mon', sales: 2000 },
      { name: 'Tue', sales: 2780 },
      { name: 'Wed', sales: 1890 },
      { name: 'Thu', sales: 2390 },
      { name: 'Fri', sales: 3490 },
    ];

    return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard 
          title={currentLanguage === 'ku' ? 'کۆی کتابەکان' : 'Total Books'}
          value={stats.totalBooks}
          icon={BookOpen}
          color="bg-blue-600"
          trend="+12%"
        />
        <StatCard 
          title={currentLanguage === 'ku' ? 'کۆی نووسەران' : 'Total Authors'}
          value={stats.totalAuthors}
          icon={Users}
          color="bg-purple-600"
          trend="+5%"
        />
        <StatCard 
          title={currentLanguage === 'ku' ? 'کۆی وەرگێڕان' : 'Total Translators'}
          value={stats.totalTranslators}
          icon={Languages}
          color="bg-pink-600"
          trend="+3%"
        />
        <StatCard 
          title={currentLanguage === 'ku' ? 'داواکارییەکان' : 'Total Orders'}
          value={stats.totalOrders}
          icon={ShoppingBag}
          color="bg-orange-600"
          trend="+18%"
        />
        <StatCard 
          title={currentLanguage === 'ku' ? 'داهات' : 'Total Revenue'}
          value={formatPrice(stats.totalRevenue)}
          icon={DollarSign}
          color="bg-green-600"
          trend="+24%"
        />
        <StatCard 
          title={currentLanguage === 'ku' ? 'بەهای موجودی' : 'Inventory Value'}
          value={formatPrice(stats.totalInventoryValue)}
          icon={Package}
          color="bg-indigo-600"
          trend="Live"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              {currentLanguage === 'ku' ? 'فرۆشی هەفتانە' : 'Weekly Sales'}
            </h3>
            <select className="text-sm border-gray-200 rounded-md text-gray-500 focus:ring-black focus:border-black">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  stroke="#9CA3AF" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    color: '#111827' 
                  }}
                  cursor={{ fill: '#F3F4F6' }}
                />
                <Bar dataKey="sales" fill="#111827" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Chart */}
        <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-xl">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            {currentLanguage === 'ku' ? 'دابەشبوونی کتابەکان' : 'Books Distribution'}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    color: '#111827' 
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => <span className="text-sm text-gray-600 ml-2">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-gray-100 shadow-sm rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              {currentLanguage === 'ku' ? 'دوایین داواکارییەکان' : 'Recent Orders'}
            </h3>
            <button 
              onClick={() => setActiveTab('orders')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <Package size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{order.customerName}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right rtl:text-left">
                  <p className="text-sm font-bold text-gray-900">{formatPrice(order.total)}</p>
                  <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                    order.status === 'delivered' ? 'bg-green-50 text-green-700' :
                    order.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                    'bg-blue-50 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <ShoppingBag size={48} className="mx-auto mb-3 text-gray-300" />
                <p>No orders yet</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            {currentLanguage === 'ku' ? 'باشترین نووسەران' : 'Top Authors'}
          </h3>
          <div className="space-y-4">
            {authors.slice(0, 5).map((author, index) => (
              <div key={author.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-700' :
                  index === 1 ? 'bg-gray-100 text-gray-700' :
                  index === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-50 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900">{author.name}</h4>
                  <p className="text-xs text-gray-500">{author.nationality}</p>
                </div>
                <div className="text-xs font-medium text-gray-400">
                  {Math.floor(Math.random() * 50) + 10} Books
                </div>
              </div>
            ))}
            {authors.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users size={48} className="mx-auto mb-3 text-gray-300" />
                <p>No authors yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  };

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 border border-gray-100 shadow-sm rounded-xl">
        <h2 className="text-xl font-bold text-gray-900">
          {currentLanguage === 'ku' ? 'بەڕێوەبردنی داواکارییەکان' : 'Orders Management'}
        </h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 hover:text-black rounded-lg transition-colors shadow-sm">
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left rtl:text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left rtl:text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left rtl:text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left rtl:text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left rtl:text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right rtl:text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
                      order.status === 'delivered' ? 'bg-green-50 text-green-700 border border-green-100' :
                      order.status === 'cancelled' ? 'bg-red-50 text-red-700 border border-red-100' :
                      order.status === 'processing' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      'bg-yellow-50 text-yellow-700 border border-yellow-100'
                    }`}>
                      {order.status === 'delivered' && <CheckCircle size={12} />}
                      {order.status === 'cancelled' && <XCircle size={12} />}
                      {order.status === 'processing' && <Clock size={12} />}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right rtl:text-left text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewingOrder(order)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => handleOrderStatus(order.id, e.target.value as any)}
                        className="text-sm border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 bg-white text-gray-700 cursor-pointer hover:border-gray-300"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );



  const renderSettings = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">General Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
            <input type="text" defaultValue="Kurd Book" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
            <input type="email" defaultValue="support@kurdbook.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select disabled className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed">
              <option>EUR (€)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 transition-all">
              <option>English</option>
              <option>Kurdish (Sorani)</option>
              <option>German</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-md font-medium transition-all">
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Settings</h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <div>
              <h3 className="font-bold text-gray-900">New Order Alerts</h3>
              <p className="text-sm text-gray-500 mt-1">Get notified when a new order is placed</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 bg-white border-gray-300" />
          </label>
          <label className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <div>
              <h3 className="font-bold text-gray-900">Low Stock Warning</h3>
              <p className="text-sm text-gray-500 mt-1">Get notified when product stock is low</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 bg-white border-gray-300" />
          </label>
        </div>
      </div>
    </div>
  );

  const renderBooks = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-gray-100 shadow-sm rounded-xl">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 rtl:right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={currentLanguage === 'ku' ? 'گەڕان بۆ کتێب...' : 'Search books...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 rtl:pr-10 pr-4 py-2.5 bg-gray-50 border-transparent focus:bg-white border focus:border-blue-500 rounded-lg transition-all outline-none text-gray-900 placeholder-gray-500"
          />
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all font-medium shadow-sm hover:shadow-md"
        >
          <Plus size={20} />
          <span>{currentLanguage === 'ku' ? 'کتابی نوێ' : 'Add Book'}</span>
        </button>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left rtl:text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {currentLanguage === 'ku' ? 'کتاب' : 'Book'}
                </th>
                <th className="px-6 py-4 text-left rtl:text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {currentLanguage === 'ku' ? 'نووسەر' : 'Author'}
                </th>
                <th className="px-6 py-4 text-left rtl:text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {currentLanguage === 'ku' ? 'نرخ' : 'Price'}
                </th>
                <th className="px-6 py-4 text-left rtl:text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {currentLanguage === 'ku' ? 'موجودی' : 'Stock'}
                </th>
                <th className="px-6 py-4 text-right rtl:text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {currentLanguage === 'ku' ? 'کردار' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-14 w-10 border border-gray-200 rounded overflow-hidden bg-gray-50 shadow-sm">
                        {book.imageUrl ? (
                          <img className="h-full w-full object-cover" src={book.imageUrl} alt={book.title} />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <BookOpen size={16} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4 rtl:ml-0 rtl:mr-4">
                        <div className="text-sm font-bold text-gray-900">{book.title}</div>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full inline-block mt-1">
                          {book.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {formatPrice(book.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
                      (book.inventoryCount || 0) > 0 
                        ? 'bg-green-50 text-green-700 border border-green-100' 
                        : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        (book.inventoryCount || 0) > 0 ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      {(book.inventoryCount || 0) > 0 
                        ? `${book.inventoryCount} in stock`
                        : 'Out of stock'
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right rtl:text-left text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditBook(book)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No books found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 border border-gray-100 shadow-sm rounded-xl">
        <h2 className="text-xl font-bold text-gray-900">
          {currentLanguage === 'ku' ? 'بەڕێوەبردنی پێداچوونەوەکان' : 'Reviews Management'}
        </h2>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left rtl:text-right text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left rtl:text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Book ID</th>
                <th className="px-6 py-4 text-left rtl:text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left rtl:text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Comment</th>
                <th className="px-6 py-4 text-left rtl:text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right rtl:text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {reviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {review.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {review.bookId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-bold text-gray-900 mr-1">{review.rating}</span>
                      <span className="text-yellow-400">★</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {review.comment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {review.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right rtl:text-left text-sm font-medium">
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <MessageSquare size={48} className="mx-auto mb-3 text-gray-300" />
                    <p>No reviews found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAuthors = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 border border-gray-100 shadow-sm rounded-xl">
        <h2 className="text-xl font-bold text-gray-900">
          {currentLanguage === 'ku' ? 'بەڕێوەبردنی نووسەران' : 'Authors Management'}
        </h2>
        <button
          onClick={() => setShowAddAuthorForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium shadow-sm hover:shadow-md"
        >
          <Plus size={20} />
          <span>{currentLanguage === 'ku' ? 'نووسەری نوێ' : 'Add Author'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map((author) => (
          <div key={author.id} className="flex items-center justify-between p-4 border border-gray-100 shadow-sm rounded-xl hover:shadow-md hover:border-blue-200 transition-all bg-white group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center font-bold text-lg">
                {author.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{author.name}</h3>
                <p className="text-sm text-gray-500">{author.nationality}</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setEditingAuthor(author)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDeleteAuthor(author.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTranslators = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 border border-gray-100 shadow-sm rounded-xl">
        <h2 className="text-xl font-bold text-gray-900">
          {currentLanguage === 'ku' ? 'بەڕێوەبردنی وەرگێڕان' : 'Translators Management'}
        </h2>
        <button
          onClick={() => setShowAddTranslatorForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium shadow-sm hover:shadow-md"
        >
          <Plus size={20} />
          <span>{currentLanguage === 'ku' ? 'وەرگێڕی نوێ' : 'Add Translator'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {translators.map((translator) => (
          <div key={translator.id} className="flex items-center justify-between p-4 border border-gray-100 shadow-sm rounded-xl hover:shadow-md hover:border-blue-200 transition-all bg-white group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center font-bold text-lg">
                {translator.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{translator.name}</h3>
                <p className="text-sm text-gray-500">{translator.nationality}</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setEditingTranslator(translator)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDeleteTranslator(translator.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex transition-colors duration-300 font-serif">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 rtl:left-auto rtl:right-0 z-30
        w-72 bg-white border-r rtl:border-r-0 rtl:border-l border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col bg-white">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-md shadow-blue-200">
                K
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg tracking-tight">Kurd Book</h1>
                <p className="text-xs text-gray-500 font-medium">Admin Dashboard</p>
              </div>
            </div>
          </div>

          <div className="flex-1 py-6 space-y-1 overflow-y-auto px-2">
            <SidebarItem 
              id="dashboard" 
              icon={TrendingUp} 
              label={currentLanguage === 'ku' ? 'سەرەکی' : 'Dashboard'} 
            />
            <SidebarItem 
              id="books" 
              icon={BookOpen} 
              label={currentLanguage === 'ku' ? 'کتابەکان' : 'Books'} 
            />
            <SidebarItem 
              id="authors" 
              icon={Users} 
              label={currentLanguage === 'ku' ? 'نووسەران' : 'Authors'} 
            />
            <SidebarItem 
              id="translators" 
              icon={Languages} 
              label={currentLanguage === 'ku' ? 'وەرگێڕان' : 'Translators'} 
            />
            <SidebarItem 
              id="orders" 
              icon={ShoppingBag} 
              label={currentLanguage === 'ku' ? 'داواکارییەکان' : 'Orders'} 
            />
            <SidebarItem 
              id="reviews" 
              icon={MessageSquare} 
              label={currentLanguage === 'ku' ? 'پێداچوونەوەکان' : 'Reviews'} 
            />
            <SidebarItem 
              id="settings" 
              icon={Settings} 
              label={currentLanguage === 'ku' ? 'ڕێکخستنەکان' : 'Settings'} 
            />
          </div>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={() => router.push('/')}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
            >
              <LogOut size={20} />
              <span>{currentLanguage === 'ku' ? 'گەڕانەوە' : 'Exit Panel'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between transition-colors duration-300">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100"
          >
            <Menu size={24} className="text-black" />
          </button>

          <div className="flex items-center gap-6 ml-auto rtl:mr-auto rtl:ml-0">
            <button className="p-2 text-gray-400 hover:text-black transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-4 pl-6 rtl:pr-6 rtl:pl-0 border-l rtl:border-l-0 rtl:border-r border-gray-200">
              <div className="text-right rtl:text-left hidden sm:block">
                <p className="text-sm font-serif font-bold text-black">Admin User</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-black flex items-center justify-center text-white font-serif font-bold border border-gray-200">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'books' && renderBooks()}
            {activeTab === 'authors' && renderAuthors()}
            {activeTab === 'translators' && renderTranslators()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'reviews' && renderReviews()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </main>
      </div>

      {/* Modals */}
      {editingBook && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
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

      {/* Author Modals */}
      {(showAddAuthorForm || editingAuthor) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <AuthorForm
            author={editingAuthor || undefined}
            onClose={() => {
              setShowAddAuthorForm(false);
              setEditingAuthor(null);
            }}
            onSave={() => {
              setShowAddAuthorForm(false);
              setEditingAuthor(null);
              loadData();
            }}
          />
        </div>
      )}

      {/* Translator Modals */}
      {(showAddTranslatorForm || editingTranslator) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <TranslatorForm
            translator={editingTranslator || undefined}
            onClose={() => {
              setShowAddTranslatorForm(false);
              setEditingTranslator(null);
            }}
            onSave={() => {
              setShowAddTranslatorForm(false);
              setEditingTranslator(null);
              loadData();
            }}
          />
        </div>
      )}

      {/* Order Details Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white border border-[#e5e5e5] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif text-[#2c2c2c]">
                {currentLanguage === 'ku' ? 'وردەکاری داواکاری' : 'Order Details'} #{viewingOrder.id}
              </h2>
              <button 
                onClick={() => setViewingOrder(null)}
                className="p-2 hover:bg-[#e5e5e5] transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Customer Info */}
              <div className="bg-gray-50 p-4 border border-gray-200">
                <h3 className="font-serif text-black mb-3 flex items-center gap-2">
                  <Users size={18} className="text-black" />
                  {currentLanguage === 'ku' ? 'زانیاری کڕیار' : 'Customer Information'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs">{currentLanguage === 'ku' ? 'ناو' : 'Name'}</p>
                    <p className="font-medium text-black">{viewingOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs">{currentLanguage === 'ku' ? 'ئیمەیڵ' : 'Email'}</p>
                    <p className="font-medium text-black">{viewingOrder.customerEmail}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-500 uppercase tracking-wider text-xs">{currentLanguage === 'ku' ? 'ناونیشان' : 'Address'}</p>
                    <p className="font-medium text-black">{viewingOrder.shippingAddress || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-serif text-black mb-3 flex items-center gap-2">
                  <ShoppingBag size={18} className="text-black" />
                  {currentLanguage === 'ku' ? 'کاڵاکان' : 'Order Items'}
                </h3>
                <div className="border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left rtl:text-right text-xs font-serif text-gray-500 uppercase tracking-wider">Item</th>
                        <th className="px-4 py-3 text-center text-xs font-serif text-gray-500 uppercase tracking-wider">Qty</th>
                        <th className="px-4 py-3 text-right rtl:text-left text-xs font-serif text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-right rtl:text-left text-xs font-serif text-gray-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {viewingOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm text-black">
                            <div className="font-medium font-serif">{item.title}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">{item.author}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-center text-black">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm text-right rtl:text-left text-black font-serif">{formatPrice(item.price)}</td>
                          <td className="px-4 py-3 text-sm text-right rtl:text-left font-serif text-black">{formatPrice(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-right rtl:text-left font-serif text-black uppercase tracking-wider">Total</td>
                        <td className="px-4 py-3 text-right rtl:text-left font-serif text-black">{formatPrice(viewingOrder?.total || 0)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Status & Payment */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 border border-gray-200">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{currentLanguage === 'ku' ? 'دۆخ' : 'Status'}</p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium uppercase tracking-wider ${
                    viewingOrder.status === 'delivered' ? 'bg-green-50 text-green-700' :
                    viewingOrder.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                    'bg-blue-50 text-blue-700'
                  }`}>
                    {viewingOrder.status.toUpperCase()}
                  </span>
                </div>
                <div className="bg-gray-50 p-4 border border-gray-200">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{currentLanguage === 'ku' ? 'شێوازی پارەدان' : 'Payment Method'}</p>
                  <p className="font-medium text-black capitalize font-serif">{viewingOrder.paymentMethod || 'Card'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}