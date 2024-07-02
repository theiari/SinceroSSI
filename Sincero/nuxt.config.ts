export default defineNuxtConfig({
  
  modules: ['@nuxtjs/tailwindcss', "@nuxt/image", "nuxt-icon", "shadcn-nuxt"],

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
  }
})
