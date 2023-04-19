<script setup>
import { ref } from "vue";
import NavBar from "./components/NavBar.vue";
import GitHubLink from "./components/GitHubLink.vue";

const environment = ref(process.env.NODE_ENV)
</script>

<template>
  <NavBar />
  <GitHubLink v-if="environment != 'development'"/>
  <router-view />
</template>
