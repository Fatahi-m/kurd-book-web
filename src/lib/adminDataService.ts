// Admin Data Management Service
// در یک پروژه واقعی، این عملیات‌ها با backend انجام می‌شود

export interface AdminBook {
  id: string;
  title: string;
  author: string;
  publisher: string;
  price: number;
  originalPrice?: number;
  description: string;
  isbn?: string;
  pages?: number;
  language: string;
  category: string;
  tags: string[];
  publishedDate?: string;
  inStock: boolean;
  featured: boolean;
  bestseller: boolean;
  newRelease: boolean;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
}

export interface AdminAuthor {
  id: string;
  name: string;
  latinName?: string;
  birthYear?: number;
  deathYear?: number;
  nationality?: string;
  biographyKu?: string;
  biographyEn?: string;
  biographyDe?: string;
  imageUrl?: string;
}

class AdminDataService {
  private static instance: AdminDataService;
  private books: AdminBook[] = [];
  private authors: AdminAuthor[] = [];

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
      const savedBooks = localStorage.getItem('admin_books');
      const savedAuthors = localStorage.getItem('admin_authors');

      if (savedBooks) {
        this.books = JSON.parse(savedBooks);
      }

      if (savedAuthors) {
        this.authors = JSON.parse(savedAuthors);
      }
    }
  }

  private saveToStorage() {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_books', JSON.stringify(this.books));
      localStorage.setItem('admin_authors', JSON.stringify(this.authors));
    }
  }

  // Book Management
  getAllBooks(): AdminBook[] {
    return [...this.books];
  }

  getBookById(id: string): AdminBook | undefined {
    return this.books.find(book => book.id === id);
  }

  addBook(bookData: Omit<AdminBook, 'id' | 'rating' | 'reviewCount'>): AdminBook {
    const newBook: AdminBook = {
      ...bookData,
      id: Date.now().toString(),
      rating: 0,
      reviewCount: 0
    };

    this.books.push(newBook);
    this.saveToStorage();
    
    return newBook;
  }

  updateBook(id: string, updates: Partial<AdminBook>): AdminBook | null {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) return null;

    this.books[index] = { ...this.books[index], ...updates };
    this.saveToStorage();
    
    return this.books[index];
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

  getAuthorById(id: string): AdminAuthor | undefined {
    return this.authors.find(author => author.id === id);
  }

  addAuthor(authorData: Omit<AdminAuthor, 'id'>): AdminAuthor {
    const newAuthor: AdminAuthor = {
      ...authorData,
      id: Date.now().toString()
    };

    this.authors.push(newAuthor);
    this.saveToStorage();
    
    return newAuthor;
  }

  updateAuthor(id: string, updates: Partial<AdminAuthor>): AdminAuthor | null {
    const index = this.authors.findIndex(author => author.id === id);
    if (index === -1) return null;

    this.authors[index] = { ...this.authors[index], ...updates };
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

  // Statistics
  getStats() {
    return {
      totalBooks: this.books.length,
      totalAuthors: this.authors.length,
      totalReviews: this.books.reduce((sum, book) => sum + book.reviewCount, 0),
      averageRating: this.books.length > 0 
        ? (this.books.reduce((sum, book) => sum + book.rating, 0) / this.books.length).toFixed(1)
        : '0.0'
    };
  }

  // Search and Filter
  searchBooks(query: string): AdminBook[] {
    const lowerQuery = query.toLowerCase();
    return this.books.filter(book => 
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_books');
      localStorage.removeItem('admin_authors');
    }
  }
}

export const adminDataService = AdminDataService.getInstance();