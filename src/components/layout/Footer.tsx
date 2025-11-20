'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ک</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('site.title')}</h3>
                <p className="text-sm text-gray-400">{t('site.description')}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              {t('footer.aboutDescription')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.748.096.119.108.223.080.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.717-1.378l-.734 2.778c-.265 1.019-.982 2.302-1.460 3.079C9.090 23.651 10.537 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2c2.308 0 2.584.012 3.492.052.844.038 1.304.177 1.609.295.404.157.69.346.996.652.306.306.495.592.652.996.118.305.257.765.295 1.609.04.908.052 1.184.052 3.492s-.012 2.584-.052 3.492c-.038.844-.177 1.304-.295 1.609-.157.404-.346.69-.652.996-.306.306-.592.495-.996.652-.305.118-.765.257-1.609.295-.908.04-1.184.052-3.492.052s-2.584-.012-3.492-.052c-.844-.038-1.304-.177-1.609-.295-.404-.157-.69-.346-.996-.652-.306-.306-.495-.592-.652-.996-.118-.305-.257-.765-.295-1.609-.04-.908-.052-1.184-.052-3.492s.012-2.584.052-3.492c.038-.844.177-1.304.295-1.609.157-.404.346-.69.652-.996.306-.306.592-.495.996-.652.305-.118.765-.257 1.609-.295.908-.04 1.184-.052 3.492-.052M12.04 0C9.718 0 9.424.012 8.506.052 7.59.092 6.99.244 6.464.463c-.548.226-.984.527-1.404.948-.42.42-.722.856-.948 1.404-.219.526-.371 1.126-.411 2.042C3.661 6.775 3.649 7.069 3.649 9.391s.012 2.616.052 3.534c.04.916.192 1.516.411 2.042.226.548.527.984.948 1.404.42.42.856.722 1.404.948.526.219 1.126.371 2.042.411.918.04 1.212.052 3.534.052s2.616-.012 3.534-.052c.916-.04 1.516-.192 2.042-.411.548-.226.984-.527 1.404-.948.42-.42.722-.856.948-1.404.219-.526.371-1.126.411-2.042.04-.918.052-1.212.052-3.534s-.012-2.616-.052-3.534c-.04-.916-.192-1.516-.411-2.042-.226-.548-.527-.984-.948-1.404-.42-.42-.856-.722-1.404-.948-.526-.219-1.126-.371-2.042-.411C14.656.012 14.362 0 12.04 0zm0 5.867a6.133 6.133 0 100 12.266 6.133 6.133 0 000-12.266zM12.04 16c-2.206 0-3.994-1.788-3.994-3.994s1.788-3.994 3.994-3.994 3.994 1.788 3.994 3.994S14.246 16 12.04 16zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">{t('nav.about')}</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">{t('footer.contact')}</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white transition-colors">
                {t('footer.shipping')}
              </Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-white transition-colors">
                {t('footer.returns')}
              </Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                {t('footer.faq')}
              </Link></li>
              <li><Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                {t('footer.help')}
              </Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('nav.categories')}</h4>
            <ul className="space-y-2">
              <li><Link href="/category/literature" className="text-gray-300 hover:text-white transition-colors">{t('categories.literature')}</Link></li>
              <li><Link href="/category/poetry" className="text-gray-300 hover:text-white transition-colors">{t('categories.poetry')}</Link></li>
              <li><Link href="/category/history" className="text-gray-300 hover:text-white transition-colors">{t('categories.history')}</Link></li>
              <li><Link href="/category/children" className="text-gray-300 hover:text-white transition-colors">{t('categories.children')}</Link></li>
              <li><Link href="/category/education" className="text-gray-300 hover:text-white transition-colors">{t('categories.education')}</Link></li>
              <li><Link href="/category/science" className="text-gray-300 hover:text-white transition-colors">{t('categories.science')}</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.newsletter')}</h4>
            <p className="text-gray-300 mb-4">
              {t('footer.newsletterDescription')}
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1 px-4 py-2 rounded-r-md rtl:rounded-r-none rtl:rounded-l-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-l-md rtl:rounded-l-none rtl:rounded-r-md hover:bg-blue-700 transition-colors">
                {t('footer.subscribe')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 {t('footer.copyright')}
            </div>
            <div className="flex space-x-6 rtl:space-x-reverse text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                {t('footer.terms')}
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                {t('footer.cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}