'use client';

import React from 'react';
import { Order } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    items: [
      {
        book: {
          id: '1',
          title: 'میم و زین',
          author: 'ئەحمەد موختار جاف',
          publisher: 'دەزگای چاپ و بڵاوکردنەوەی کوردستان',
          price: 25000,
          image: '/images/books/meem-w-zeen.jpg',
          description: 'رۆمانێکی کوردی کلاسیک',
          isbn: '978-964-123-456-1',
          pages: 320,
          language: 'kurdish',
          category: 'ئەدەبیات',
          tags: ['رۆمان', 'کلاسیک'],
          publishedDate: '2020-01-15',
          inStock: true,
          featured: true,
          bestseller: true,
          newRelease: false,
          rating: 4.8,
          reviewCount: 125
        },
        quantity: 1
      },
      {
        book: {
          id: '2',
          title: 'شیعرەکانی پیرەمێرد',
          author: 'پیرەمێرد',
          publisher: 'چاپخانەی کوردستان',
          price: 18000,
          image: '/images/books/piramaerd-poems.jpg',
          description: 'کۆمەڵە شیعرەکانی پیرەمێرد',
          isbn: '978-964-123-456-2',
          pages: 240,
          language: 'kurdish',
          category: 'شیعر',
          tags: ['شیعر', 'کلاسیک'],
          publishedDate: '2019-05-20',
          inStock: true,
          featured: false,
          bestseller: true,
          newRelease: false,
          rating: 4.6,
          reviewCount: 89
        },
        quantity: 2
      }
    ],
    totalAmount: 61000,
    status: 'delivered',
    shippingAddress: {
      firstName: 'کاروان',
      lastName: 'احمد',
      street: 'شەقامی سەلاحەدین',
      city: 'هەولێر',
      state: 'کوردستان',
      zipCode: '44001',
      country: 'عێراق',
      phone: '+964 750 123 4567'
    },
    paymentMethod: 'cash',
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2024-10-22'),
    deliveredAt: new Date('2024-10-22')
  },
  {
    id: 'ORD-002',
    userId: '1',
    items: [
      {
        book: {
          id: '3',
          title: 'مێژووی کورد',
          author: 'محەمەد ئەمین زەکی',
          publisher: 'دەزگای چاپ و بڵاوکردنەوەی کوردستان',
          price: 35000,
          image: '/images/books/history-of-kurds.jpg',
          description: 'مێژووی گەلی کورد',
          isbn: '978-964-123-456-3',
          pages: 480,
          language: 'kurdish',
          category: 'مێژوو',
          tags: ['مێژوو', 'کورد'],
          publishedDate: '2021-03-10',
          inStock: true,
          featured: true,
          bestseller: false,
          newRelease: false,
          rating: 4.9,
          reviewCount: 156
        },
        quantity: 1
      }
    ],
    totalAmount: 35000,
    status: 'processing',
    shippingAddress: {
      firstName: 'کاروان',
      lastName: 'احمد',
      street: 'شەقامی سەلاحەدین',
      city: 'هەولێر',
      state: 'کوردستان',
      zipCode: '44001',
      country: 'عێراق',
      phone: '+964 750 123 4567'
    },
    paymentMethod: 'bank_transfer',
    createdAt: new Date('2024-11-10'),
    updatedAt: new Date('2024-11-15')
  }
];

interface OrdersTabProps {
  userId: string;
}

export default function OrdersTab({ userId }: OrdersTabProps) {
  const { t } = useLanguage();
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'processing':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'shipped':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'delivered':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'چاوەڕێی پەسەندکردن';
      case 'processing':
        return 'لە ڕێگادایە';
      case 'shipped':
        return 'نێردراوە';
      case 'delivered':
        return 'گەیشتووە';
      case 'cancelled':
        return 'هەڵوەشێنراوە';
      default:
        return status;
    }
  };

  const userOrders = mockOrders.filter(order => order.userId === userId);

  if (userOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-gray-400 dark:text-gray-500 text-2xl">📦</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">هیچ داواکارییەک نییە</h3>
        <p className="text-gray-500 dark:text-gray-400">تۆ تا ئێستا هیچ داواکارییەکت ئەنجام نەداوە.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">داواکارییەکان</h2>
      
      <div className="space-y-4">
        {userOrders.map((order) => (
          <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors duration-300">
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">ژمارەی داواکاری</p>
                  <p className="font-medium text-gray-900 dark:text-white">#{order.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">بەروار</p>
                  <p className="font-medium text-gray-900 dark:text-white">{order.createdAt.toLocaleDateString('ku-Arab-IQ', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">کۆی گشتی</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatPrice(order.totalAmount)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                  وردەکاری
                </button>
              </div>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800">
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="relative w-16 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {item.book.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.book.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.book.author}</p>
                      <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>{formatPrice(item.book.price * item.quantity)}</span>
                        <span className="mx-2">•</span>
                        <span>{item.quantity} دانە</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}