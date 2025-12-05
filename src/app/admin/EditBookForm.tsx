'use client';

import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AdminBook, adminDataService } from '@/lib/adminDataService';

interface EditBookFormProps {
  book: AdminBook;
  onClose: () => void;
  onSave: () => void;
}

export default function EditBookForm({ book, onClose, onSave }: EditBookFormProps) {
  const { currentLanguage } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Kurdish Version
    titleKu: book.titleKu || '',
    authorKu: book.authorKu || '',
    publisherKu: book.publisherKu || '',
    descriptionKu: book.descriptionKu || '',
    // English Version  
    titleEn: book.titleEn || '',
    authorEn: book.authorEn || '',
    publisherEn: book.publisherEn || '',
    descriptionEn: book.descriptionEn || '',
    // German Version
    titleDe: book.titleDe || '',
    authorDe: book.authorDe || '',
    publisherDe: book.publisherDe || '',
    descriptionDe: book.descriptionDe || '',
    // Common Fields
    translator: book.translator || '',
    price: book.price.toString(),
    originalPrice: book.originalPrice?.toString() || '',
    category: book.category,
    language: book.language,
    pages: book.pages?.toString() || '',
    publishDate: book.publishDate || '',
    isbn: book.isbn || '',
    tags: book.tags.join(', '),
    imageUrl: book.imageUrl || '',
    imageFile: null as File | null,
    inventoryCount: book.inventoryCount?.toString() || '0',
    inStock: book.inStock,
    featured: book.featured,
    bestseller: book.bestseller,
    newRelease: book.newRelease
  });

  const [dragActive, setDragActive] = useState(false);
  const translators = adminDataService.getAllTranslators();

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({...formData, imageUrl: e.target?.result as string, imageFile: file});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const categories = [
    { value: 'literature', label: currentLanguage === 'ku' ? 'ئەدەبیات' : currentLanguage === 'en' ? 'Literature' : 'Literatur' },
    { value: 'poetry', label: currentLanguage === 'ku' ? 'شیعر' : currentLanguage === 'en' ? 'Poetry' : 'Poesie' },
    { value: 'history', label: currentLanguage === 'ku' ? 'مێژوو' : currentLanguage === 'en' ? 'History' : 'Geschichte' },
    { value: 'children', label: currentLanguage === 'ku' ? 'منداڵان' : currentLanguage === 'en' ? 'Children' : 'Kinder' },
    { value: 'education', label: currentLanguage === 'ku' ? 'پەروەردە' : currentLanguage === 'en' ? 'Education' : 'Bildung' },
    { value: 'science', label: currentLanguage === 'ku' ? 'زانست' : currentLanguage === 'en' ? 'Science' : 'Wissenschaft' },
    { value: 'religion', label: currentLanguage === 'ku' ? 'ئایین' : currentLanguage === 'en' ? 'Religion' : 'Religion' },
    { value: 'biography', label: currentLanguage === 'ku' ? 'ژیاننامە' : currentLanguage === 'en' ? 'Biography' : 'Biographie' },
    { value: 'philosophy', label: currentLanguage === 'ku' ? 'فەلسەفە' : currentLanguage === 'en' ? 'Philosophy' : 'Philosophie' },
    { value: 'politics', label: currentLanguage === 'ku' ? 'سیاسەت' : currentLanguage === 'en' ? 'Politics' : 'Politik' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedBook = {
      id: book.id,
      title: formData.titleKu || formData.titleEn || formData.titleDe,
      titleKu: formData.titleKu,
      titleEn: formData.titleEn,
      titleDe: formData.titleDe,
      author: formData.authorKu || formData.authorEn || formData.authorDe,
      authorKu: formData.authorKu,
      authorEn: formData.authorEn,
      authorDe: formData.authorDe,
      publisher: formData.publisherKu || formData.publisherEn || formData.publisherDe,
      publisherKu: formData.publisherKu,
      publisherEn: formData.publisherEn,
      publisherDe: formData.publisherDe,
      description: formData.descriptionKu || formData.descriptionEn || formData.descriptionDe,
      descriptionKu: formData.descriptionKu,
      descriptionEn: formData.descriptionEn,
      descriptionDe: formData.descriptionDe,
      translator: formData.translator,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      language: formData.language,
      pages: formData.pages ? parseInt(formData.pages) : undefined,
      publishDate: formData.publishDate,
      isbn: formData.isbn,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      imageUrl: formData.imageUrl,
      inventoryCount: parseInt(formData.inventoryCount) || 0,
      inStock: parseInt(formData.inventoryCount) > 0,
      featured: formData.featured,
      bestseller: formData.bestseller,
      newRelease: formData.newRelease,
      rating: book.rating,
      reviewCount: book.reviewCount
    };

    try {
      adminDataService.updateBook(updatedBook);
      alert(currentLanguage === 'ku' ? 'کتاب نوێکرایەوە!' : currentLanguage === 'en' ? 'Book updated!' : 'Buch aktualisiert!');
      onSave();
    } catch (error) {
      alert(currentLanguage === 'ku' ? 'هەڵەیەک ڕوویدا!' : currentLanguage === 'en' ? 'An error occurred!' : 'Ein Fehler ist aufgetreten!');
    }
  };

  return (
    <div className="bg-white border border-gray-200 p-6 max-w-4xl mx-auto transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-serif text-black">
          {currentLanguage === 'ku' ? 'دەستکاریکردنی کتاب' : currentLanguage === 'en' ? 'Edit Book' : 'Buch Bearbeiten'}
        </h3>
        
        {/* Step Indicator */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`w-8 h-8 flex items-center justify-center text-sm font-serif border border-gray-200 ${
              currentStep === step ? 'bg-black text-white' : 
              currentStep > step ? 'bg-black text-white' : 'bg-gray-50 text-gray-600'
            }`}>
              {currentStep > step ? '✓' : step}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h4 className="text-lg font-serif text-black border-b border-gray-200 pb-2">
              {currentLanguage === 'ku' ? 'زانیاریە سەرەکیەکان' : currentLanguage === 'en' ? 'Basic Information' : 'Grundinformationen'}
            </h4>
            
            {/* Image Upload */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {currentLanguage === 'ku' ? 'وێنەی کتاب' : currentLanguage === 'en' ? 'Book Cover' : 'Buchcover'}
                </label>
                <div
                  className={`border border-dashed p-6 text-center transition-colors ${
                    dragActive ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-black'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {formData.imageUrl ? (
                    <div className="relative">
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-48 object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, imageUrl: '', imageFile: null})}
                        className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {currentLanguage === 'ku' ? 'وێنە بکێشە یان کلیک بکە' : currentLanguage === 'en' ? 'Drag image here or click' : 'Bild hierher ziehen oder klicken'}
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                        className="hidden"
                        id="edit-image-upload"
                      />
                      <label htmlFor="edit-image-upload" className="cursor-pointer inline-block mt-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-xs uppercase tracking-widest">
                        {currentLanguage === 'ku' ? 'هەڵبژاردن' : currentLanguage === 'en' ? 'Select' : 'Auswählen'}
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                    {currentLanguage === 'ku' ? 'پۆل' : currentLanguage === 'en' ? 'Category' : 'Kategorie'}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Price & Original Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                      {currentLanguage === 'ku' ? 'نرخ (یۆرۆ)' : currentLanguage === 'en' ? 'Price (EUR)' : 'Preis (EUR)'}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                      {currentLanguage === 'ku' ? 'نرخی سەرەتایی' : currentLanguage === 'en' ? 'Original Price' : 'Ursprünglicher Preis'}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                    />
                  </div>
                </div>

                {/* Inventory Count */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                    {currentLanguage === 'ku' ? 'ژمارەی مەوجوود' : currentLanguage === 'en' ? 'Inventory Count' : 'Lagerbestand'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.inventoryCount}
                    onChange={(e) => setFormData({...formData, inventoryCount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                    required
                  />
                </div>

                {/* Pages & ISBN */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                      {currentLanguage === 'ku' ? 'ژمارەی لاپەڕەکان' : currentLanguage === 'en' ? 'Pages' : 'Seiten'}
                    </label>
                    <input
                      type="number"
                      value={formData.pages}
                      onChange={(e) => setFormData({...formData, pages: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">ISBN</label>
                    <input
                      type="text"
                      value={formData.isbn}
                      onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                    />
                  </div>
                </div>

                {/* Publish Date & Tags */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                      {currentLanguage === 'ku' ? 'بەرواری چاپ' : currentLanguage === 'en' ? 'Publish Date' : 'Veröffentlichungsdatum'}
                    </label>
                    <input
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                      {currentLanguage === 'ku' ? 'تاگەکان (بە کۆما جیابکەرەوە)' : currentLanguage === 'en' ? 'Tags (comma separated)' : 'Tags (kommagetrennt)'}
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                      placeholder="شیعر, کلاسیک, نەوروز"
                    />
                  </div>
                </div>

                {/* Status Checkboxes */}
                <div className="flex flex-wrap gap-6 mt-4">
                  <label className="flex items-center text-black">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="mr-2 rtl:mr-0 rtl:ml-2"
                    />
                    <span className="text-sm uppercase tracking-wider">{currentLanguage === 'ku' ? 'تایبەت' : currentLanguage === 'en' ? 'Featured' : 'Empfohlen'}</span>
                  </label>
                  <label className="flex items-center text-black">
                    <input
                      type="checkbox"
                      checked={formData.bestseller}
                      onChange={(e) => setFormData({...formData, bestseller: e.target.checked})}
                      className="mr-2 rtl:mr-0 rtl:ml-2"
                    />
                    <span className="text-sm uppercase tracking-wider">{currentLanguage === 'ku' ? 'باشترین فرۆش' : currentLanguage === 'en' ? 'Bestseller' : 'Bestseller'}</span>
                  </label>
                  <label className="flex items-center text-black">
                    <input
                      type="checkbox"
                      checked={formData.newRelease}
                      onChange={(e) => setFormData({...formData, newRelease: e.target.checked})}
                      className="mr-2 rtl:mr-0 rtl:ml-2"
                    />
                    <span className="text-sm uppercase tracking-wider">{currentLanguage === 'ku' ? 'نوێ' : currentLanguage === 'en' ? 'New Release' : 'Neu'}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Kurdish Version */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h4 className="text-lg font-serif text-black border-b border-gray-200 pb-2 flex items-center">
              <span className="mr-3 text-2xl">🇮🇶</span>
              {currentLanguage === 'ku' ? 'وەشانی کوردی' : currentLanguage === 'en' ? 'Kurdish Version' : 'Kurdische Version'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {currentLanguage === 'ku' ? 'ناونیشان (کوردی)' : currentLanguage === 'en' ? 'Title (Kurdish)' : 'Titel (Kurdisch)'}
                </label>
                <input
                  type="text"
                  value={formData.titleKu}
                  onChange={(e) => setFormData({...formData, titleKu: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {currentLanguage === 'ku' ? 'نووسەر (کوردی)' : currentLanguage === 'en' ? 'Author (Kurdish)' : 'Autor (Kurdisch)'}
                </label>
                <input
                  type="text"
                  value={formData.authorKu}
                  onChange={(e) => setFormData({...formData, authorKu: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {currentLanguage === 'ku' ? 'چاپخانە (کوردی)' : currentLanguage === 'en' ? 'Publisher (Kurdish)' : 'Verlag (Kurdisch)'}
                </label>
                <input
                  type="text"
                  value={formData.publisherKu}
                  onChange={(e) => setFormData({...formData, publisherKu: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {currentLanguage === 'ku' ? 'وەرگێڕ (ئەگەر هەبێت)' : currentLanguage === 'en' ? 'Translator (if applicable)' : 'Übersetzer (falls zutreffend)'}
                </label>
                <input
                  type="text"
                  list="translators-list-edit"
                  value={formData.translator}
                  onChange={(e) => setFormData({...formData, translator: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                />
                <datalist id="translators-list-edit">
                  {translators.map(t => (
                    <option key={t.id} value={t.name} />
                  ))}
                </datalist>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {currentLanguage === 'ku' ? 'پێناسە (کوردی)' : currentLanguage === 'en' ? 'Description (Kurdish)' : 'Beschreibung (Kurdisch)'}
                </label>
                <textarea
                  rows={4}
                  value={formData.descriptionKu}
                  onChange={(e) => setFormData({...formData, descriptionKu: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: English Version */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h4 className="text-lg font-serif text-black border-b border-gray-200 pb-2 flex items-center">
              <span className="mr-3 text-2xl">🇬🇧</span>
              {currentLanguage === 'ku' ? 'وەشانی ئینگلیزی' : currentLanguage === 'en' ? 'English Version' : 'Englische Version'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {currentLanguage === 'ku' ? 'ناونیشان (ئینگلیزی)' : currentLanguage === 'en' ? 'Title (English)' : 'Titel (Englisch)'}
                </label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({...formData, titleEn: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {currentLanguage === 'ku' ? 'نووسەر (ئینگلیزی)' : currentLanguage === 'en' ? 'Author (English)' : 'Autor (Englisch)'}
                </label>
                <input
                  type="text"
                  value={formData.authorEn}
                  onChange={(e) => setFormData({...formData, authorEn: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {currentLanguage === 'ku' ? 'چاپخانە (ئینگلیزی)' : currentLanguage === 'en' ? 'Publisher (English)' : 'Verlag (Englisch)'}
                </label>
                <input
                  type="text"
                  value={formData.publisherEn}
                  onChange={(e) => setFormData({...formData, publisherEn: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {currentLanguage === 'ku' ? 'پێناسە (ئینگلیزی)' : currentLanguage === 'en' ? 'Description (English)' : 'Beschreibung (Englisch)'}
                </label>
                <textarea
                  rows={4}
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({...formData, descriptionEn: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: German Version */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h4 className="text-lg font-serif text-black border-b border-gray-200 pb-2 flex items-center">
              <span className="mr-3 text-2xl">🇩🇪</span>
              {currentLanguage === 'ku' ? 'وەشانی ئەڵمانی' : currentLanguage === 'en' ? 'German Version' : 'Deutsche Version'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {currentLanguage === 'ku' ? 'ناونیشان (ئەڵمانی)' : currentLanguage === 'en' ? 'Title (German)' : 'Titel (Deutsch)'}
                </label>
                <input
                  type="text"
                  value={formData.titleDe}
                  onChange={(e) => setFormData({...formData, titleDe: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {currentLanguage === 'ku' ? 'نووسەر (ئەڵمانی)' : currentLanguage === 'en' ? 'Author (German)' : 'Autor (Deutsch)'}
                </label>
                <input
                  type="text"
                  value={formData.authorDe}
                  onChange={(e) => setFormData({...formData, authorDe: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {currentLanguage === 'ku' ? 'چاپخانە (ئەڵمانی)' : currentLanguage === 'en' ? 'Publisher (German)' : 'Verlag (Deutsch)'}
                </label>
                <input
                  type="text"
                  value={formData.publisherDe}
                  onChange={(e) => setFormData({...formData, publisherDe: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {currentLanguage === 'ku' ? 'پێناسە (ئەڵمانی)' : currentLanguage === 'en' ? 'Description (German)' : 'Beschreibung (Deutsch)'}
                </label>
                <textarea
                  rows={4}
                  value={formData.descriptionDe}
                  onChange={(e) => setFormData({...formData, descriptionDe: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black bg-white text-black transition-colors"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <div className="flex space-x-4 rtl:space-x-reverse">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors uppercase tracking-widest text-xs"
            >
              {currentLanguage === 'ku' ? 'پاشگەزبوونەوە' : currentLanguage === 'en' ? 'Cancel' : 'Abbrechen'}
            </button>
            
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-2 text-black border border-gray-200 hover:bg-gray-50 transition-colors uppercase tracking-widest text-xs"
              >
                {currentLanguage === 'ku' ? 'گەڕانەوە' : currentLanguage === 'en' ? 'Previous' : 'Zurück'}
              </button>
            )}
          </div>

          <div>
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors uppercase tracking-widest text-xs"
              >
                {currentLanguage === 'ku' ? 'دواتر' : currentLanguage === 'en' ? 'Next' : 'Weiter'}
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors uppercase tracking-widest text-xs"
              >
                {currentLanguage === 'ku' ? 'نوێکردنەوەی کتاب' : currentLanguage === 'en' ? 'Update Book' : 'Buch Aktualisieren'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}