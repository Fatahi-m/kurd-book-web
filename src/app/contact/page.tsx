'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

export default function ContactPage() {
  const { currentLanguage } = useLanguage();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const content = {
    en: {
      title: "Get in Touch",
      subtitle: "We'd love to hear from you. Here's how you can reach us.",
      form: {
        name: "Your Name",
        email: "Email Address",
        subject: "Subject",
        message: "Message",
        submit: "Send Message",
        submitting: "Sending...",
        success: "Message sent successfully! We'll get back to you soon.",
        error: "Something went wrong. Please try again."
      },
      info: {
        title: "Contact Information",
        email: "info@kurdbook.com",
        phone: "+49 123 456 789",
        address: "Berlin, Germany",
        hours: "Mon-Fri: 9:00 AM - 6:00 PM"
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Do you ship internationally?", a: "Yes, we ship to most countries in Europe and worldwide." },
          { q: "How long does delivery take?", a: "Usually 3-5 business days within Europe." },
          { q: "Can I return a book?", a: "Yes, within 14 days of receipt if the book is in original condition." }
        ]
      }
    },
    ku: {
      title: "پەیوەندیمان پێوە بکەن",
      subtitle: "خۆشحاڵ دەبین گوێبیستی ڕای ئێوە بین. لێرەوە دەتوانن پەیوەندیمان پێوە بکەن.",
      form: {
        name: "ناوی تەواو",
        email: "ئیمەیڵ",
        subject: "بابەت",
        message: "نامە",
        submit: "ناردنی نامە",
        submitting: "لە ناردندایە...",
        success: "نامەکەت بە سەرکەوتوویی نێردرا! بەزوویی وەڵامت دەدەینەوە.",
        error: "هەڵەیەک ڕوویدا. تکایە دووبارە هەوڵ بدەرەوە."
      },
      info: {
        title: "زانیاری پەیوەندی",
        email: "info@kurdbook.com",
        phone: "+49 123 456 789",
        address: "بەرلین، ئەڵمانیا",
        hours: "دووشەممە - هەینی: ٩:٠٠ بەیانی - ٦:٠٠ ئێوارە"
      },
      faq: {
        title: "پرسیارە باوەکان",
        items: [
          { q: "ئایا گەیاندنتان بۆ دەرەوەی وڵات هەیە؟", a: "بەڵێ، ئێمە بۆ زۆربەی وڵاتانی ئەوروپا و جیهان گەیاندنمان هەیە." },
          { q: "گەیاندن چەند کاتی پێ دەچێت؟", a: "بەزۆری ٣-٥ ڕۆژی کارکردن لە ناو ئەوروپادا." },
          { q: "ئایا دەتوانم کتێبێک بگەڕێنمەوە؟", a: "بەڵێ، لە ماوەی ١٤ ڕۆژدا دوای وەرگرتنی، ئەگەر کتێبەکە وەک خۆی مابێتەوە." }
        ]
      }
    },
    de: {
      title: "Kontaktieren Sie uns",
      subtitle: "Wir freuen uns, von Ihnen zu hören. So können Sie uns erreichen.",
      form: {
        name: "Ihr Name",
        email: "E-Mail-Adresse",
        subject: "Betreff",
        message: "Nachricht",
        submit: "Nachricht senden",
        submitting: "Wird gesendet...",
        success: "Nachricht erfolgreich gesendet! Wir melden uns bald bei Ihnen.",
        error: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut."
      },
      info: {
        title: "Kontaktinformationen",
        email: "info@kurdbook.com",
        phone: "+49 123 456 789",
        address: "Berlin, Deutschland",
        hours: "Mo-Fr: 9:00 - 18:00 Uhr"
      },
      faq: {
        title: "Häufig gestellte Fragen",
        items: [
          { q: "Versenden Sie international?", a: "Ja, wir versenden in die meisten Länder Europas und weltweit." },
          { q: "Wie lange dauert die Lieferung?", a: "In der Regel 3-5 Werktage innerhalb Europas." },
          { q: "Kann ich ein Buch zurückgeben?", a: "Ja, innerhalb von 14 Tagen nach Erhalt, wenn das Buch im Originalzustand ist." }
        ]
      }
    }
  };

  const t = content[currentLanguage as keyof typeof content] || content.en;

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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info & FAQ */}
          <div className="lg:col-span-1 space-y-8">
            {/* Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t.info.title}</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">{t.info.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                    <p className="font-medium text-gray-900 dark:text-white">{t.info.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Address</p>
                    <p className="font-medium text-gray-900 dark:text-white">{t.info.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Working Hours</p>
                    <p className="font-medium text-gray-900 dark:text-white">{t.info.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Preview */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MessageSquare size={20} className="text-blue-600 dark:text-blue-400" />
                {t.faq.title}
              </h3>
              <div className="space-y-4">
                {t.faq.items.map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                    <p className="font-medium text-gray-900 dark:text-white mb-2 text-sm">{item.q}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.form.name}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.form.email}
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.form.subject}
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.form.message}
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting' || formStatus === 'success'}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${
                  formStatus === 'success'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1'
                }`}
              >
                {formStatus === 'submitting' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t.form.submitting}
                  </>
                ) : formStatus === 'success' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t.form.success}
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    {t.form.submit}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
