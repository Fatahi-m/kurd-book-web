'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSummary() {
  const { currentLanguage } = useLanguage();

  const content = {
    en: {
      text: `In the heart of Europe, miles away from the mountains of our homeland, we felt a great void. Access to Kurdish books, this treasure of our language and identity, was difficult or impossible for many of us in the diaspora. Kurd Book was born to be a bridge between you and your culture. We are here so that no Kurd in Europe longs for reading books in their mother tongue.

Kurd Book is not just an online store. We are built on three sacred goals, each complementing the other:
1. Preserving Identity in Diaspora: We want to keep our language and culture alive in the hearts of Kurdish families living in Europe by facilitating access to Kurdish books and promoting the culture of reading.
2. Supporting Kurdish Authors: Our authors are the guardians of our language. We have provided a platform for their works to be seen and sold, providing financial support for them to continue creating valuable works.
3. Our Beating Heart: The Future of Kurdistan's Children (Our Most Important Goal)

This is where our story becomes different. We believe no child should be deprived of reading and writing due to poverty. Literacy is the strongest weapon to fight suffering and build the future.
We proudly announce that 100% of the profits from book sales on this website are directly spent on supporting the education of underprivileged children in Kurdistan.

When you buy a book from Kurd Book, you are not just buying a cultural product; you are doing three great things at once:
• You light the lamp of Kurdish culture in your home.
• You support a hardworking Kurdish author.
• And most importantly: You put a pen in the hand of a child who dreams of writing.

Every book sold here is a brick for building a brighter future for our land's children.
Join us to plant knowledge and harvest hope together.`,
      signature: "Muxtar",
      date: "Dezember 2025, Berlin"
    },
    ku: {
      text: `لە دڵی ئەورووپادا، هەزاران کیلۆمەتر دوور لە چیا سەربەرزەکانی نیشتمان، هەستمان بە بۆشاییەکی گەورە دەکرد. دەستگەیشتن بە کتێبی کوردی، کە گەنجینەی زمان و ناسنامەی ئێمەیە، بۆ زۆربەمان لە تاراوگە ئەستەم یان مەحاڵ بوو. "کورد بووک" لەدایک بوو تا پردێک بێت لە نێوان ئێوە و فەرهەنگەکەتان. ئێمە لێرەین تا هیچ کوردێک لە غوربەتدا حەسرەتی خوێندنەوەی کتێب بە زمانی دایکی نەبێت.

"کورد بووک" تەنها فرۆشگایەکی ئۆنلاین نییە؛ ئێمە لەسەر سێ کۆڵەکەی پیرۆز وەستاوین کە تەواوکەری یەکترن:
١. پاراستنی ناسنامە لە تاراوگە: دەمانەوێت بە ئاسانکردنی دەستگەیشتن بە کتێب و برەودان بە کولتووری خوێندنەوە، زمانی شیرینمان لە ناو دڵی خێزانە کوردەکانی ئەورووپادا بە زیندوویی ڕابگرین.
٢. پشتیوانی لە نووسەرانی کورد: نووسەران پاسەوانی زمانی ئێمەن. ئێمە بووینەتە سەکۆیەک بۆ ناساندن و فرۆشتنی بەرهەمەکانیان و پشتیوانی داراییان لێ دەکەین تا بتوانن بەردەوام بن لە خولقاندنی شاکار.
٣. دڵی تپێوی ئێمە؛ داهاتووی منداڵانی کوردستان (گرنگترین ئامانج):

لێرەدا چیرۆکەکە جیاواز دەبێت. باوەڕمان وایە هیچ منداڵێک نابێت بەهۆی هەژارییەوە لە خوێندن بێبەش بێت. خوێندن بەهێزترین چەکە بۆ بەرەنگاربوونەوەی ئازار و بنیاتنانی داهاتوو.
بە شانازییەوە ڕادەگەیەنین کە ١٠٠٪ی قازانجی فرۆشی کتێبەکانمان تەرخان دەکرێت بۆ پشتیوانی لە خوێندنی منداڵانی دەستکورتی کوردستان.

کاتێک لە "کورد بووک" کتێب دەکڕن، تەنها کاڵایەک ناکڕن، بەڵکو سێ کاری مەزن ئەنجام دەدەن:
• چراوی فەرهەنگی کوردی لە ماڵەکەتاندا دادەگیرسێنن.
• پشتیوانی لە نووسەرێکی ماندوونەناس دەکەن.
• و لە هەمووی گرنگتر: قەڵەمێک دەخەنە دەستی منداڵێکەوە کە خەونی نووسینی هەیە.

هەر کتێبێک کە لێرە دەفرۆشرێت، خشتێکە بۆ بنیادنانی داهاتوویەکی گەشتر بۆ ڕۆڵەکانی نیشتمان.
وەرن با پێکەوە تۆوی زانست بچێنین و هیوا دروێنە بکەین.`,
      signature: "موختار",
      date: "Dezember 2025, Berlin"
    },
    de: {
      text: `Im Herzen Europas, meilenweit entfernt von den Bergen unserer Heimat, spürten wir eine große Leere. Der Zugang zu kurdischen Büchern, diesem Schatz unserer Sprache und Identität, war für viele von uns in der Diaspora schwierig oder unmöglich. Kurd Book wurde geboren, um eine Brücke zwischen Ihnen und Ihrer Kultur zu sein. Wir sind hier, damit kein Kurde in Europa sich danach sehnen muss, Bücher in seiner Muttersprache zu lesen.

Kurd Book ist nicht nur ein Online-Shop. Wir bauen auf drei heiligen Zielen auf, die sich gegenseitig ergänzen:
1. Bewahrung der Identität in der Diaspora: Wir wollen unsere Sprache und Kultur in den Herzen der in Europa lebenden kurdischen Familien lebendig halten, indem wir den Zugang zu kurdischen Büchern erleichtern und die Lesekultur fördern.
2. Unterstützung kurdischer Autoren: Unsere Autoren sind die Hüter unserer Sprache. Wir bieten eine Plattform, damit ihre Werke gesehen und verkauft werden können, um sie finanziell bei der Schaffung wertvoller Werke zu unterstützen.
3. Unser schlagendes Herz: Die Zukunft der Kinder Kurdistans (Unser wichtigstes Ziel)

Hier wird unsere Geschichte anders. Wir glauben, dass kein Kind aufgrund von Armut vom Lesen und Schreiben ausgeschlossen sein sollte. Bildung ist die stärkste Waffe, um Leiden zu bekämpfen und die Zukunft zu bauen.
Wir geben stolz bekannt, dass 100% des Gewinns aus dem Buchverkauf auf dieser Website direkt für die Unterstützung der Bildung benachteiligter Kinder in Kurdistan verwendet werden.

Wenn Sie ein Buch bei Kurd Book kaufen, erwerben Sie nicht nur ein kulturelles Produkt; Sie tun gleichzeitig drei große Dinge:
• Sie entzünden das Licht der kurdischen Kultur in Ihrem Zuhause.
• Sie unterstützen einen hart arbeitenden kurdischen Autor.
• Und am wichtigsten: Sie geben einem Kind, das vom Schreiben träumt, einen Stift in die Hand.

Jedes hier verkaufte Buch ist ein Ziegelstein für den Bau einer helleren Zukunft für die Kinder unseres Landes.
Begleiten Sie uns, um gemeinsam Wissen zu säen und Hoffnung zu ernten.`,
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
        <div className="max-w-3xl mx-auto text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Decorative Icon */}
            <div className="mb-8 text-rose-600 dark:text-rose-500 opacity-80">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
               </svg>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="text-gray-800 dark:text-gray-200 leading-loose whitespace-pre-line font-serif text-lg md:text-xl">
                {t.text}
              </div>

              <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 w-full flex flex-col items-center gap-2">
                 <span className="font-bold text-2xl text-gray-900 dark:text-white font-serif italic">{t.signature}</span>
                 <span className="text-xs text-gray-400 font-medium uppercase tracking-[0.2em]">{t.date}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
