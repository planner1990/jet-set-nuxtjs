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
        { name: 'description', content: 'Connect with local tour guides for authentic travel experiences in the Netherlands' }
      ],
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})
