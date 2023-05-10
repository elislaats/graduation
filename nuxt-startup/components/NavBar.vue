<template>
  <nav v-if="routing.loaded" class="flex justify-space-evenly bg-grey-dark">
    <NuxtLink
      v-for="route in routing.routes"
      :to="route.path"
      :class="'btn'"
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
