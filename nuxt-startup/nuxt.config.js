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
    async "nitro:config"(nitroConfig) {
      const response = await fetch(
        "https://api-cre8ion.tc8l.dev/api/navigation"
      );
      const routes = await response.json();
      routes.forEach((route) => {
        nitroConfig.prerender.routes.push(route.url);
      });
    },
  },
  devtools: {
    enabled: true,
  },
});
