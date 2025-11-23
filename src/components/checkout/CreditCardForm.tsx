'use client';

import { useState } from 'react';

interface CreditCardFormProps {
  onChange: (data: any) => void;
}

export default function CreditCardForm({ onChange }: CreditCardFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    setCardNumber(value);
    onChange({ cardNumber: value, cardName, expiry, cvc });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
        // Insert slash
    }
    setExpiry(value);
    onChange({ cardNumber, cardName, expiry: value, cvc });
  };

  const formatCardNumber = (num: string) => {
    return num.replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (exp: string) => {
    if (exp.length > 2) {
      return exp.slice(0, 2) + '/' + exp.slice(2);
    }
    return exp;
  };

  const getCardType = (num: string) => {
    if (num.startsWith('4')) return 'Visa';
    if (num.startsWith('5')) return 'Mastercard';
    return 'Card';
  };

  return (
    <div className="space-y-6">
      {/* Visual Card */}
      <div className="relative w-full max-w-sm mx-auto h-56 rounded-2xl overflow-hidden shadow-xl transition-all transform hover:scale-105 duration-300">
        <div className={`absolute inset-0 bg-gradient-to-br ${
          getCardType(cardNumber) === 'Visa' ? 'from-blue-600 to-blue-800' :
          getCardType(cardNumber) === 'Mastercard' ? 'from-red-600 to-orange-600' :
          'from-gray-700 to-gray-900'
        } p-6 text-white flex flex-col justify-between`}>
          <div className="flex justify-between items-start">
            <div className="w-12 h-8 bg-yellow-400/80 rounded-md flex items-center justify-center">
                <div className="w-8 h-5 border border-yellow-600/50 rounded-sm"></div>
            </div>
            <span className="font-bold text-xl italic tracking-wider opacity-80">
              {getCardType(cardNumber)}
            </span>
          </div>
          
          <div className="space-y-6">
            <div className="text-2xl font-mono tracking-widest drop-shadow-md">
              {cardNumber ? formatCardNumber(cardNumber) : '•••• •••• •••• ••••'}
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs opacity-75 uppercase mb-1">Card Holder</div>
                <div className="font-medium tracking-wide uppercase truncate max-w-[200px]">
                  {cardName || 'YOUR NAME'}
                </div>
              </div>
              <div>
                <div className="text-xs opacity-75 uppercase mb-1">Expires</div>
                <div className="font-mono font-medium">
                  {expiry ? formatExpiry(expiry) : 'MM/YY'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              value={formatCardNumber(cardNumber)}
              onChange={handleCardNumberChange}
              maxLength={19}
              className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono"
              placeholder="0000 0000 0000 0000"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Card Holder Name
          </label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => {
              setCardName(e.target.value);
              onChange({ cardNumber, cardName: e.target.value, expiry, cvc });
            }}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none uppercase"
            placeholder="JOHN DOE"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Expiry Date
          </label>
          <input
            type="text"
            value={formatExpiry(expiry)}
            onChange={handleExpiryChange}
            maxLength={5}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono text-center"
            placeholder="MM/YY"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            CVC
          </label>
          <div className="relative">
            <input
              type="text"
              value={cvc}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                setCvc(val);
                onChange({ cardNumber, cardName, expiry, cvc: val });
              }}
              maxLength={4}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono text-center"
              placeholder="123"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group relative">
              <svg className="w-5 h-5 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
