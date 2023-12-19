import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../i18n/locales/en/translation.json'
import ruTranslation from '../i18n/locales/ru/translation.json'
import amTranslation from '../i18n/locales/am/translation.json'

i18n
    .use(initReactI18next)
    .init({
        resources:{
            eng: {
                translation:enTranslation
            },
            ru: {
                translation:ruTranslation
            },
            am: {
                translation:amTranslation
            },
        },
        lng: 'eng',
        fallbackLng: 'eng',
        interpolation: {
            escapeValue: false,
        },
    }).then(r => r);

export default i18n;
