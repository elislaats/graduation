<script setup>
definePageMeta({
  middleware: (to, from) => {
    return navigateTo(`/404${to.path}`);
  },
});
</script>