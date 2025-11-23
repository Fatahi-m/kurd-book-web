'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Heart, Users, GraduationCap, Sparkles, Globe } from 'lucide-react';
import Link from 'next/link';

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
            icon: <Globe className="w-8 h-8" />,
            title: "Preserving Identity in Diaspora",
            desc: "We want to keep our language and culture alive in the hearts of Kurdish families living in Europe by facilitating access to Kurdish books and promoting the culture of reading."
          },
          {
            icon: <Users className="w-8 h-8" />,
            title: "Supporting Kurdish Authors",
            desc: "Our authors are the guardians of our language. We have provided a platform for their works to be seen and sold, providing financial support for them to continue creating valuable works."
          },
          {
            icon: <Heart className="w-8 h-8" />,
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
      intro: "لە دڵی ئەوروپادا، کیلۆمەترها دوور لە چیاکانی نیشتمان، هەستمان بە بۆشاییەکی گەورە کرد. دەستگەیشتن بە کتێبی کوردی، کە گەنجینەی زمان و ناسنامەمانە، بۆ زۆرێک لە ئێمە لە تاراوگە سەخت یان مەحاڵ بوو. کورد بووک لەدایک بوو تا پردێک بێت لە نێوان تۆ و کولتوورەکەتدا. ئێمە لێرەین تا چیتر هیچ کوردێک لە ئەوروپا حەسرەتی خوێندنەوەی کتێب بە زمانی دایکی نەبێت.",
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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-900"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-800/50 rounded-full mb-6 backdrop-blur-sm animate-fade-in">
              <Sparkles className="w-6 h-6 text-yellow-400 mr-2" />
              <span className="text-blue-100 font-medium tracking-wide uppercase text-sm">Our Mission</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-loose">
            {t.intro}
          </p>
        </div>
      </div>

      {/* Three Pillars Section */}
      <div className="bg-white dark:bg-gray-800 py-20 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.missions.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.missions.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.missions.items.map((item, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-8 text-center hover:transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-600">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Donation Highlight Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 transform -skew-y-3 origin-top-left scale-110"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-10 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t.donation.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                  {t.donation.text}
                </p>
                <div className="space-y-4">
                  {t.donation.points.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-gray-700 dark:text-gray-200">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 relative min-h-[300px] md:min-h-full">
                {/* Placeholder for an image of children reading or a classroom */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center p-8">
                    <Heart className="w-20 h-20 mx-auto mb-4 text-red-400 animate-pulse" />
                    <p className="text-lg font-medium">{t.donation.closing}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 max-w-2xl mx-auto">
          {t.donation.closing}
        </h2>
        <Link 
          href="/books" 
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-none transform hover:-translate-y-1"
        >
          {t.cta}
          <span className={`ml-2 ${isRTL ? 'rotate-180' : ''}`}>→</span>
        </Link>
      </div>
    </main>
  );
}
