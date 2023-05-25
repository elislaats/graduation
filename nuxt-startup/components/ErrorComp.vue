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
      <h2>Sorry, er ging iets mis</h2>
      <template v-if="error">
        <h3 v-if="error.statusCode">{{ error.statusCode }}</h3>
        <p>
          <strong v-if="error.statusMessage">{{ error.statusMessage }}</strong>
          <em v-if="error.url">{{ error.url }}</em>
        </p>
        <p v-if="error.message">
          {{ error.message }}
        </p>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100vh;
  h2 {
    font-size: x-large;
  }
}
</style>
