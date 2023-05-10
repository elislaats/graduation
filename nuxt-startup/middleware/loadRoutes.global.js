async function loadRoutes() {
  let loadedRoutes = [];
  const response = await $fetch(`/api/navigation`, {
    method: "GET",
    baseURL: "https://api-cre8ion.tc8l.dev",
  });

  response.forEach((route) => {
    loadedRoutes.push({
      name: route.name.toLowerCase(),
      path: route.url,
      props: { id: route.id },
    });
  });
  return loadedRoutes;
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (useState("routes").value == undefined) {
    const loadedRoutes = await loadRoutes();
    const routes = useState("routes", () => loadedRoutes);
  }
  if (to.path == "/") {
    return navigateTo("/homepage");
  }
});
