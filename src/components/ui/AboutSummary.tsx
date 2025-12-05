'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, Heart, GraduationCap, Sparkles } from 'lucide-react';

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
    <section id="about-mission" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Content Container */}
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold text-slate-900 mb-6 ${currentLanguage === 'ku' ? 'font-bilal' : 'font-serif'}`}>
              {currentLanguage === 'ku' ? 'چیرۆکی ئێمە' : 'Our Story'}
            </h2>
            <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
          </div>

          {/* Content Body */}
          <div className={`text-xl leading-loose text-slate-700 text-justify ${currentLanguage === 'ku' ? 'font-bilal' : 'font-serif'}`}>
            <p className="mb-10 first-letter:text-6xl first-letter:font-bold first-letter:text-amber-600 first-letter:mr-4 first-letter:float-left">
              {t.intro}
            </p>

            <div className="my-12 pl-8 border-l-4 border-amber-100 py-4">
              <h3 className="font-bold text-slate-900 mb-8 text-xl uppercase tracking-wider">
                {t.goalsTitle}
              </h3>
              <div className="space-y-6">
                {t.goals.map((goal, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="text-amber-500 mt-2 text-sm">●</span>
                    <p className="m-0 text-xl">
                      <span className="font-bold text-slate-900">{goal.title}</span>
                      <span className="mx-3 text-slate-300">|</span>
                      <span className="text-slate-600">{goal.desc}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-10 my-12 rounded-lg border border-slate-100 text-center">
              <p className="italic text-slate-800 font-medium text-2xl">
                "{t.highlight}"
              </p>
            </div>

            <p className="mb-10 text-slate-700 text-xl">
              {t.conclusion}
            </p>
          </div>

          {/* Footer/Signature */}
          <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col items-end">
            <div className="text-right">
              <p className={`text-4xl font-bold text-slate-900 italic mb-3 ${currentLanguage === 'ku' ? 'font-bilal' : 'font-serif'}`}>{t.signature}</p>
              <p className="text-base text-slate-400 uppercase tracking-widest font-sans">{t.date}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
