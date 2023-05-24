<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: false,
  },
});
</script>
<template>
  <section class="flex align-center justify-center">
    <div class="text-danger">
      <h3>Sorry, er ging iets mis</h3>
      <p v-if="error">
        {{ error }}
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100vh;
  h3 {
    font-size: large;
  }
}
</style>
