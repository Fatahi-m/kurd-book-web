'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowDown, Heart } from 'lucide-react';

export default function MissionTeaser() {
  const { currentLanguage } = useLanguage();

  const content = {
    en: {
      text: "Every book sold here is a brick for building a brighter future for our land's children. Join us to plant knowledge and harvest hope together.",
      button: "Read Our Full Mission"
    },
    ku: {
      text: "هەر کتێبێک کە لێرە دەفرۆشرێت، خشتێکە بۆ بنیادنانی داهاتوویەکی گەشتر بۆ ڕۆڵەکانی نیشتمان. وەرن با پێکەوە تۆوی زانست بچێنین و هیوا دروێنە بکەین.",
      button: "خوێندنەوەی تەواوی چیرۆکەکە"
    },
    de: {
      text: "Jedes hier verkaufte Buch ist ein Ziegelstein für den Bau einer helleren Zukunft für die Kinder unseres Landes. Begleiten Sie uns, um gemeinsam Wissen zu säen und Hoffnung zu ernten.",
      button: "Unsere ganze Mission lesen"
    },
    kmr: {
      text: "Her pirtûkek ku li vir tê firotin, xîştek e ji bo avakirina pêşerojeke ronaktir ji bo zarokên welatê me. Bi me re bin da ku em bi hev re zanînê biçînin û hêviyê biçinîn.",
      button: "Mîsyona Me Bixwîne"
    }
  };

  const t = content[currentLanguage as keyof typeof content] || content.en;

  const scrollToMission = () => {
    const element = document.getElementById('about-mission');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-rose-50 border-b border-rose-100 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-100 text-rose-600 mb-2">
            <Heart size={20} className="fill-current" />
          </div>
          
          <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed font-serif">
            {t.text}
          </p>
          
          <button 
            onClick={scrollToMission}
            className="mt-2 flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors group"
          >
            {t.button}
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
