'use client';

import { Book } from '@/lib/types';
import { bookService } from '@/lib/bookService';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import EditorialHero from '@/components/ui/EditorialHero';
import ClassicBookRow from '@/components/ui/ClassicBookRow';
import ImmersiveBookSpotlight from '@/components/ui/ImmersiveBookSpotlight';
import CollectionGrid from '@/components/ui/CollectionGrid';
import LiteraryTicker from '@/components/ui/LiteraryTicker';
import AboutSummary from '@/components/ui/AboutSummary';
import Link from 'next/link';

export default function HomePage() {
  const { t, currentLanguage } = useLanguage();
  const [featuredBook, setFeaturedBook] = useState<Book | null>(null);
  const [bestsellerBooks, setBestsellerBooks] = useState<Book[]>([]);
  const [newReleaseBooks, setNewReleaseBooks] = useState<Book[]>([]);
  const [classicBooks, setClassicBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Load books
    const allBooks = bookService.getAllBooks();
    const featured = bookService.getFeaturedBooks();
    
    // Set the main hero book (first featured or first available)
    setFeaturedBook(featured.length > 0 ? featured[0] : allBooks[0]);
    
    setBestsellerBooks(bookService.getBestsellerBooks());
    setNewReleaseBooks(bookService.getNewReleaseBooks());
    
    // Simulate a "Classics" collection
    setClassicBooks(allBooks.slice(0, 4));
  }, []);

  if (!featuredBook) return null;

  // Dynamic Spotlight Data based on language
  const spotlightData = currentLanguage === 'ku' ? {
    title: "دیوانی شێرکۆ بێکەس",
    author: "شێرکۆ بێکەس",
    description: "کۆبەرهەمی شاعیری گەورەی کورد، شێرکۆ بێکەس. ئەم دیوانە هەڵگری ئەزموونێکی قوڵی شیعرییە کە ئازار و هیواکانی نەتەوەیەک دەگێڕێتەوە. شاکارێک کە هەموو کتێبخانەیەک پێویستی پێیەتی.",
    image: "https://upload.wikimedia.org/wikipedia/ckb/a/a4/Sherko_Bekas_Portrait.jpg", // Placeholder
    link: "/author/sherko-bekas"
  } : {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    description: "The final novel by the Russian author Fyodor Dostoevsky. Dostoevsky spent nearly two years writing The Brothers Karamazov, which was published as a serial in The Russian Messenger from January 1879 to November 1880.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    link: "/book/dostoevsky-karamazov"
  };

  return (
    <main className="min-h-screen bg-[#F5F2E9] dark:bg-[#121212] transition-colors duration-500">
      
      {/* 0. Literary Ticker (The "Frame" with moving text) */}
      <LiteraryTicker />

      {/* 1. Editorial Hero Section (The Statement) */}
      <EditorialHero book={featuredBook} />

      {/* 2. Curated Collection: New Arrivals */}
      <ClassicBookRow 
        title={t('sections.newReleases') || 'New Arrivals'} 
        subtitle="Discover the latest additions to our curated library."
        books={newReleaseBooks}
        viewAllLink="/new-releases"
      />

      {/* 3. Mosaic Collection Grid (Categories) */}
      <CollectionGrid />

      {/* 4. Immersive Book Spotlight (Replaces Featured Author) */}
      <ImmersiveBookSpotlight 
        title={spotlightData.title}
        author={spotlightData.author}
        description={spotlightData.description}
        image={spotlightData.image}
        link={spotlightData.link}
      />

      {/* 5. Curated Collection: Bestsellers */}
      <ClassicBookRow 
        title={t('sections.bestSellers') || 'Bestsellers'} 
        subtitle="The books everyone is talking about this season."
        books={bestsellerBooks}
        viewAllLink="/bestsellers"
      />

      {/* 6. Quote / Intermission Section */}
      <section className="py-24 bg-[#2c2c2c] dark:bg-[#000] text-[#F5F2E9] text-center px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-6xl font-serif opacity-30 block mb-4">“</span>
          <p className="text-2xl md:text-4xl font-serif leading-relaxed mb-8 italic">
            A room without books is like a body without a soul.
          </p>
          <p className="text-sm tracking-widest uppercase opacity-70">— Marcus Tullius Cicero</p>
        </div>
      </section>

      {/* 7. Curated Collection: Classics */}
      <ClassicBookRow 
        title="Modern Classics" 
        subtitle="Timeless stories that have shaped our world."
        books={classicBooks}
        viewAllLink="/books"
      />

      {/* 8. Minimalist Newsletter */}
      <section className="py-24 border-t border-[#e5e5e5] dark:border-[#333]">
        <div className="container mx-auto px-6 text-center max-w-xl">
          <h3 className="text-2xl font-serif text-[#2c2c2c] dark:text-[#e0e0e0] mb-4">
            Join Our Literary Circle
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 font-light">
            Receive updates on new arrivals, exclusive author interviews, and curated reading lists.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="flex-1 bg-transparent border-b border-[#2c2c2c] dark:border-[#e0e0e0] py-3 px-2 focus:outline-none text-[#2c2c2c] dark:text-[#e0e0e0] placeholder-gray-400"
            />
            <button className="px-8 py-3 bg-[#2c2c2c] dark:bg-[#e0e0e0] text-[#F5F2E9] dark:text-[#121212] text-xs tracking-widest uppercase hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* 9. About Summary (Pre-Footer) */}
      <AboutSummary />

    </main>
  );
}