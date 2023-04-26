<script setup>
import NavBar from "./components/NavBar.vue";
import { ref } from "vue";

const navLoaded = ref(false);
</script>

<template>
  <NavBar @navLoaded="navLoaded = true" />
  <RouterView />
</template>
