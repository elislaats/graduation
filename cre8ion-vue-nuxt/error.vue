<script setup>
const props = defineProps({
  error: Object,
});

setMetadata(`${props.error.statusCode} | ${props.error.statusMessage}`);

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <main class="flex flex-column align-center justify-center">
    <h1>Sorry, er ging iets mis</h1>

    <template v-if="error">
      <h2 v-if="error.statusCode">{{ error.statusCode }}</h2>
      <h3 v-if="error.statusMessage">{{ error.statusMessage }}</h3>
      <template v-for="(value, key, index) in error" :key="key + index">
        <p v-if="key != 'statusCode' && key != 'statusMessage' && value">
          <strong class="text-primary">{{ key }}: </strong> {{ value }}
        </p>
      </template>
    </template>

    <template>
      <p>Het is onduidelijk wat er precies mis ging</p>
    </template>

    <button class="btn btn-secondary m-3" @click="handleError">
      Terug naar de homepagina
    </button>
  </main>
</template>
