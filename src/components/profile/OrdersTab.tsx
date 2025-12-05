'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/utils';
import { adminDataService, AdminOrder } from '@/lib/adminDataService';
import { Package, Truck, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface OrdersTabProps {
  userId: string;
}

export default function OrdersTab({ userId }: OrdersTabProps) {
  const { t, currentLanguage } = useLanguage();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const userOrders = adminDataService.getOrdersByUserId(userId);
    setOrders(userOrders);
    setLoading(false);
  }, [userId]);
  
  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status: AdminOrder['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: AdminOrder['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: AdminOrder['status']) => {
    if (currentLanguage === 'ku') {
      switch (status) {
        case 'pending': return 'چاوەڕێی پەسەندکردن';
        case 'processing': return 'لە ڕێگادایە';
        case 'shipped': return 'نێردراوە';
        case 'delivered': return 'گەیشتووە';
        case 'cancelled': return 'هەڵوەشێنراوە';
        default: return status;
      }
    } else if (currentLanguage === 'en') {
      return status.charAt(0).toUpperCase() + status.slice(1);
    } else {
      // Kurmanji translations
      switch (status) {
        case 'pending': return 'Li benda erêkirinê';
        case 'processing': return 'Di pêvajoyê de';
        case 'shipped': return 'Hatiye şandin';
        case 'delivered': return 'Gihîştiye';
        case 'cancelled': return 'Hatiye betalkirin';
        default: return status;
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {currentLanguage === 'ku' ? 'هیچ داواکارییەک نییە' : currentLanguage === 'en' ? 'No orders yet' : 'Ti ferman tune'}
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {currentLanguage === 'ku' 
            ? 'تۆ تا ئێستا هیچ داواکارییەکت ئەنجام نەداوە. دەست بکە بە کڕین!' 
            : currentLanguage === 'en' 
              ? 'You haven\'t placed any orders yet. Start shopping now!' 
              : 'We hîn ti ferman nedaye. Niha dest bi kirînê bikin!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Package className="w-6 h-6 text-blue-600" />
        {currentLanguage === 'ku' ? 'داواکارییەکان' : currentLanguage === 'en' ? 'My Orders' : 'Fermanên min'}
      </h2>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
            <div 
              className="p-5 cursor-pointer flex flex-wrap items-center justify-between gap-4"
              onClick={() => toggleOrder(order.id)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">
                    {currentLanguage === 'ku' ? 'ژمارەی داواکاری' : currentLanguage === 'en' ? 'Order ID' : 'Hejmara Fermanê'}
                  </p>
                  <p className="font-bold text-gray-900 font-mono">#{order.id.substring(0, 8)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">
                    {currentLanguage === 'ku' ? 'بەروار' : currentLanguage === 'en' ? 'Date' : 'Dîrok'}
                  </p>
                  <p className="font-medium text-gray-900">
                    {new Date(order.date).toLocaleDateString(currentLanguage === 'ku' ? 'ku-IQ' : currentLanguage === 'kmr' ? 'ku-TR' : 'en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">
                    {currentLanguage === 'ku' ? 'کۆی گشتی' : currentLanguage === 'en' ? 'Total' : 'Giştî'}
                  </p>
                  <p className="font-bold text-blue-600">{formatPrice(order.total)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 ml-auto sm:ml-0">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {getStatusText(order.status)}
                </span>
                {expandedOrder === order.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
            
            {expandedOrder === order.id && (
              <div className="border-t border-gray-100 bg-gray-50 p-5 animate-fade-in">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-100">
                      <div className="relative w-16 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden shadow-sm">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {item.title.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">{item.author}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium">{formatPrice(item.price)}</span>
                            <span className="mx-2 text-gray-300">×</span>
                            <span>{item.quantity}</span>
                          </div>
                          <span className="font-bold text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-end pt-4 border-t border-gray-200">
                  <div className="text-right space-y-1">
                    <div className="flex justify-between gap-8 text-sm text-gray-500">
                      <span>{currentLanguage === 'ku' ? 'کۆی کاڵاکان' : 'Subtotal'}</span>
                      <span>{formatPrice(order.total)}</span>
                    </div>
                    <div className="flex justify-between gap-8 text-sm text-gray-500">
                      <span>{currentLanguage === 'ku' ? 'گەیاندن' : 'Shipping'}</span>
                      <span className="text-green-600">{currentLanguage === 'ku' ? 'بێ بەرامبەر' : 'Free'}</span>
                    </div>
                    <div className="flex justify-between gap-8 text-lg font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
                      <span>{currentLanguage === 'ku' ? 'کۆی گشتی' : 'Total'}</span>
                      <span className="text-blue-600">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}