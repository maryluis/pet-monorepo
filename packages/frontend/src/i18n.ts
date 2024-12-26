import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ua',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  });

  declare module 'react-i18next' {
    interface Resources {
      en: { [key: string]: string; },
      ua: { [key: string]: string; }
    }
  }

export default i18n;