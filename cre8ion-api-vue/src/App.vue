<script setup>
import NavBar from "./components/NavBar.vue";
import LoadingView from "./views/LoadingView.vue";
import { ref } from "vue";

const navLoaded = ref(false);
</script>

<template>
  <NavBar @navLoaded="navLoaded = true" />
  <RouterView v-if="navLoaded" />
  <LoadingView v-else />
</template>
