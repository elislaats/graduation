<template>
  <nav v-if="routing.loaded" class="navBar flex justify-space-evenly">
    <NuxtLink
      v-for="route in routing.routes"
      :to="route.path"
      :class="'btn navLink ' + route.name"
      :active-class="'text-primary'"
    >
      {{ route.name }}
    </NuxtLink>
  </nav>
</template>

<script setup>
const routing = ref({
  loaded: false,
  routes: [],
});

onMounted(() => {
  const loadedRoutes = useState("routes");
  routing.value = {
    loaded: true,
    routes: loadedRoutes.value,
  };
});
</script>

<style lang="scss">
.navBar {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  .navLink {
    text-transform: uppercase;
    font-size:medium;
  }
}
</style>
