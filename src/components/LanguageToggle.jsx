import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`fixed top-4 ${language === 'he' ? 'left-4' : 'right-4'} bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition`}
    >
      {language === 'en' ? 'עברית' : 'English'}
    </button>
  );
} 