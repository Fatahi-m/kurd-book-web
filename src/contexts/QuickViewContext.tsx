'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book } from '@/lib/types';

interface QuickViewContextType {
  openQuickView: (book: Book) => void;
  closeQuickView: () => void;
  selectedBook: Book | null;
  isOpen: boolean;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export const QuickViewProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openQuickView = (book: Book) => {
    setSelectedBook(book);
    setIsOpen(true);
  };

  const closeQuickView = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedBook(null), 300); // Clear after animation
  };

  return (
    <QuickViewContext.Provider value={{ openQuickView, closeQuickView, selectedBook, isOpen }}>
      {children}
    </QuickViewContext.Provider>
  );
};

export const useQuickView = () => {
  const context = useContext(QuickViewContext);
  if (context === undefined) {
    throw new Error('useQuickView must be used within a QuickViewProvider');
  }
  return context;
};
