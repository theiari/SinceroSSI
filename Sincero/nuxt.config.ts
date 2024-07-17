export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    "@nuxt/image",
    "nuxt-icon",
    "shadcn-nuxt",
    "nuxt-security",
    '@formkit/nuxt',
  ],

  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true
  },

  // vite: {
  //   plugins: [
  //     require('dotenv').config()
  //   ]
  // },



  runtimeConfig:{
    public:{
    jwtSecret: process.env.JWT_SECRET,
    infuraSecret: process.env.INFURA_SECRET,
    }
  },


  compatibilityDate: '2024-07-05',
})