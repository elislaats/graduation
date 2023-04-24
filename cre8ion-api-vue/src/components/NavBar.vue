<script setup>
import { ref, defineEmits } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const navLoaded = ref(false);

const emit = defineEmits(["navLoaded"]);

router.beforeEach(async (to, from, next) => {
  if (!navLoaded.value) {
    await loadRoutes().then(() => {
      emit('navLoaded')
      if (to.path == "/") {
        next("/homepage");
      } else {
        next(to.path);
      }
    });
  } else {
    next();
  }
});

async function loadRoutes() {
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
      // add catch all 404 route
      router.addRoute({
        path: "/:catchAll(.*)",
        component: () => import("../views/PageNotFound.vue"),
      });

      // remove startup 'loading' route
      if (router.hasRoute("Loading")) {
        router.removeRoute("Loading");
      }
      navLoaded.value = true;
    })
    .catch(function(error){
      console.log(error)
    })
}
</script>

<template>
  <nav v-if="navLoaded"
    id="navbar"
    class="flex col-1-1 justify-space-around bg-white"
  >
    <template v-for="(route, index) in $router.getRoutes()">
      <router-link
        class="text-grey"
        v-if="route.name && !route.name.includes('hidden')"
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
@import "../styles/main.scss";

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

    &.router-link-active {
      color: $primary-color;
    }
  }
}
</style>
