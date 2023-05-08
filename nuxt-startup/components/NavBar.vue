<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const navLoaded = ref(false);

async function loadRoutes() {
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
      navLoaded.value = true;
    })
    .catch(function (error) {
      console.log(error);
    });
}
await loadRoutes();
</script>

<template>
  <nav
    v-if="navLoaded"
    id="navbar"
    class="flex col-1-1 justify-space-around bg-white"
  >
    <template v-for="(route, index) in $router.getRoutes()">
      <router-link
        class="text-grey"
        v-if="route.meta.mainRoute"
        v-bind:key="index"
        v-bind:to="route.path"
      >
        <!--display all named routes-->
        {{ route.name }}
      </router-link>
    </template>
  </nav>
</template>
