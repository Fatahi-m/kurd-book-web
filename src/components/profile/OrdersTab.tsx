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
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-gray-400 text-2xl">📦</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ داواکارییەکت نەکردووە</h3>
        <p className="text-gray-500 mb-4">کاتێک داواکارییەک دەکەیت، لێرە دەبینیتەوە</p>
        <a
          href="/books"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          دان بە کتابەکانەوە
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">داواکارییەکانت</h2>
        <p className="text-sm text-gray-600">{userOrders.length} داواکاری</p>
      </div>

      {userOrders.map((order) => (
        <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* Order Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-2 sm:mb-0">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">#{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    {order.createdAt.toLocaleDateString('ku-Arab-IQ', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
              <div className="text-left rtl:text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {formatPrice(order.totalAmount)}
                </p>
                <p className="text-sm text-gray-600">
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)} بڕگە
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="px-6 py-4">
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0 w-12 h-16 bg-gray-200 rounded">
                    {/* Placeholder for book image */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {item.book.title.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.book.title}
                    </h4>
                    <p className="text-sm text-gray-600">{item.book.author}</p>
                    <p className="text-xs text-gray-500">بڕ: {item.quantity}</p>
                  </div>
                  <div className="text-right rtl:text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(item.book.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>ڕێگای پارەدان: {order.paymentMethod === 'cash' ? 'کاش' : order.paymentMethod === 'card' ? 'کارت' : 'کارەبا بانکی'}</p>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                بینینی وردەکارییەکان
              </button>
              {order.status === 'delivered' && (
                <button className="px-3 py-1 text-sm text-green-600 hover:text-green-800">
                  دانپێدانان
                </button>
              )}
              {order.status === 'pending' && (
                <button className="px-3 py-1 text-sm text-red-600 hover:text-red-800">
                  هەڵوەشاندن
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}