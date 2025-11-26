'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, Heart, GraduationCap } from 'lucide-react';

export default function AboutSummary() {
  const { currentLanguage } = useLanguage();

  const content = {
    en: {
      intro: `In the heart of Europe, miles away from the mountains of our homeland, we felt a great void. Access to Kurdish books, this treasure of our language and identity, was difficult or impossible for many of us in the diaspora. Kurd Book was born to be a bridge between you and your culture. We are here so that no Kurd in Europe longs for reading books in their mother tongue.`,
      goalsTitle: "Our Sacred Goals",
      goals: [
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: "Preserving Identity",
          desc: "Keeping our language and culture alive in the hearts of Kurdish families in Europe."
        },
        {
          icon: <PenTool className="w-6 h-6" />,
          title: "Supporting Authors",
          desc: "Providing a platform for Kurdish authors to showcase and sell their valuable works."
        },
        {
          icon: <Heart className="w-6 h-6" />,
          title: "Our Beating Heart",
          desc: "Supporting the future of Kurdistan's children is our most important goal."
        }
      ],
      highlight: "We proudly announce that 100% of the profits from book sales on this website are directly spent on supporting the education of underprivileged children in Kurdistan.",
      conclusion: `When you buy a book from Kurd Book, you are not just buying a cultural product; you are lighting the lamp of Kurdish culture, supporting an author, and putting a pen in the hand of a child who dreams of writing.`,
      signature: "Muxtar",
      date: "Dezember 2025, Berlin"
    },
    ku: {
      intro: `لە دڵی ئەورووپادا، هەزاران کیلۆمەتر دوور لە چیا سەربەرزەکانی نیشتمان، هەستمان بە بۆشاییەکی گەورە دەکرد. دەستگەیشتن بە کتێبی کوردی، کە گەنجینەی زمان و ناسنامەی ئێمەیە، بۆ زۆربەمان لە تاراوگە ئەستەم یان مەحاڵ بوو. "کورد بووک" لەدایک بوو تا پردێک بێت لە نێوان ئێوە و فەرهەنگەکەتان. ئێمە لێرەین تا هیچ کوردێک لە غوربەتدا حەسرەتی خوێندنەوەی کتێب بە زمانی دایکی نەبێت.`,
      goalsTitle: "ئامانجە پیرۆزەکانمان",
      goals: [
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: "پاراستنی ناسنامە",
          desc: "زیندوو ڕاگرتنی زمانی شیرینمان لە ناو دڵی خێزانە کوردەکانی ئەورووپا."
        },
        {
          icon: <PenTool className="w-6 h-6" />,
          title: "پشتیوانی نووسەران",
          desc: "ڕەخساندنی سەکۆیەک بۆ ناساندن و فرۆشتنی بەرهەمی نووسەرانی کورد."
        },
        {
          icon: <Heart className="w-6 h-6" />,
          title: "دڵی تپێوی ئێمە",
          desc: "داهاتووی منداڵانی کوردستان گرنگترین ئامانجی ئێمەیە."
        }
      ],
      highlight: "بە شانازییەوە ڕادەگەیەنین کە ١٠٠٪ی قازانجی فرۆشی کتێبەکانمان تەرخان دەکرێت بۆ پشتیوانی لە خوێندنی منداڵانی دەستکورتی کوردستان.",
      conclusion: `کاتێک لە "کورد بووک" کتێب دەکڕن، تەنها کاڵایەک ناکڕن، بەڵکو چراوی فەرهەنگی کوردی دادەگیرسێنن، پشتیوانی نووسەرێک دەکەن و قەڵەمێک دەخەنە دەستی منداڵێکی خەونبین.`,
      signature: "موختار",
      date: "Dezember 2025, Berlin"
    },
    de: {
      intro: `Im Herzen Europas, meilenweit entfernt von den Bergen unserer Heimat, spürten wir eine große Leere. Der Zugang zu kurdischen Büchern, diesem Schatz unserer Sprache und Identität, war für viele von uns in der Diaspora schwierig oder unmöglich. Kurd Book wurde geboren, um eine Brücke zwischen Ihnen und Ihrer Kultur zu sein. Wir sind hier, damit kein Kurde in Europa sich danach sehnen muss, Bücher in seiner Muttersprache zu lesen.`,
      goalsTitle: "Unsere Heiligen Ziele",
      goals: [
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: "Bewahrung der Identität",
          desc: "Unsere Sprache und Kultur in den Herzen der kurdischen Familien in Europa lebendig halten."
        },
        {
          icon: <PenTool className="w-6 h-6" />,
          title: "Unterstützung von Autoren",
          desc: "Eine Plattform bieten, damit kurdische Autoren ihre Werke präsentieren und verkaufen können."
        },
        {
          icon: <Heart className="w-6 h-6" />,
          title: "Unser schlagendes Herz",
          desc: "Die Unterstützung der Bildung von Kindern in Kurdistan ist unser wichtigstes Ziel."
        }
      ],
      highlight: "Wir geben stolz bekannt, dass 100% des Gewinns aus dem Buchverkauf auf dieser Website direkt für die Unterstützung der Bildung benachteiligter Kinder in Kurdistan verwendet werden.",
      conclusion: `Wenn Sie ein Buch bei Kurd Book kaufen, erwerben Sie nicht nur ein kulturelles Produkt; Sie entzünden das Licht der Kultur, unterstützen einen Autor und geben einem Kind einen Stift in die Hand.`,
      signature: "Muxtar",
      date: "Dezember 2025, Berlin"
    }
  };

  const t = content[currentLanguage as keyof typeof content] || content.en;

  return (
    <section id="about-mission" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            {/* Decorative Icon */}
            <div className="mb-8 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-full text-rose-600 dark:text-rose-500">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
               </svg>
            </div>

            {/* Intro Text */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
              <p className="text-xl md:text-2xl leading-relaxed font-serif text-gray-700 dark:text-gray-200">
                {t.intro}
              </p>
            </div>

            {/* Goals Grid */}
            <div className="grid md:grid-cols-3 gap-8 w-full mb-16">
              {t.goals.map((goal, idx) => (
                <div key={idx} className="flex flex-col items-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-700 rounded-full text-rose-600 mb-4 shadow-sm">
                    {goal.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{goal.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{goal.desc}</p>
                </div>
              ))}
            </div>

            {/* Highlight Section */}
            <div className="w-full bg-rose-600 text-white p-8 md:p-10 rounded-3xl shadow-xl mb-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="relative z-10 flex flex-col items-center">
                <GraduationCap className="w-12 h-12 mb-4 text-rose-100" />
                <p className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                  {t.highlight}
                </p>
              </div>
            </div>

            {/* Conclusion & Signature */}
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-600 dark:text-gray-400 italic text-lg mb-8">
                "{t.conclusion}"
              </p>
              <div className="flex flex-col items-center gap-2">
                 <span className="font-bold text-2xl text-gray-900 dark:text-white font-serif">{t.signature}</span>
                 <span className="text-xs text-gray-400 font-medium uppercase tracking-[0.2em]">{t.date}</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
