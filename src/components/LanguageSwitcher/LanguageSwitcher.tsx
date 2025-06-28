import React from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'kz' | 'ru';

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages: LanguageOption[] = [
    { code: 'kz', label: 'KZ', flag: '🇰🇿' },
    { code: 'ru', label: 'RU', flag: '🇷🇺' },
  ];

  const currentLanguage = i18n.language as Language;

  const handleLanguageChange = (languageCode: Language) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`
            px-3 py-1 text-sm font-medium rounded-md transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 
            dark:focus:ring-offset-gray-900 flex items-center space-x-1
            ${
              currentLanguage === lang.code
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
            }
          `}
          aria-label={`Switch to ${lang.label}`}
          title={`Switch to ${lang.label}`}
        >
          <span className="text-xs">{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
};
