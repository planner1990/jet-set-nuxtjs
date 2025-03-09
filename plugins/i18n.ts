import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en: {
        welcome: 'Welcome to Jet Set',
        explore: 'Explore Local Experiences',
        search: 'Search tours, guides, or locations...',
      },
      de: {
        welcome: 'Willkommen bei Jet Set',
        explore: 'Entdecken Sie lokale Erlebnisse',
        search: 'Suchen Sie nach Touren, Führern oder Orten...',
      },
      fr: {
        welcome: 'Bienvenue sur Jet Set',
        explore: 'Explorez les expériences locales',
        search: 'Rechercher des visites, des guides ou des lieux...',
      },
      fa: {
        welcome: 'به جت ست خوش آمدید',
        explore: 'تجربه‌های محلی را کشف کنید',
        search: 'جستجوی تورها، راهنماها یا مکان‌ها...',
      },
    },
  })

  vueApp.use(i18n)
})
