export default defineNuxtConfig({
  target: "static",
  ssr: true,
  pages: true,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/styles/main.scss";',
        },
      },
    },
  },
  hooks: {
    async "pages:extend"(pages) {
      const response = await fetch(
        "https://api-cre8ion.tc8l.dev/api/navigation"
      );
      const routes = await response.json();
      routes.forEach((route) => {
        pages.push({
          name: route.name,
          path: route.url,
          file: "~/views/dynamic.vue",
        })
        pages.push({
          path: route.url + "/:subPath",
          file: "~/views/dynamic.vue",
        });
      });
    },
  },
  devtools: {
    enabled: true,
  },
});
