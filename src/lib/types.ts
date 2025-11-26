// Book types
export interface Book {
  id: string;
  title: string;
  titleKu?: string;
  titleEn?: string;
  titleDe?: string;
  titleKmr?: string;
  author: string;
  authorKu?: string;
  authorEn?: string;
  authorDe?: string;
  authorKmr?: string;
  publisher: string;
  publisherKu?: string;
  publisherEn?: string;
  publisherDe?: string;
  publisherKmr?: string;
  translator?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  coverUrl?: string;
  description: string;
  descriptionKu?: string;
  descriptionEn?: string;
  descriptionDe?: string;
  descriptionKmr?: string;
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
    kmr: string;
  };
  slug: string;
  description?: {
    ku: string;
    en: string;
    kmr: string;
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
    language: 'ku' | 'en' | 'kmr';
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
    kmr: string;
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
    kmr: string;
  };
  image?: string;
  birthYear?: number;
  deathYear?: number;
  nationality?: string;
  languages?: string[];
  books: string[]; // Book IDs
}

// Artisan types (For Arts & Culture section)
export interface Artisan {
  id: string;
  name: string;
  latinName?: string;
  bio: {
    ku: string;
    en: string;
    kmr: string;
  };
  image: string;
  location: {
    city: string;
    country: string;
    coordinates?: { lat: number; lng: number };
  };
  specialty: string[]; // e.g., ['Weaving', 'Woodwork']
  products: string[]; // ArtProduct IDs
  story?: { // A longer story about the artisan
    ku: string;
    en: string;
    kmr: string;
  };
}

// Art Product types
export interface ArtProduct {
  id: string;
  title: {
    ku: string;
    en: string;
    kmr: string;
  };
  artisanId: string;
  price: number;
  images: string[];
  description: {
    ku: string;
    en: string;
    kmr: string;
  };
  category: 'textile' | 'woodwork' | 'jewelry' | 'painting' | 'pottery' | 'other';
  materials: string[];
  dimensions?: string; // e.g., "30x40 cm"
  weight?: string; // e.g., "500g"
  inStock: boolean;
  isHandmade: boolean;
  creationTime?: string; // e.g., "2 weeks"
}