"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t, currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ku";
  return (
    <footer className={`bg-gray-100 dark:bg-[#13172B] text-gray-600 dark:text-gray-300 pt-0 pb-0 transition-colors duration-300 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Contact Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 py-6">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16 2v6a2 2 0 002 2h6" />
                <rect width="20" height="14" x="2" y="8" rx="2" />
                <path d="M2 8l10 6 10-6" />
              </svg>
              {t("footer.email")}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92V19a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2h2.09a2 2 0 012 1.72c.13.81.36 1.6.7 2.34a2 2 0 01-.45 2.11l-.27.27a16 16 0 006.29 6.29l.27-.27a2 2 0 012.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0122 16.92z" />
              </svg>
              {t("footer.phone")}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17.657 16.657L13.414 12.414a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414z" />
              </svg>
              {t("footer.address")}
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <img src="/images/logo.png" alt="KurdBook Logo" className="w-10 h-10 rounded-full bg-white p-1 shadow" />
          </div>
        </div>
        {/* Main Columns */}
        <div className="hidden md:flex w-full items-stretch border-b border-gray-200 dark:border-gray-700 pb-8">
          {/* About */}
          <div className="flex-1 flex flex-col min-h-[180px] px-4 border-r border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">{t("footer.aboutTitle")}</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t("footer.aboutText")}</p>
            <ul className="space-y-2 text-sm mt-auto">
              <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("nav.about")}</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("footer.contact")}</Link></li>
            </ul>
          </div>
          {/* Quick Links */}
          <div className="flex-1 flex flex-col min-h-[180px] px-4 border-r border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 7h20" />
              </svg>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">{t("footer.quickLinks")}</h4>
            </div>
            <ul className="space-y-2 text-sm mt-auto">
              <li><Link href="/shipping" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("footer.shipping")}</Link></li>
              <li><Link href="/returns" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("footer.returns")}</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("footer.faq")}</Link></li>
              <li><Link href="/help" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("footer.help")}</Link></li>
            </ul>
          </div>
          {/* Categories */}
          <div className="flex-1 flex flex-col min-h-[180px] px-4 border-r border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">{t("nav.categories")}</h4>
            </div>
            <ul className="space-y-2 text-sm mt-auto">
              <li><Link href="/category/literature" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("categories.literature")}</Link></li>
              <li><Link href="/category/poetry" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("categories.poetry")}</Link></li>
              <li><Link href="/category/history" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("categories.history")}</Link></li>
              <li><Link href="/category/children" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("categories.children")}</Link></li>
              <li><Link href="/category/education" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("categories.education")}</Link></li>
              <li><Link href="/category/science" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("categories.science")}</Link></li>
            </ul>
          </div>
          {/* Newsletter */}
          <div className="flex-1 flex flex-col min-h-[180px] px-4">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 7h20" />
              </svg>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">{t("footer.newsletter")}</h4>
            </div>
            <div className="bg-white dark:bg-[#181C34] border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-1 flex flex-col justify-between shadow-sm dark:shadow-inner transition-colors">
              <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{t("footer.newsletterDescription")}</p>
              <form className="flex flex-col gap-2 mt-auto">
                <input className="rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" placeholder={t("footer.emailPlaceholder")}/>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 rounded-md hover:from-blue-600 hover:to-purple-700 transition">{t("footer.subscribe")}</button>
              </form>
            </div>
          </div>
        </div>
        {/* Mobile Columns */}
        <div className="md:hidden grid grid-cols-1 gap-8 border-b border-gray-200 dark:border-gray-700 pb-8 pt-6">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">{t("footer.aboutTitle")}</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t("footer.aboutText")}</p>
            <ul className="space-y-2 text-sm mt-auto">
              <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("nav.about")}</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("footer.contact")}</Link></li>
            </ul>
          </div>
          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 7h20" />
              </svg>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">{t("footer.quickLinks")}</h4>
            </div>
            <ul className="space-y-2 text-sm mt-auto">
              <li><Link href="/shipping" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("footer.shipping")}</Link></li>
              <li><Link href="/returns" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("footer.returns")}</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("footer.faq")}</Link></li>
              <li><Link href="/help" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("footer.help")}</Link></li>
            </ul>
          </div>
          {/* Categories */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">{t("nav.categories")}</h4>
            </div>
            <ul className="space-y-2 text-sm mt-auto">
              <li><Link href="/category/literature" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("categories.literature")}</Link></li>
              <li><Link href="/category/poetry" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("categories.poetry")}</Link></li>
              <li><Link href="/category/history" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("categories.history")}</Link></li>
              <li><Link href="/category/children" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("categories.children")}</Link></li>
              <li><Link href="/category/education" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("categories.education")}</Link></li>
              <li><Link href="/category/science" className="hover:text-blue-600 dark:hover:text-blue-400 transition">{t("categories.science")}</Link></li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 7h20" />
              </svg>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">{t("footer.newsletter")}</h4>
            </div>
            <div className="bg-white dark:bg-[#181C34] border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-1 flex flex-col justify-between shadow-sm dark:shadow-inner transition-colors">
              <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{t("footer.newsletterDescription")}</p>
              <form className="flex flex-col gap-2 mt-auto">
                <input className="rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" placeholder={t("footer.emailPlaceholder")}/>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 rounded-md hover:from-blue-600 hover:to-purple-700 transition">{t("footer.subscribe")}</button>
              </form>
            </div>
          </div>
        </div>
        {/* Social Media Row */}
        <div className="flex justify-center items-center gap-8 py-6 border-b border-gray-200 dark:border-gray-700 mt-0">
          <a href="#" className="group transition" aria-label="Twitter">
            <svg className="w-8 h-8 text-gray-400 hover:text-blue-400 group-hover:scale-110 transition-all duration-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
          <a href="#" className="group transition" aria-label="Facebook">
            <svg className="w-8 h-8 text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group-hover:scale-110 transition-all duration-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
            </svg>
          </a>
          <a href="#" className="group transition" aria-label="Pinterest">
            <svg className="w-8 h-8 text-gray-400 hover:text-red-600 dark:hover:text-pink-500 group-hover:scale-110 transition-all duration-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.004 0C5.373 0 0 5.373 0 12.004c0 5.084 3.163 9.418 7.633 11.174-.106-.949-.2-2.404.041-3.44.22-.937 1.408-5.957 1.408-5.957s-.36-.72-.36-1.781c0-1.663.968-2.911 2.17-2.911 1.025 0 1.519.769 1.519 1.688 0 1.029-.654 2.567-.993 3.992-.285 1.193.601 2.165 1.777 2.165 2.13 0 3.77-2.245 3.77-5.487 0-2.861-2.064-4.869-5.012-4.869-3.413 0-5.413 2.562-5.413 5.199 0 1.033.395 2.143.89 2.748.097.119.109.223.081.345-.09.375-.294 1.199-.335 1.363-.054.225-.173.271-.403.165-1.497-.69-2.436-2.878-2.436-4.646 0-3.776 2.75-7.252 7.926-7.252 4.162 0 7.398 2.967 7.398 6.923 0 4.135-2.609 7.462-6.238 7.462-1.215 0-2.359-.629-2.719-1.378l-.735 2.778c-.266 1.019-.983 2.302-1.461 3.079C9.094 23.651 10.543 24 12.025 24c6.627 0 12-5.373 12-11.996C24 5.373 18.627 0 12.004 0"/>
            </svg>
          </a>
          <a href="#" className="group transition" aria-label="Instagram">
            <svg className="w-8 h-8 text-gray-400 hover:text-purple-600 dark:hover:text-purple-500 group-hover:scale-110 transition-all duration-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.414 3.678 1.395c-.98.98-1.263 2.092-1.322 3.373C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.059 1.281.342 2.393 1.322 3.373.981.981 2.093 1.264 3.374 1.323C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.342 3.374-1.323.98-.98 1.263-2.092 1.322-3.373.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.059-1.281-.342-2.393-1.322-3.373-.981-.981-2.093-1.264-3.374-1.323C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-6 text-xs text-gray-500 gap-2 pb-6">
          <img src="/images/logo.png" alt="KurdBook Logo" className="w-8 h-8 rounded-full bg-white p-1 shadow mx-2" />
          <span>© 2025 {t("footer.copyright")}</span>
          <div className="flex gap-4 mx-2">
            <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-white transition">{t("footer.privacy")}</Link>
            <Link href="/terms" className="hover:text-blue-600 dark:hover:text-white transition">{t("footer.terms")}</Link>
            <Link href="/cookies" className="hover:text-blue-600 dark:hover:text-white transition">{t("footer.cookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
// ...تمام کدهای اضافی حذف شد...
