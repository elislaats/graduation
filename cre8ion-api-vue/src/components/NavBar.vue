<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const routes = ref();

loadRoutes();

async function loadRoutes() {
  try {
    await axios
      .get("https://api-cre8ion.tc8l.dev/api/navigation")
      .then((response) => {
        const data = response.data;
        data.forEach((page) => {
          const route = {
            path: page.url,
            name: page.name,
            component: () => import("@/views/DynamicView.vue"),
            props: { id: page.id },
          };
          router.addRoute(route); // create new router
        });
        const prevRoute = router.currentRoute.value.fullPath; // first save the previous route, if available
        router.push("/"); // go to only available page on startup to prevent error

        // add catch all 404 route
        router.addRoute({
          path: "/:catchAll(.*)",
          component: () => import("../views/PageNotFound.vue"),
        });
        
        // navigate to previous available route
        if (prevRoute == "/") {
          router.push("/homepage");
        } else {
          router.push(prevRoute);
        }

        // remove startup 'loading' route
        if (router.hasRoute("Loading")) {
          router.removeRoute("Loading");
        }

        // display routes in the navigation
        routes.value = router.getRoutes();
      });
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <nav
    v-if="routes"
    id="navbar"
    class="flex col-1-1 justify-space-around bg-white"
  >
    <template v-for="(route, index) in routes">
      <router-link
        class="text-grey"
        v-if="route.name"
        v-bind:key="index"
        v-bind:to="route.path"
      >
        <!--display all named routes-->
        {{ route.name }}
      </router-link>
    </template>
  </nav>
</template>

<style lang="scss">
#navbar {
  position: sticky;
  top: 0;
  a {
    background-color: transparent;
    border: none;
    padding: 1rem;
    text-decoration: none;
    font-size: 1.1em;
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
