// Book types
export interface Book {
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
  translator?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  coverUrl?: string;
  description: string;
  descriptionKu?: string;
  descriptionEn?: string;
  descriptionDe?: string;
  isbn?: string;
  pages?: number;
  language: 'kurdish' | 'english' | 'arabic' | 'persian' | string;
  category: string;
  tags: string[];
  publishedDate?: string;
  inStock: boolean;
  inventoryCount?: number;
  featured: boolean;
  bestseller: boolean;
  newRelease: boolean;
  rating: number;
  reviewCount: number;
}

// Category types
export interface Category {
  id: string;
  name: {
    ku: string;
    en: string;
    de: string;
  };
  slug: string;
  description?: {
    ku: string;
    en: string;
    de: string;
  };
  icon?: string;
  parentId?: string;
  childrenIds?: string[];
}

// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences: {
    language: 'ku' | 'en' | 'de';
    notifications: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: 'cash' | 'card' | 'bank_transfer';
  createdAt: Date;
  updatedAt: Date;
  deliveredAt?: Date;
}

// Favorites types
export interface UserFavorites {
  userId: string;
  bookIds: string[];
  updatedAt: Date;
}

// Cart types
export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Author types
export interface Author {
  id: string;
  name: string;
  latinName?: string;
  bio?: {
    ku: string;
    en: string;
    de: string;
  };
  image?: string;
  birthYear?: number;
  deathYear?: number;
  nationality?: string;
  genre?: string[];
  awards?: string[];
  books: string[]; // Book IDs
}

// Translator types
export interface Translator {
  id: string;
  name: string;
  latinName?: string;
  bio?: {
    ku: string;
    en: string;
    de: string;
  };
  image?: string;
  birthYear?: number;
  deathYear?: number;
  nationality?: string;
  languages?: string[];
  books: string[]; // Book IDs
}