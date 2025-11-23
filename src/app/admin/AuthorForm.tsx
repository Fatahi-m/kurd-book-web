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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto w-full transition-colors duration-300">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        {author 
          ? (currentLanguage === 'ku' ? 'دەستکاریکردنی نووسەر' : 'Edit Author')
          : (currentLanguage === 'ku' ? 'زیادکردنی نووسەر' : 'Add Author')
        }
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {currentLanguage === 'ku' ? 'ناو' : 'Name'}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {currentLanguage === 'ku' ? 'ناوی لاتینی (بۆ گەڕان)' : 'Latin Name (for search)'}
          </label>
          <input
            type="text"
            value={formData.latinName}
            onChange={(e) => setFormData({...formData, latinName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {currentLanguage === 'ku' ? 'نەتەوە' : 'Nationality'}
          </label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => setFormData({...formData, nationality: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {currentLanguage === 'ku' ? 'پاشگەزبوونەوە' : 'Cancel'}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentLanguage === 'ku' ? 'تۆمارکردن' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}