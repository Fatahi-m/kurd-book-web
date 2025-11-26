'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const { t, currentLanguage } = useLanguage();
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in');
    if (isAdminLoggedIn === 'true') {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple authentication (in production, use proper backend authentication)
    if (credentials.username === 'admin' && credentials.password === 'kurdbook2024') {
      localStorage.setItem('admin_logged_in', 'true');
      router.push('/admin');
    } else {
      setError(
        currentLanguage === 'ku' 
          ? 'ناوی بەکارهێنەر یان وشەی نهێنی هەڵەیە'
          : currentLanguage === 'en' 
          ? 'Invalid username or password'
          : 'Ungültiger Benutzername oder Passwort'
      );
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex items-center justify-center p-4 transition-colors duration-300 font-serif">
      <div className="bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#333] p-8 w-full max-w-md transition-colors duration-300">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#2c2c2c] dark:bg-white rounded-none flex items-center justify-center mx-auto mb-4">
            <Lock className="text-white dark:text-black" size={32} />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#2c2c2c] dark:text-white">
            {currentLanguage === 'ku' ? 'چوونە ژوورەوەی بەڕێوەبەر' : currentLanguage === 'en' ? 'Admin Login' : 'Admin Anmeldung'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 font-sans font-light">
            {currentLanguage === 'ku' ? 'بۆ دەستڕاگەیشتن بە پانێڵی بەڕێوەبەر' : currentLanguage === 'en' ? 'Access the admin panel' : 'Zugang zum Admin-Panel'}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6 font-sans">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
              {currentLanguage === 'ku' ? 'ناوی بەکارهێنەر' : currentLanguage === 'en' ? 'Username' : 'Benutzername'}
            </label>
            <div className="relative">
              <User className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full pl-10 rtl:pl-3 rtl:pr-10 pr-3 py-3 border-b border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:border-black dark:focus:border-white text-[#2c2c2c] dark:text-white transition-colors"
                placeholder={currentLanguage === 'ku' ? 'ناوی بەکارهێنەر' : currentLanguage === 'en' ? 'Enter username' : 'Benutzername eingeben'}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
              {currentLanguage === 'ku' ? 'وشەی نهێنی' : currentLanguage === 'en' ? 'Password' : 'Passwort'}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full pl-10 rtl:pl-3 rtl:pr-10 pr-3 py-3 border-b border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:border-black dark:focus:border-white text-[#2c2c2c] dark:text-white transition-colors"
                placeholder={currentLanguage === 'ku' ? 'وشەی نهێنی' : currentLanguage === 'en' ? 'Enter password' : 'Passwort eingeben'}
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2c2c2c] dark:bg-white text-white dark:text-black py-4 px-4 text-sm uppercase tracking-widest hover:bg-black dark:hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <div className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                <span>
                  {currentLanguage === 'ku' ? 'چاوەڕوان بە...' : currentLanguage === 'en' ? 'Logging in...' : 'Anmeldung...'}
                </span>
              </div>
            ) : (
              currentLanguage === 'ku' ? 'چوونە ژوورەوە' : currentLanguage === 'en' ? 'Login' : 'Anmelden'
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-slate-50 dark:bg-[#0f172a] border border-[#e5e5e5] dark:border-[#333]">
          <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
            {currentLanguage === 'ku' ? 'زانیاریەکانی تاقیکردنەوە:' : currentLanguage === 'en' ? 'Demo Credentials:' : 'Demo Anmeldedaten:'}
          </p>
          <div className="text-sm text-[#2c2c2c] dark:text-[#e0e0e0] space-y-1 font-mono">
            <div>
              <span className="font-bold">
                {currentLanguage === 'ku' ? 'ناوی بەکارهێنەر:' : currentLanguage === 'en' ? 'Username:' : 'Benutzername:'}
              </span> admin
            </div>
            <div>
              <span className="font-bold">
                {currentLanguage === 'ku' ? 'وشەی نهێنی:' : currentLanguage === 'en' ? 'Password:' : 'Passwort:'}
              </span> kurdbook2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}