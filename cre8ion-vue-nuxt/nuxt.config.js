export default defineNuxtConfig({
  target: "static",
  ssr: true,
  runtimeConfig: {
    public: {
      apiBase: "https://api-cre8ion.tc8l.dev/api/",
    },
  },
  css: ["~/assets/styles/main.scss"],
  hooks: {
    async "pages:extend"(pages) {
      const response = await fetch(
        "https://api-cre8ion.tc8l.dev/api/navigation"
      );
      const routes = await response.json();
      routes.forEach((route, index) => {
        if (index == 0) {
          setHomepage(route);
        } else {
          addPage(route.name, route.url, route.id);
        }
      });

      function addPage(name, path, id) {
        pages.push({
          name: name,
          path: path,
          file: "~/pages/index.vue",
          props: { id: id },
          children: [
            {
              path: ":slug",
              file: "~/pages/index.vue",
            },
          ],
        });
      }

      function setHomepage(route) {
        pages[0].name = route.name;
        pages[0].alias = route.url;
        pages[0].props = { id: route.id };
      }
    },
  },
  devtools: {
    enabled: true,
  },
});
