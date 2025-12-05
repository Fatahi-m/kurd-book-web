"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, CreditCard, BookOpen } from "lucide-react";

export default function Footer() {
  const { t, currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ku";
  
  return (
    <footer className={`bg-white text-gray-600 pt-20 pb-10 border-t border-gray-200 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Newsletter Section - Premium Dark Card */}
        <div className="relative overflow-hidden bg-black p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-800 mb-16">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-gray-800/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-gray-800/30 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left rtl:lg:text-right">
              <h3 className="text-3xl font-bold text-white mb-3 tracking-tight font-serif">
                {t("footer.newsletter") || "Join Our Literary Community"}
              </h3>
              <p className="text-gray-400 text-lg">
                {t("footer.newsletterDescription") || "Get the latest updates, new releases, and special offers delivered directly to your inbox."}
              </p>
            </div>
            <form className="flex w-full lg:w-auto gap-3 flex-col sm:flex-row">
              <input 
                type="email" 
                placeholder={t("footer.emailPlaceholder") || "Your email address"}
                className="flex-1 sm:w-80 bg-white/10 border border-gray-700 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
              <button className="bg-white hover:bg-gray-200 text-black px-8 py-4 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                <span>{t("footer.subscribe") || "Subscribe"}</span>
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Contact */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg group-hover:bg-gray-800 transition-all duration-300">
                <BookOpen size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-black tracking-tight leading-none">
                  {t('app.name') || 'KURD BOOK'}
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium">
                  {t('app.tagline') || 'EST. 2025'}
                </span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t('footer.description') || "Your premier destination for Kurdish literature, culture, and history. Connecting readers with the richness of our heritage through a carefully curated selection of books."}
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 text-sm text-gray-500 group hover:text-black transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-medium">+964 750 123 4567</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 group hover:text-black transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-medium">support@kurdbook.com</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 group hover:text-black transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-medium">Erbil, Kurdistan Region</span>
              </div>
            </div>
          </div>

          {/* Column 2: Shop & Support */}
          <div>
            <h4 className="text-sm font-bold text-black uppercase tracking-widest mb-8 border-b border-gray-200 pb-4 inline-block">
              {t("footer.aboutShop") || "Shop & Support"}
            </h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/about" className="text-gray-500 hover:text-black transition-colors flex items-center gap-2 hover:translate-x-1 duration-300"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>{t("nav.about")}</Link></li>
              <li><Link href="/contact" className="text-gray-500 hover:text-black transition-colors flex items-center gap-2 hover:translate-x-1 duration-300"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>{t("footer.contact")}</Link></li>
              <li><Link href="/shipping" className="text-gray-500 hover:text-black transition-colors flex items-center gap-2 hover:translate-x-1 duration-300"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>{t("footer.shipping")}</Link></li>
              <li><Link href="/returns" className="text-gray-500 hover:text-black transition-colors flex items-center gap-2 hover:translate-x-1 duration-300"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>{t("footer.returns") || "Returns & Refunds"}</Link></li>
              <li><Link href="/faq" className="text-gray-500 hover:text-black transition-colors flex items-center gap-2 hover:translate-x-1 duration-300"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>{t("footer.faq")}</Link></li>
            </ul>
          </div>

          {/* Column 3: Top Categories */}
          <div>
            <h4 className="text-sm font-bold text-black uppercase tracking-widest mb-8 border-b border-gray-200 pb-4 inline-block">
              {t("nav.categories")}
            </h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/category/literature" className="text-gray-500 hover:text-black transition-colors flex items-center gap-2 hover:translate-x-1 duration-300"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>{t("categories.literature")}</Link></li>
              <li><Link href="/category/poetry" className="text-gray-500 hover:text-black transition-colors flex items-center gap-2 hover:translate-x-1 duration-300"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>{t("categories.poetry")}</Link></li>
              <li><Link href="/category/history" className="text-gray-500 hover:text-black transition-colors flex items-center gap-2 hover:translate-x-1 duration-300"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>{t("categories.history")}</Link></li>
              <li><Link href="/category/children" className="text-gray-500 hover:text-black transition-colors flex items-center gap-2 hover:translate-x-1 duration-300"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>{t("categories.children")}</Link></li>
              <li><Link href="/categories" className="text-black font-bold hover:text-gray-600 text-xs mt-2 inline-flex items-center gap-1 uppercase tracking-wide transition-colors">View All Categories &rarr;</Link></li>
            </ul>
          </div>

          {/* Column 4: Social & Legal */}
          <div>
            <h4 className="text-sm font-bold text-black uppercase tracking-widest mb-8 border-b border-gray-200 pb-4 inline-block">
              {t("footer.followUs") || "Stay Connected"}
            </h4>
            <div className="flex gap-3 mb-10">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-all hover:-translate-y-1">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-all hover:-translate-y-1">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-all hover:-translate-y-1">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-all hover:-translate-y-1">
                <Youtube size={18} />
              </a>
            </div>
            
            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Legal</h5>
            <ul className="space-y-3 text-sm">
              <li><Link href="/terms" className="text-gray-500 hover:text-black transition-colors">{t("footer.terms") || "Terms & Conditions"}</Link></li>
              <li><Link href="/privacy" className="text-gray-500 hover:text-black transition-colors">{t("footer.privacy") || "Privacy Policy"}</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500">
            © 2025 Kurd Book Store. {t("footer.copyright") || "All rights reserved."}
          </p>
          
          {/* Payment Icons */}
          <div className="flex gap-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-200">VISA</div>
            <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-200">MC</div>
            <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-200">AMEX</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
// ...تمام کدهای اضافی حذف شد...
