<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const routes = ref();

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
          router.addRoute(route);
        });
        router.push("/homepage");
        if (router.hasRoute("Loading")) {
          router.removeRoute("Loading");
        }
        routes.value = router.getRoutes();
      });
  } catch (error) {
    console.error(error);
  }
}
loadRoutes();
</script>

<template>
  <nav
    v-if="routes"
    id="navbar"
    class="flex col-1-1 justify-space-around bg-white"
  >
    <router-link
      class="text-grey"
      v-for="(route, index) in routes"
      v-bind:key="index"
      v-bind:to="route.path"
    >
      {{ route.name }}</router-link
    >
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
