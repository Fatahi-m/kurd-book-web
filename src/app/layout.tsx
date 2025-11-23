import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/mobile.css'
import 'vazirmatn/Vazirmatn-font-face.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/contexts/CartContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ReviewProvider } from '@/contexts/ReviewContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'کتابخانەی کوردی - Kurdish Library',
  description: 'باشترین فرۆشگای ئۆنلاین بۆ کتابەکانی کوردی - The best online store for Kurdish books',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'کتابخانەی کوردی'
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'msapplication-TileColor': '#2563eb',
    'msapplication-config': 'none'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ku" dir="rtl">
      <body className="font-vazir antialiased transition-all duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <ReviewProvider>
                  <ThemeProvider>
                    <div className="min-h-screen flex flex-col">
                      <Header />
                      <main className="flex-1">
                        {children}
                      </main>
                      <Footer />
                    </div>
                  </ThemeProvider>
                </ReviewProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}