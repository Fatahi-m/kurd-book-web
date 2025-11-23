'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutSummary() {
  const { currentLanguage } = useLanguage();

  const content = {
    en: {
      title: "Beyond a Bookstore; A Nest for Culture and Hope",
      subtitle: "Who We Are and Why We Are Here?",
      paragraphs: [
        "In the heart of Europe, miles away from the mountains of our homeland, we felt a great void. Access to Kurdish books, this treasure of our language and identity, was difficult or impossible for many of us in the diaspora. Kurd Book was born to be a bridge between you and your culture. We are here so that no Kurd in Europe longs for reading books in their mother tongue.",
        "Our Threefold Mission:",
        "Kurd Book is not just an online store. We are built on three sacred goals, each complementing the other:",
        "1. Preserving Identity in Diaspora: We want to keep our language and culture alive in the hearts of Kurdish families living in Europe by facilitating access to Kurdish books and promoting the culture of reading.",
        "2. Supporting Kurdish Authors: Our authors are the guardians of our language. We have provided a platform for their works to be seen and sold, providing financial support for them to continue creating valuable works.",
        "3. Our Beating Heart: The Future of Kurdistan's Children (Our Most Important Goal)",
        "This is where our story becomes different. We believe no child should be deprived of reading and writing due to poverty. Literacy is the strongest weapon to fight suffering and build the future.",
        "We proudly announce that 100% of the profits from book sales on this website are directly spent on supporting the education of underprivileged children in Kurdistan.",
        "What Do You Do With Every Purchase?",
        "When you buy a book from Kurd Book, you are not just buying a cultural product; you are doing three great things at once:",
        "• You light the lamp of Kurdish culture in your home.",
        "• You support a hardworking Kurdish author.",
        "• And most importantly: You put a pen in the hand of a child who dreams of writing.",
        "Every book sold here is a brick for building a brighter future for our land's children.",
        "Join us to plant knowledge and harvest hope together."
      ]
    },
    ku: {
      title: "زیاتر لە کتێبخانەیەک؛ لانکەیەک بۆ فەرهەنگ و هیوا",
      subtitle: "ئێمە کێین و بۆچی لێرەین؟",
      paragraphs: [
        "لە دڵی ئەورووپادا، هەزاران کیلۆمەتر دوور لە چیا سەربەرزەکانی نیشتمان، هەستمان بە بۆشاییەکی گەورە دەکرد. دەستگەیشتن بە کتێبی کوردی، کە گەنجینەی زمان و ناسنامەی ئێمەیە، بۆ زۆربەمان لە تاراوگە ئەستەم یان مەحاڵ بوو. \"کورد بووک\" لەدایک بوو تا پردێک بێت لە نێوان ئێوە و فەرهەنگەکەتان. ئێمە لێرەین تا هیچ کوردێک لە غوربەتدا حەسرەتی خوێندنەوەی کتێب بە زمانی دایکی نەبێت.",
        "ئەرک و پەیمانی پیرۆزی ئێمە",
        "\"کورد بووک\" تەنها فرۆشگایەکی ئۆنلاین نییە؛ ئێمە لەسەر سێ کۆڵەکەی پیرۆز وەستاوین کە تەواوکەری یەکترن:",
        "١. پاراستنی ناسنامە لە تاراوگە: دەمانەوێت بە ئاسانکردنی دەستگەیشتن بە کتێب و برەودان بە کولتووری خوێندنەوە، زمانی شیرینمان لە ناو دڵی خێزانە کوردەکانی ئەورووپادا بە زیندوویی ڕابگرین.",
        "٢. پشتیوانی لە نووسەرانی کورد: نووسەران پاسەوانی زمانی ئێمەن. ئێمە بووینەتە سەکۆیەک بۆ ناساندن و فرۆشتنی بەرهەمەکانیان و پشتیوانی داراییان لێ دەکەین تا بتوانن بەردەوام بن لە خولقاندنی شاکار.",
        "٣. دڵی تپێوی ئێمە؛ داهاتووی منداڵانی کوردستان (گرنگترین ئامانج):",
        "لێرەدا چیرۆکەکە جیاواز دەبێت. باوەڕمان وایە هیچ منداڵێک نابێت بەهۆی هەژارییەوە لە خوێندن بێبەش بێت. خوێندن بەهێزترین چەکە بۆ بەرەنگاربوونەوەی ئازار و بنیاتنانی داهاتوو.",
        "بە شانازییەوە ڕادەگەیەنین کە ١٠٠٪ی قازانجی فرۆشی کتێبەکانمان تەرخان دەکرێت بۆ پشتیوانی لە خوێندنی منداڵانی دەستکورتی کوردستان.",
        "بە هەر کڕینێک چی ڕوودەدات؟",
        "کاتێک لە \"کورد بووک\" کتێب دەکڕن، تەنها کاڵایەک ناکڕن، بەڵکو سێ کاری مەزن ئەنجام دەدەن:",
        "• چراوی فەرهەنگی کوردی لە ماڵەکەتاندا دادەگیرسێنن.",
        "• پشتیوانی لە نووسەرێکی ماندوونەناس دەکەن.",
        "• و لە هەمووی گرنگتر: قەڵەمێک دەخەنە دەستی منداڵێکەوە کە خەونی نووسینی هەیە.",
        "هەر کتێبێک کە لێرە دەفرۆشرێت، خشتێکە بۆ بنیادنانی داهاتوویەکی گەشتر بۆ ڕۆڵەکانی نیشتمان.",
        "وەرن با پێکەوە تۆوی زانست بچێنین و هیوا دروێنە بکەین."
      ]
    },
    de: {
      title: "Mehr als eine Buchhandlung; Ein Nest für Kultur und Hoffnung",
      subtitle: "Wer wir sind und warum wir hier sind?",
      paragraphs: [
        "Im Herzen Europas, meilenweit entfernt von den Bergen unserer Heimat, spürten wir eine große Leere. Der Zugang zu kurdischen Büchern, diesem Schatz unserer Sprache und Identität, war für viele von uns in der Diaspora schwierig oder unmöglich. Kurd Book wurde geboren, um eine Brücke zwischen Ihnen und Ihrer Kultur zu sein. Wir sind hier, damit kein Kurde in Europa sich danach sehnen muss, Bücher in seiner Muttersprache zu lesen.",
        "Unsere dreifache Mission:",
        "Kurd Book ist nicht nur ein Online-Shop. Wir bauen auf drei heiligen Zielen auf, die sich gegenseitig ergänzen:",
        "1. Bewahrung der Identität in der Diaspora: Wir wollen unsere Sprache und Kultur in den Herzen der in Europa lebenden kurdischen Familien lebendig halten, indem wir den Zugang zu kurdischen Büchern erleichtern und die Lesekultur fördern.",
        "2. Unterstützung kurdischer Autoren: Unsere Autoren sind die Hüter unserer Sprache. Wir bieten eine Plattform, damit ihre Werke gesehen und verkauft werden können, um sie finanziell bei der Schaffung wertvoller Werke zu unterstützen.",
        "3. Unser schlagendes Herz: Die Zukunft der Kinder Kurdistans (Unser wichtigstes Ziel)",
        "Hier wird unsere Geschichte anders. Wir glauben, dass kein Kind aufgrund von Armut vom Lesen und Schreiben ausgeschlossen sein sollte. Bildung ist die stärkste Waffe, um Leiden zu bekämpfen und die Zukunft zu bauen.",
        "Wir geben stolz bekannt, dass 100% des Gewinns aus dem Buchverkauf auf dieser Website direkt für die Unterstützung der Bildung benachteiligter Kinder in Kurdistan verwendet werden.",
        "Was tun Sie mit jedem Kauf?",
        "Wenn Sie ein Buch bei Kurd Book kaufen, erwerben Sie nicht nur ein kulturelles Produkt; Sie tun gleichzeitig drei große Dinge:",
        "• Sie entzünden das Licht der kurdischen Kultur in Ihrem Zuhause.",
        "• Sie unterstützen einen hart arbeitenden kurdischen Autor.",
        "• Und am wichtigsten: Sie geben einem Kind, das vom Schreiben träumt, einen Stift in die Hand.",
        "Jedes hier verkaufte Buch ist ein Ziegelstein für den Bau einer helleren Zukunft für die Kinder unseres Landes.",
        "Begleiten Sie uns, um gemeinsam Wissen zu säen und Hoffnung zu ernten."
      ]
    }
  };

  const t = content[currentLanguage as keyof typeof content] || content.en;
  const isRTL = currentLanguage === 'ku';

  return (
    <section className="relative py-24 overflow-hidden bg-[#F5F2E9] dark:bg-[#1a1a1a] transition-colors duration-500">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 dark:via-stone-700 to-transparent opacity-50" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-stone-200/50 dark:bg-stone-800/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-stone-200/50 dark:bg-stone-800/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/50 dark:bg-stone-800/50 text-stone-600 dark:text-stone-400 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>{t.title}</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-12 font-serif leading-tight">
              {t.subtitle}
            </h2>
            
            <div className="prose prose-lg dark:prose-invert mx-auto text-stone-600 dark:text-stone-400 leading-relaxed text-justify">
              {t.paragraphs.map((paragraph, index) => {
                // Simple styling logic based on content
                const isList = paragraph.startsWith('•');
                const isHeader = paragraph.includes(':') && paragraph.length < 100 && !paragraph.includes('•');
                const isBold = paragraph.includes('100%');

                if (isList) {
                  return (
                    <p key={index} className="mb-2 font-medium text-stone-800 dark:text-stone-200 pl-4 rtl:pr-4 rtl:pl-0">
                      {paragraph}
                    </p>
                  );
                }
                
                if (isHeader) {
                  return (
                    <h3 key={index} className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-8 mb-4">
                      {paragraph}
                    </h3>
                  );
                }

                if (isBold) {
                   return (
                    <p key={index} className="mb-6 font-bold text-stone-900 dark:text-stone-100 text-xl">
                      {paragraph}
                    </p>
                  );
                }

                return (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            <div className="mt-16">
              <div className="h-px w-24 bg-stone-300 dark:bg-stone-700 mx-auto mb-4" />
              <p className="text-sm text-stone-500 dark:text-stone-500 italic font-serif">
                Est. 2024 — Europe
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
