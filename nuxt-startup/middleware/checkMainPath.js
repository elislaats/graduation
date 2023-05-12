async function loadPageData(id) {
  await $fetch(`/api/page/${id}`, {
    method: "GET",
    baseURL: "https://api-cre8ion.tc8l.dev",
  })
    .then((response) => {
      const loadedData = mapPageData(response);
      useState(`pagedata-${id}`, () => loadedData);
    })
    .catch((error) => {
      console.warn(error);
    });
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  let foundRoute = false;
  const routes = JSON.parse(JSON.stringify(useState("routes").value));

  routes.forEach((route) => {
    if (route.path == "/" + to.params.mainPath) {
      foundRoute = route;
    }
  });
  if (!foundRoute) {
    return navigateTo(`/404${to.path}`);
  } else {
    const stateData = useState(`pagedata-${foundRoute.id}`);
    if (!stateData.value) {
      await loadPageData(foundRoute.id);
    }
  }
});
