<template>
  <main class="flex flex-column align-center justify-center">
    <h1>404</h1>
    <p style="font-size: 2em">
      Helaas, op
      <strong class="text-primary"> /{{ $route.params.pathMatch }} </strong>
      is niets gevonden.
    </p>
  </main>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  document["title"] = `404 | Er ging iets mis`;
});
</script>
