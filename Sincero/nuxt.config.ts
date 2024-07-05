export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    "@nuxt/image",
    "nuxt-icon",
    "shadcn-nuxt",
    "nuxt-security",
    "@sidebase/nuxt-auth",
  ],

  vite: {
    plugins: [
      require('dotenv').config()
    ]
  },

  auth: {
    isEnabled: true,
    
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: {
      isEnabled: false,
    }
  },

  runtimeConfig:{
    public:{
    jwtSecret: process.env.JWT_SECRET,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    }
  },

  compatibilityDate: '2024-07-05',
})