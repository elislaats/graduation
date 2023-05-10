export default defineNuxtRouteMiddleware((to, from) => {
  let foundRoute = false;
  const routes = JSON.parse(JSON.stringify(useState("routes").value));

  if (to.path == "/") {
    foundRoute = true;
    return navigateTo("/homepage");
  }

  routes.forEach((route) => {
    if (route.path == ('/'+ to.params.mainPath)) {
      foundRoute = true;
    }
  });

  if (!foundRoute) {
    return navigateTo(`/404${to.path}`);
  }
});
