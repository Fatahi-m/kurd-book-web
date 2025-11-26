import type { Metadata, Viewport } from 'next'
import { Inter, Vazirmatn, Playfair_Display, Lora } from 'next/font/google'
import './globals.css'
import '../styles/mobile.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomNav from '@/components/layout/BottomNav'
import AboutSummary from '@/components/ui/AboutSummary'
import { CartProvider } from '@/contexts/CartContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ReviewProvider } from '@/contexts/ReviewContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

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
    'msapplication-TileColor': '#e11d48',
    'msapplication-config': 'none'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
  themeColor: '#e11d48',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ku" dir="rtl">
      <body className={`${vazirmatn.variable} ${playfair.variable} ${lora.variable} ${inter.variable} font-sans font-light antialiased transition-all duration-300 bg-slate-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100`}>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <ReviewProvider>
                  <ThemeProvider>
                    <div className="min-h-screen flex flex-col">
                      <Header />
                      <main className="flex-1 pb-16 md:pb-0">
                        {children}
                      </main>
                      <AboutSummary />
                      <Footer />
                      <BottomNav />
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