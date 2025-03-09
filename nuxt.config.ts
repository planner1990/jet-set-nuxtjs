// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore - Known issue with i18n module types
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  i18n: {
    locales: ['en', 'de', 'fr', 'fa'],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
  },

  app: {
    head: {
      title: 'Jet Set - Your Local Tourism Platform',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Connect with local tour guides for authentic travel experiences in the Netherlands' },
        { name: 'og:title', content: 'Jet Set - Your Local Tourism Platform' },
        { name: 'og:description', content: 'Connect with local tour guides for authentic travel experiences in the Netherlands' },
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: 'https://jetset.tourism' },
        { name: 'theme-color', content: '#1976D2' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})
