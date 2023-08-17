export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@vueuse/nuxt", "nuxt-vuefire"],
  css: ["@unocss/reset/tailwind.css"],
  runtimeConfig: {
    public: {},
  },
  ssr: false,
  vuefire: {
    auth: true,
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
});
