export default defineNuxtConfig({
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
