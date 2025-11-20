import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'vazirmatn/Vazirmatn-font-face.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/contexts/CartContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'کتابخانەی کوردی - Kurdish Library',
  description: 'باشترین فرۆشگای ئۆنلاین بۆ کتابەکانی کوردی - The best online store for Kurdish books',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ku" dir="rtl">
      <body className="font-vazir antialiased transition-all duration-300">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}