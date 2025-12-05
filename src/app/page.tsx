'use client';

import { Book } from '@/lib/types';
import { bookService } from '@/lib/bookService';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import HeroSlider from '@/components/ui/HeroSlider';
import BookRow from '@/components/ui/BookRow';
import CollectionGrid from '@/components/ui/CollectionGrid';
import FeaturedAuthorsRow from '@/components/ui/FeaturedAuthorsRow';
import Link from 'next/link';
import { ChevronRight, Truck, ShieldCheck, Heart } from 'lucide-react';
import QuoteSection from '@/components/ui/QuoteSection';
import NewsletterSection from '@/components/ui/NewsletterSection';

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
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <div className="w-full bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <HeroSlider />
        </div>
      </div>

      {/* Service Features */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Free Shipping</h3>
                <p className="text-xs text-gray-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Secure Payment</h3>
                <p className="text-xs text-gray-500">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <Heart size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Quality Books</h3>
                <p className="text-xs text-gray-500">Handpicked selection</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                <ChevronRight size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Fast Delivery</h3>
                <p className="text-xs text-gray-500">2-3 business days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Books Section */}
      <section className="py-16 container mx-auto px-4 md:px-8">
          <BookRow 
            title={t('home.featured') || "Featured Books"} 
            subtitle={t('home.featuredSubtitle') || "Our recommendations for you"}
            books={featuredBooks} 
            viewAllLink="/books?filter=featured"
            icon={<Heart className="w-5 h-5" />}
          />
      </section>

      {/* Categories Section - Full Width Background */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-black font-serif">
              {t('nav.categories') || "Explore Categories"}
            </h2>
            <Link href="/categories" className="text-black font-bold hover:text-gray-600 flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <CollectionGrid />
        </div>
      </section>

      {/* New Releases Section */}
      <section className="py-12 container mx-auto px-4 md:px-8">
        <BookRow 
          title={t('home.newReleases') || "New Releases"} 
          books={newReleaseBooks} 
          viewAllLink="/new-releases"
          icon={<Truck className="w-5 h-5" />}
        />
      </section>

      {/* Bestsellers Section - Dark Theme */}
      <section className="py-16 bg-black text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <BookRow 
            title={t('home.bestsellers') || "Bestsellers"}
            subtitle={t('home.bestsellersSubtitle') || "Most popular books among our customers"}
            books={bestsellerBooks} 
            viewAllLink="/bestsellers"
            icon={<ShieldCheck className="w-5 h-5" />}
            variant="dark"
          />
        </div>
      </section>

      {/* Featured Authors */}
      <section className="py-12 container mx-auto px-4 md:px-8">
        <FeaturedAuthorsRow />
      </section>

      {/* Quote Section */}
      <section className="py-12 container mx-auto px-4 md:px-8">
        <QuoteSection />
      </section>

      {/* Newsletter Section */}
      <section className="py-12 container mx-auto px-4 md:px-8">
        <NewsletterSection />
      </section>

    </div>
  );
}