<template>
  <main>
    <h3>Child Route</h3>
    <p>{{ $route.params }}</p>
  </main>
</template>

<script setup>
definePageMeta({
  middleware: ["check-main-path", "check-sub-path"],
});
</script>
