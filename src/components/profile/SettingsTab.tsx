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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Settings className="w-6 h-6 text-blue-600" />
          {currentLanguage === 'ku' ? 'ڕێکخستنەکان' : currentLanguage === 'en' ? 'Settings' : 'Einstellungen'}
        </h2>
        {updateMessage && (
          <span className={`text-sm px-4 py-2 rounded-full font-medium animate-fade-in ${
            updateMessage.includes('هەڵە') || updateMessage.includes('error')
              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
              : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
          }`}>
            {updateMessage}
          </span>
        )}
      </div>

      {/* Language & Display Preferences */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 pb-4 border-b border-gray-100 dark:border-gray-700">
          <Globe className="w-5 h-5 text-blue-500" />
          {currentLanguage === 'ku' ? 'زمان و نیشاندان' : currentLanguage === 'en' ? 'Language & Display' : 'Sprache & Anzeige'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {currentLanguage === 'ku' ? 'زمانی سایت' : currentLanguage === 'en' ? 'Language' : 'Sprache'}
            </label>
            <select
              value={settings.preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white outline-none transition-all"
            >
              <option value="ku">کوردی (Kurdish)</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {currentLanguage === 'ku' ? 'یەکەی پارە' : currentLanguage === 'en' ? 'Currency' : 'Währung'}
            </label>
            <select
              value={settings.preferences.currency}
              disabled
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 outline-none cursor-not-allowed"
            >
              <option value="EUR">یۆرۆ (EUR)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {currentLanguage === 'ku' ? 'ژمارەی کتێب لە هەر پەڕەیەکدا' : currentLanguage === 'en' ? 'Items per page' : 'Artikel pro Seite'}
            </label>
            <select
              value={settings.preferences.itemsPerPage}
              onChange={(e) => handlePreferenceChange('itemsPerPage', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white outline-none transition-all"
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
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 pb-4 border-b border-gray-100 dark:border-gray-700">
          <Bell className="w-5 h-5 text-yellow-500" />
          {currentLanguage === 'ku' ? 'ئاگادارکردنەوەکان' : currentLanguage === 'en' ? 'Notifications' : 'Benachrichtigungen'}
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
                <label className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.label}</label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                  onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 pb-4 border-b border-gray-100 dark:border-gray-700">
          <Shield className="w-5 h-5 text-green-500" />
          {currentLanguage === 'ku' ? 'تایبەتمەندی' : currentLanguage === 'en' ? 'Privacy' : 'Privatsphäre'}
        </h3>
        <div className="space-y-5">
          {[
            { key: 'profileVisible', label: currentLanguage === 'ku' ? 'پڕۆفایلی گشتی' : 'Public Profile', desc: currentLanguage === 'ku' ? 'ڕێگەدان بە کەسانی تر بۆ بینینی پڕۆفایلت' : 'Allow others to see your profile' },
            { key: 'showPurchaseHistory', label: currentLanguage === 'ku' ? 'پیشاندانی مێژووی کڕین' : 'Show Purchase History', desc: currentLanguage === 'ku' ? 'نیشاندانی کتێبە کڕراوەکان لە پڕۆفایلدا' : 'Show purchased books on your profile' },
            { key: 'allowRecommendations', label: currentLanguage === 'ku' ? 'پێشنیاری کتێب' : 'Recommendations', desc: currentLanguage === 'ku' ? 'ڕێگەدان بە پێشنیاری کتێب بەپێی ئارەزووەکانت' : 'Allow personalized book recommendations' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between group">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.label}</label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy[item.key as keyof typeof settings.privacy]}
                  onChange={(e) => handlePrivacyChange(item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 pb-4 border-b border-gray-100 dark:border-gray-700">
          <Lock className="w-5 h-5 text-purple-500" />
          {currentLanguage === 'ku' ? 'ئاسایش' : currentLanguage === 'en' ? 'Security' : 'Sicherheit'}
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">{currentLanguage === 'ku' ? 'گۆڕینی وشەی نهێنی' : currentLanguage === 'en' ? 'Change Password' : 'Passwort ändern'}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {currentLanguage === 'ku' ? 'دواین گۆڕین: ٣ مانگ لەمەوبەر' : currentLanguage === 'en' ? 'Last changed: 3 months ago' : 'Zuletzt geändert: vor 3 Monaten'}
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
              {currentLanguage === 'ku' ? 'گۆڕین' : currentLanguage === 'en' ? 'Update' : 'Aktualisieren'}
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">{currentLanguage === 'ku' ? 'سەلماندنی دوو هەنگاوی' : currentLanguage === 'en' ? 'Two-Factor Authentication' : 'Zwei-Faktor-Authentifizierung'}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {currentLanguage === 'ku' ? 'زیادکردنی ئاسایشی هەژمارەکەت' : currentLanguage === 'en' ? 'Add an extra layer of security' : 'Erhöhen Sie die Sicherheit Ihres Kontos'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-6 shadow-sm transition-all duration-300">
        <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-6 flex items-center gap-2 pb-4 border-b border-red-200 dark:border-red-800/30">
          <Trash2 className="w-5 h-5" />
          {currentLanguage === 'ku' ? 'ناوچەی مەترسیدار' : currentLanguage === 'en' ? 'Danger Zone' : 'Gefahrenzone'}
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{currentLanguage === 'ku' ? 'سڕینەوەی هەژمار' : currentLanguage === 'en' ? 'Delete Account' : 'Konto löschen'}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {currentLanguage === 'ku' ? 'ئەم کردارە پاشگەزبوونەوەی نییە' : currentLanguage === 'en' ? 'This action cannot be undone' : 'Diese Aktion kann nicht rückgängig gemacht werden'}
            </p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            {currentLanguage === 'ku' ? 'سڕینەوە' : currentLanguage === 'en' ? 'Delete' : 'Löschen'}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={resetToDefaults}
          className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          {currentLanguage === 'ku' ? 'گەڕاندنەوەی بۆ ڕێکخستنی سەرەتایی' : currentLanguage === 'en' ? 'Reset to Defaults' : 'Zurücksetzen'}
        </button>
        
        <button
          onClick={saveSettings}
          disabled={isUpdating}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
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