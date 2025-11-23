// Book Service - Combines admin books with static books for frontend display
import { books as staticBooks } from '@/data/books';
import { adminDataService, AdminBook } from './adminDataService';
import { Book } from './types';

class BookService {
  private static instance: BookService;

  private constructor() {}

  static getInstance(): BookService {
    if (!BookService.instance) {
      BookService.instance = new BookService();
    }
    return BookService.instance;
  }

  // Convert AdminBook to Book interface for frontend compatibility
  private convertAdminBookToBook(adminBook: AdminBook): Book {
    return {
      id: adminBook.id,
      title: adminBook.title,
      titleKu: adminBook.titleKu,
      titleEn: adminBook.titleEn,
      titleDe: adminBook.titleDe,
      author: adminBook.author,
      authorKu: adminBook.authorKu,
      authorEn: adminBook.authorEn,
      authorDe: adminBook.authorDe,
      publisher: adminBook.publisher,
      publisherKu: adminBook.publisherKu,
      publisherEn: adminBook.publisherEn,
      publisherDe: adminBook.publisherDe,
      translator: adminBook.translator,
      price: adminBook.price,
      originalPrice: adminBook.originalPrice,
      description: adminBook.description,
      descriptionKu: adminBook.descriptionKu,
      descriptionEn: adminBook.descriptionEn,
      descriptionDe: adminBook.descriptionDe,
      coverUrl: adminBook.imageUrl || '/images/default-book-cover.jpg',
      category: adminBook.category,
      isbn: adminBook.isbn,
      pages: adminBook.pages,
      publishedDate: adminBook.publishDate,
      language: adminBook.language,
      tags: adminBook.tags,
      featured: adminBook.featured,
      bestseller: adminBook.bestseller,
      newRelease: adminBook.newRelease,
      inStock: adminBook.inStock && adminBook.inventoryCount > 0,
      inventoryCount: adminBook.inventoryCount,
      rating: adminBook.rating,
      reviewCount: adminBook.reviewCount
    };
  }

  // Get all books (static + admin books)
  getAllBooks(): Book[] {
    let allBooks: Book[] = [...staticBooks];
    
    // Add admin books if we're in browser environment
    if (typeof window !== 'undefined') {
      const adminBooks = adminDataService.getAllBooks();
      const convertedAdminBooks = adminBooks.map(book => this.convertAdminBookToBook(book));
      allBooks = [...allBooks, ...convertedAdminBooks];
    }
    
    return allBooks;
  }

  // Get books by category
  getBooksByCategory(category: string): Book[] {
    return this.getAllBooks().filter(book => book.category === category);
  }

  // Get featured books
  getFeaturedBooks(): Book[] {
    return this.getAllBooks().filter(book => book.featured);
  }

  // Get bestseller books
  getBestsellerBooks(): Book[] {
    return this.getAllBooks().filter(book => book.bestseller);
  }

  // Get new release books
  getNewReleaseBooks(): Book[] {
    return this.getAllBooks().filter(book => book.newRelease);
  }

  // Get books in stock
  getInStockBooks(): Book[] {
    return this.getAllBooks().filter(book => book.inStock);
  }

  // Search books
  searchBooks(query: string): Book[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllBooks().filter(book => 
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      (book.translator && book.translator.toLowerCase().includes(lowerQuery)) ||
      book.category.toLowerCase().includes(lowerQuery) ||
      book.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Get book by ID
  getBookById(id: string): Book | undefined {
    return this.getAllBooks().find(book => book.id === id);
  }

  // Purchase book (decrease inventory)
  purchaseBook(bookId: string, quantity: number = 1): boolean {
    if (typeof window === 'undefined') return false;
    
    // Check if it's an admin book
    const adminBook = adminDataService.getBookById(bookId);
    if (adminBook) {
      if (adminBook.inventoryCount >= quantity) {
        adminDataService.decreaseInventory(bookId, quantity);
        return true;
      }
      return false;
    }
    
    // For static books, we assume they're always available
    return true;
  }

  // Get low stock books (for admin alerts)
  getLowStockBooks(threshold: number = 5): Book[] {
    return this.getAllBooks().filter(book => 
      book.inventoryCount !== undefined && book.inventoryCount <= threshold && book.inventoryCount > 0
    );
  }

  // Get out of stock books
  getOutOfStockBooks(): Book[] {
    return this.getAllBooks().filter(book => 
      book.inventoryCount !== undefined && book.inventoryCount === 0
    );
  }
}

export const bookService = BookService.getInstance();