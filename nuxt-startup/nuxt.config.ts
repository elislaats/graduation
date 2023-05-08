// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  hooks: {
    'pages:extend'(pages) {
      // add a route
      pages.push(  {
        name: "404",
        path: "/:pathMatch(.*)",
        file: "@/views/PageNotFound.vue",
      })
    }
  }
});
