'use client';

import { Book } from '@/lib/types';
import { bookService } from '@/lib/bookService';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import BookRow from '@/components/ui/BookRow';
import LibristoHero from '@/components/ui/LibristoHero';
import CollectionGrid from '@/components/ui/CollectionGrid';
import FeaturedAuthorsRow from '@/components/ui/FeaturedAuthorsRow';
import Link from 'next/link';
import { ChevronRight, Truck, ShieldCheck, Heart } from 'lucide-react';
import AboutSummary from '@/components/ui/AboutSummary';
import MissionTeaser from '@/components/ui/MissionTeaser';

export default function HomePage() {
  const { t, currentLanguage } = useLanguage();
  const [bestsellerBooks, setBestsellerBooks] = useState<Book[]>([]);
  const [newReleaseBooks, setNewReleaseBooks] = useState<Book[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBestsellerBooks(bookService.getBestsellerBooks());
    setNewReleaseBooks(bookService.getNewReleaseBooks());
    setFeaturedBooks(bookService.getFeaturedBooks());
  }, []);

  return (
    <main className="min-h-screen bg-white pb-12">
      
      {/* Full Width Hero Section */}
      <LibristoHero />

      {/* Mission Teaser */}
      <MissionTeaser />

      {/* Categories Grid */}
      <CollectionGrid />

      {/* Lesenswert Section - Light Green Background */}
      <BookRow 
        title={t('home.featured') || "Featured Books"} 
        subtitle={t('home.featuredSubtitle') || "Our recommendations for you"}
        books={featuredBooks} 
        variant="centered"
        bgClass="bg-rose-50" // Warm Rose tint
        viewAllLink="/books?filter=featured"
      />

      {/* Just Landed Section - White Background */}
      <BookRow 
        title={t('home.newReleases') || "New Releases"} 
        books={newReleaseBooks} 
        variant="centered"
        bgClass="bg-white"
        viewAllLink="/new-releases"
      />

      {/* Bestsellers Section - Gray Background */}
      <BookRow 
        title={t('home.bestsellers') || "Bestsellers"} 
        subtitle={t('home.bestsellersSubtitle') || "Most popular books among our customers"}
        books={bestsellerBooks} 
        variant="centered"
        bgClass="bg-slate-50" // Cool Slate tint
        viewAllLink="/bestsellers"
      />

      {/* Featured Authors */}
      <FeaturedAuthorsRow />

      {/* About Summary */}
      <AboutSummary />

      {/* Mission Teaser */}
      <MissionTeaser />

    </main>
  );
}