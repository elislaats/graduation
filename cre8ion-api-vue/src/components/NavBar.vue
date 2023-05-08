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
      emit("navLoaded");
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
          name: page.name.toLowerCase(),
          component: () => import("@/views/DynamicView.vue"),
          children: [
            {
              name: page.name.toLowerCase() + " nested",
              path: page.url + "/:slug",
              component: () => import("@/views/DetailView.vue"),
              props: true
            },
          ],
          props: { id: page.id },
          meta: { mainRoute: true },
        };
        router.addRoute(route); // create new router
      });

      // remove startup 'loading' route
      if (router.hasRoute("Loading")) {
        router.removeRoute("Loading");
      }
      navLoaded.value = true;
    })
    .catch(function (error) {
      console.warn(error);
    });
}
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
