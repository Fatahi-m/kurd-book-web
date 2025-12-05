'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const languages = [
  { code: 'ku', name: 'کوردی', flag: 'KU' },
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'kmr', name: 'Kurmancî', flag: 'KMR' }
] as const;

interface LanguageSwitcherProps {
  variant?: 'default' | 'minimal';
}

export default function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (langCode: 'ku' | 'en' | 'kmr') => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  const buttonClasses = variant === 'minimal'
    ? "flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700/50 hover:border-slate-600"
    : "flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow";

  return (
    <div className="relative dropdown-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClasses}
        type="button"
      >
        <span className={variant === 'minimal' ? "text-sm" : "text-lg"}>{currentLang?.flag}</span>
        <span className="hidden sm:inline">{currentLang?.name}</span>
        <svg className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20 py-1 right-0 rtl:right-auto rtl:left-0 overflow-visible">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left rtl:text-right px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 rtl:flex-row-reverse transition-colors ${
                  currentLanguage === lang.code 
                    ? 'bg-rose-50 dark:bg-rose-900/30 text-[#e11d48] dark:text-rose-300 font-medium' 
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
                {currentLanguage === lang.code && (
                  <span className="ml-auto rtl:ml-0 rtl:mr-auto text-[#e11d48] dark:text-rose-400">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}