<template>
  <h3>Main route</h3>
  <p>{{ $route.params }}</p>
</template>

<script setup>
definePageMeta({
  middleware: ["check-main-path"],
});
</script>
