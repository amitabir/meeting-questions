import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

const LANGUAGE_STORAGE_KEY = 'preferred_language';

export function LanguageProvider({ children }) {
  // Initialize language from localStorage or default to Hebrew
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLanguage || 'he';
  });
  
  const [direction, setDirection] = useState(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return (savedLanguage || 'he') === 'he' ? 'rtl' : 'ltr';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'he' : 'en';
    setLanguage(newLang);
    setDirection(newLang === 'he' ? 'rtl' : 'ltr');
  };

  const t = (key, category = null) => {
    if (category) {
      return translations[language][category][key] || key;
    }
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 