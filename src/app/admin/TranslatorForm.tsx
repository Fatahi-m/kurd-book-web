'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AdminTranslator, adminDataService } from '@/lib/adminDataService';

interface TranslatorFormProps {
  translator?: AdminTranslator;
  onClose: () => void;
  onSave: () => void;
}

export default function TranslatorForm({ translator, onClose, onSave }: TranslatorFormProps) {
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    name: translator?.name || '',
    nationality: translator?.nationality || '',
    latinName: translator?.latinName || '',
    imageUrl: translator?.imageUrl || '',
    languages: translator?.languages?.join(', ') || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const languagesArray = formData.languages
      .split(',')
      .map(lang => lang.trim())
      .filter(lang => lang.length > 0);

    const dataToSave = {
      name: formData.name,
      nationality: formData.nationality,
      latinName: formData.latinName,
      imageUrl: formData.imageUrl,
      languages: languagesArray
    };
    
    try {
      if (translator) {
        adminDataService.updateTranslator(translator.id, dataToSave);
        alert(currentLanguage === 'ku' ? 'وەرگێڕ نوێکرایەوە!' : 'Translator updated!');
      } else {
        adminDataService.addTranslator(dataToSave);
        alert(currentLanguage === 'ku' ? 'وەرگێڕ زیادکرا!' : 'Translator added!');
      }
      onSave();
    } catch (error) {
      alert(currentLanguage === 'ku' ? 'هەڵەیەک ڕوویدا!' : 'An error occurred!');
    }
  };

  return (
    <div className="bg-white border border-gray-200 p-6 max-w-md mx-auto w-full transition-colors duration-300">
      <h3 className="text-xl font-serif text-black mb-6">
        {translator 
          ? (currentLanguage === 'ku' ? 'دەستکاریکردنی وەرگێڕ' : 'Edit Translator')
          : (currentLanguage === 'ku' ? 'زیادکردنی وەرگێڕ' : 'Add Translator')
        }
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
            {currentLanguage === 'ku' ? 'ناو' : 'Name'}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
            {currentLanguage === 'ku' ? 'ناوی لاتینی (بۆ گەڕان)' : 'Latin Name (for search)'}
          </label>
          <input
            type="text"
            value={formData.latinName}
            onChange={(e) => setFormData({...formData, latinName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
            {currentLanguage === 'ku' ? 'نەتەوە' : 'Nationality'}
          </label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => setFormData({...formData, nationality: e.target.value})}
            className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
            {currentLanguage === 'ku' ? 'زمانەکان (بە کۆما جیایان بکەوە)' : 'Languages (comma separated)'}
          </label>
          <input
            type="text"
            value={formData.languages}
            onChange={(e) => setFormData({...formData, languages: e.target.value})}
            placeholder="کوردی, فارسی, ئینگلیزی"
            className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors uppercase tracking-widest text-xs"
          >
            {currentLanguage === 'ku' ? 'پاشگەزبوونەوە' : 'Cancel'}
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors uppercase tracking-widest text-xs"
          >
            {currentLanguage === 'ku' ? 'تۆمارکردن' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
