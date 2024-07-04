export default defineNuxtConfig({
  
  modules: [
    '@nuxtjs/tailwindcss',
    "@nuxt/image",
    "nuxt-icon",
    "shadcn-nuxt",
    "nuxt-security",
    "@sidebase/nuxt-auth",
    '@sidebase/nuxt-auth',
  ],
  
  
  vite: {
    plugins: [
      require('dotenv').config()
    ]
  },


  routeRules: {
    // Generated at build time for SEO purpose
    '/': { prerender: true },
    // Cached for 1 hour
    '/api/*': { cache: { maxAge: 60 * 60 } },
    // Redirection to avoid 404
    '/old-page': {
      redirect: { to: '/new-page', statusCode: 302 }
    }
    // ...
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
    secretKey: "yeah this is a test",
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    }
  },
})