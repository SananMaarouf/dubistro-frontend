'use client';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <ToggleGroup 
      type="single" 
      value={language}
      onValueChange={(value) => value && setLanguage(value as 'nb' | 'fr')}
      className="bg-emerald-800 rounded-full p-0.5 shadow-lg flex gap-0.5 absolute right-2"
    >
      <ToggleGroupItem 
        value="nb" 
        aria-label="Norwegian" 
        className="data-[state=on]:bg-emerald-600 rounded-full p-1"
      >
        🇳🇴
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="fr" 
        aria-label="French" 
        className="data-[state=on]:bg-emerald-600 rounded-full p-1"
      >
        🇫🇷
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default LanguageSwitcher;