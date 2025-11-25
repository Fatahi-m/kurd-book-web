"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t, currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ku";
  
  return (
    <footer className={`bg-gray-100 dark:bg-[#0f172a] text-gray-600 dark:text-gray-400 pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Newsletter Section - Libristo Style */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100 dark:border-slate-700">
          <div className="max-w-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t("footer.newsletter")}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("footer.newsletterDescription")}
            </p>
          </div>
          <form className="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              placeholder={t("footer.emailPlaceholder")}
              className="flex-1 md:w-80 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button className="bg-[#e11d48] hover:bg-[#be123c] text-white px-6 py-3 text-sm font-bold rounded-lg transition-all uppercase tracking-wide">
              {t("footer.subscribe")}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: About Purchase */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-[#313131] dark:text-white border-b-2 border-[#e11d48] inline-block pb-1">
              {t("footer.aboutPurchase") || "About Purchase"}
            </h4>
            <ul className="space-y-3">
              <li><Link href="/shipping" className="text-sm hover:text-[#e11d48] dark:hover:text-[#e11d48] transition-colors">{t("footer.shipping")}</Link></li>
              <li><Link href="/payment" className="text-sm hover:text-[#e11d48] dark:hover:text-[#e11d48] transition-colors">{t("footer.payment") || "Payment Methods"}</Link></li>
              <li><Link href="/returns" className="text-sm hover:text-[#e11d48] dark:hover:text-[#e11d48] transition-colors">{t("footer.returns") || "Returns & Refunds"}</Link></li>
              <li><Link href="/faq" className="text-sm hover:text-[#e11d48] dark:hover:text-[#e11d48] transition-colors">{t("footer.faq")}</Link></li>
            </ul>
          </div>

          {/* Column 2: About Shop */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-[#313131] dark:text-white border-b-2 border-[#e11d48] inline-block pb-1">
              {t("footer.aboutShop") || "About Shop"}
            </h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm hover:text-[#e11d48] dark:hover:text-[#e11d48] transition-colors">{t("nav.about")}</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-[#e11d48] dark:hover:text-[#e11d48] transition-colors">{t("footer.contact")}</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-[#e11d48] dark:hover:text-[#e11d48] transition-colors">{t("footer.terms") || "Terms & Conditions"}</Link></li>
              <li><Link href="/privacy" className="text-sm hover:text-[#e11d48] dark:hover:text-[#e11d48] transition-colors">{t("footer.privacy") || "Privacy Policy"}</Link></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-[#313131] dark:text-white border-b-2 border-[#e11d48] inline-block pb-1">
              {t("nav.categories")}
            </h4>
            <ul className="space-y-3">
              <li><Link href="/category/literature" className="text-sm hover:text-[#e11d48] dark:hover:text-[#e11d48] transition-colors">{t("categories.literature")}</Link></li>
              <li><Link href="/category/poetry" className="text-sm hover:text-[#e11d48] dark:hover:text-[#e11d48] transition-colors">{t("categories.poetry")}</Link></li>
              <li><Link href="/category/history" className="text-sm hover:text-[#e11d48] dark:hover:text-[#e11d48] transition-colors">{t("categories.history")}</Link></li>
              <li><Link href="/category/children" className="text-sm hover:text-[#e11d48] dark:hover:text-[#e11d48] transition-colors">{t("categories.children")}</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-[#313131] dark:text-white border-b-2 border-[#e11d48] inline-block pb-1">
              {t("footer.followUs") || "Follow Us"}
            </h4>
            <p className="text-xs text-gray-500 mb-4 italic">Let's stay together</p>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#e11d48] hover:text-white dark:hover:bg-[#e11d48] dark:hover:text-white transition-all shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.414 3.678 1.395c-.98.98-1.263 2.092-1.322 3.373C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.059 1.281.342 2.393 1.322 3.373.981.981 2.093 1.264 3.374 1.323C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.342 3.374-1.323.98-.98 1.263-2.092 1.322-3.373.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.059-1.281-.342-2.393-1.322-3.373-.981-.981-2.093-1.264-3.374-1.323C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#e11d48] hover:text-white dark:hover:bg-[#e11d48] dark:hover:text-white transition-all shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#e11d48] hover:text-white dark:hover:bg-[#e11d48] dark:hover:text-white transition-all shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t("footer.contact")}: <br />
              <span className="font-bold text-gray-900 dark:text-white">+964 750 123 4567</span><br />
              support@kurdbook.com
            </p>
          </div>

        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 Kurd Book Store. {t("footer.copyright")}
          </p>
          
          {/* Payment Icons */}
          <div className="flex gap-3 opacity-70 grayscale hover:grayscale-0 transition-all">
            <div className="h-6 w-10 bg-gray-200 dark:bg-slate-700 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
            <div className="h-6 w-10 bg-gray-200 dark:bg-slate-700 rounded flex items-center justify-center text-[10px] font-bold">MC</div>
            <div className="h-6 w-10 bg-gray-200 dark:bg-slate-700 rounded flex items-center justify-center text-[10px] font-bold">AMEX</div>
            <div className="h-6 w-10 bg-gray-200 dark:bg-slate-700 rounded flex items-center justify-center text-[10px] font-bold">PAYPAL</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
// ...تمام کدهای اضافی حذف شد...
