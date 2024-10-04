export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-icon',
    'shadcn-nuxt',
    'nuxt-security',
    '@formkit/nuxt',
  ],

  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: false,
  },

  runtimeConfig: {
    public: {
      jwtSecret: process.env.JWT_SECRET,
      infuraSecret: process.env.INFURA_SECRET,
      kmsSecretKey: process.env.VERAMO_SECRET_KEY,
      databaseFile: process.env.DATABASE_FILE,
    },
  },
  security:{
    headers:{
      contentSecurityPolicy: false
    }
  },

  compatibilityDate: '2024-07-23',
})