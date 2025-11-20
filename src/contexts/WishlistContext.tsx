'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface WishlistItem {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  inStock: boolean;
  addedAt: Date;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  getWishlistItemCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('kurdbook_wishlist');
    if (savedWishlist) {
      try {
        const parsedItems = JSON.parse(savedWishlist);
        // Convert date strings back to Date objects
        const itemsWithDates = parsedItems.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        setItems(itemsWithDates);
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('kurdbook_wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (item: Omit<WishlistItem, 'addedAt'>) => {
    setItems(currentItems => {
      // Check if item already exists
      if (currentItems.some(existingItem => existingItem.id === item.id)) {
        return currentItems;
      }
      
      // Add new item with current timestamp
      const newItem: WishlistItem = {
        ...item,
        addedAt: new Date()
      };
      
      return [...currentItems, newItem];
    });
  };

  const removeFromWishlist = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const isInWishlist = (id: string): boolean => {
    return items.some(item => item.id === id);
  };

  const getWishlistItemCount = (): number => {
    return items.length;
  };

  const value: WishlistContextType = {
    items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistItemCount
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}