import React, { createContext, useContext, useState } from 'react';
import translations from './translations.json';

type Language = 'en' | 'ru' | 'kz';
type TranslationKey = keyof typeof translations.en;

interface LocaleContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  children: React.ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  const value: LocaleContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
