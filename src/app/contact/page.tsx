'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <main className="min-h-screen bg-[#F5F2E9] dark:bg-[#121212] transition-colors duration-500">
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
              {t.title}
            </h1>
            <p className="text-xl font-light text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              {t.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-4 space-y-12">
              <div>
                <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-8">
                  {t.info.title}
                </h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-4 group">
                    <Mail className="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-light tracking-wider text-gray-500 uppercase mb-1">Email</p>
                      <p className="text-lg text-gray-900 dark:text-white font-serif">{t.info.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <Phone className="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-light tracking-wider text-gray-500 uppercase mb-1">Phone</p>
                      <p className="text-lg text-gray-900 dark:text-white font-serif">{t.info.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <MapPin className="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-light tracking-wider text-gray-500 uppercase mb-1">Address</p>
                      <p className="text-lg text-gray-900 dark:text-white font-serif">{t.info.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <Clock className="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-light tracking-wider text-gray-500 uppercase mb-1">Hours</p>
                      <p className="text-lg text-gray-900 dark:text-white font-serif">{t.info.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" strokeWidth={1.5} />
                  {t.faq.title}
                </h3>
                <div className="space-y-6">
                  {t.faq.items.map((item, index) => (
                    <div key={index}>
                      <p className="font-medium text-gray-900 dark:text-white mb-2 font-serif">{item.q}</p>
                      <p className="text-gray-600 dark:text-gray-400 font-light text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a1a1a] p-8 md:p-12 border border-gray-100 dark:border-gray-800">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-xs font-light tracking-[0.2em] text-gray-500 uppercase mb-3">
                      {t.form.name}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 py-3 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white outline-none transition-colors font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-light tracking-[0.2em] text-gray-500 uppercase mb-3">
                      {t.form.email}
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
                    {t.form.subject}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 py-3 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white outline-none transition-colors font-light"
                  />
                </div>
                <div className="mb-12">
                  <label className="block text-xs font-light tracking-[0.2em] text-gray-500 uppercase mb-3">
                    {t.form.message}
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
                      {t.form.submitting}
                    </>
                  ) : formStatus === 'success' ? (
                    <>
                      <span className="text-lg">✓</span>
                      {t.form.success}
                    </>
                  ) : (
                    <>
                      {t.form.submit}
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
