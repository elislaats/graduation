export default defineNuxtConfig({
  target: "static",
  ssr: false,
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
  devtools: {
    enabled: true,
  },
});
