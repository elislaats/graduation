<script setup>
const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>

<template>
  <NavBar></NavBar>
  <LoadingComp v-if="loading"></LoadingComp>
  <slot />
</template>
