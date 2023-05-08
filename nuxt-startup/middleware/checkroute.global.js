import axios from "axios";

async function loadRoutes() {
  const router = useRouter();
  await axios
    .get("https://api-cre8ion.tc8l.dev/api/navigation")
    .then((response) => {
      const data = response.data;
      data.forEach((page) => {
        const route = {
          path: page.url,
          name: page.name.toLowerCase(),
          component: () => import("@/views/DynamicView.vue"),
          props: { id: page.id },
          meta: { mainRoute: true },
        };
        router.addRoute(route); // create new router
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  const router = useRouter();
  await loadRoutes();

  if (to.path == "/") {
    console.log("amhere");
    const homepage = router.getRoutes()[0];
    return navigateTo(homepage.path);
  }
});
