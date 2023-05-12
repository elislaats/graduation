<template>
  <h3>Child Route</h3>
  <p>{{ $route.params }}</p>
</template>

<script setup>
definePageMeta({
  middleware: ["check-main-path", "check-sub-path"],
});
</script>
