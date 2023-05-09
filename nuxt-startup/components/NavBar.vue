<template>
  <NuxtLink v-for="route in routes" :to="route.path">
    {{ route.name }}
  </NuxtLink>
  <div v-if="pending">Loading...</div>
</template>

<style scoped>
a {
  border: 1px solid black;
  padding: 1%;
}
</style>

<script setup>
const router = useRouter();

const pending = ref();
const routes = ref([]);

onMounted(() => {
  loadRoutes();
});

const loadRoutes = () => {
  pending.value = true;
  let myRoutes = [];

  $fetch(`/api/navigation`, {
    method: "GET",
    baseURL: "https://api-cre8ion.tc8l.dev",
  }).then((response) => {
    response.forEach((route) => {
      const mappedRoute = {
        name: route.name.toLowerCase(),
        path: route.url,
        component: () => import('@/views/MainView.vue')
      };
      routes.value.push(mappedRoute);
      router.addRoute(mappedRoute);
    });
    pending.value = false;
  });
};
</script>
