// TypeScript
'use client';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="absolute top-4 right-4 z-20">
      <button
        onClick={() => setLanguage('nb')}
        className={`px-2 py-1 mr-2 ${language === 'nb' ? 'font-bold underline' : ''}`}
      >
        Norsk
      </button>
      <button
        onClick={() => setLanguage('fr')}
        className={`px-2 py-1 ${language === 'fr' ? 'font-bold underline' : ''}`}
      >
        Français
      </button>
    </div>
  );
};

export default LanguageSwitcher;