'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Heart, Users, GraduationCap, Sparkles, Globe } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const { currentLanguage } = useLanguage();

  const content = {
    en: {
      title: "Beyond a Bookstore; A Nest for Culture and Hope",
      subtitle: "Who we are and why we are here?",
      intro: "In the heart of Europe, miles away from the mountains of our homeland, we felt a great void. Access to Kurdish books, this treasure of our language and identity, was difficult or impossible for many of us in the diaspora. Kurd Book was born to be a bridge between you and your culture. We are here so that no Kurd in Europe longs for reading books in their mother tongue.",
      missions: {
        title: "Our Threefold Mission",
        subtitle: "Kurd Book is not just an online store. We are built on three sacred goals:",
        items: [
          {
            icon: <Globe className="w-6 h-6" />,
            title: "Preserving Identity in Diaspora",
            desc: "We want to keep our language and culture alive in the hearts of Kurdish families living in Europe by facilitating access to Kurdish books and promoting the culture of reading."
          },
          {
            icon: <Users className="w-6 h-6" />,
            title: "Supporting Kurdish Authors",
            desc: "Our authors are the guardians of our language. We have provided a platform for their works to be seen and sold, providing financial support for them to continue creating valuable works."
          },
          {
            icon: <Heart className="w-6 h-6" />,
            title: "Our Beating Heart: Children's Future",
            desc: "This is where our story becomes different. We believe no child should be deprived of reading and writing due to poverty. Literacy is the strongest weapon to fight suffering and build the future."
          }
        ]
      },
      donation: {
        title: "100% of Profits for Education",
        text: "We proudly announce that 100% of the profits from book sales on this website are directly spent on supporting the education of underprivileged children in Kurdistan.",
        impact: "When you buy a book from Kurd Book, you are not just buying a cultural product; you are doing three great things at once:",
        points: [
          "You light the lamp of Kurdish culture in your home.",
          "You support a hardworking Kurdish author.",
          "Most importantly: You put a pen in the hand of a child who dreams of writing."
        ],
        closing: "Every book sold here is a brick for building a brighter future for our land's children. Join us to plant knowledge and harvest hope together."
      },
      cta: "Shop Now & Support"
    },
    ku: {
      title: "زیاتر لە کتێبفرۆشییەک؛ لانەیەک بۆ کولتوور و هیوا",
      subtitle: "ئێمە کێین و بۆچی لێرەین؟",
      intro: "لە دڵی ئەوروپادا، کیلۆمەترها دوور لە چیاکانی نیشتمان، هەستمان بە بۆشاییەکی گەورە کرد. دەستگەیشتن بە کتێبی کوردی، کە گەنجینەی زمان و ناسنامەمانە، بۆ زۆرێک لە ئێمە لە تاراوگە ئەستەم یان مەحاڵ بوو. کورد بووک لەدایک بوو تا ببێتە پردێک لە نێوان تۆ و کولتوورەکەت. ئێمە لێرەین تا هیچ کوردێک لە ئەوروپا حەسرەتی خوێندنەوەی کتێب بە زمانی دایکی نەبێت.",
      missions: {
        title: "پەیامی سێقۆڵیی ئێمە",
        subtitle: "کورد بووک تەنها فرۆشگایەکی ئۆنلاین نییە. ئێمە لەسەر سێ ئامانجی پیرۆز دامەزراوین:",
        items: [
          {
            icon: <Globe className="w-8 h-8" />,
            title: "پاراستنی ناسنامە لە تاراوگە",
            desc: "دەمانەوێت بە ئاسانکردنی دەستگەیشتن بە کتێبی کوردی، زمان و کولتوورمان لە دڵی خێزانە کوردەکانی دانیشتووی ئەوروپا بە زیندوویی ڕابگرین و کولتووری کتێبخوێندن پەرە پێ بدەین."
          },
          {
            icon: <Users className="w-8 h-8" />,
            title: "پشتیوانی نووسەرانی کورد",
            desc: "نووسەرانی ئێمە پاسەوانی زمانی ئێمەن. ئێمە بسترێکمان فەراهەم کردووە تا بەرهەمەکانیان ببینرێت و بفرۆشرێت، تا ببێتە پشتیوانییەکی دارایی بۆ بەردەوامبوونیان لە خلقکردنی بەرهەمی بەنرخ."
          },
          {
            icon: <Heart className="w-8 h-8" />,
            title: "دڵی لێدەری ئێمە: ئایندەی منداڵان",
            desc: "لێرەدا چیرۆکی ئێمە جیاواز دەبێت. ئێمە باوەڕمان وایە هیچ منداڵێک نابێت بەهۆی هەژارییەوە لە نیعمەتی خوێندن و نووسین بێبەش بێت. خوێندەواری بەهێزترین چەکە بۆ بەرەنگاربوونەوەی ڕەنج و بنیاتنانی ئایندە."
          }
        ]
      },
      donation: {
        title: "٪١٠٠ی قازانج بۆ پەروەردە",
        text: "بە شانازییەوە ڕادەگەیەنین کە ١٠٠٪ی قازانجی فرۆشی کتێبەکان لەم ماڵپەڕەدا، ڕاستەوخۆ بۆ پشتیوانی لە پەروەردەی منداڵانی کەمدەرامەت لە کوردستان خەرج دەکرێت.",
        impact: "کاتێک کتێبێک لە کورد بووک دەکڕیت، تەنها کاڵایەکی کولتووری بەدەست ناهێنیت؛ بەڵکو هاوکات سێ کاری گەورە ئەنجام دەدەیت:",
        points: [
          "چراغی کولتووری کوردی لە ماڵەکەتدا دادەگیرسێنیت.",
          "پشتیوانی لە نووسەرێکی زەحمەتکێشی کورد دەکەیت.",
          "و لە هەمووی گرنگتر: قەڵەمێک دەخەیتە دەستی منداڵێک کە ئاواتی نووسینی هەیە."
        ],
        closing: "هەر کتێبێک کە لێرە دەفرۆشرێت، خشتێکە بۆ بنیاتنانی ئایندەیەکی ڕووناکتر بۆ منداڵانی نیشتمانمان. لەگەڵمان بن تا بەیەکەوە زانایی بچێنین و هیوا دروێنە بکەین."
      },
      cta: "کڕین و پشتیوانی"
    },
    de: {
      title: "Mehr als eine Buchhandlung; Ein Nest für Kultur und Hoffnung",
      subtitle: "Wer wir sind und warum wir hier sind?",
      intro: "Im Herzen Europas, meilenweit entfernt von den Bergen unserer Heimat, spürten wir eine große Leere. Der Zugang zu kurdischen Büchern, diesem Schatz unserer Sprache und Identität, war für viele von uns in der Diaspora schwierig oder unmöglich. Kurd Book wurde geboren, um eine Brücke zwischen Ihnen und Ihrer Kultur zu sein. Wir sind hier, damit kein Kurde in Europa sich danach sehnen muss, Bücher in seiner Muttersprache zu lesen.",
      missions: {
        title: "Unsere dreifache Mission",
        subtitle: "Kurd Book ist nicht nur ein Online-Shop. Wir bauen auf drei heiligen Zielen auf:",
        items: [
          {
            icon: <Globe className="w-8 h-8" />,
            title: "Bewahrung der Identität in der Diaspora",
            desc: "Wir wollen unsere Sprache und Kultur in den Herzen der in Europa lebenden kurdischen Familien lebendig halten, indem wir den Zugang zu kurdischen Büchern erleichtern."
          },
          {
            icon: <Users className="w-8 h-8" />,
            title: "Unterstützung kurdischer Autoren",
            desc: "Unsere Autoren sind die Hüter unserer Sprache. Wir bieten eine Plattform, damit ihre Werke gesehen und verkauft werden können, um sie finanziell bei der Schaffung wertvoller Werke zu unterstützen."
          },
          {
            icon: <Heart className="w-8 h-8" />,
            title: "Unser schlagendes Herz: Die Zukunft der Kinder",
            desc: "Hier wird unsere Geschichte anders. Wir glauben, dass kein Kind aufgrund von Armut vom Lesen und Schreiben ausgeschlossen sein sollte. Bildung ist die stärkste Waffe, um Leiden zu bekämpfen und die Zukunft zu bauen."
          }
        ]
      },
      donation: {
        title: "100% des Gewinns für Bildung",
        text: "Wir geben stolz bekannt, dass 100% des Gewinns aus dem Buchverkauf auf dieser Website direkt für die Unterstützung der Bildung benachteiligter Kinder in Kurdistan verwendet werden.",
        impact: "Wenn Sie ein Buch bei Kurd Book kaufen, erwerben Sie nicht nur ein kulturelles Produkt; Sie tun gleichzeitig drei große Dinge:",
        points: [
          "Sie entzünden das Licht der kurdischen Kultur in Ihrem Zuhause.",
          "Sie unterstützen einen hart arbeitenden kurdischen Autor.",
          "Und am wichtigsten: Sie geben einem Kind, das vom Schreiben träumt, einen Stift in die Hand."
        ],
        closing: "Jedes hier verkaufte Buch ist ein Ziegelstein für den Bau einer helleren Zukunft für die Kinder unseres Landes. Begleiten Sie uns, um gemeinsam Wissen zu säen und Hoffnung zu ernten."
      },
      cta: "Jetzt einkaufen & unterstützen"
    }
  };

  const t = content[currentLanguage as keyof typeof content] || content.en;
  const isRTL = currentLanguage === 'ku';

  return (
    <main className="min-h-screen bg-[#F5F2E9] dark:bg-[#121212] transition-colors duration-500">
      {/* Editorial Hero */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="text-sm font-light tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase mb-6 block">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 dark:text-white mb-8 leading-[1.1]">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Intro Text */}
      <div className="px-6 py-20 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-2xl font-serif text-gray-900 dark:text-white">
              The Vision
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg md:text-xl font-light text-gray-600 dark:text-gray-300 leading-loose">
              {t.intro}
            </p>
          </div>
        </div>
      </div>

      {/* Missions */}
      <div className="px-6 py-20 bg-white dark:bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-6">
              {t.missions.title}
            </h2>
            <p className="text-lg font-light text-gray-600 dark:text-gray-400 max-w-2xl">
              {t.missions.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {t.missions.items.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="mb-6 text-gray-900 dark:text-white opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Donation Section - Editorial Style */}
      <div className="px-6 py-24 bg-[#F5F2E9] dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-light tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase mb-6 block">
                Impact
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-8">
                {t.donation.title}
              </h2>
              <p className="text-lg font-light text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t.donation.text}
              </p>
              <div className="space-y-6">
                {t.donation.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="text-blue-600 dark:text-blue-400 mt-1">✦</span>
                    <p className="text-gray-700 dark:text-gray-200 font-light">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] md:aspect-square bg-gray-200 dark:bg-gray-800 overflow-hidden">
              {/* Abstract decorative element instead of image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-12">
                  <Heart className="w-16 h-16 mx-auto mb-6 text-gray-400 dark:text-gray-600" strokeWidth={1} />
                  <p className="text-xl font-serif text-gray-500 dark:text-gray-500 italic">
                    "{t.donation.closing}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-24 border-t border-gray-200 dark:border-gray-800 text-center">
        <Link 
          href="/books" 
          className="inline-block px-12 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium tracking-[0.2em] uppercase hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          {t.cta}
        </Link>
      </div>
    </main>
  );
}
