export default defineNuxtRouteMiddleware((to) => {
  if (to.params.paths.length > 2) {
    return abortNavigation({
      statusCode: 404,
      statusMessage: "route onbekend",
      message: "er zijn geen routes beschikbaar op dit niveau",
    });
  }

  let foundRoute = false;
  const routes = useState("routes").value;

  routes.forEach((route) => {
    if (route.path == "/" + to.params.paths[0]) {
      foundRoute = true;
      setMetadata(route.name)
    }
  });

  if (!foundRoute) {
    return abortNavigation({
      statusCode: 404,
      statusMessage: "route onbekend",
      message: "de hoofdroute is niet bekend als beschikbare routes",
    });
  } else {
    
  }
});
