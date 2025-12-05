'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Settings, Bell, Shield, Globe, Save, RefreshCw, Lock, Trash2 } from 'lucide-react';

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
      currency: 'EUR',
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

      setUpdateMessage(currentLanguage === 'ku' ? 'ڕێکخستنەکان پاشکەوت کران' : 'Settings saved successfully');
      setTimeout(() => setUpdateMessage(''), 3000);
    } catch (error) {
      setUpdateMessage(currentLanguage === 'ku' ? 'هەڵەیەک ڕوویدا' : 'An error occurred');
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
        currency: 'EUR',
        timezone: 'Asia/Baghdad',
        itemsPerPage: 12
      }
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Settings className="w-6 h-6 text-blue-600" />
          {currentLanguage === 'ku' ? 'ڕێکخستنەکان' : currentLanguage === 'en' ? 'Settings' : 'Mîheng'}
        </h2>
        {updateMessage && (
          <span className={`text-sm px-4 py-2 rounded-full font-medium animate-fade-in ${
            updateMessage.includes('هەڵە') || updateMessage.includes('error')
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {updateMessage}
          </span>
        )}
      </div>

      {/* Language & Display Preferences */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
          <Globe className="w-5 h-5 text-blue-500" />
          {currentLanguage === 'ku' ? 'زمان و نیشاندان' : currentLanguage === 'en' ? 'Language & Display' : 'Ziman û Dîmen'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentLanguage === 'ku' ? 'زمانی سایت' : currentLanguage === 'en' ? 'Language' : 'Ziman'}
            </label>
            <select
              value={settings.preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 outline-none transition-all"
            >
              <option value="ku">کوردی (Kurdish)</option>
              <option value="en">English</option>
              <option value="kmr">Kurmancî</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentLanguage === 'ku' ? 'یەکەی پارە' : currentLanguage === 'en' ? 'Currency' : 'Dirav'}
            </label>
            <select
              value={settings.preferences.currency}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-500 outline-none cursor-not-allowed"
            >
              <option value="EUR">یۆرۆ (EUR)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentLanguage === 'ku' ? 'ژمارەی کتێب لە هەر پەڕەیەکدا' : currentLanguage === 'en' ? 'Items per page' : 'Tiştên li ser rûpelê'}
            </label>
            <select
              value={settings.preferences.itemsPerPage}
              onChange={(e) => handlePreferenceChange('itemsPerPage', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 outline-none transition-all"
            >
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
          <Bell className="w-5 h-5 text-yellow-500" />
          {currentLanguage === 'ku' ? 'ئاگادارکردنەوەکان' : currentLanguage === 'en' ? 'Notifications' : 'Agahdarî'}
        </h3>
        <div className="space-y-5">
          {[
            { key: 'email', label: currentLanguage === 'ku' ? 'ئاگادارکردنەوەی ئیمەیل' : 'Email Notifications', desc: currentLanguage === 'ku' ? 'وەرگرتنی ئاگادارکردنەوە بە ئیمەیل' : 'Receive notifications via email' },
            { key: 'sms', label: currentLanguage === 'ku' ? 'پەیامی کورت (SMS)' : 'SMS Notifications', desc: currentLanguage === 'ku' ? 'وەرگرتنی پەیامی کورت' : 'Receive notifications via SMS' },
            { key: 'orderUpdates', label: currentLanguage === 'ku' ? 'نوێکردنەوەی داواکاری' : 'Order Updates', desc: currentLanguage === 'ku' ? 'ئاگادارکردنەوە دەربارەی باری داواکارییەکان' : 'Get updates about your order status' },
            { key: 'newReleases', label: currentLanguage === 'ku' ? 'کتێبە نوێکان' : 'New Releases', desc: currentLanguage === 'ku' ? 'ئاگادارکردنەوە دەربارەی کتێبە نوێکان' : 'Get notified about new book releases' },
            { key: 'promotional', label: currentLanguage === 'ku' ? 'پڕۆمۆشنەکان' : 'Promotions', desc: currentLanguage === 'ku' ? 'ئاگادارکردنەوە دەربارەی داشکاندن و پێشکەشکراوەکان' : 'Receive offers and promotions' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between group">
              <div>
                <label className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{item.label}</label>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                  onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
          <Shield className="w-5 h-5 text-green-500" />
          {currentLanguage === 'ku' ? 'تایبەتمەندی' : currentLanguage === 'en' ? 'Privacy' : 'Taybetmendî'}
        </h3>
        <div className="space-y-5">
          {[
            { key: 'profileVisible', label: currentLanguage === 'ku' ? 'پڕۆفایلی گشتی' : 'Public Profile', desc: currentLanguage === 'ku' ? 'ڕێگەدان بە کەسانی تر بۆ بینینی پڕۆفایلت' : 'Allow others to see your profile' },
            { key: 'showPurchaseHistory', label: currentLanguage === 'ku' ? 'پیشاندانی مێژووی کڕین' : 'Show Purchase History', desc: currentLanguage === 'ku' ? 'نیشاندانی کتێبە کڕراوەکان لە پڕۆفایلدا' : 'Show purchased books on your profile' },
            { key: 'allowRecommendations', label: currentLanguage === 'ku' ? 'پێشنیاری کتێب' : 'Recommendations', desc: currentLanguage === 'ku' ? 'ڕێگەدان بە پێشنیاری کتێب بەپێی ئارەزووەکانت' : 'Allow personalized book recommendations' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between group">
              <div>
                <label className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{item.label}</label>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy[item.key as keyof typeof settings.privacy]}
                  onChange={(e) => handlePrivacyChange(item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
          <Lock className="w-5 h-5 text-purple-500" />
          {currentLanguage === 'ku' ? 'ئاسایش' : currentLanguage === 'en' ? 'Security' : 'Ewlehî'}
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">{currentLanguage === 'ku' ? 'گۆڕینی وشەی نهێنی' : currentLanguage === 'en' ? 'Change Password' : 'Şîfreyê biguherîne'}</h4>
              <p className="text-xs text-gray-500 mt-1">
                {currentLanguage === 'ku' ? 'دواین گۆڕین: ٣ مانگ لەمەوبەر' : currentLanguage === 'en' ? 'Last changed: 3 months ago' : 'Guherîna dawî: berî 3 mehan'}
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              {currentLanguage === 'ku' ? 'گۆڕین' : currentLanguage === 'en' ? 'Update' : 'Nûvekirin'}
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">{currentLanguage === 'ku' ? 'سەلماندنی دوو هەنگاوی' : currentLanguage === 'en' ? 'Two-Factor Authentication' : 'Erêkirina du-gavekî'}</h4>
              <p className="text-xs text-gray-500 mt-1">
                {currentLanguage === 'ku' ? 'زیادکردنی ئاسایشی هەژمارەکەت' : currentLanguage === 'en' ? 'Add an extra layer of security' : 'Ewlehiya hesabê xwe zêde bikin'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-6 shadow-sm transition-all duration-300">
        <h3 className="text-lg font-bold text-red-700 mb-6 flex items-center gap-2 pb-4 border-b border-red-200">
          <Trash2 className="w-5 h-5" />
          {currentLanguage === 'ku' ? 'ناوچەی مەترسیدار' : currentLanguage === 'en' ? 'Danger Zone' : 'Herêma Xeter'}
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">{currentLanguage === 'ku' ? 'سڕینەوەی هەژمار' : currentLanguage === 'en' ? 'Delete Account' : 'Hesab jêbibe'}</h4>
            <p className="text-xs text-gray-500 mt-1">
              {currentLanguage === 'ku' ? 'ئەم کردارە پاشگەزبوونەوەی نییە' : currentLanguage === 'en' ? 'This action cannot be undone' : 'Ev kiryar nayê vegerandin'}
            </p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
            {currentLanguage === 'ku' ? 'سڕینەوە' : currentLanguage === 'en' ? 'Delete' : 'Jêbirin'}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
        <button
          onClick={resetToDefaults}
          className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          {currentLanguage === 'ku' ? 'گەڕاندنەوەی بۆ ڕێکخستنی سەرەتایی' : currentLanguage === 'en' ? 'Reset to Defaults' : 'Vegerîne'}
        </button>
        
        <button
          onClick={saveSettings}
          disabled={isUpdating}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
        >
          <Save className="w-4 h-4" />
          {isUpdating 
            ? (currentLanguage === 'ku' ? 'پاشکەوتکردن...' : 'Saving...') 
            : (currentLanguage === 'ku' ? 'پاشکەوتکردنی گۆڕانکارییەکان' : 'Save Changes')}
        </button>
      </div>
    </div>
  );
}