<template>
  <div>
    <h2>{{ info }}</h2>
    <NavBar />
  </div>
</template>

<script setup>
import { ref } from "vue";

const api  = await useFetch("/api/navigation");
const info = ref(api);
</script>
