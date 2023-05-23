export default defineNuxtRouteMiddleware((to, from) => {
  let foundRoute = false;
  const routes = JSON.parse(JSON.stringify(useState("routes").value));

  routes.forEach((route) => {
    if (route.path == "/" + to.params.mainPath) {
      foundRoute = true;
    }
  });
  if (!foundRoute) {
    return abortNavigation({
      statusCode: 404,
      statusMessage: "route onbekend",
      message: "de hoofdroute is niet bekend als beschikbare routes",
    });
  }
});
