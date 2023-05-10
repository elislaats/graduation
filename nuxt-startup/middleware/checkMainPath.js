export default defineNuxtRouteMiddleware((to, from) => {
  let foundRoute = false;
  const routes = JSON.parse(JSON.stringify(useState("routes").value));

  routes.forEach((route) => {
    if (route.path == "/" + to.params.mainPath) {
      useState("currentId", () => route.id);
      foundRoute = route;
    }
  });
  useState("activeRoute", () => foundRoute);
  if (!foundRoute) {
    return navigateTo(`/404${to.path}`);
  }
});
