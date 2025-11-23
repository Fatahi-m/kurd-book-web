import { books as websiteBooks, authors as websiteAuthors, translators as websiteTranslators } from '@/data/books';

// Admin Data Management Service
// در یک پروژه واقعی، این عملیات‌ها با backend انجام می‌شود

export interface AdminOrder {
  id: string;
  userId?: string; // Link to user profile
  customerName: string;
  customerEmail: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  paymentMethod?: string;
  shippingAddress?: string;
  items: {
    bookId: string;
    title: string;
    quantity: number;
    price: number;
    image?: string;
    author?: string;
  }[];
}

export interface AdminBook {
  id: string;
  title: string;
  titleKu?: string;
  titleEn?: string;
  titleDe?: string;
  author: string;
  authorKu?: string;
  authorEn?: string;
  authorDe?: string;
  publisher: string;
  publisherKu?: string;
  publisherEn?: string;
  publisherDe?: string;
  price: number;
  originalPrice?: number;
  description: string;
  descriptionKu?: string;
  descriptionEn?: string;
  descriptionDe?: string;
  language: string;
  category: string;
  tags: string[];
  inStock: boolean;
  inventoryCount: number;
  featured: boolean;
  bestseller: boolean;
  newRelease: boolean;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  pages?: number;
  isbn?: string;
  publishDate?: string;
  translator?: string;
}

export interface AdminAuthor {
  id: string;
  name: string;
  latinName?: string;
  nationality?: string;
  imageUrl?: string;
}

export interface AdminTranslator {
  id: string;
  name: string;
  latinName?: string;
  nationality?: string;
  imageUrl?: string;
  languages?: string[];
}

class AdminDataService {
  private static instance: AdminDataService;
  private books: AdminBook[] = [];
  private authors: AdminAuthor[] = [];
  private translators: AdminTranslator[] = [];
  private orders: AdminOrder[] = [];

  private constructor() {
    // Initialize with existing data
    this.loadInitialData();
  }

  static getInstance(): AdminDataService {
    if (!AdminDataService.instance) {
      AdminDataService.instance = new AdminDataService();
    }
    return AdminDataService.instance;
  }

