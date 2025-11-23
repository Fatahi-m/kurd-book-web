'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Review {
  id: string;
  bookId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  title?: string;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (bookId: string, review: Omit<Review, 'id' | 'date' | 'bookId'>) => void;
  getReviewsByBookId: (bookId: string) => Review[];
  getAverageRating: (bookId: string) => number;
  getReviewCount: (bookId: string) => number;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load reviews from localStorage on mount
  useEffect(() => {
    const storedReviews = localStorage.getItem('kurd-book-reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      // Initial mock data
      const initialReviews: Review[] = [
        { id: '1', bookId: '1', userName: 'Ali K.', rating: 5, comment: 'Great book! Highly recommended.', date: '2023-10-01', title: 'Amazing!' },
        { id: '2', bookId: '1', userName: 'Sara M.', rating: 4, comment: 'Good read, but a bit long.', date: '2023-09-15', title: 'Good but long' },
        { id: '3', bookId: '2', userName: 'Kamaran', rating: 5, comment: 'A masterpiece of Kurdish literature.', date: '2023-11-20', title: 'Masterpiece' }
      ];
      setReviews(initialReviews);
      localStorage.setItem('kurd-book-reviews', JSON.stringify(initialReviews));
    }
  }, []);

  const addReview = (bookId: string, reviewData: Omit<Review, 'id' | 'date' | 'bookId'>) => {
    const newReview: Review = {
      id: Date.now().toString(),
      bookId,
      date: new Date().toISOString().split('T')[0],
      ...reviewData
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('kurd-book-reviews', JSON.stringify(updatedReviews));
  };

  const getReviewsByBookId = (bookId: string) => {
    return reviews.filter(r => r.bookId === bookId);
  };

  const getAverageRating = (bookId: string) => {
    const bookReviews = getReviewsByBookId(bookId);
    if (bookReviews.length === 0) return 0;
    const sum = bookReviews.reduce((acc, curr) => acc + curr.rating, 0);
    return Number((sum / bookReviews.length).toFixed(1));
  };

  const getReviewCount = (bookId: string) => {
    return getReviewsByBookId(bookId).length;
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, getReviewsByBookId, getAverageRating, getReviewCount }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
}
