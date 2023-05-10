<template>
  <main>
    <h3>Main route</h3>
    <p>{{ $route.params }}</p>
    <p>id: {{ currentId }}</p>
  </main>
</template>

<script setup>
definePageMeta({
  middleware: ["check-main-path"],
});

function getContentId() {
  const currentRoute = useRoute();
  const routes = useState("routes").value;
  routes.forEach((route) => {
    if (route.path == currentRoute.fullPath) {
      currentId.value = route.id;
    }
  });
}

const currentId = ref();

onMounted(() => getContentId());
</script>
