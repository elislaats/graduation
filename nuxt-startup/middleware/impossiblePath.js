export default defineNuxtRouteMiddleware((to, from) => {
  if (to.params.impossiblePath) {
    console.log("is an impossible route");
    return navigateTo(`/404${to.path}`);
  }
});
