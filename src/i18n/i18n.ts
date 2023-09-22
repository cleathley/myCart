import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {strings as EN} from './en/strings';

export const resources = {
  en: {
    translation: EN,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
