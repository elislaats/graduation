export default defineNuxtConfig({
  target: "static",
  ssr: true,
  runtimeConfig: {
    public: {
      apiBase: "https://api-cre8ion.tc8l.dev/api/",
    },
  },
  css: ['~/assets/styles/main.scss'],
  hooks: {
    async "pages:extend"(pages) {
      pages.push({
        name: "homepage",
        path: "/homepage",
        file: "~/pages/index.vue",
      });
    },
  },
  devtools: {
    enabled: true,
  },
});
