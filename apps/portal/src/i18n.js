import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Transform window.QS_TRANSLATIONS (Chinese key -> Lang value)
// into i18next resources (Lang -> Key -> Value)
const generateResources = () => {
  const resources = {
    zh: { translation: {} },
    'zh-TW': { translation: {} },
    en: { translation: {} },
    ja: { translation: {} },
    ko: { translation: {} },
    fr: { translation: {} },
    de: { translation: {} },
    es: { translation: {} },
    ru: { translation: {} }
  };

  const raw = window.QS_TRANSLATIONS || {};
  const heroRaw = window.QS_HERO_TRANSLATIONS || {};

  Object.keys(raw).forEach(key => {
    // For Chinese (source), use the key itself as value
    resources.zh.translation[key] = key;

    const translations = raw[key];
    Object.keys(translations).forEach(lang => {
      if (resources[lang]) {
        resources[lang].translation[key] = translations[lang];
      }
    });
  });
  
  // Add Hero translations
  if (heroRaw.title) {
     resources.zh.translation['hero.title'] = '世界级<br>ISP代理'; 
     Object.keys(heroRaw.title).forEach(lang => {
         if (resources[lang]) resources[lang].translation['hero.title'] = heroRaw.title[lang];
     });
  }
  if (heroRaw.subtitle) {
     resources.zh.translation['hero.subtitle'] = '满足多样化业务挑战<br>始终稳定可靠'; 
     Object.keys(heroRaw.subtitle).forEach(lang => {
         if (resources[lang]) resources[lang].translation['hero.subtitle'] = heroRaw.subtitle[lang];
     });
  }

  return resources;
};

// Initial language
const initialLang = localStorage.getItem('qs-lang') || 'zh';

i18n
  .use(initReactI18next)
  .init({
    resources: generateResources(),
    lng: initialLang,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
        useSuspense: false
    }
  });

// Listen for language changes from the legacy switcher
if (typeof window !== 'undefined') {
    window.addEventListener('languageChanged', (e) => {
        const newLang = e.detail?.lang;
        if (newLang && newLang !== i18n.language) {
            i18n.changeLanguage(newLang);
        }
    });
    
    // Also update when storage changes (e.g. other tabs)
    window.addEventListener('storage', (e) => {
        if (e.key === 'qs-lang' && e.newValue) {
            i18n.changeLanguage(e.newValue);
        }
    });
}

export default i18n;

