export default defineNuxtConfig({
  pages: true,
  css: ["@/assets/styles/main.scss"],
  hooks: {
    "pages:extend"(pages) {
      pages.push({
        name: '404',
        path: '/404/:badUrl',
        file: "@/views/NotFound.vue",
      });
    },
  },
});
