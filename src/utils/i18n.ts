import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en.json';
import zh from '@/locales/zh.json';

const getLang = () => (navigator.language.startsWith('zh') ? 'zh' : 'en');

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    zh: {
      translation: zh,
    },
  },
  lng: getLang(),
  interpolation: {
    escapeValue: false,
  },
});

window.addEventListener('languagechange', () => {
  const newLang = getLang();
  i18n.changeLanguage(newLang);
});

export { i18n };
