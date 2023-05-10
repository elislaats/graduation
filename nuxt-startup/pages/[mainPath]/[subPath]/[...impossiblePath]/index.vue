<template>this route will never be reached</template>
<script setup>
definePageMeta({
  middleware: (to, from) => {
    return navigateTo(`/404${to.path}`);
  },
});
</script>
