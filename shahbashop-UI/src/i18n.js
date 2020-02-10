import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';

// the translations
const resources = {
  ar: {
    translation: translationAR
  },
  en: {
    translation: translationEN
  },
};

const detectionOptions = {
  order: ['localStorage'],
  lookupFromPathIndex: 0
}


i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    detection: detectionOptions,
  });


export default i18n;