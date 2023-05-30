<script setup>
const props = defineProps({
  error: Object,
});

setMetadata(`${props.error.statusCode} | ${props.error.statusMessage}`);

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <main class="flex flex-column align-center justify-center">
    <template v-if="error">
      <h1 v-if="error.statusCode">{{ error.statusCode }}</h1>
      <h3 v-if="error.statusMessage">{{ error.statusMessage }}</h3>
      <template v-for="(value, key, index) in error" :key="key + index">
        <p v-if="key != 'statusCode' && key != 'statusMessage' && value">
          <strong class="text-primary">{{ key }}: </strong> {{ value }}
        </p>
      </template>
    </template>

    <template>
      <h1>Sorry, er ging iets mis</h1>
      <p>Het is onduidelijk wat er precies mis ging</p>
    </template>

    <button class="btn btn-secondary m-3" @click="handleError">
      Terug naar de homepagina
    </button>
  </main>
</template>
