import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { default_lang } from '@shared/constants';
import us from '@/locales/us/translation.json';
import ua from '@/locales/ua/translation.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      us: { translation: us },
      ua: { translation: ua },
    },
    lng: default_lang,
    fallbackLng: default_lang,
    interpolation: {
      escapeValue: false,
    },
  });

  declare module 'react-i18next' {
    interface Resources {
      us: { [key: string]: string; },
      ua: { [key: string]: string; }
    }
  }

export default i18n;