'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
// import OrdersTab from '@/components/profile/OrdersTab';
// import FavoritesTab from '@/components/profile/FavoritesTab';
// import SettingsTab from '@/components/profile/SettingsTab';

function ProfileContent() {
  const { user, isAuthenticated, isLoading, logout, updateProfile } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    // Check for tab parameter in URL
    const tab = searchParams.get('tab');
    if (tab && ['profile', 'orders', 'favorites', 'settings'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || ''
        }
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSaveProfile = async () => {
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              {t('profile.logout')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <nav className="space-y-1 p-4">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-right rtl:text-right px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t('profile.personalInfo')}
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-right rtl:text-right px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t('profile.orders')}
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full text-right rtl:text-right px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'favorites' 
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t('profile.wishlist')}
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-right rtl:text-right px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              {activeTab === 'profile' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">{t('profile.personalInfo')}</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      {isEditing ? t('buttons.cancel') : t('buttons.edit')}
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="text-gray-900">{user.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="text-gray-900">{user.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ئیمەیل
                      </label>
                      <p className="text-gray-900">{user.email}</p>
                      <p className="text-xs text-gray-500 mt-1">ئیمەیل ناگۆڕدرێت</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ژمارەی تەلەفۆن
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{user.phone || 'زیادنەکراوە'}</p>
                      )}
                    </div>

                    {/* Address Section */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">ناونیشان</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            شەقام
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address.street"
                              value={formData.address.street}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-900">{user.address?.street || 'زیادنەکراوە'}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            شار
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address.city"
                              value={formData.address.city}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-900">{user.address?.city || 'زیادنەکراوە'}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            دەوڵەت/پارێزگا
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address.state"
                              value={formData.address.state}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-900">{user.address?.state || 'زیادنەکراوە'}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            وڵات
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address.country"
                              value={formData.address.country}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-900">{user.address?.country || 'زیادنەکراوە'}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-4 rtl:space-x-reverse">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          {t('buttons.cancel')}
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          {t('buttons.save')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('profile.orders')}</h2>
                  <p className="text-gray-600">{t('profile.noOrders')}</p>
                </div>
              )}

              {activeTab === 'favorites' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('profile.wishlist')}</h2>
                  <p className="text-gray-600">No favorite books yet</p>
                </div>  
              )}

              {activeTab === 'settings' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
                  <p className="text-gray-600">Settings panel coming soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading profile...</p>
      </div>
    </div>}>
      <ProfileContent />
    </Suspense>
  );
}