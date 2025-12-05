'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/profile');
      } else {
        setError(t('auth.error.invalidCredentials'));
      }
    } catch (err) {
      setError(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-serif text-3xl">K</span>
          </div>
        </div>
        <h2 className="text-center text-3xl font-serif text-gray-900 mb-2">
          {t('auth.login')}
        </h2>
        <p className="text-center text-sm text-gray-600 font-light">
          {t('auth.noAccount')}{' '}
          <Link href="/auth/register" className="font-medium text-black hover:underline underline-offset-4">
            {t('auth.signUp')}
          </Link>
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 border border-gray-200 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-light">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                {t('auth.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black bg-transparent text-gray-900 sm:text-sm transition-colors"
                placeholder={t('auth.email')}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                {t('auth.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black bg-transparent text-gray-900 sm:text-sm transition-colors"
                placeholder={t('auth.password')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                />
                <label htmlFor="remember-me" className="mr-2 rtl:mr-0 rtl:ml-2 block text-sm text-gray-900 font-light">
                  {t('auth.rememberMe')}
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgot-password" className="font-light text-gray-600 hover:text-black transition-colors">
                  {t('auth.forgotPassword')}
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm uppercase tracking-widest text-white bg-black hover:bg-gray-800 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t('common.pleaseWait') : t('auth.signIn')}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="bg-gray-50 p-4 text-xs text-gray-500 font-light">
              <p className="mb-2 font-medium uppercase tracking-wider">{t('auth.forTesting')}</p>
              <p>
                <span className="inline-block w-20">Email:</span> admin@kurdbook.com<br />
                <span className="inline-block w-20">Password:</span> admin123
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}