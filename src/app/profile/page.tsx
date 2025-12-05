'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { User, Package, Heart, Settings, LogOut, Camera, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import OrdersTab from '@/components/profile/OrdersTab';
import FavoritesTab from '@/components/profile/FavoritesTab';
import SettingsTab from '@/components/profile/SettingsTab';
import { motion } from 'framer-motion';

function ProfileContent() {
  const { user, isAuthenticated, isLoading, logout, updateProfile } = useAuth();
  const { t, currentLanguage } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
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
      
      const savedImage = localStorage.getItem(`profile_image_${user.id}`);
      if (savedImage) {
        setProfileImage(savedImage);
      }
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        if (user) {
          localStorage.setItem(`profile_image_${user.id}`, base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b border-black mx-auto"></div>
          <p className="mt-4 text-gray-600 font-light uppercase tracking-widest">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const tabs = [
    { id: 'profile', label: t('profile.personalInfo'), icon: User },
    { id: 'orders', label: t('profile.orders'), icon: Package },
    { id: 'favorites', label: t('profile.wishlist'), icon: Heart },
    { id: 'settings', label: t('profile.settings'), icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-white pt-12 pb-24 transition-colors duration-300 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <div className="flex flex-col items-center text-center mb-12">
                <div className="relative group cursor-pointer mb-6" onClick={triggerFileInput}>
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl font-serif text-gray-400">
                        {user.firstName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                
                <h2 className="text-2xl font-serif text-black mb-2">{user.firstName} {user.lastName}</h2>
                <p className="text-gray-500 text-sm font-light">{user.email}</p>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-4 rtl:space-x-reverse px-4 py-3 transition-colors ${
                      activeTab === tab.id
                        ? 'text-black border-l-2 border-black bg-gray-50'
                        : 'text-gray-500 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-widest">{tab.label}</span>
                  </button>
                ))}

                <div className="pt-8 mt-8 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-4 rtl:space-x-reverse px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-widest">{t('profile.logout')}</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-8 md:p-12 min-h-[600px] border border-gray-100 shadow-sm"
            >
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-12 pb-6 border-b border-gray-100">
                    <h2 className="text-2xl font-serif text-black">
                      {t('profile.personalInfo')}
                    </h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        {t('profile.edit')}
                      </button>
                    ) : (
                      <div className="flex gap-4">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="text-sm uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                        >
                          {t('profile.cancel')}
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          className="text-sm uppercase tracking-widest text-black border-b border-black pb-0.5 hover:opacity-70 transition-opacity"
                        >
                          {t('profile.save')}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500">
                          {t('profile.firstName')}
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full bg-transparent border-b border-gray-200 py-2 focus:border-black outline-none transition-colors disabled:text-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500">
                          {t('profile.lastName')}
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full bg-transparent border-b border-gray-200 py-2 focus:border-black outline-none transition-colors disabled:text-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500">
                          {t('profile.email')}
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-400 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500">
                          {t('profile.phone')}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full bg-transparent border-b border-gray-200 py-2 focus:border-black outline-none transition-colors disabled:text-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500">
                          {t('profile.address')}
                        </label>
                        <input
                          type="text"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full bg-transparent border-b border-gray-200 py-2 focus:border-black outline-none transition-colors disabled:text-gray-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-gray-500">
                            {t('profile.city')}
                          </label>
                          <input
                            type="text"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full bg-transparent border-b border-gray-200 py-2 focus:border-black outline-none transition-colors disabled:text-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-gray-500">
                            {t('profile.zipCode')}
                          </label>
                          <input
                            type="text"
                            name="address.zipCode"
                            value={formData.address.zipCode}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full bg-transparent border-b border-gray-200 py-2 focus:border-black outline-none transition-colors disabled:text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && <OrdersTab userId={user.id} />}
              {activeTab === 'favorites' && <FavoritesTab userId={user.id} />}
              {activeTab === 'settings' && <SettingsTab />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { t } = useLanguage();
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center transition-colors duration-300">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b border-black mx-auto mb-4"></div>
        <p className="text-gray-600 font-light uppercase tracking-widest">{t('profile.loading')}</p>
      </div>
    </div>}>
      <ProfileContent />
    </Suspense>
  );
}