'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SettingsTab() {
  const { user, updateProfile } = useAuth();
  const { t, currentLanguage, setLanguage } = useLanguage();
  
  const [settings, setSettings] = useState({
    notifications: {
      email: user?.preferences.notifications ?? true,
      sms: false,
      orderUpdates: true,
      promotional: false,
      newReleases: true
    },
    privacy: {
      profileVisible: true,
      showPurchaseHistory: false,
      allowRecommendations: true
    },
    preferences: {
      language: currentLanguage,
      currency: 'IQD',
      timezone: 'Asia/Baghdad',
      itemsPerPage: 12
    }
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const handlePreferenceChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));

    // Handle language change immediately
    if (key === 'language') {
      setLanguage(value);
    }
  };

  const saveSettings = async () => {
    setIsUpdating(true);
    setUpdateMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user preferences in auth context
      await updateProfile({
        preferences: {
          language: settings.preferences.language,
          notifications: settings.notifications.email
        }
      });

      setUpdateMessage('ڕێکخستنەکان پاشکەوت کران');
      setTimeout(() => setUpdateMessage(''), 3000);
    } catch (error) {
      setUpdateMessage('هەڵەیەک ڕوویدا');
    } finally {
      setIsUpdating(false);
    }
  };

  const resetToDefaults = () => {
    setSettings({
      notifications: {
        email: true,
        sms: false,
        orderUpdates: true,
        promotional: false,
        newReleases: true
      },
      privacy: {
        profileVisible: true,
        showPurchaseHistory: false,
        allowRecommendations: true
      },
      preferences: {
        language: 'ku',
        currency: 'IQD',
        timezone: 'Asia/Baghdad',
        itemsPerPage: 12
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">ڕێکخستنەکان</h2>
        {updateMessage && (
          <span className={`text-sm px-3 py-1 rounded-full ${
            updateMessage.includes('هەڵە') 
              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
              : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
          }`}>
            {updateMessage}
          </span>
        )}
      </div>

      {/* Language & Display Preferences */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-colors duration-300">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">زمان و نیشاندان</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              زمانی سایت
            </label>
            <select
              value={settings.preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="ku">کوردی</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              یەکەی پارە
            </label>
            <select
              value={settings.preferences.currency}
              onChange={(e) => handlePreferenceChange('currency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="IQD">دینار عێراقی (IQD)</option>
              <option value="USD">دۆلاری ئەمەریکی (USD)</option>
              <option value="EUR">یۆرۆ (EUR)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ژمارەی کتاب لە هەر پەڕەیەکدا
            </label>
            <select
              value={settings.preferences.itemsPerPage}
              onChange={(e) => handlePreferenceChange('itemsPerPage', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value={8}>8 کتاب</option>
              <option value={12}>12 کتاب</option>
              <option value={16}>16 کتاب</option>
              <option value={24}>24 کتاب</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-colors duration-300">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">ئاگادارکردنەوەکان</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">ئاگادارکردنەوەی ئیمەیل</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">وەرگرتنی ئاگادارکردنەوە بە ئیمەیل</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => handleNotificationChange('email', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">پەیامی کورت (SMS)</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">وەرگرتنی پەیامی کورت</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">نوێکردنەوەی داواکاری</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">ئاگادارکردنەوە دەربارەی باری داواکارییەکان</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.orderUpdates}
                onChange={(e) => handleNotificationChange('orderUpdates', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">کتابە نوێکان</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">ئاگادارکردنەوە دەربارەی کتابە نوێکان</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.newReleases}
                onChange={(e) => handleNotificationChange('newReleases', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">پڕۆموشنەکان</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">ئاگادارکردنەوە دەربارەی داشکاندن و پیشکەشکراوەکان</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.promotional}
                onChange={(e) => handleNotificationChange('promotional', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-colors duration-300">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">تایبەتمەندی</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">پڕۆفایلی گشتی</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">ڕێگەدان بە کەسانی تر بۆ بینینی پڕۆفایلت</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.profileVisible}
                onChange={(e) => handlePrivacyChange('profileVisible', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">پیشانداری مێژووی کڕین</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">نیشاندانی کتابە کڕراوەکان لە پڕۆفایلدا</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.showPurchaseHistory}
                onChange={(e) => handlePrivacyChange('showPurchaseHistory', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">پێشنیاری کتاب</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">ڕێگەدان بە پێشنیاری کتاب بەپێی ئارەزووەکانت</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.allowRecommendations}
                onChange={(e) => handlePrivacyChange('allowRecommendations', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={resetToDefaults}
          className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 border border-red-300 dark:border-red-700 hover:border-red-400 dark:hover:border-red-600 rounded-md transition-colors"
        >
          گەڕاندنەوەی بۆ ڕێکخستنی سەرەتایی
        </button>
        
        <button
          onClick={saveSettings}
          disabled={isUpdating}
          className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isUpdating ? 'پاشکەوتکردن...' : 'پاشکەوتکردنی گۆڕانکارییەکان'}
        </button>
      </div>
    </div>
  );
}