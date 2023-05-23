<template>
  <NavBar />
  <main class="flex flex-column align-center justify-center">
    <template v-if="error.statusCode">
      <h1 class="text-align-center p-1">
        {{ error.statusCode }}
      </h1>

      <p style="font-size: x-large" v-if="error.statusCode == 404">
        Helaas, er werd niets gevonden op
        <strong class="text-primary">{{ $route.path }}</strong>
      </p>

      <p style="font-size: x-large" v-else-if="error.statusMessage">
        {{ error.statusMessage }}
      </p>
    </template>

    <template v-else>
      <h2>Er ging iets mis</h2>
      <p>{{ error }}</p>
    </template>

    <button class="btn btn-secondary m-3" @click="handleError">
      Terug naar de homepagina
    </button>
  </main>
</template>

<script setup>
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>
