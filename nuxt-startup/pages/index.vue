<template>this route will never be reached</template>
<script setup>
definePageMeta({
  middleware: () => {
    const homepage = useState("routes").value[0];
    return navigateTo(homepage.path);
  },
});
</script>
