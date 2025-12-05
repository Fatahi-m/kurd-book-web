'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, ShoppingCart, Heart, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { getCartItemCount } = useCart();
  const { getWishlistItemCount } = useWishlist();

  const cartCount = getCartItemCount();
  const wishlistCount = getWishlistItemCount();

  const navItems = [
    {
      href: '/',
      icon: Home,
      label: t('nav.home')
    },
    {
      href: '/books', // Or /categories if you prefer
      icon: Grid,
      label: t('nav.books')
    },
    {
      href: '/cart',
      icon: ShoppingCart,
      label: t('nav.cart'),
      badge: cartCount
    },
    {
      href: '/wishlist',
      icon: Heart,
      label: t('nav.wishlist'),
      badge: wishlistCount
    },
    {
      href: '/profile',
      icon: User,
      label: t('nav.profile')
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe-area-bottom md:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-colors duration-300">
      <nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 relative ${
                isActive
                  ? 'text-rose-600'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <item.icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
                />
                {item.badge ? (
                  <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1 border-2 border-white">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-medium truncate max-w-[64px]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
