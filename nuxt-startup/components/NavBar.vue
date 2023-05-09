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
const pending = ref();
const routes = ref([]);

onMounted(() => {
  if (routes.value.length == 0) {
    loadRoutes();
  }
});

const loadRoutes = () => {
  pending.value = true;

  $fetch(`/api/navigation`, {
    method: "GET",
    baseURL: "https://api-cre8ion.tc8l.dev",
  }).then((response) => {
    response.forEach((route) => {
      routes.value.push({
        name: route.name.toLowerCase(),
        path: route.url,
        props: { id: route.id },
      });
    });
    pending.value = false;
  });
};
</script>
