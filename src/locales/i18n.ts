import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import kzTranslations from './kz.json';
import ruTranslations from './ru.json';

const resources = {
  kz: {
    translation: kzTranslations,
  },
  ru: {
    translation: ruTranslations,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    lng: localStorage.getItem('language') || 'ru',

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'language',
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    // Настройки для разработки
    debug: process.env.NODE_ENV === 'development',
  });

// Сохраняем выбранный язык в localStorage при изменении
i18n.on('languageChanged', lng => {
  localStorage.setItem('language', lng);
});

export default i18n;
