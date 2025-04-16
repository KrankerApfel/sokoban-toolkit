export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false, // ⬅️ important pour le mode SPA statique
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],

  app: {
    baseURL: '/sokoban-toolkit/' 
  }
})
