<template>
  <NavBar />
  <main class="flex flex-column align-center justify-center">
    <template v-if="error">
      <h1 class="text-align-center p-1">
        {{ error.statusCode }}
      </h1>
      <h3>{{ error.statusMessage }}</h3>

      <p style="font-size: x-large" v-if="error.statusCode == 404">
        Helaas, er werd niets gevonden op
        <strong class="text-primary">{{ error.url }}</strong>
      </p>

      <template v-else-if="error.statusMessage">
        <p>
          {{ error.message }}
          <strong class="text-primary"> op {{ error.url }} </strong>
        </p>
      </template>
    </template>

    <template v-else>
      <h2>Er ging iets mis</h2>
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

setMetadata(`${props.error.statusCode} | ${props.error.statusMessage}`);

const handleError = () => clearError({ redirect: "/" });
</script>
