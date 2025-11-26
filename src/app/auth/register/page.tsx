'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.error.passwordsNotMatch'));
      return;
    }

    if (formData.password.length < 6) {
      setError(t('auth.error.passwordTooShort'));
      return;
    }

    setIsLoading(true);

    try {
      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      if (success) {
        router.push('/profile');
      } else {
        setError(t('auth.error.emailUsed'));
      }
    } catch (err) {
      setError(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center">
            <span className="text-white dark:text-black font-serif text-3xl">K</span>
          </div>
        </div>
        <h2 className="text-center text-3xl font-serif text-gray-900 dark:text-white mb-2">
          {t('auth.createAccount')}
        </h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 font-light">
          {t('auth.orLogin')}{' '}
          <Link href="/auth/login" className="font-medium text-black dark:text-white hover:underline underline-offset-4">
            {t('auth.signIn')}
          </Link>
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white dark:bg-[#1a1a1a] py-8 px-4 border border-gray-200 dark:border-gray-800 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 text-sm font-light">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {t('auth.firstName')}
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border-b border-gray-300 dark:border-gray-700 placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white bg-transparent text-gray-900 dark:text-white sm:text-sm transition-colors"
                  placeholder={t('auth.firstName')}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {t('auth.lastName')}
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border-b border-gray-300 dark:border-gray-700 placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white bg-transparent text-gray-900 dark:text-white sm:text-sm transition-colors"
                  placeholder={t('auth.lastName')}
                />
              </div>
            </div>

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
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border-b border-gray-300 dark:border-gray-700 placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white bg-transparent text-gray-900 dark:text-white sm:text-sm transition-colors"
                placeholder={t('auth.email')}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                {t('auth.phone')} <span className="text-gray-400 dark:text-gray-500 normal-case tracking-normal">({t('auth.optional')})</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border-b border-gray-300 dark:border-gray-700 placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white bg-transparent text-gray-900 dark:text-white sm:text-sm transition-colors"
                placeholder="+964 750 123 4567"
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
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border-b border-gray-300 dark:border-gray-700 placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white bg-transparent text-gray-900 dark:text-white sm:text-sm transition-colors"
                placeholder={t('auth.chooseStrongPassword')}
              />
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 font-light">
                {t('auth.minChars')}
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                {t('auth.confirmPassword')}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border-b border-gray-300 dark:border-gray-700 placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white bg-transparent text-gray-900 dark:text-white sm:text-sm transition-colors"
                placeholder={t('auth.confirmPassword')}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm uppercase tracking-widest text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t('common.pleaseWait') : t('auth.creatingAccount')}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-light">
                {t('auth.termsAgreement')}{' '}
                <Link href="/terms" className="text-black dark:text-white hover:underline">
                  {t('auth.terms')}
                </Link>{' '}
                {t('auth.and')}{' '}
                <Link href="/privacy" className="text-black dark:text-white hover:underline">
                  {t('auth.privacyPolicy')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}