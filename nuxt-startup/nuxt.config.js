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
      routes.forEach((route, index) => {
        if (index != 0) {
          pages.push({
            name: route.name,
            path: route.url,
            children: [
              {
                name: route.name + ' Detail',
                path: route.url + "/:subPath",
                file: "~/views/dynamic.vue",
              },
            ],
            file: "~/views/dynamic.vue",
          });
        } else {
          pages.push({
            name: route.name,
            path: "/",
            file: "~/views/dynamic.vue",
          });
        }
      });
    },
  },
  devtools: {
    enabled: true,
  },
});
