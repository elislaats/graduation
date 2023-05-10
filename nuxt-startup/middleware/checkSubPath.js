export default defineNuxtRouteMiddleware((to, from) => {
  console.log(`need to check'${to.params.subPath}' `);
});
