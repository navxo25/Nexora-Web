import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'yo', 'id', 'bn', 'ar', 'ur'], // Phase 3 cities
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    ns: ['common', 'complaints', 'admin'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  })

export default i18n