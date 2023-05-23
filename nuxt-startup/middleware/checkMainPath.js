export default defineNuxtRouteMiddleware((to, from) => {
  let foundRoute = false;
  const routes = JSON.parse(JSON.stringify(useState("routes").value));

  routes.forEach((route) => {
    if (route.path == "/" + to.params.mainPath) {
      foundRoute = true;
    }
  });
  if (!foundRoute) {
    return abortNavigation({statusCode: 404, statusMessage:'Deze hoofdroute bestaat niet in de API-navigatie'});
  }
});
