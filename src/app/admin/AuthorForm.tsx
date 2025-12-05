'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AdminAuthor, adminDataService } from '@/lib/adminDataService';

interface AuthorFormProps {
  author?: AdminAuthor;
  onClose: () => void;
  onSave: () => void;
}

export default function AuthorForm({ author, onClose, onSave }: AuthorFormProps) {
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    name: author?.name || '',
    nationality: author?.nationality || '',
    latinName: author?.latinName || '',
    imageUrl: author?.imageUrl || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (author) {
        adminDataService.updateAuthor(author.id, formData);
        alert(currentLanguage === 'ku' ? 'نووسەر نوێکرایەوە!' : 'Author updated!');
      } else {
        adminDataService.addAuthor(formData);
        alert(currentLanguage === 'ku' ? 'نووسەر زیادکرا!' : 'Author added!');
      }
      onSave();
    } catch (error) {
      alert(currentLanguage === 'ku' ? 'هەڵەیەک ڕوویدا!' : 'An error occurred!');
    }
  };

  return (
    <div className="bg-white border border-gray-200 p-6 max-w-md mx-auto w-full transition-colors duration-300">
      <h3 className="text-xl font-serif text-black mb-6">
        {author 
          ? (currentLanguage === 'ku' ? 'دەستکاریکردنی نووسەر' : 'Edit Author')
          : (currentLanguage === 'ku' ? 'زیادکردنی نووسەر' : 'Add Author')
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