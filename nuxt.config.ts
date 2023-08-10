export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@vueuse/nuxt"],
  css: ["@unocss/reset/tailwind.css"],
  runtimeConfig: {
    pusherAppId: "",
    pusherSecret: "",
    public: {
      pusherApiKey: "",
      pusherCluster: "",
    },
  },
});