  private loadInitialData() {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Load from localStorage or use default data
      // Using v3 keys to force refresh data with website books
      const savedBooks = localStorage.getItem('admin_books_v3');
      const savedAuthors = localStorage.getItem('admin_authors_v3');
      const savedTranslators = localStorage.getItem('admin_translators_v3');
      const savedOrders = localStorage.getItem('admin_orders_v3');

      if (savedBooks) {
        this.books = JSON.parse(savedBooks);
      } else {
        // Load books from website data
        this.books = websiteBooks.map(book => ({
          id: book.id,
          title: book.title,
          titleKu: book.language === 'kurdish' ? book.title : undefined,
          author: book.author,
          authorKu: book.language === 'kurdish' ? book.author : undefined,
          publisher: book.publisher,
          publisherKu: book.language === 'kurdish' ? book.publisher : undefined,
          price: book.price,
          originalPrice: book.originalPrice,
          description: book.description,
          descriptionKu: book.language === 'kurdish' ? book.description : undefined,
          language: book.language,
          category: book.category,
          tags: book.tags,
          inStock: book.inStock,
          inventoryCount: 50, // Default inventory
          featured: book.featured,
          bestseller: book.bestseller,
          newRelease: book.newRelease,
          rating: book.rating,
          reviewCount: book.reviewCount,
          imageUrl: book.image,
          pages: book.pages,
          isbn: book.isbn,
          publishDate: book.publishedDate,
          translator: book.translator
        }));
        this.saveToStorage();
      }

      if (savedAuthors) {
        this.authors = JSON.parse(savedAuthors);
      } else {
        // Load authors from website data
        this.authors = websiteAuthors.map(author => ({
          id: author.id,
          name: author.name,
          latinName: author.latinName,
          nationality: author.nationality,
          imageUrl: author.image
        }));
        this.saveToStorage();
      }

      if (savedTranslators) {
        this.translators = JSON.parse(savedTranslators);
      } else {
        // Load translators from website data
        this.translators = websiteTranslators.map(translator => ({
          id: translator.id,
          name: translator.name,
          latinName: translator.latinName,
          nationality: translator.nationality,
          imageUrl: translator.image,
          languages: translator.languages
        }));
        this.saveToStorage();
      }

      if (savedOrders) {
        this.orders = JSON.parse(savedOrders);
      } else {
        // Add sample orders
        this.orders = [
          {
            id: 'ORD-001',
            customerName: 'Ali Karimi',
            customerEmail: 'ali@example.com',
            date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            status: 'delivered',
            total: 43.40,
            items: [
              { bookId: '1', title: 'Mem u Zin', quantity: 1, price: 18.50 },
              { bookId: '2', title: 'Sherko Bekas Poems', quantity: 1, price: 24.90 }
            ]
          },
          {
            id: 'ORD-002',
            customerName: 'Sara Ahmed',
            customerEmail: 'sara@example.com',
            date: new Date().toISOString(), // Today
            status: 'processing',
            total: 18.50,
            items: [
              { bookId: '1', title: 'Mem u Zin', quantity: 1, price: 18.50 }
            ]
          }
        ];
        this.saveToStorage();
      }
    }
  }

  private saveToStorage() {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_books_v3', JSON.stringify(this.books));
      localStorage.setItem('admin_authors_v3', JSON.stringify(this.authors));
      localStorage.setItem('admin_translators_v3', JSON.stringify(this.translators));
      localStorage.setItem('admin_orders_v3', JSON.stringify(this.orders));
    }
  }

  // Book Management
  getAllBooks(): AdminBook[] {
    return [...this.books];
  }

  getBookById(id: string): AdminBook | undefined {
    return this.books.find(book => book.id === id);
  }

  addBook(book: Omit<AdminBook, 'id' | 'rating' | 'reviewCount'>): AdminBook {
    const newBook: AdminBook = {
      ...book,
      id: Date.now().toString(),
      inventoryCount: book.inventoryCount || 0,
      inStock: (book.inventoryCount || 0) > 0,
      reviewCount: 0,
      rating: 0
    };
    this.books.push(newBook);
    this.saveToStorage();
    return newBook;
  }

  updateBook(updatedBook: AdminBook): AdminBook | null {
    const index = this.books.findIndex(book => book.id === updatedBook.id);
    if (index === -1) return null;

    this.books[index] = updatedBook;
    this.saveToStorage();
    return updatedBook;
  }

  deleteBook(id: string): boolean {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) return false;

    this.books.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  // Author Management
  getAllAuthors(): AdminAuthor[] {
    return [...this.authors];
  }

  addAuthor(author: Omit<AdminAuthor, 'id'>): AdminAuthor {
    const newAuthor = {
      ...author,
      id: Date.now().toString()
    };
    this.authors.push(newAuthor);
    this.saveToStorage();
    return newAuthor;
  }

  updateAuthor(id: string, updatedAuthor: Partial<AdminAuthor>): AdminAuthor | null {
    const index = this.authors.findIndex(author => author.id === id);
    if (index === -1) return null;

    this.authors[index] = { ...this.authors[index], ...updatedAuthor };
    this.saveToStorage();
    return this.authors[index];
  }

  deleteAuthor(id: string): boolean {
    const index = this.authors.findIndex(author => author.id === id);
    if (index === -1) return false;

    this.authors.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  // Translator Management
  getAllTranslators(): AdminTranslator[] {
    return [...this.translators];
  }

  addTranslator(translator: Omit<AdminTranslator, 'id'>): AdminTranslator {
    const newTranslator = {
      ...translator,
      id: Date.now().toString()
    };
    this.translators.push(newTranslator);
    this.saveToStorage();
    return newTranslator;
  }

  updateTranslator(id: string, updatedTranslator: Partial<AdminTranslator>): AdminTranslator | null {
    const index = this.translators.findIndex(translator => translator.id === id);
    if (index === -1) return null;

    this.translators[index] = { ...this.translators[index], ...updatedTranslator };
    this.saveToStorage();
    return this.translators[index];
  }

  deleteTranslator(id: string): boolean {
    const index = this.translators.findIndex(translator => translator.id === id);
    if (index === -1) return false;

    this.translators.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  // Order Management
  getAllOrders(): AdminOrder[] {
    return [...this.orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getOrderById(id: string): AdminOrder | undefined {
    return this.orders.find(order => order.id === id);
  }

  updateOrderStatus(id: string, status: AdminOrder['status']): AdminOrder | null {
    const index = this.orders.findIndex(order => order.id === id);
    if (index === -1) return null;

    this.orders[index].status = status;
    this.saveToStorage();
    return this.orders[index];
  }

  deleteOrder(id: string): boolean {
    const index = this.orders.findIndex(order => order.id === id);
    if (index === -1) return false;

    this.orders.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  // Create a new order
  createOrder(orderData: Omit<AdminOrder, 'id' | 'date' | 'status'>): AdminOrder {
    const newOrder: AdminOrder = {
      ...orderData,
      id: 'ORD-' + Math.floor(Math.random() * 1000000),
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    this.orders.unshift(newOrder); // Add to beginning of list
    this.saveToStorage();
    
    // Update inventory
    newOrder.items.forEach(item => {
      this.decreaseInventory(item.bookId, item.quantity);
    });
    
    return newOrder;
  }

  // Get orders by user ID
  getOrdersByUserId(userId: string): AdminOrder[] {
    return this.orders.filter(order => order.userId === userId);
  }

  // Statistics
  getStats() {
    const totalRevenue = this.orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, order) => sum + order.total, 0);

    const totalInventoryValue = this.books.reduce((sum, book) => {
      return sum + (book.price * (book.inventoryCount || 0));
    }, 0);

    return {
      totalBooks: this.books.length,
      totalAuthors: this.authors.length,
      totalTranslators: this.translators.length,
      totalReviews: this.books.reduce((sum, book) => sum + book.reviewCount, 0),
      averageRating: this.books.length > 0 
        ? (this.books.reduce((sum, book) => sum + book.rating, 0) / this.books.length).toFixed(1)
        : '0.0',
      totalOrders: this.orders.length,
      totalRevenue: totalRevenue,
      totalInventoryValue: totalInventoryValue,
      recentOrders: this.orders.slice(0, 5)
    };
  }

  // Search and Filter
  searchBooks(query: string): AdminBook[] {
    const lowerQuery = query.toLowerCase();
    return this.books.filter(book => 
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      (book.translator && book.translator.toLowerCase().includes(lowerQuery)) ||
      book.category.toLowerCase().includes(lowerQuery)
    );
  }

  searchAuthors(query: string): AdminAuthor[] {
    const lowerQuery = query.toLowerCase();
    return this.authors.filter(author => 
      author.name.toLowerCase().includes(lowerQuery) ||
      (author.latinName && author.latinName.toLowerCase().includes(lowerQuery))
    );
  }

  searchTranslators(query: string): AdminTranslator[] {
    const lowerQuery = query.toLowerCase();
    return this.translators.filter(translator => 
      translator.name.toLowerCase().includes(lowerQuery) ||
      (translator.latinName && translator.latinName.toLowerCase().includes(lowerQuery))
    );
  }

  // Inventory Management
  updateInventory(id: string, newCount: number): AdminBook | null {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) return null;

    this.books[index].inventoryCount = Math.max(0, newCount);
    this.books[index].inStock = this.books[index].inventoryCount > 0;
    this.saveToStorage();
    
    return this.books[index];
  }

  decreaseInventory(id: string, amount: number = 1): AdminBook | null {
    const book = this.getBookById(id);
    if (!book) return null;
    
    return this.updateInventory(id, book.inventoryCount - amount);
  }

  // Bulk Operations
  importBooks(books: AdminBook[]): void {
    this.books = [...this.books, ...books];
    this.saveToStorage();
  }

  exportBooks(): AdminBook[] {
    return [...this.books];
  }

  clearAllData(): void {
    this.books = [];
    this.authors = [];
    this.translators = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_books_v3');
      localStorage.removeItem('admin_authors_v3');
      localStorage.removeItem('admin_translators_v3');
      localStorage.removeItem('admin_orders_v3');
    }
  }
}

export const adminDataService = AdminDataService.getInstance();