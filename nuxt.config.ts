// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
      '@nuxtjs/tailwindcss',
  ],
  runtimeConfig: {
      jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
      jwtRefreshSecret: process.env.JWT_RERESH_TOKEN_SECRET,
  }
})
