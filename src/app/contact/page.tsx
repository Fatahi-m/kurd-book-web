'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormStatus('success');
    // Reset form after 3 seconds
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mb-20"
          >
            <span className="text-sm font-light tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase mb-6 block">
              Contact
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 dark:text-white mb-8 leading-[1.1]">
              {t('contact.title')}
            </h1>
            <p className="text-xl font-light text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-4 space-y-12">
              <div>
                <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-8">
                  {t('contact.info.title')}
                </h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-4 group">
                    <Mail className="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-light tracking-wider text-gray-500 uppercase mb-1">Email</p>
                      <p className="text-lg text-gray-900 dark:text-white font-serif">{t('contact.info.email')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <Phone className="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-light tracking-wider text-gray-500 uppercase mb-1">Phone</p>
                      <p className="text-lg text-gray-900 dark:text-white font-serif">{t('contact.info.phone')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <MapPin className="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-light tracking-wider text-gray-500 uppercase mb-1">Address</p>
                      <p className="text-lg text-gray-900 dark:text-white font-serif">{t('contact.info.address')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <Clock className="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-light tracking-wider text-gray-500 uppercase mb-1">Hours</p>
                      <p className="text-lg text-gray-900 dark:text-white font-serif">{t('contact.info.hours')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" strokeWidth={1.5} />
                  {t('contact.faq.title')}
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white mb-2 font-serif">{t('contact.faq.q1')}</p>
                    <p className="text-gray-600 dark:text-gray-400 font-light text-sm leading-relaxed">{t('contact.faq.a1')}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white mb-2 font-serif">{t('contact.faq.q2')}</p>
                    <p className="text-gray-600 dark:text-gray-400 font-light text-sm leading-relaxed">{t('contact.faq.a2')}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white mb-2 font-serif">{t('contact.faq.q3')}</p>
                    <p className="text-gray-600 dark:text-gray-400 font-light text-sm leading-relaxed">{t('contact.faq.a3')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a1a1a] p-8 md:p-12 border border-gray-100 dark:border-gray-800">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-xs font-light tracking-[0.2em] text-gray-500 uppercase mb-3">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 py-3 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white outline-none transition-colors font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-light tracking-[0.2em] text-gray-500 uppercase mb-3">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 py-3 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white outline-none transition-colors font-light"
                    />
                  </div>
                </div>
                <div className="mb-8">
                  <label className="block text-xs font-light tracking-[0.2em] text-gray-500 uppercase mb-3">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 py-3 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white outline-none transition-colors font-light"
                  />
                </div>
                <div className="mb-12">
                  <label className="block text-xs font-light tracking-[0.2em] text-gray-500 uppercase mb-3">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 py-3 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white outline-none transition-colors font-light resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                  className={`w-full md:w-auto px-12 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium tracking-[0.2em] uppercase hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center justify-center gap-3 ${
                    formStatus === 'success' ? 'bg-green-600 hover:bg-green-700 text-white' : ''
                  }`}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      {t('contact.form.submitting')}
                    </>
                  ) : formStatus === 'success' ? (
                    <>
                      <span className="text-lg">✓</span>
                      {t('contact.form.success')}
                    </>
                  ) : (
                    <>
                      {t('contact.form.submit')}
                      <Send size={16} strokeWidth={1.5} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
