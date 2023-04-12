<script setup>
import { defineProps } from "vue";

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <main class="grid align-start" v-if="props.content">
    <h1 class="col-1-1">{{ props.content.titel }}</h1>

    <p
      v-for="(value, key, index) in props.content"
      class="col-1-1"
      :key="index + key"
    >
     <strong>{{ key }}:</strong> {{ value }}
  </p>
  </main>
  <main v-else class="text-danger col-1-1">Loading...</main>
</template>
