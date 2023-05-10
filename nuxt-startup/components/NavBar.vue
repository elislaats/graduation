<template>
  <template v-if="routing.loaded">
    <NuxtLink v-for="route in routing.routes" :to="route.path" class="btn">
      {{ route.name }}
    </NuxtLink>
  </template>
  <template v-else> loading routes... </template>
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