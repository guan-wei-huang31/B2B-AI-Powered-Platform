import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['fr', 'en'],
    detection: {
      order: [
        'querystring',
        'cookie',
        'localStorage',
        'sessionStorage',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
      ],
      caches: ['localStorage', 'cookie'],
    },
    debug: true,
    fallbackLng: 'en',
    returnObjects: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
